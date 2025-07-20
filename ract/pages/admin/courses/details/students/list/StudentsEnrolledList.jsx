/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    X,
    Search,
    Mail,
    UserPlus,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Filter,
    ArrowUpDown,
    Calendar,
    Activity,
    MessageCircleMore,
    Send,
    Loader2,
    ArrowRight,
} from "lucide-react";

// api
import { publicGetFetchEnrolledStudentsCourse } from "../../../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../../../store/UserDataStore";

// data
import { Students } from "../../../../../../data/data";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../../../utils/constants";
import { formatDateAR } from "../../../../../../utils/helpers";

// assets
import noimage from "../../../../../../assets/images/error/no-image.jpg";

function StudentsEnrolledList() {
    const navigate = useNavigate();

    const { courseId } = useParams();
    let { userData } = UserDataStore();

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchEnrolledStudentsCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await publicGetFetchEnrolledStudentsCourse(courseId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message ||
                            "حدث خطأ أثناء جلب الطلاب المشتركين في الدورة"
                    );
                    navigate(`/${App_Admin}/courses/${courseId}`);
                } else {
                    setStudents(data.results);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب الطلاب المشتركين في الدورة"
                );
                setIsLoading(false);
                navigate(`/${App_Admin}/courses/${courseId}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnrolledStudentsCourse();
    }, [courseId, navigate]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

    // console.log(`students`, students);

    return (
        <>
            <div className="">
                <div className="">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div className="flex items-center justify-center   ">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/${App_Admin}/courses/${courseId}`
                                    );
                                    // moveBack();
                                }}
                                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold mr-2 text-black ">
                                الطلاب المشتركين في
                                {students?.length > 0
                                    ? ` (${students[0]?.course?.title}) `
                                    : ` هذه الدورة `}
                                {/* {students?[0].course && "d" } */}
                            </h1>
                        </div>
                    </div>

                    <div className="p-4 border-b border-gray-200 hidden">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative flex-1">
                                <label
                                    htmlFor="search"
                                    className="hidden"
                                ></label>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="البحث عن طالب..."
                                    className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                                    value={searchQuery}
                                    onChange={() => {
                                        // handleSearch();
                                    }}
                                />
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                    size={18}
                                />
                            </div>

                            {/* <button
                            onClick={() => {
                                setShowFilters(!showFilters);
                            }}
                            className={`p-2 rounded-md flex items-center ${
                                showFilters
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            <Filter size={18} className="ml-1" />
                            تصفية
                        </button> */}
                        </div>

                        {/* {showFilters && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                <div className="flex flex-wrap gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            نسبة الإكمال
                                        </label>
                                        <select
                                            className="p-1.5 border border-gray-300 rounded-md min-w-32"
                                            value={filters.progress}
                                            onChange={(e) =>
                                                setFilters({
                                                    ...filters,
                                                    progress: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">الجميع</option>
                                            <option value="منخفض">
                                                منخفض (أقل من 30%)
                                            </option>
                                            <option value="متوسط">
                                                متوسط (30% - 70%)
                                            </option>
                                            <option value="مرتفع">
                                                مرتفع (أكثر من 70%)
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            تاريخ الاشتراك
                                        </label>
                                        <select
                                            className="p-1.5 border border-gray-300 rounded-md min-w-32"
                                            value={filters.enrollmentDate}
                                            onChange={(e) =>
                                                setFilters({
                                                    ...filters,
                                                    enrollmentDate:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">الجميع</option>
                                            <option value="حديثًا">
                                                حديثًا (خلال الشهر)
                                            </option>
                                            <option value="أقل من 3 شهور">
                                                أقل من 3 شهور
                                            </option>
                                            <option value="أكثر من 3 شهور">
                                                أكثر من 3 شهور
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            onClick={resetFilters}
                                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                                        >
                                            إعادة تعيين
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="text-sm text-gray-600 mb-2">
                                        ترتيب حسب:
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => {
                                                toggleSort("name");
                                            }}
                                            className={`px-2 py-1 rounded-md flex items-center text-sm ${
                                                sortBy === "name"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            الاسم
                                            {sortBy === "name" && (
                                                <ArrowUpDown
                                                    size={14}
                                                    className="mr-1"
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                toggleSort("progress");
                                            }}
                                            className={`px-2 py-1 rounded-md flex items-center text-sm ${
                                                sortBy === "progress"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            نسبة الإكمال
                                            {sortBy === "progress" && (
                                                <ArrowUpDown
                                                    size={14}
                                                    className="mr-1"
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                toggleSort("lastActive");
                                            }}
                                            className={`px-2 py-1 rounded-md flex items-center text-sm ${
                                                sortBy === "lastActive"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            آخر نشاط
                                            {sortBy === "lastActive" && (
                                                <ArrowUpDown
                                                    size={14}
                                                    className="mr-1"
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={() =>
                                                toggleSort("enrollmentDate")
                                            }
                                            className={`px-2 py-1 rounded-md flex items-center text-sm ${
                                                sortBy === "enrollmentDate"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            تاريخ الاشتراك
                                            {sortBy === "enrollmentDate" && (
                                                <ArrowUpDown
                                                    size={14}
                                                    className="mr-1"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>

                    <div className="my-10">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : students?.length === 0 ? (
                            <div className="text-center p-8">
                                <p className="text-gray-500">
                                    لا يوجد طلاب مشتركين في هذه الدورة
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {students?.map((student, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="space-y-4">
                                                {/* اسم الطالب */}
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                                        <span>الطالب: </span>

                                                        <span>
                                                            {student?.student
                                                                ?.first_name +
                                                                " " +
                                                                student?.student
                                                                    ?.last_name}
                                                        </span>
                                                    </h3>
                                                </div>

                                                {/* البريد الإلكتروني */}
                                                <div className="flex items-center text-gray-600 text-2xl">
                                                    <Mail
                                                        size={16}
                                                        className="ml-2"
                                                    />
                                                    <a
                                                        href={`mailto:${student?.student?.email}`}
                                                        className={`hover:text-blue-600 transition-all duration-300 truncate`}
                                                    >
                                                        {
                                                            student?.student
                                                                ?.email
                                                        }
                                                    </a>
                                                </div>

                                                {/* تاريخ الاشتراك */}
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar
                                                        size={16}
                                                        className="ml-2"
                                                    />
                                                    <span>
                                                        {formatDateAR(
                                                            student?.created_at
                                                        )}
                                                    </span>
                                                </div>

                                                {/* زر المراسلة */}
                                                <div className="pt-2 flex justify-end">
                                                    <button
                                                        onClick={() => {
                                                            // startChat(student);
                                                            navigate(
                                                                `/${App_Admin}/courses/${courseId}/students/chat/${userData?.id}/${student?.student?.id}`
                                                            );
                                                        }}
                                                        className={`flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-300`}
                                                        title="مراسلة الطالب"
                                                    >
                                                        <Send
                                                            size={16}
                                                            className="ml-2"
                                                        />
                                                        <span>مراسلة</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalCount > PAGE_SIZE && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                            <div className="text-sm text-gray-600">
                                عرض {(currentPage - 1) * PAGE_SIZE + 1} إلى{" "}
                                {Math.min(currentPage * PAGE_SIZE, totalCount)}{" "}
                                من أصل {totalCount} رسالة
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
                                        } else if (
                                            currentPage >=
                                            totalPages - 2
                                        ) {
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

                                {totalPages > 5 &&
                                    currentPage < totalPages - 2 && (
                                        <span className="px-2">...</span>
                                    )}

                                {totalPages > 5 &&
                                    currentPage < totalPages - 2 && (
                                        <button
                                            onClick={() =>
                                                handlePageChange(totalPages)
                                            }
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
                                            Math.min(
                                                totalPages,
                                                currentPage + 1
                                            )
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

                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl text-gray-500 flex items-center gap-2">
                                إجمالي الطلاب:{" "}
                                <span className="font-medium">
                                    {students?.length}
                                </span>
                            </div>

                            <button
                                // className="px-4 py-2 flex items-center gap-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                onClick={() => {
                                    navigate(
                                        `/${App_Admin}/courses/students/create`
                                    );
                                }}
                            >
                                <span>إضافة طالب الي الدورة</span>

                                <UserPlus size={16} className="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentsEnrolledList;
