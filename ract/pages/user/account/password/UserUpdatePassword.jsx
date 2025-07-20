/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Cookies from "js-cookie";

// api
// import { userChangePassword } from "../../../../api/user/authUser";
import { userPublicChangePassword } from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// hooks
import { useMoveBack } from "../../../../hooks/useMoveBack";

// utils
import { App_User, nameMainColor } from "../../../../utils/constants";

function UserUpdatePassword() {
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");

    let refreshtokenUser = Cookies.get("refresh_token");
    // let refreshtokenUserJson = JSON.parse(refreshtokenUser);

    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);

    const handleChangePassword = async ({
        old_password,
        new_password,
        confirm_password,
    }) => {
        try {
            if (errors.root) {
                return;
            }

            const { data, error } = await userPublicChangePassword(
                refreshtokenUser,
                old_password,
                new_password,
                confirm_password
            );

            if (error) {
                if (error?.message && error?.message === "string") {
                    Toast("error", `${error?.message}.`);
                    setIsLoading(false);
                }

                if (error?.message && error?.message === "Invalid token") {
                    Toast("error", `حدثة مشكلة.`);
                    setIsLoading(false);
                }

                if (
                    error?.message &&
                    error?.message === "Old password is incorrect."
                ) {
                    Toast("error", `كلمة المرور القديمة غير صحيحة.`);
                    setOldPassword(`كلمة المرور القديمة غير صحيحة.`);
                    setErrorsMessage(`كلمة المرور القديمة غير صحيحة.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `تم تغيير كلمة المرور بنجاح`
                    // `${data?.message || "Password Changed Successfully."}`
                );
                navigate(`/${App_User}/home`);
            }
            // }
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
                    تحديث كلمة المرور
                </h2>

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className="space-y-6 flex flex-col gap-8"
                >
                    {/* Old Password */}
                    <div className="relative">
                        <label
                            htmlFor="old_password"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            كلمة المرور القديمة*
                        </label>
                        <div className="flex items-stretch w-full group ">
                            <input
                                type={!showPassword ? "password" : "text"}
                                id="old_password"
                                name="old_password"
                                dir="ltr"
                                placeholder="Mazen@@1 :مثال"
                                className={`text-black w-full p-2 border border-gray-300 rounded-md   focus:border-blue-500 outline-0  focus:border-l-transparent focus:border-l-0 border-l-0 border-l-transparent `}
                                {...register("old_password", {
                                    required: "العنوان مطلوب",
                                    minLength: {
                                        value: 8,
                                        // message: `Password needs a minimum of 8 characters`,
                                        message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                                    },
                                })}
                                autoComplete="off"
                                disabled={isLoading}
                                required
                            />

                            {!showPassword ? (
                                <HiEye
                                    size={14}
                                    className={`flex items-center justify-center 
                                    cursor-pointer h-full 
                                    max-w-14 min-w-12 pe-2  border border-gray-300 
                                    border-r-transparent  border-s-transparent 
                                    border-r-0 border-s-0 rounded-md bg-gray-50 transition-all
                                    duration-500 hover:text-blue-500  
                                    
                                    group-focus-within:border-blue-500
                                    outline-0 group-focus-within:border-s-0
                                    group-focus-within:border-r-0
                                    `}
                                    onClick={() => {
                                        setShowPassword((show) => !show);
                                    }}
                                    // title="x"
                                />
                            ) : (
                                <HiEyeSlash
                                    size={14}
                                    className={`flex items-center justify-center 
                                    cursor-pointer h-full 
                                    max-w-14 min-w-12 pe-2 border border-gray-300 
                                    border-r-transparent  border-s-transparent 
                                    border-r-0 border-s-0 rounded-md bg-gray-50 transition-all
                                    duration-500 hover:text-blue-500  
                                    
                                    group-focus-within:border-blue-500
                                    outline-0 group-focus-within:border-s-0
                                    group-focus-within:border-r-0
                                    `}
                                    onClick={() => {
                                        setShowPassword((show) => !show);
                                    }}
                                />
                            )}
                        </div>

                        {errors.old_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.old_password.message}
                            </p>
                        )}

                        {oldPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {oldPassword}
                            </p>
                        )}
                    </div>

                    {/* new_password */}
                    <div>
                        <label
                            htmlFor="new_password"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            كلمة المرور الجديدة*
                        </label>
                        <input
                            type={!showPassword ? "password" : "text"}
                            id="new_password"
                            name="new_password"
                            dir="ltr"
                            placeholder="MAZEN@@123 :مثال"
                            className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 `}
                            {...register("new_password", {
                                required: `هذا الحقل مطلوب.`,
                                minLength: {
                                    value: 8,
                                    // message: `Password needs a minimum of 8 characters`,
                                    message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                                },
                            })}
                            autoComplete="off"
                            disabled={isLoading}
                            required
                        />
                        {errors.new_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.new_password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm font-bold mb-2 text-black"
                        >
                            اٍعادة كلمة المرور الجديدة*
                        </label>
                        <input
                            type={!showPassword ? "password" : "text"}
                            id="confirm_password"
                            name="confirm_password"
                            dir="ltr"
                            placeholder="MAZEN@@123 :مثال"
                            className={`text-black w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 `}
                            {...register("confirm_password", {
                                required: `هذا الحقل مطلوب.`,
                                minLength: {
                                    value: 8,
                                    message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                                },
                                validate: (value) =>
                                    value === getValues()?.new_password ||
                                    // `Passwords need to match`,
                                    `كلمات المرور يجب أن تتطابق.`,
                            })}
                            autoComplete="off"
                            disabled={isLoading}
                            required
                        />
                        {errors.confirm_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirm_password.message}
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
                            disabled={isSubmitting}
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

export default UserUpdatePassword;
