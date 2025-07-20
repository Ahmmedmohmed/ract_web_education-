/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// API
import { userCreateUserReview } from "../../../../api/user/authUser";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function ReviewCreate() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    let { userData, userProfile } = UserDataStore();

    const {
        register,
        handleSubmit,
        formState,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        // تعبئة الحقول تلقائياً إذا كان المستخدم مسجل الدخول
        if (userData) {
            setValue("first_name", userData.first_name || "");
            // setValue("email", userData.email || "");
        }
    }, [userData, setValue]);

    const handleReviewSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const reviewData = {
                first_name: formData.first_name,
                // email: formData.email,
                rating: parseInt(formData.rating),
                message: formData.description,
                is_visible: isVisible,
                user: userData?.id || null,
                profile: userProfile?.id || null,
            };

            const { data, error } = await userCreateUserReview(reviewData);

            if (error) {
                if (error.message) {
                    setErrorsMessage(error.message);
                    Toast("error", error.message);
                } else if (error.email) {
                    setErrorsMessage(error.email[0]);
                    Toast("error", error.email[0]);
                }
            } else {
                Toast("success", "تم إرسال التقييم بنجاح");
                navigate(`/${App_User}/review`);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            Toast("error", "حدث خطأ أثناء إرسال التقييم");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="">
                <div className="flex items-center justify-start mb-6">
                    <button
                        onClick={() => navigate(`/${App_User}/review`)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <h1 className="text-3xl font-bold mr-2 text-black">
                        التقييمات
                    </h1>
                </div>

                <div className="card p-6 my-8">
                    <h2 className="text-2xl font-bold mr-2 mb-8 text-black">
                        أرسل تقييمك عنا
                    </h2>

                    <form
                        onSubmit={handleSubmit(handleReviewSubmit)}
                        className="space-y-6 flex flex-col gap-8"
                    >
                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-bold mb-2 text-black"
                            >
                                الاسم الأول*
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="مثال: محمد"
                                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                {...register("first_name", {
                                    required: "هذا الحقل مطلوب.",
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.first_name.message}
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label
                                htmlFor={`star-4`}
                                className="block text-sm font-bold text-black mb-1"
                            >
                                التقييم*
                            </label>
                            <div className="rating-stars flex justify-around">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star}>
                                        <input
                                            type="radio"
                                            id={`star-${star}`}
                                            name="rating"
                                            value={star}
                                            className="hidden"
                                            {...register("rating", {
                                                required: "هذا الحقل مطلوب.",
                                            })}
                                            autoComplete="off"
                                            disabled={isLoading}
                                        />
                                        <label
                                            htmlFor={`star-${star}`}
                                            className={`text-5xl cursor-pointer ${
                                                watch("rating") >= star
                                                    ? "text-amber-400"
                                                    : ""
                                            }`}
                                            // style={{
                                            //     color:
                                            //         watch("rating") >= star
                                            //             ? "#ffc107"
                                            //             : "#e4e5e9",
                                            // }}
                                        >
                                            ★
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>

                        {/* Review description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-bold text-black mb-1"
                            >
                                وصف التقييم*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="مثال: أفضل منصة دورات تعليمية"
                                className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none`}
                                {...register("description", {
                                    required: "هذا الحقل مطلوب.",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "يجب أن تحتوي الرسالة على الأقل 10 حرف",
                                    },
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Visibility Toggle */}
                        <div className="flex justify-start">
                            <button
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                    isVisible
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                                disabled={isLoading}
                            >
                                {isVisible ? (
                                    <Eye size={16} className="text-blue-600" />
                                ) : (
                                    <EyeOff
                                        size={16}
                                        className="text-gray-600"
                                    />
                                )}
                                {isVisible ? "ظاهر " : "مخفي"}
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
                                    : "إرسال التقييم"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ReviewCreate;
