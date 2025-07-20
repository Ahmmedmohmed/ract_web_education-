/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGeoLocation from "react-ipgeolocation";
import {
    Star,
    Clock,
    FileText,
    Award,
    Check,
    ArrowRight,
    Coffee,
    Lock,
    Play,
    RefreshCw,
    ThumbsUp,
    Folder,
    Download,
    BookOpenCheck,
    SquarePlus,
    BadgePlus,
    ChevronDown,
    ChevronUp,
    Facebook,
    Twitter,
    Linkedin,
    Frown,
    File,
    MessageCircle,
    CalendarDays,
} from "lucide-react";

// api
import {
    appGetCourseAllById,
    appPostCourseCreateCheckout,
    appGetCourseFetchEnrollStatus,
    appPostStudentEnrollCourse,
    appGetCoursePaymentResult,
    appPostCouponCourseSearchApp,
} from "../../../../api/app/authApp";
import { getRefreshToken } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// data
import { Courses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_Admin,
    App_User,
    namecurrency,
    nameMainColor,
} from "../../../../utils/constants";
import { formatDateAR } from "../../../../utils/helpers";

// components
import VideoPlayer from "../../../user/coursedetails/videoplayer/VideoPlayer";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

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
            if (onComplete) onComplete(calculateScore());
        }
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                لا توجد أسئلة متاحة لهذا الاختبار
            </div>
        );
    }

    if (showResults) {
        const score = calculateScore();
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-black">
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

                <div className="mt-8 mb-6">
                    <h3 className="text-2xl font-semibold mb-4 border-b pb-2 text-right">
                        تفاصيل الإجابات
                    </h3>

                    <div className="space-y-6 flex flex-col gap-4">
                        {questions.map((question, qIndex) => {
                            const isCorrect =
                                selectedAnswers[qIndex] ===
                                question.correct_answer;
                            const userSelectedOption =
                                question.choices[selectedAnswers[qIndex]]?.text;
                            const correctOption =
                                question.choices[question.correct_answer]?.text;

                            return (
                                <div
                                    key={qIndex}
                                    className={`p-4 rounded-lg ${
                                        isCorrect
                                            ? "bg-green-50 border border-green-100"
                                            : "bg-red-50 border border-red-100"
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span
                                            className={`text-lg font-bold rounded-full h-7 w-7 flex items-center justify-center ${
                                                isCorrect
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}
                                        >
                                            {isCorrect ? "✓" : "✗"}
                                        </span>

                                        <span className="text-lg">
                                            {qIndex + 1}.{" "}
                                        </span>

                                        {question.text && (
                                            <p className="font-medium text-2xl">
                                                {question.text ||
                                                    "السؤال بدون نص"}
                                            </p>
                                        )}
                                    </div>

                                    {question.image_url && (
                                        <div className="mt-3 mb-3 text-center">
                                            <img
                                                src={question.image_url}
                                                alt="Question illustration"
                                                className="rounded max-h-40 mx-auto border border-gray-200"
                                            />
                                        </div>
                                    )}

                                    <div className="mt-3 pr-8 space-y-3">
                                        {!isCorrect && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 p-2 rounded bg-red-100 border border-red-200">
                                                    <span className="bg-red-500 text-white text-lg px-2 py-1 rounded">
                                                        إجابتك
                                                    </span>
                                                    <span className=" text-lg text-red-800">
                                                        {userSelectedOption ||
                                                            "لم تختر إجابة"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 p-2 rounded bg-green-100 border border-green-200">
                                                    <span className="bg-green-500 text-white text-lg px-2 py-1 rounded">
                                                        الإجابة الصحيحة
                                                    </span>
                                                    <span className=" text-lg text-green-800">
                                                        {correctOption}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {isCorrect && (
                                            <div className="flex items-center gap-2 p-2 rounded bg-green-100 border border-green-200">
                                                <span className="bg-green-500 text-white text-lg px-2 py-1 rounded">
                                                    إجابتك صحيحة
                                                </span>
                                                <span className=" text-lg text-green-800">
                                                    {correctOption}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={() => {
                        setShowResults(false);
                        setCurrentQuestion(0);
                        setSelectedAnswers([]);
                    }}
                    className={`mt-6 w-full text-2xl bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-md transition-colors`}
                >
                    حاول مرة أخرى
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-500">
                        السؤال {currentQuestion + 1} من {questions.length}
                    </span>

                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-blue-500 rounded-full transition-all`}
                            style={{
                                width: `${
                                    ((currentQuestion + 1) / questions.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                {question.text && (
                    <h2 className="text-2xl font-bold text-black">
                        {question.text || "السؤال بدون نص"}
                    </h2>
                )}

                {question.image_url && (
                    <div className="mt-3 mb-4 rounded-md border border-gray-300">
                        <img
                            src={question.image_url}
                            alt="Question illustration"
                            className="mx-auto rounded max-h-96"
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                {question.choices.map((choice, index) => (
                    <button
                        key={index}
                        className={`w-full p-4 text-2xl text-start rounded-lg border transition-all text-gray-800 ${
                            selectedAnswers[currentQuestion] === index
                                ? `border-blue-500 bg-blue-50`
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                    >
                        {choice.text}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
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
    );
};

// Simple VideoPlayer component replaced with imported VideoPlayer
const SimpleVideoPlayer = ({ videoUrl, title }) => {
    if (!videoUrl)
        return (
            <div className="p-4 text-center text-gray-500">
                الفيديو غير متوفر
            </div>
        );

    return (
        <VideoPlayer videoUrl={videoUrl} title={title} isProtected={false} />
    );
};

// Main CourseDetails component
function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();
    // console.log(`userData`, userData);

    const [course, setCourse] = useState(null);
    const [enrolledStatus, setEnrolledStatus] = useState([]);
    const [newPrice, setNewPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseAllById(courseId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/courses`);
                } else {
                    // Set form values
                    setCourse(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/courses`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, navigate]);

    const toggleExpandItem = (sectionId, itemId) => {
        const key = `${sectionId}-${itemId}`;
        setExpandedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    useEffect(() => {
        const fetchCourseEnrollStatus = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseFetchEnrollStatus(
                    userData?.id,
                    courseId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    // Toast(
                    //     "error",
                    //     error.message || "حدث خطأ أثناء جلب حالة الاشتراك"
                    // );
                    // console.log();
                } else {
                    // console.log(``);
                    if (data.bool == true) {
                        setEnrolledStatus("success");
                    }
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب حالة الاشتراك"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.id) {
            fetchCourseEnrollStatus();
        }
    }, [courseId, userData?.id]);

    //
    const { country } = useGeoLocation();
    const [pricing, setPricing] = useState({
        price: 0,
        originalPrice: 0,
        discount: 0,
        currency: namecurrency,
    });

    useEffect(() => {
        setIsLoading(true);
        let price, originalPrice, discount, currency;

        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country?.countryCode || country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            // ودول افريقا كلها
            price =
                course?.price_after_discount_egypt ||
                course?.price_like_egypt ||
                0;
            originalPrice = course?.price_like_egypt || 0;
            discount = course?.discount_like_egypt || 0;
            currency = "جنيه";
            setIsLoading(false);
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            price =
                course?.price_after_discount_saudi ||
                course?.price_like_saudi ||
                0;
            originalPrice = course?.price_like_saudi || 0;
            discount = course?.discount_like_saudi || 0;
            currency = "ريال";
            setIsLoading(false);
        } else {
            // باقي الدول (أمريكا وغيرها)
            price =
                course?.price_after_discount_america ||
                course?.price_like_america ||
                0;
            originalPrice = course?.price_like_america || 0;
            discount = course?.discount_like_america || 0;
            currency = "دولار";
            setIsLoading(false);
        }

        setPricing({
            price,
            originalPrice,
            discount,
            currency,
        });
    }, [country, course]);

    //
    const enrollCourseFree = async () => {
        try {
            setIsLoading(true);

            const _formData = new FormData();
            _formData.append("student", userData?.id);
            _formData.append("course", courseId);
            _formData.append("price", course?.price_after_discount);

            const { data, error } = await appPostStudentEnrollCourse(_formData);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الاقسام");
            } else {
                // console.log();
                Toast("success", "تم الاشتراك في الدورة بنجاح");
                navigate(`/${App_User}/courses`);
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

    //
    const handleCouponSearch = async (formData) => {
        try {
            setIsLoading(true);

            // const couponSearch = new FormData();
            // couponSearch.append("coupon", formData.coupon);

            // console.log(`formData`, formData.coupon);

            const { data, error } = await appPostCouponCourseSearchApp(
                formData.coupon
            );
            // couponSearch

            // for (let [key, value] of couponSearch.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            console.log(`error`, error);
            console.log(`data`, data);

            if (error) {
                // if (error.message) {
                //     Toast("error", error.message);
                // } else if (error.email) {
                //     Toast("error", error.email[0]);
                // }
                Toast("error", "حدث خطأ أثناء البحث عن الكوبون");
            } else {
                if (data?.length > 0) {
                    setNewPrice(data[0].discount);
                    Toast("success", "تم التحقق من الكوبون بنجاح");
                }
            }
        } catch (error) {
            console.log("Error submitting contact form:", error);
            Toast("error", "حدث خطأ أثناء إرسال الرسالة");
        } finally {
            setIsLoading(false);
        }
    };

    //
    const handleSubscribe = async (course_id) => {
        // try {
        //     setIsLoading(true);
        //     const { data, error } = appPostCourseCreateCheckout(course_id);
        //     // console.log(`error`, error);
        //     // console.log(`data`, data);
        //     if (error) {
        //         Toast("error", error.message || "حدث خطأ أثناء الاشتراك");
        //         navigate(`/courses`);
        //     } else {
        //         // Toast("success", "تم الاشتراك في الدورة بنجاح");
        //         // console.log(`res`, res);
        //         const checkoutId = data?.id;
        //         const script = document.createElement("script");
        //         script.src = `https://oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
        //         script.async = true;
        //         document.getElementById("payment-form").innerHTML = "";
        //         document.getElementById("payment-form").appendChild(script);
        //         handlePaymentResult(course_id);
        //     }
        // } catch (error) {
        //     console.log(`error`, error);
        // }
        //
        // try {
        //     let { data: dataaccess } = await getRefreshToken();
        //     // console.log(`dataaccess`, dataaccess);
        //     const res = await axios.post(
        //         "http://127.0.0.1:8000/api/v1/create-checkout/",
        //         {
        //             course_id,
        //         },
        //         {
        //             headers: { Authorization: `Bearer ${dataaccess?.access}` },
        //         }
        //     );
        //     const checkoutId = res.data.id;
        //     // console.log(`res`, res);
        //     const script = document.createElement("script");
        //     script.src = `https://oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
        //     script.async = true;
        //     document.getElementById("payment-form").innerHTML = "";
        //     document.getElementById("payment-form").appendChild(script);
        //     // Add listener to wait for payment then check result
        //     const interval = setInterval(async () => {
        //         const urlParams = new URLSearchParams(window.location.search);
        //         const resourcePath = urlParams.get("resourcePath");
        //         if (resourcePath) {
        //             clearInterval(interval);
        //             const result = await axios.get(
        //                 "http://127.0.0.1:8000/api/v1/payment-result/",
        //                 {
        //                     params: { resourcePath, course_id },
        //                     headers: {
        //                         Authorization: `Bearer ${dataaccess?.access}`,
        //                     },
        //                 }
        //             );
        //             alert(result.data.message);
        //         }
        //     }, 2000);
        // } catch (error) {
        //     console.log(`error`, error);
        // }
    };

    //
    const handlePaymentResult = async (course_id) => {
        try {
            setIsLoading(true);

            const interval = setInterval(async () => {
                const urlParams = new URLSearchParams(window.location.search);
                const resourcePath = urlParams.get("resourcePath");
                if (resourcePath) {
                    clearInterval(interval);
                    const { data, error } = await appGetCoursePaymentResult(
                        resourcePath,
                        course_id
                    );
                    if (error) {
                        Toast(
                            "error",
                            error.message || "حدث خطأ أثناء الاشتراك"
                        );
                        navigate(`/courses`);
                    } else {
                        alert(data.message);
                        setIsLoading(false);
                    }
                }
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            console.log(`error`, error);
        }
    };

    //
    const shareOnFacebook = () => {
        const currentUrl = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(
            `${course?.title}\n\n${course?.description || ""}`
        );
        const url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${text}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareOnTwitter = () => {
        const currentUrl = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(
            `${course?.title}\n\n${course?.description || ""}`
        );
        const url = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${text}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareOnLinkedIn = () => {
        const currentUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(course?.title || "");
        const summary = encodeURIComponent(course?.description || "");
        const url = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}&summary=${summary}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent(
            `${course?.title}\n\n${course?.description || ""}\n\n${
                window.location.href
            }`
        );
        const url = `https://wa.me/?text=${text}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    //
    const handleDownloadFile = (file) => {
        const link = document.createElement("a");
        link.href = file.content;
        link.download = file.name;
        link.click();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // if (!course) {
    //     return (
    //         <>
    //             <div className="min-h-screen flex items-center justify-center">
    //                 <div className="text-center">
    //                     <h2 className="text-2xl font-bold mb-4">
    //                         الدورة غير موجودة
    //                     </h2>
    //                     <button
    //                         onClick={() => {
    //                             navigate(`/courses`);
    //                         }}
    //                         className="bg-primary text-white px-4 py-2 rounded"
    //                     >
    //                         العودة للدورات
    //                     </button>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }

    // console.log(`course`, course);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto py-40">
                    <section className="bg-secondary-dark  md:py-16">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-3/5 mb-8 lg:mb-0">
                                    <div className="flex items-center mb-4">
                                        {/* <span className="bg-blue-700 text-white text-lg px-2 py-2 rounded ml-2">
                                            {course?.section?.title}
                                        </span> */}

                                        {course?.tag && (
                                            <span className="bg-amber-500 text-white text-lg px-2 py-2 rounded">
                                                {course?.tag}
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-black mb-6">
                                        {course?.title}
                                    </h1>

                                    {course?.description && (
                                        <p className="text-black/90 text-lg mb-6">
                                            {course?.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center text-black/90 mb-6 text-lg">
                                        <div className=" flex items-center ml-6 mb-2">
                                            <Star
                                                size={18}
                                                className="fill-amber-500 text-amber-500 ml-1"
                                            />

                                            {/* <span>
                                                {course?.rating?.toFixed(1) ||
                                                    "4.5"}
                                            </span> */}

                                            <span className="mr-1 text-black/70">
                                                (
                                                {/* {course?.reviews_count?.toLocaleString() ||
                                                    "0"}{" "} */}
                                                5.0 تقييم)
                                            </span>
                                        </div>

                                        <div className="flex items-center ml-6 mb-2">
                                            <span>
                                                {course?.total_enrolled_students ||
                                                    "0"}{" "}
                                                طالب
                                            </span>
                                        </div>

                                        <div className="flex items-center ml-6 mb-2">
                                            <Clock size={16} className="ml-1" />
                                            <span>{course?.duration}</span>
                                        </div>

                                        <div className="flex items-center ml-6 mb-2">
                                            <CalendarDays
                                                size={16}
                                                className="ml-1"
                                            />
                                            <span>
                                                آخر تحديث:{" "}
                                                {formatDateAR(
                                                    course?.updated_at
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-lg">
                                        <img
                                            src={
                                                // course?.instructor?.image ||
                                                userimage
                                            }
                                            alt={course?.user?.full_name}
                                            onError={(e) => {
                                                e.target.src = userimage;
                                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                            }}
                                            className="w-20 h-20 rounded-full object-cover ml-2"
                                        />

                                        <span>
                                            بواسطة{" "}
                                            {course?.user?.first_name +
                                                " " +
                                                course?.user?.last_name}
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:w-2/5 lg:pr-10">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={
                                                    course?.image_url ||
                                                    course?.image ||
                                                    noimage
                                                }
                                                alt={course?.title}
                                                onError={(e) => {
                                                    e.target.src = noimage;
                                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                }}
                                                className="w-full min-h-96 max-h-96 object-fill"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3">
                                                    <Play size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-center gap-4 mb-7 my-5">
                                                {/* {newPrice > 0 ? (
                                                    <div className="text-3xl font-bold text-blue-700">
                                                        {course?.price_after_discount -
                                                            newPrice}{" "}
                                                        ر.س
                                                    </div>
                                                ) : (
                                                    <div className="text-3xl font-bold text-blue-700">
                                                        {
                                                            course?.price_after_discount
                                                        }{" "}
                                                        ر.س
                                                    </div>
                                                )} */}

                                                {/* {course?.discount &&
                                                    course?.discount > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-2xl text-muted-foreground line-through mr-2">
                                                                {course?.price}{" "}
                                                                ر.س
                                                            </div>

                                                            <div className="bg-red-100 text-red-600 px-2 py-1 text-lg rounded mr-2">
                                                                {
                                                                    course?.discount
                                                                }{" "}
                                                                خصم
                                                            </div>

                                                            {newPrice > 0 && (
                                                                <div className="bg-red-100 text-red-600 px-2 py-1 text-lg rounded mr-2">
                                                                    {newPrice}{" "}
                                                                    كوبون
                                                                </div>
                                                            )}
                                                        </div>
                                                    )} */}

                                                <div className="flex items-center gap-4 text-3xl font-bold">
                                                    {pricing.price > 0 ? (
                                                        <data
                                                            className={`price text-blue-600 font-bold`}
                                                            value={
                                                                pricing.price
                                                            }
                                                        >
                                                            {pricing.price}
                                                            {namecurrency}
                                                            {/* {pricing.currency} */}
                                                        </data>
                                                    ) : (
                                                        <data
                                                            className={`price text-blue-600 font-bold`}
                                                            value={
                                                                pricing.price
                                                            }
                                                        >
                                                            مجاناً
                                                        </data>
                                                    )}

                                                    {pricing.originalPrice >
                                                        pricing.price && (
                                                        <span className="text-gray-500 line-through text-2xl">
                                                            {
                                                                pricing.originalPrice
                                                            }
                                                            {namecurrency}
                                                            {/* {pricing.currency} */}
                                                        </span>
                                                    )}

                                                    {pricing.discount > 0 && (
                                                        <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                                            خصم{" "}
                                                            {pricing.discount}
                                                            {namecurrency}
                                                            {/* {pricing.currency} */}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                {userData?.id &&
                                                    enrolledStatus ===
                                                        "success" && (
                                                        <button
                                                            className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/${App_User}/courses/${course?.id}`
                                                                );
                                                                // enrollCourseFree();
                                                            }}
                                                            title="أنت مشترك بالفعل"
                                                        >
                                                            أنت مشترك بالفعل
                                                        </button>
                                                    )}

                                                {userData?.id &&
                                                    enrolledStatus !==
                                                        "success" &&
                                                    pricing?.price ===
                                                        "0.00" && (
                                                        <button
                                                            className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                            onClick={() => {
                                                                // navigate(
                                                                //     `/${App_User}/courses/${course?.id}`
                                                                // );
                                                                enrollCourseFree();
                                                            }}
                                                            title="اشترك"
                                                        >
                                                            اشتراك الآن
                                                        </button>
                                                    )}

                                                {userData?.id &&
                                                    enrolledStatus !==
                                                        "success" &&
                                                    pricing.price > 0 && (
                                                        <div>
                                                            {/* <div className="">
                                                                {newPrice ===
                                                                    0 && (
                                                                    <form
                                                                        onSubmit={handleSubmit(
                                                                            handleCouponSearch
                                                                        )}
                                                                        className="space-y-6 flex items-stretch gap-2"
                                                                    >
                                                                        <label
                                                                            htmlFor="coupon"
                                                                            className="block text-2xl font-bold mb-2 text-black hidden"
                                                                        >
                                                                            الاٍسم
                                                                            الاول*
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="coupon"
                                                                            name="coupon"
                                                                            placeholder="مثال: CODE"
                                                                            className="text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0"
                                                                            {...register(
                                                                                "coupon",
                                                                                {
                                                                                    required: `هذا الحقل مطلوب.`,
                                                                                }
                                                                            )}
                                                                            autoComplete="off"
                                                                            disabled={
                                                                                isLoading
                                                                            }
                                                                            required
                                                                        />
                                                                        <button
                                                                            type="submit"
                                                                            disabled={
                                                                                isSubmitting ||
                                                                                isLoading
                                                                            }
                                                                            className="text-2xl px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all"
                                                                        >
                                                                            {isSubmitting ||
                                                                            isLoading
                                                                                ? "جاري التحقق..."
                                                                                : "تحقق"}
                                                                        </button>
                                                                    </form>
                                                                )}
                                                            </div> */}

                                                            <button
                                                                className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                                onClick={() => {
                                                                    // navigate(
                                                                    //     `/${App_User}/courses/${course?.id}`
                                                                    // );
                                                                    // enrollCourseFree();
                                                                    handleSubscribe(
                                                                        course?.id
                                                                        // ,price
                                                                    );
                                                                }}
                                                                title="اشترك"
                                                            >
                                                                انتقل للدفع
                                                            </button>
                                                        </div>
                                                    )}

                                                {!userData?.id && (
                                                    <button
                                                        className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                        onClick={() => {
                                                            navigate(`/login`);
                                                        }}
                                                        title="تسجيل الدخول"
                                                    >
                                                        تسجيل الدخول للاشتراك
                                                    </button>
                                                )}
                                            </div>

                                            {/* <button
                                                variant="outline"
                                                className="w-full py-6 text-lg mb-6 border-blue-700 text-blue-700 hover:bg-blue-700/5"
                                            >
                                                إضافة إلى المفضلة
                                            </button> */}

                                            {/* <div className="text-sm text-center text-muted-foreground mb-6">
                                                ضمان استرداد المال خلال 30 يومًا
                                            </div> */}

                                            {course?.table_contents?.length >
                                            0 ? (
                                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4 mb-4">
                                                    <h3 className="text-lg font-bold mb-4">
                                                        جدول المحتويات
                                                    </h3>

                                                    {course?.table_contents
                                                        ?.length > 0 ? (
                                                        <div className="space-y-2 flex flex-col gap-2">
                                                            {course?.table_contents?.map(
                                                                (
                                                                    file,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-300 shadow-sm"
                                                                    >
                                                                        <div className="flex items-center truncate max-w-[70%]">
                                                                            <File
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="ml-2 text-gray-500 flex-shrink-0"
                                                                            />
                                                                            <span
                                                                                className={`text-sm truncate text-blue-500`}
                                                                            >
                                                                                {
                                                                                    file.name
                                                                                }
                                                                            </span>
                                                                        </div>

                                                                        <div className="flex space-x-1 space-x-reverse flex-shrink-0">
                                                                            <button
                                                                                className={`p-1.5 text-gray-500 hover:text-blue-600 rounded`}
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    // e.stopPropagation();
                                                                                    // window.open(
                                                                                    //     file.url,
                                                                                    //     "_blank"
                                                                                    // );
                                                                                    handleDownloadFile(
                                                                                        file
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Download
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <></>
                                                        // <div className="flex items-center gap-4 ps-4 text-md text-gray-800 italic">
                                                        //     <Frown size={16} />
                                                        //     <span>
                                                        //         لا توجد ملفات
                                                        //         مرفقة
                                                        //     </span>
                                                        // </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <></>
                                            )}

                                            <div className="space-y-4 flex flex-col gap-4">
                                                <h4 className="text-black text-2xl font-bold mb-2">
                                                    تتضمن هذه الدورة:
                                                </h4>

                                                <ul className="space-y-3 flex flex-col gap-4 text-lg">
                                                    {course?.features &&
                                                        course?.features.map(
                                                            (
                                                                feature,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-center"
                                                                >
                                                                    <Check
                                                                        size={
                                                                            18
                                                                        }
                                                                        className={`text-blue-700 ml-2 flex-shrink-0`}
                                                                    />
                                                                    <span className=" text-lg">
                                                                        {
                                                                            feature
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-3/5 mb-8 lg:mb-0">
                                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                        <h2 className="text-black text-2xl font-bold mb-6">
                                            ما الذي ستتعلمه
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                            {course?.target_audience &&
                                                course?.target_audience.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center"
                                                        >
                                                            <BookOpenCheck
                                                                size={18}
                                                                className={`text-blue-700 ml-2 flex-shrink-0 mt-1`}
                                                            />
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                        <h2 className="text-black text-4xl font-bold mb-6">
                                            محتوى الدورة
                                        </h2>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-muted-foreground mb-4 text-2xl">
                                                <span>
                                                    {/* {course?.sections?.length ||
                                                        course?.chapters
                                                            ?.length ||
                                                        0}{" "} */}
                                                    {course?.total_section || 0}{" "}
                                                    أقسام
                                                </span>
                                                <span>
                                                    {/* {course?.lecturesCount ||
                                                        course?.lessonCount ||
                                                        course?.sections?.reduce(
                                                            (total, section) =>
                                                                total +
                                                                section?.items
                                                                    .length,
                                                            0
                                                        ) ||
                                                        0} */}
                                                    {course?.total_lesson || 0}{" "}
                                                    محاضرة
                                                </span>
                                                <span>
                                                    مدة الدورة:{" "}
                                                    {course?.duration}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-6 flex flex-col gap-6">
                                            {course?.sections ? (
                                                // New format: sections/items
                                                course?.sections.map(
                                                    (section, index) => (
                                                        <div
                                                            key={index}
                                                            className="shadow-md border border-gray-300 rounded-lg overflow-hidden"
                                                        >
                                                            <div className=" bg-muted p-4 flex justify-between items-center">
                                                                <h3 className="text-black font-medium text-3xl">
                                                                    {
                                                                        section?.title
                                                                    }
                                                                </h3>

                                                                <div className="text-muted-foreground text-lg">
                                                                    {
                                                                        section
                                                                            ?.lessons
                                                                            ?.length
                                                                    }{" "}
                                                                    دروس
                                                                </div>
                                                            </div>

                                                            <div className="divide-y">
                                                                {section?.lessons.map(
                                                                    (
                                                                        lesson,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={`p-4 flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                                                    lesson?.is_free
                                                                                        ? "bg-green-50"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={() =>
                                                                                    lesson?.is_free &&
                                                                                    toggleExpandItem(
                                                                                        section?.id,
                                                                                        lesson?.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    {lesson?.is_free ? (
                                                                                        <Coffee
                                                                                            size={
                                                                                                20
                                                                                            }
                                                                                            className={`text-blue-700 ml-2`}
                                                                                        />
                                                                                    ) : (
                                                                                        <Lock
                                                                                            size={
                                                                                                20
                                                                                            }
                                                                                            className="ml-2"
                                                                                        />
                                                                                    )}

                                                                                    <div>
                                                                                        <div className="flex gap-4">
                                                                                            <span className="text-black font-medium text-2xl truncate">
                                                                                                {
                                                                                                    lesson?.title
                                                                                                }
                                                                                            </span>

                                                                                            {lesson?.is_free && (
                                                                                                <span
                                                                                                    className={`mr-2 text-lg bg-blue-700/10 text-blue-700 px-2 py-0.5 rounded`}
                                                                                                >
                                                                                                    مجاني
                                                                                                </span>
                                                                                            )}
                                                                                        </div>

                                                                                        {lesson?.description && (
                                                                                            <p className="text-gray-500 text-lg mt-1 truncate">
                                                                                                {
                                                                                                    lesson?.description
                                                                                                }
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="text-muted-foreground">
                                                                                        {
                                                                                            lesson?.duration
                                                                                        }
                                                                                    </div>

                                                                                    {lesson?.is_free && (
                                                                                        <div
                                                                                            className={`text-blue-600`}
                                                                                        >
                                                                                            {expandedItems[
                                                                                                `${section?.id}-${lesson?.id}`
                                                                                            ] ? (
                                                                                                <ChevronUp
                                                                                                    size={
                                                                                                        18
                                                                                                    }
                                                                                                />
                                                                                            ) : (
                                                                                                <ChevronDown
                                                                                                    size={
                                                                                                        18
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                        </div>
                                                                                    )}

                                                                                    {!lesson?.is_free && (
                                                                                        <Lock
                                                                                            size={
                                                                                                16
                                                                                            }
                                                                                            className="text-gray-400"
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* //    Expanded content for free items  */}
                                                                            {lesson?.is_free &&
                                                                                expandedItems[
                                                                                    `${section?.id}-${lesson?.id}`
                                                                                ] && (
                                                                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                                                        {lesson?.type ===
                                                                                            "video" && (
                                                                                            <SimpleVideoPlayer
                                                                                                videoUrl={
                                                                                                    lesson?.video_url ||
                                                                                                    lesson?.video_file
                                                                                                }
                                                                                                title={
                                                                                                    lesson?.title
                                                                                                }
                                                                                            />
                                                                                        )}

                                                                                        {lesson?.type ===
                                                                                            "assessment" &&
                                                                                            lesson?.questions && (
                                                                                                <AssessmentQuiz
                                                                                                    questions={
                                                                                                        lesson?.questions
                                                                                                    }
                                                                                                    onComplete={(
                                                                                                        score
                                                                                                    ) =>
                                                                                                        console.log(
                                                                                                            `Quiz completed with score: ${score}`
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            )}

                                                                                        {/* {lesson?.uploaded_files &&
                                                                                            lesson
                                                                                                ?.uploaded_files
                                                                                                ?.length >
                                                                                                0 && (
                                                                                                <FilesList
                                                                                                    files={
                                                                                                        lesson?.files
                                                                                                    }
                                                                                                />
                                                                                            )} */}

                                                                                        {/*  */}
                                                                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                                                                                            <h3 className="text-lg font-bold mb-4">
                                                                                                الملفات
                                                                                                المرفقة
                                                                                            </h3>

                                                                                            {lesson.uploaded_files &&
                                                                                            lesson
                                                                                                .uploaded_files
                                                                                                .length >
                                                                                                0 ? (
                                                                                                <div className="space-y-2 flex flex-col gap-2">
                                                                                                    {lesson.uploaded_files.map(
                                                                                                        (
                                                                                                            file,
                                                                                                            index
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-300 shadow-sm"
                                                                                                            >
                                                                                                                <div className="flex items-center truncate max-w-[70%]">
                                                                                                                    <File
                                                                                                                        size={
                                                                                                                            16
                                                                                                                        }
                                                                                                                        className="ml-2 text-gray-500 flex-shrink-0"
                                                                                                                    />
                                                                                                                    <span
                                                                                                                        className={`text-sm truncate text-blue-500`}
                                                                                                                    >
                                                                                                                        {
                                                                                                                            file.name
                                                                                                                        }
                                                                                                                    </span>
                                                                                                                </div>

                                                                                                                <div className="flex space-x-1 space-x-reverse flex-shrink-0">
                                                                                                                    {/* {file.url && ( */}
                                                                                                                    <button
                                                                                                                        className={`p-1.5 text-gray-500 hover:text-blue-600 rounded`}
                                                                                                                        onClick={(
                                                                                                                            e
                                                                                                                        ) => {
                                                                                                                            // e.stopPropagation();
                                                                                                                            // window.open(
                                                                                                                            //     file.url,
                                                                                                                            //     "_blank"
                                                                                                                            // );
                                                                                                                            handleDownloadFile(
                                                                                                                                file
                                                                                                                            );
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Download
                                                                                                                            size={
                                                                                                                                16
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </button>
                                                                                                                    {/* )} */}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    )}
                                                                                                </div>
                                                                                            ) : (
                                                                                                !lesson.showFileUpload && (
                                                                                                    <div className="flex items-center gap-4 ps-4 text-md text-gray-800 italic">
                                                                                                        <Frown
                                                                                                            size={
                                                                                                                16
                                                                                                            }
                                                                                                        />
                                                                                                        <span>
                                                                                                            لا
                                                                                                            توجد
                                                                                                            ملفات
                                                                                                            مرفقة
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                // Old format: chapters/lessons
                                                //   course?.chapters?.map(
                                                //       (chapter) => (
                                                //           <div
                                                //               key={chapter.id}
                                                //               className="border border-gray-300 rounded-lg overflow-hidden"
                                                //           >
                                                //               <div className="bg-muted p-4 flex justify-between items-center">
                                                //                   <h3 className="font-medium">
                                                //                       {
                                                //                           chapter.title
                                                //                       }
                                                //                   </h3>
                                                //                   <div className="text-muted-foreground text-sm">
                                                //                       {
                                                //                           chapter
                                                //                               .lessons
                                                //                               .length
                                                //                       }{" "}
                                                //                       دروس
                                                //                   </div>
                                                //               </div>
                                                //               <div className="divide-y">
                                                //                   {chapter.lessons.map(
                                                //                       (
                                                //                           lesson,
                                                //                           index
                                                //                       ) => (
                                                //                           <div
                                                //                               key={
                                                //                                   index
                                                //                               }
                                                //                           >
                                                //                               <div
                                                //                                   className={`p-4 flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                //                                       lesson.free
                                                //                                           ? "bg-green-50"
                                                //                                           : ""
                                                //                                   }`}
                                                //                                   onClick={() =>
                                                //                                       lesson.free &&
                                                //                                       toggleExpandItem(
                                                //                                           chapter.id,
                                                //                                           lesson.id ||
                                                //                                               index
                                                //                                       )
                                                //                                   }
                                                //                               >
                                                //                                   <div className="flex items-center">
                                                //                                       {lesson.free ? (
                                                //                                           <Coffee
                                                //                                               size={
                                                //                                                   20
                                                //                                               }
                                                //                                               className="text-blue-700 ml-2"
                                                //                                           />
                                                //                                       ) : (
                                                //                                           <Lock
                                                //                                               size={
                                                //                                                   20
                                                //                                               }
                                                //                                               className="ml-2"
                                                //                                           />
                                                //                                       )}
                                                //                                       <div>
                                                //                                           <span className="font-medium">
                                                //                                               {
                                                //                                                   lesson.title
                                                //                                               }
                                                //                                           </span>
                                                //                                       </div>
                                                //                                       {lesson.free && (
                                                //                                           <span className="mr-2 text-xs bg-blue-700/10 text-blue-700 px-2 py-0.5 rounded">
                                                //                                               مجاني
                                                //                                           </span>
                                                //                                       )}
                                                //                                   </div>
                                                //                                   <div className="flex items-center gap-3">
                                                //                                       <div className="text-muted-foreground">
                                                //                                           {
                                                //                                               lesson.duration
                                                //                                           }
                                                //                                       </div>

                                                //                                       {lesson.free && (
                                                //                                           <div className="text-blue-600">
                                                //                                               {expandedItems[
                                                //                                                   `${
                                                //                                                       chapter.id
                                                //                                                   }-${
                                                //                                                       lesson.id ||
                                                //                                                       index
                                                //                                                   }`
                                                //                                               ] ? (
                                                //                                                   <ChevronUp
                                                //                                                       size={
                                                //                                                           18
                                                //                                                       }
                                                //                                                   />
                                                //                                               ) : (
                                                //                                                   <ChevronDown
                                                //                                                       size={
                                                //                                                           18
                                                //                                                       }
                                                //                                                   />
                                                //                                               )}
                                                //                                           </div>
                                                //                                       )}

                                                //                                       {!lesson.free && (
                                                //                                           <Lock
                                                //                                               size={
                                                //                                                   16
                                                //                                               }
                                                //                                               className="text-gray-400"
                                                //                                           />
                                                //                                       )}
                                                //                                   </div>
                                                //                               </div>

                                                //                               {/* Lesson content when expanded */}
                                                //                               {lesson.free &&
                                                //                                   expandedItems[
                                                //                                       `${
                                                //                                           chapter.id
                                                //                                       }-${
                                                //                                           lesson.id ||
                                                //                                           index
                                                //                                       }`
                                                //                                   ] && (
                                                //                                       <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                //                                           <SimpleVideoPlayer
                                                //                                               videoUrl={
                                                //                                                   lesson.videoUrl ||
                                                //                                                   "https://youtu.be/example"
                                                //                                               }
                                                //                                               title={
                                                //                                                   lesson.title
                                                //                                               }
                                                //                                           />
                                                //                                       </div>
                                                //                                   )}
                                                //                           </div>
                                                //                       )
                                                //                   )}
                                                //               </div>
                                                //           </div>
                                                //       )
                                                //   )
                                                <></>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                        <h2 className="text-2xl font-bold mb-6">
                                            المتطلبات الأساسية
                                        </h2>

                                        {course?.requirements &&
                                        course?.requirements.length > 0 ? (
                                            <ul className="space-y-3 flex flex-col gap-4 text-lg">
                                                {course?.requirements.map(
                                                    (req, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center"
                                                        >
                                                            <SquarePlus
                                                                size={18}
                                                                className={`text-blue-700 ml-2 flex-shrink-0 mt-1`}
                                                            />
                                                            <span>{req}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">
                                                لا توجد متطلبات محددة لهذه
                                                الدورة.
                                            </p>
                                        )}
                                    </div>

                                    {/* Target Audience Section (if available) */}
                                    {course?.targetAudience &&
                                        course?.targetAudience.length > 0 && (
                                            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                                <h2 className="text-2xl font-bold mb-6">
                                                    هذه الدورة مناسبة لـ
                                                </h2>

                                                <ul className="space-y-3 flex flex-col gap-4 text-lg">
                                                    {course?.targetAudience.map(
                                                        (audience, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center"
                                                            >
                                                                <BadgePlus
                                                                    size={18}
                                                                    className={`text-blue-700 ml-2 flex-shrink-0 mt-1`}
                                                                />
                                                                <span>
                                                                    {audience}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    <div className="bg-white rounded-lg shadow-sm p-8">
                                        <h2 className="text-3xl font-bold mb-6">
                                            المدرب
                                        </h2>

                                        {course?.user ? (
                                            <div className="flex items-start">
                                                <img
                                                    src={
                                                        // course?.instructor
                                                        //     .image ||
                                                        userimage ||
                                                        "https://randomuser.me/api/portraits/men/32.jpg"
                                                    }
                                                    alt={
                                                        course?.user?.full_name
                                                    }
                                                    onError={(e) => {
                                                        e.target.src =
                                                            userimage;
                                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                    }}
                                                    className="w-20 h-20 rounded-full object-cover ml-4"
                                                />

                                                <div className="text-lg">
                                                    <h3 className="font-bold text-lg">
                                                        {/* {
                                                            course?.user
                                                                ?.full_name
                                                        } */}
                                                        مدرب الأكاديمية
                                                    </h3>
                                                    <p className="text-2xl text-muted-foreground mb-4">
                                                        {course?.user
                                                            ?.first_name +
                                                            " " +
                                                            course?.user
                                                                ?.last_name}
                                                    </p>
                                                    <p>
                                                        {/* {course?.instructor.bio} */}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-start">
                                                <img
                                                    src={
                                                        course?.user?.image ||
                                                        userimage ||
                                                        `https://randomuser.me/api/portraits/men/32.jpg`
                                                    }
                                                    alt="المدرب"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            userimage;
                                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                    }}
                                                    className="w-20 h-20 rounded-full object-cover ml-4"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-lg">
                                                        مدرب الأكاديمية
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4">
                                                        مدرب محترف
                                                    </p>
                                                    <p>
                                                        مدرب متخصص في مجال
                                                        التعليم بخبرة واسعة في
                                                        تقديم المحتوى التعليمي
                                                        بأسلوب مبسط وسهل.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="lg:w-2/5 lg:pr-10">
                                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                        <h3 className="text-black text-2xl font-bold mb-4">
                                            لماذا هذه الدورة؟
                                        </h3>

                                        <ul className="space-y-4 flex flex-col gap-4 text-lg">
                                            <li className="flex">
                                                <div
                                                    className={`ml-3 text-blue-700`}
                                                >
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">
                                                        محتوى شامل وعملي
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        تعلم من خلال أمثلة
                                                        واقعية ومشاريع تطبيقية
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex">
                                                <div
                                                    className={`ml-3 text-blue-700`}
                                                >
                                                    <RefreshCw size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">
                                                        محتوى محدث باستمرار
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        نقوم بتحديث المحتوى
                                                        دوريًا ليواكب أحدث
                                                        التقنيات
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex">
                                                <div
                                                    className={`ml-3 text-blue-700`}
                                                >
                                                    <ThumbsUp size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">
                                                        دعم مستمر
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        فريق دعم متخصص للإجابة
                                                        على استفساراتك وحل
                                                        المشكلات
                                                    </p>
                                                </div>
                                            </li>

                                            <li className="flex">
                                                <div
                                                    className={`ml-3 text-blue-700`}
                                                >
                                                    <Award size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">
                                                        شهادة معتمدة
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        احصل على شهادة إتمام
                                                        معتمدة بعد إكمال الدورة
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-6 hidden">
                                        <h3 className="text-xl font-bold mb-6">
                                            شارك هذه الدورة
                                        </h3>

                                        <div className="flex space-x-4 space-x-reverse gap-4">
                                            <button
                                                onClick={shareOnFacebook}
                                                className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-90 transition-opacity"
                                                aria-label="مشاركة على فيسبوك"
                                            >
                                                <Facebook size={18} />
                                            </button>

                                            <button
                                                onClick={shareOnTwitter}
                                                className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-90 transition-opacity"
                                                aria-label="مشاركة على تويتر"
                                            >
                                                <Twitter size={18} />
                                            </button>

                                            <button
                                                onClick={shareOnLinkedIn}
                                                className="p-2 bg-[#0077b5] text-white rounded-full hover:opacity-90 transition-opacity"
                                                aria-label="مشاركة على لينكد إن"
                                            >
                                                <Linkedin size={18} />
                                            </button>

                                            <button
                                                onClick={shareOnWhatsApp}
                                                className="p-2 bg-[#25D366] text-white rounded-full hover:opacity-90 transition-opacity"
                                                aria-label="مشاركة على واتساب"
                                            >
                                                <MessageCircle size={18} />
                                            </button>
                                        </div>

                                        {/* <div className="flex space-x-4 space-x-reverse gap-4">
                                            <a
                                                // href="#"
                                                onClick={() =>
                                                    shareOnFacebook()
                                                }
                                                className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-90"
                                            >
                                                
                                                <Facebook size={18} />
                                            </a>

                                            <a
                                                href="#"
                                                className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-90"
                                            >
                                               
                                                <Twitter size={18} />
                                            </a>

                                            <a
                                                href="#"
                                                className="p-2 bg-[#0077b5] text-white rounded-full hover:opacity-90"
                                            >
                                               
                                                <Linkedin size={18} />
                                            </a>

                                            <a
                                                href="#"
                                                className="p-2 bg-[#25D366] text-white rounded-full hover:opacity-90"
                                            >
                                               <MessageCircle  size={18} />
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CourseDetails;
