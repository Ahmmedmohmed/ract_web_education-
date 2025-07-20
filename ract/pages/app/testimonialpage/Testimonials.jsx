/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
import "./Testimonials.scss";

// api
import { appGetReviewUserResults } from "../../../api/app/authApp";

// plugin
import Toast from "../../../plugin/Toast";

// utils
import { nameMainColor } from "../../../utils/constants";

// ui
import MainTitle from "../../../ui/title/MainTitle";

// assets
import teacher1image from "../../../assets/images/teacher/teacher-1.svg";
import teacher2image from "../../../assets/images/teacher/teacher-2.svg";
import teacher3image from "../../../assets/images/teacher/teacher-3.png";
import avatar1 from "../../../assets/images/testimonials/avatar1.png";
import avatar2 from "../../../assets/images/testimonials/avatar2.png";
import avatar3 from "../../../assets/images/testimonials/avatar3.png";
import userimage from "../../../assets/images/user/default-user.jpg";

function Testimonials() {
    const navigate = useNavigate();

    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviewUserResults = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetReviewUserResults(3);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الاراء");
                } else {
                    setTestimonials(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviewUserResults();
    }, []);

    // console.log(`data`, data);

    // const testimonials = [
    //     {
    //         id: 1,
    //         image: teacher1image,
    //         name: `الغامدي`,
    //         description: `أنا سعيد جدا بالدراسة في أكاديمية ريادة أكاديمة رائعة و أساتذة مشاء الله .`,
    //         rating: 4,
    //     },
    //     {
    //         id: 1,
    //         image: teacher2image,
    //         name: `العمري`,
    //         description: `أنا سعيد جدا بالدراسة في أكاديمية ريادة أكاديمة رائعة و أساتذة مشاء الله .`,
    //         rating: 4,
    //     },
    //     {
    //         id: 1,
    //         image: teacher3image,
    //         name: `الدوسري`,
    //         description: `أنا سعيد جدا بالدراسة في أكاديمية ريادة أكاديمة رائعة و أساتذة مشاء الله .`,
    //         rating: 4,
    //     },
    // ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <>
            <section className="section  testimonial pb-20" id="testimonial">
                <div className="container">
                    {/* <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/`);
                        }}
                    >
                        {`أراء طلابنا عنا`}
                    </MainTitle> */}
                    <p className="section-subtitle" data-aos="fade-down">
                        {`
                            الأراء
                        `}
                    </p>

                    <h2 className="h2 section-title" data-aos="fade-down">
                        {`
                            أراء الطلاب عنا
                        `}
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-4xl bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">لا توجد أراء متاحة</p>
                        </div>
                    ) : (
                        <div className="testimonialsBox pt-40 pb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {testimonials?.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="testimonial-box "
                                    data-aos="flip-left"
                                >
                                    <div
                                        className={`relative bg-white p-4 rounded-3xl shadow-md 
                                            shadow-fuchsia-200 hover:shadow-fuchsia-400 
                                            cursor-pointer   transition-all duration-500 
                                            group hover:-translate-y-4
                                        `}
                                    >
                                        <div className="rounded-full overflow-hidden w-40">
                                            <img
                                                // src={
                                                //     testimonial?.profile?.image ||
                                                //     userimage
                                                // }
                                                src={
                                                    index === 1
                                                        ? avatar1
                                                        : index === 2
                                                        ? avatar2
                                                        : avatar3
                                                }
                                                alt={`teacher 1 image`}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = userimage;
                                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                }}
                                                className="rounded-full overflow-hidden w-40"
                                            />
                                        </div>

                                        <FontAwesomeIcon
                                            icon={faQuoteLeft}
                                            className="quotIcon absolute left-4 top-3 -bottom-40 text-9xl text-purple-300 group-hover:text-purple-500 transition-all duration-500 "
                                        />

                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl my-4 text-black">
                                                {testimonial?.first_name}
                                            </h3>

                                            <div className="rate text-2xl text-yellow-500 flex gap-1 items-center">
                                                {/* <i className="filled fas fa-star"></i>  */}
                                                {/* <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon
                                                icon={faStarRegular}
                                            /> */}

                                                {[...Array(5)].map((_, index) =>
                                                    index <
                                                    testimonial?.rating ? (
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            key={index}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faStarRegular}
                                                            key={index}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <p
                                            className="text-lg py-2 truncate max-w-[350px]" // max-w-[150px] xs:max-w-[200px] sm:max-w-[250px]
                                        >
                                            {testimonial?.message}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* <div
                            className="testimonial-box testimonial-box-2"
                            data-aos="flip-left"
                        >
                            <img
                                src={teacher2image || "images/teacher-2.svg"}
                                alt={`teacher 2 image`}
                                loading="lazy"
                            />

                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="quotIcon"
                            />

                            <h3>{`اٍسحاق`}</h3>

                            <div className="rate">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarRegular} />
                            </div>

                            <p>
                                {`أنا سعيد جدا بالدراسة في أكاديمية مُعلم أكاديمة
                                رائعة و أساتذة مشاء الله .`}
                            </p>
                        </div>

                        <div
                            className="testimonial-box testimonial-box-3"
                            data-aos="flip-left"
                        >
                            <img
                                src={teacher3image || "./images/teacher-3.svg"}
                                alt={`teacher 3 image`}
                                loading="lazy"
                            />

                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="quotIcon"
                            />

                            <h3>{`منتصر`}</h3>

                            <div className="rate">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarRegular} />
                            </div>

                            <p>
                                {`أنا سعيد جدا بالدراسة في أكاديمية مُعلم أكاديمة
                                رائعة و أساتذة مشاء الله .`}
                            </p>
                        </div> */}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Testimonials;
