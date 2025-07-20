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
import { adminGetSectionsAdmin } from "../../../../api/admin/authAdmin";
import {
    publicGetCourseById,
    publicUpdateCourse,
    publicDeleteCourse,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function AdminCourseUpdate() {
    const { courseId } = useParams();

    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [course, setCourse] = useState([]);
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

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchSections = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await adminGetSectionsAdmin();

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

                const { data, error } = await publicGetCourseById(courseId);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/${App_Admin}/courses`);
                } else {
                    setCourse(data);

                    // Set form values
                    setValue("usser", data.user?.id || "");
                    setValue("section", data.section || "");

                    setValue("title", data.title);
                    setValue("description", data.description);
                    setValue("duration", data.duration);
                    setValue("tag", data.tag || "");

                    //
                    setValue("price", data.price_like_saudi);
                    setValue("discount", data.discount_like_saudi);

                    //
                    setValue("price_like_egypt", data.price_like_egypt);
                    setValue("discount_like_egypt", data.discount_like_egypt);

                    setValue("price_like_saudi", data.price_like_saudi);
                    setValue("discount_like_saudi", data.discount_like_saudi);

                    setValue("price_like_america", data.price_like_america);
                    setValue(
                        "discount_like_america",
                        data.discount_like_america
                    );

                    setValue("status", data.status || "");
                    setValue("level", data.level || "");
                    setValue("language", data.language || "");

                    setValue("number_old_enrolled", data.number_old_enrolled);

                    setValue("image_url", data.image_url || "");

                    if (data.table_contents && data.table_contents.length > 0) {
                        setUploadedFiles(
                            data.table_contents.map((file) => ({
                                id: file.id,
                                name: file.name,
                                url: file.url,
                            }))
                        );
                    }

                    setIsVisible(data.is_visible);

                    if (data.image) {
                        setImagePreview(data.image);
                    } else if (data.image_url) {
                        setImagePreview(data.image_url);
                    }

                    // Set dynamic fields
                    if (data.features && data.features.length > 0) {
                        setFeatures(data.features);
                    }
                    if (data.requirements && data.requirements.length > 0) {
                        setRequirements(data.requirements);
                    }
                    if (
                        data.target_audience &&
                        data.target_audience.length > 0
                    ) {
                        setTargetAudience(data.target_audience);
                    }
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/${App_Admin}/courses`);
            } finally {
                setIsLoading(false);
            }
        };

        // if (courseId) {
        //     fetchCourse();
        // }
        fetchCourse();
    }, [courseId, navigate, setValue, sections]);

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

    // Files
    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: `file-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
                url: URL.createObjectURL(file),
            }));
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleDeleteFile = (fileId) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
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
            // courseData.append("user", formData.user || null);
            courseData.append("section", formData.section);

            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");
            courseData.append("duration", formData.duration);

            //
            courseData.append("price", formData.price_like_saudi);
            courseData.append("discount", formData.discount_like_saudi);

            //
            courseData.append("price_like_egypt", formData.price_like_egypt);
            courseData.append(
                "discount_like_egypt",
                formData.discount_like_egypt
            );

            courseData.append("price_like_saudi", formData.price_like_saudi);
            courseData.append(
                "discount_like_saudi",
                formData.discount_like_saudi
            );

            courseData.append(
                "price_like_america",
                formData.price_like_america
            );
            courseData.append(
                "discount_like_america",
                formData.discount_like_america
            );

            courseData.append("tag", formData.tag || "");
            courseData.append("status", formData.status);
            courseData.append("level", formData.level);
            courseData.append("language", formData.language);

            courseData.append(
                "number_old_enrolled",
                formData.number_old_enrolled
            );

            if (imageFile) courseData.append("image", imageFile);
            courseData.append("image_url", formData.image_url || "");

            courseData.append("is_visible", isVisible);

            // Add dynamic fields as JSON strings
            courseData.append("features", JSON.stringify(features));
            courseData.append("requirements", JSON.stringify(requirements));
            courseData.append(
                "target_audience",
                JSON.stringify(targetAudience)
            );

            // تحويل الملفات إلى Base64
            const filesBase64 = await Promise.all(
                uploadedFiles.map((file) => {
                    if (file.file) {
                        // Only convert new files
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () =>
                                resolve({
                                    id: file.id,
                                    name: file.name,
                                    type: file.type,
                                    content: reader.result,
                                });
                            reader.onerror = reject;
                            reader.readAsDataURL(file.file);
                        });
                    }
                    return file; // Return existing files as is
                })
            );

            courseData.append("table_contents", JSON.stringify(filesBase64));

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            // }

            const { data, error } = await publicUpdateCourse(
                courseId,
                courseData
            );

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
                Toast("success", "تم تحديث الدورة بنجاح");
                navigate(`/${App_Admin}/courses`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            Toast("error", "حدث خطأ أثناء تحديث الدورة");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await publicDeleteCourse(courseId);

            if (error) {
                Toast("error", error.message);
            } else {
                Toast("success", "تم حذف الدورة بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            Toast("error", "حدث خطأ أثناء حذف الدورة");
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

    // console.log(`course`, course);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-between items-center gap-2 mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    navigate(`/${App_Admin}/courses`)
                                }
                                className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800">
                                تعديل الدورة
                            </h1>
                        </div>

                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                            disabled={isLoading || isSubmitting}
                        >
                            <Trash2 size={16} />
                            حذف الدورة
                        </button>
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
                                            {section.id}) {section.title}
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
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    الحالة
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("status")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
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
                            </div>

                            {/* level */}
                            <div>
                                <label
                                    htmlFor="level"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    المستوي
                                </label>
                                <select
                                    id="level"
                                    name="level"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("level")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                >
                                    <option value="">اختر المستوي</option>
                                    <option value="beginner">مبتدئ</option>
                                    <option value="intermediate">متوسط</option>
                                    <option value="advanced">متقدم</option>
                                    <option value="comprehensive">شامل</option>
                                </select>
                                {errors.level && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.level.message}
                                    </p>
                                )}
                            </div>

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

                            {/* language */}
                            <div>
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
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("language")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.language && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.language.message}
                                    </p>
                                )}
                            </div>

                            {/* Tag */}
                            <div>
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
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("tag")}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                />
                                {errors.tag && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.tag.message}
                                    </p>
                                )}
                            </div>

                            {/* Number Old Enrolled */}
                            <div>
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
                            </div>

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

                            {/* uploaded_files */}
                            <div className="border-t border-gray-200 pt-4 mt-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        جدول المتحويات
                                    </h4>
                                </div>

                                <div className="border-2 border-dashed rounded-lg p-4 mb-3 border-gray-400">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        name="file-upload"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        disabled={isSubmitting}
                                        autoComplete="off"
                                        multiple
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        <Upload
                                            size={24}
                                            className="text-gray-400 mb-2"
                                        />
                                        <span
                                            className={`text-sm font-medium text-blue-600`}
                                        >
                                            اختر ملفات للرفع
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            يمكنك اختيار عدة ملفات في نفس الوقت
                                        </span>
                                    </label>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-2 my-2">
                                        <h5 className="text-black text-md font-medium mt-5 mb-2">
                                            الملفات المختارة:
                                        </h5>

                                        <div className="flex flex-col gap-4">
                                            {uploadedFiles?.map(
                                                (file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-2 bg-gray-50 border border-gray-400 rounded shadow-sm"
                                                    >
                                                        <div className="flex items-center truncate">
                                                            <FileText
                                                                size={16}
                                                                className={`ml-2 text-blue-500`}
                                                            />
                                                            <span
                                                                className={`text-sm truncate text-blue-500`}
                                                            >
                                                                {file.name}
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteFile(
                                                                    file.id
                                                                )
                                                            }
                                                            className="p-1 text-gray-500 hover:text-red-600 rounded"
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div>
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
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
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
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة ميزة جديدة</span>
                                </button>
                            </div>

                            {/* Requirements */}
                            <div>
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
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
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
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة متطلب جديد</span>
                                </button>
                            </div>

                            {/* Target Audience */}
                            <div>
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
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-500 outline-0`}
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
                                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Plus size={16} />
                                    <span>إضافة فئة مستهدفة جديدة</span>
                                </button>
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
                                        navigate(`/${App_Admin}/courses`)
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
                                هل أنت متأكد من حذف هذه الدورة؟ لا يمكن التراجع
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

export default AdminCourseUpdate;
