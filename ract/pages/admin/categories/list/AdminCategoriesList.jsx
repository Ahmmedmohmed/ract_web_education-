/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    Edit,
    Trash,
    Eye,
    EyeOff,
    Filter,
    ChevronDown,
    MoreVertical,
    ChevronUp,
    ArrowRight,
    Loader2,
    ChevronRight,
    ChevronLeft,
    Calendar,
} from "lucide-react";

// api
import {
    adminGetCategories,
    adminSearchCategories,
    adminUpdateCategoryStatus,
    adminUpdateCategoryVisibility,
    adminDeleteCategory,
} from "../../../../api/admin/authAdmin";

// data
import { categorycourses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// Utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";
import { formatDateAR } from "../../../../utils/helpers";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function AdminCategoriesList() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState("");
    const dropdownRef = useRef(null);

    const [expandedCategoryId, setExpandedCategoryId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        categoryId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [currentPage, selectedStatus]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchCategories();
            // setMessages(allMessages);
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    // Function to fetch categories from API
    const fetchCategories = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await adminGetCategories(
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب التصنيفات");
            } else {
                setCategories(data.results);
                setAllCategories(data.results);
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
            const { data, error } = await adminSearchCategories(
                searchQuery,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setCategories(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error searching messages:", error);
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
            // } else if (searchQuery.trim() === "" && messages.length === 0) {
        } else if (searchQuery.trim() === "") {
            fetchCategories();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategoryId(
            expandedCategoryId === categoryId ? null : categoryId
        );
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStatusChange = async (categoryId, newStatus) => {
        try {
            const { data, error } = await adminUpdateCategoryStatus(
                categoryId,
                newStatus
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setCategories(
                    categories.map((category) =>
                        category.id === categoryId
                            ? { ...category, status: newStatus }
                            : category
                    )
                );
                Toast("success", "تم تحديث حالة التصنيف بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleVisibilityChange = async (categoryId, newVisibility) => {
        try {
            const { data, error } = await adminUpdateCategoryVisibility(
                categoryId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setCategories(
                    categories.map((category) =>
                        category.id === categoryId
                            ? { ...category, is_visible: newVisibility }
                            : category
                    )
                );
                Toast("success", "تم تحديث حالة التصنيف بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleDelete = (categoryId) => {
        setDeleteConfirmation({
            show: true,
            categoryId,
            message: "هل أنت متأكد من حذف هذا التصنيف؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await adminDeleteCategory(
                deleteConfirmation.categoryId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setCategories(
                    categories.filter(
                        (category) =>
                            category.id !== deleteConfirmation.categoryId
                    )
                );
                Toast("success", "تم حذف التصنيف بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            messageId: null,
            message: "",
        });
    };

    const resetFilters = () => {
        setSelectedStatus("");
        setSearchQuery("");
        setCurrentPage(1);
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

    // console.log(`eee`, categories);

    return (
        <>
            <div className="space-y-6">
                {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"> */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center   ">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/home`);
                                // moveBack();
                            }}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black ">
                            إدارة التصنيفات
                        </h1>
                    </div>

                    <Link
                        to={`/${App_Admin}/categories/create`}
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700`}
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة تصنيف جديد
                    </Link>
                </div>

                <div className="card p-6 ">
                    {/* <div className=" flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 ">
                        <div className="relative w-full md:w-64">
                            <Search
                                size={18}
                                className="absolute right-3 top-3 text-gray-400"
                            />
                            <label
                                htmlFor="inputsearch"
                                className="hidden"
                            ></label>
                            <input
                                type="text"
                                id="inputsearch"
                                name="inputsearch"
                                placeholder="ابحث عن تصنيف..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                            />
                        </div>

                        <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Filter size={18} />
                            <span>تصفية</span>
                            <ChevronDown size={18} />
                        </button>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : categories?.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    {/* لا توجد تصنيفات مطابقة لبحثك */}
                                    لم يتم أضافة تصنيف حتي الان
                                </p>
                            </div>
                        ) : (
                            categories?.map((category, index) => (
                                <div
                                    key={index}
                                    className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${
                                        category?.is_visible === false
                                            ? "opacity-70"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => {
                                            navigate(
                                                `/${App_Admin}/categories/update/${category?.id}`
                                            );
                                        }}
                                    >
                                        <img
                                            src={
                                                category.image_url ||
                                                category?.image ||
                                                noimage
                                            }
                                            alt={category?.title}
                                            onError={(e) => {
                                                e.target.src = noimage; // صورة افتراضية
                                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                            }}
                                            className="w-full h-60 object-fill"
                                        />

                                        {category?.is_visible === false && (
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                                <span className="text-white font-bold">
                                                    مخفي
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-center gap-6 mb-4">
                                            <h3
                                                className={`text-3xl font-semibold text-black truncate cursor-pointer hover:text-blue-600 transition-all duration-500`}
                                                onClick={() => {
                                                    navigate(
                                                        `/${App_Admin}/categories/update/${category?.id}`
                                                    );
                                                }}
                                            >
                                                {category?.title}
                                            </h3>

                                            <span
                                                className="text-2xl text-gray-500 min-w-max"
                                                onClick={() => {
                                                    navigate(
                                                        `/${App_Admin}/sections`
                                                    );
                                                }}
                                            >
                                                {category?.total_section_course ||
                                                    0}{" "}
                                                أقسام
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-lg text-gray-500">
                                                <Calendar
                                                    size={18}
                                                    className="ml-1"
                                                />

                                                {formatDateAR(
                                                    category.created_at
                                                )}
                                            </div>

                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                    onClick={() => {
                                                        handleVisibilityChange(
                                                            category?.id,
                                                            category?.is_visible
                                                                ? false
                                                                : true
                                                        );
                                                    }}
                                                    title={
                                                        category?.is_visible ===
                                                        false
                                                            ? "إظهار التصنيف"
                                                            : "إخفاء التصنيف"
                                                    }
                                                >
                                                    {category?.is_visible ===
                                                    false ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
                                                    )}
                                                </button>

                                                <Link
                                                    to={`/${App_Admin}/categories/update/${category?.id}`}
                                                    className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md`}
                                                    title="تعديل التصنيف"
                                                >
                                                    <Edit size={18} />
                                                </Link>

                                                <button
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                    onClick={() => {
                                                        handleDelete(
                                                            category?.id
                                                        );
                                                    }}
                                                    title="حذف التصنيف"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* {expandedCategoryId ===
                                            category?.id && (
                                            <div className="mt-4 border-t pt-4">
                                                <h4 className="font-medium mb-2">
                                                    الأقسام الفرعية:
                                                </h4>
                                                <div className="space-y-2">
                                                    {category?.sections?.map(
                                                        (section) => (
                                                            <div
                                                                key={section.id}
                                                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <img
                                                                        src={
                                                                            section.image ||
                                                                            noimage
                                                                        }
                                                                        alt={
                                                                            section.name
                                                                        }
                                                                        className="w-8 h-8 object-cover rounded"
                                                                    />
                                                                    <span
                                                                        className={
                                                                            section.is_visible
                                                                                ? "text-gray-400"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {
                                                                            section.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    className="p-1 text-gray-500 hover:text-red-500"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            category?.id,
                                                                            section.id
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            ))
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
                </div>

                {deleteConfirmation?.show && (
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
                                            categoryId: null,
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

export default AdminCategoriesList;
