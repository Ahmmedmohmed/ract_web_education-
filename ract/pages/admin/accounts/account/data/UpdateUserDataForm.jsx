/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugins
import Toast from "../../../../plugin/Toast";

// utils
import { App_User } from "../../../../utils/constants";

// ui form
import Form from "../../../../ui/form/Form";
import FormRow from "../../../../ui/form/FormRow";
import FormSelect from "../../../../ui/form/FormSelect";
import FormImageInput from "../../../../ui/form/FormImageInput";
import FormInput from "../../../../ui/form/FormInput";
import FormRowBtns from "../../../../ui/form/FormRowBtns";
import BtnLinkFull from "../../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../../ui/button/BtnLinkBorder";
import FormRowPass from "../../../../ui/form/FormRowPass";

// ui
import SpinnerMini from "../../../../ui/spinner/SpinnerMini";

function UpdateUserDataForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    let { userData, userProfile } = UserDataStore();

    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const handleUpdateProfile = async ({
        gender,
        image,
        phone_number,
        age,
    }) => {
        try {
            if (errors.root) {
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

            // const { data, error } = await userProfileUpdate(
            //     gender,
            //     image?.[0],
            //     phone_number,
            //     age,
            //     user
            // );

            // // console.log(`data`, data);
            // // console.log(`error`, error);

            // if (error) {
            //     if (error?.message && typeof error.message === "string") {
            //         Toast("error", `${error?.message || "Invalid token"}.`);
            //         setIsLoading(false);
            //     }
            // } else {
            //     setIsLoading(true);
            //     Toast(
            //         "success",
            //         `${
            //             data?.message || "Paitent Profile updated Successfully."
            //         }`
            //     );
            //     navigate(`/${App_User}/home`);
            // }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(handleUpdateProfile)}>
                <FormRow
                    label="الاٍسم الاول"
                    error={errors?.first_name?.message}
                >
                    <FormInput
                        type="text"
                        id="first_name"
                        name="first_name"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الاٍسم الاول"
                        {...register("first_name", {
                            // required: `This field is required`,
                            required: `هذا الحقل مطلوب.`,
                            value: userData?.first_name || "محمد",
                        })}
                        required
                    />
                </FormRow>

                <FormRow
                    label="الاٍسم الثاني"
                    error={errors?.last_name?.message}
                >
                    <FormInput
                        type="text"
                        id="last_name"
                        name="last_name"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب الاٍسم الثاني"
                        {...register("last_name", {
                            required: `هذا الحقل مطلوب.`,
                            value: userData?.last_name  ,
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
                            value: userData?.email  ,
                        })}
                        required
                    />
                </FormRowPass>

                <FormRowBtns className="" data-aos="fade-down">
                    <button
                        className="btn has-before"
                        // type="submit"
                        // disabled={isLoading}
                        disabled={true}
                        data-aos="fade-left"
                    >
                        {isLoading ? <SpinnerMini /> : `تحديث`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        // disabled={isLoading}
                        disabled={true}
                        data-aos="fade-left"
                    >
                        {`إلغاء`}
                    </button>
                </FormRowBtns>
            </Form>
        </>
    );
}

export default UpdateUserDataForm;
