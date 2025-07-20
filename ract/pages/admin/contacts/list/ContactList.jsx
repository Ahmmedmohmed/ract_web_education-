/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Mail,
    Phone,
    MoreVertical,
    Check,
    Trash2,
    Calendar,
    MessageSquare,
    ClockFading,
    ArrowRight,
} from "lucide-react";

// API
import {
    getContactMessages,
    searchContactMessages,
    updateMessageStatus,
    deleteContactMessage,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// UI
import Toast from "../../../../plugin/Toast";

function ContactList() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const dropdownRef = useRef(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        messageId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Fetch messages based on current filters and pagination
    useEffect(() => {
        fetchMessages();
    }, [currentPage, selectedStatus]);

    // console.log(`eee`, messages.length);

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
        //     // } else if (searchQuery.trim() === "" && messages.length === 0) {
        // } else
        if (searchQuery.trim() === "") {
            fetchMessages();
            // setMessages(allMessages);
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

    const fetchMessages = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await getContactMessages(
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الرسائل");
                navigate(`/${App_Admin}/home`)
            } else {
                setMessages(data.results);
                setAllMessages(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            Toast("error", "حدث خطأ غير متوقع");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const { data, error } = await searchContactMessages(
                searchQuery,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setMessages(data.results);
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
            fetchMessages();
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

    const handleStatusChange = async (messageId, newStatus) => {
        try {
            const { data, error } = await updateMessageStatus(
                messageId,
                newStatus
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setMessages(
                    messages.map((message) =>
                        message.id === messageId
                            ? { ...message, status: newStatus }
                            : message
                    )
                );
                Toast("success", "تم تحديث حالة الرسالة بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        setActiveDropdown(null);
    };

    const confirmDelete = async () => {
        try {
            const { error } = await deleteContactMessage(
                deleteConfirmation.messageId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setMessages(
                    messages.filter(
                        (msg) => msg.id !== deleteConfirmation.messageId
                    )
                );
                Toast("success", "تم حذف الرسالة بنجاح");
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

    const toggleDropdown = (messageId) => {
        setActiveDropdown(activeDropdown === messageId ? null : messageId);
    };

    const handleDelete = (messageId) => {
        setDeleteConfirmation({
            show: true,
            messageId,
            message: "هل أنت متأكد من حذف هذه الرسالة؟",
        });
    };

    const resetFilters = () => {
        setSelectedStatus("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    const getStatusText = (status) => {
        switch (status) {
            case "new":
                return "جديد";
            case "under-processing":
                return "قيد المعالجة";
            case "reply":
                return "تم الرد";
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new":
                return `bg-blue-100 text-blue-800`;
            case "under-processing":
                return "bg-yellow-100 text-yellow-800";
            case "reply":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("ar-EG", options);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-start mb-6">
                        <button
                            onClick={() => navigate(`/${App_Admin}/home`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-black">
                            إدارة الرسائل
                        </h1>
                    </div>
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
                                htmlFor="search-message"
                                className="hidden"
                            ></label>
                            <input
                                type="text"
                                id="search-message"
                                name="search-message"
                                placeholder="البحث عن رسالة..."
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
                                    <option value="new">جديد</option>
                                    <option value="under-processing">
                                        قيد المعالجة
                                    </option>
                                    <option value="reply">تم الرد</option>
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
                    )}
                </div>

                {/* Messages List */}
                <div className="space-y-4 my-6 flex flex-col gap-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لا توجد رسائل مطابقة لبحثك
                            </p>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                                    message.status === "new"
                                        ? `border-r-4 border-blue-500`
                                        : message.status === "under-processing"
                                        ? "border-s-4 border-amber-500"
                                        : ""
                                }
                            ${message?.is_visible === false ? "hidden" : ""}
                            `}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-black flex items-center">
                                                {message.full_name}
                                                <span
                                                    className={`mr-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                        message.status
                                                    )}`}
                                                >
                                                    {getStatusText(
                                                        message.status
                                                    )}
                                                </span>
                                            </h3>

                                            <div className="mt-2 space-y-1 flex flex-col gap-2">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <a
                                                        className={`flex items-center text-sm text-gray-600 hover:text-blue-600`}
                                                        href={`mailto:${message.email}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <Mail
                                                            size={14}
                                                            className="ml-1 text-gray-400"
                                                        />
                                                        {message.email}
                                                    </a>
                                                </div>

                                                {message.phone_number && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <a
                                                            className={`flex items-center text-sm text-gray-600 hover:text-blue-600`}
                                                            href={`tel:${message.phone_number}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <Phone
                                                                size={14}
                                                                className="ml-1 text-gray-400"
                                                            />
                                                            {
                                                                message.phone_number
                                                            }
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className="relative"
                                            ref={
                                                activeDropdown === message.id
                                                    ? dropdownRef
                                                    : null
                                            }
                                        >
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition-all"
                                                onClick={() =>
                                                    toggleDropdown(message.id)
                                                }
                                            >
                                                <MoreVertical size={20} />
                                            </button>

                                            {activeDropdown === message.id && (
                                                <div className="absolute left-0 bg-white shadow-lg rounded-md py-1 w-40 z-10 transition-all">
                                                    <button
                                                        onClick={() => {
                                                            handleStatusChange(
                                                                message.id,
                                                                "reply"
                                                            );
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        <Check
                                                            size={16}
                                                            className="ml-2 text-green-500"
                                                        />
                                                        تم الرد
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleStatusChange(
                                                                message.id,
                                                                "under-processing"
                                                            );
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        <MessageSquare
                                                            size={16}
                                                            className="ml-2 text-yellow-500"
                                                        />
                                                        قيد المعالجة
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                message.id
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
                                        <div
                                            className={`flex items-center text-sm font-medium text-blue-600 mb-2`}
                                        >
                                            <span className="ml-1">
                                                الموضوع:
                                            </span>{" "}
                                            {message.titleofmessage}
                                        </div>
                                        <p className="text-gray-700 border-t border-gray-100 pt-2">
                                            {message.message}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                                        <div>
                                            {message.quick_reply && (
                                                <button
                                                    className={`text-sm text-blue-600 hover:text-blue-700 flex items-center`}
                                                >
                                                    <ClockFading
                                                        size={14}
                                                        className="ml-1"
                                                    />
                                                    الرد السريع
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar
                                                size={14}
                                                className="ml-1"
                                            />
                                            {formatDate(message.created_at)}
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
                                            messageId: null,
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
export default ContactList;
