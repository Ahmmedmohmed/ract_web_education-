/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";

// style

// utils
import { nameMainColor } from "../../../utils/constants";

// components
import VerifyAccountForm from "./VerifyAccountForm";

// ui
import MainTitle from "../../../ui/title/MainTitle";
import OtherBtn from "../../../ui/button/OtherBtn";
import Btn from "../../../ui/button/Btn";

// assets
import verifyaccount from "../../../assets/images/verifyaccount/VerifyAccount.jpg";
import noimage from "../../../assets/images/error/no-image.jpg";

function VerifyAccount() {
    const navigate = useNavigate();

    return (
        <>
            <div className="section min-h-dvh py-40 pb-60" id="infoTasjil">
                <div className="container relative mx-auto py-8">
                    <MainTitle data-aos="fade-down">{`تفعيل الحساب`}</MainTitle>

                    <div className="box flex flex-col md:flex-row items-center justify-between gap-12">
                        <div
                            className="flex-1 py-6 my-8 w-full"
                            // data-aos="fade-left"
                        >
                            {/* <div className="content-title" data-aos="fade-down">
                                <h3 className="title">
                                    {`قم بتفعيل الحساب الخاص بك `}
                                </h3>

                                <p>{`تم ارسال رمز التفعيل إلي الايميل الخاص بك`}</p>
                            </div> */}

                            <div className="form" data-aos="fade-down">
                                <VerifyAccountForm />
                            </div>

                            <div
                                className={`
                                w-full flex flex-col md:flex-row items-center 
                                justify-center md:justify-between gap-5
                                mt-20 border-t-gray-800 pt-20 relative
                                before:content-['أو'] before:absolute 
                                before:left-1/2 before:-translate-x-1/2 
                                before:py-6 before:px-7 text-white 
                                before:rounded-full before:transition-all before:duration-500
                                before:bg-blue-500/80 
                                before:flex before:items-center before:justify-center
                                before:-top-10 before:text-4xl
                                hidden
                            `}
                                data-aos="fade-down"
                            >
                                <button
                                    className={`btn has-before text-2xl`}
                                    onClick={() => {
                                        navigate(`/signupteacher`);
                                    }}
                                >
                                    {`الاٍشتراك كمعلم`}
                                </button>

                                <button
                                    className={`btn has-before text-2xl`}
                                    onClick={() => {
                                        navigate(`/signup`);
                                    }}
                                >
                                    {`الاٍشتراك كطالب`}
                                </button>

                                <button
                                    className={`btn has-before text-2xl `}
                                    onClick={() => {
                                        navigate(`/login`);
                                    }}
                                >
                                    {`تسجل الدخول`}
                                </button>
                            </div>
                        </div>

                        <div
                            className="image flex-1 w-full flex items-center justify-center"
                            // data-aos="fade-right"
                        >
                            <img
                                src={
                                    verifyaccount ||
                                    noimage ||
                                    "images/ihtiraq.png"
                                }
                                alt={`verify account`}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyAccount;
