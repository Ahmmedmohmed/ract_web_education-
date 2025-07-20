/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Loader2 } from "lucide-react";

// api
import { publicCreateLiveQuranCircle } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function LiveQuranCirclesCreate() {
    const { quranpathId, chapterinquranId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    //
    const handleSectionSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const sectionData = new FormData();
            sectionData.append("user", userData?.id || null);
            sectionData.append("chapter_in_quran", chapterinquranId || null);

            sectionData.append("title", formData.title);
            sectionData.append("description", formData.description || "");

            sectionData.append("zoom_url", formData.zoom_url || "");
            // sectionData.append("date_time", formData.date_time || "");
            sectionData.append(
                "date_time",
                new Date(formData.date_time).toISOString() || ""
            );

            sectionData.append("is_visible", isVisible);

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } = await publicCreateLiveQuranCircle(
                sectionData
            );

            console.log(`error`, error);
            console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
            } else {
                Toast("success", "تم إنشاء موعد زوم بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إنشاء موعد زوم");
            setIsLoading(false);
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

    // console.log(`quranPaths`, quranPaths);
    // console.log(`quranpathId`, quranpathId);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(
                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة موعد زوم جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleSectionSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    عنوان الجلسة*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: حلقة مراجعة"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "عنوان الجلسة مطلوب",
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

                            {/*  */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    التفاصيل
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: خُطَّةٌ مُتكَامِلَةٌ لِخَتْمِ القُرْآنِ حِفْظًا وفَهْمًا."
                                    className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 resize-none`}
                                    {...register("description", {
                                        // required: ``,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label
                                    htmlFor="zoom_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط زوم
                                </label>
                                <input
                                    type="url"
                                    id="zoom_url"
                                    name="zoom_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("zoom_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.zoom_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.zoom_url.message}
                                    </p>
                                )}
                            </div>

                            {/*  */}
                            <div>
                                <label
                                    htmlFor="date_time"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    التاريخ*
                                </label>
                                <input
                                    type="datetime-local"
                                    id="date_time"
                                    name="date_time"
                                    placeholder="مثال: دورة التحصيلي رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer`}
                                    {...register("date_time", {
                                        required: "الموعد مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.date_time && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.date_time.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center cursor-pointer">
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                                        isVisible
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
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

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(
                                            `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
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
                                        : "حفظ موعد زوم"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LiveQuranCirclesCreate;
