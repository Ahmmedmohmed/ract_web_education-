/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// store
import UserDataStore from "../../../../store/UserDataStore";

// api
import { userProfileUpdate } from "../../../../api/user/authUser";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_User } from "../../../../utils/constants";

// ui form
import Form from "../../../../ui/form/Form";
import FormRow from "../../../../ui/form/FormRow";
import FormInput from "../../../../ui/form/FormInput";
import FormRowBtns from "../../../../ui/form/FormRowBtns";
import FormSelect from "../../../../ui/form/FormSelect";
import FormImageInput from "../../../../ui/form/FormImageInput";
import BtnLinkFull from "../../../../ui/button/BtnLinkFull";
import BtnLinkBorder from "../../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../../ui/spinner/SpinnerMini";

function UpdateUserProfileForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    let { userData, userProfile } = UserDataStore();
    let user = userData?.id;
    let userGender = userProfile?.gender;
    let userPhoneNumber = userProfile?.phone_number;
    let userAge = userProfile?.age;

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

            const { data, error } = await userProfileUpdate(
                gender,
                image?.[0],
                phone_number,
                age,
                user
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
                Toast(
                    "success",
                    `تم تحديث ملف الطالب بنجاح`
                    // `${
                    //     data?.message || "Student Profile updated Successfully."
                    // }`
                );
                navigate(`/${App_User}/home`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(handleUpdateProfile)}>
                <FormRow
                    label={`الجنس`}
                    error={errors?.gender?.message || errorsMessage}
                >
                    <FormSelect
                        name="gender"
                        id="gender"
                        {...register("gender", {
                            // required: `This field is required`,
                            // minLength: {
                            //     value: 8,
                            //     message: `Password needs a minimum of 8 characters`,
                            // },
                            value: userGender || "",
                        })}
                        autoComplete="off"
                        // required
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </FormSelect>
                </FormRow>

                <FormRow
                    label={`الصورة`}
                    error={errors?.image?.message || errorsMessage}
                >
                    <FormImageInput
                        id="image"
                        name="image"
                        accept="image/png"
                        className="disabled"
                        {...register("image", {
                            // required: isEditSession
                            //     ? false
                            //     : "This field is required",
                        })}
                    />
                </FormRow>

                <FormRow
                    label="رقم الهاتف"
                    error={errors?.phone_number?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب رقم الهاتف"
                        {...register("phone_number", {
                            // required: `This field is required`,
                            // required: `هذا الحقل مطلوب.`,
                            // value: "mazen",
                            pattern: {
                                value: /^01[0|1|2|5][0-9]{8}$/,
                                message: `Phone number must start with 010, 011, 012, 015 and contain 11 digits.`,
                            },
                            value: userPhoneNumber || null,
                        })}
                        // required
                    />
                </FormRow>

                <FormRow
                    label="العمر"
                    error={errors?.age?.message || errorsMessage}
                >
                    <FormInput
                        type="text"
                        id="age"
                        name="age"
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="أكتب العمر"
                        {...register("age", {
                            // required: `This field is required`,
                            // required: `هذا الحقل مطلوب.`,

                            pattern: {
                                value: /^[0-9]{2}$/,
                                message: `A valid integer is required.`,
                            },
                            value: userAge || null,
                        })}
                        // required
                    />
                </FormRow>

                <FormRowBtns className="">
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

export default UpdateUserProfileForm;
