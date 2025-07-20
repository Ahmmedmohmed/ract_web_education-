/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
import "./CourseHome.scss";

// api
import {
    appGetCourses,
    appGetCoursesResult,
} from "../../../../api/app/authApp";

// data
import { Courses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, PAGE_SIZE } from "../../../../utils/constants";

// components
import CourseCard from "../../coursespage/card/CourseCard";
import IslamicBG from "../../../../ui/bg/IslamicBG";

// assets
import course1 from "../../../../assets/images/courses/course-1.jpeg";
import course2 from "../../../../assets/images/courses/course-2.jpg";
import course3 from "../../../../assets/images/courses/course-3.jpg";
import blogshape from "../../../../assets/images/blog/blog-shape.png";

function CourseHome({ section }) {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        // fetchCourses();
    }, [currentPage, selectedStatus]);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await appGetCoursesResult(
                9,
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب التصنيفات");
            } else {
                setCourses(data);
                setAllCourses(data);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
            );
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-64 pt-80">
    //             <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
    //             {error}
    //         </div>
    //     );
    // }

    // console.log(`section`, section);

    return (
        <>
            {section && (
                <section
                    className="section course relative  min-h-dvh"
                    id="courses"
                    aria-label="course"
                >
                    <div className="container relative">
                        <div className="content relative z-[1]">
                            {/* <img
                                src={
                                    blogshape ||
                                    "./assets/images/blog-shape.png"
                                }
                                width="186"
                                height="186"
                                loading="lazy"
                                alt="blog-shape"
                                className="shape blog-shape top left-0"
                            /> */}

                            <p
                                className="section-subtitle"
                                data-aos="fade-down"
                            >
                                اختر دورة للبدء
                            </p>

                            <h2
                                className="h2 section-title"
                                data-aos="fade-down"
                            >
                                {section?.title}
                            </h2>

                            {section?.courses?.length === 0 ? (
                                <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                    <p className="text-gray-500">
                                        لا توجد دورات حاليا
                                    </p>
                                </div>
                            ) : (
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {section?.courses?.map((course, index) => (
                                        <CourseCard
                                            course={course}
                                            key={index}
                                        />
                                    ))}
                                </ul>
                            )}

                            {/* <img
                                src={
                                    blogshape ||
                                    "./assets/images/blog-shape.png"
                                }
                                width="186"
                                height="186"
                                loading="lazy"
                                alt="blog-shape"
                                className="shape blog-shape bottom right-0"
                            /> */}

                            {/* <Link to={`/courses`} href="#" className="btn has-before">
                        <ion-icon
                            name="arrow-forward-outline"
                            aria-hidden="true"
                        ></ion-icon>

                        <span className="span">شاهد جميع الدورات</span>
                    </Link> */}
                        </div>
                    </div>

                    <IslamicBG />
                </section>
            )}
        </>
    );
}

export default CourseHome;
