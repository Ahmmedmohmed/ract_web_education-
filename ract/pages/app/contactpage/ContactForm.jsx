/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

// store
import UserDataStore from "../../../store/UserDataStore";

// plugin
import Toast from "../../../plugin/Toast";

// utils
import { App_User } from "../../../utils/constants";

// ui form
import Form from "../../../ui/form/Form";
import FormRow from "../../../ui/form/FormRow";
import FormInput from "../../../ui/form/FormInput";
import FormRowPass from "../../../ui/form/FormRowPass";
import FormRowBtns from "../../../ui/form/FormRowBtns";
import FormTextarea from "../../../ui/form/FormTextarea";
import BtnLinkFull from "../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";

function ContactForm() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    let { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");

    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const handleContactUs = async ({
        full_name,
        email,
        titleofmessage,
        message,
    }) => {
        try {
            if (errors?.root) {
                return;
            }

            const { data, error } = await userContactUs(
                full_name,
                email,
                titleofmessage,
                message,
                userData?.id || null
            );

            if (error) {
                if (error?.message?.email[0]) {
                    setErrorsMessage(error?.message?.email[0]);
                    Toast("error", `${error?.message?.email[0]}.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `${
                        `تم اٍرسال الرسالة بنجاح`
                        // || data?.message
                        // "Registration successful! Please check your email to confirm your account."
                    }`
                );
                if (pathname !== "/contact") {
                    navigate(`/${App_User}/home`);
                }
                navigate(`/`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(handleContactUs)}>
                <FormRow
                    label="الاٍسم"
                    error={errors?.full_name?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="full_name"
                        name="full_name"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الاٍسم"
                        {...register("full_name", {
                            // required: `This field is required`,
                            required: `هذا الحقل مطلوب.`,
                            minLength: {
                                value: 8,
                                // message: `Password needs a minimum of 8 characters`,
                                message: ` أكتب إسم يحتوي على أكثر من 8 حروف.`,
                            },
                            // value: "mazen",
                        })}
                        required
                    />
                </FormRow>

                <FormRowPass
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
                </FormRowPass>

                <FormRow
                    label="عنوان الرسالة"
                    error={errors?.titleofmessage?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="titleofmessage"
                        name="titleofmessage"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب عنوان الرسالة"
                        {...register("titleofmessage", {
                            // required: `This field is required`,
                            required: `هذا الحقل مطلوب.`,
                            // value: "mazen",
                            minLength: {
                                value: 10,
                                message: `يجب أن يحتوي عنوان الرسالة على أكثر من
                                        10 حروف.`,
                            },
                        })}
                        required
                    />
                </FormRow>

                <FormRow
                    label="الرسالة"
                    error={errors?.message?.message || errorsMessage}
                >
                    <FormTextarea
                        id="message"
                        name="message"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الرسالة"
                        {...register("message", {
                            required: `هذا الحقل مطلوب.`,

                            minLength: {
                                value: 20,
                                message: `يجب أن تحتوي الرسالة على الأقل 20 حرف`,
                            },
                        })}
                        required
                    ></FormTextarea>
                </FormRow>

                <FormRowBtns className="" data-aos="fade-down">
                    <button
                        className="btn has-before"
                        type="submit"
                        disabled={isLoading}
                        data-aos="fade-left"
                    >
                        {isLoading ? <SpinnerMini /> : `إرسال`}
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

export default ContactForm;
