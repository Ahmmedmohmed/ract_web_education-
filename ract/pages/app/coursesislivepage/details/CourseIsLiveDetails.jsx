/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
    CalendarPlus2,
    CalendarX,
    AlarmClockCheck,
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
    phonenumber,
} from "../../../../utils/constants";
import { formatDateAR } from "../../../../utils/helpers";

// components
import VideoPlayer from "../../../user/coursedetails/videoplayer/VideoPlayer";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

function CourseIsLiveDetails() {
    const { coursesisliveId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();
    // console.log(`userData`, userData);

    const [course, setCourse] = useState(null);
    const [enrolledStatus, setEnrolledStatus] = useState([]);
    const [newPrice, setNewPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetCourseAllById(
                    coursesisliveId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/coursesislive`);
                } else {
                    // Set form values
                    setCourse(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/coursesislive`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [coursesisliveId, navigate]);

    const handleCheckout = () => {
        // إنشاء نص الرسالة مع تفاصيل المنتجات
        const message = `أريد شراء الدورة التالية:
            \n${course?.id}) ${course?.title} 
            \nالسعر: ${course?.price_after_discount} ${namecurrency} 
            \nشكراً!
        `;
        // `أريد شراء المنتجات التالية:\n\n${cartItems
        //     ?.map(
        //         (item) =>
        //             `- (${item?.id}) ${item?.name}  (الكمية: ${item?.quantity}) - السعر: ${item?.price} ${currency}\n`
        //     )
        //     .join("")}\nالمجموع الكلي: ${totalPrice.toFixed(2)} ${currency}`;

        // ترميز الرسالة لاستخدامها في رابط واتساب
        const encodedMessage = encodeURIComponent(message);

        // إنشاء رابط واتساب
        const whatsappUrl = `https://wa.me/+2${phonenumber}?text=${encodedMessage}`;

        // فتح الرابط في نافذة جديدة
        window.open(whatsappUrl, "_blank");
    };

    // //
    // const handleCouponSearch = async (formData) => {
    //     try {
    //         setIsLoading(true);

    //         // const couponSearch = new FormData();
    //         // couponSearch.append("coupon", formData.coupon);

    //         // console.log(`formData`, formData.coupon);

    //         const { data, error } = await appPostCouponCourseSearchApp(
    //             formData.coupon
    //         );
    //         // couponSearch

    //         // for (let [key, value] of couponSearch.entries()) {
    //         //     console.log(`-->`, key, value);
    //         //     console.log(`---------------`);
    //         // }

    //         console.log(`error`, error);
    //         console.log(`data`, data);

    //         if (error) {
    //             // if (error.message) {
    //             //     Toast("error", error.message);
    //             // } else if (error.email) {
    //             //     Toast("error", error.email[0]);
    //             // }
    //             Toast("error", "حدث خطأ أثناء البحث عن الكوبون");
    //         } else {
    //             if (data?.length > 0) {
    //                 setNewPrice(data[0].discount);
    //                 Toast("success", "تم التحقق من الكوبون بنجاح");
    //             }
    //         }
    //     } catch (error) {
    //         console.log("Error submitting contact form:", error);
    //         Toast("error", "حدث خطأ أثناء إرسال الرسالة");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // console.log(`course`, course);

    return (
        <>
            <section className="section min-h-screen bg-gray-50">
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

                                    <div className="mb-10">
                                        <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-black mb-6">
                                            {course?.title}
                                        </h1>

                                        {course?.description && (
                                            <p className="text-3xl text-black/90  mb-6">
                                                {course?.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center text-black/90 mb-6 text-lg">
                                        <div className="flex items-center flex-wrap gap-8 ml-6 mb-2 text-3xl">
                                            <div className="flex items-center gap-2">
                                                <CalendarPlus2
                                                    size={16}
                                                    className="ml-1"
                                                />
                                                <span>بداء</span>
                                                {formatDateAR(
                                                    course?.start_data
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CalendarX
                                                    size={16}
                                                    className="ml-1"
                                                />
                                                <span>انتهاء</span>

                                                {formatDateAR(course?.end_data)}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <AlarmClockCheck
                                                    size={16}
                                                    className="ml-1"
                                                />
                                                {course?.time_at}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Star
                                                    size={18}
                                                    className="fill-amber-500 text-amber-500 ml-1"
                                                />
                                                <Star
                                                    size={18}
                                                    className="fill-amber-500 text-amber-500 ml-1"
                                                />
                                                <Star
                                                    size={18}
                                                    className="fill-amber-500 text-amber-500 ml-1"
                                                />
                                                <Star
                                                    size={18}
                                                    className="fill-amber-500 text-amber-500 ml-1"
                                                />
                                                <Star
                                                    size={18}
                                                    className="fill-amber-500 text-amber-500 ml-1"
                                                />

                                                <span className="mr-1 text-black/70">
                                                    ( 5.0 تقييم)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-lg">
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
                                            className="w-40 h-40 rounded-full object-cover ml-2"
                                        />

                                        <div className="flex items-center justify-start gap-4 text-4xl font-bold text-black">
                                            {/* <span>بواسطة</span> */}

                                            <span>
                                                {course?.user?.first_name +
                                                    " " +
                                                    course?.user?.last_name}
                                            </span>
                                        </div>
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
                                                {newPrice > 0 ? (
                                                    <div
                                                        className={`text-3xl font-bold text-blue-700`}
                                                    >
                                                        {course?.price_after_discount -
                                                            newPrice}{" "}
                                                        {namecurrency}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`text-3xl font-bold text-blue-700`}
                                                    >
                                                        {
                                                            course?.price_after_discount
                                                        }{" "}
                                                        {namecurrency}
                                                    </div>
                                                )}

                                                {course?.discount &&
                                                    course?.discount > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-2xl text-muted-foreground line-through mr-2">
                                                                {course?.price}{" "}
                                                                {namecurrency}
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
                                                    )}
                                            </div>

                                            <div>
                                                <button
                                                    className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                    onClick={() => {
                                                        // navigate(`/login`);
                                                        handleCheckout();
                                                    }}
                                                    title="أنتقل للاشتراك"
                                                >
                                                    انتقل للاشتراك
                                                </button>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}

export default CourseIsLiveDetails;
