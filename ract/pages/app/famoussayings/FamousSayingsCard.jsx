/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";

// style

// api
import { appGetFamousSayingsRandomResult } from "../../../api/app/authApp";

// data

// plugin
import Toast from "../../../plugin/Toast";

// utils
import { App_User, PAGE_SIZE } from "../../../utils/constants";

// components

// assets
import noimage from "../../../assets/images/error/no-image.jpg";

function FamousSayingsCard() {
    const navigate = useNavigate();

    const [famousSayingsResult, setFamousSayingsResult] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

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

        // دالة لإظهار الإشعار
        const showNotification = () => {
            setShow(true);

            // إخفاء الإشعار بعد 30 ثانية
            setTimeout(() => {
                setShow(false);
            }, 30000); // 30 ثانية = 30000 مللي ثانية
        };

        // إظهار الإشعار فور تحميل المكون لأول مرة
        showNotification();

        // ضبط مؤقت لإظهار الإشعار كل 10 دقائق
        const interval = setInterval(() => {
            showNotification();
        }, 600000); // 10 دقائق = 600000 مللي ثانية

        // تنظيف المؤقتات عند إلغاء تحميل المكون
        return () => {
            clearInterval(interval);
        };
    }, [currentPage, selectedStatus]);

    // console.log(`appGetFamousSayingsResult`, famousSayingsResult);

    return (
        <>
            {famousSayingsResult &&
                famousSayingsResult?.map((category, index) => (
                    <li
                        className={` bg-blue-200 w-max
                            rounded-4xl text-center flex items-center 
                            justify-center cursor-pointer 
                            transition-all duration-500 
                            hover:-translate-y-4 hover:shadow-lg
                             right-4 top-36 md:top-48 z-10
                            ${show ? "fixed" : "hidden"}
                        `}
                        key={index}
                        onClick={() => {}}
                        // data-aos="flip-left"
                    >
                        <div
                            className={`relative
                                category-card category-card-1 min-h-full  
                                text-center rounded-4xl 
                                transition-all duration-500 hover:-translate-y-4 hover:shadow-lg
                            `}
                            // style={{ color: "170, 75%, 41%" }}
                            // style={{ backgroundColor: "170, 75%, 41%" }}
                        >
                            <div
                                className="absolute left-4 top-4 flex justify-end "
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <span
                                    className={`
                                    p-2 rounded-full transition-all duration-500 border-2 border-blue-600 text-blue-600
                                    hover:bg-red-600 hover:text-white hover:border-white
                                    `}
                                >
                                    <X size={24} />
                                </span>
                            </div>

                            <div className="card-icon      p-4 grid place-items-center rounded-4xl mx-auto mb-8 ">
                                <img
                                    src={category?.image || noimage}
                                    // width="40"
                                    // height="40"
                                    loading="lazy"
                                    alt={`${category?.title}`}
                                    onError={(e) => {
                                        e.target.src = noimage;
                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                    }}
                                    className="img w-96 h-96 rounded-4xl"
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

                                <p className="text-2xl text-gray-600 mt-2 max-w-96">
                                    {category?.description}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
        </>
    );
}

export default FamousSayingsCard;
