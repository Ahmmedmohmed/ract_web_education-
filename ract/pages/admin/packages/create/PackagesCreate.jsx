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
import {
    publicCreatePackages,
    publicGetCoursesAdmin,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_Admin,
    namecurrency,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function PackagesCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");

    const [isVisible, setIsVisible] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);

    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [packageCourses, setPackageCourses] = useState([]);
    const [totalPrices, setTotalPrices] = useState({
        egypt: 0,
        saudi: 0,
        america: 0,
    });
    const [discountedPrices, setDiscountedPrices] = useState({
        egypt: 0,
        saudi: 0,
        america: 0,
    });

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
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const discountValues = {
        egypt: watch("discount_egypt", 0),
        saudi: watch("discount_saudi", 0),
        america: watch("discount_america", 0),
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await publicGetCoursesAdmin(
                    currentPage
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب الدورات"
                    );
                } else {
                    setCourses(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
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
        fetchCourses();
    }, [currentPage]);

    useEffect(() => {
        // حساب الأسعار الإجمالية لكل دولة عند تغيير الكورسات المختارة
        const calculateTotalPrices = () => {
            let sumEgypt = 0;
            let sumSaudi = 0;
            let sumAmerica = 0;

            packageCourses.forEach((course) => {
                sumEgypt += parseFloat(
                    course.price_after_discount_egypt ||
                        course.price_like_egypt ||
                        0
                );
                sumSaudi += parseFloat(
                    course.price_after_discount_saudi ||
                        course.price_like_saudi ||
                        0
                );
                sumAmerica += parseFloat(
                    course.price_after_discount_america ||
                        course.price_like_america ||
                        0
                );
            });

            setTotalPrices({
                egypt: sumEgypt,
                saudi: sumSaudi,
                america: sumAmerica,
            });

            setValue("price_like_egypt", sumEgypt.toFixed(2));
            setValue("price_like_saudi", sumSaudi.toFixed(2));
            setValue("price_like_america", sumAmerica.toFixed(2));

            calculateDiscountedPrices(sumEgypt, sumSaudi, sumAmerica);
        };

        if (packageCourses.length > 0) {
            calculateTotalPrices();
        } else {
            setTotalPrices({
                egypt: 0,
                saudi: 0,
                america: 0,
            });
            setValue("price_like_egypt", "0");
            setValue("price_like_saudi", "0");
            setValue("price_like_america", "0");
            setDiscountedPrices({
                egypt: 0,
                saudi: 0,
                america: 0,
            });
        }
    }, [packageCourses, setValue]);

    useEffect(() => {
        // حساب الأسعار بعد الخصم لكل دولة عند تغيير نسب الخصم
        calculateDiscountedPrices(
            totalPrices.egypt,
            totalPrices.saudi,
            totalPrices.america
        );
    }, [
        discountValues.egypt,
        discountValues.saudi,
        discountValues.america,
        totalPrices,
    ]);

    const calculateDiscountedPrices = (
        egyptPrice,
        saudiPrice,
        americaPrice
    ) => {
        const discountAmountEgypt = egyptPrice * (discountValues.egypt / 100);
        const discountAmountSaudi = saudiPrice * (discountValues.saudi / 100);
        const discountAmountAmerica =
            americaPrice * (discountValues.america / 100);

        setDiscountedPrices({
            egypt: egyptPrice - discountAmountEgypt,
            saudi: saudiPrice - discountAmountSaudi,
            america: americaPrice - discountAmountAmerica,
        });
    };

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

    const handleCourseSelection = (course) => {
        setPackageCourses((prev) => {
            const existingCourseIndex = prev.findIndex(
                (c) => c.id === course.id
            );
            if (existingCourseIndex >= 0) {
                return prev.filter((c) => c.id !== course.id);
            } else {
                return [...prev, course];
            }
        });
    };

    const handleCourseSubmit = async (formData) => {
        try {
            setIsLoading(true);

            if (packageCourses.length === 0) {
                Toast("error", "يجب اختيار كورس واحد على الأقل");
                return;
            }

            const courseData = new FormData();
            courseData.append("user", userData?.id || null);
            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");

            // الأسعار لكل دولة
            courseData.append("price_like_egypt", formData.price_like_egypt);
            courseData.append("discount_like_egypt", formData.discount_egypt);

            courseData.append("price_like_saudi", formData.price_like_saudi);
            courseData.append("discount_like_saudi", formData.discount_saudi);

            courseData.append(
                "price_like_america",
                formData.price_like_america
            );
            courseData.append(
                "discount_like_america",
                formData.discount_america
            );

            if (imageFile) courseData.append("image", imageFile);
            courseData.append("image_url", formData.image_url || "");

            courseData.append("is_visible", isVisible);
            courseData.append("is_admin", isAdmin);

            // إرسال ids الكورسات فقط بدلاً من الكورسات كاملة
            const courseIds = packageCourses.map((course) => course.id);
            courseData.append("courses", JSON.stringify(courseIds));

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            const { data, error } = await publicCreatePackages(courseData);

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
                Toast("success", "تم إنشاء الباقة بنجاح");
                navigate(`/${App_Admin}/packages`);
            }
        } catch (error) {
            console.error("Error creating course:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الباقة");
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

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => navigate(`/${App_Admin}/packages`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة باقة جديدة
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCourseSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    عنوان الباقة*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: باقة التحصيلي رياضيات"
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
                                    وصف الباقة*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: أفضل باقة في التحصيلي رياضيات"
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

                            {/* Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-lg font-bold mb-2 text-black"
                                >
                                    صورة الباقة
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

                            {/* Price Section */}
                            <div className="space-y-8 mt-8 border-t border-gray-300 py-4">
                                {/* مصر */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر الإجمالي (مصر)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span>
                                                    {totalPrices.egypt.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({packageCourses.length}{" "}
                                                    كورسات)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="discount_egypt"
                                            className="block text-lg font-medium text-black mb-2"
                                        >
                                            نسبة الخصم % (مصر)
                                        </label>
                                        <input
                                            type="number"
                                            id="discount_egypt"
                                            name="discount_egypt"
                                            min={0}
                                            max={100}
                                            placeholder="مثال: 20"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                            {...register("discount_egypt", {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أقل من 0",
                                                },
                                                max: {
                                                    value: 100,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أكثر من 100",
                                                },
                                                value: 0,
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        {errors.discount_egypt && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.discount_egypt.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر بعد الخصم (مصر)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={`font-bold text-blue-600`}
                                                >
                                                    {discountedPrices.egypt.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                {discountValues.egypt > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                        وفرت{" "}
                                                        {(
                                                            totalPrices.egypt -
                                                            discountedPrices.egypt
                                                        ).toFixed(2)}{" "}
                                                        {namecurrency}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* السعودية */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر الإجمالي (السعودية)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span>
                                                    {totalPrices.saudi.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({packageCourses.length}{" "}
                                                    كورسات)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="discount_saudi"
                                            className="block text-lg font-medium text-black mb-2"
                                        >
                                            نسبة الخصم % (السعودية)
                                        </label>
                                        <input
                                            type="number"
                                            id="discount_saudi"
                                            name="discount_saudi"
                                            min={0}
                                            max={100}
                                            placeholder="مثال: 20"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                            {...register("discount_saudi", {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أقل من 0",
                                                },
                                                max: {
                                                    value: 100,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أكثر من 100",
                                                },
                                                value: 0,
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        {errors.discount_saudi && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.discount_saudi.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر بعد الخصم (السعودية)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={`font-bold text-blue-600`}
                                                >
                                                    {discountedPrices.saudi.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                {discountValues.saudi > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                        وفرت{" "}
                                                        {(
                                                            totalPrices.saudi -
                                                            discountedPrices.saudi
                                                        ).toFixed(2)}{" "}
                                                        {namecurrency}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* أمريكا */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر الإجمالي (أمريكا)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span>
                                                    {totalPrices.america.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({packageCourses.length}{" "}
                                                    كورسات)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="discount_america"
                                            className="block text-lg font-medium text-black mb-2"
                                        >
                                            نسبة الخصم % (أمريكا)
                                        </label>
                                        <input
                                            type="number"
                                            id="discount_america"
                                            name="discount_america"
                                            min={0}
                                            max={100}
                                            placeholder="مثال: 20"
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                            {...register("discount_america", {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أقل من 0",
                                                },
                                                max: {
                                                    value: 100,
                                                    message:
                                                        "الخصم لا يمكن أن يكون أكثر من 100",
                                                },
                                                value: 0,
                                            })}
                                            autoComplete="off"
                                            disabled={isSubmitting || isLoading}
                                        />
                                        {errors.discount_america && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    errors.discount_america
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <span className="block text-lg font-medium text-black mb-2">
                                            السعر بعد الخصم (أمريكا)
                                        </span>
                                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={`font-bold text-blue-600`}
                                                >
                                                    {discountedPrices.america.toFixed(
                                                        2
                                                    )}{" "}
                                                    {namecurrency}
                                                </span>
                                                {discountValues.america > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                        وفرت{" "}
                                                        {(
                                                            totalPrices.america -
                                                            discountedPrices.america
                                                        ).toFixed(2)}{" "}
                                                        {namecurrency}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hidden Price Fields for Form Submission */}
                            <input
                                type="hidden"
                                {...register("price_like_egypt")}
                            />
                            <input
                                type="hidden"
                                {...register("price_like_saudi")}
                            />
                            <input
                                type="hidden"
                                {...register("price_like_america")}
                            />

                            {/* Selected Courses */}
                            <div className="mb-4">
                                <span className="block text-lg font-medium text-black mb-2">
                                    الكورسات المختارة ({packageCourses.length})
                                </span>
                                {packageCourses.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {packageCourses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="bg-gray-100 px-3 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer border border-gray-300"
                                            >
                                                <span>{course.title}</span>
                                                <div className="flex gap-1 text-sm">
                                                    <span className="text-blue-600">
                                                        مصر:{" "}
                                                        {course.price_after_discount_egypt ||
                                                            course.price_like_egypt}{" "}
                                                        {namecurrency}
                                                    </span>
                                                    <span className="text-green-600">
                                                        السعودية:{" "}
                                                        {course.price_after_discount_saudi ||
                                                            course.price_like_saudi}{" "}
                                                        {namecurrency}
                                                    </span>
                                                    <span className="text-purple-600">
                                                        أمريكا:{" "}
                                                        {course.price_after_discount_america ||
                                                            course.price_like_america}{" "}
                                                        {namecurrency}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCourseSelection(
                                                            course
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        لم يتم اختيار أي كورسات بعد
                                    </p>
                                )}
                            </div>

                            {/* Available Courses */}
                            <div>
                                <span className="block text-lg font-medium text-black mb-2">
                                    اختر الكورسات المطلوبة
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {courses?.map((course) => (
                                        <div
                                            key={course.id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                packageCourses.some(
                                                    (c) => c.id === course.id
                                                )
                                                    ? `border-blue-500 bg-blue-50`
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() =>
                                                handleCourseSelection(course)
                                            }
                                        >
                                            <div className="flex items-start gap-4">
                                                {course.image_url ? (
                                                    <img
                                                        src={course.image_url}
                                                        alt={course.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                                        <FileText
                                                            size={24}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-800">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {course.description}
                                                    </p>
                                                    <div className="mt-2 space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-blue-600 text-sm">
                                                                مصر:{" "}
                                                                {course.price_after_discount_egypt ||
                                                                    course.price_like_egypt}{" "}
                                                                {namecurrency}
                                                            </span>
                                                            {course.discount_like_egypt >
                                                                0 && (
                                                                <span className="text-xs text-gray-500 line-through">
                                                                    {
                                                                        course.price_like_egypt
                                                                    }{" "}
                                                                    {
                                                                        namecurrency
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-green-600 text-sm">
                                                                السعودية:{" "}
                                                                {course.price_after_discount_saudi ||
                                                                    course.price_like_saudi}{" "}
                                                                {namecurrency}
                                                            </span>
                                                            {course.discount_like_saudi >
                                                                0 && (
                                                                <span className="text-xs text-gray-500 line-through">
                                                                    {
                                                                        course.price_like_saudi
                                                                    }{" "}
                                                                    {
                                                                        namecurrency
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-purple-600 text-sm">
                                                                أمريكا:{" "}
                                                                {course.price_after_discount_america ||
                                                                    course.price_like_america}{" "}
                                                                {namecurrency}
                                                            </span>
                                                            {course.discount_like_america >
                                                                0 && (
                                                                <span className="text-xs text-gray-500 line-through">
                                                                    {
                                                                        course.price_like_america
                                                                    }{" "}
                                                                    {
                                                                        namecurrency
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                        navigate(`/${App_Admin}/packages`)
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
                                        : "حفظ الباقة"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PackagesCreate;
