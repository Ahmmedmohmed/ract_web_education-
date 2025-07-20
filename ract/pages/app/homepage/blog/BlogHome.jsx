/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// style
import "./BlogHome.scss";

// data
import { blogPosts } from "../../../../data/blogData";

// utils
import { name, nameplatform } from "../../../../utils/constants";

// components
import BlogCard from "../../blogspage/card/BlogCard";

// assets
import blog1 from "../../../../assets/images/blog/blog-1.jpg";
import blog2 from "../../../../assets/images/blog/blog-2.jpg";
import blog3 from "../../../../assets/images/blog/blog-3.jpg";
import blogshape from "../../../../assets/images/blog/blog-shape.png";

function BlogHome({ section }) {
    const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    // const postsPerPage = 3;
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
    // const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    // console.log(`section`, section);

    return (
        <>
            <section
                className="section blog has-bg-image relative"
                id="blog"
                aria-label="blog"
                // style={{ckground-image: url('./assets/images/blog-bg.svg')}}
            >
                <div className="container relative">
                    <img
                        src={blogshape || "./assets/images/blog-shape.png"}
                        width="186"
                        height="186"
                        loading="lazy"
                        alt="blog-shape"
                        className="shape blog-shape top left-0"
                    />

                    <p
                        className="section-subtitle"
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/blogs`);
                        }}
                    >
                        أخر المقالات مع {nameplatform}
                    </p>

                    <h2
                        className="h2 section-title"
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/blogs`);
                        }}
                    >
                        {section?.title || "المقالات"}
                    </h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {section?.blogs?.map((blog, index) => (
                            <BlogCard blog={blog} key={index} />
                        ))}
                    </ul>

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
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
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                                aria-label="التالي"
                            >
                                <ion-icon
                                    name="arrow-back-outline"
                                    aria-hidden="true"
                                ></ion-icon>
                            </button>
                        </div>
                    )} */}

                    <img
                        src={blogshape || "./assets/images/blog-shape.png"}
                        width="186"
                        height="186"
                        loading="lazy"
                        alt="blog-shape"
                        className="shape blog-shape bottom right-0"
                    />
                </div>
            </section>
        </>
    );
}

export default BlogHome;
