/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// api
// import { userResetPassword } from "../../../api/user/authUser";
import { userPublicResetPassword } from "../../../api/public/authPublic";

// plugin
import Toast from "../../../plugin/Toast";

// ui form
import Form from "../../../ui/form/Form";
import FormRowPass from "../../../ui/form/FormRowPass";
import FormInput from "../../../ui/form/FormInput";
import FormRowBtns from "../../../ui/form/FormRowBtns";
import BtnLinkFull from "../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";
import { nameMainColor } from "../../../utils/constants";

function ResetPasswordForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [emailError, setEmailError] = useState("");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRestPassword = async ({ email }) => {
        try {
            setIsLoading(true);

            if (errors?.root) {
                return;
            }

            const { data, error } = await userPublicResetPassword(email);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error?.data?.is_verified == false) {
                    Cookies.set("userData", JSON.stringify(error?.data), {
                        expires: 1, // Refresh token expires in 7 days
                        secure: true,
                    });
                    // Toast("error", `${error?.message}.`);
                    Toast(
                        "error",
                        `قم بتفعيل حسابك لاعادة تعيين كلمة المرور..`
                    );
                    navigate(`/verifyaccount`);
                }

                if (
                    error?.message &&
                    error?.message === "User with this email does not exist."
                ) {
                    setEmailError(`لا يوجد مستخدم بهذا البريد الالكتروني.`);
                    Toast("error", `لا يوجد مستخدم بهذا البريد الالكتروني.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `لقد تم إرسال رمز إعادة التعيين إلى بريدك الإلكتروني.`
                    // `${data?.message || "OTP has been sent to your email."}`
                );
                // localStorage.setItem(
                //     "userEmail",
                //     JSON.stringify({ email: email })
                // );
                navigate(`/confirmresetpassword`);
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
                onSubmit={handleSubmit(handleRestPassword)}
                className="space-y-6 flex flex-col gap-8"
            >
                {/* <FormRowPass
                    label="البريد الاٍلكتروني"
                    error={errors?.email?.message || errorsMessage}
                >
                    <FormInput
                        type="email"
                        id="email"
                        name="email"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب البريد الألكتروني"
                        {...register("email", {
                            required: `هذا الحقل مطلوب.`,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                // message: `Please Provide a valid email address`,
                                message: `الرجاء تقديم عنوان بريد إلكتروني صالح.`,
                            },
                            // value: "mazen",
                        })}
                        required
                    />
                </FormRowPass> */}
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-2xl font-bold mb-2 text-black"
                    >
                        البريد الالكتروني*
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        dir="ltr"
                        placeholder="mazen@gmail.com :مثال"
                        className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                        {...register("email", {
                            required: `هذا الحقل مطلوب.`,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: `الرجاء تقديم عنوان بريد إلكتروني صالح.`,
                            },
                        })}
                        // onFocus={(e) => {
                        //     if (e.target.value === "") {
                        //         e.target.dir = "ltr";
                        //         e.target.placeholder = "mazen@gmail.com مثال:";
                        //     }
                        // }}
                        // onBlur={(e) => {
                        //     if (e.target.value === "") {
                        //         e.target.dir = "rtl";
                        //         e.target.placeholder = "مثال: mazen@gmail.com";
                        //     }
                        // }}
                        autoComplete="off"
                        disabled={isLoading}
                        required
                    />

                    {errors.email && (
                        <p className="text-red-500 text-2xl mt-4">
                            {errors.email.message}
                        </p>
                    )}
                    {emailError && (
                        <p className="text-red-500 text-2xl mt-4">
                            {emailError}
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
                        {isLoading ? <SpinnerMini /> : `إعادة تعيين`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        disabled={isLoading}
                        onClick={() => {
                            navigate(`/login`);
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

export default ResetPasswordForm;
