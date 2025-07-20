/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

// style
import "./CategoryPage.scss";

// api
import {
    appGetCategoryById,
    appGetSectionCourseCategory,
} from "../../../../api/app/authApp";

// data
import { categorycourses, Courses, questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// assets
import course1 from "../../../../assets/images/courses/course-1.jpeg";
import error500 from "../../../../assets/images/error/error-500.webp";
import noimage from "../../../../assets/images/error/no-image.jpg";
import { nameMainColor } from "../../../../utils/constants";

function CategoryDetails() {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [categoryData, setCategoryData] = useState(null);
    const [sectionsCourseCategory, setSectionsCourseCategory] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data, error } = await appGetCategoryById(categoryId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/categories`);
                } else {
                    setCategoryData(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/categories`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId, navigate]);

    useEffect(() => {
        const fetchSectionCourseCategory = async () => {
            try {
                const { data, error } = await appGetSectionCourseCategory(
                    categoryId
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
                    setSectionsCourseCategory(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/categories`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSectionCourseCategory();
    }, [categoryId]);

    if (isLoading && !categoryData) {
        return (
            <div className="flex justify-center items-center h-64 mt-60">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!categoryData) {
        return (
            <div className="text-center py-12 mt-50">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // console.log(`categoryData`, categoryData);
    // console.log(`sectionsCourseCategory`, sectionsCourseCategory);

    return (
        <>
            <section className="category-page min-h-dvh bg-gray-50 pt-50 pb-20">
                <div className="container mx-auto px-4">
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
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : categoryData.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">جاري تحميل التصنيف</p>
                        </div>
                    ) : (
                        <div
                            className="category-header text-center mb-10"
                            data-aos="zoom-in"
                        >
                            <div className=" w-96 h-96 flex items-center justify-center rounded-full bg-white shadow p-16  mx-auto mb-4">
                                <img
                                    src={
                                        categoryData?.image_url ||
                                        categoryData?.image ||
                                        noimage
                                    }
                                    alt={categoryData?.title}
                                    onError={(e) => {
                                        e.target.src = noimage;
                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                    }}
                                    className="w-full h-full object-fill"
                                />
                            </div>

                            <h1 className="text-3xl font-bold my-4">
                                {categoryData?.title}
                            </h1>
                        </div>
                    )}

                    <div className="sections-container">
                        <h2 className="text-2xl font-bold my-16 text-center">
                            الأقسام المتاحة
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : sectionsCourseCategory.length === 0 ? (
                            <div className="flex items-center justify-center flex-col  text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    لا توجد أقسام في هذا التصنيف
                                </p>

                                <p
                                    onClick={() => {
                                        navigate(`/categories`);
                                    }}
                                    className={`w-max text-white mt-8 text-3xl py-20 px-10 rounded-full font-bold cursor-pointer bg-blue-600`}
                                >
                                    التصنيفات
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {sectionsCourseCategory?.map(
                                    (section, index) => (
                                        <li
                                            key={index}
                                            className={`${
                                                section.is_visible === false
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                            data-aos="fade-up"
                                        >
                                            <div
                                                className={`bg-white rounded-2xl p-4 shadow 
                                                    transition-all duration-500 cursor-pointer 
                                                    h-full text-center hover:-translate-y-4 hover:shadow-md
                                                    
                                                    `}
                                                onClick={() => {
                                                    // handleSectionClick(section);
                                                }}
                                            >
                                                <div className="w-80 h-80 mb-8 flex items-center justify-center rounded-full transition-all mx-auto py-4 border-2 border-gray-200">
                                                    <img
                                                        src={
                                                            section?.image_url ||
                                                            section?.image ||
                                                            noimage
                                                        }
                                                        alt={`${section?.title}`}
                                                        title={`${section?.title}`}
                                                        onError={(e) => {
                                                            e.target.src =
                                                                noimage; // صورة افتراضية
                                                            e.target.onerror =
                                                                null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                        }}
                                                        className="object-fill rounded-full"
                                                    />
                                                </div>

                                                <h3 className="text-2xl font-bold mb-6 mt-4 overflow-hidden">
                                                    {section?.title}

                                                    {section?.grade &&
                                                        ` (${section?.grade})`}
                                                </h3>

                                                <button
                                                    className={`bg-blue-700 text-white rounded-lg p-4 transition-all duration-500  w-full py-4 mt-4 text-2xl`}
                                                    onClick={(e) => {
                                                        // e.stopPropagation();
                                                        // handleSectionClick(
                                                        //     section
                                                        // );
                                                        navigate(
                                                            `/sectionscourse/${section.id}`
                                                        );
                                                    }}
                                                >
                                                    عرض الدورات
                                                </button>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>

                    {/* {!selectedSection ? (
                        // عرض الأقسام
                        <div className="sections-container">
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                الأقسام المتاحة
                            </h2>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {categoryData?.sections?.map(
                                    (section, index) => (
                                        <li key={index}>
                                            <div
                                                className="section-card text-center"
                                                onClick={() => {
                                                    handleSectionClick(section);
                                                }}
                                            >
                                                <div className="section-icon-wrapper mb-4 mx-auto py-4">
                                                    <img
                                                        src={section?.image}
                                                        alt={`${section?.name}`}
                                                        title={`${section?.name}`}
                                                    />
                                                </div>

                                                <h3 className="text-2xl font-bold mb-4">
                                                    {section?.name}

                                                    {section?.grade &&
                                                        ` (${section?.grade})`}
                                                </h3>

                                                <button
                                                    className="section-btn w-full py-4 mt-4 text-2xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSectionClick(
                                                            section
                                                        );
                                                    }}
                                                >
                                                    عرض الدورات
                                                </button>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ) : (
                        // عرض الدورات المرتبطة بالقسم
                        <div className="courses-container flex flex-col gap-8">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => {
                                                setSelectedSection(null);
                                            }}
                                            className="p-2 rounded-full hover:bg-gray-200 transition-all text-black"
                                        >
                                            <ArrowRight size={20} />
                                        </button>
                                        <h2 className="text-3xl font-bold text-gray-800">
                                            العودة للأقسام
                                        </h2>
                                    </div>

                                    <h2 className="text-2xl font-bold">
                                        (دورات {selectedSection?.name})
                                    </h2>
                                </div>

                                {sectionCourses.length > 0 ? (
                                    // <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <ul className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {sectionCourses?.map(
                                            (course, index) => (
                                                <li
                                                    key={index}
                                                    data-aos="flip-left"
                                                >
                                                    <div className="course-card">
                                                        <figure
                                                            className="card-banner img-holder min-h-96 max-h-96"
                                                            // style={{ width: 370, height: 220 }}
                                                        >
                                                            <img
                                                                src={
                                                                    course?.image ||
                                                                    course1 ||
                                                                    "./assets/images/course-1.jpg"
                                                                }
                                                                // width="370"
                                                                // height="220"
                                                                className="img-cover min-h-96"
                                                                alt={`${course?.title} - ${course?.description}`}
                                                                loading="lazy"
                                                            />
                                                        </figure>

                                                        <div className="abs-badge">
                                                            <ion-icon
                                                                name="time-outline"
                                                                aria-hidden="true"
                                                            ></ion-icon>

                                                            <span className="span">
                                                                {
                                                                    course?.duration
                                                                }
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="card-content"
                                                            onClick={() => {
                                                                navigate(
                                                                    `/courses/${course?.id}`
                                                                );
                                                            }}
                                                        >
                                                            <span className="badge">
                                                                {`
                                                        مبداء
                                                    `}
                                                            </span>

                                                            <h3 className="h3">
                                                                <Link
                                                                    to={`/courses/${course?.id}`}
                                                                    href="#"
                                                                    className="card-title truncate"
                                                                >
                                                                    {`${course?.title}`}
                                                                </Link>
                                                            </h3>

                                                            <div className="wrapper">
                                                                <div className="rating-wrapper">
                                                                    <ion-icon name="star"></ion-icon>
                                                                    <ion-icon name="star"></ion-icon>
                                                                    <ion-icon name="star"></ion-icon>
                                                                    <ion-icon name="star"></ion-icon>
                                                                    <ion-icon name="star"></ion-icon>
                                                                </div>

                                                                <p className="rating-text">
                                                                    {course?.rating
                                                                        ? `(${course.rating})`
                                                                        : "(5.0)"}{" "}
                                                                    تقييم
                                                                </p>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <data
                                                                    className="price text-blue-600 font-bold"
                                                                    value={
                                                                        course?.price ||
                                                                        0
                                                                    }
                                                                >
                                                                    {course?.price?.toLocaleString() -
                                                                        course?.discount?.toLocaleString() ||
                                                                        0}{" "}
                                                                    ر.س
                                                                </data>

                                                                {course?.price && (
                                                                    <span className="text-gray-500 line-through text-sm">
                                                                        {course.price.toLocaleString()}{" "}
                                                                        ر.س
                                                                    </span>
                                                                )}

                                                                {course?.discount && (
                                                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                                                                        خصم{" "}
                                                                        {
                                                                            course.discount
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <ul className="card-meta-list">
                                                                <li className="card-meta-item text-3xl">
                                                                    <ion-icon
                                                                        name="library-outline"
                                                                        aria-hidden="true"
                                                                    ></ion-icon>

                                                                    <span className="span">
                                                                        {
                                                                            course?.lessonCount
                                                                        }
                                                                    </span>
                                                                </li>

                                                                <li className="card-meta-item text-3xl">
                                                                    <ion-icon
                                                                        name="people-outline"
                                                                        aria-hidden="true"
                                                                    ></ion-icon>

                                                                    <span className="span">
                                                                        {
                                                                            course?.studentsCount
                                                                        }
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <div className="flex flex-col items-center justify-start text-center px-4">
                                        <div className="max-w-96 max-h-96">
                                            <img
                                                src={error500}
                                                alt={error500}
                                                className="max-w-96 max-h-96"
                                            />
                                        </div>
                                        <p className="text-3xl text-gray-600 my-2">
                                            لا توجد دورات متاحة حالياً لهذا
                                            القسم.
                                        </p>

                                        <Link
                                            to={`/courses`}
                                            className="text-2xl mt-4 flex items-center justify-center gap-4 px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            جميع الدورات
                                            <BookOpen size={20} />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div>
                                {error && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                )}

                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div
                                                key={i}
                                                className="card animate-pulse"
                                            >
                                                <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
                                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {filteredQuizBanks.length === 0 ? (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500 text-lg">
                                                    No quiz banks found
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {currentItems?.map(
                                                        (quizBank, index) => (
                                                            // <UserQuizBankCard
                                                            //     key={quizBank?.id}
                                                            //     quizBank={quizBank}
                                                            // />
                                                            <div
                                                                className="card hover:shadow-lg transition-all duration-300 group p-8  rounded-4xl"
                                                                key={index}
                                                                data-aos="flip-right"
                                                            >
                                                                <div className="aspect-video w-full overflow-hidden rounded-3xl mb-4 ">
                                                                    <img
                                                                        src={
                                                                            quizBank?.image
                                                                            // || defaultImage
                                                                        }
                                                                        alt={
                                                                            quizBank?.title
                                                                        }
                                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                                                                    />
                                                                </div>

                                                                <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                                                                    {
                                                                        quizBank?.title
                                                                    }
                                                                </h3>

                                                                <p className="text-lg text-gray-600 mb-4 line-clamp-2">
                                                                    {
                                                                        quizBank?.description
                                                                    }
                                                                </p>

                                                                <p className="text-md text-fuchsia-500 mb-2 flex items-center gap-4">
                                                                    {
                                                                        quizBank?.section_name
                                                                    }
                                                                </p>

                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <span className="text-lg font-medium text-blue-500">
                                                                            عدد
                                                                            الاسئلة{" "}
                                                                            {quizBank?.question_count ||
                                                                                0}
                                                                        </span>
                                                                    </div>

                                                                    <Link
                                                                        to={`/questions-banks/${quizBank?.id}`}
                                                                        // className=" flex items-center space-x-1"
                                                                        className="px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
                                                                    >
                                                                        <span>
                                                                            أبداء
                                                                            الاختبار
                                                                        </span>

                                                                        <FiExternalLink
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )} */}
                </div>
            </section>
        </>
    );
}

export default CategoryDetails;
