/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
// import "./CourseHome.scss";

// api
import {
    appGetCourses,
    appGetSectionsCourseApp,
} from "../../../../api/app/authApp";

// data
import { Courses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_User,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// components
import CourseCard from "../../coursespage/card/CourseCard";
import CourseHome from "../course/CourseHome";

// assets

function SectionsCourses() {
    const navigate = useNavigate();

    const [sectionsCourses, setSectionsCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetSectionsCourseApp(
                    currentPage,
                    selectedStatus
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setSectionsCourses(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
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

        fetchCourses();
    }, [currentPage, selectedStatus]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 pt-80">
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

    // console.log(`sectionsCourses`, sectionsCourses);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div
                        className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                    ></div>
                </div>
            ) : sectionsCourses?.length === 0 ? (
                <section
                    className="section course"
                    id="courses"
                    aria-label="course"
                >
                    <div className="container">
                        <h2 className="h2 section-title" data-aos="fade-down">
                            أقسام الدورات
                        </h2>

                        <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لم يتم أضافة أقسام حتي الان
                            </p>
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    {sectionsCourses?.map((section, index) => (
                        <CourseHome section={section} key={index} />
                    ))}
                </>
            )}
        </>
    );
}

export default SectionsCourses;
