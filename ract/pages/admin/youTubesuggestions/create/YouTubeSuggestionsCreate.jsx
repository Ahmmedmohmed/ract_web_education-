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
    Trash,
    FileText,
} from "lucide-react";

// api
import { publicCreateYouTubeSuggestionsBlog } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

function YouTubeSuggestionsCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

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

            courseData.append("title", formData.title);
            courseData.append("video_url", formData.video_url || "");

            courseData.append("is_visible", isVisible);

            // console.log(`formData`, formData);
            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            // }

            const { data, error } = await publicCreateYouTubeSuggestionsBlog(
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
                Toast("success", "تم إنشاء الاقتراح بنجاح");
                navigate(`/${App_Admin}/youTubesuggestions`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الاقتراح");
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
                                navigate(`/${App_Admin}/youTubesuggestions`)
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة اقتراح جديدة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عنوان الاقتراح*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: اقتراح التحصيلي رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "العنوان مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Video Url */}
                            <div>
                                <label
                                    htmlFor="video_url"
                                    className="block text-lg font-bold text-gray-700 mb-2"
                                >
                                    رابط الفيديو*
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="video_url"
                                        id="video_url"
                                        name="video_url"
                                        placeholder="مثال: https://youtube.com/watch?v=..."
                                        className={`w-full p-3 border ${
                                            errors.video_url
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                        {...register("video_url", {
                                            required: `الرابط مطلوب`,
                                            validate: {
                                                validVideoUrl: (value) => {
                                                    if (!value) return true;
                                                    const youtubeRegex =
                                                        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
                                                    const vimeoRegex =
                                                        /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;
                                                    const generalVideoRegex =
                                                        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
                                                    return (
                                                        youtubeRegex.test(
                                                            value
                                                        ) ||
                                                        vimeoRegex.test(
                                                            value
                                                        ) ||
                                                        generalVideoRegex.test(
                                                            value
                                                        ) ||
                                                        "يرجى إدخال رابط فيديو صالح (YouTube أو Vimeo أو منصة أخرى)"
                                                    );
                                                },
                                            },
                                        })}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                </div>
                                {errors?.video_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.video_url.message}
                                    </p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                    يمكنك إضافة رابط من YouTube أو Vimeo أو أي
                                    منصة أخرى
                                </p>
                            </div>

                            {/* Visibility Toggle */}
                            <div className="flex items-center cursor-pointer">
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
                                            `/${App_Admin}/youTubesuggestions`
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
                                        : "حفظ الاقتراح"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default YouTubeSuggestionsCreate;
