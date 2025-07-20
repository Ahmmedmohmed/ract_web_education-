import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { nameMainColor } from "../../../../utils/constants";

const AssessmentQuiz = ({ questions, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (optionIndex) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = optionIndex;
        setSelectedAnswers(newAnswers);
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correct_answer) {
                correctAnswers++;
            }
        });
        return (correctAnswers / questions.length) * 100;
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            onComplete(calculateScore());
        }
    };

    if (showResults) {
        const score = calculateScore();
        return (
            <>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">
                        نتيجة الاختبار
                    </h2>

                    <div className="text-center mb-8">
                        <div
                            className="text-6xl font-bold mb-2"
                            style={{
                                color: score >= 70 ? "#22c55e" : "#ef4444",
                            }}
                        >
                            {score.toFixed(0)}%
                        </div>
                        <p className="text-gray-600">
                            {score >= 70
                                ? "أحسنت! لقد اجتزت الاختبار بنجاح"
                                : "حاول مرة أخرى للحصول على نتيجة أفضل"}
                        </p>
                    </div>

                    <div className="space-y-4 flex flex-col gap-4">
                        {questions?.map((question, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    {selectedAnswers[index] ===
                                    question.correct_answer ? (
                                        <CheckCircle
                                            className="text-green-500 mt-1"
                                            size={20}
                                        />
                                    ) : (
                                        <XCircle
                                            className="text-red-500 mt-1"
                                            size={20}
                                        />
                                    )}

                                    <div>
                                        <p className="font-medium text-2xl text-black">
                                            {question?.text}
                                        </p>

                                        <div className="mt-2 text-sm">
                                            <p className="text-gray-600">
                                                إجابتك:{" "}
                                                {
                                                    question.choices[
                                                        selectedAnswers[index]
                                                    ]?.text
                                                }
                                            </p>

                                            <p className="text-green-600">
                                                الإجابة الصحيحة:{" "}
                                                {
                                                    question.choices[
                                                        question.correct_answer
                                                    ]?.text
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setShowResults(false);
                            setCurrentQuestion(0);
                            setSelectedAnswers([]);
                        }}
                        className={`mt-6 w-full text-2xl bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-md transition-colors`}
                    >
                        {" "}
                        حاول مرة أخرى{" "}
                    </button>

                    {/* <button
                        onClick={() => {
                            window.location.reload();
                        }}
                        className="mt-6 w-full text-2xl bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-md transition-colors"
                    >
                        حاول مرة أخرى
                    </button> */}
                </div>
            </>
        );
    }

    const question = questions[currentQuestion];

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">
                            السؤال {currentQuestion + 1} من {questions.length}
                        </span>

                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-blue-500 rounded-full transition-all`}
                                style={{
                                    width: `${
                                        ((currentQuestion + 1) /
                                            questions.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-black">
                        {question.text}
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {question?.choices?.map((choice, index) => (
                        <button
                            key={index}
                            className={`w-full p-4 text-2xl text-start rounded-lg border transition-all text-gray-800 ${
                                selectedAnswers[currentQuestion] === index
                                    ? `border-blue-500 bg-blue-50`
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                                handleAnswerSelect(index);
                            }}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => {
                        handleNext();
                    }}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className={`mt-6 w-full text-2xl py-4 px-4 rounded-md transition-colors ${
                        selectedAnswers[currentQuestion] === undefined
                            ? "bg-gray-200 cursor-not-allowed"
                            : `bg-blue-500 hover:bg-blue-600 text-white`
                    }`}
                >
                    {currentQuestion === questions.length - 1
                        ? "إنهاء الاختبار"
                        : "السؤال التالي"}
                </button>
            </div>
        </>
    );
};

export default AssessmentQuiz;
