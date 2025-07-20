/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import differentlogin from "../../../assets/images/login/different-login.png";
import noimage from "../../../assets/images/error/no-image.jpg";
import { nameMainColor } from "../../../utils/constants";

function DifferentLogin() {
    const navigate = useNavigate();

    return (
        <>
            <section className="bg-gray-50">
                <div className="container mx-auto relative min-h-dvh flex flex-col items-center justify-center  py-96 px-4 overflow-hidden">
                    {/* الدوائر حول الصورة */}
                    <div className="relative w-full max-w-4xl mx-auto">
                        {/* الصورة الصغيرة في المنتصف */}
                        <div className="relative mx-auto  max-w-96 sm:max-w-2xl  md:max-w-3xl lg:max-w-4xl rounded-full  shadow-2xl z-1">
                            <img
                                src={`${differentlogin || noimage}`}
                                alt="Education"
                                className="w-full h-full object-cover rounded-full"
                                data-aos="zoom-in"
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                loading="lazy"
                            />

                            {/* الدائرة العلوية */}
                            <div
                                className={`absolute top-16 sm:top-24 md:top-28 lg:top-32 
                                    left-1/2 transform -translate-x-1/2 -translate-y-full 
                                `}
                                onClick={() => {
                                    navigate(`/login`);
                                }}
                                data-aos="fade-down"
                            >
                                <div
                                    className={` w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 
                                        bg-white rounded-full shadow-lg flex items-center 
                                        justify-center z-2 border-4 border-indigo-100 hover:scale-110 transition-all  
                                        duration-500 hover:transition-all hover:duration-500 cursor-pointer
                                    `}
                                >
                                    <span
                                        className={`text-blue-700 font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl`}
                                    >
                                        تسجل الدخول
                                    </span>
                                </div>
                            </div>

                            {/* الدائرة اليمنى */}
                            <div
                                className={`absolute top-1/2 -right-0 transform translate-x-1/2 -translate-y-1/2 `}
                                onClick={() => {
                                    navigate(`/signupteacher`);
                                }}
                                data-aos="fade-left"
                            >
                                <div
                                    className={`w-32 h-32  sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 
                                        bg-white rounded-full shadow-lg flex items-center justify-center z-2 
                                        border-4 border-indigo-100 hover:scale-110 duration-500
                                        transition-all cursor-pointer hover:transition-all hover:duration-300
                                    
                                    `}
                                >
                                    <span
                                        className={`text-blue-700 font-semibold text-center px-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl`}
                                    >
                                        سجل كمعلم
                                    </span>
                                </div>
                            </div>

                            {/* الدائرة اليسرى */}
                            <div
                                className="absolute top-1/2 -left-0 transform -translate-x-1/2 -translate-y-1/2 "
                                onClick={() => {
                                    navigate(`/signup`);
                                }}
                                data-aos="fade-right"
                            >
                                <div
                                    className={`w-32 h-32  sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 
                                        bg-white rounded-full shadow-lg flex items-center 
                                        justify-center z-2 border-4 border-indigo-100 duration-500 
                                        hover:scale-110 transition-all cursor-pointer hover:duration-500 
                                        hover:transition-all
                                        `}
                                >
                                    <span
                                        className={`text-blue-700 font-semibold text-center px-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl`}
                                    >
                                        سجل كطالب
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* الدائرة السفلية (اختيارية) */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 translate-y-full w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center z-2 border-4 border-indigo-100 opacity-0 hover:opacity-100 transition-opacity hidden">
                            {/* يمكن إضافة أيقونة أو نص هنا */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DifferentLogin;
