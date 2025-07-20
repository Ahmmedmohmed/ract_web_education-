/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight, Upload, Plus, X } from "lucide-react";

// api
import { adminProfileUpdate } from "../../../../../api/admin/authAdmin";
import { setProfileAuthUser } from "../../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../../store/UserDataStore";

// plugin
import Toast from "../../../../../plugin/Toast";

// hooks
import { useMoveBack } from "../../../../../hooks/useMoveBack";

// utils
import {
    App_Admin,
    nameMainColor,
    SERVER_URL,
} from "../../../../../utils/constants";

function UpdateProfile() {
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");

    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    let { userData, userProfile } = UserDataStore();
    let userId = userData?.id;
    let userImage = userProfile?.image;

    // console.log(`eee`, userProfile);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            bio: userProfile?.bio || "",
            phone_number: userProfile?.phone_number || "",
            gender: userProfile?.gender || "",
            age: userProfile?.age || "",
        },
    });

    useEffect(() => {
        // // عرض الصورة الحالية عند تحميل المكون
        // if (userImage) {
        //     if (userImage.includes("/media/user/default-user.png")) {
        //         console.log(`www--->`, userImage);
        //         setImagePreview(`${SERVER_URL}${userImage}`);
        //     } else {
        //         setImagePreview(
        //             userImage.startsWith("http")
        //                 ? userImage
        //                 : `${SERVER_URL}${userImage}`
        //         );
        //     }
        // }
        // عرض الصورة الحالية عند تحميل المكون
        if (userImage && userImage.startsWith("/media/user/")) {
            setImagePreview(`${SERVER_URL}${userImage}`);
        } else {
            setImagePreview(userImage);
            // setImagePreview(`${SERVER_URL}${userImage}`);
        }
    }, [userImage]);

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

    const handleAgeInput = (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    };

    const handleUpdateProfile = async (formData) => {
        try {
            setIsLoading(true);
            setErrorsMessage("");

            // إعداد بيانات النموذج
            const payload = new FormData();
            // payload.append("user", userData?.id);

            // إضافة الحقول التي تم تغييرها فقط
            if (imageFile) {
                payload.append("image", imageFile);
            } else if (userImage && !imagePreview) {
                // إذا تم حذف الصورة
                payload.append("image", "");
            }

            if (formData.bio !== userProfile?.bio) {
                payload.append("bio", formData.bio);
            }

            if (formData.phone_number !== userProfile?.phone_number) {
                payload.append("phone_number", formData.phone_number);
            }

            if (formData.gender !== userProfile?.gender) {
                payload.append("gender", formData.gender);
            }

            if (formData.age !== userProfile?.age) {
                payload.append("age", formData.age);
            }

            // إرسال البيانات إلى الخادم
            const { data, error } = await adminProfileUpdate(
                userProfile?.id,
                payload
                // userId,
                // imageFile || (userImage && !imagePreview ? "" : null),
                // formData.bio || null,
                // formData.phone_number || null,
                // formData.gender || null,
                // formData.age || null
            );

            console.log(`error`, error);
            console.log(`data`, data);

            if (error) {
                let errorMsg =
                    error?.message || "حدث خطأ أثناء تحديث الملف الشخصي";

                if (error?.phone_number) {
                    errorMsg = error.phone_number[0];
                }

                Toast("error", errorMsg);
                setIsLoading(false);
            } else {
                let userDataProfile = JSON.stringify(data);
                setProfileAuthUser(userDataProfile);
                Toast("success", "تم تحديث الملف الشخصي بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            Toast("error", "حدث خطأ غير متوقع");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            <div className="card p-6 my-8">
                <h2 className="text-2xl font-bold mr-2 mb-8 text-black">
                    تحديث الملف الشخصي
                </h2>

                <form
                    onSubmit={handleSubmit(handleUpdateProfile)}
                    className="space-y-6 flex flex-col gap-8"
                >
                    {/* Image */}
                    <div
                        className={`
                        relative
                        `}
                        // before:absolute before:w-full before:h-full
                        // before:top-0 before:left-0 before:bg-gray-50/20
                        // before:z-10 before:cursor-no-drop
                        title="لا يمكنك التعديل حاليا"
                    >
                        <label
                            htmlFor="image"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            الصورة
                        </label>

                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <div className="mb-3 relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mx-auto h-32 w-auto object-cover rounded-md"
                                            loading="lazy"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-0 left-0 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mx-auto h-20 w-20 text-gray-400">
                                        <Upload size={40} className="mx-auto" />
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
                                            className="sr-only"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            {...register("image", {
                                                // required: `الصورة مطلوبة`,
                                            })}
                                            onChange={handleImageChange}
                                            autoComplete="off"
                                            // required
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

                    {/* Bio */}
                    <div>
                        <label
                            htmlFor="bio"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            السيرة الذاتيه
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            placeholder="مثال: أحب ممارسة الرياضة"
                            className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 resize-none`}
                            {...register("bio", {
                                // required: ``,
                            })}
                            autoComplete="off"
                            // required
                        />
                    </div>

                    {/* phone number */}
                    <div>
                        <label
                            htmlFor="phone_number"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            رقم الهاتف
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            placeholder="مثال: 0560816095"
                            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                            {...register("phone_number", {
                                pattern: {
                                    value: /^05[0-9]{8}$/,
                                    message:
                                        "يجب أن يبدأ رقم الهاتف بـ 05 ويتكون من 10 أرقام",
                                },
                            })}
                            autoComplete="off"
                        />
                        {errors.phone_number && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone_number.message}
                            </p>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-bold text-black mb-1"
                        >
                            الجنس
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 outline-0 transition-all focus:border-blue-500`}
                            {...register("gender")}
                            autoComplete="off"
                        >
                            <option value="">أختر جنسك</option>
                            <option value="Male">ذكر</option>
                            <option value="Female">أنثي</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div>
                        <label
                            htmlFor="age"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            العمر
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="مثال: 18"
                            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                            {...register("age", {
                                min: {
                                    value: 0,
                                    message: "العمر لا يمكن أن يكون سالباً",
                                },
                            })}
                            onInput={handleAgeInput}
                            autoComplete="off"
                        />

                        {errors.age && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.age.message}
                            </p>
                        )}
                    </div>

                    {/* Error message */}
                    {errorsMessage && (
                        <div className="text-red-500 text-sm mt-2">
                            {errorsMessage}
                        </div>
                    )}

                    {/* Form actions */}
                    <div className="flex justify-end gap-4 space-x-4 space-x-reverse pt-4 my-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => {
                                navigate(`/${App_Admin}/home`);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all`}
                        >
                            {isLoading ? "جاري الحفظ..." : "تحديث"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateProfile;
