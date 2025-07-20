/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiList } from "react-icons/fi";
import {
    Plus,
    ArrowLeft,
    Edit,
    Trash2,
    FileText,
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
    ChevronRight,
    ChevronLeft,
    Search,
} from "lucide-react";

// Api
// import { questionBankApi } from "../../api/api";
import {
    publicGetQuestionBanks,
    publicSearchQuestionBanks,
    publicUpdateQuestionBankStatus,
    publicUpdateQuestionBankVisibility,
    publicDeleteQuestionBank,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// data
import { questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function QuestionsBanksList() {
    const navigate = useNavigate();
    let { userData } = UserDataStore();

    const [questionBanks, setQuestionBanks] = useState([]);
    const [allQuestionBanks, setAllQuestionBanks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        bankId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchQuestionBanks();
    }, [currentPage, selectedStatus]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchQuestionBanks();
            // setMessages(allMessages);
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchQuestionBanks = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await publicGetQuestionBanks(
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast(
                    "error",
                    error.message || "حدث خطأ أثناء جلب بنوك الاختبارات"
                );
                navigate(`/${App_Admin}/home`);
            } else {
                setQuestionBanks(data.results);
                setAllQuestionBanks(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
                setIsLoading(false);
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
            const { data, error } = await publicSearchQuestionBanks(
                searchQuery,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setQuestionBanks(data.results);
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
            fetchQuestionBanks();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    // const toggleCategory = (categoryId) => {
    //     setExpandedCategoryId(
    //         expandedCategoryId === categoryId ? null : categoryId
    //     );
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStatusChange = async (bankId, newStatus) => {
        try {
            const { data, error } = await publicUpdateQuestionBankStatus(
                bankId,
                newStatus
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setQuestionBanks(
                    questionBanks.map((bank) =>
                        bank.id === bankId
                            ? { ...bank, status: newStatus }
                            : bank
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

    const handleVisibilityChange = async (bankId, newVisibility) => {
        try {
            const { data, error } = await publicUpdateQuestionBankVisibility(
                bankId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setQuestionBanks(
                    questionBanks.map((bank) =>
                        bank.id === bankId
                            ? { ...bank, is_visible: newVisibility }
                            : bank
                    )
                );
                Toast("success", "تم تحديث حالة بنك الاختبار بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleDelete = (bankId) => {
        setDeleteConfirmation({
            show: true,
            bankId,
            message: "هل أنت متأكد من حذف بنك الاختبار؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await publicDeleteQuestionBank(
                deleteConfirmation.bankId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setQuestionBanks(
                    questionBanks.filter(
                        (bank) => bank.id !== deleteConfirmation.bankId
                    )
                );
                Toast("success", "تم حذف بنك الاختبار بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            bankId: null,
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

    // console.log(`q`, questionBanks);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center ">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/home`);
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة بنوك الاختبارات
                        </h1>
                    </div>

                    <Link
                        to={`/${App_Admin}/questions-banks/create`}
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة بنك أختبار
                    </Link>
                </div>

                {/*  */}
                {/* {error && (
                        <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-md">
                            {error}
                        </div>
                    )} */}

                {/* Search and filter */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
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
                                placeholder="البحث عن بنك اختبار..."
                                className={`w-full pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 transition-all`}
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

                    {/* {showFilters && (
                                            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">
                                                        الصلاحيات
                                                    </label>
                                                    <select
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                        value={selectedRole}
                                                        onChange={(e) =>
                                                            setSelectedRole(e.target.value)
                                                        }
                                                    >
                                                        <option value="">الكل</option>
                                                        <option value="superadmin">
                                                            مدير النظام
                                                        </option>
                                                        <option value="admin">مسؤول</option>
                                                        <option value="moderator">مشرف</option>
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
                                                        <option value="">الكل</option>
                                                        <option value="active">نشط</option>
                                                        <option value="inactive">غير نشط</option>
                                                    </select>
                                                </div>
                                                <div className="md:text-left mt-4 md:mt-auto">
                                                    <button
                                                        onClick={resetFilters}
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        إعادة تعيين الفلاتر
                                                    </button>
                                                </div>
                                            </div>
                                        )} */}
                </div>

                <div
                    // className={`bg-white rounded-lg shadow-md overflow-hidden  `}
                    className={``}
                >
                    <div className={`py-4  `}>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : questionBanks?.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-gray-500">
                                    لم يتم العثور على أي بنوك اختبارات. قم
                                    باضافة الأن؟
                                </p>
                            </div>
                        ) : (
                            //
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {questionBanks?.map((bank, index) => (
                                    <div
                                        key={index}
                                        className={`card hover:shadow-lg rounded-3xl transition-all 
                                            duration-500 group p-6 hover:-translate-y-4
                                        `}
                                    >
                                        <div className="aspect-video w-full overflow-hidden rounded-3xl mb-4 transition-all relative">
                                            <img
                                                src={
                                                    bank.image_url ||
                                                    bank?.image ||
                                                    noimage
                                                }
                                                alt={bank?.title}
                                                onError={(e) => {
                                                    e.target.src = noimage; // صورة افتراضية
                                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                }}
                                                className="w-full h-full object-fill rounded-3xl transition-all duration-300 group-hover:scale-110  overflow-hidden"
                                            />

                                            {bank?.is_visible === false && (
                                                <div className="absolute inset-0 bg-gray-500 flex items-center justify-center">
                                                    <span className="text-white font-bold">
                                                        مخفي
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-3xl font-semibold text-gray-800 mb-2 truncate">
                                            {bank?.title}
                                        </h3>

                                        <p className="text-2xl text-gray-600 mb-4 line-clamp-2 truncate">
                                            {bank?.description}
                                        </p>

                                        <p className="text-lg text-gray-500 mb-2  truncate">
                                            تصنيف:{" "}
                                            {bank?.section?.title &&
                                                `(${bank?.section?.title})`}
                                        </p>

                                        <p
                                            className={`text-lg font-medium text-blue-500 mb-4`}
                                        >
                                            عدد الاسئلة (
                                            {bank?.total_question_in_bank || 0})
                                        </p>

                                        <div className="flex items-center justify-between mt-2">
                                            <Link
                                                to={
                                                    userData?.id ===
                                                    bank?.user?.id
                                                        ? `/${App_Admin}/questions-banks/${bank?.id}/questions`
                                                        : `/${App_Admin}/questions-banks`
                                                }
                                                className="flex items-center gap-2 text-2xl text-fuchsia-500 hover:text-fuchsia-600 transition-colors"
                                            >
                                                <FiList className="mr-1" />
                                                إدارة الاختبارات
                                            </Link>

                                            <div className="flex items-center gap-4 space-x-2">
                                                <button
                                                    className={`  rounded ${
                                                        bank?.is_visible
                                                            ? `text-blue-600`
                                                            : "text-gray-500"
                                                    }`}
                                                    onClick={() => {
                                                        handleVisibilityChange(
                                                            bank?.id,
                                                            bank?.is_visible
                                                                ? false
                                                                : true
                                                        );
                                                    }}
                                                    title={
                                                        bank?.is_visible
                                                            ? "إخفاء البنك"
                                                            : "إظهار البنك"
                                                    }
                                                >
                                                    {bank?.is_visible ? (
                                                        <Eye size={18} />
                                                    ) : (
                                                        <EyeOff size={18} />
                                                    )}
                                                </button>

                                                {userData?.id ===
                                                    bank?.user?.id && (
                                                    <Link
                                                        to={`/${App_Admin}/questions-banks/update/${bank?.id}`}
                                                        className={` text-2xl text-blue-500 transition-colors`}
                                                        title="تعديل"
                                                    >
                                                        <FiEdit size={18} />
                                                    </Link>
                                                )}

                                                <button
                                                    // onClick={() => {
                                                    //     handleDeleteBank(
                                                    //         bank?.id
                                                    //     );
                                                    // }}
                                                    onClick={() => {
                                                        handleDelete(bank?.id);
                                                    }}
                                                    className=" text-red-600 hover:text-red-900 text-2xl transition-all"
                                                    title="حذف"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                            bankId: null,
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

export default QuestionsBanksList;
