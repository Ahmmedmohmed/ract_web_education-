import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// style
import "./Question.scss";

function Question() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const questions = [
        {
            question: "كيف يمكنني الإشتراك في الأكاديمية ؟",
            // answer: 'للإشتراك في أكاديمية مُعلم تجد زر الإشتراك في الصفحة الرئيسية لتقوم بتجيل معلوماتك أو <a href="/signup">بالضغط هنا</a>',
            answer: "للإشتراك في أكاديمية مُعلم تجد زر الإشتراك في الصفحة الرئيسية لتقوم بتجيل معلوماتك .",
        },
        {
            question: "ماهي أكاديمية مُعلم ؟",
            answer: "أكاديمية شاملة تضم جميع المناهج الدراسية من الإبتدائي و حتى المرحلة الجامعية. و هذا مايميز أكاديمية مُعلم عن غيرها من الأكاديميات الإفتراضية . ماذا تنتظر وفر الجهد و المال و قم بحجز دروسك عبر أكاديمية مُعلم .",
        },
        {
            question: "كيف تعمل أكاديمية مُعلم ؟",
            answer: "من خلال ثلاث خطوات بسيطة يمكنك البدء في الدراسة أونلاين . من خلال جوالك أو حاسوبك الشخصي قم بالإشتراك في أكاديمية مُعلم ثم إختر المواد التعليمية ثم إختر المُدرس ثم إنطلق في الدرس",
        },
    ];

    const handleQuestionClick = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <>
            <div className="question">
                <div className="container">
                    <div className="question-box">
                        <div className="content" data-aos="fade-left">
                            <h2
                                className="title"
                                onClick={() => {
                                    navigate(`/question`);
                                }}
                            >
                                {`لديك سؤال ؟`}
                            </h2>

                            <p>
                                {`نعرض بعض الأسئلة التي تتكرر من تلاميذنا إذا كان
                                لك سؤال آخر تواصل معنا`}
                            </p>

                            <Link to={`/contact`} href="twasol.html">
                                {`تواصل معنا`}
                            </Link>
                        </div>

                        <div className="text" data-aos="fade-right">
                            {questions &&
                                questions?.map((item, index) => (
                                    <div className="quest" key={index}>
                                        <div
                                            className="questBox"
                                            onClick={() => {
                                                handleQuestionClick(index);
                                            }}
                                        >
                                            <p>{item?.question}</p>

                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                className={`down ${
                                                    openIndex === index
                                                        ? "saber"
                                                        : ""
                                                }`}
                                            />
                                        </div>

                                        <div
                                            className={
                                                openIndex
                                                    ? "content-box "
                                                    : "content-box"
                                            }
                                            style={{
                                                height:
                                                    openIndex === index
                                                        ? "auto"
                                                        : "0",
                                                overflow: "hidden",
                                                transition: "height 0.3s ease",
                                                opacity: 1,
                                            }}
                                        >
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: item.answer,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                ))}

                            {/* <div className="quest">
                                <div className="questBox">
                                    <p>ماهي أكاديمية مُعلم ؟</p>

                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="down"
                                    />
                                </div>

                                <div className="content-box">
                                    <p>
                                        أكاديمية شاملة تضم جميع المناهج الدراسية
                                        من الإبتدائي و حتى المرحلة الجامعية. و
                                        هذا مايميز أكاديمية مُعلم عن غيرها من
                                        الأكاديميات الإفتراضية . ماذا تنتظر وفر
                                        الجهد و المال و قم بحجز دروسك عبر
                                        أكاديمية مُعلم .
                                    </p>
                                </div>
                            </div>

                            <div className="quest">
                                <div className="questBox">
                                    <p>كيف يمكنني الإشتراك في الأكاديمية ؟</p>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="down"
                                    />
                                </div>
                                <div className="content-box">
                                    <p>
                                        للإشتراك في أكاديمية مُعلم تجد زر
                                        الإشتراك في الصفحة الرئيسية لتقوم بتجيل
                                        معلوماتك أو
                                        <a href="#">بالضغط هنا</a>
                                    </p>
                                </div>
                            </div>

                            <div className="quest">
                                <div className="questBox">
                                    <p>كيف تعمل أكاديمية مُعلم ؟</p>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="down"
                                    />
                                </div>
                                <div className="content-box">
                                    <p>
                                        من خلال ثلاث خطوات بسيطة يمكنك البدء في
                                        الدراسة أونلاين . من خلال جوالك أو
                                        حاسوبك الشخصي قم بالإشتراك في أكاديمية
                                        مُعلم ثم إختر المواد التعليمية ثم إختر
                                        المُدرس ثم إنطلق في الدرس
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Question;
