/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

// api
// import { userConfirmResetPassword } from "../../../api/user/authUser";
import { userPublicConfirmResetPassword } from "../../../api/public/authPublic";

// plugin
import Toast from "../../../plugin/Toast";

// ui form
// import Form from "../../../ui/form/Form";
// import FormRow from "../../../ui/form/FormRow";
// import FormRowPass from "../../../ui/form/FormRowPass";
// import FormInput from "../../../ui/form/FormInput";
// import FormRowBtns from "../../../ui/form/FormRowBtns";
// import BtnLinkFull from "../../../ui/button/BtnLinkFull";
// import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";
import ResendReset from "../../../ui/resend/ResendReset";
import { nameMainColor } from "../../../utils/constants";

function ConfirmResetPasswordForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otpError, setOtpError] = useState();

    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleConfirmResetPassword = async ({ otp, password, password2 }) => {
        try {
            setIsLoading(true);

            if (errors.root) {
                return;
            }

            const { data, error } = await userPublicConfirmResetPassword(
                otp,
                password,
                password2
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error?.message && error?.message === "Invalid OTP.") {
                    setErrorsMessage(`رمز OTP غير صالح.`);
                    setOtpError(`رمز OTP غير صالح.`);
                    Toast("error", `رمز OTP غير صالح.`);
                    setIsLoading(false);
                }

                if (error?.message && error?.message === "OTP has expired.") {
                    setErrorsMessage(`انتهت صلاحية OTP`);
                    setOtpError(`انتهت صلاحية OTP`);
                    Toast("error", `انتهت صلاحية OTP.`);
                    setIsLoading(false);
                    navigate(`/resetpassword`);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `تم تغيير كلمة المرور بنجاح.`
                    // `${data?.message || "Password Changed Successfully."}`
                );
                // localStorage.removeItem("userData");
                // localStorage.removeItem("userEmail");
                navigate(`/login`);
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
            <form
                onSubmit={handleSubmit(handleConfirmResetPassword)}
                className="space-y-6 flex flex-col gap-8"
            >
                {/* <FormRow
                    label={`الرمز`}
                    error={errors?.otp?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="otp"
                        name="otp"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder={`أكتب رمز التفعيل`}
                        {...register("otp", {
                            // required: `This field is required`,
                            // value: "mazen",
                            required: `هذا الحقل مطلوب.`,
                            pattern: {
                                // value: /\S+@\S+\.\S+/,
                                value: /^\d{6}$/,
                                message: `يرجى تقديم رمز  صالح.`,
                            },
                        })}
                        required
                    />
                </FormRow> */}

                {/* OTP */}
                <div>
                    <label
                        htmlFor="otp"
                        className="block text-2xl font-bold mb-2 text-black"
                    >
                        رمز التفعيل*
                    </label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="مثال: 530254"
                        className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                        {...register("otp", {
                            required: `هذا الحقل مطلوب.`,
                            pattern: {
                                // value: /\S+@\S+\.\S+/,
                                value: /^\d{6}$/,
                                message: `يرجى تقديم رمز  صالح.`,
                            },
                        })}
                        autoComplete="off"
                        disabled={isLoading}
                        required
                    />
                    {errors.otp && (
                        <p className="text-red-500 text-2xl mt-4">
                            {errors.otp.message}
                        </p>
                    )}

                    {otpError && (
                        <p className="text-red-500 text-2xl mt-4">{otpError}</p>
                    )}
                </div>

                <ResendReset />

                {/* <FormRowPass
                    label="كلمة المرور"
                    error={errors?.password?.message}
                >
                    <FormInput
                        type={!showPassword ? "password" : "text"}
                        id="password"
                        name="password"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب كلمة المرور"
                        {...register("password", {
                            required: `هذا الحقل مطلوب.`,
                            minLength: {
                                value: 8,
                                // message: `Password needs a minimum of 8 characters`,
                                message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                            },
                            // value: "mazen",
                        })}
                        required
                    />

                    {!showPassword ? (
                        <HiEye
                            onClick={() => {
                                setShowPassword((show) => !show);
                            }}
                        />
                    ) : (
                        <HiEyeSlash
                            onClick={() => {
                                setShowPassword((show) => !show);
                            }}
                        />
                    )}
                </FormRowPass>

                <FormRowPass
                    label="اٍعادة كلمة المرور"
                    error={errors?.password2?.message}
                >
                    <FormInput
                        type={!showPassword ? "password" : "text"}
                        id="password2"
                        name="password2"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أعد اٍدخال كلمة المرور"
                        {...register("password2", {
                            required: `هذا الحقل مطلوب.`,
                            minLength: {
                                value: 8,
                                message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                            },
                            validate: (value) =>
                                value === getValues()?.password ||
                                // `Passwords need to match`,
                                `كلمات المرور يجب أن تتطابق.`,
                            // value: "mazen",
                        })}
                        required
                    />
                </FormRowPass> */}

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-2xl font-bold mb-2 text-black relative"
                    >
                        كلمة المرور*
                    </label>
                    <div className="flex items-stretch w-full group ">
                        <input
                            type={!showPassword ? "password" : "text"}
                            id="password"
                            name="password"
                            dir="ltr"
                            placeholder="أكتب كلمة المرور"
                            className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:border-blue-500 outline-0 focus:border-l-transparent focus:border-l-0 border-l-0 border-l-transparent`}
                            {...register("password", {
                                required: `هذا الحقل مطلوب.`,
                                minLength: {
                                    value: 8,
                                    message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                                },
                            })}
                            autoComplete="off"
                            disabled={isLoading}
                            required
                        />
                        {!showPassword ? (
                            <HiEye
                                size={16}
                                className={`flex items-center justify-center cursor-pointer h-full 
                                    max-w-14 min-w-12 pe-2 py-4 border border-gray-300 
                                    border-r-transparent  border-s-transparent border-r-0 border-s-0 rounded-md bg-gray-50 transition-all
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
                                size={16}
                                className={`flex items-center justify-center cursor-pointer h-full 
                                    max-w-14 min-w-12 pe-2 py-4 border border-gray-300 
                                    border-r-transparent  border-s-transparent border-r-0 border-s-0 rounded-md bg-gray-50 transition-all
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

                    {errors.password && (
                        <p className="text-red-500 text-2xl mt-4">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="password2"
                        className="block text-2xl font-bold mb-2 text-black"
                    >
                        اٍعادة كلمة المرور*
                    </label>
                    <input
                        type={!showPassword ? "password" : "text"}
                        id="password2"
                        name="password2"
                        dir="ltr"
                        placeholder="أعد اٍدخال كلمة المرور"
                        className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                        {...register("password2", {
                            required: `هذا الحقل مطلوب.`,
                            minLength: {
                                value: 8,
                                message: `كلمة المرور تحتاج إلى 8 أحرف على الأقل.`,
                            },
                            validate: (value) =>
                                value === getValues()?.password ||
                                // `Passwords need to match`,
                                `كلمات المرور يجب أن تتطابق.`,
                            // value: "mazen",
                        })}
                        autoComplete="off"
                        disabled={isLoading}
                        required
                    />

                    {errors.password2 && (
                        <p className="text-red-500 text-2xl mt-4">
                            {errors.password2.message}
                        </p>
                    )}
                </div>

                <div
                    className="flex items-center justify-center gap-6 mb-8"
                    data-aos="fade-down"
                >
                    <button
                        className="btn has-before"
                        type="submit"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {isLoading ? <SpinnerMini /> : `تغيير`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        disabled={isLoading}
                        onClick={() => {
                            navigate(`/resetpassword`);
                        }}
                        data-aos="fade-left"
                    >
                        {`إلغاء`}
                    </button>
                </div>
            </form>
        </>
    );
}

export default ConfirmResetPasswordForm;
