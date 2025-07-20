/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images, Languages } from "lucide-react";

// utils
import { App_User } from "../../../../utils/constants";

function StoreList() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const categories = [
        {
            icon: <Images size={30} />,
            title: `باوربوينت المعلم`,
            link: `powerpoints`,
        },
        {
            icon: <Languages size={30} />,
            title: `خدمة التدقيق اللغوي`,
            link: `${App_User}/proofreadingservices`,
        },
    ];

    const testimonialsPerPage = 4;
    const totalPages = Math.ceil(categories.length / testimonialsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const displayedCategories = categories.slice(
        currentSlide * testimonialsPerPage,
        (currentSlide + 1) * testimonialsPerPage
    );

    return (
        <>
            <section
                className="section course category"
                id="courses-courses"
                aria-label="course"
            >
                <div className="container">
                    <div className="pt-20">
                        <p className="section-subtitle" data-aos="fade-down">
                            {`
                            صفحة المتجر 
                        `}
                        </p>

                        <h2 className="h2 section-title" data-aos="fade-down">
                            {`
                            انتقل الي ما تريد
                        `}
                        </h2>

                        <div>
                            <ul
                                className={`flex items-center justify-center flex-col lg:flex-row gap-8  mt-10`}
                            >
                                {displayedCategories &&
                                    displayedCategories?.map(
                                        (category, index) => (
                                            <li
                                                className="min-h-full w-full"
                                                key={index}
                                                onClick={() => {
                                                    navigate(
                                                        `/${category.link}`
                                                    );
                                                }}
                                                data-aos="flip-left"
                                            >
                                                <div
                                                    className={`
                                                category-card category-card-1 min-h-full  
                                                text-center rounded-4xl 
                                                transition-all duration-500 hover:-translate-y-4 hover:shadow-lg
                                            `}
                                                    // style={{ color: "170, 75%, 41%" }}
                                                    // style={{ backgroundColor: "170, 75%, 41%" }}
                                                >
                                                    <div className="card-icon h-28 w-28  p-4 grid place-items-center rounded-full mx-auto mb-8 ">
                                                        {/* <img
                                                    src={
                                                        category?.image ||
                                                        category1 ||
                                                        "./assets/images/category-1.svg"
                                                    }
                                                    width="40"
                                                    height="40"
                                                    loading="lazy"
                                                    alt={`${category?.title}`}
                                                    className="img"
                                                /> */}
                                                        {category?.icon}
                                                    </div>

                                                    <h3 className="h3">
                                                        <Link
                                                            to={`/${category?.link}`}
                                                            href="#"
                                                            className=" "
                                                        >
                                                            {category?.title}
                                                        </Link>
                                                    </h3>
                                                </div>
                                            </li>
                                        )
                                    )}
                            </ul>

                            {/* Navigation */}
                            {/* <div
                                className="flex justify-center gap-4 mt-8"
                                data-aos="fade-down"
                            >
                                <button
                                    onClick={nextSlide}
                                    className="mx-2 w-14 h-14 rounded-full bg-[#1ab79d] text-white flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-500"
                                >
                                    <ChevronRight
                                        size={20}
                                        // className="h-5 w-5"
                                    />
                                </button>

                                <div className="flex space-x-2 items-center gap-4">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`w-8 h-8 rounded-full transition-colors ${
                                                i === currentSlide
                                                    ? "bg-[#1ab79d]"
                                                    : "bg-gray-500"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={prevSlide}
                                    className="mx-2 w-14 h-14 rounded-full bg-[#1ab79d] text-white flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-500"
                                >
                                    <ChevronLeft
                                        size={20}
                                        // className="h-5 w-5"
                                    />
                                </button>
                            </div> */}
                        </div>

                        {/* <Link
                            to={`/${App_User}/packages`}
                            href="#"
                            className="btn has-before"
                        >
                            <span className="span">أنشاء باقتك الخاصة</span>

                            <ion-icon
                                name="arrow-forward-outline"
                                aria-hidden="true"
                            ></ion-icon>
                        </Link> */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default StoreList;
