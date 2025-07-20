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
    User,
} from "lucide-react";

// api
import {
    appGetPowerpointById,
    appPostCourseCreateCheckout,
    appGetCourseFetchEnrollStatus,
    appPostStudentEnrollCourse,
    appGetCoursePaymentResult,
    appPostCouponCourseSearchApp,
    appPostStudentEnrollPowerpoint,
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

function PowerpointDetails() {
    const { powerpointId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();
    // console.log(`userData`, userData);

    const [powerpoint, setPowerpoint] = useState(null);
    const [enrolledStatus, setEnrolledStatus] = useState([]);
    const [newPrice, setNewPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const fetchPowerpoint = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetPowerpointById(
                    powerpointId
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/powerpoints`);
                } else {
                    // Set form values
                    setPowerpoint(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/powerpoints`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPowerpoint();
    }, [powerpointId, navigate]);

    //
    const enrollPowerpointFree = async () => {
        try {
            setIsLoading(true);

            const _formData = new FormData();
            _formData.append("student", userData?.id);
            _formData.append("powerpoint", powerpointId);
            _formData.append("price", powerpoint?.price_after_discount);

            const { data, error } = await appPostStudentEnrollPowerpoint(
                _formData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast(
                    "error",
                    error.message || "حدث خطأ أثناء الاشتراك في البوربوينت"
                );
            } else {
                // console.log();
                Toast("success", "تم الاشتراك في البوربوينت بنجاح");
                navigate(`/${App_User}/powerpoints`);
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
    // const handleCheckout = () => {
    //     // إنشاء نص الرسالة مع تفاصيل المنتجات
    //     const message = `أريد شراء الدورة التالية:
    //         \n${powerpoint?.id}) ${powerpoint?.title}
    //         \nالسعر: ${powerpoint?.price_after_discount} ${namecurrency}
    //         \nشكراً!
    //     `;
    //     // `أريد شراء المنتجات التالية:\n\n${cartItems
    //     //     ?.map(
    //     //         (item) =>
    //     //             `- (${item?.id}) ${item?.name}  (الكمية: ${item?.quantity}) - السعر: ${item?.price} ${currency}\n`
    //     //     )
    //     //     .join("")}\nالمجموع الكلي: ${totalPrice.toFixed(2)} ${currency}`;

    //     // ترميز الرسالة لاستخدامها في رابط واتساب
    //     const encodedMessage = encodeURIComponent(message);

    //     // إنشاء رابط واتساب
    //     const whatsappUrl = `https://wa.me/+2${phonenumber}?text=${encodedMessage}`;

    //     // فتح الرابط في نافذة جديدة
    //     window.open(whatsappUrl, "_blank");
    // };

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

    // console.log(`powerpoint`, powerpoint);

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
                                            {powerpoint?.section?.title}
                                        </span> */}

                                        {powerpoint?.tag && (
                                            <span className="bg-amber-500 text-white text-lg px-2 py-2 rounded">
                                                {powerpoint?.tag}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-10">
                                        <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-black mb-6">
                                            {powerpoint?.title}
                                        </h1>

                                        {powerpoint?.description && (
                                            <p className="text-3xl text-black/90  mb-6">
                                                {powerpoint?.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center text-black/90 mb-6 text-lg">
                                        <div className="flex items-center flex-wrap gap-8 ml-6 mb-2 text-3xl">
                                            <div className="flex items-center gap-2">
                                                <User
                                                    size={18}
                                                    className="ml-1"
                                                />
                                                {
                                                    powerpoint?.total_enrolled_students
                                                }
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CalendarPlus2
                                                    size={18}
                                                    className="ml-1"
                                                />
                                                {formatDateAR(
                                                    powerpoint?.created_at
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
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
                                                // powerpoint?.instructor?.image ||
                                                userimage
                                            }
                                            alt={powerpoint?.user?.full_name}
                                            onError={(e) => {
                                                e.target.src = userimage;
                                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                            }}
                                            className="w-40 h-40 rounded-full object-cover ml-2"
                                        />

                                        <div className="flex items-center justify-start gap-4 text-4xl font-bold text-black">
                                            {/* <span>بواسطة</span> */}

                                            <span>
                                                {powerpoint?.user?.first_name +
                                                    " " +
                                                    powerpoint?.user?.last_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-2/5 lg:pr-10">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={
                                                    powerpoint?.image_url ||
                                                    powerpoint?.image ||
                                                    noimage
                                                }
                                                alt={powerpoint?.title}
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
                                                        {powerpoint?.price_after_discount -
                                                            newPrice}{" "}
                                                        ر.س
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`text-3xl font-bold text-blue-700`}
                                                    >
                                                        {
                                                            powerpoint?.price_after_discount
                                                        }{" "}
                                                        ر.س
                                                    </div>
                                                )}

                                                {powerpoint?.discount &&
                                                    powerpoint?.discount >
                                                        0 && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-2xl text-muted-foreground line-through mr-2">
                                                                {
                                                                    powerpoint?.price
                                                                }{" "}
                                                                ر.س
                                                            </div>

                                                            <div className="bg-red-100 text-red-600 px-2 py-1 text-lg rounded mr-2">
                                                                {
                                                                    powerpoint?.discount
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
                                                {userData?.id &&
                                                    enrolledStatus ===
                                                        "success" && (
                                                        <button
                                                            className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/${App_User}/courses/${powerpoint?.id}`
                                                                );
                                                                // enrollPowerpointFree();
                                                            }}
                                                            title="أنت مشترك بالفعل"
                                                        >
                                                            أنت مشترك بالفعل
                                                        </button>
                                                    )}

                                                {userData?.id &&
                                                    enrolledStatus !==
                                                        "success" &&
                                                    powerpoint?.price_after_discount ===
                                                        0 && (
                                                        <button
                                                            className={` w-full py-6 text-3xl my-4 text-white bg-blue-700 hover:bg-blue-700-dark `}
                                                            onClick={() => {
                                                                // navigate(
                                                                //     `/${App_User}/courses/${powerpoint?.id}`
                                                                // );
                                                                enrollPowerpointFree();
                                                            }}
                                                            title="اشترك"
                                                        >
                                                            اشتراك الآن
                                                        </button>
                                                    )}

                                                {userData?.id &&
                                                    enrolledStatus !==
                                                        "success" &&
                                                    powerpoint?.price_after_discount >
                                                        0 && (
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
                                                                    //     `/${App_User}/courses/${powerpoint?.id}`
                                                                    // );
                                                                    // enrollPowerpointFree();
                                                                    // handleSubscribe(
                                                                    //     powerpoint?.id
                                                                    //     // ,price
                                                                    // );
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

                                            {/* <div className="space-y-4 flex flex-col gap-4">
                                                <h4 className="text-black text-2xl font-bold mb-2">
                                                    تتضمن هذه الدورة:
                                                </h4>

                                                <ul className="space-y-3 flex flex-col gap-4 text-lg">
                                                    {powerpoint?.features &&
                                                        powerpoint?.features.map(
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
                                                                        className="text-blue-700 ml-2 flex-shrink-0"
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

export default PowerpointDetails;
