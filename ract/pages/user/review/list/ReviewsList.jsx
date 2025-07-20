/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    User,
    MoreVertical,
    Check,
    X,
    Trash2,
    Star,
    Calendar,
    ArrowRight,
    Edit,
    Plus,
} from "lucide-react";

// API
import {
    getReviewsList,
    searchReviews,
    updateReviewStatus,
    deleteReview,
} from "../../../../api/public/authPublic";

// utils
import {
    App_User,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// UI
import Toast from "../../../../plugin/Toast";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

function ReviewsList() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const dropdownRef = useRef(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        reviewId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Fetch reviews from API
    useEffect(() => {
        fetchReviews();
    }, [currentPage, selectedRating, selectedStatus]);

    // Handle search with debounce
    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // if (searchQuery.trim() !== "") {
        //     setIsLoading(true);
        //     setSearchTimeout(
        //         setTimeout(() => {
        //             handleSearch();
        //         }, 500)
        //     );
        // } else
        if (searchQuery.trim() === "") {
            fetchReviews();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchReviews = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await getReviewsList(
                currentPage,
                selectedRating,
                selectedStatus
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب التقييمات");
            } else {
                setReviews(data.results);
                setAllReviews(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            Toast("error", "حدث خطأ غير متوقع");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const { data, error } = await searchReviews(
                searchQuery,
                currentPage
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setReviews(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error searching reviews:", error);
            Toast("error", "حدث خطأ أثناء البحث");
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
            // } else if (searchQuery.trim() === "" && messages.length === 0) {
        } else if (searchQuery.trim() === "") {
            fetchReviews();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStatusChange = async (reviewId, newStatus) => {
        try {
            const { data, error } = await updateReviewStatus(
                reviewId,
                newStatus
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setReviews(
                    reviews.map((review) =>
                        review.id === reviewId
                            ? { ...review, status: newStatus }
                            : review
                    )
                );
                Toast("success", "تم تحديث حالة التقييم بنجاح");
            }
        } catch (error) {
            console.error("Error updating review status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        setActiveDropdown(null);
    };

    const confirmDelete = async () => {
        try {
            const { error } = await deleteReview(deleteConfirmation.reviewId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setReviews(
                    reviews.filter(
                        (review) => review.id !== deleteConfirmation.reviewId
                    )
                );
                Toast("success", "تم حذف التقييم بنجاح");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({ show: false, reviewId: null, message: "" });
    };

    const toggleDropdown = (reviewId) => {
        setActiveDropdown(activeDropdown === reviewId ? null : reviewId);
    };

    const handleDelete = (reviewId) => {
        setDeleteConfirmation({
            show: true,
            reviewId,
            message: "هل أنت متأكد من حذف هذا التقييم؟",
        });
    };

    const resetFilters = () => {
        setSelectedRating("");
        setSelectedStatus("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    // Render star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    className={`${
                        i < rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                    }`}
                />
            );
        }
        return stars;
    };

    const getStatusText = (status) => {
        switch (status) {
            case "publication":
                return "منشور";
            case "under-processing":
                return "قيد المراجعة";
            case "unacceptable":
                return "مرفوض";
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "publication":
                return "bg-green-100 text-green-800";
            case "under-processing":
                return "bg-yellow-100 text-yellow-800";
            case "unacceptable":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("ar-EG", options);
    };

    // console.log(`eeee`, reviews);

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-start mb-6">
                        <button
                            onClick={() => navigate(`/${App_User}/home`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>
                        <h1 className="text-3xl font-bold text-black">
                            إدارة التقييمات
                        </h1>
                    </div>

                    <Link
                        to={`/${App_User}/review/create`}
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة تقييم
                    </Link>
                </div>

                {/* Search and filter */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search
                                size={20}
                                className={`absolute left-3 top-1.5 text-gray-400 cursor-pointer hover:text-blue-600`}
                                onClick={() => {
                                    handleSearchAction();
                                }}
                            />
                            <label
                                htmlFor="search-filter"
                                className="hidden"
                            ></label>
                            <input
                                type="text"
                                id="search-filter"
                                name="search-filter"
                                placeholder="البحث عن تقييم..."
                                className={`w-full pr-10 py-2 pe-16 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 transition-all`}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* <div className="flex-shrink-0">
                        <button
                            onClick={toggleFilters}
                            className="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50"
                        >
                            <Filter size={18} className="ml-1" />
                            تصفية
                            <ChevronDown size={16} className="mr-1" />
                        </button>
                    </div> */}
                    </div>

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    التقييم
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedRating}
                                    onChange={(e) =>
                                        setSelectedRating(e.target.value)
                                    }
                                >
                                    <option value="">جميع التقييمات</option>
                                    <option value="5">5 نجوم</option>
                                    <option value="4">4 نجوم</option>
                                    <option value="3">3 نجوم</option>
                                    <option value="2">2 نجوم</option>
                                    <option value="1">1 نجمة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    الحالة
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value)
                                    }
                                >
                                    <option value="">جميع الحالات</option>
                                    <option value="publication">منشور</option>
                                    <option value="under-processing">
                                        قيد المراجعة
                                    </option>
                                    <option value="unacceptable">مرفوض</option>
                                </select>
                            </div>
                            <div className="md:text-left mt-4 md:mt-auto">
                                <button
                                    onClick={resetFilters}
                                    className={`text-blue-600 hover:text-blue-700`}
                                >
                                    إعادة تعيين الفلاتر
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4 my-6 flex flex-col gap-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لا توجد تقييمات مطابقة لبحثك
                            </p>
                        </div>
                    ) : (
                        reviews.map((review, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 `}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16">
                                                <img
                                                    className="h-16 w-16 rounded-full object-cover"
                                                    src={
                                                        review?.user?.image ||
                                                        userimage
                                                    }
                                                    alt={
                                                        review?.user?.full_name
                                                    }
                                                    onError={(e) => {
                                                        e.target.src =
                                                            userimage;
                                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                    }}
                                                />
                                            </div>

                                            <div className="mr-4">
                                                <h3 className="text-lg font-semibold text-black">
                                                    {review?.user?.full_name ||
                                                        "مستخدم غير معروف"}{" "}
                                                    ({review.first_name})
                                                </h3>

                                                <div className="flex items-center mt-1">
                                                    <span className="text-sm text-gray-600 ml-2">
                                                        {review?.course
                                                            ?.title ||
                                                            "تقييم الموقع"}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                            review?.status
                                                        )}`}
                                                    >
                                                        {getStatusText(
                                                            review?.status
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="relative"
                                            ref={
                                                activeDropdown === review?.id
                                                    ? dropdownRef
                                                    : null
                                            }
                                        >
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition-all"
                                                onClick={() =>
                                                    toggleDropdown(review?.id)
                                                }
                                            >
                                                <MoreVertical size={20} />
                                            </button>

                                            {activeDropdown === review?.id && (
                                                <div className="absolute left-0 bg-white shadow-lg rounded-md py-1 w-36 z-10 transition-all">
                                                    <button
                                                        // onClick={() => {
                                                        //     handleStatusChange(
                                                        //         review?.id,
                                                        //         "منشور"
                                                        //     );
                                                        // }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                        onClick={() => {
                                                            navigate(
                                                                `/${App_User}/review/update/${review?.id}`
                                                            );
                                                        }}
                                                    >
                                                        <Edit
                                                            size={16}
                                                            className="ml-2 text-green-500"
                                                        />
                                                        تعديل
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                review?.id
                                                            )
                                                        }
                                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            className="ml-2"
                                                        />
                                                        حذف
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-gray-700">
                                            {review?.message}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex items-center ml-4">
                                            {renderStars(review?.rating)}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar
                                                size={14}
                                                className="ml-1"
                                            />
                                            {formatDate(review?.created_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    {totalCount > PAGE_SIZE && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                            <div className="text-sm text-gray-600">
                                عرض {(currentPage - 1) * PAGE_SIZE + 1} إلى{" "}
                                {Math.min(currentPage * PAGE_SIZE, totalCount)}{" "}
                                من أصل {totalCount} تقييم
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
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4 text-black">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">{deleteConfirmation.message}</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() =>
                                        setDeleteConfirmation({
                                            show: false,
                                            reviewId: null,
                                            message: "",
                                        })
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ReviewsList;
