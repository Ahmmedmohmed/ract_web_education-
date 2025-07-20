/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardCheck } from "lucide-react";

// api
// import { questionBankApi } from "../../api/api";
import { appGetQuestionBankById } from "../../../../api/app/authApp";

// data
import { questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { nameMainColor, QUESTIONS_PER_PAGE } from "../../../../utils/constants";

// components
// import Button from "../../components/Button";
// import Card, { CardBody, CardHeader, CardFooter } from "../../components/Card";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

const QuestionBankDetails = () => {
    const { bankId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [questionBank, setQuestionBank] = useState(null);

    useEffect(() => {
        const fetchQuestionBank = async () => {
            try {
                const { data, error } = await appGetQuestionBankById(bankId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/questions-banks`);
                } else {
                    setQuestionBank(data || []);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/questions-banks`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestionBank();
    }, [bankId, navigate]);

    if (isLoading && !questionBank) {
        return (
            <div className="flex justify-center items-center h-64 mt-60">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!questionBank) {
        return (
            <div className="text-center py-12 mt-50">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // console.log(`questionBank`, questionBank);

    return (
        <>
            <section
                className="section course min-h-dvh"
                id="courses"
                aria-label="course"
            >
                <div className="container">
                    <div>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : questionBank.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    جاري تحميل التصنيف
                                </p>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto py-20">
                                <div className="mb-6  bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-96 overflow-hidden">
                                        <img
                                            src={
                                                questionBank?.image_url ||
                                                questionBank?.image ||
                                                noimage
                                            }
                                            alt={questionBank?.title}
                                            onError={(e) => {
                                                e.target.src = noimage;
                                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                            }}
                                            className="w-full h-full object-fill max-h-96"
                                        />
                                    </div>

                                    <div
                                        className={`px-6 py-4 border-b border-gray-200  `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-3xl font-semibold text-gray-800">
                                                {questionBank?.title}
                                            </h2>

                                            <span className="bg-purple-100 text-purple-800 text-lg py-1 px-3 rounded-full">
                                                {questionBank?.section?.title}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`px-6 py-4  `}>
                                        <p className="text-gray-700 mb-4">
                                            {questionBank?.description}
                                        </p>

                                        <div className="bg-blue-50 p-4 rounded-md mb-4">
                                            <div className="flex items-start">
                                                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 me-4" />

                                                <div>
                                                    <h3 className="text-2xl font-medium text-blue-800 mb-4">
                                                        معلومات عن الاختبار
                                                    </h3>

                                                    <ul className="text-lg text-blue-700 space-y-1">
                                                        <li>
                                                            • يحتوي هذا الاختبار
                                                            على{" "}
                                                            {questionBank?.total_question_in_bank ||
                                                                0}{" "}
                                                            سؤالاً
                                                        </li>

                                                        {questionBank?.total_question_in_bank >
                                                            9 && (
                                                            <li>
                                                                • سترى{" "}
                                                                {
                                                                    QUESTIONS_PER_PAGE
                                                                }{" "}
                                                                اختبارات في كل
                                                                صفحة
                                                            </li>
                                                        )}

                                                        <li>
                                                            • يتم عرض الأسئلة
                                                            بترتيب عشوائي
                                                        </li>

                                                        <li>
                                                            • اختر الإجابة
                                                            الأفضل لكل سؤال
                                                        </li>

                                                        <li>
                                                            • سوف ترى نتيجتك في
                                                            نهاية الاختبار
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end`}
                                    >
                                        <button
                                            onClick={() => {
                                                navigate(
                                                    `/questions-banks/${bankId}/take`
                                                );
                                            }}
                                            className="px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all duration-500 flex items-center gap-2"
                                        >
                                            <ClipboardCheck className="h-5 w-5 mr-2" />
                                            بدا الاختبار
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default QuestionBankDetails;
