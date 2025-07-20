/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// style
import "./BlogsList.scss";

// api
import { appGetBlogsApp } from "../../../../api/app/authApp";

// data
import { blogPosts } from "../../../../data/blogData";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { name, nameMainColor, PAGE_SIZE } from "../../../../utils/constants";

// components
import BlogCard from "../card/BlogCard";

// assets
import blogshape from "../../../../assets/images/blog/blog-shape.png";
import noimage from "../../../../assets/images/error/no-image.jpg";

function BlogsList() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchSectionsBlogs = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetBlogsApp(
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
                    setBlogs(data);
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

        fetchSectionsBlogs();
    }, [currentPage, selectedStatus]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 pt-80">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    //
    // const [currentPage, setCurrentPage] = useState(1);
    // const postsPerPage = 3;
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
    // const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    //     // window.scrollTo(0, 0);
    // };

    return (
        <>
            <section
                className="section blog has-bg-image min-h-dvh "
                id="blog"
                aria-label="blog"
            >
                <div className="container relative py-20">
                    <img
                        src={blogshape || noimage}
                        width="186"
                        height="186"
                        loading="lazy"
                        alt="blog-shape"
                        onError={(e) => {
                            e.target.src = noimage;
                            e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                        }}
                        className="shape blog-shape top-0 left-0"
                    />

                    <p className="section-subtitle" data-aos="fade-down">
                        كل المقالات
                    </p>

                    <h2 className="h2 section-title" data-aos="fade-down">
                        كل المقالات مع {name}
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : blogs?.length === 0 ? (
                        <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لا توجد مقالات حاليا
                            </p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs?.map((blog, index) => (
                                <BlogCard blog={blog} key={index} />
                            ))}
                        </ul>
                    )}

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => {
                                    handlePageChange(currentPage - 1);
                                }}
                                disabled={currentPage === 1}
                                className="pagination-btn"
                                aria-label="السابق"
                            >
                                <ion-icon
                                    name="arrow-forward-outline"
                                    aria-hidden="true"
                                ></ion-icon>
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => {
                                        handlePageChange(index + 1);
                                    }}
                                    className={`pagination-btn ${
                                        currentPage === index + 1
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => {
                                    handlePageChange(currentPage + 1);
                                }}
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                                aria-label="التالي"
                            >
                                {" "}
                                <ion-icon
                                    name="arrow-back-outline"
                                    aria-hidden="true"
                                ></ion-icon>
                            </button>
                        </div>
                    )} */}

                    <img
                        src={blogshape || noimage}
                        width="186"
                        height="186"
                        loading="lazy"
                        alt="blog-shape"
                        onError={(e) => {
                            e.target.src = noimage;
                            e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                        }}
                        className="shape blog-shape "
                    />
                </div>
            </section>
        </>
    );
}

export default BlogsList;
