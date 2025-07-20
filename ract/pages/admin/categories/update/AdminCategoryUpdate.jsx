/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Save,
    X,
    Image as ImageIcon,
    ArrowRight,
    Upload,
    Eye,
    EyeOff,
    Trash2,
} from "lucide-react";

// api
import {
    adminDeleteCategory,
    adminGetCategoryById,
    adminUpdateCategory,
} from "../../../../api/admin/authAdmin";

// data
import { categorycourses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function AdminCategoryUpdate() {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [categoryData, setCategoryData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await adminGetCategoryById(categoryId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/categories`);
                } else {
                    setCategoryData(data);
                    setIsVisible(data.is_visible);

                    // Set form values
                    setValue("title", data.title);
                    setValue("image", data.image);
                    setValue("image_url", data.image_url);

                    // Set image preview if available
                    if (data.image) {
                        setImagePreview(data.image);
                    } else if (data.image_url) {
                        setImagePreview(data.image_url);
                    }
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/categories`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [categoryId, navigate, setValue]);

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

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("title", formData.title);
            updateData.append("image_url", formData.image_url || "");
            updateData.append("is_visible", isVisible);
            if (imageFile) {
                updateData.append("image", imageFile);
            }

            const { data, error } = await adminUpdateCategory(
                categoryId,
                updateData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث التصنيف بنجاح");
                navigate(`/${App_Admin}/categories`);
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

            const { error } = await adminDeleteCategory(categoryId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف التصنيف بنجاح");
                navigate(`/${App_Admin}/contact`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    if (isLoading && !categoryData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!categoryData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">لا توجد بيانات للعرض</p>
            </div>
        );
    }

    // const onSubmit = (data) => {
    //     const formData = new FormData();
    //     formData.append("id", categoryId);
    //     formData.append("name", data.name);
    //     formData.append("imageUrl", data.imageUrl);
    //     if (imageFile) formData.append("imageFile", imageFile);
    //     formData.append("isVisible", data.isVisible);

    //     // Here you would typically send formData to your API for update
    //     // console.log("Form Data:", Object.fromEntries(formData));
    //     navigate(`/${App_Admin}/categories`);
    // };

    // console.log(`ww`, categoryData);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className=" ">
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
                            تعديل التصنيف
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-lg font-medium text-black mb-2"
                                    >
                                        اسم التصنيف*
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="مثال: قدرات"
                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
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

                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    صورة الدورة
                                </label>

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center w-full">
                                        {/* {imagePreview ? (
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
                                        )} */}

                                        {imagePreview ? (
                                            <div className="mb-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-80 w-full object-fill rounded-md"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : categoryData?.image ? (
                                            <div className="mb-3">
                                                <img
                                                    src={categoryData.image}
                                                    alt="Category Image"
                                                    className="mx-auto h-80 w-full object-fill rounded-md"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mx-auto h-40 w-full flex items-center text-gray-400">
                                                <Upload
                                                    size={40}
                                                    className="mx-auto"
                                                />
                                            </div>
                                        )}

                                        <div className="flex justify-center it text-lg text-gray-600">
                                            <label
                                                htmlFor="image"
                                                className={`relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 transition-all`}
                                            >
                                                <span>قم برفع صورة</span>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="sr-only"
                                                    accept="image/*"
                                                    {...register("image", {
                                                        // required: `الصورة مطلوبة`,
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
                                        className="block text-lg font-medium text-black mb-2"
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
                                        disabled={isSubmitting || isLoading}
                                        autoComplete="off"
                                    />

                                    {errors.image_url && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.image_url.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-wrap gap-4">
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

                            <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    حذف الرسالة
                                </button>

                                <div className="mt-8 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                        onClick={() => {
                                            navigate(
                                                `/${App_Admin}/categories`
                                            );
                                        }}
                                    >
                                        إلغاء
                                    </button>

                                    <button
                                        type="submit"
                                        className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        disabled={isLoading}
                                    >
                                        <Save size={18} />
                                        {isLoading
                                            ? "جاري الحفظ..."
                                            : "حفظ التغييرات"}
                                        {/* <span>حفظ التعديلات</span> */}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع
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
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminCategoryUpdate;
