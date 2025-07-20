/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Plus,
    Image as ImageIcon,
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
    Search,
} from "lucide-react";

// api
// import { questionBankApi, questionApi } from "../../api/api";
import {
    publicDeleteQuestionInBank,
    publicGetQuestionInBankQuestionBanks,
    publicSearchQuestionInBank,
    publicSearchBanksQuestionInBank,
    publicUpdateQuestionInBankStatus,
    publicUpdateQuestionInBankVisibility,
} from "../../../../../../api/public/authPublic";

// data
import { questionbank, questionslist } from "../../../../../../data/data";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../../../utils/constants";

//
// import Button from "../../components/Button";
// import Card, { CardBody, CardHeader } from "../../components/Card";

// assets
import noimage from "../../../../../../assets/images/error/no-image.jpg";

function QuestionsList() {
    const navigate = useNavigate();
    const { bankId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    // const [questionBank, setQuestionBank] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [deletingQuestion, setDeletingQuestion] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        questionId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchQuestionsInBank();
    }, [bankId, currentPage, selectedStatus]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchQuestionsInBank();
            // setMessages(allMessages);
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchQuestionsInBank = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await publicGetQuestionInBankQuestionBanks(
                bankId,
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الاختبارات");
            } else {
                setQuestions(data);
                setAllQuestions(data);
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
            const { data, error } = await publicSearchBanksQuestionInBank(
                bankId,
                searchQuery,
                currentPage
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setQuestions(data);
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
            fetchQuestionsInBank();
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

    const handleStatusChange = async (questionId, newStatus) => {
        try {
            const { data, error } = await publicUpdateQuestionInBankStatus(
                questionId,
                newStatus
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setQuestions(
                    questions.map((question) =>
                        question.id === questionId
                            ? { ...question, status: newStatus }
                            : question
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

    const handleVisibilityChange = async (questionId, newVisibility) => {
        try {
            const { data, error } = await publicUpdateQuestionInBankVisibility(
                questionId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setQuestions(
                    questions.map((question) =>
                        question.id === questionId
                            ? { ...question, is_visible: newVisibility }
                            : question
                    )
                );
                Toast("success", "تم تحديث حالة الاختبار بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleDelete = (questionId) => {
        setDeleteConfirmation({
            show: true,
            questionId,
            message: "هل أنت متأكد من حذف الاختبار؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { data, error } = await publicDeleteQuestionInBank(
                deleteConfirmation.questionId
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setQuestions(
                    questions.filter(
                        (question) =>
                            question.id !== deleteConfirmation.questionId
                    )
                );
                Toast("success", "تم حذف الاختبار بنجاح");
                navigate(`/${App_Admin}/questions-banks`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            questionId: null,
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

    // console.log(`questions`, questions);

    return (
        <>
            <div className="space-y-6  pb-20">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center ">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/questions-banks`);
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة الاسئلة
                            {/* {questionBank.title && ` (${questionBank.title}) `} */}
                        </h1>
                    </div>

                    {bankId && (
                        <Link
                            to={`/${App_Admin}/questions-banks/${bankId}/questions/create`}
                            className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                        >
                            <Plus size={18} className="ml-1" />
                            إضافة سؤال
                        </Link>
                    )}
                </div>

                {/* {error && (
                    <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-md">
                        {error}
                    </div>
                )} */}

                {/* Search and filter */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-10  ">
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
                                placeholder="البحث عن اختبار..."
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

                <div>
                    <div
                        className={`bg-white rounded-lg shadow-lg overflow-hidden `}
                    >
                        <div className={`    `}>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div
                                        className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                    ></div>
                                </div>
                            ) : questions?.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-gray-500">
                                        لم يتم العثور على أي أسئلة. قم باضافة
                                        سؤالك الأول؟
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4  overflow-x-auto">
                                    <table className="min-w-full max-w-full divide-y divide-gray-200 text-lg md:text-2xl overflow-x-scroll">
                                        <thead className="bg-gray-50 overflow-x-scroll">
                                            <tr className="">
                                                <th
                                                    scope="col"
                                                    className="ps-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider  "
                                                >
                                                    رقم
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    الصورة
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    نص السؤال
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-2 py-4 text-end  font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    الاجراءات
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200 ">
                                            {questions?.map(
                                                (question, index) => (
                                                    <tr
                                                        key={index}
                                                        className={`bg-gray-50 py-4 rounded-md mb-4 shadow 
                                                    ${
                                                        question?.is_visible ===
                                                        false
                                                            ? "bg-gray-200"
                                                            : "bg-gray-50"
                                                    }
                                                    `}
                                                    >
                                                        <td className="ps-2 py-4 whitespace-nowrap">
                                                            <div className="flex  ">
                                                                <span className="me-4">
                                                                    {/* {
                                                                        question?.id
                                                                    }
                                                                    ) */}
                                                                    {/* {index - index}) */}
                                                                    {questions?.length -
                                                                        ((currentPage -
                                                                            1) *
                                                                            PAGE_SIZE +
                                                                            index)}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-2 py-4 whitespace-nowrap">
                                                            <div className="flex w-full">
                                                                <div className="flex items-start w-full">
                                                                    {/* {question?.image ||
                                                                        (question.image_url && ( */}
                                                                    <div className="flex-shrink-0 w-full">
                                                                        <div className="h-20   rounded-md overflow-hidden bg-white w-full">
                                                                            <img
                                                                                src={
                                                                                    question?.image_url ||
                                                                                    question?.image ||
                                                                                    noimage
                                                                                }
                                                                                alt="Question"
                                                                                onError={(
                                                                                    e
                                                                                ) => {
                                                                                    e.target.src =
                                                                                        noimage;
                                                                                    e.target.onerror =
                                                                                        null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                                                }}
                                                                                className="h-full w-full object-fill"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {/* ))} */}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-2 py-4 whitespace-nowrap">
                                                            <div className="flex">
                                                                <div className="flex items-start">
                                                                    <div className="flex-1 truncate">
                                                                        {/* <p className="text-gray-800 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]"> */}
                                                                        <p className="text-gray-800 truncate ">
                                                                            {
                                                                                question?.text
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-2 py-4 whitespace-nowrap">
                                                            <div className=" flex items-start gap-4 space-x-2 justify-end">
                                                                <button
                                                                    className={`    rounded ${
                                                                        question?.is_visible
                                                                            ? `text-blue-600`
                                                                            : "text-gray-500"
                                                                    }`}
                                                                    onClick={() => {
                                                                        handleVisibilityChange(
                                                                            question?.id,
                                                                            question?.is_visible
                                                                                ? false
                                                                                : true
                                                                        );
                                                                        // handleToggleQuestionVisibility(
                                                                        //     question?.id
                                                                        // );
                                                                    }}
                                                                    title={
                                                                        question?.is_visible
                                                                            ? "إخفاء القسم"
                                                                            : "إظهار القسم"
                                                                    }
                                                                >
                                                                    {question?.is_visible ? (
                                                                        <Eye
                                                                            size={
                                                                                18
                                                                            }
                                                                            // className="h-5 w-5"
                                                                        />
                                                                    ) : (
                                                                        <EyeOff
                                                                            size={
                                                                                18
                                                                            }
                                                                            // className="h-5 w-5"
                                                                        />
                                                                    )}
                                                                </button>

                                                                <Link
                                                                    to={`/${App_Admin}/questions-banks/${bankId}/questions/update/${question?.id}`}
                                                                    className={`text-blue-600 hover:text-blue-800`}
                                                                    title="تعديل"
                                                                >
                                                                    <Edit
                                                                        size={
                                                                            18
                                                                        }
                                                                        // className="h-5 w-5"
                                                                    />
                                                                </Link>

                                                                <button
                                                                    // onClick={() => {
                                                                    //     handleDeleteQuestion(
                                                                    //         question?.id
                                                                    //     );
                                                                    // }}
                                                                    onClick={() => {
                                                                        handleDelete(
                                                                            question?.id
                                                                        );
                                                                    }}
                                                                    className="text-red-600 hover:text-red-800"
                                                                    disabled={
                                                                        deletingQuestion ===
                                                                        question?.id
                                                                    }
                                                                    title="حذف"
                                                                >
                                                                    {deletingQuestion ===
                                                                    question?.id ? (
                                                                        <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-red-600 rounded-full"></div>
                                                                    ) : (
                                                                        <Trash2
                                                                            size={
                                                                                18
                                                                            }
                                                                            // className="h-5 w-5"
                                                                        />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {/* {totalCount > PAGE_SIZE && (
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
                                            : "text-blue-600 hover:bg-blue-50"
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
                                                        ? "bg-blue-600 text-white"
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
                                                    ? "bg-blue-600 text-white"
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
                                            : "text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </div>
                        </div>
                    )} */}
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
                                            questionId: null,
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

export default QuestionsList;
