/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
    Loader2,
    Plus,
    X,
    Check,
    MessageSquare,
} from "lucide-react";

// api
import { publicCreateProofreadingService } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function ProofreadingservicesCreate() {
    const navigate = useNavigate();

    let { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [quickReply, setQuickReply] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            courseData.append("user", userData?.id || null);

            courseData.append("type_proofreading", formData.type_proofreading);
            courseData.append("number_page", formData.number_page || "");
            courseData.append("receipt_period", formData.receipt_period);
            courseData.append("field_study", formData.field_study);
            courseData.append("phone_number", formData.phone_number);

            courseData.append("state", formData.state || "");

            courseData.append("quick_reply", quickReply);
            courseData.append("is_visible", isVisible);

            // console.log(`formData`, formData);
            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            // }

            const { data, error } = await publicCreateProofreadingService(
                courseData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
            } else {
                Toast("success", "تم إنشاء التدقيق بنجاح");
                navigate(`/${App_User}/proofreadingservices`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء التدقيق اللغوي");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`sections`, sections);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(`/${App_User}/proofreadingservices`)
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة تدقيق لغوي جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Type Proofreading */}
                            <div>
                                <label
                                    htmlFor="type_proofreading"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    نوع التدقيق اللغوي*
                                </label>
                                <select
                                    id="type_proofreading"
                                    name="type_proofreading"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("type_proofreading", {
                                        required: "نوع التدقيق مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر نوع التدقيق</option>
                                    <option value="total_formation">
                                        تشكيل كلي
                                    </option>
                                    <option value="end_words">
                                        اواخر الكلمات
                                    </option>
                                </select>
                                {errors.type_proofreading && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.type_proofreading.message}
                                    </p>
                                )}
                            </div>

                            {/* number page */}
                            <div>
                                <label
                                    htmlFor="number_page"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عدد الصفحات*
                                </label>
                                <input
                                    type="number"
                                    id="number_page"
                                    name="number_page"
                                    min={0}
                                    placeholder="مثال: 199 أو 10"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("number_page", {
                                        required: "العدد مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "العدد لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.number_page && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.number_page.message}
                                    </p>
                                )}
                            </div>

                            {/* receipt period */}
                            <div>
                                <label
                                    htmlFor="receipt_period"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    المدة الزمنية المطلوبة لاستلام الملف بعد
                                    تدقيقه*
                                </label>
                                <input
                                    type="text"
                                    id="receipt_period"
                                    name="receipt_period"
                                    placeholder="مثال: 3 أيام "
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("receipt_period", {
                                        required: "المدة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.receipt_period && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.receipt_period.message}
                                    </p>
                                )}
                            </div>

                            {/* Field Study */}
                            <div>
                                <label
                                    htmlFor="field_study"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    مجال الدراسة الموجود في صفحات التدقيق*
                                </label>
                                <input
                                    type="text"
                                    id="field_study"
                                    name="field_study"
                                    placeholder="مثال: مجال الحاسب الالي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("field_study", {
                                        required: `مجال الدراسة مطلوب`,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.field_study && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.field_study.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label
                                    htmlFor="phone_number"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    رقم الواتس اب*
                                </label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    placeholder="مثال: 01012312356"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("phone_number", {
                                        required: "رقم الهاتف مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.phone_number && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone_number.message}
                                    </p>
                                )}
                            </div>

                            {/* state */}
                            <div>
                                <label
                                    htmlFor="state"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الدولة*
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="مثال: مصر"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("state", {
                                        required: `الدولة مطلوبة`,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>

                            {/* Visibility Toggle */}
                            <div className="flex items-center cursor-pointer">
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
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                                        isVisible
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isVisible ? (
                                        <Eye
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    ) : (
                                        <EyeOff
                                            size={16}
                                            className="text-gray-600"
                                        />
                                    )}
                                    {isVisible ? "ظاهر" : "مخفي"}
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(
                                            `/${App_User}/proofreadingservices`
                                        )
                                    }
                                    disabled={isSubmitting || isLoading}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ التدقيق"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProofreadingservicesCreate;
