/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    Save,
    PlusCircle,
    XCircle,
    Upload,
    Loader2,
    Trash2,
    Eye,
    EyeOff,
} from "lucide-react";

// api
import {
    publicGetQuestionInBankById,
    publicUpdateQuestionInBank,
    publicDeleteQuestionInBank,
} from "../../../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../../../store/UserDataStore";

// plugin
import Toast from "../../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../../utils/constants";
import { validateImageUrl } from "../../../../../../utils/helpers";

function QuestionUpdate() {
    const { bankId, questionId } = useParams();

    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        // defaultValues: {
        //     text: "",
        //     choices: [
        //         { text: "", is_correct: true },
        //         { text: "", is_correct: false },
        //         { text: "", is_correct: false },
        //         { text: "", is_correct: false },
        //     ],
        //     image: null,
        //     image_url: "",
        //     is_visible: true,
        // },
    });

    const choices = watch("choices");

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetQuestionInBankById(
                    questionId
                );

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب السؤال");
                    navigate(
                        `/${App_Admin}/question-banks/${bankId}/questions`
                    );
                } else {
                    setValue("text", data.text);
                    setValue("image_url", data.image_url || "");
                    setValue("choices", data.choices || []);
                    // setValue("is_visible", data.is_visible);
                    setIsVisible(data.is_visible);

                    if (data.image) {
                        setImagePreview(data.image);
                    } else if (data.image_url) {
                        setImagePreview(data.image_url);
                    }
                }
            } catch (error) {
                setError("حدث خطأ أثناء جلب بيانات السؤال");
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/question-banks/${bankId}/questions`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestion();
    }, [questionId, bankId, navigate, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChoiceChange = (index, field, value) => {
        const newChoices = [...choices];

        if (field === "is_correct" && value === true) {
            newChoices.forEach((choice, i) => {
                choice.is_correct = i === index;
            });
        } else {
            newChoices[index][field] = value;
        }

        setValue("choices", newChoices);
    };

    const addChoice = () => {
        if (choices.length < 10) {
            setValue("choices", [...choices, { text: "", is_correct: false }]);
        }
    };

    const removeChoice = (index) => {
        if (choices.length > 2) {
            const newChoices = [...choices];
            newChoices.splice(index, 1);

            if (choices[index].is_correct && newChoices.length > 0) {
                newChoices[0].is_correct = true;
            }

            setValue("choices", newChoices);
        }
    };

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("text", formData.text);

            if (imageFile) updateData.append("image", imageFile);
            updateData.append("image_url", formData.image_url || "");
            updateData.append("choices", JSON.stringify(formData.choices));
            // updateData.append("is_visible", formData.is_visible);
            updateData.append("is_visible", isVisible);

            const { data, error } = await publicUpdateQuestionInBank(
                questionId,
                updateData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                // throw error;
                Toast("error", error.message);
            } else {
                Toast("success", "تم تحديث السؤال بنجاح");
                navigate(`/${App_Admin}/questions-banks/${bankId}/questions`);
            }
        } catch (error) {
            console.error("Error updating question:", error);
            Toast("error", error.message || "حدث خطأ أثناء تحديث السؤال");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await publicDeleteQuestionInBank(questionId);

            if (error) {
                // throw error;
                Toast("error", error.message);
            } else {
                Toast("success", "تم حذف السؤال بنجاح");
                // navigate(`/${App_Admin}/questions-banks/${bankId}/questions`);
                navigate(`/${App_Admin}/questions-banks`);
            }
        } catch (error) {
            console.error("Error deleting question:", error);
            Toast("error", error.message || "حدث خطأ أثناء حذف السؤال");
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-start">
                        <button
                            onClick={() =>
                                navigate(
                                    `/${App_Admin}/questions-banks/${bankId}/questions`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            تعديل السؤال
                        </h1>
                    </div>
                </div>

                {/* {error && (
                <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-md">
                    {error}
                </div>
            )} */}

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 flex flex-col gap-6"
                    >
                        {/* Question Text */}
                        <div>
                            <label
                                htmlFor="text"
                                className="block text-lg font-bold text-black mb-1"
                            >
                                نص السؤال
                            </label>
                            <textarea
                                rows={4}
                                id="text"
                                name="text"
                                placeholder="مثال: ما هو تعريف المنطق؟"
                                className={`w-full min-h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none`}
                                {...register("text", {
                                    // required: "نص السؤال مطلوب",
                                })}
                                autoComplete="off"
                                disabled={isLoading || isSubmitting}
                            />
                            {errors.text && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.text.message}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-lg font-bold mb-2 text-black"
                            >
                                صورة السؤال
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {imagePreview ? (
                                        <div className="mb-3">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mx-auto h-32 w-auto object-cover rounded-md"
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mx-auto h-20 w-20 text-gray-400">
                                            <Upload
                                                size={40}
                                                className="mx-auto"
                                            />
                                        </div>
                                    )}

                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="image"
                                            className={`relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 transition-all`}
                                        >
                                            <span>قم برفع صورة</span>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                ref={fileInputRef}
                                                className="sr-only"
                                                accept="image/*"
                                                {...register("image")}
                                                onChange={handleImageChange}
                                                autoComplete="off"
                                                disabled={
                                                    isLoading || isSubmitting
                                                }
                                            />
                                        </label>
                                        <p className="pr-1">أو اسحب وأفلت</p>
                                    </div>

                                    <p className="text-xs text-gray-500">
                                        PNG، JPG، GIF حتى 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label
                                htmlFor="image_url"
                                className="block text-lg font-medium text-gray-700 mb-2"
                            >
                                رابط الصورة
                            </label>
                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                placeholder="مثال: https://example.com/image.jpg"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                {...register("image_url", {
                                    // validate: (value) =>
                                    //     !value ||
                                    //     validateImageUrl(value) ||
                                    //     "رابط الصورة غير صالح",
                                    validate: validateImageUrl,
                                })}
                                autoComplete="off"
                                disabled={isLoading || isSubmitting}
                            />
                            {errors.image_url && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.image_url.message}
                                </p>
                            )}
                        </div>

                        {/* Answer Choices */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    اختيارات الإجابة*
                                </h2>

                                {/* <button
                                type="button"
                                onClick={addChoice}
                                disabled={choices.length >= 10 || isLoading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                            >
                                إضافة اختيار
                                <PlusCircle className="h-4 w-4" />
                            </button> */}
                            </div>

                            <p className="text-sm text-gray-600">
                                ضع علامة على خيار واحد كإجابة صحيحة.
                            </p>

                            <div className="space-y-3 flex flex-col gap-4">
                                {choices.map((choice, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-3 
                                            rounded-md shadow-md
                                            ${
                                                choice.is_correct
                                                    ? `bg-blue-200`
                                                    : "bg-gray-50"
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                                            checked={choice.is_correct}
                                            onChange={() =>
                                                handleChoiceChange(
                                                    index,
                                                    "is_correct",
                                                    true
                                                )
                                            }
                                            autoComplete="off"
                                            disabled={isLoading || isSubmitting}
                                        />

                                        <label
                                            htmlFor={`${index}`}
                                            className="hidden"
                                        ></label>

                                        <input
                                            type="text"
                                            id={`${index}`}
                                            name={`${index}`}
                                            placeholder={`الاختيار ${
                                                index + 1
                                            }`}
                                            className={`flex-1 p-2 text-black border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                            value={choice.text}
                                            onChange={(e) =>
                                                handleChoiceChange(
                                                    index,
                                                    "text",
                                                    e.target.value
                                                )
                                            }
                                            autoComplete="off"
                                            disabled={isLoading || isSubmitting}
                                            required
                                        />

                                        {/* {choices.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeChoice(index)}
                                            disabled={isLoading}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <XCircle className="h-5 w-5" />
                                        </button>
                                    )} */}
                                    </div>
                                ))}
                            </div>
                            {!choices.some((c) => c.is_correct) && (
                                <p className="text-red-500 text-sm">
                                    يجب تحديد إجابة صحيحة واحدة على الأقل
                                </p>
                            )}
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
                            >
                                {isVisible ? (
                                    <Eye size={16} className="text-blue-600" />
                                ) : (
                                    <EyeOff
                                        size={16}
                                        className="text-gray-600"
                                    />
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
                                disabled={isLoading || isSubmitting}
                            >
                                <Trash2 size={16} />
                                حذف السؤال
                            </button>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(
                                            `/${App_Admin}/question-banks/${bankId}/questions`
                                        )
                                    }
                                    disabled={isLoading || isSubmitting}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 disabled:bg-gray-400`}
                                    disabled={isLoading || isSubmitting}
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin h-5 w-5" />
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    {isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ التغييرات"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا السؤال؟ لا يمكن التراجع
                                عن هذا الإجراء.
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? "جاري الحذف..." : "حذف"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default QuestionUpdate;
