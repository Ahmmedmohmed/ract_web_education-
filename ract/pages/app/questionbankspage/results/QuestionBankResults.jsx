/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Home,
    RotateCcw,
    AlertCircle,
    ClipboardList,
    FileQuestion,
} from "lucide-react";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import { nameMainColor } from "../../../../utils/constants";

const QuestionBankResults = () => {
    const { bankId } = useParams();

    const navigate = useNavigate();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    if (!bankId) {
        navigate(`/questions-banks`);
    }

    useEffect(() => {
        if (bankId) {
            fetchResults();
        }
    }, [bankId]);

    const fetchResults = async () => {
        try {
            const storedResults = sessionStorage.getItem(
                `quiz_${bankId}_results`
            );
            if (!storedResults) {
                setError("No quiz data found. Please take the quiz again.");
                setLoading(false);
                return;
            }

            const parsedResults = JSON.parse(storedResults);
            setResults(parsedResults);
            // console.log(`parsedResults`, parsedResults);
            setLoading(false);
        } catch (error) {
            setError("Failed to load quiz results");
            setLoading(false);
            console.error("Error:", error);
        }
    };

    const restartQuiz = () => {
        navigate(`/questions-banks/${bankId}`);
    };

    const getScoreColor = (percentage) => {
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !results) {
        return (
            <div className="container min-h-dvh">
                <div className="text-center py-20">
                    <p className="text-red-500 mb-4 text-2xl">
                        {error || "النتائج غير متاحة"}
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2`}
                            onClick={() => navigate("/")}
                        >
                            <Home className="h-5 w-5 mr-2" />
                            الرجوع الي الصفحة الرئيسية
                        </button>

                        {bankId && (
                            <button
                                className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2`}
                                onClick={restartQuiz}
                            >
                                <RotateCcw className="h-5 w-5 mr-2" />
                                أعادة الاختبار
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <section
                className="section course"
                id="courses"
                aria-label="course"
            >
                <div className="container min-h-dvh">
                    <div className="py-20">
                        <div className=" ">
                            <div className="mb-8 overflow-hidden bg-white rounded-lg shadow-md">
                                <div className="bg-blue-300 text-white p-6 text-center">
                                    <h2 className="text-2xl font-bold mb-2">
                                        نتيجتك
                                    </h2>

                                    <div className="text-6xl font-bold mb-2 mt-4">
                                        <span
                                            className={getScoreColor(
                                                results.percentage
                                            )}
                                        >
                                            {results.percentage}%
                                        </span>
                                    </div>

                                    <div className="text-lg">
                                        لقد اجبت
                                        <div className="flex justify-center items-center gap-2">
                                            <span className="font-semibold">
                                                {results.correct_answers || 0}
                                            </span>
                                            من
                                            <span className="font-semibold">
                                                {results.total_questions || 0}
                                            </span>
                                        </div>
                                        من عدد الأسئلة بشكل صحيح
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 py-6 px-6 bg-gray-50 border-t border-gray-200">
                                    <button
                                        onClick={() =>
                                            navigate(`/questions-banks`)
                                        }
                                        className={`px-4 py-4 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2`}
                                    >
                                        الرجوع الي جميع الاختبارات
                                        <FileQuestion
                                            size={18}
                                            className=" mr-2"
                                        />
                                    </button>

                                    {/* <button
                                onClick={restartQuiz}
                                className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2`}
                            >
                                <RotateCcw className="h-5 w-5 mr-2" />
                                أعادة الاختبار
                            </button> */}
                                </div>
                            </div>

                            <h2 className="text-4xl font-semibold text-gray-800 mb-4 mt-8">
                                تفاصيل الاختبار
                            </h2>

                            <div className="flex flex-col gap-8 space-y-4 mb-8">
                                {results?.results?.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`border-s-4 bg-white rounded-lg shadow-md overflow-hidden ${
                                            result.is_correct
                                                ? "border-green-500"
                                                : result.is_answered
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <div className="px-6 py-4">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div>
                                                    {result.is_correct ? (
                                                        <>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <span className="w-8 h-8 flex items-center justify-center  text-2xl bg-green-500 text-white rounded-full">
                                                                    {index + 1}
                                                                </span>

                                                                <CheckCircle
                                                                    size={18}
                                                                    className="text-green-500 relative top-2"
                                                                />
                                                            </div>
                                                        </>
                                                    ) : result.is_answered ? (
                                                        <>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <span className="w-8 h-8 flex items-center justify-center  text-2xl bg-red-500 text-white rounded-full">
                                                                    {index + 1}
                                                                </span>

                                                                <XCircle
                                                                    size={18}
                                                                    className="text-red-500 relative top-2"
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <span className="w-8 h-8 flex items-center justify-center  text-2xl bg-gray-500 text-white rounded-full">
                                                                    {index + 1}
                                                                </span>

                                                                <AlertCircle
                                                                    size={18}
                                                                    className="text-gray-400 relative top-2"
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    {result.question_text && (
                                                        <h3 className="mb-6 text-3xl font-medium text-gray-800">
                                                            {
                                                                result.question_text
                                                            }
                                                        </h3>
                                                    )}

                                                    {result?.question_image && (
                                                        <div className="mb-8  overflow-hidden shadow-md rounded-md">
                                                            <img
                                                                src={
                                                                    result.question_image
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
                                                                className="w-full max-h-80 object-fill"
                                                            />
                                                        </div>
                                                    )}

                                                    {result?.question_image_url && (
                                                        <div className="mb-8  overflow-hidden shadow-md rounded-md">
                                                            <img
                                                                src={
                                                                    result.question_image_url
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
                                                                className="w-full max-h-80 object-fill"
                                                            />
                                                        </div>
                                                    )}

                                                    {result.is_answered ? (
                                                        <div className="mt-3 space-y-2">
                                                            <p
                                                                className={`flex gap-2 text-xl   ${
                                                                    result.correct_choice_id
                                                                        ? "text-green-600"
                                                                        : result.selected_choice_id
                                                                        ? "text-red-600"
                                                                        : "bg-gray-50 border-gray-200"
                                                                }`}
                                                            >
                                                                إجابتك:{" "}
                                                                <span className="font-semibold">
                                                                    {result
                                                                        .all_choices[
                                                                        result
                                                                            .selected_choice_id
                                                                    ]?.text ||
                                                                        "غير معروف"}
                                                                </span>
                                                            </p>
                                                            <p
                                                                className={`flex gap-2 text-xl text-green-600 `}
                                                            >
                                                                الإجابة الصحيحة:{" "}
                                                                <span className="font-semibold">
                                                                    {result
                                                                        .all_choices[
                                                                        result
                                                                            .correct_choice_id
                                                                    ]?.text ||
                                                                        "غير معروف"}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xl text-gray-600 mt-1">
                                                            لم تتم الإجابة على
                                                            هذا السؤال
                                                        </p>
                                                    )}

                                                    <div className="mt-4 space-y-2 flex flex-col gap-2">
                                                        {result.all_choices.map(
                                                            (choice, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`p-2 shadow-sm border rounded ${
                                                                        idx ===
                                                                        result.correct_choice_id
                                                                            ? "bg-green-100 border-green-300"
                                                                            : idx ===
                                                                              result.selected_choice_id
                                                                            ? "bg-red-100 border-red-300"
                                                                            : "bg-gray-50 border-gray-200"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        {idx ===
                                                                        result.correct_choice_id ? (
                                                                            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                                                                        ) : (
                                                                            <span className="h-4 w-4 mr-2"></span>
                                                                        )}
                                                                        <span className="text-xl">
                                                                            {
                                                                                choice.text
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default QuestionBankResults;
