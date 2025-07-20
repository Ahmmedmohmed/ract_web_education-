/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, X, Image as ImageIcon, ArrowRight, Upload } from "lucide-react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

// api
import { teacherRegisterVerify } from "../../../../../api/admin/authAdmin";

// plugin
import Toast from "../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../utils/constants";

function TeachersCreate() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [emailError, setEmailError] = useState("");

    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, disabled },
    } = useForm();

    const handleSignUp = async ({
        first_name,
        last_name,
        email,
        password,
        passwordconfirm,
    }) => {
        try {
            setIsLoading(true);

            if (errors?.root) {
                return;
            }

            const { data, error } = await teacherRegisterVerify(
                first_name,
                last_name,
                email,
                password,
                passwordconfirm
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error?.message?.email[0]) {
                    if (
                        error?.message?.email[0] ===
                        "user with this email already exists."
                    ) {
                        setEmailError(
                            `تم استخدام هذا البريد الالكتروني من قبل.`
                        );
                    }

                    Toast("error", `${error?.message?.email[0]}.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `${
                        `تم التسجيل بنجاح!.`
                        // || data?.message
                        // "Registration successful! Please check your email to confirm your account."
                    }`
                );
                navigate(`/${App_Admin}/teachers`);
                // navigate(`/verifyaccount`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/teachers`);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة مدرس جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleSignUp)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-2xl font-bold mb-2 text-black"
                                >
                                    الاٍسم الاول*
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="مثال: محمد"
                                    className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                    {...register("first_name", {
                                        required: `هذا الحقل مطلوب.`,
                                    })}
                                    autoComplete="off"
                                    disabled={isLoading}
                                    required
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-2xl mt-4">
                                        {errors.first_name.message}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-2xl font-bold mb-2 text-black"
                                >
                                    الاٍسم الثاني*
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="مثال: العمري"
                                    className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                    {...register("last_name", {
                                        required: `هذا الحقل مطلوب.`,
                                    })}
                                    autoComplete="off"
                                    disabled={isLoading}
                                    required
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-2xl mt-4">
                                        {errors.last_name.message}
                                    </p>
                                )}
                            </div>

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
                                        type={
                                            !showPassword ? "password" : "text"
                                        }
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
                                            border-r-transparent  border-s-transparent border-r-0 
                                            border-s-0 rounded-md bg-gray-50 transition-all
                                            duration-500 hover:text-blue-500  
                                            
                                            group-focus-within:border-blue-500
                                            outline-0 group-focus-within:border-s-0
                                            group-focus-within:border-r-0
                                            `}
                                            onClick={() => {
                                                setShowPassword(
                                                    (show) => !show
                                                );
                                            }}
                                            // title="x"
                                        />
                                    ) : (
                                        <HiEyeSlash
                                            size={16}
                                            className={`flex items-center justify-center cursor-pointer h-full 
                                            max-w-14 min-w-12 pe-2 py-4 border border-gray-300 
                                            border-r-transparent  border-s-transparent border-r-0 
                                            border-s-0 rounded-md bg-gray-50 transition-all
                                            duration-500 hover:text-blue-500  
                                            
                                            group-focus-within:border-blue-500
                                            outline-0 group-focus-within:border-s-0
                                            group-focus-within:border-r-0
                                            `}
                                            onClick={() => {
                                                setShowPassword(
                                                    (show) => !show
                                                );
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
                                    htmlFor="passwordconfirm"
                                    className="block text-2xl font-bold mb-2 text-black"
                                >
                                    اٍعادة كلمة المرور*
                                </label>
                                <input
                                    type={!showPassword ? "password" : "text"}
                                    id="passwordconfirm"
                                    name="passwordconfirm"
                                    dir="ltr"
                                    placeholder="أعد اٍدخال كلمة المرور"
                                    className={`text-black text-2xl w-full p-2 py-4 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0`}
                                    {...register("passwordconfirm", {
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

                                {errors.passwordconfirm && (
                                    <p className="text-red-500 text-2xl mt-4">
                                        {errors.passwordconfirm.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() => {
                                        navigate(`/${App_Admin}/teachers`);
                                    }}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ"}
                                    {/* <span>حفظ التصنيف</span> */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeachersCreate;
