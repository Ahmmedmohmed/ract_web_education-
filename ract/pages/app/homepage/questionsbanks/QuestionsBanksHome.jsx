/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiExternalLink, FiSearch } from "react-icons/fi";
import { ArrowRight, Loader2, TableOfContents } from "lucide-react";

// api
// import { quizBankApi } from "../../api/api";
import {
    appGetQuestionsBanks,
    appGetQuestionsBanksResult,
} from "../../../../api/app/authApp";

// data
import { questionbank, sections as sectionsA } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// uitls
import { nameMainColor, PAGE_SIZE } from "../../../../utils/constants";

// components
import QuestionBankCard from "../../questionbankspage/card/QuestionBankCard";
// import UserQuizBankCard from "../../components/user/QuizBankCard";
// import Pagination from "../../components/common/Pagination";

function QuestionsBanksHome() {
    const navigate = useNavigate();

    const [questionsBanks, setQuestionsBanks] = useState([]);
    const [allQuestionsBanks, setAllQuestionsBanks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchQuestionsBanks = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetQuestionsBanksResult(
                    9,
                    currentPage,
                    selectedStatus
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setQuestionsBanks(data);
                    setAllQuestionsBanks(data);
                    // setQuestionsBanks(data.results);
                    // setAllQuestionsBanks(data.results);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestionsBanks();
    }, [currentPage, selectedStatus]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 pt-80">
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

    return (
        <>
            <section
                className="section course"
                id="courses"
                aria-label="course"
            >
                <div className="container">
                    <div className="pb-40">
                        <div className="category-header text-center mb-10">
                            <p
                                className="section-subtitle text-lg text-gray-600"
                                data-aos="fade-down"
                            >
                                بنوك الاختبارات التدريبية
                            </p>

                            <h1
                                className="h2 section-title text-3xl font-bold mb-4"
                                data-aos="fade-down"
                            >
                                اختر بنك اختبار للبدء
                            </h1>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : questionsBanks?.length === 0 ? (
                            <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                <p className="text-gray-500">
                                    لا توجد بنوك اختبارات
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {questionsBanks?.map((questionbank, index) => (
                                    <QuestionBankCard
                                        key={index}
                                        questionbank={questionbank}
                                    />
                                ))}
                            </ul>
                        )}

                        <Link
                            to={`/questions-banks`}
                            href="#"
                            className="btn has-before"
                        >
                            {/* <ion-icon
                                name="arrow-forward-outline"
                                aria-hidden="true"
                            ></ion-icon> */}
                            <ArrowRight />

                            <span className="span">شاهد جميع الاختبارات</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default QuestionsBanksHome;
