/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";

// style

// components
import ConfirmResetPasswordForm from "./ConfirmResetPasswordForm";

// ui
import MainTitle from "../../../ui/title/MainTitle";
import OtherBtn from "../../../ui/button/OtherBtn";
import Btn from "../../../ui/button/Btn";

// assets
import signupimage from "../../../assets/images/signup/ihtiraq.png";
import noimage from "../../../assets/images/error/no-image.jpg";

function ConfirmResetPassword() {
    const navigate = useNavigate();

    return (
        <>
            <section className="section min-h-dvh py-40 pb-60" id="infoTasjil">
                <div className="container relative mx-auto py-8">
                    <MainTitle data-aos="fade-down">
                        {`تغيير كلمة المرور`}
                    </MainTitle>

                    <div className="box flex flex-col md:flex-row items-center justify-between gap-12">
                        <div
                            className="flex-1 py-6 my-8 w-full"
                            data-aos="fade-left"
                        >
                            {/* <div className="content-title" data-aos="fade-down">
                                <h3 className="title">{`تغيير كلمة المرور`}</h3>

                                <p>{`قم بادخال رمز إعادة التعيين وكلمة المرور الجديدة.`}</p>
                            </div> */}

                            <div className="form" data-aos="fade-down">
                                <ConfirmResetPasswordForm />
                            </div>

                            {/* <OtherBtn className="btn" data-aos="fade-down">
                                <Btn
                                    onClick={() => {
                                        navigate(`/signup`);
                                    }}
                                >
                                    {`الاٍشتراك`}
                                </Btn>

                                <Btn
                                    onClick={() => {
                                        navigate(`/login`);
                                    }}
                                >
                                    {`تسجل الدخول`}
                                </Btn>
                            </OtherBtn> */}
                        </div>

                        <div
                            className="image flex-1 w-full flex items-center justify-center"
                            data-aos="fade-right"
                        >
                            <img
                                src={
                                    signupimage ||
                                    noimage ||
                                    "images/ihtiraq.png"
                                }
                                alt={`signup`}
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ConfirmResetPassword;
