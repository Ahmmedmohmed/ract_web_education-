import React from "react";
import { useNavigate } from "react-router-dom";

// utils
import { nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function CategoryCard({ category }) {
    const navigate = useNavigate();

    return (
        <>
            <li
                // key={index}
                className={`mb-20 flex flex-col items-center  ${
                    category?.is_visible === false ? "hidden" : ""
                }`}
                onClick={() => {
                    navigate(`/categories/${category?.id}`);
                }}
                data-aos="fade-up"
            >
                <div
                    className={`group cursor-pointer rounded-2xl p-4 py-8
                        transition-all duration-500 
                        text-center 
                        
                        hover:-translate-y-4
                    `}
                    onClick={() => {
                        // handleCategoryClick(category);
                    }}
                >
                    <div
                        className={`
                            flex  items-center justify-center rounded-full 
                            bg-white shadow-lg drop-shadow-2xl transition-all duration-500 p-16
                            mb-8  
                            w-96  h-96
                        `}
                    >
                        <img
                            src={
                                category?.image_url ||
                                category?.image ||
                                noimage
                            }
                            alt={category?.title}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="h-full w-full object-fill mx-auto"
                        />
                    </div>

                    <h3
                        className={`card-title text-3xl font-bold group-hover:text-blue-600 transition-all duration-500`}
                    >
                        {category?.title}
                    </h3>
                </div>
            </li>
        </>
    );
}

export default CategoryCard;
