/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Loader2 } from "lucide-react";

// api
import { publicCreateQuranExam } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function QuranExamsCreate() {
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
            sectionData.append("date_time", formData.date_time || "");

            sectionData.append("exam_type", formData.exam_type || "");
            sectionData.append("exam_status", formData.exam_status || "");

            sectionData.append("is_visible", isVisible);

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } = await publicCreateQuranExam(sectionData);

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
                Toast("success", "تم إنشاء الاختبار بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الاختبار");
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
                            إضافة اختبار جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleSectionSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/*  */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    منهج الاختبار*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: امتحان في جزء عم"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "منهج الاختبار مطلوب",
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
                                    htmlFor="date_time"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    التاريخ*
                                </label>
                                <input
                                    type="datetime-local"
                                    id="date_time"
                                    name="date_time"
                                    placeholder="مثال: "
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

                            {/* النوع */}
                            <div>
                                <label
                                    htmlFor="exam_type"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    النوع*
                                </label>
                                <select
                                    id="exam_type"
                                    name="exam_type"
                                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 transition-all focus:border-blue-500`}
                                    {...register("exam_type", {
                                        required: "النوع مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">أختر النوع</option>
                                    <option value="monthly">شهري</option>
                                    <option value="biannual">نصف سنوي</option>
                                    <option value="ultimate">نهائي</option>
                                </select>
                                {errors.exam_type && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.exam_type.message}
                                    </p>
                                )}
                            </div>

                            {/* الحالة */}
                            <div>
                                <label
                                    htmlFor="exam_status"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    الحالة*
                                </label>
                                <select
                                    id="exam_status"
                                    name="exam_status"
                                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 transition-all focus:border-blue-500`}
                                    {...register("exam_status", {
                                        required: "الحالة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">أختر الحالة</option>
                                    <option value="didnot_start">
                                        لم يبدأ
                                    </option>
                                    <option value="complete">مكتمل</option>
                                </select>
                                {errors.exam_status && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.exam_status.message}
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
                                        : "حفظ الاختبار"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuranExamsCreate;
