/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// api
import { userPublicLogin } from "../../../api/public/authPublic";

// plugin
import Toast from "../../../plugin/Toast";

// utils
import { App_User, nameMainColor } from "../../../utils/constants";

// ui form
// import Form from "../../../ui/form/Form";
// import FormRowPass from "../../../ui/form/FormRowPass";
// import FormInput from "../../../ui/form/FormInput";
// import FormRowBtns from "../../../ui/form/FormRowBtns";
// import BtnLinkFull from "../../../ui/button/BtnLinkFull";
// import BtnLinkBorder from "../../../ui/button/BtnLinkBorder";

// ui
import SpinnerMini from "../../../ui/spinner/SpinnerMini";

function LoginForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    let userData = localStorage.getItem("userData");
    let userJson = JSON.parse(userData);

    const { register, formState, reset, handleSubmit } = useForm();
    const { errors } = formState;

    const handleLogin = async ({ email, password }) => {
        try {
            setIsLoading(true);

            if (errors.root) {
                return;
            }

            // if (
            //     email === "student@gmail.com" &&
            //     password === "Mazen@@student@@1"
            // ) {
            //     let userData = {
            //         email: "student@gmail.com",
            //         first_name: "Mazen",
            //         last_name: "Saad",
            //         full_name: "Mazen Saad",
            //         id: 0,
            //         is_active: true,
            //         is_student: true,
            //         is_verified: true,
            //         username: "student",
            //     };
            //     Cookies.set("userData", JSON.stringify(userData));
            //     navigate(`/${App_User}/home`);
            // }
            // if (email === "admin@gmail.com" && password === "Mazen@@admin@@1") {
            //     let userData = {
            //         email: "student@gmail.com",
            //         first_name: "Mazen",
            //         last_name: "Saad",
            //         full_name: "Mazen Saad",
            //         id: 0,
            //         is_active: true,
            //         is_admin: true,
            //         is_verified: true,
            //         username: "student",
            //     };
            //     Cookies.set("userData", JSON.stringify(userData));
            //     navigate(`/${App_Admin}/home`);
            // }

            const { data, error } = await userPublicLogin(email, password);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                // if (error?.message) {
                //     Toast("error", `${error?.message}.`);
                //     setErrorsMessage(error?.message);
                // }

                if (
                    error?.detail &&
                    error?.detail === "No user found with this email."
                ) {
                    setEmailError(
                        `لم يتم العثور على مستخدم بهذا البريد الإلكتروني.`
                    );
                }

                if (error?.detail && error?.detail === "Invalid Password.") {
                    setPasswordError(`كلمة المرور غير صحيحة.`);
                }

                if (error?.data?.is_verified == false) {
                    Cookies.set("userData", JSON.stringify(error?.data), {
                        expires: 1, // Refresh token expires in 7 days
                        secure: true,
                    });
                    setErrorsMessage(
                        `لم يتم التحقق من حسابك. يُرجى التحقق من حسابك للمتابعة.`
                    );
                    Toast(
                        "error",
                        `لم يتم التحقق من حسابك. يُرجى التحقق من حسابك للمتابعة.`
                    );
                    navigate(`/verifyaccount`);
                }

                if (error?.message?.email[0]) {
                    setErrorsMessage(error?.message?.email[0]);
                    Toast("error", `${error?.message?.email[0]}.`);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                Toast(
                    "success",
                    `تم تسجيل الدخول بنجاح.`
                    // `${data?.message || "Student Login Successfully."}`
                );
                navigate(`/${App_User}/home`);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    // let { pathname } = useLocation();
    // console.log(`ss`, pathname);

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
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
                </FormRowPass>

                <FormRowPass
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
                    {passwordError && (
                        <p className="text-red-500 text-2xl mt-4">
                            {passwordError}
                        </p>
                    )}
                </div>

                <div
                    className="flex items-center justify-center gap-6 mb-8"
                    data-aos="fade-down"
                >
                    <button
                        className="btn has-before "
                        type="submit"
                        disabled={isLoading}
                        data-aos="fade-left"
                        // onClick={() => {
                        //     if (pathname === "/wp-admin") {
                        //         navigate(`/${App_Admin}/home`);
                        //     }
                        // }}
                    >
                        {isLoading ? <SpinnerMini /> : `دخول`}
                    </button>

                    <button
                        className="btn has-before"
                        type="reset"
                        disabled={isLoading}
                        onClick={() => {
                            navigate(`/selectuserlogin`);
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

export default LoginForm;
