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
import {
    FaBookOpen,
    FaCalendarAlt,
    FaFilePdf,
    FaFileWord,
    FaSyncAlt,
} from "react-icons/fa";

// api
import {
    appGetBookById,
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
    phonenumber,
} from "../../../../utils/constants";
import { formatDateAR } from "../../../../utils/helpers";

// components

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

function BookDetails() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();

    const [book, setBook] = useState(null);
    const [enrolledStatus, setEnrolledStatus] = useState([]);
    const [newPrice, setNewPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetBookById(bookId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/books`);
                } else {
                    // Set form values
                    setBook(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/books`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [bookId, navigate]);

    // const handleCheckout = () => {
    //     // إنشاء نص الرسالة مع تفاصيل المنتجات
    //     const message = `أريد شراء الدورة التالية:
    //         \n${course?.id}) ${course?.title}
    //         \nالسعر: ${course?.price_after_discount} ${namecurrency}
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

    // console.log(`book`, book);

    return (
        <>
            <section className="section min-h-screen bg-gray-50">
                <div className="container mx-auto py-20">
                    <div className="p-8 text-center border-b border-gray-200">
                        <div className="flex items-center flex-col gap-4">
                            <img
                                src={book?.instructor?.image || userimage}
                                alt={book?.user?.full_name}
                                onError={(e) => {
                                    e.target.src = userimage;
                                    e.target.onerror = null;
                                }}
                                className="w-40 h-40 rounded-full object-cover ml-2"
                            />

                            <div className="flex items-center justify-start gap-4 text-4xl font-bold text-black">
                                <span>
                                    {book?.user?.first_name +
                                        " " +
                                        book?.user?.last_name}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex">
                        <div className="md:w-1/3 p-6 flex justify-center">
                            <img
                                src={book?.image_url || book?.image || noimage}
                                alt={`غلاف كتاب ${book.title}`}
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null;
                                }}
                                className="rounded-lg shadow-lg  object-fill w-full max-h-96"
                            />
                        </div>

                        <div className="md:w-2/3 p-6">
                            <div className="mb-8">
                                <h2 className="text-5xl font-semibold text-black mb-4 inline-block">
                                    {book?.title}
                                </h2>

                                <p className="text-gray-900 text-3xl leading-relaxed">
                                    {book?.description}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                <div className="flex items-center gap-2 mb-3 text-black text-2xl">
                                    <FaCalendarAlt size={20} />
                                    <span>تاريخ النشر: </span>
                                    <span className="">
                                        {formatDateAR(book?.created_at)}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4   inline-block">
                                    تحميل الكتاب
                                </h2>

                                <div className="flex flex-wrap gap-4 text-lg">
                                    {book?.file_pdf && (
                                        <a
                                            href={book?.file_pdf}
                                            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
                                            target="_blank"
                                            // rel="noopener noreferrer"
                                            download={true}
                                        >
                                            <FaFilePdf className="ml-2" />
                                            <span>تحميل PDF</span>
                                        </a>
                                    )}
                                    {book?.file_pdf_url && (
                                        <a
                                            href={book?.file_pdf_url}
                                            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={true}
                                        >
                                            <FaFilePdf className="ml-2" />
                                            <span>تحميل رابط PDF</span>
                                        </a>
                                    )}

                                    {book?.file_word && (
                                        <a
                                            href={book?.file_word}
                                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={true}
                                        >
                                            <FaFileWord className="ml-2" />
                                            <span>تحميل Word</span>
                                        </a>
                                    )}
                                    {book?.file_word_url && (
                                        <a
                                            href={book?.file_word_url}
                                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={true}
                                        >
                                            <FaFileWord className="ml-2" />
                                            <span>تحميل Word</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BookDetails;
