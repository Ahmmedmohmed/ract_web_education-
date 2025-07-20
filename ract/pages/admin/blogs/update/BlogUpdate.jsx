/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    Trash2,
    FileText,
    Trash,
} from "lucide-react";

// api
import { adminGetSectionsBlogsAdmin } from "../../../../api/admin/authAdmin";
import {
    publicGetBlogById,
    publicUpdateBlog,
    publicDeleteBlog,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function BlogUpdate() {
    const { blogId } = useParams();

    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // State for dynamic fields
    const [features, setFeatures] = useState([""]);
    const [requirements, setRequirements] = useState([""]);
    const [targetAudience, setTargetAudience] = useState([""]);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const filePDFInputRef = useRef(null);
    const fileWordInputRef = useRef(null);
    const [uploadedFilePDF, setUploadedFilePDF] = useState(null);
    const [uploadedFileWord, setUploadedFileWord] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchSections = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await adminGetSectionsBlogsAdmin();

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الأقسام"
                    );
                } else {
                    setSections(data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSections();
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetBlogById(blogId);

                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب المقالة"
                    );
                    navigate(`/${App_Admin}/blogs`);
                } else {
                    // Set form values
                    setValue("usser", data.user?.id || "");
                    setValue("category", data.category || "");

                    setValue("title", data.title);
                    setValue("description", data.description);
                    setValue("summary", data.summary);

                    setValue("techs", data.techs);

                    // setValue("price", data.price);
                    // setValue("discount", data.discount);
                    // setValue("duration", data.duration);
                    // setValue("tag", data.tag || "");

                    // setValue("status", data.status || "");
                    // setValue("level", data.level || "");
                    // setValue("language", data.language || "");

                    setValue("image_url", data.image_url || "");
                    setIsVisible(data.is_visible);

                    setValue("file_word_url", data.file_word_url || "");
                    setValue("file_pdf_url", data.file_pdf_url || "");

                    if (data.image) {
                        setImagePreview(data.image);
                    } else if (data.image_url) {
                        setImagePreview(data.image_url);
                    }

                    if (data.file_word) {
                        setUploadedFileWord(data.file_word);
                    }
                    if (data.file_pdf) {
                        setUploadedFilePDF(data.file_pdf);
                    }

                    // // Set dynamic fields
                    // if (data.features && data.features.length > 0) {
                    //     setFeatures(data.features);
                    // }
                    // if (data.requirements && data.requirements.length > 0) {
                    //     setRequirements(data.requirements);
                    // }
                    // if (
                    //     data.target_audience &&
                    //     data.target_audience.length > 0
                    // ) {
                    //     setTargetAudience(data.target_audience);
                    // }
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب المقالة");
                navigate(`/${App_Admin}/blogs`);
            } finally {
                setIsLoading(false);
            }
        };

        // if (blogId) {
        //     fetchCourse();
        // }
        fetchCourse();
    }, [blogId, navigate, setValue, sections]);

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

    // Functions to handle dynamic fields
    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index) => {
        if (features.length > 1) {
            const newFeatures = [...features];
            newFeatures.splice(index, 1);
            setFeatures(newFeatures);
        }
    };

    const addRequirement = () => setRequirements([...requirements, ""]);
    const removeRequirement = (index) => {
        if (requirements.length > 1) {
            const newRequirements = [...requirements];
            newRequirements.splice(index, 1);
            setRequirements(newRequirements);
        }
    };

    const addTargetAudience = () => setTargetAudience([...targetAudience, ""]);
    const removeTargetAudience = (index) => {
        if (targetAudience.length > 1) {
            const newTargetAudience = [...targetAudience];
            newTargetAudience.splice(index, 1);
            setTargetAudience(newTargetAudience);
        }
    };

    // Handle change for dynamic fields
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleRequirementChange = (index, value) => {
        const newRequirements = [...requirements];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    };

    const handleTargetAudienceChange = (index, value) => {
        const newTargetAudience = [...targetAudience];
        newTargetAudience[index] = value;
        setTargetAudience(newTargetAudience);
    };

    const handleFilePDFUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFilePDF(file);
        }
        // console.log(`file`, file);
    };
    const handleFileWordUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileWord(file);
        }
        // console.log(`file`, file);
    };

    const handleCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            // courseData.append("user", formData.user || null);
            courseData.append("category", formData.category);

            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");
            courseData.append("summary", formData.summary || "");

            courseData.append("techs", formData.techs || "");

            // courseData.append("price", formData.price);
            // courseData.append("discount", formData.discount);
            // courseData.append("duration", formData.duration);

            // courseData.append("tag", formData.tag || "");
            // courseData.append("status", formData.status);
            // courseData.append("level", formData.level);
            // courseData.append("language", formData.language);

            if (imageFile) courseData.append("image", imageFile);
            courseData.append("image_url", formData.image_url || "");
            courseData.append("is_visible", isVisible);

            if (uploadedFileWord instanceof File) {
                courseData.append("file_word", uploadedFileWord);
            }
            courseData.append("file_word_url", formData.file_word_url);

            if (uploadedFilePDF instanceof File) {
                courseData.append("file_pdf", uploadedFilePDF);
            }
            courseData.append("file_pdf_url", formData.file_pdf_url);

            // // Add dynamic fields as JSON strings
            // courseData.append("features", JSON.stringify(features));
            // courseData.append("requirements", JSON.stringify(requirements));
            // courseData.append(
            //     "target_audience",
            //     JSON.stringify(targetAudience)
            // );

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            // }

            const { data, error } = await publicUpdateBlog(blogId, courseData);

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
                Toast("success", "تم تحديث المقالة بنجاح");
                navigate(`/${App_Admin}/blogs`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            Toast("error", "حدث خطأ أثناء تحديث المقالة");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await publicDeleteBlog(blogId);

            if (error) {
                Toast("error", error.message);
            } else {
                Toast("success", "تم حذف المقالة بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            Toast("error", "حدث خطأ أثناء حذف المقالة");
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

    // console.log(`cou`, cours);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-between items-center gap-2 mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(`/${App_Admin}/blogs`)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800">
                                تعديل المقالة
                            </h1>
                        </div>

                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                            disabled={isLoading || isSubmitting}
                        >
                            <Trash2 size={16} />
                            حذف المقالة
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                            encType="multipart/form-data"
                        >
                            {/* Section */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    القسم*
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("category", {
                                        required: "القسم مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر القسم</option>
                                    {sections?.map((section, index) => (
                                        <option key={index} value={section.id}>
                                            {section.id}) {section.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عنوان المقالة*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: مقالة التحصيلي رياضيات"
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

                            {/* Summary */}
                            <div>
                                <label
                                    htmlFor="summary"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    ملخص المقالة*
                                </label>
                                <textarea
                                    id="summary"
                                    name="summary"
                                    rows={4}
                                    placeholder="مثال: أفضل مقالة في التحصيلي رياضيات"
                                    className={`w-full min-h-20 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none`}
                                    {...register("summary", {
                                        required: "الوصف مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.summary && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.summary.message}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    وصف المقالة*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: أفضل مقالة في التحصيلي رياضيات"
                                    className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 focus:border-blue-500 resize-none`}
                                    {...register("description", {
                                        required: "الوصف مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* techs */}
                            <div>
                                <label
                                    htmlFor="techs"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    علامة*
                                </label>
                                <input
                                    type="text"
                                    id="techs"
                                    name="techs"
                                    placeholder="مثال: مقالة ,التحصيلي ,رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("techs", {
                                        required: "علامة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.techs && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.techs.message}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            {/* <div>
                            <label
                                htmlFor="price"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                سعر المقالة*
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                min={0}
                                placeholder="مثال: 199 أو 0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                {...register("price", {
                                    min: {
                                        value: 0,
                                        message:
                                            "السعر لا يمكن أن يكون أقل من 0",
                                    },
                                    required: "السعر مطلوب",
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.price.message}
                                </p>
                            )}
                        </div> */}

                            {/* Discount */}
                            {/* <div>
                            <label
                                htmlFor="discount"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                الخصم*
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                min={0}
                                placeholder="مثال: 50 أو 0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                {...register("discount", {
                                    required: "الخصم مطلوب",
                                    min: {
                                        value: 0,
                                        message:
                                            "الخصم لا يمكن أن يكون أقل من 0",
                                    },
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.discount && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.discount.message}
                                </p>
                            )}
                        </div> */}

                            {/* Duration */}
                            {/* <div>
                            <label
                                htmlFor="duration"
                                className="block text-lg font-medium text-black mb-2"
                            >
                                مدة المقالة*
                            </label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                placeholder="مثال: 20 ساعة"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                {...register("duration", {
                                    required: "المدة مطلوبة",
                                })}
                                autoComplete="off"
                                disabled={isSubmitting || isLoading}
                                required
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.duration.message}
                                </p>
                            )}
                        </div> */}

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    صورة المقالة
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

                                        <div className="flex text-lg font-medium text-black">
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
                                                        isSubmitting ||
                                                        isLoading
                                                    }
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
                            </div>

                            {/* Image URL */}
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
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.image_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image_url.message}
                                    </p>
                                )}
                            </div>

                            {/* File PDF */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        المقالة PDF
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="file_pdf"
                                        name="file_pdf"
                                        className="hidden"
                                        accept=".pdf"
                                        ref={filePDFInputRef}
                                        {...register("file_pdf", {
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
                                        htmlFor="file_pdf"
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
                                                        {uploadedFilePDF?.name
                                                            ? uploadedFilePDF?.name
                                                            : uploadedFilePDF?.split(
                                                                  "pdf/"
                                                              )[1]}
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

                            {/* File PDF URL */}
                            <div>
                                <label
                                    htmlFor="file_pdf_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط ال PDF
                                </label>
                                <input
                                    type="text"
                                    id="file_pdf_url"
                                    name="file_pdf_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("file_pdf_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.file_pdf_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.file_pdf_url.message}
                                    </p>
                                )}
                            </div>

                            {/* File Word */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        المقالة Word
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="file_word"
                                        name="file_word"
                                        className="hidden"
                                        accept=".doc,.docx,.odt"
                                        ref={fileWordInputRef}
                                        {...register("file_word", {
                                            // validate: validateImageUrl,
                                        })}
                                        onChange={(e) => {
                                            // console.log(`ee`);
                                            handleFileWordUpload(e);
                                        }}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                    <label
                                        htmlFor="file_word"
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        {uploadedFileWord ? (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm w-full">
                                                <div className="flex items-center truncate">
                                                    <FileText
                                                        size={16}
                                                        className={`ml-2 text-blue-500`}
                                                    />
                                                    <span className="text-lg truncate text-blue-500">
                                                        {uploadedFileWord?.name
                                                            ? uploadedFileWord?.name
                                                            : uploadedFileWord?.split(
                                                                  "word/"
                                                              )[1]}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUploadedFileWord(
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

                            {/* File Word URL */}
                            <div>
                                <label
                                    htmlFor="file_word_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط ال Word
                                </label>
                                <input
                                    type="text"
                                    id="file_word_url"
                                    name="file_word_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("file_word_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.file_word_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.file_word_url.message}
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
                                        navigate(`/${App_Admin}/blogs`)
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
                                        : "حفظ التغييرات"}
                                </button>
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
                                هل أنت متأكد من حذف هذه المقالة؟ لا يمكن التراجع
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

export default BlogUpdate;
