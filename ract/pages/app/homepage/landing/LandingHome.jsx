/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGeoLocation from "react-ipgeolocation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules

// style
import "./LandingHome.scss";

// utils
import { nameplatform } from "../../../../utils/constants";

// assets
import herobg from "../../../../assets/images/landing/hero-bg.svg";
import herobanner1 from "../../../../assets/images/landing/hero-banner-1.jpg";
import herobanner2 from "../../../../assets/images/landing/hero-banner-2.jpg";
import heroshape1 from "../../../../assets/images/landing/hero-shape-1.svg";
import heroshape2 from "../../../../assets/images/landing/hero-shape-2.png";

import logo from "../../../../assets/images/logo/logo.png";
import noimage from "../../../../assets/images/error/no-image.jpg";

import slider1 from "../../../../assets/images/landing/slider_1.jpg";
import slider2 from "../../../../assets/images/landing/slider_2.jpg";
import slider3 from "../../../../assets/images/landing/slider_3.jpg";

function LandingHome() {
    // const { country } = useGeoLocation();
    // console.log(`data`, country);

    const landingimages = [
        {
            // icon: <BookOpen size={30} />,
            image: slider1,
            title: `الدورات`,
            link: `courses`,
        },
        {
            // image: <Gift size={30} />,
            image: slider2,
            title: `الدورات المجانية`,
            link: `coursesisfree`,
        },
        {
            // image: <Gift size={30} />,
            image: slider3,
            title: `الدورات المجانية`,
            link: `coursesisfree`,
        },
    ];

    return (
        <>
            <div className="lad min-h-dvh h-dvh">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    // style={{
                    //     "--swiper-navigation-color": "transparent",
                    //     "--swiper-pagination-color": "transparent",
                    // }}
                    // lazy={true}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        // delay: 1000000,
                        disableOnInteraction: false,
                    }}
                    // navigation={true}
                    className="mySwiper"
                    dir="rtl"
                >
                    {landingimages.map((land, index) => (
                        <SwiperSlide>
                            <img src={land?.image} loading="lazy" />

                            <div className="container min-h-dvh pt-40 flex items-center justify-center z-10">
                                <div className="relative select-none">
                                    <h2
                                        className="text-white text-9xl"
                                        data-aos="zoom-in-up"
                                    >
                                        {nameplatform}
                                    </h2>
                                    <p
                                        className="text-white mt-8"
                                        data-aos="zoom-in-up"
                                    >
                                        طريقك الصحيح نحو التعلم
                                    </p>
                                </div>
                            </div>
                            {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
                        </SwiperSlide>
                    ))}

                    {/* <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={herobanner1} loading="lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide> */}
                </Swiper>
            </div>
        </>

        // ==========================
        // <>
        //     <section
        //         className="section hero has-bg-image"
        //         id="home"
        //         aria-label="home"

        //         // style="background-image: url('./assets/images/hero-bg.svg')"
        //     >
        //         <div className="container  mx-auto px-0 pb-8 ">
        //             <div className="content">
        //                 <div
        //                     className=" text-center"
        //                     // data-aos="fade-left"
        //                     data-aos="zoom-in-up"
        //                 >
        //                     <div className="">
        //                         {/* {`
        //                             مرحبا بكم في الريادة طريقة جديدة في
        //                         `}
        //                         <Link to={`/courses`} className="span">
        //                             {`
        //                                 التعلم
        //                             `}
        //                         </Link> */}
        //                         <img
        //                             src={logo || noimage}
        //                             alt="logo"
        //                             onError={(e) => {
        //                                 e.target.src = noimage;
        //                                 e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
        //                             }}
        //                             className="max-h-dvh"
        //                             // style={{ maxHeight: "60dvh" }}
        //                         />
        //                     </div>

        //                     {/* <h2 className="text-5xl md:text-6xl lg:text-8xl text-cyan-800/75 py-10">
        //                         <Link to={`/courses`} className="span">
        //                             {`
        //                                 منصة ريادة التعليمية
        //                             `}
        //                         </Link>
        //                     </h2>

        //                     <p className=" text-center text-2xl md:text-3xl lg:text-4xl ">
        //                         {`
        //                             مصدرك الأول إلي مئوية القدرات والتحصيلي 100%
        //                         `}
        //                     </p> */}

        //                     {/* <Link
        //                         to={`/courses`}
        //                         href="#"
        //                         className="btn has-before"
        //                     >
        //                         <span className="span">
        //                             {`
        //                             اكتشف الدورات
        //                         `}
        //                         </span>

        //                         <ion-icon
        //                             name="arrow-forward-outline"
        //                             aria-hidden="true"
        //                         ></ion-icon>
        //                     </Link> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>

        // ==========================
        // <>
        //     <section
        //         className="section hero has-bg-image"
        //         id="home"
        //         aria-label="home"

        //         // style="background-image: url('./assets/images/hero-bg.svg')"
        //     >
        //         <div className="container  mx-auto px-0 py-8 ">
        //             <div className="content">
        //                 <div className="hero-content" data-aos="fade-left">
        //                     <h1 className="h1 section-title">
        //                         {`
        //                             مرحبا بكم في الريادة طريقة جديدة في
        //                         `}
        //                         <Link to={`/courses`} className="span">
        //                             {`
        //                                 التعلم
        //                             `}
        //                         </Link>
        //                     </h1>

        //                 //      <p className="hero-text">
        //                 //     Excepteur sint occaecat cupidatat non proident sunt
        //                 //     in culpa qui officia deserunt mollit.
        //                 // </p>

        //                     <Link
        //                         to={`/courses`}
        //                         href="#"
        //                         className="btn has-before"
        //                     >
        //                         <span className="span">
        //                             {`
        //                             اكتشف الدورات
        //                         `}
        //                         </span>

        //                         <ion-icon
        //                             name="arrow-forward-outline"
        //                             aria-hidden="true"
        //                         ></ion-icon>
        //                     </Link>
        //                 </div>

        //                 <figure className="hero-banner" data-aos="fade-right">
        //                     <div
        //                         className="img-holder one"
        //                         // style="--width: 270; --height: 300"
        //                         style={{ width: 270, height: 300 }}
        //                     >
        //                         <img
        //                             src={
        //                                 herobanner1 ||
        //                                 "./assets/images/hero-banner-1.jpg"
        //                             }
        //                             width={270}
        //                             height={300}
        //                             alt="hero banner"
        //                             className="img-cover"
        //                         />
        //                     </div>

        //                     <div
        //                         className="img-holder two"
        //                         style={{ width: 240, height: 370 }}
        //                     >
        //                         <img
        //                             src={
        //                                 herobanner2 ||
        //                                 "./assets/images/hero-banner-2.jpg"
        //                             }
        //                             width={240}
        //                             height={370}
        //                             alt="hero banner"
        //                             className="img-cover"
        //                         />
        //                     </div>

        //                     <img
        //                         src={
        //                             heroshape1 ||
        //                             "./assets/images/hero-shape-1.svg"
        //                         }
        //                         width={380}
        //                         height={190}
        //                         alt="hero"
        //                         className="shape hero-shape-1"
        //                     />

        //                     <img
        //                         src={
        //                             heroshape2 ||
        //                             "./assets/images/hero-shape-2.png"
        //                         }
        //                         width={622}
        //                         height={551}
        //                         alt="hero"
        //                         className="shape hero-shape-2"
        //                     />
        //                 </figure>
        //             </div>
        //         </div>
        //     </section>
        // </>
    );
}

export default LandingHome;
