/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Mail,
    MessageSquare,
    Trash2,
} from "lucide-react";

// API
import {
    userGetContactMessageById,
    userUpdateContactMessage,
    userDeleteContactMessage,
} from "../../../../api/user/authUser";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function ContactUpdate() {
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [messageData, setMessageData] = useState(null);
    const [quickReply, setQuickReply] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Fetch message data
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data, error } = await userGetContactMessageById(
                    contactId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_User}/contact`);
                } else {
                    setMessageData(data);
                    setQuickReply(data.quick_reply);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("full_name", data.full_name);
                    setValue("email", data.email);
                    setValue("phone_number", data.phone_number);
                    setValue("titleofmessage", data.titleofmessage);
                    setValue("message", data.message);
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_User}/contact`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessage();
    }, [contactId, navigate, setValue]);

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = {
                ...formData,
                quick_reply: quickReply,
                is_visible: isVisible,
                status: messageData.status, // Preserve the existing status
            };

            const { data, error } = await userUpdateContactMessage(
                contactId,
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث الرسالة بنجاح");
                navigate(`/${App_User}/contact`);
            }
        } catch (error) {
            console.error("Error updating message:", error);
            Toast("error", "حدث خطأ أثناء التحديث");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await userDeleteContactMessage(contactId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف الرسالة بنجاح");
                navigate(`/${App_User}/contact`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const changeStatus = async (newStatus) => {
        try {
            setIsLoading(true);
            const { error } = await userUpdateContactMessage(contactId, {
                status: newStatus,
            });

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تغيير الحالة");
            } else {
                Toast("success", "تم تحديث حالة الرسالة بنجاح");
                setMessageData((prev) => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Error changing status:", error);
            Toast("error", "حدث خطأ أثناء تغيير الحالة");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !messageData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!messageData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(`/${App_User}/contact`)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <h1 className="text-3xl font-bold mr-2 text-black">
                        تعديل الرسالة
                    </h1>
                </div>

                <div className="flex gap-2 hidden">
                    <button
                        onClick={() => changeStatus("reply")}
                        className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                            messageData.status === "reply"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        <Check size={16} />
                        تم الرد
                    </button>
                    <button
                        onClick={() => changeStatus("under-processing")}
                        className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                            messageData.status === "under-processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        <MessageSquare size={16} />
                        قيد المعالجة
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <form
                    onSubmit={handleSubmit(handleUpdate)}
                    className="space-y-6 flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">
                                الاسم الكامل*
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("full_name", {
                                    required: "هذا الحقل مطلوب",
                                })}
                                disabled={isLoading}
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.full_name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">
                                البريد الإلكتروني*
                            </label>
                            <input
                                type="email"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("email", {
                                    required: "هذا الحقل مطلوب",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "بريد إلكتروني غير صحيح",
                                    },
                                })}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("phone_number", {
                                    pattern: {
                                        value: /^(05)(5|0|3|6|4|9|1|8|7|2)([0-9]{7})$/,
                                        message:
                                            "يجب أن يبدأ بـ 05 ويتكون من 10 أرقام",
                                    },
                                })}
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
                            <label className="block text-sm font-bold mb-2 text-black">
                                عنوان الرسالة*
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 `}
                                {...register("titleofmessage", {
                                    required: "هذا الحقل مطلوب",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "يجب أن يكون العنوان 5 أحرف على الأقل",
                                    },
                                })}
                                disabled={isLoading}
                            />
                            {errors.titleofmessage && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.titleofmessage.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Message Content */}
                    <div>
                        <label className="block text-sm font-bold mb-2 text-black">
                            محتوى الرسالة*
                        </label>
                        <textarea
                            rows={6}
                            className={`w-full min-h-40 resize-none p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 `}
                            {...register("message", {
                                required: "هذا الحقل مطلوب",
                                minLength: {
                                    value: 10,
                                    message:
                                        "يجب أن تحتوي الرسالة على 10 حرف على الأقل",
                                },
                            })}
                            disabled={isLoading}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={() => setQuickReply(!quickReply)}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                quickReply
                                    ? `bg-blue-100 text-blue-800`
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {quickReply ? (
                                <Check size={16} />
                            ) : (
                                <MessageSquare size={16} />
                            )}
                            الرد السريع
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                isVisible
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {isVisible ? (
                                <Eye size={16} />
                            ) : (
                                <EyeOff size={16} />
                            )}
                            {isVisible ? "ظاهر" : "مخفي"}
                        </button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            حذف الرسالة
                        </button>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(`/${App_User}/contact`)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 `}
                            >
                                {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
                        <p className="mb-6">
                            هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع عن
                            هذا الإجراء.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactUpdate;
