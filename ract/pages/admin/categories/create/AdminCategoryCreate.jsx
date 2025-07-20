/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    X,
    Image as ImageIcon,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
} from "lucide-react";

// api
import { adminCreateCategory } from "../../../../api/admin/authAdmin";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function AdminCategoryCreate() {
    const navigate = useNavigate();

    let { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        // defaultValues: {
        //     title: "",
        //     image_url: "",
        //     isVisible: true,
        // },
    });
    // const isVisible = watch("isVisible");

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategorySubmit = async (formData) => {
        try {
            setIsLoading(true);

            // const contactData = {
            //     user: userData?.id || null,

            //     title: formData.title,
            //     description: formData.description || "",

            //     image: imageFile,
            //     image_url: formData.image_url,

            //     is_visible: isVisible,
            // };
            // console.log(`imageFile`, imageFile);
            // console.log(`contactData`, contactData);

            const categoryData = new FormData();
            categoryData.append("user", userData?.id || null);
            categoryData.append("title", formData.title);
            categoryData.append("description", formData.description || null);
            if (imageFile) categoryData.append("image", imageFile || null);
            categoryData.append("image_url", formData.image_url);
            categoryData.append("is_visible", isVisible);

            const { data, error } = await adminCreateCategory(categoryData);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                }
            } else {
                Toast("success", "تم إرسال التصنيف بنجاح");
                navigate(`/${App_Admin}/categories`);
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            Toast("error", "حدث خطأ أثناء إرسال التصنيف");
            navigate(`/${App_Admin}/categories`);
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
                                navigate(`/${App_Admin}/categories`);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة تصنيف جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCategorySubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        اسم التصنيف*
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                        placeholder="مثال: قدرات"
                                        {...register("title", {
                                            required: "اسم التصنيف مطلوب",
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
                            </div>

                            {/* Message Content */}
                            {/* <div className="">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-bold text-black mb-1"
                                >
                                    الوصف*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: لدي مشكلة في عملية الدفع الخاصة بالدورات"
                                    className="w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none"
                                    {...register("description", {
                                        // required: "هذا الحقل مطلوب.",
                                        minLength: {
                                            value: 10,
                                            message:
                                                "يجب أن يحتوي الوصف على الأقل 10 حرف",
                                        },
                                    })}
                                    autoComplete="off"
                                    // required
                                />
                                {errors?.description && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors?.description.message}
                                    </p>
                                )}
                            </div> */}

                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-bold mb-2 text-black"
                                >
                                    صورة الدورة
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
                                                    {...register("image", {
                                                        // required:
                                                        //     "الصورة مطلوبة",
                                                    })}
                                                    onChange={(e) => {
                                                        handleImageChange(e);
                                                    }}
                                                    autoComplete="off"
                                                    disabled={
                                                        isSubmitting ||
                                                        isLoading
                                                    }
                                                    // required
                                                />
                                            </label>
                                            <p className="pr-1">
                                                أو اسحب وأفلت
                                            </p>
                                        </div>

                                        <p className="text-xs text-gray-500">
                                            PNG، JPG، GIF حتى 5MB
                                        </p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>

                            {/* Image Url */}
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="image_url"
                                        className="block text-sm font-medium text-gray-700 mb-2"
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
                                            validate: validateImageUrl,
                                        })}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                    {errors.image_url && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.image_url.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Quick Reply and Visibility Toggles */}
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
                                    {/* {console.log(`isVisible`,isVisible)} */}
                                    {isVisible ? "ظاهر" : "مخفي"}
                                </button>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() => {
                                        navigate(`/${App_Admin}/categories`);
                                    }}
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
                                        ? "جاري الإرسال..."
                                        : "إرسال"}
                                    {/* <span>حفظ التصنيف</span> */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategoryCreate;
