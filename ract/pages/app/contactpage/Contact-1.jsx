/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// styles
import "./Contact.scss";

// components
import ContactForm from "./ContactForm";

// ui
import MainTitle from "../../../ui/title/MainTitle";

// assets
import twasalimage from "../../../assets/images/contact/twasal-image.png";

function Contact() {
    const navigate = useNavigate();

    return (
        <>
            <div className="conatct-us" id="contactUs">
                <div className="container  mx-auto px-4 py-8">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/contact`);
                        }}
                    >
                        {`تواصل معنا`}
                    </MainTitle>

                    {/* <div className="corect-login" id="corectLogin">
                        <div className="icon">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="chek"
                                style={{ opacity: "1" }}
                            />
                        </div>

                        <h3>{`تم اٍرسال الرسالة بنجاح`}</h3>

                        <p className="pargraph">
                            {`تم اٍرسال رسالتك سوف نقوم بالرد عليك في أقرب وقت في
                            البريد الاٍلكتروني الخاص بك`}
                        </p>
                        <div className="btn">
                            <a id="okay">{`حسنا`}</a>
                        </div>
                    </div> */}

                    <div className="box">
                        <div className="content" data-aos="fade-left">
                            <div className="content-title" data-aos="fade-down">
                                <h3 className="title">
                                    {` تواصل مع فريق منصة ريادة `}
                                    {/* <span>{`مدرس`}</span> */}
                                </h3>

                                <p>
                                    {`نحن في انتظارك طول الوقت يمكنك ارسال الرسالة
                                    وسيتم الرد عليك خلال اليوم`}
                                </p>
                            </div>

                            <div className="form" data-aos="fade-down">
                                {/* <form action="">
                                    <div className="input-box">
                                        <label htmlFor="username">
                                            {`إسم المستخدم`}
                                        </label>
                                        <input
                                            className="input"
                                            id="username"
                                            type="text"
                                            name="usernme"
                                            placeholder="إسم المستخدم"
                                            autoComplete="off"
                                            required
                                        />
                                        <span id="messageUser">
                                            أكتب إسم يحتوي على أكثر من 8 حروف
                                        </span>
                                    </div>

                                    <div className="input-box">
                                        <label htmlFor="email">
                                            {`البريد الإلكتروني`}
                                        </label>
                                        <input
                                            className="input"
                                            id="email"
                                            type="email"
                                            placeholder="عنوان البريد الالكتروني"
                                            required
                                            autoComplete="off"
                                        />
                                        <span id="messageEmail">
                                            {`أكتب بريدك الإلكتروني`}
                                        </span>
                                    </div>

                                    <label htmlFor="titleofmessage">
                                        عنوان الرسالة
                                    </label>
                                    <input
                                        className="message"
                                        id="titleofmessage"
                                        type="text"
                                        name="message"
                                        placeholder="عنوان الرسالة"
                                        autoComplete="off"
                                    />
                                    <span id="titleMessage">
                                        يجب أن يحتوي عنوان الرسالة على أكثر من
                                        10 حروف
                                    </span>

                                    <label htmlFor="message">الرسالة</label>
                                    <textarea
                                        name="mesgs"
                                        id="message"
                                        cols="30"
                                        rows="10"
                                        placeholder="اكتب رسالتك هنا"
                                    ></textarea>
                                    <span id="messageofmessage">
                                        يجب أن تحتوي الرسالة على الأقل 40 حرف
                                    </span>

                                       <div className="btn" data-aos="fade-down">
                                <button disabled id="btnoftwasal">
                                    إرسال
                                </button>
                            </div>
                                </form> */}
                                <ContactForm />
                            </div>
                        </div>

                        <div className="image" data-aos="fade-right">
                            <img
                                src={twasalimage || "images/twasal-image.png"}
                                alt={`twasal image`}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
