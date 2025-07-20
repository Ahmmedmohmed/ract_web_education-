/* eslint-disable no-unused-vars */
import React from "react";
import { CheckCheck } from "lucide-react";

// style
import "./AboutHome.scss";

// assets
// import aboutbanner from "../../../../assets/images/about/about-banner.jpg";
import aboutbanner from "../../../../assets/images/about/about-banner.png";
import aboutshape1 from "../../../../assets/images/about/about-shape-1.svg";
import aboutshape2 from "../../../../assets/images/about/about-shape-2.svg";
import aboutshape3 from "../../../../assets/images/about/about-shape-3.png";
import aboutshape4 from "../../../../assets/images/about/about-shape-4.svg";
import noimage from "../../../../assets/images/error/no-image.jpg";

function AboutHome() {
    const aboutlist = [
        {
            icon: <CheckCheck className="text-amber-500 text-3xl" />,
            title: "مدربين خبراء",
        },
        {
            icon: <CheckCheck className="text-amber-500 text-3xl" />,
            title: "التعلم عن بعد عبر الإنترنت",
        },
        {
            icon: <CheckCheck className="text-amber-500 text-3xl" />,
            title: "الوصول مدى الحياة",
        },
    ];

    return (
        <>
            <section
                className="section about py-20 overflow-hidden md:py-32"
                id="about"
                aria-label="about"
            >
                <div className="container ">
                    <div className="content w-full flex items-start justify-between gap-8 flex-col lg:flex-row">
                        <div className="about-content relative z-[1] flex-1">
                            <p
                                className="section-subtitle text-start "
                                data-aos="fade-down"
                            >
                                عنا
                            </p>

                            <h2
                                className="h2 section-title text-start"
                                data-aos="fade-down"
                            >
                                {/* 
                            <span className="span">Distant learning</span> for
                             */}
                                {`
                            أكثر من 10 سنوات في التعلم عن بعد لتطوير المهارات
                            `}
                            </h2>

                            <p
                                className="section-text text-start"
                                data-aos="fade-down"
                            >
                                {`
                           ترغب في تطوير مهاراتك الأكاديمية، فإن موقعنا يقدم الموارد والأدوات التي تحتاج إليها.
انضم إلينا اليوم واكتشف عالم التعلم الشيق والمثير لدينا!
                           `}
                            </p>

                            <ul className="about-list" data-aos="fade-down">
                                {aboutlist?.map((about, index) => (
                                    <li
                                        className="about-item my-4 flex items-center gap-4"
                                        key={index}
                                    >
                                        {/* <ion-icon
                                        name="checkmark-done-outline"
                                        aria-hidden="true"
                                    ></ion-icon> */}
                                        {about?.icon}

                                        <span className="span text-3xl text-black">
                                            {about?.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <img
                                src={
                                    aboutshape4 ||
                                    "./assets/images/about-shape-4.svg"
                                }
                                width="100"
                                height="100"
                                alt="about"
                                loading="lazy"
                                data-aos="fade-down"
                                className="shape about-shape-4 lg:top-8 right-16 z-[-1]"
                            />
                        </div>

                        <figure
                            className="about-banner relative z-[1] flex-1 flex flex-col items-center justify-center"
                            data-aos="fade-right"
                        >
                            <div
                                className="img-holder  flex items-center justify-center left-0 relative md:-translate-x-1/2 rounded-2xl md:max-w-full"
                                // style={{ width: 520, height: 370 }}
                            >
                                <img
                                    src={
                                        aboutbanner ||
                                        noimage ||
                                        "./assets/images/about-banner.jpg"
                                    }
                                    width="520"
                                    height="370"
                                    loading="lazy"
                                    alt="about banner"
                                    onError={(e) => {
                                        e.target.src = noimage;
                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                    }}
                                    className="img-cover flex items-center justify-center max-w-full max-h-[400px] "
                                />
                            </div>

                            {/* <img
                                src={
                                    aboutshape1 ||
                                  
                                    "./assets/images/about-shape-1.svg"
                                }
                                width="360"
                                height="420"
                                loading="lazy"
                                alt="about"
                                
                                className="shape about-shape-1"
                            /> */}

                            <img
                                src={
                                    aboutshape2 ||
                                    "./assets/images/about-shape-2.svg"
                                }
                                width="371"
                                height="220"
                                loading="lazy"
                                alt="about"
                                className="shape about-shape-2 block -bottom-28 -left-20"
                            />

                            <img
                                src={
                                    aboutshape3 ||
                                    "./assets/images/about-shape-3.png"
                                }
                                width="722"
                                height="528"
                                loading="lazy"
                                alt="about"
                                className="shape about-shape-3"
                            />
                        </figure>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutHome;
