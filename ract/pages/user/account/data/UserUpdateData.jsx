/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

// api
import { userPublicUpdateData } from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugins
import Toast from "../../../../plugin/Toast";

// hooks
import { useMoveBack } from "../../../../hooks/useMoveBack";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function UserUpdateData() {
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");

    let { userData, userProfile } = UserDataStore();
    let userId = userData?.id;

    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);

    const handleUserUpdateData = async ({ first_name, last_name }) => {
        try {
            setIsLoading(true);

            if (errors?.root) {
                return;
            }

            // const payload = {
            //     gender: gender || userProfile?.gender,
            //     image: image?.[0] || null,
            //     phone_number: phone_number || userPhoneNumber,
            //     age: age || userAge,
            //     user: user || null,
            // };
            // console.log(`py`, payload);
            // const { data, error } = await userProfileUpdate(payload);
            // const { data, error } = await userProfileUpdate(
            //     gender,
            //     imageData,
            //     phone_number,
            //     age,
            //     user
            // );

            const { data, error } = await userPublicUpdateData(
                userId,
                first_name,
                last_name
            );

            // console.log(`data`, data);
            // console.log(`error`, error);

            if (error) {
                if (error?.message && typeof error.message === "string") {
                    Toast("error", `${error?.message || "Invalid token"}.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast("success", `تم تحديث البيانات بنجاح`);
                navigate(`/${App_User}/home`);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="card p-6 my-8">
                <h2 className="text-2xl font-bold mr-2 mb-8 text-black">
                    تحديث البيانات
                </h2>

                <form
                    onSubmit={handleSubmit(handleUserUpdateData)}
                    className="space-y-6 flex flex-col gap-8"
                >
                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            الاٍسم الاول*
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="مثال: محمد"
                            className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                            {...register("first_name", {
                                required: `هذا الحقل مطلوب.`,
                                value: userData?.first_name || "محمد",
                            })}
                            disabled={isLoading}
                            autoComplete="off"
                            required
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="last_name"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            الاٍسم الثاني*
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="مثال: العمري"
                            className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                            {...register("last_name", {
                                required: `هذا الحقل مطلوب.`,
                                value: userData?.last_name || "العمري",
                            })}
                            disabled={isLoading}
                            autoComplete="off"
                            required
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.last_name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            البريد الالكتروني*
                        </label>
                        <div
                            className="relative before:absolute before:w-full before:h-full before:bg-gray-50/50 before:cursor-no-drop rounded-md"
                            title="غير متاحة تعديل البريد الالكتروني"
                        >
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="مثال: mazen@gmail.com"
                                className={`text-black w-full p-2 border border-gray-300 
                                    rounded-md focus:ring-1 focus:border-blue-500 
                                    outline-0 cursor-no-drop select-none disabled 

                                `}
                                {...register("email", {
                                    required: `هذا الحقل مطلوب.`,
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: `الرجاء تقديم عنوان بريد إلكتروني صالح.`,
                                    },
                                    value: userData?.email,
                                })}
                                disabled={true}
                                autoComplete="off"
                                required
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-4 space-x-4 space-x-reverse pt-4 my-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => {
                                // moveBack();
                                navigate(`/${App_User}/home`);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-500"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            // disabled={isSubmitting}
                            disabled={isLoading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all duration-500 `}
                        >
                            {isSubmitting ? "جاري الحفظ..." : "تحديث"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserUpdateData;
