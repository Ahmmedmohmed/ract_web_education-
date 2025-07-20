/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined, Download, Frown, Save } from "lucide-react";
import useGeoLocation from "react-ipgeolocation";

// style
// import "./PackageCoursesDetails.scss";

// api
import {
    appGetPackageById,
    appGetPackagesCoursesIds,
} from "../../../../api/app/authApp";

// store
import UserDataStore from "../../../../store/UserDataStore";

// data
import { blogPosts } from "../../../../data/blogData";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { formatDateAR } from "../../../../utils/helpers";
import {
    App_User,
    namecurrency,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

//
// import BlogCard from "../card/BlogCard";
import CourseCard from "../../coursespage/card/CourseCard";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

function PackageCoursesDetails() {
    const { packageId } = useParams();
    let { userData, userProfile } = UserDataStore();
    const navigate = useNavigate();

    const [packageCourses, setPackageCourses] = useState(null);
    const [courses, setCourses] = useState(null);
    const [newPrice, setNewPrice] = useState(0);
    const [enrolledStatus, setEnrolledStatus] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    const [nextPost, setNextPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);

    useEffect(() => {
        const fetchPackageCourses = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetPackageById(packageId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/packages`);
                } else {
                    // Set form values
                    setPackageCourses(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/packages`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPackageCourses();
    }, [packageId, navigate]);

    useEffect(() => {
        const fetchPackageCoursesIds = async (idsString) => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetPackagesCoursesIds(
                    idsString
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/packages`);
                } else {
                    // Set form values
                    setCourses(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/packages`);
            } finally {
                setIsLoading(false);
            }
        };

        if (packageCourses) {
            const ids = packageCourses?.courses;
            const idsString = ids.join(",");
            fetchPackageCoursesIds(idsString);
        }
    }, [navigate, packageCourses]);

    //
    const { country } = useGeoLocation();
    const [pricing, setPricing] = useState({
        price: 0,
        originalPrice: 0,
        discount: 0,
        currency: namecurrency,
    });

    useEffect(() => {
        setIsLoading(true);
        let price, originalPrice, discount, currency;

        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country?.countryCode || country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            price =
                packageCourses?.price_after_discount_egypt ||
                packageCourses?.price_like_egypt ||
                0;
            originalPrice = packageCourses?.price_like_egypt || 0;
            discount = packageCourses?.discount_like_egypt || 0;
            currency = "جنيه";
            setIsLoading(false);
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            price =
                packageCourses?.price_after_discount_saudi ||
                packageCourses?.price_like_saudi ||
                0;
            originalPrice = packageCourses?.price_like_saudi || 0;
            discount = packageCourses?.discount_like_saudi || 0;
            currency = "ريال";
            setIsLoading(false);
        } else {
            // باقي الدول (أمريكا وغيرها)
            price =
                packageCourses?.price_after_discount_america ||
                packageCourses?.price_like_america ||
                0;
            originalPrice = packageCourses?.price_like_america || 0;
            discount = packageCourses?.discount_like_america || 0;
            currency = "دولار";
            setIsLoading(false);
        }

        setPricing({
            price,
            originalPrice,
            discount,
            currency,
        });
    }, [country, packageCourses]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // console.log(`cl`, packageCourses);
    // console.log(`cl`, blogResult);

    return (
        <>
            <section
                className="section course"
                id="courses-courses"
                aria-label="course"
            >
                <div className="container">
                    <div className="pt-20">
                        <p className="section-subtitle" data-aos="fade-down">
                            {`
                            الدورات التدريبية في هذه الباقة
                        `}
                        </p>

                        <h2 className="h2 section-title" data-aos="fade-down">
                            {packageCourses?.title}
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : courses?.length === 0 ? (
                            <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    لا توجد دورات حاليا
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses?.map((course, index) => (
                                    <CourseCard course={course} key={index} />
                                ))}
                            </ul>
                        )}

                        <div className="p-6 mt-20 flex items-center flex-col  justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center justify-center gap-4 mb-7 my-5">
                                    {/* {newPrice > 0 ? (
                                        <div
                                            className={`text-3xl font-bold text-blue-700`}
                                        >
                                            {packageCourses?.price_after_discount -
                                                newPrice}{" "}
                                            ر.س
                                        </div>
                                    ) : (
                                        <div
                                            className={`text-3xl font-bold text-blue-700`}
                                        >
                                            {
                                                packageCourses?.price_after_discount
                                            }{" "}
                                            ر.س
                                        </div>
                                    )} */}

                                    {/* {packageCourses?.discount &&
                                        packageCourses?.discount > 0 && (
                                            <div className="flex items-center gap-2">
                                                <div className="text-2xl text-muted-foreground line-through mr-2">
                                                    {packageCourses?.price} ر.س
                                                </div>

                                                <div className="bg-red-100 text-red-600 px-2 py-1 text-lg rounded mr-2">
                                                    {packageCourses?.discount}{" "}
                                                    خصم
                                                </div>

                                                {newPrice > 0 && (
                                                    <div className="bg-red-100 text-red-600 px-2 py-1 text-lg rounded mr-2">
                                                        {newPrice} كوبون
                                                    </div>
                                                )}
                                            </div>
                                        )} */}

                                    <div className="flex items-center gap-4 text-3xl font-bold">
                                        {pricing.price > 0 ? (
                                            <data
                                                className={`price text-blue-600 font-bold`}
                                                value={pricing.price}
                                            >
                                                {pricing.price}
                                                {namecurrency}
                                                {/* {pricing.currency} */}
                                            </data>
                                        ) : (
                                            <data
                                                className={`price text-blue-600 font-bold`}
                                                value={pricing.price}
                                            >
                                                مجاناً
                                            </data>
                                        )}

                                        {pricing.originalPrice >
                                            pricing.price && (
                                            <span className="text-gray-500 line-through text-2xl">
                                                {pricing.originalPrice}
                                                {namecurrency}
                                                {/* {pricing.currency} */}
                                            </span>
                                        )}

                                        {pricing.discount > 0 && (
                                            <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                                خصم {pricing.discount}
                                                {namecurrency}
                                                {/* {pricing.currency} */}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {userData?.id &&
                                        enrolledStatus === "success" && (
                                            <button
                                                className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                onClick={() => {
                                                    // navigate(
                                                    //     `/${App_User}/courses/${packageCourses?.id}`
                                                    // );
                                                    // enrollCourseFree();
                                                }}
                                                title="أنت مشترك بالفعل"
                                            >
                                                أنت مشترك بالفعل
                                            </button>
                                        )}

                                    {userData?.id &&
                                        enrolledStatus !== "success" &&
                                        packageCourses?.price_after_discount ===
                                            0 && (
                                            <button
                                                className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark  rounded-2xl`}
                                                onClick={() => {
                                                    // navigate(
                                                    //     `/${App_User}/courses/${course?.id}`
                                                    // );
                                                    // enrollCourseFree();
                                                }}
                                                title="اشترك"
                                            >
                                                اشتراك الآن
                                            </button>
                                        )}

                                    {userData?.id &&
                                        enrolledStatus !== "success" &&
                                        packageCourses?.price_after_discount >
                                            0 && (
                                            <div>
                                                {/* <div className="">
                                            {newPrice ===
                                                0 && (
                                                <form
                                                    onSubmit={handleSubmit(
                                                        handleCouponSearch
                                                    )}
                                                    className="space-y-6 flex items-stretch gap-2"
                                                >
                                                    <label
                                                        htmlFor="coupon"
                                                        className="block text-2xl font-bold mb-2 text-black hidden"
                                                    >
                                                        الاٍسم
                                                        الاول*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="coupon"
                                                        name="coupon"
                                                        placeholder="مثال: CODE"
                                                        className="text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0"
                                                        {...register(
                                                            "coupon",
                                                            {
                                                                required: `هذا الحقل مطلوب.`,
                                                            }
                                                        )}
                                                        autoComplete="off"
                                                        disabled={
                                                            isLoading
                                                        }
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            isSubmitting ||
                                                            isLoading
                                                        }
                                                        className="text-2xl px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all"
                                                    >
                                                        {isSubmitting ||
                                                        isLoading
                                                            ? "جاري التحقق..."
                                                            : "تحقق"}
                                                    </button>
                                                </form>
                                            )}
                                        </div> */}

                                                <button
                                                    className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                    onClick={() => {
                                                        // navigate(
                                                        //     `/${App_User}/courses/${course?.id}`
                                                        // );
                                                        // enrollCourseFree();
                                                        // handleSubscribe(
                                                        //     course?.id
                                                        //     // ,price
                                                        // );
                                                    }}
                                                    title="اشترك"
                                                >
                                                    انتقل للدفع
                                                </button>
                                            </div>
                                        )}

                                    {!userData?.id && (
                                        <button
                                            className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                            onClick={() => {
                                                navigate(`/login`);
                                            }}
                                            title="تسجيل الدخول"
                                        >
                                            تسجيل الدخول للاشتراك
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <button
                                    className={` w-full p-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark rounded-2xl `}
                                    onClick={() => {
                                        navigate(
                                            `/${App_User}/packages/create`
                                        );
                                        // enrollCourseFree();
                                    }}
                                    title=" أنشاء باقتك الخاصة وأحصل علي خصم 20 %"
                                >
                                    أنشاء باقتك الخاصة وأحصل علي خصم 20 %
                                </button>
                            </div>

                            {/* <button
                                variant="outline"
                                className="w-full py-6 text-lg mb-6 border-blue-700 text-blue-700 hover:bg-blue-700/5"
                            >
                                إضافة إلى المفضلة
                            </button> */}
                        </div>

                        {/* <a href="#" className="btn has-before">
                        <span className="span">Browse more courses</span>

                        <ion-icon
                            name="arrow-forward-outline"
                            aria-hidden="true"
                        ></ion-icon>
                    </a> */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PackageCoursesDetails;
