/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
    Loader2,
    FileText,
    Trash,
} from "lucide-react";

// api
import { publicCreateFileAndLibrary } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function FileAndLibrarysCreate() {
    const { quranpathId, chapterinquranId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    //
    const filePDFInputRef = useRef(null);
    const [uploadedFilePDF, setUploadedFilePDF] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    //
    const handleFilePDFUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFilePDF(file);
        // console.log(`file`, file);
    };

    //
    const handleSectionSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const sectionData = new FormData();
            sectionData.append("user", userData?.id || null);
            sectionData.append("chapter_in_quran", chapterinquranId || null);

            sectionData.append("title", formData.title);
            sectionData.append("description", formData.description || "");

            if (uploadedFilePDF) {
                sectionData.append("file", uploadedFilePDF);
            }
            sectionData.append("file_url", formData.file_url || "");

            sectionData.append("is_visible", isVisible);

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } = await publicCreateFileAndLibrary(
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
                Toast("success", "تم إنشاء الملف بنجاح");
                navigate(
                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}`
                );
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الملف");
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
                            إضافة ملف جديد
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
                                    اسم الملف*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: كتاب التجويد المصور"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "اسم الملف مطلوب",
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
                                    الوصف
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

                            {/* File  */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        الملف المرفق
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        className="hidden"
                                        // accept=".pdf"
                                        ref={filePDFInputRef}
                                        {...register("file", {
                                            // validate: validateImageUrl,
                                        })}
                                        onChange={(e) => {
                                            // console.log(`ee`);
                                            handleFilePDFUpload(e);
                                        }}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                    <label
                                        htmlFor="file"
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        {uploadedFilePDF ? (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm w-full">
                                                <div className="flex items-center truncate">
                                                    <FileText
                                                        size={16}
                                                        className={`ml-2 text-blue-500`}
                                                    />
                                                    <span
                                                        className={`text-lg truncate text-blue-500`}
                                                    >
                                                        {uploadedFilePDF.name}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUploadedFilePDF(
                                                            null
                                                        );
                                                    }}
                                                    className="p-1 text-gray-500 hover:text-red-600 rounded"
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload
                                                    size={24}
                                                    className="text-gray-400 mb-2"
                                                />
                                                <span
                                                    className={`text-sm font-medium text-blue-600`}
                                                >
                                                    اختر ملف للرفع
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* File URL */}
                            <div>
                                <label
                                    htmlFor="file_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط الملف
                                </label>
                                <input
                                    type="url"
                                    id="file_url"
                                    name="file_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("file_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.file_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.file_url.message}
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
                                        : "حفظ الملف"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FileAndLibrarysCreate;
