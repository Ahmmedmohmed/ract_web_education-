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
    FileText,
    Trash,
} from "lucide-react";

// api
import { adminGetSectionsAdmin } from "../../../../api/admin/authAdmin";
import { publicCreatePowerpoint } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function PowerpointsCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    // State for dynamic fields
    const [features, setFeatures] = useState([""]);
    const [requirements, setRequirements] = useState([""]);
    const [targetAudience, setTargetAudience] = useState([""]);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const filePowerpointInputRef = useRef(null);
    const [uploadedFilePowerpoint, setUploadedFilePowerpoint] = useState(null);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

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

    const handleFilePowerpointUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFilePowerpoint(file);
        // console.log(`file`, file);
    };

    const handleCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            courseData.append("user", userData?.id || null);
            // courseData.append("section", formData.section);

            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");

            //
            courseData.append("price", formData.price_like_saudi);
            courseData.append("discount", formData.discount_like_saudi);

            //
            courseData.append("price_like_egypt", formData.price_like_egypt);
            courseData.append(
                "discount_like_egypt",
                formData.discount_like_egypt
            );

            //
            courseData.append("price_like_saudi", formData.price_like_saudi);
            courseData.append(
                "discount_like_saudi",
                formData.discount_like_saudi
            );

            //
            courseData.append(
                "price_like_america",
                formData.price_like_america
            );
            courseData.append(
                "discount_like_america",
                formData.discount_like_america
            );

            if (imageFile) courseData.append("image", imageFile);
            courseData.append("image_url", formData.image_url || "");
            courseData.append("is_visible", isVisible);

            if (uploadedFilePowerpoint)
                courseData.append("file_powerpoint", uploadedFilePowerpoint);
            courseData.append(
                "file_powerpoint_url",
                formData.file_powerpoint_url
            );

            const { data, error } = await publicCreatePowerpoint(courseData);

            // console.log(`formData`, formData);
            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            // }
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
                Toast("success", "تم إنشاء البوربوينت بنجاح");
                navigate(`/${App_Admin}/powerpoints`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء البوربوينت");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchSections = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await adminGetSectionsAdmin();

                // console.log(`error`, error);
                // console.log(`data`, data);

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
        // fetchSections();
    }, []);

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
                                navigate(`/${App_Admin}/powerpoints`)
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة بوربوينت جديدة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Section */}
                            {/* <div>
                                <label
                                    htmlFor="section"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    القسم*
                                </label>
                                <select
                                    id="section"
                                    name="section"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("section", {
                                        required: "القسم مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                >
                                    <option value="">اختر القسم</option>
                                    {sections?.map((section, index) => (
                                        <option key={index} value={section.id}>
                                            {section.id}) ({section.title})
                                        </option>
                                    ))}
                                </select>
                                {errors.section && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.section.message}
                                    </p>
                                )}
                            </div> */}

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عنوان البوربوينت*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: بوربوينت التحصيلي رياضيات"
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

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    وصف البوربوينت*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: أفضل بوربوينت في التحصيلي رياضيات"
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

                            {/* Price Like Egypt */}
                            <div>
                                <label
                                    htmlFor="price_like_egypt"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    سعر البوربوينت في الدول مثل مصر*
                                </label>
                                <input
                                    type="number"
                                    id="price_like_egypt"
                                    name="price_like_egypt"
                                    min={0}
                                    placeholder="مثال: 199 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("price_like_egypt", {
                                        required: "السعر مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "السعر لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.price_like_egypt && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.price_like_egypt.message}
                                    </p>
                                )}
                            </div>

                            {/* Discount Like Egypt */}
                            <div>
                                <label
                                    htmlFor="discount_like_egypt"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الخصم في الدول مثل مصر*
                                </label>
                                <input
                                    type="number"
                                    id="discount_like_egypt"
                                    name="discount_like_egypt"
                                    min={0}
                                    placeholder="مثال: 50 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("discount_like_egypt", {
                                        required: "الخصم مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "الخصم لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                        validate: (value) => {
                                            const price =
                                                getValues().price_like_egypt;
                                            // إذا كان السعر والخصم صفرًا، نسمح بذلك
                                            if (+price === 0 && +value === 0)
                                                return true;
                                            // إذا كان الخصم أكبر من السعر، نرفض
                                            if (+value > +price)
                                                return "الخصم لا يمكن ان يكون اكبر من السعر.";
                                            return true;
                                        },
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.discount_like_egypt && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.discount_like_egypt.message}
                                    </p>
                                )}
                            </div>

                            {/* Price Like Saudi */}
                            <div>
                                <label
                                    htmlFor="price_like_saudi"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    سعر البوربوينت في الدول مثل السعودية*
                                </label>
                                <input
                                    type="number"
                                    id="price_like_saudi"
                                    name="price_like_saudi"
                                    min={0}
                                    placeholder="مثال: 199 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("price_like_saudi", {
                                        required: "السعر مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "السعر لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.price_like_saudi && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.price_like_saudi.message}
                                    </p>
                                )}
                            </div>

                            {/* Discount Like Saudi */}
                            <div>
                                <label
                                    htmlFor="discount_like_saudi"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الخصم في الدول مثل السعودية*
                                </label>
                                <input
                                    type="number"
                                    id="discount_like_saudi"
                                    name="discount_like_saudi"
                                    min={0}
                                    placeholder="مثال: 50 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("discount_like_saudi", {
                                        required: "الخصم مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "الخصم لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                        validate: (value) => {
                                            const price =
                                                getValues().price_like_saudi;
                                            if (+price === 0 && +value === 0)
                                                return true;
                                            if (+value > +price)
                                                return "الخصم لا يمكن ان يكون اكبر من السعر.";
                                            return true;
                                        },
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.discount_like_saudi && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.discount_like_saudi.message}
                                    </p>
                                )}
                            </div>

                            {/* Price Like America */}
                            <div>
                                <label
                                    htmlFor="price_like_america"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    سعر البوربوينت في الدول مثل أمريكا*
                                </label>
                                <input
                                    type="number"
                                    id="price_like_america"
                                    name="price_like_america"
                                    min={0}
                                    placeholder="مثال: 199 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("price_like_america", {
                                        required: "السعر مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "السعر لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.price_like_america && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.price_like_america.message}
                                    </p>
                                )}
                            </div>

                            {/* Discount Like America */}
                            <div>
                                <label
                                    htmlFor="discount_like_america"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الخصم في الدول مثل أمريكا*
                                </label>
                                <input
                                    type="number"
                                    id="discount_like_america"
                                    name="discount_like_america"
                                    min={0}
                                    placeholder="مثال: 50 أو 0"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("discount_like_america", {
                                        required: "الخصم مطلوب",
                                        min: {
                                            value: 0,
                                            message:
                                                "الخصم لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                        validate: (value) => {
                                            const price =
                                                getValues().price_like_america;
                                            if (+price === 0 && +value === 0)
                                                return true;
                                            if (+value > +price)
                                                return "الخصم لا يمكن ان يكون اكبر من السعر.";
                                            return true;
                                        },
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.discount_like_america && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.discount_like_america.message}
                                    </p>
                                )}
                            </div>

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    صورة البوربوينت
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
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image.message}
                                    </p>
                                )}
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

                            {/* File Powerpoint */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        ملف البوربوينت
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="file_powerpoint"
                                        name="file_powerpoint"
                                        className="hidden"
                                        accept=".ppt,.pptx,.odp"
                                        ref={filePowerpointInputRef}
                                        {...register("file_powerpoint", {
                                            // validate: validateImageUrl,
                                        })}
                                        onChange={(e) => {
                                            // console.log(`ee`);
                                            handleFilePowerpointUpload(e);
                                        }}
                                        autoComplete="off"
                                        disabled={isSubmitting || isLoading}
                                    />
                                    <label
                                        htmlFor="file_powerpoint"
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        {uploadedFilePowerpoint ? (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm w-full">
                                                <div className="flex items-center truncate">
                                                    <FileText
                                                        size={16}
                                                        className={`ml-2 text-blue-500`}
                                                    />
                                                    <span
                                                        className={`text-lg truncate text-blue-500`}
                                                    >
                                                        {
                                                            uploadedFilePowerpoint.name
                                                        }
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUploadedFilePowerpoint(
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

                            {/* File Powerpoint URL */}
                            <div>
                                <label
                                    htmlFor="file_powerpoint_url"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    رابط البوربوينت
                                </label>
                                <input
                                    type="text"
                                    id="file_powerpoint_url"
                                    name="file_powerpoint_url"
                                    placeholder="مثال: https://example.com/image.jpg"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("file_powerpoint_url", {
                                        // validate: validateImageUrl,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.file_powerpoint_url && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.file_powerpoint_url.message}
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
                                        navigate(`/${App_Admin}/powerpoints`)
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
                                        : "حفظ البوربوينت"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PowerpointsCreate;
