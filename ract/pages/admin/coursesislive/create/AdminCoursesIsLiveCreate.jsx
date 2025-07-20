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
} from "lucide-react";

// api
import { adminGetSectionsAdmin } from "../../../../api/admin/authAdmin";
import { publicCreateCourse } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function AdminCoursesIsLiveCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [isLive, setIsLive] = useState(true);

    // State for dynamic fields
    const [features, setFeatures] = useState([""]);
    const [requirements, setRequirements] = useState([""]);
    const [targetAudience, setTargetAudience] = useState([""]);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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

    const handleCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();
            courseData.append("user", userData?.id || null);
            courseData.append("section", formData.section);

            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");
            courseData.append("duration", formData.duration);

            // courseData.append(
            //     "number_old_enrolled",
            //     formData.number_old_enrolled
            // );

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

            courseData.append("start_data", formData.start_data);
            courseData.append("end_data", formData.end_data);
            courseData.append("time_at", formData.time_at);

            // courseData.append("tag", formData.tag || "");

            if (imageFile) courseData.append("image", imageFile);
            courseData.append("image_url", formData.image_url || "");
            courseData.append("is_visible", isVisible);
            courseData.append("is_live", isLive);

            // courseData.append("status", formData.status);
            // courseData.append("level", formData.level);
            // courseData.append("language", formData.language);

            // Add dynamic fields (filter out empty values)
            // features
            //     .filter((item) => item.trim() !== "")
            //     .forEach((feature, index) => {
            //         courseData.append(`features[${index}]`, feature);
            //     });

            // requirements
            //     .filter((item) => item.trim() !== "")
            //     .forEach((requirement, index) => {
            //         courseData.append(`requirements[${index}]`, requirement);
            //     });

            // targetAudience
            //     .filter((item) => item.trim() !== "")
            //     .forEach((audience, index) => {
            //         courseData.append(`target_audience[${index}]`, audience);
            //     });

            //
            // courseData.append("features", JSON.stringify(features));
            // courseData.append("requirements", JSON.stringify(requirements));
            // courseData.append(
            //     "target_audience",
            //     JSON.stringify(targetAudience)
            // );

            const { data, error } = await publicCreateCourse(courseData);

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
                Toast("success", "تم إنشاء الدورة بنجاح");
                navigate(`/${App_Admin}/coursesislive`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الدورة");
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
        fetchSections();
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
                                navigate(`/${App_Admin}/coursesislive`)
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة دورة مباشرة جديدة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Section */}
                            <div>
                                <label
                                    htmlFor="section"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    القسم*
                                </label>
                                <select
                                    id="section"
                                    name="section"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
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
                            </div>

                            {/* status */}
                            {/* <div>
                                <label
                                    htmlFor="status"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الحالة
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("status", {
                                        // required: "الحالة مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                >
                                    <option value="">اختر الحالة</option>
                                    <option value="in_progress">
                                        جاري العمل
                                    </option>
                                    <option value="updated">يتم التحديث</option>
                                    <option value="complete">مكتمل</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.status.message}
                                    </p>
                                )}
                            </div> */}

                            {/* level */}
                            {/* <div>
                                <label
                                    htmlFor="level"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    المستوي
                                </label>
                                <select
                                    id="level"
                                    name="level"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("level", {
                                        // required: "القسم مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                >
                                    <option value="">اختر المستوي</option>
                                    <option value="beginner">مبتدئ</option>
                                    <option value="intermediate">متوسط</option>
                                    <option value="advanced">متقدم</option>
                                </select>
                                {errors.level && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.level.message}
                                    </p>
                                )}
                            </div> */}

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عنوان الدورة*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: دورة التحصيلي رياضيات"
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
                                    وصف الدورة*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: أفضل دورة في التحصيلي رياضيات"
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
                                    سعر الدورة في الدول مثل مصر*
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
                                    سعر الدورة في الدول مثل السعودية*
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
                                    سعر الدورة في الدول مثل أمريكا*
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

                            {/* Duration */}
                            <div>
                                <label
                                    htmlFor="duration"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    مدة الدورة*
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="مثال: 20 ساعة"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
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
                            </div>

                            {/* Start Data */}
                            <div>
                                <label
                                    htmlFor="start_data"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    يوم بداية الدورة
                                </label>
                                <input
                                    type="date"
                                    id="start_data"
                                    name="start_data"
                                    placeholder="مثال: دورة التحصيلي رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("start_data", {
                                        // required: "الوقت مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                />
                                {errors.start_data && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.start_data.message}
                                    </p>
                                )}
                            </div>

                            {/* End Data */}
                            <div>
                                <label
                                    htmlFor="end_data"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    يوم نهاية الدورة
                                </label>
                                <input
                                    type="date"
                                    id="end_data"
                                    name="end_data"
                                    placeholder="مثال: دورة التحصيلي رياضيات"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("end_data", {
                                        required: "العنوان مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.end_data && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.end_data.message}
                                    </p>
                                )}
                            </div>

                            {/* Time At */}
                            <div>
                                <label
                                    htmlFor="time_at"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    وقت بداء الدورة*
                                </label>
                                <input
                                    type="text"
                                    id="time_at"
                                    name="time_at"
                                    placeholder="مثال: الساعة 6 مساء بتوقيت مصر"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("time_at", {
                                        required: "العنوان مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.time_at && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.time_at.message}
                                    </p>
                                )}
                            </div>

                            {/* Number Old Enrolled */}
                            {/* <div>
                                <label
                                    htmlFor="number_old_enrolled"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عدد المشتركين القدماء
                                </label>
                                <input
                                    type="number"
                                    id="number_old_enrolled"
                                    name="number_old_enrolled"
                                    placeholder="مثال: 50"
                                    min={0}
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("number_old_enrolled", {
                                        //
                                        min: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.number_old_enrolled && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.number_old_enrolled.message}
                                    </p>
                                )}
                            </div> */}

                            {/* language */}
                            {/* <div>
                                <label
                                    htmlFor="language"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    اللغة
                                </label>
                                <input
                                    type="text"
                                    id="language"
                                    name="language"
                                    placeholder="مثال: اللغة العربية"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("language")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.language && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.language.message}
                                    </p>
                                )}
                            </div> */}

                            {/* Tag */}
                            {/* <div>
                                <label
                                    htmlFor="tag"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    علامة مميزة
                                </label>
                                <input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    placeholder="مثال: الأكثر شهرة"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("tag")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.tag && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.tag.message}
                                    </p>
                                )}
                            </div> */}

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
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

                            {/* Features */}
                            {/* <div>
                                <label
                                    htmlFor="features"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    مميزات الدورة
                                </label>
                                {features?.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `features${index}`
                                                    : `features`
                                            }
                                            name={
                                                index > 0
                                                    ? `features${index}`
                                                    : `features`
                                            }
                                            placeholder="مثال: دروس فيديوهات عالية الجودة"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0"
                                            value={feature}
                                            onChange={(e) => {
                                                handleFeatureChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeFeature(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                features.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2"
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة ميزة جديدة</span>
                                </button>
                            </div> */}

                            {/* Requirements */}
                            {/* <div>
                                <label
                                    htmlFor="requirements"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    متطلبات الدورة
                                </label>
                                {requirements?.map((requirement, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `requirements${index}`
                                                    : `requirements`
                                            }
                                            name={
                                                index > 0
                                                    ? `requirements${index}`
                                                    : `requirements`
                                            }
                                            placeholder="مثال: المعرفة الأساسية بمبادئ الرياضيات"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0"
                                            value={requirement}
                                            onChange={(e) => {
                                                handleRequirementChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeRequirement(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                requirements.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addRequirement}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2"
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة متطلب جديد</span>
                                </button>
                            </div> */}

                            {/* Target Audience */}
                            {/* <div>
                                <label
                                    htmlFor="audience"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    ما الذي ستتعلمه
                                </label>
                                {targetAudience?.map((audience, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            id={
                                                index > 0
                                                    ? `audience${index}`
                                                    : `audience`
                                            }
                                            name={
                                                index > 0
                                                    ? `audience${index}`
                                                    : `audience`
                                            }
                                            placeholder="مثال: تحسين الحساب في الرياضيات"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0"
                                            value={audience}
                                            onChange={(e) => {
                                                handleTargetAudienceChange(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeTargetAudience(index);
                                            }}
                                            className="p-1 text-red-500 hover:text-red-700 border rounded-full"
                                            disabled={
                                                targetAudience.length === 1 ||
                                                isSubmitting ||
                                                isLoading
                                            }
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addTargetAudience}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2"
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة فئة مستهدفة جديدة</span>
                                </button>
                            </div> */}

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
                                        navigate(`/${App_Admin}/coursesislive`)
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
                                        : "حفظ الدورة"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCoursesIsLiveCreate;
