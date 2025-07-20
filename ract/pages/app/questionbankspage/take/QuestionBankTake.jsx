/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    ClipboardPen,
} from "lucide-react";

// api
import {
    appGetQuestionInBankQuestionBanks,
    appPostQuestionResults,
    appPostQuestionResultsSave,
} from "../../../../api/app/authApp";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { nameMainColor, QUESTIONS_PER_PAGE } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

const QuestionBankTake = () => {
    const { bankId } = useParams();

    const { userData } = UserDataStore();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [unansweredCount, setUnansweredCount] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetQuestionInBankQuestionBanks(
                    bankId
                );

                // console.log(`--------->error`, error);
                // console.log(`--------->data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الأسئلة"
                    );
                    setError(error.message);
                    navigate(`/questions-banks/${bankId}`);
                } else {
                    setQuestions(data);
                    // Initialize answers array
                    const initialAnswers = data?.map((q) => ({
                        question_id: q.id,
                        selected_choice_id: null,
                    }));
                    // console.log(`initialAnswers`, initialAnswers);
                    setAnswers(initialAnswers);
                }
            } catch (error) {
                setError("حدث خطأ أثناء جلب البيانات");
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (bankId) fetchQuestions();
    }, [bankId]);

    const handleChoiceSelect = (questionId, choiceIndex) => {
        setAnswers((prevAnswers) =>
            prevAnswers.map((answer) =>
                answer.question_id === questionId
                    ? { ...answer, selected_choice_id: choiceIndex }
                    : answer
            )
        );
    };

    const getCurrentPageQuestions = () => {
        const start = currentPage * QUESTIONS_PER_PAGE;
        const end = start + QUESTIONS_PER_PAGE;
        return questions?.slice(start, end);
    };

    const totalPages = Math.ceil(questions?.length / QUESTIONS_PER_PAGE);

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            // window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const submitQuiz = async () => {
        const unanswered = answers.filter(
            (a) => a.selected_choice_id === null
        ).length;
        setUnansweredCount(unanswered);

        if (unanswered > 0) {
            setShowConfirmationModal(true);
            return;
        }

        await proceedWithSubmission();
    };

    const proceedWithSubmission = async () => {
        try {
            setIsSubmitting(true);

            // 1. Calculate results locally
            const results = questions.map((question) => ({
                question_id: question.id,
                selected_choice_id: answers.find(
                    (a) => a.question_id === question.id
                )?.selected_choice_id,
            }));
            // console.log(`results`, results);

            const correct_answers = results.filter(
                (r) =>
                    r.selected_choice_id ===
                    questions.find((q) => q.id === r.question_id)
                        ?.correct_answer
            ).length;
            // console.log(`correct_answers`, correct_answers);

            const percentage = (
                (correct_answers / questions.length) *
                100
            ).toFixed(2);
            // console.log(`percentage`, percentage);

            // 2. Prepare result data for display and saving
            const resultData = {
                user: userData?.id,
                question_bank: bankId,

                total_questions: questions.length,
                correct_answers,
                percentage: parseFloat(percentage),

                results: questions.map((question) => {
                    const answer = answers.find(
                        (a) => a.question_id === question.id
                    );
                    return {
                        question_id: question.id,

                        question_text: question.text,
                        question_image: question.image,
                        question_image_url: question.image_url,

                        is_answered: answer?.selected_choice_id !== null,
                        selected_choice_id: answer?.selected_choice_id,
                        correct_choice_id: question.correct_answer,
                        is_correct:
                            answer?.selected_choice_id ===
                            question.correct_answer,
                        all_choices: question.choices,
                    };
                }),
            };
            // console.log(`resultData`, resultData);

            // 3. Save to session storage
            sessionStorage.setItem(
                `quiz_${bankId}_results`,
                JSON.stringify(resultData)
            );

            // // 4. Send to server (optional steps)
            try {
                // Step 1: Save detailed results to database
                const { data, error: saveError } =
                    await appPostQuestionResultsSave(resultData);

                // console.log(`error`, saveError);
                // console.log(`data`, data);

                if (saveError) {
                    // throw saveError;
                    Toast(
                        "error",
                        saveError.message || "حدث خطأ أثناء حفظ نتيجة الاختبار"
                    );
                } else {
                    Toast("success", "تم حفظ نتيجة الاختبار بنجاح");
                }
            } catch (error) {
                console.error("Failed to save results to server:", error);
                // يمكنك اختيار إظهار رسالة للمستخدم أو الاستمرار بدون حفظ في السيرفر
                Toast(
                    "error",
                    "تم حفظ النتائج محلياً ولكن حدث خطأ في الحفظ على السيرفر"
                );
            }

            // 5. Navigate to results page
            navigate(`/questions-banks/${bankId}/results`);
        } catch (error) {
            Toast("error", "حدث خطأ أثناء إرسال الإجابات");
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // const proceedWithSubmission = async () => {
    //     try {
    //         setIsSubmitting(true);

    //         // Calculate results
    //         const results = questions.map((question) => {
    //             const answer = answers.find(
    //                 (a) => a.question_id === question.id
    //             );
    //             const isCorrect =
    //                 answer?.selected_choice_id === question.correct_answer;

    //             return {
    //                 question_id: question.id,
    //                 selected_choice_id: answer?.selected_choice_id,
    //             };
    //         });

    //         const correct_answers = results.filter(
    //             (r) =>
    //                 r.selected_choice_id ===
    //                 questions.find((q) => q.id === r.question_id)
    //                     ?.correct_answer
    //         ).length;
    //         const percentage = (
    //             (correct_answers / questions.length) *
    //             100
    //         ).toFixed(2);

    //         // Save results to session storage
    //         const resultData = {
    //             total_questions: questions.length,
    //             correct_answers,
    //             percentage: parseFloat(percentage),
    //             results: questions.map((question) => {
    //                 const answer = answers.find(
    //                     (a) => a.question_id === question.id
    //                 );
    //                 return {
    //                     question_id: question.id,
    //                     question_text: question.text,
    //                     is_answered: answer?.selected_choice_id !== null,
    //                     selected_choice_id: answer?.selected_choice_id,
    //                     correct_choice_id: question.correct_answer,
    //                     is_correct:
    //                         answer?.selected_choice_id ===
    //                         question.correct_answer,
    //                     all_choices: question.choices,
    //                 };
    //             }),
    //         };

    //         sessionStorage.setItem(
    //             `quiz_${bankId}_results`,
    //             JSON.stringify(resultData)
    //         );

    //         console.log(`bankId`, bankId);
    //         console.log(`resultData`, resultData);

    //         // Optional: Send results to server
    //         try {
    //             // await api.post(`/question-results/save/${bankId}/`, resultData);
    //             const { data, error } = await appPostQuestionResults(
    //                 bankId,
    //                 resultData
    //             );
    //             console.log(`resultData`, resultData);
    //             console.log(`error`, error);
    //             console.log(`data`, data);
    //         } catch (error) {
    //             console.error("Failed to save results:", error);
    //         }

    //         // navigate(`/questions-banks/${bankId}/results`);
    //     } catch (error) {
    //         Toast("error", "حدث خطأ أثناء إرسال الإجابات");
    //         console.error("Error:", error);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-dvh">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 mx-auto`}
                    onClick={() => navigate(`/questions-banks/${bankId}`)}
                >
                    العودة إلى بداية الاختبار
                </button>
            </div>
        );
    }

    const currentQuestions = getCurrentPageQuestions();
    const answeredCount = answers.filter(
        (a) => a.selected_choice_id !== null
    ).length;

    return (
        <>
            <section
                className="section course"
                id="courses"
                aria-label="course"
            >
                <div className="container">
                    <div className=" py-20 relative min-h-dvh">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">
                                الاختبار
                            </h1>

                            <div className="text-2xl text-gray-600 flex gap-2">
                                {`تمت الإجابة: `}
                                <span className={`font-semibold text-blue-600`}>
                                    {answeredCount}
                                </span>
                                / <span>{questions?.length}</span>
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col gap-8 mb-8">
                            {currentQuestions?.map((question, index) => {
                                const questionNumber =
                                    currentPage * QUESTIONS_PER_PAGE +
                                    index +
                                    1;
                                const answer = answers.find(
                                    (a) => a.question_id === question.id
                                );

                                return (
                                    <div
                                        key={index}
                                        className={`bg-white rounded-lg shadow-md transition-all 
                                            overflow-hidden
                                            ${
                                                answer?.selected_choice_id !==
                                                null
                                                    ? "border-r-4 border-green-500"
                                                    : ""
                                            }`}
                                    >
                                        <div
                                            className={`px-6 ps-14 py-8 relative`}
                                        >
                                            {/* <div className="flex items-start mb-4">
                                                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                    {questionNumber}
                                                </span>
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    {question.text}
                                                </h3>
                                            </div> */}

                                            <div className="flex items-start select-none  absolute -start-1 -top-1 z-10">
                                                <span className="flex-shrink-0 bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                                                    {questionNumber}
                                                </span>
                                            </div>

                                            {question?.text && (
                                                <div className="flex items-start pe-4 mb-8">
                                                    <h3 className="text-2xl font-medium truncate text-gray-800 text-wrap overflow-hidden">
                                                        نص السؤال:{" "}
                                                        {question?.text}
                                                    </h3>
                                                </div>
                                            )}

                                            {question?.image && (
                                                <div className="mb-4 shadow-md overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={question.image}
                                                        alt="Question"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                noimage;
                                                            e.target.onerror =
                                                                null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                        }}
                                                        className="w-full  max-h-80 object-fill"
                                                    />
                                                </div>
                                            )}

                                            {question?.image_url && (
                                                <div className="mb-4 shadow-md overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={question.image_url}
                                                        alt="Question"
                                                        className="w-full  max-h-80 object-fill"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                noimage;
                                                            e.target.onerror =
                                                                null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-3 flex flex-col gap-4 mt-8">
                                                {question.choices.map(
                                                    (choice, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() =>
                                                                handleChoiceSelect(
                                                                    question.id,
                                                                    idx
                                                                )
                                                            }
                                                            className={`text-2xl p-3 border rounded-md cursor-pointer transition-all ${
                                                                answer?.selected_choice_id ===
                                                                idx
                                                                    ? "bg-blue-50 border-blue-300"
                                                                    : "hover:bg-gray-50 border-gray-200"
                                                            }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    checked={
                                                                        answer?.selected_choice_id ===
                                                                        idx
                                                                    }
                                                                    id={`q${question?.id}_c${idx}`}
                                                                    name={`q${question?.id}_c${idx}`}
                                                                    // name={`question_${question?.id}`}
                                                                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                                    readOnly
                                                                />
                                                                <label
                                                                    htmlFor={`q${question?.id}_c${idx}`}
                                                                    className="ms-3 block text-gray-700 cursor-pointer"
                                                                >
                                                                    {
                                                                        choice.text
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {questions?.length > 0 && (
                            <div className=" bg-white rounded-lg shadow-md overflow-hidden sticky bottom-4">
                                <div className="text-2xl flex justify-between items-center bg-gray-50 px-6 py-4 border-t border-gray-200">
                                    <div className="flex gap-4">
                                        {currentPage < totalPages - 1 ? (
                                            <button
                                                className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2`}
                                                onClick={goToNextPage}
                                            >
                                                <ChevronRight
                                                    size={18}
                                                    // className="h-5 w-8 ml-1"
                                                />
                                                التالي
                                            </button>
                                        ) : (
                                            <button
                                                className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2`}
                                                onClick={submitQuiz}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "جاري الإرسال..."
                                                    : "إرسال الاجابات"}
                                                <ClipboardPen
                                                    size={18}
                                                    // className="h-5 w-5 ml-1"
                                                />
                                            </button>
                                        )}

                                        {currentPage > 0 && (
                                            <button
                                                className={`px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2`}
                                                onClick={goToPrevPage}
                                            >
                                                السابق
                                                <ChevronLeft
                                                    size={18}
                                                    // className="h-5 w-5 mr-1"
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-2xl text-gray-600">
                                        الصفحة {currentPage + 1} من {totalPages}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <div className="bg-white rounded-lg shadow-md sticky bottom-4">
                            <div className="text-3xl flex justify-between items-center p-4 border-t border-gray-200">
                                <div className="text-gray-600">
                                    الصفحة {currentPage + 1} من {totalPages}
                                </div>

                                <div className="flex gap-4">
                                    {currentPage > 0 && (
                                        <button
                                            onClick={goToPrevPage}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                            السابق
                                        </button>
                                    )}

                                    {currentPage < totalPages - 1 ? (
                                        <button
                                            onClick={goToNextPage}
                                            className="px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            التالي
                                            <ChevronRight
                                                size={18}
                                                // className="h-5 w-5"
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={submitQuiz}
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-1"
                                        >
                                            {isSubmitting
                                                ? "جاري الإرسال..."
                                                : "إرسال الإجابات"}
                                            <ClipboardPen className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Confirmation Modal */}
                    {showConfirmationModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                                <div className="flex items-center flex-col gap-4 mb-4">
                                    <AlertCircle className="h-14 w-14 text-yellow-500" />

                                    <h3 className="text-2xl font-bold">
                                        لديك {unansweredCount} أسئلة لم تتم
                                        الإجابة عليها
                                    </h3>

                                    <p className="text-lg mb-6 text-gray-600">
                                        هل أنت متأكد أنك تريد إرسال الإجابات؟
                                    </p>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() =>
                                            setShowConfirmationModal(false)
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        onClick={proceedWithSubmission}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        تأكيد الإرسال
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default QuestionBankTake;
