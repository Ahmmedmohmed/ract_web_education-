/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";

// style
import "./WhyUs.scss";

// ui
import MainTitle from "../../../ui/title/MainTitle";

// assets
import whyusimage from "../../../assets/images/whyus/image-3.png";
import teachericonimage from "../../../assets/images/whyus/teacher-icon.png";
import stageimage from "../../../assets/images/whyus/stage1.png";
import scienceimage from "../../../assets/images/whyus/science.png";

function WhyUs() {
    const navigate = useNavigate();

    return (
        <>
            <div className="why-us" id="why-us">
                <div className="container">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/whyus`);
                        }}
                    >
                        {`لماذا أكاديمية مُعلم ؟`}
                    </MainTitle>

                    <div className="why-us-box">
                        <img
                            id="why-usImage"
                            src={whyusimage || "images/image-3.png"}
                            alt={`why us image`}
                            data-aos="fade-left"
                            loading="lazy"
                        />

                        <div className="boxes" data-aos="fade-right">
                            <div className="box" data-aos="fade-down">
                                <div className="icon">
                                    <img
                                        src={
                                            teachericonimage ||
                                            "images/teacher-icon.png"
                                        }
                                        alt={`teacher icon image`}loading="lazy"
                                    />
                                </div>

                                <div className="text">
                                    <h3>{`أفضل المدرسين`}</h3>
                                    <p>
                                        {`يتدرب التلميذ على وتيرته الخاصة ، حيث
                                        يقوم أولا بملئ الفجوات في الفهم ثم تسريع
                                        التعلم عن طريق الأعمال و الواجبات`}
                                    </p>
                                </div>
                            </div>

                            <div className="box" data-aos="fade-down">
                                <div className="icon">
                                    <img
                                        src={stageimage || "images/stage1.png"}
                                        alt={`stage image`}loading="lazy"
                                    />
                                </div>

                                <div className="text">
                                    <h3>{`متابعة دقيقة`}</h3>
                                    <p>
                                        {`وسائل المتابعة و التخطيط عن طريق جمع
                                        معلومات الدراسة الخاصة بكل تلميذ و
                                        نمذجتها عن طريق الذكاء الاصطناعى لمعرفة
                                        الأخطاء و العقبات و تصحيحها`}
                                    </p>
                                </div>
                            </div>

                            <div className="box" data-aos="fade-down">
                                <div className="icon">
                                    <img
                                        src={
                                            scienceimage || "images/science.png"
                                        }
                                        alt={`science image`}loading="lazy"
                                    />
                                </div>

                                <div className="text">
                                    <h3>{`جدول زمني مريح`}</h3>
                                    <p>
                                        {`يتدرب التلميذ على وتيرته الخاصة ، حيث
                                        يقوم أولا بملئ الفجوات في الفهم ثم تسريع
                                        التعلم عن طريق الأعمال و الواجبات`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WhyUs;
