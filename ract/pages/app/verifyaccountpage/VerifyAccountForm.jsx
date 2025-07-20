/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// style
import "./VerifyAccountForm.scss";

// api
// import { userResendOTP, userVerifyAccount } from "../../../api/user/authUser";
import { publicVerifyAccount } from "../../../api/public/authPublic";

// plugin
import Toast from "../../../plugin/Toast";

// ui form
// import Form from "../../../ui/form/Form";
// import FormRow from "../../../ui/form/FormRow";
// import FormInput from "../../../ui/form/FormInput";
// import FormRowBtns from "../../../ui/form/FormRowBtns";
// import BtnLinkFull from "../../../ui/button/BtnLinkFull";
// import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";
import ResendOTP from "../../../ui/resend/ResendOTP";
import { nameMainColor } from "../../../utils/constants";

function VerifyAccountForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [otpError, setOtpError] = useState();

    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(0);
    let userData = Cookies.get("userData");

    if (!userData) {
        navigate(`/login`);
    }

    const { register, formState, reset, handleSubmit } = useForm();
    const { errors } = formState;

    const handleVerify = async ({ otp }) => {
        try {
            setIsLoading(true);

            if (errors.root) {
                return;
            }

            const { data, error } = await publicVerifyAccount(otp);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error?.message && error?.message === "OTP has expired") {
                    setErrorsMessage(`انتهت صلاحية OTP`);
                    setOtpError(`انتهت صلاحية OTP`);
                    Toast("error", `انتهت صلاحية OTP.`);
                    setIsLoading(false);
                }

                if (error?.message && error?.message === "Invalid OTP Code") {
                    setErrorsMessage(`رمز OTP غير صالح.`);
                    setOtpError(`رمز OTP غير صالح.`);
                    Toast("error", `رمز OTP غير صالح.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `تم التحقق من الحساب بنجاح`
                    // `${data?.message || `Account Verified Successfully.`}`
                );
                Cookies.remove("userData");
                navigate(`/login`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const startTimer = () => {
        setCanResend(false);
        setTimer(180);

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleVerify)}
                // className="verifyaccountform"
                className="space-y-6 flex flex-col gap-8"
            >
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

                {/* <FormRow
                    label={`رمز التفعيل`}
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
                                message: `يرجى تقديم رمز صالح.`,
                            },
                        })}
                        required
                    />
                </FormRow> */}

                {/* <div className="resend">
                    <p>
                        {` لم تحصل على الرمز ؟ `}
                        <a
                            onClick={() => {
                                if (canResend) {
                                    handleResendOTP();
                                }
                            }}
                            style={{
                                color: canResend ? "#c009a8" : "gray",
                                cursor: canResend ? "pointer" : "not-allowed",
                            }}
                        >
                            {`إعادة إرسال`}
                            {timer > 0 && `(${formatTime(timer)})`}
                        </a>
                    </p>
                </div> */}
                <ResendOTP />

                {/* Actions */}
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
                        {isLoading ? <SpinnerMini /> : `تفعيل`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        disabled={isLoading}
                        onClick={() => {
                            navigate(`/`);
                        }}
                        data-aos="fade-left"
                    >
                        {`إلغاء`}
                    </button>
                </div>

                {/* <FormRowBtns className="btn" data-aos="fade-down">
                    <BtnLinkFull
                        type="submit"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {isLoading ? <SpinnerMini /> : `تفعيل`}
                    </BtnLinkFull>

                    <BtnLinkBorder
                        type="reset"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {`إلغاء`}
                    </BtnLinkBorder>
                </FormRowBtns> */}
            </form>
        </>
    );
}

export default VerifyAccountForm;
