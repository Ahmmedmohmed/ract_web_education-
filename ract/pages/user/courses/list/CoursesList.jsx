/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// api
import { userGetStudentEnrolledCourses } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// Data
// import { Courses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_User,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// Component
import CourseCard from "./CourseCard";

function CoursesList() {
    // const { courses } = useAppData();
    // const [searchQuery, setSearchQuery] = useState('');

    // const filteredCourses = courses.filter(course =>
    //   course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   course.description.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    //
    let { userData, userProfile } = UserDataStore();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        courseId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, [currentPage]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchCourses();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await userGetStudentEnrolledCourses(
                userData?.id,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الدورات");
            } else {
                setCourses(data.results);
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

    const handleSearch = async () => {
        try {
            // const { data, error } = await publicSearchCourses(
            //     searchQuery,
            //     currentPage
            // );
            // if (error) {
            //     Toast("error", error.message || "حدث خطأ أثناء البحث");
            // } else {
            //     setCourses(data.results);
            //     setTotalPages(Math.ceil(data.count / PAGE_SIZE));
            //     setTotalCount(data.count);
            // }
        } catch (error) {
            console.error("Error searching courses:", error);
            Toast("error", "حدث خطأ أثناء البحث");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchAction = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() !== "") {
            setIsLoading(true);
            setSearchTimeout(
                setTimeout(() => {
                    handleSearch();
                }, 500)
            );
        } else if (searchQuery.trim() === "") {
            fetchCourses();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleVisibilityChange = async (courseId, newVisibility) => {
        try {
            // const { data, error } = await publicUpdateCourseVisibility(
            //     courseId,
            //     newVisibility
            // );
            // if (error) {
            //     Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            // } else {
            //     setCourses(
            //         courses.map((course) =>
            //             course.id === courseId
            //                 ? { ...course, is_visible: newVisibility }
            //                 : course
            //         )
            //     );
            //     Toast("success", "تم تحديث حالة الدورة بنجاح");
            // }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    const handleDelete = (courseId) => {
        setDeleteConfirmation({
            show: true,
            courseId,
            message: "هل أنت متأكد من حذف هذه الدورة؟",
        });
    };

    const confirmDelete = async () => {
        try {
            // const { error } = await publicDeleteCourse(
            //     deleteConfirmation.courseId
            // );
            // if (error) {
            //     Toast("error", error.message || "حدث خطأ أثناء الحذف");
            // } else {
            //     setCourses(
            //         courses.filter(
            //             (course) => course.id !== deleteConfirmation.courseId
            //         )
            //     );
            //     Toast("success", "تم حذف الدورة بنجاح");
            //     navigate(`/${App_Admin}/home`);
            // }
        } catch (error) {
            console.error("Error deleting course:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            courseId: null,
            message: "",
        });
    };

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
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center   ">
                        <button
                            onClick={() => {
                                navigate(`/${App_User}/home`);
                                // moveBack();
                            }}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black ">
                            الدورات التعليمية المشترك بها
                            {/* {students?[0].course && "d" } */}
                        </h1>
                    </div>
                </div>

                {/* <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        الدورات التعليمية
                    </h1>
                    <p className="text-gray-600">

                        تظهر هنا جميع الدورات التي قم بالاشتراك بها
                    </p>
                </div> */}

                {/* <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full p-3 pr-10 rounded-md border border-gray-300 bg-white text-right"
                                placeholder="ابحث عن دورة..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
                            <Filter size={18} />
                            <span>تصفية</span>
                        </button>
                    </div>
                </div> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500">
                                لا توجد دورات مطابقة للبحث
                            </p>
                        </div>
                    )}
                </div> */}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                        ></div>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">
                            لم تقم بالاشتراك في اي دورة بعد
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses?.map((course, index) => (
                            <CourseCard key={index} enroll={course} />
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <Link
                        to={`/courses`}
                        href="#"
                        className="btn has-before mt-10 "
                    >
                        <span className="span">شاهد جميع الدورات</span>

                        <ArrowRight />
                    </Link>
                </div>

                {/* Pagination */}
                {totalCount > PAGE_SIZE && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                        <div className="text-sm text-gray-600">
                            عرض {(currentPage - 1) * PAGE_SIZE + 1} إلى{" "}
                            {Math.min(currentPage * PAGE_SIZE, totalCount)} من
                            أصل {totalCount} دورة
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        Math.max(1, currentPage - 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className={`p-2 rounded-md ${
                                    currentPage === 1
                                        ? "text-gray-400 cursor-not-allowed"
                                        : `text-blue-600 hover:bg-blue-50`
                                }`}
                            >
                                <ChevronRight size={20} />
                            </button>

                            {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() =>
                                                handlePageChange(pageNum)
                                            }
                                            className={`px-3 py-1 rounded-md ${
                                                currentPage === pageNum
                                                    ? `bg-blue-600 text-white`
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-2">...</span>
                            )}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === totalPages
                                            ? `bg-blue-600 text-white`
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {totalPages}
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    handlePageChange(
                                        Math.min(totalPages, currentPage + 1)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-md ${
                                    currentPage === totalPages
                                        ? "text-gray-400 cursor-not-allowed"
                                        : `text-blue-600 hover:bg-blue-50`
                                }`}
                            >
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CoursesList;
