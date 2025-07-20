/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

// style
// import "./CoursesList.scss";

// api
import { appGetPackagesApp } from "../../../../api/app/authApp";

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
import PackageCard from "../card/PackageCard";

// ui
import IslamicBG from "../../../../ui/bg/IslamicBG";

// assets
import course1 from "../../../../assets/images/courses/course-1.jpeg";
import course2 from "../../../../assets/images/courses/course-2.jpg";
import course3 from "../../../../assets/images/courses/course-3.jpg";

function PackagesCoursesList() {
    const navigate = useNavigate();

    const [packages, setPackages] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
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

                const { data, error } = await appGetPackagesApp(
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
                    navigate(`/`);
                } else {
                    setPackages(data);
                    setAllCourses(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
                navigate(`/`);
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
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600 `} />
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

    // console.log(`packages`, packages);

    return (
        <>
            <section
                className="section course  relative min-h-dvh"
                 
                aria-label="course"
            >
                <div className="container relative z-[1]">
                    <div className="pt-20">
                        <p className="section-subtitle" data-aos="fade-down">
                            {`
                            الباقات التدريبية 
                        `}
                        </p>

                        <h2 className="h2 section-title" data-aos="fade-down">
                            {`
                            اختر باقة للبدء
                        `}
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : packages?.length === 0 ? (
                            <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    لا توجد باقات حاليا
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages?.map((packageCourse, index) => (
                                    <PackageCard
                                        packageCourse={packageCourse}
                                        key={index}
                                    />
                                ))}
                            </ul>
                        )}

                        <Link
                            to={`/${App_User}/packages`}
                            href="#"
                            className="btn has-before"
                        >
                            <span className="span">أنشاء باقتك الخاصة</span>

                            <ArrowRight />

                            {/* <ion-icon
                                name="arrow-forward-outline"
                                aria-hidden="true"
                            ></ion-icon> */}
                        </Link>
                    </div>
                </div>

                <IslamicBG />
            </section>
        </>
    );
}

export default PackagesCoursesList;
