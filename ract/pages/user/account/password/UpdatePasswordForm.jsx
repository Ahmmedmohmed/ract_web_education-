/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

// api
import { userChangePassword } from "../../../../api/user/authUser";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User } from "../../../../utils/constants";

// ui form
import Form from "../../../../ui/form/Form";
import FormRow from "../../../../ui/form/FormRow";
import FormRowPass from "../../../../ui/form/FormRowPass";
import FormInput from "../../../../ui/form/FormInput";
import FormRowBtns from "../../../../ui/form/FormRowBtns";
import BtnLinkFull from "../../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../../ui/spinner/SpinnerMini";

function UpdatePasswordForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    let refreshtokenUser = localStorage.getItem("refreshtokenUser");
    let refreshtokenUserJson = JSON.parse(refreshtokenUser);

    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const handleChangePassword = async ({
        old_password,
        new_password,
        confirm_password,
    }) => {
        try {
            if (errors.root) {
                return;
            }

            const { data, error } = await userChangePassword(
                refreshtokenUserJson,
                old_password,
                new_password,
                confirm_password
            );

            if (error) {
                if (error?.message && typeof error.message === "string") {
                    Toast("error", `${error?.message || "Invalid token"}.`);
                    setIsLoading(false);
                }
                if (error?.message?.password) {
                    Toast(
                        "error",
                        `${
                            error?.message?.password ||
                            "Old password is incorrect"
                        }.`
                    );
                    setErrorsMessage(error?.message?.password);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `${data?.message || "Password Changed Successfully."}`
                );
                navigate(`/${App_User}/home`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit(handleChangePassword)}>
                <FormRowPass
                    label="كلمة المرور القديمة"
                    error={errors?.old_password?.message}
                >
                    <FormInput
                        type={!showPassword ? "password" : "text"}
                        id="old_password"
                        name="old_password"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب كلمة المرور القديمة"
                        {...register("old_password", {
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
                    label="كلمة المرور الجديدة"
                    error={errors?.new_password?.message}
                >
                    <FormInput
                        type={!showPassword ? "password" : "text"}
                        id="new_password"
                        name="new_password"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب كلمة المرور"
                        {...register("new_password", {
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
                </FormRowPass>

                <FormRowPass
                    label="اٍعادة كلمة المرور الجديدة"
                    error={errors?.confirm_password?.message}
                >
                    <FormInput
                        type={!showPassword ? "password" : "text"}
                        id="confirm_password"
                        name="confirm_password"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أعد اٍدخال كلمة المرور الجديدة"
                        {...register("confirm_password", {
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
                </FormRowPass>

                <FormRowBtns className="" data-aos="fade-down">
                    <button
                        className="btn has-before"
                        type="submit"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {isLoading ? <SpinnerMini /> : `تحديث`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {`إلغاء`}
                    </button>
                </FormRowBtns>
            </Form>
        </>
    );
}

export default UpdatePasswordForm;
