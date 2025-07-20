/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style

// api
import { appGetFamousSayingsRandomResult } from "../../../api/app/authApp";

// data

// plugin
import Toast from "../../../plugin/Toast";

// utils
import { App_User, nameMainColor, PAGE_SIZE } from "../../../utils/constants";

// components

// assets
import noimage from "../../../assets/images/error/no-image.jpg";

function FamousSayingsBanner() {
    const navigate = useNavigate();

    const [famousSayingsResult, setFamousSayingsResult] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchFamousSayingsResult = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetFamousSayingsRandomResult(
                    1,
                    currentPage,
                    selectedStatus
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setFamousSayingsResult(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFamousSayingsResult();
    }, [currentPage, selectedStatus]);

    // console.log(`appGetFamousSayingsRandomResult`, famousSayingsResult);

    return (
        <>
            <section className="section category" aria-label="category">
                <div className="container  max-w-full px-16 py-8">
                    <div>
                        <ul
                            className={`flex items-center justify-center flex-col lg:flex-row gap-8  mt-10`}
                        >
                            {famousSayingsResult &&
                                famousSayingsResult?.map((category, index) => (
                                    <li
                                        className={`min-h-full bg-blue-200  
                            rounded-4xl text-center flex items-center 
                            justify-center cursor-pointer 
                            transition-all duration-500 
                            hover:-translate-y-4 hover:shadow-lg
                            w-full
                        `}
                                        key={index}
                                        onClick={() => {
                                            navigate(`/${category.link}`);
                                        }}
                                        // data-aos="flip-left"
                                    >
                                        <div
                                            className={`
                                            category-card category-card-1 min-h-full  
                                            text-start rounded-4xl 
                                            transition-all duration-500 hover:-translate-y-4 hover:shadow-lg
                                            flex  items-center justify-start gap-4 w-full
                                        `}
                                            // style={{ color: "170, 75%, 41%" }}
                                            // style={{ backgroundColor: "170, 75%, 41%" }}
                                        >
                                            <div className="card-icon p-4   rounded-full  mb-8 ">
                                                <img
                                                    src={
                                                        category?.image_url ||
                                                        category?.image ||
                                                        noimage
                                                    }
                                                    // width="40"
                                                    // height="40"
                                                    loading="lazy"
                                                    alt={`${category?.title}`}
                                                    onError={(e) => {
                                                        e.target.src = noimage;
                                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                    }}
                                                    className="img w-80 h-80 rounded-full"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="h3 text-4xl">
                                                    <Link
                                                        // to={`/${category.link}`}
                                                        // href="#"
                                                        className=" "
                                                    >
                                                        {category?.title}
                                                    </Link>
                                                </h3>

                                                <p className="text-2xl text-gray-600 mt-2">
                                                    {category?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FamousSayingsBanner;
