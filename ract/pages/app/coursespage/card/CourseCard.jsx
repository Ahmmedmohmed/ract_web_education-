/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Clock, Heart, Library, ShoppingCart, Users } from "lucide-react";
import useGeoLocation from "react-ipgeolocation";
import {
    FaClock,
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaUserFriends,
} from "react-icons/fa";

// style
import "./CourseCard.scss";

// api
import {
    appGetCourseFetchFavoriteStatus,
    appPostStudentFavoriteCourse,
} from "../../../../api/app/authApp";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_User,
    namecurrency as defaultCurrency,
    namecurrency,
    nameMainColor,
} from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import islamicdome from "../../../../assets/images/bg/islamic-dome.png";

function CourseCard({ course }) {
    const navigate = useNavigate();
    const { country } = useGeoLocation();

    let { userData } = UserDataStore();

    const [favoriteStatus, setFavoriteStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");

    const [pricing, setPricing] = useState({
        price: 0,
        originalPrice: 0,
        discount: 0,
        currency: defaultCurrency,
    });

    const levelColors = {
        beginner: { text: "مبتدئ", bgColor: "bg-green-500" },
        intermediate: { text: "متوسط", bgColor: "bg-orange-500" },
        advanced: { text: "متقدم", bgColor: "bg-red-500" },
    };

    const subjectChoices = {
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم",
    };

    useEffect(() => {
        let price, originalPrice, discount, currency;

        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country?.countryCode || country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            price =
                course?.price_after_discount_egypt ||
                course?.price_like_egypt ||
                0;
            originalPrice = course?.price_like_egypt || 0;
            discount = course?.discount_like_egypt || 0;
            currency = "جنيه";
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            price =
                course?.price_after_discount_saudi ||
                course?.price_like_saudi ||
                0;
            originalPrice = course?.price_like_saudi || 0;
            discount = course?.discount_like_saudi || 0;
            currency = "ريال";
        } else {
            // باقي الدول (أمريكا وغيرها)
            price =
                course?.price_after_discount_america ||
                course?.price_like_america ||
                0;
            originalPrice = course?.price_like_america || 0;
            discount = course?.discount_like_america || 0;
            currency = "دولار";
        }

        setPricing({
            price,
            originalPrice,
            discount,
            currency,
        });
    }, [country, course]);

    useEffect(() => {
        const fetchCourseFavoriteStatus = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseFetchFavoriteStatus(
                    userData?.id,
                    course?.id
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب حالة التفضيل"
                    );
                    // console.log();
                } else {
                    // console.log(``);
                    if (data.bool == true) {
                        setFavoriteStatus("success");
                    } else {
                        setFavoriteStatus("");
                    }
                }
            } catch (error) {
                setErrorsMessage(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب حالة التفضيل"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.id) {
            fetchCourseFavoriteStatus();
        }
    }, [course?.id, userData?.id, favoriteStatus]);

    const handleFavoriteCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            courseData.append("student", userData?.id || null);
            courseData.append("course", course?.id);

            const { data, error } = await appPostStudentFavoriteCourse(
                courseData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.message) {
                    Toast("error", error.message);
                }
            } else {
                Toast("success", "تم إضافة الدورة الي المفضلة بنجاح");
                setFavoriteStatus("success");
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إضافة الدورة الي المفضلة");
        } finally {
            setIsLoading(false);
        }
    };

    // console.log(`course`, course);

    return (
        <>
            <li
                className="group cursor-pointer  select-none"
                // onClick={() => {
                //     if (course?.is_live) {
                //         navigate(`/coursesislive/${course?.id}`);
                //     } else {
                //         navigate(`/courses/${course?.id}`);
                //     }
                // }}
                data-aos="flip-left"
            >
                <div
                    className={`
                        rounded-2xl overflow-hidden
                        transition-all hover:-translate-y-4 
                        duration-500 pb-2 relative
                        rounded-tr-4xl
                    `}
                >
                    <figure
                        className="card-banner card-banner-course img-holder  min-h-[350px] overflow-hidden relative   "
                        // style={{backgroundImage: `url(${islamicdome})`}}
                        //
                    >
                        <img
                            src={islamicdome}
                            className="transition-all duration-500 min-h-[350px] max-h-[350px] w-full object-fill absolute top-0 left-0 z-[2]"
                            // group-hover:scale-125
                            alt={`${course?.title} - ${course?.description}`}
                            loading="lazy"
                        />
                        <img
                            src={course?.image_url || course?.image || noimage}
                            className="imgCo transition-all duration-500 min-h-[350px] max-h-[350px] w-full object-fill"
                            // group-hover:scale-125
                            alt={`${course?.title} - ${course?.description}`}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null;
                            }}
                            loading="lazy"
                        />

                        {course?.is_live === false ? (
                            <>
                                {course?.tag ? (
                                    <div
                                        className={`abs-badge absolute bottom-14 left-3 rounded-lg flex items-center gap-2 bg-red-400 text-white px-2 py-1 text-lg`}
                                    >
                                        <span className="span">
                                            {course?.tag}
                                        </span>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <div
                                    className={`abs-badge absolute bottom-3 left-3 rounded-lg flex items-center gap-2 bg-emerald-500 text-white px-2 py-1 text-lg`}
                                >
                                    <Clock size={16} />
                                    <span className="span">
                                        {course?.duration}
                                    </span>
                                </div>

                                <span
                                    className={`badge text-lg  text-white px-2 py-1 w-max rounded-lg absolute bottom-3 right-3
                                ${
                                    course?.level === "beginner"
                                        ? "bg-emerald-500"
                                        : course?.level === "intermediate"
                                        ? "bg-orange-500"
                                        : course?.level === "advanced"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                }
                                `}
                                >
                                    {subjectChoices[course?.level] || "مبتدئ"}
                                </span>
                            </>
                        ) : (
                            <></>
                        )}
                    </figure>

                    <div className="card-content p-7 flex flex-col gap-4 bg-white transition-all duration-500 shadow hover:shadow-2xl">
                        <div className="border border-gray-400 rounded-2xl text-center flex flex-col items-center justify-center gap-4 py-2 overflow-hidden">
                            <h3 className="h3">
                                <Link
                                    className={`card-title truncate text-4xl group-hover:text-blue-600 transition-all duration-500 line-clamp-1 max-w-full `}
                                >
                                    {course?.title}
                                </Link>
                            </h3>

                            <div className="wrapper flex items-center gap-4 text-2xl  ">
                                <p className="rating-text text-black font-bold line-clamp-1">
                                    {course?.description}
                                </p>
                            </div>
                        </div>

                        {/* <div className="flex items-center gap-4 text-3xl font-bold">
                            {pricing.price > 0 ? (
                                <data
                                    className={`price text-blue-600 font-bold`}
                                    value={pricing.price}
                                >
                                    {pricing.price}
                                    {namecurrency} 
                                </data>
                            ) : (
                                <data
                                    className={`price text-blue-600 font-bold`}
                                    value={pricing.price}
                                >
                                    مجاناً
                                </data>
                            )}

                            {pricing.originalPrice > pricing.price && (
                                <span className="text-gray-500 line-through text-2xl">
                                    {pricing.originalPrice}
                                    {namecurrency} 
                                </span>
                            )}

                            {pricing.discount > 0 && (
                                <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                    خصم {pricing.discount}
                                    {namecurrency}
                                      // {pricing.currency} 
                                </span>
                            )}
                        </div> */}

                        <div className="flex items-center justify-between gap-4">
                            <div className="card-meta-list flex items-center gap-4 font-bold">
                                {/* {course?.is_live === false && (
                                <li className="card-meta-item flex items-center gap-2 text-3xl">
                                    <Library />
                                    <span className={`span text-blue-500`}>
                                        {course?.total_lesson}
                                    </span>
                                </li>
                            )} */}

                                {course?.is_live === false ? (
                                    <div className="card-meta-item flex items-center gap-2 text-3xl">
                                        <Users size={30} />

                                        <span className={`span text-blue-500`}>
                                            {course?.total_enrolled_students +
                                                course?.number_old_enrolled}
                                        </span>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-end items-center gap-2 ">
                                    {course?.is_live === false ? (
                                        <div className="flex gap-4">
                                            {favoriteStatus === "success" ? (
                                                <button
                                                    className="text-amber-400 hover:text-amber-500 transition-colors duration-500"
                                                    onClick={() => {
                                                        navigate(
                                                            `/${App_User}/favoritecourses`
                                                        );
                                                    }}
                                                >
                                                    <FaHeart size={30} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-gray-600 hover:text-amber-500 transition-colors duration-500"
                                                    onClick={() => {
                                                        if (!userData?.id) {
                                                            navigate(`/login`);
                                                        } else {
                                                            handleFavoriteCourseSubmit();
                                                        }
                                                    }}
                                                >
                                                    <Heart size={30} />
                                                </button>
                                            )}

                                            {/* <button className="text-gray-600 hover:text-blue-500 transition-colors duration-500">
                                            <ShoppingCart size={30} />
                                        </button> */}
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <button
                                        className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-red-600 transition-colors duration-500"
                                        onClick={() => {
                                            if (course?.is_live) {
                                                navigate(
                                                    `/coursesislive/${course?.id}`
                                                );
                                            } else {
                                                navigate(
                                                    `/courses/${course?.id}`
                                                );
                                            }
                                        }}
                                    >
                                        اشترك الآن
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>

        //
        // <>
        //     <li
        //         className="group cursor-pointer"
        //         onClick={() => {
        //             if (course?.is_live) {
        //                 navigate(`/coursesislive/${course?.id}`);
        //             } else {
        //                 navigate(`/courses/${course?.id}`);
        //             }
        //         }}
        //         data-aos="flip-left"
        //     >
        //         <div
        //             className={` bg-white rounded-2xl overflow-hidden
        //                 shadow transition-all hover:-translate-y-4
        //                 hover:shadow-2xl
        //                 duration-500 pb-2 relative
        //             `}
        //         >
        //             <figure
        //                 className="card-banner img-holder min-h-96 overflow-hidden"
        //                 //
        //             >
        //                 <img
        //                     src={course?.image_url || course?.image || noimage}
        //                     className="transition-all duration-500 min-h-96 max-h-96 w-full object-fill group-hover:scale-125"
        //                     alt={`${course?.title} - ${course?.description}`}
        //                     onError={(e) => {
        //                         e.target.src = noimage;
        //                         e.target.onerror = null;
        //                     }}
        //                     loading="lazy"
        //                 />
        //             </figure>

        //             <div
        //                 className={`abs-badge absolute top-3 right-3 rounded-lg flex items-center gap-2 bg-blue-500 text-white px-2 py-1 text-lg`}
        //             >
        //                 <Clock size={16} />
        //                 <span className="span">{course?.duration}</span>
        //             </div>

        //             <div className="card-content p-7 flex flex-col gap-4">
        //                 <span
        //                     className={`badge text-lg bg-blue-500 text-white px-2 py-1 w-max rounded-lg absolute top-3 left-3`}
        //                 >
        //                     {subjectChoices[course?.level] || "مبتدئ"}
        //                 </span>

        //                 <h3 className="h3">
        //                     <Link
        //                         className={`card-title truncate text-4xl group-hover:text-blue-600 transition-all duration-500 my-4`}
        //                     >
        //                         {course?.title}
        //                     </Link>
        //                 </h3>

        //                 <div className="wrapper flex items-center gap-4 text-2xl">
        //                     <p className="rating-text text-black font-bold"></p>
        //                 </div>

        //                 <div className="flex items-center gap-4 text-3xl font-bold">
        //                     {pricing.price > 0 ? (
        //                         <data
        //                             className={`price text-blue-600 font-bold`}
        //                             value={pricing.price}
        //                         >
        //                             {pricing.price}
        //                             {namecurrency}
        //                             {/* {pricing.currency} */}
        //                         </data>
        //                     ) : (
        //                         <data
        //                             className={`price text-blue-600 font-bold`}
        //                             value={pricing.price}
        //                         >
        //                             مجاناً
        //                         </data>
        //                     )}

        //                     {pricing.originalPrice > pricing.price && (
        //                         <span className="text-gray-500 line-through text-2xl">
        //                             {pricing.originalPrice}
        //                             {namecurrency}
        //                             {/* {pricing.currency} */}
        //                         </span>
        //                     )}

        //                     {pricing.discount > 0 && (
        //                         <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
        //                             خصم {pricing.discount}
        //                             {namecurrency}
        //                             {/* {pricing.currency} */}
        //                         </span>
        //                     )}
        //                 </div>

        //                 <ul className="card-meta-list flex items-center gap-4 font-bold">
        //                     {course?.is_live === false && (
        //                         <li className="card-meta-item flex items-center gap-2 text-3xl">
        //                             <Library />
        //                             <span className={`span text-blue-500`}>
        //                                 {course?.total_lesson}
        //                             </span>
        //                         </li>
        //                     )}

        //                     <li className="card-meta-item flex items-center gap-2 text-3xl">
        //                         <Users />
        //                         <span className={`span text-blue-500`}>
        //                             {course?.total_enrolled_students}
        //                         </span>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </li>
        // </>
    );
}

export default CourseCard;
