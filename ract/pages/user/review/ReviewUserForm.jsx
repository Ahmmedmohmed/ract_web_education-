/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

// store
import UserDataStore from "../../../store/UserDataStore";

// plugin
import Toast from "../../../plugin/Toast";

// form
import Form from "../../../ui/form/Form";
import FormRow from "../../../ui/form/FormRow";
import FormInput from "../../../ui/form/FormInput";
import FormRowPass from "../../../ui/form/FormRowPass";
import FormTextarea from "../../../ui/form/FormTextarea";
import FormRowBtns from "../../../ui/form/FormRowBtns";
import BtnLinkFull from "../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";

function ReviewUserForm() {
    const navigate = useNavigate();
    let { userData, userProfile } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");

    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const handleContactUs = async ({ first_name, rating, message }) => {
        try {
            if (errors?.root) {
                return;
            }

            const { data, error } = await userReview(
                first_name,
                rating,
                message,
                userData?.id || null,
                userProfile?.image || null
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
                    label="الاٍسم الأول"
                    error={errors?.first_name?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="first_name"
                        name="first_name"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الاٍسم الأول"
                        {...register("first_name", {
                            // required: `This field is required`,
                            required: `هذا الحقل مطلوب.`,
                            value: userData?.first_name || "محمد",
                        })}
                        required
                    />
                </FormRow>

                <FormRow
                    label="التقييم"
                    error={errors?.rating?.message || errorsMessage}
                >
                    <FormInput
                        type="number"
                        id="rating"
                        name="rating"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الاٍسم الأول"
                        {...register("rating", {
                            // required: `This field is required`,
                            required: `هذا الحقل مطلوب.`,
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

export default ReviewUserForm;
