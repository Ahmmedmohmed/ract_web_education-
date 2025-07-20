/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
import "./CategoryPage.scss";

// api
import {
    appGetCategories,
    appGetCategoriesApp,
} from "../../../../api/app/authApp";

// data
import { categorycourses } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { nameMainColor, PAGE_SIZE } from "../../../../utils/constants";

// components
import CategoryCard from "../card/CategoryCard";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function CategoriesList() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        fetchCategories();
    }, [currentPage, selectedStatus]);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await appGetCategoriesApp(
                currentPage,
                selectedStatus
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب التصنيفات");
                navigate(`/`);
            } else {
                setCategories(data);
                setAllCategories(data);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
            );
            setIsLoading(false);
            navigate(`/`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 pt-80">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <>
            <section className="section category-page min-h-screen bg-gray-50 pt-32 pb-20">
                <div className="container mx-auto">
                    <div className="pt-20">
                        <div className="category-header text-center mb-10">
                            <p
                                className="section-subtitle text-lg text-gray-600"
                                data-aos="fade-down"
                            >
                                تصنيفات الدورات
                            </p>
                            <h1
                                className="h2 section-title text-3xl font-bold mb-4"
                                data-aos="fade-down"
                            >
                                استكشف تصنيفات الدورات
                            </h1>
                        </div>

                        {/* عرض التصنيفات الرئيسية */}
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : categories?.length === 0 ? (
                            <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                                <p className="text-gray-500">لا توجد تصنيفات</p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categories?.map((category, index) => (
                                    <CategoryCard
                                        key={index}
                                        category={category}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default CategoriesList;
