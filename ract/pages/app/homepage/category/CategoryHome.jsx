/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    Gift,
    Images,
    Package,
    Radio,
    Languages,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// style
import "./CategoryHome.scss";

// utils
import { App_User, nameplatform } from "../../../../utils/constants";

// assets
import book from "../../../../assets/images/sectionsall/book.gif";
import computer from "../../../../assets/images/sectionsall/computer.gif";
import live from "../../../../assets/images/sectionsall/live.gif";
import opengift from "../../../../assets/images/sectionsall/open-gift.gif";
import packageA from "../../../../assets/images/sectionsall/package.gif";
import translator from "../../../../assets/images/sectionsall/translator.gif";

function CategoryHome() {
    const navigate = useNavigate();

    const categories = [
        {
            // icon: <BookOpen size={30} />,
            icon: book,
            title: `الدورات`,
            link: `courses`,
        },
        {
            // icon: <Gift size={30} />,
            icon: opengift,
            title: `الدورات المجانية`,
            link: `coursesisfree`,
        },
        {
            // icon: <Images size={30} />,
            icon: computer,
            title: `باوربوينت المعلم`,
            link: `powerpoints`,
        },
        {
            // icon: <Package size={30} />,
            icon: packageA,
            title: `الباقات`,
            link: `packages`,
        },
        {
            // icon: <Radio size={30} />,
            icon: live,
            title: `الدورات المباشرة`,
            link: `coursesislive`,
        },
        {
            // icon: <Languages size={30} />,
            icon: translator,
            title: `خدمة التدقيق اللغوي`,
            link: `${App_User}/proofreadingservices`,
        },
    ];

    return (
        <>
            <section
                className="section category select-none"
                aria-label="category"
            >
                <div className="container max-w-full px-16 py-8">
                    <p className="section-subtitle" data-aos="fade-down">
                        {nameplatform}
                    </p>

                    <h2 className="h2 section-title mb-10" data-aos="fade-down">
                        اكتشف الأقسام
                    </h2>

                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            // delay: 1000000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        // navigation
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        dir="rtl"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide
                                key={index}
                                className="slideli mb-28 transition-all duration-500"
                            >
                                <div
                                    className="category-card category-card-1 text-center rounded-4xl p-6 cursor-pointer hover:-translate-y-4 hover:shadow-lg transition-all duration-500"
                                    onClick={() =>
                                        navigate(`/${category.link}`)
                                    }
                                    data-aos="flip-left"
                                >
                                    <div className="  h-40 w-40 p-4 grid place-items-center rounded-full mx-auto mb-6 bg-white overflow-hidden">
                                        {/* {category.icon} */}
                                        <div className="card-icon">
                                            <img
                                                src={category?.icon}
                                                // width="40"
                                                // height="40"
                                                loading="lazy"
                                                alt={`${category?.title}`}
                                                className="img"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="h3">{category.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
}

export default CategoryHome;
