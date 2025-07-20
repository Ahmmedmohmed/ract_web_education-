/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    X,
    BarChart2,
    Clock,
    Percent,
    User,
    BookOpen,
    Calendar,
    Hash,
    ArrowRight,
} from "lucide-react";

// api
import { publicGetStudentQuestionBankResultBank } from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";
import { App_Admin, nameMainColor } from "../../../../utils/constants";

function TestResultDetails() {
    const { bankId } = useParams();

    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestionsInBank = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await publicGetStudentQuestionBankResultBank(bankId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الاختبارات"
                    );
                } else {
                    setResults(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestionsInBank();
    }, [bankId]);

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

    // console.log(`results`, results);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center ">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/test-results`);
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة نتيجة الاختبار
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
                    ) : results.length === 0 ? (
                        <div className="text-4xl bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">لا توجد نتائج متاحة</p>
                        </div>
                    ) : (
                        <div className="space-y-6 flex flex-col gap-8">
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                                    data-aos="fade-up"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <h2 className="text-2xl font-semibold text-gray-800">
                                                    {results.length - index}#
                                                    نتيجة الاختبار
                                                </h2>

                                                {/* <p className="text-gray-600">
                                                    (
                                                    {result.question_bank.title}
                                                    )
                                                </p> */}
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
                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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
                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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

                                            <div className="flex items-center gap-4 text-2xl bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm">
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
                                                                                ? "bg-blue-100 text-blue-800"
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
            </div>
        </>
    );
}

export default TestResultDetails;
