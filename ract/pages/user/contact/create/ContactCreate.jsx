/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Mail,
    MessageSquare,
} from "lucide-react";

// API
import { userCreateContactMessage } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User } from "../../../../utils/constants";

function ContactCreate() {
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [quickReply, setQuickReply] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleContactSubmit = async (formData) => {
        try {
            setIsLoading(true);

            // const contactData = {
            //     full_name: formData.full_name,
            //     email: formData.email,
            //     phone_number: formData.phone_number,
            //     titleofmessage: formData.titleofmessage,
            //     message: formData.description,
            //     quick_reply: quickReply,
            //     is_visible: isVisible,
            //     user: userData?.id || null,
            // };

            const contactData = new FormData();
            contactData.append("full_name", formData.full_name);
            contactData.append("email", formData.email || null);
            contactData.append("phone_number", formData.phone_number || "");
            contactData.append(
                "titleofmessage",
                formData.titleofmessage || null
            );
            contactData.append("message", formData.message || null);
            contactData.append("quick_reply", quickReply);

            contactData.append("is_visible", isVisible);
            contactData.append("user", userData?.id || 1);

            const { data, error } = await userCreateContactMessage(contactData);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.message) {
                    setErrorsMessage(error.message);
                    Toast("error", error.message);
                } else if (error.email) {
                    setErrorsMessage(error.email[0]);
                    Toast("error", error.email[0]);
                }
            } else {
                Toast("success", "تم إرسال الرسالة بنجاح");
                navigate(`/${App_User}/contact`);
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            Toast("error", "حدث خطأ أثناء إرسال الرسالة");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="">
                <div className="flex items-center justify-start mb-6">
                    <button
                        onClick={() => navigate(`/${App_User}/contact`)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <h1 className="text-3xl font-bold mr-2 text-black">
                        تواصل معنا
                    </h1>
                </div>

                <div className="card p-6 my-8">
                    <h2 className="text-2xl font-bold mr-2 mb-8 text-black">
                        تواصل مع فريقنا
                    </h2>

                    <form
                        onSubmit={handleSubmit(handleContactSubmit)}
                        className="space-y-6 flex flex-col gap-8"
                    >
                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                الاسم الكامل*
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                placeholder="مثال: محمد أحمد"
                                className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("full_name", {
                                    required: "هذا الحقل مطلوب.",
                                    value: userData?.full_name || "",
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.full_name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                البريد الإلكتروني*
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="مثال: mazen@gmail.com"
                                className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("email", {
                                    required: "هذا الحقل مطلوب.",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message:
                                            "الرجاء تقديم عنوان بريد إلكتروني صالح.",
                                    },
                                    value: userData?.email || "",
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label
                                htmlFor="phone_number"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                رقم الهاتف (اختياري)
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                placeholder="مثال: 0512345678"
                                className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("phone_number", {
                                    pattern: {
                                        value: /^(05)(5|0|3|6|4|9|1|8|7|2)([0-9]{7})$/,
                                        message:
                                            "يجب أن يبدأ رقم الهاتف بـ 05 ويحتوي على 10 أرقام صحيحة",
                                    },
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            {errors.phone_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone_number.message}
                                </p>
                            )}
                        </div>

                        {/* Message Title */}
                        <div>
                            <label
                                htmlFor="titleofmessage"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                عنوان الرسالة*
                            </label>
                            <input
                                type="text"
                                id="titleofmessage"
                                name="titleofmessage"
                                placeholder="مثال: مشكلة في عملية الدفع"
                                className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("titleofmessage", {
                                    required: "هذا الحقل مطلوب.",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "يجب أن يحتوي عنوان الرسالة على أكثر من 5 حروف.",
                                    },
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />
                            {errors.titleofmessage && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.titleofmessage.message}
                                </p>
                            )}
                        </div>

                        {/* Message Content */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-bold text-black mb-1"
                            >
                                الرسالة*
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="مثال: لدي مشكلة في عملية الدفع الخاصة بالدورات"
                                className={`text-black w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none`}
                                {...register("message", {
                                    required: "هذا الحقل مطلوب.",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "يجب أن تحتوي الرسالة على الأقل 10 حرف",
                                    },
                                })}
                                autoComplete="off"
                                required
                            />
                            {errors?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors?.message.message}
                                </p>
                            )}
                        </div>

                        {/* Quick Reply and Visibility Toggles */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => setQuickReply(!quickReply)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                                    quickReply
                                        ? `bg-blue-100 text-blue-800`
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {quickReply ? (
                                    <Check
                                        size={16}
                                        className={`text-blue-600`}
                                    />
                                ) : (
                                    <MessageSquare
                                        size={16}
                                        className="text-gray-600"
                                    />
                                )}
                                الرد السريع
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                                    isVisible
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {isVisible ? (
                                    <Eye size={16} className="text-blue-600" />
                                ) : (
                                    <EyeOff
                                        size={16}
                                        className="text-gray-600"
                                    />
                                )}
                                {/* {console.log(`isVisible`,isVisible)} */}
                                {isVisible ? "ظاهر" : "مخفي"}
                            </button>
                        </div>

                        {/* Form actions */}
                        <div className="flex justify-end gap-4 space-x-4 space-x-reverse pt-4 my-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate(`/${App_User}/home`)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                إلغاء
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all`}
                            >
                                {isSubmitting || isLoading
                                    ? "جاري الإرسال..."
                                    : "إرسال"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ContactCreate;
