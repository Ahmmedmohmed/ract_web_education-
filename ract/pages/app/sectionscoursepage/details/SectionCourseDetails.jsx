/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

// style
// import "./CategoryPage.scss";

// api
import {
    appGetSectionCourseById,
    appGetCourseSectionCourse,
    appGetQuestionBankSectionCourse,
} from "../../../../api/app/authApp";

// data
import { categorycourses, Courses, questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// components
import CourseCard from "../../coursespage/card/CourseCard";
import QuestionBankCard from "../../questionbankspage/card/QuestionBankCard";

// assets
import course1 from "../../../../assets/images/courses/course-1.jpeg";
import error500 from "../../../../assets/images/error/error-500.webp";
import noimage from "../../../../assets/images/error/no-image.jpg";
import { nameMainColor } from "../../../../utils/constants";

function SectionCourseDetails() {
    const { sectioncourseId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [sectioncourseData, setSectionCourseData] = useState(null);
    const [courseSectionscourse, setCourseSectionscourse] = useState([]);
    const [questionBankSectioncourse, setQuestionBankSectioncourse] = useState(
        []
    );

    useEffect(() => {
        const fetchSectionCourse = async () => {
            try {
                const { data, error } = await appGetSectionCourseById(
                    sectioncourseId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/categories`);
                } else {
                    setSectionCourseData(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/categories`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSectionCourse();
    }, [sectioncourseId, navigate]);

    useEffect(() => {
        const fetchCourseSectionCourse = async () => {
            try {
                const { data, error } = await appGetCourseSectionCourse(
                    sectioncourseId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/categories`);
                } else {
                    setCourseSectionscourse(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/categories`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourseSectionCourse();
    }, [sectioncourseId]);

    useEffect(() => {
        const fetchQuestionBankSectionCourse = async () => {
            try {
                const { data, error } = await appGetQuestionBankSectionCourse(
                    sectioncourseId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/questions-banks`);
                } else {
                    setQuestionBankSectioncourse(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/questions-banks`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestionBankSectionCourse();
    }, [sectioncourseId]);

    if (isLoading && !sectioncourseData) {
        return (
            <div className="flex justify-center items-center h-64 mt-60">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 `}
                ></div>
            </div>
        );
    }

    if (!sectioncourseData) {
        return (
            <div className="text-center py-12 mt-50">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // console.log(`sectioncourseData`, sectioncourseData);
    // console.log(`courseSectionscourse`, courseSectionscourse);
    // console.log(`questionBankSectioncourse`, questionBankSectioncourse);

    return (
        <>
            <section className="category-page min-h-dvh bg-gray-50 pt-50 pb-20">
                <div className="container mx-auto ">
                    {/* <div className="mb-8">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            العودة للرئيسية
                        </Link>
                    </div> */}

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 `}
                            ></div>
                        </div>
                    ) : sectioncourseData.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">جاري تحميل القسم</p>
                        </div>
                    ) : (
                        <div
                            className="category-header text-center mb-10"
                            data-aos="zoom-in"
                        >
                            <div className=" w-96 h-96 flex items-center justify-center rounded-full bg-white shadow p-16  mx-auto mb-4">
                                <img
                                    src={
                                        sectioncourseData?.image_url ||
                                        sectioncourseData?.image ||
                                        noimage
                                    }
                                    alt={sectioncourseData?.title}
                                    onError={(e) => {
                                        e.target.src = noimage;
                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                    }}
                                    className="w-full h-full object-fill"
                                />
                            </div>

                            <h1 className="text-3xl font-bold my-4">
                                {sectioncourseData?.title}
                            </h1>
                        </div>
                    )}

                    <div className="sections-container mb-40">
                        <h2 className="text-2xl font-bold my-16 text-center">
                            الدورات المتاحة
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 `}
                                ></div>
                            </div>
                        ) : courseSectionscourse.length === 0 ? (
                            <div
                                className="flex items-center justify-center flex-col  text-center text-2xl font-bold py-12 bg-white rounded-lg"
                                data-aos="fade-up"
                            >
                                <p className="text-gray-500">
                                    لا توجد دورات في هذا القسم
                                </p>

                                <p
                                    onClick={() => {
                                        navigate(`/courses`);
                                    }}
                                    className={`w-max text-white mt-8 text-3xl py-18 px-12 rounded-full font-bold cursor-pointer bg-blue-600 `}
                                >
                                    الدورات
                                </p>
                            </div>
                        ) : (
                            <ul className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courseSectionscourse?.map((course, index) => (
                                    <CourseCard course={course} key={index} />
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="sections-container mb-20">
                        <h2 className="text-2xl font-bold my-16 text-center">
                            الاختبارات المتاحة
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 `}
                                ></div>
                            </div>
                        ) : questionBankSectioncourse.length === 0 ? (
                            <div
                                className="flex items-center justify-center flex-col  text-center text-2xl font-bold py-12 bg-white rounded-lg"
                                data-aos="fade-up"
                            >
                                <p className="text-gray-500">
                                    لا توجد اختبارات في هذا القسم
                                </p>

                                <p
                                    onClick={() => {
                                        navigate(`/courses`);
                                    }}
                                    className={`w-max text-white mt-8 text-3xl py-20 px-10 rounded-full font-bold cursor-pointer bg-blue-600`}
                                >
                                    الاختبارات
                                </p>
                            </div>
                        ) : (
                            <ul className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {questionBankSectioncourse?.map(
                                    (questionbank, index) => (
                                        <QuestionBankCard
                                            key={index}
                                            questionbank={questionbank}
                                        />
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default SectionCourseDetails;
