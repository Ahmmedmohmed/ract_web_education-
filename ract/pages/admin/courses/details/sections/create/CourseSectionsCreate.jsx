/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, X, Save, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// api
import { publicCreateSectionInCourse } from "../../../../../../api/public/authPublic";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";

function CourseSectionsCreate() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (createData) => {
        try {
            setIsLoading(true);

            // const sectionData = {
            //     course: courseId,
            //     title: data.title,
            //     is_visible: isVisible,
            // };

            const sectionData = new FormData();
            sectionData.append("course", courseId);
            sectionData.append("title", createData.title);
            sectionData.append("is_visible", isVisible);

            const { data, error } = await publicCreateSectionInCourse(
                courseId,
                sectionData
            );

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            // }

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                setErrorsMessage(error.message || "حدث خطأ أثناء إنشاء القسم");
                Toast("error", error.message || "حدث خطأ أثناء إنشاء القسم");
            } else {
                Toast("success", "تم إنشاء القسم بنجاح");
                navigate(`/${App_Admin}/courses/${courseId}`);
            }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ غير متوقع");
            navigate(`/${App_Admin}/courses/${courseId}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/courses/${courseId}`);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة قسم جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-bold text-black mb-2"
                                >
                                    عنوان القسم*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: القسم الأول: المقدمة"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "عنوان القسم مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors?.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors?.title?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
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
                                    onClick={() => {
                                        navigate(
                                            `/${App_Admin}/courses/${courseId}`
                                        );
                                    }}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "إضافة قسم"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseSectionsCreate;
