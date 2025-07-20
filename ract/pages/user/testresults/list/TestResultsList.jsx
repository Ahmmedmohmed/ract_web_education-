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
    ScrollText,
    Check,
    X,
    Hash,
    Percent,
    User,
    Calendar,
} from "lucide-react";

// Api
// import { questionBankApi } from "../../api/api";
import { userGetStudentQuestionBankResultUser } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// data
import { questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function TestResultsList() {
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();

    const [questionBanksResult, setQuestionBanksResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestionsInBank = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await userGetStudentQuestionBankResultUser(userData?.id);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الاختبارات"
                    );
                    navigate(`/${App_User}/home`);
                } else {
                    setQuestionBanksResult(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                navigate(`/${App_User}/home`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestionsInBank();
    }, [userData?.id]);

    //
    // const [deletingBank, setDeletingBank] = useState();
    // const [deleteConfirmation, setDeleteConfirmation] = useState({
    //     show: false,
    //     categoryId: null,
    //     sectionId: null,
    //     message: "",
    // });

    // useEffect(() => {
    //     fetchQuestionBanks();
    // }, []);

    // const fetchQuestionBanks = async () => {
    //     try {
    //         setLoading(true);
    //         // const response = await questionBankApi.getAll();
    //         // setQuestionBanks(response.data);
    //         setQuestionBanks(questionbank);
    //         setLoading(false);
    //     } catch (error) {
    //         setError("Failed to load question banks");
    //         setLoading(false);
    //         console.log(`Error:- `, error);
    //     }
    // };

    // const handleToggleQuestionBankVisibility = (bankId) => {
    //     const updatedQuestionBank = questionBanks?.map((bank) =>
    //         bank?.id === bankId
    //             ? { ...bank, isVisible: !bank?.isVisible }
    //             : bank
    //     );
    //     setQuestionBanks([...updatedQuestionBank]);
    //     // In a real app, this would call the API to update the section visibility
    //     // await coursesApi.updateSectionVisibility(courseId, sectionId, !section?.isVisible);
    // };

    // const handleDeleteBank = async (id) => {
    //     if (
    //         !confirm(
    //             "Are you sure you want to delete this question bank? This action cannot be undone."
    //         )
    //     ) {
    //         return;
    //     }

    //     try {
    //         setDeletingBank(id);
    //         // await questionBankApi.delete(id);
    //         // setQuestionBanks(questionBanks.filter((bank) => bank?.id !== id));
    //         setDeletingBank(null);
    //     } catch (error) {
    //         setError("Failed to delete question bank");
    //         setDeletingBank(null);
    //         console.log(`Error:- `, error);
    //     }
    // };

    // const handleDelete = (categoryId, sectionId = null) => {
    //     setDeleteConfirmation({
    //         show: true,
    //         categoryId,
    //         sectionId,
    //         message: sectionId
    //             ? "هل أنت متأكد من حذف هذا القسم الفرعي؟"
    //             : "هل أنت متأكد من حذف بنك الاختبار؟",
    //     });
    // };

    //
    // console.log(`questionBanksResult`, questionBanksResult);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
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
            <div className="space-y-6  pb-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-start mb-6">
                        <button
                            onClick={() => {
                                navigate(`/${App_User}/home`);
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة نتيجة الاختبارات
                        </h1>
                    </div>
                </div>

                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : questionBanksResult?.length === 0 ? (
                        <div className="text-4xl bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">لا توجد نتائج متاحة</p>
                        </div>
                    ) : (
                        <div className="space-y-6 flex flex-col gap-8">
                            {questionBanksResult?.map((result, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                                    data-aos="fade-up"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                            <div className="flex items-center gap-4 text-2xl">
                                                <h2 className=" font-semibold text-gray-800">
                                                    {/* {questionBanksResult.length -
                                                        index} */}
                                                    {questionBanksResult.length -
                                                        index}
                                                    # نتيجة اختبار
                                                </h2>

                                                <p
                                                    className={`text-blue-600 font-bold cursor-pointer `}
                                                    onClick={() => {
                                                        navigate(
                                                            `/questions-banks/${result?.question_bank?.id}`
                                                        );
                                                    }}
                                                >
                                                    (
                                                    {
                                                        result?.question_bank
                                                            ?.title
                                                    }
                                                    )
                                                </p>
                                            </div>

                                            <div className="mt-4 md:mt-0">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-2xl font-medium ${
                                                        result.percentage >= 50
                                                            ? `bg-blue-100 text-blue-800`
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {result.percentage}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center`}
                                                    >
                                                        <Check
                                                            className="text-white "
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        الإجابات الصحيحة:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold ">
                                                    {result.correct_answers}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">
                                                        <X
                                                            className="text-white"
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        الإجابات الخاطئة:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold  ">
                                                    {result.total_questions -
                                                        result.correct_answers}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                                        <Hash
                                                            className="text-white "
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        إجمالي الأسئلة:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold ">
                                                    {result.total_questions}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                                                        <Percent
                                                            className="text-white "
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        النسبة المئوية:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold  ">
                                                    {result.percentage}%
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center">
                                                        <User
                                                            className="text-white "
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        الطالب:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold ">
                                                    {result.user.id}){" "}
                                                    {result.user.first_name}{" "}
                                                    {result.user.last_name}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 p-4 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center">
                                                        <Calendar
                                                            className="text-white "
                                                            size={18}
                                                        />
                                                    </span>

                                                    <span className="text-gray-700">
                                                        تاريخ الإجراء:
                                                    </span>
                                                </div>

                                                <p className="text-2xl font-bold ">
                                                    {new Date(
                                                        result.created_at
                                                    ).toLocaleDateString(
                                                        "ar-EG"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                                        <h3 className="font-medium text-gray-800 mb-3">
                                            تفاصيل الإجابات:
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            السؤال
                                                        </th>
                                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            الإجابة
                                                        </th>
                                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            الحالة
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {result.results.map(
                                                        (answer, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                    {
                                                                        answer.question_text
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                    {
                                                                        answer.user_answer
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-3 whitespace-nowrap">
                                                                    <span
                                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                            answer.is_correct
                                                                                ? `bg-blue-100 text-blue-800`
                                                                                : "bg-red-100 text-red-800"
                                                                        }`}
                                                                    >
                                                                        {answer.is_correct
                                                                            ? "صحيح"
                                                                            : "خاطئ"}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden `}
                >
                    {/* <div className={` `}>
                        {questionBanks?.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-gray-500">
                                    لم يتم العثور على أي نتائج اختبار.انتظر حتى
                                    يتم إجراء الاختبارات من قبل الطلاب
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 overflow-x-auto">
                                <table className="min-w-full   divide-gray-200 text-lg md:text-2xl">
                                    <thead className="bg-gray-50 ">
                                        <tr className="">
                                            <th
                                                scope="col"
                                                className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider "
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
                                                الاختبار
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
                                        {questionBanks?.map((bank, index) => (
                                            <tr
                                                key={index}
                                                className={`bg-gray-50 py-4 rounded-md mb-4 shadow 
                                                    ${
                                                        bank?.isVisible
                                                            ? "bg-gray-50"
                                                            : "bg-gray-200"
                                                    }
                                                    `}
                                            >
                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex  ">
                                                        <span className="me-4">
                                                            {index + 1})
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex w-full">
                                                        <div className="flex items-start w-full">
                                                            {bank?.image && (
                                                                <div className="flex-shrink-0 w-full">
                                                                    <div className="h-20  rounded-md overflow-hidden bg-white w-full">
                                                                        <img
                                                                            src={
                                                                                bank?.image ||
                                                                                noimage
                                                                            }
                                                                            alt="bank"
                                                                            onError={(
                                                                                e
                                                                            ) => {
                                                                                e.target.src =
                                                                                    noimage;
                                                                                e.target.onerror =
                                                                                    null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                                            }}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex">
                                                        <div className="flex items-start">
                                                            <div className="flex-1 truncate">
                                                                <p className="text-gray-800 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]">
                                                                    {
                                                                        bank?.title
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className=" flex items-start gap-4 space-x-2 justify-end">
                                                        <button
                                                            className={`flex items-center gap-4  text-blue-600  `}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/${App_User}/test-results/${bank?.id}`
                                                                );
                                                            }}
                                                        >
                                                            عرض النتائج
                                                            <ScrollText
                                                                size={18}
                                                            />
                                                        </button>
 
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default TestResultsList;
