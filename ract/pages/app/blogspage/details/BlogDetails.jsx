/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    CalendarDays,
    ChartNoAxesCombined,
    Download,
    Frown,
    MessageCircle,
    Save,
} from "lucide-react";

// style
import "./BlogDetails.scss";

// api
import {
    appGetBlogById,
    appGetBlogsResult,
    appGetYouTubeSuggestionsBlogResult,
} from "../../../../api/app/authApp";

// data
import { blogPosts } from "../../../../data/blogData";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { formatDateAR } from "../../../../utils/helpers";
import { nameMainColor, PAGE_SIZE } from "../../../../utils/constants";

// components
import BlogCard from "../card/BlogCard";
import SuggestionCard from "../../youTubesuggestions/card/SuggestionCard";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../assets/images/user/default-user.jpg";

function BlogDetails() {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [blogResult, setBlogResult] = useState(null);
    const [suggestionResult, setSuggestionResult] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    const [nextPost, setNextPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetBlogById(blogId);

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast("error", error.message || "حدث خطأ أثناء جلب الدورة");
                    navigate(`/blogs`);
                } else {
                    // Set form values
                    setBlog(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                Toast("error", "حدث خطأ أثناء جلب الدورة");
                navigate(`/blogs`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [blogId, navigate]);

    useEffect(() => {
        const fetchBlogsResult = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetBlogsResult(
                    3,
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
                    setBlogResult(data);
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
        fetchBlogsResult();
    }, [currentPage, selectedStatus]);

    useEffect(() => {
        const fetchYouTubeSuggestionsBlogResult = async () => {
            try {
                setIsLoading(true);

                const { data, error } =
                    await appGetYouTubeSuggestionsBlogResult(
                        2,
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
                    setSuggestionResult(data);
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
        fetchYouTubeSuggestionsBlogResult();
    }, [currentPage, selectedStatus]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     setLoading(true);

    //     const currentPost = blogPosts.find((post) => blog?.id === id);

    //     if (currentPost) {
    //         setBlog(currentPost);

    //         // Find next and previous posts
    //         const currentIndex = blogPosts.findIndex((post) => blog?.id === id);
    //         setPrevPost(currentIndex > 0 ? blogPosts[currentIndex - 1] : null);
    //         setNextPost(
    //             currentIndex < blogPosts.length - 1
    //                 ? blogPosts[currentIndex + 1]
    //                 : null
    //         );

    //         setLoading(false);
    //     } else {
    //         // Redirect to blogs page if post not found
    //         navigate("/blogs");
    //     }
    // }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // console.log(`cl`, blog);
    // console.log(`cl`, suggestionResult);

    return (
        <>
            <section className="blog-details section" id="blog-details">
                <div className="container">
                    {/* Hero Section */}
                    <div
                        className="hero-section"
                        // data-aos="fade-up"
                    >
                        <img
                            src={blog?.image_url || blog?.image || noimage}
                            alt={blog?.title}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="hero-image"
                        />

                        <div className="overlay"></div>

                        <div className="hero-content">
                            {/* <span className="subtitle">{blog?.subtitle}</span> */}

                            <h1 className="title">{blog?.title}</h1>

                            <div className="meta">
                                <div className="author">
                                    <div className="avatar">
                                        <img
                                            src={userimage || noimage}
                                            alt={blog?.user?.full_name}
                                            onError={(e) => {
                                                e.target.src = noimage;
                                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                            }}
                                        />
                                    </div>

                                    <div className="info">
                                        <p className="name">
                                            {blog?.user?.first_name +
                                                " " +
                                                blog?.user?.last_name}
                                        </p>

                                        {/* <p className="role">
                                            {blog?.author?.role}
                                        </p> */}
                                    </div>
                                </div>

                                <div className="stats">
                                    <div className="stat">
                                        {/* <ion-icon
                                            name="calendar-outline"
                                            aria-hidden="true"
                                        ></ion-icon> */}
                                        <CalendarDays />
                                        <span>
                                            {formatDateAR(blog?.created_at)}
                                        </span>
                                    </div>

                                    <div className="stat">
                                        <ChartNoAxesCombined
                                            size={16}
                                            // className="ml-1"
                                        />
                                        <span>{blog?.views} </span>
                                        <span>مشاهدات</span>
                                    </div>

                                    <div className="stat">
                                        {/* <ion-icon
                                            name="chatbubbles-outline"
                                            aria-hidden="true"
                                        ></ion-icon> */}
                                        <MessageCircle />

                                        <span>{blog?.total_comment} </span>
                                        <span>تعليق</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <div
                            className="content-card"
                            // data-aos="fade-up"
                        >
                            {/* <div
                                className="blog-content"
                                dangerouslySetInnerHTML={{
                                    __html: blog?.content,
                                }}
                            /> */}

                            <div>
                                <h2 className="text-center text-4xl font-bold text-black mb-10">
                                    {blog?.title}
                                </h2>
                            </div>

                            <div className="blog-content">
                                <h3 className="text-4xl font-bold text-black mb-5 mt-15">
                                    المقالة:-
                                </h3>
                                <p>
                                    {blog?.description
                                        ?.split("=*=")
                                        .map((line, index) => (
                                            <span
                                                key={index}
                                                className="block mb-4"
                                            >
                                                {line.trim() && (
                                                    <>{line.trim()}</>
                                                )}
                                            </span>
                                        ))}
                                </p>
                            </div>

                            <div className="blog-content">
                                <h3 className="text-4xl font-bold text-black mb-5 mt-15">
                                    ملخص:-
                                </h3>
                                <p>{blog?.summary}</p>
                            </div>

                            <div className="blog-content">
                                <h3 className="text-4xl font-bold text-black mb-5 mt-15">
                                    الملفات
                                </h3>

                                <ul className="flex flex-wrap gap-4">
                                    {/*  */}
                                    {!blog?.file_pdf &&
                                        !blog?.file_pdf_url &&
                                        !blog?.file_pdf_url &&
                                        !blog?.file_word && (
                                            <li className="flex items-center gap-4">
                                                <span>
                                                    لا يوجد ملفات للتحميل
                                                </span>
                                                <Frown size={18} />
                                            </li>
                                        )}

                                    {/*  */}
                                    {blog?.file_pdf && (
                                        <li>
                                            <a
                                                href={blog?.file_pdf}
                                                target="_blank"
                                                download={true}
                                                className={`w-max flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                            >
                                                <span>تحميل ملف PDF</span>

                                                <Download size={18} />
                                            </a>
                                        </li>
                                    )}

                                    {/*  */}
                                    {blog?.file_pdf_url && (
                                        <li>
                                            <a
                                                href={blog?.file_pdf_url}
                                                target="_blank"
                                                download={true}
                                                className={`w-max flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                            >
                                                <span>تحميل ملف PDF</span>

                                                <Download size={18} />
                                            </a>
                                        </li>
                                    )}

                                    {/*  */}
                                    {blog?.file_word && (
                                        <li>
                                            <a
                                                href={blog?.file_word}
                                                target="_blank"
                                                download={true}
                                                className={`w-max flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                            >
                                                <span>تحميل ملف Word</span>

                                                <Download size={18} />
                                            </a>
                                        </li>
                                    )}

                                    {/*  */}
                                    {blog?.file_word_url && (
                                        <li>
                                            <a
                                                href={blog?.file_word_url}
                                                target="_blank"
                                                download={true}
                                                className={`w-max flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                            >
                                                <span>تحميل ملف Word</span>

                                                <Download size={18} />
                                            </a>
                                        </li>
                                    )}
                                </ul>

                                {/* <Link
                                    to={`/courses`}
                                    href="#"
                                    className="btn has-before"
                                >
                                    <span className="span">تحميل ملف Word</span>

                                    <ion-icon
                                        name="arrow-forward-outline"
                                        aria-hidden="true"
                                    ></ion-icon>
                                </Link> */}
                            </div>

                            {/* Tags */}
                            <div className="tags">
                                {blog?.teach_list?.map((tag, index) => (
                                    <span key={index} className="tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        {/* <div
                            className="navigation-section"
                            // data-aos="fade-up"
                        >
                            <div>
                                {nextPost && (
                                    <Link
                                        to={`/blogs/${nextPost?.id}`}
                                        className="nav-link next"
                                    >
                                        <span>المقال التالي</span>
                                        <ion-icon
                                            name="arrow-forward-outline"
                                            aria-hidden="true"
                                        ></ion-icon>
                                    </Link>
                                )}
                            </div>

                            <Link to="/blogs" className="all-posts">
                                جميع المقالات
                            </Link>

                            <div>
                                {prevPost && (
                                    <Link
                                        to={`/blogs/${prevPost?.id}`}
                                        className="nav-link prev"
                                    >
                                        <ion-icon
                                            name="arrow-back-outline"
                                            aria-hidden="true"
                                        ></ion-icon>
                                        <span>المقال السابق</span>
                                    </Link>
                                )}
                            </div>
                        </div> */}

                        {/* Related Posts */}
                        <div className="related-posts mt-20" data-aos="fade-up">
                            <h3 className="section-title">اقتراحات اليوتيوب</h3>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                                {suggestionResult &&
                                    suggestionResult?.map((blog, index) => (
                                        <SuggestionCard
                                            blog={blog}
                                            key={index}
                                        />
                                    ))}
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="related-posts mt-20" data-aos="fade-up">
                            <h3 className="section-title">مقالات ذات صلة</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogResult &&
                                    blogResult?.map((blog, index) => (
                                        <BlogCard blog={blog} key={index} />
                                        // <div
                                        //     key={index}
                                        //     className="post-card"
                                        //     data-aos="flip-left"
                                        // >
                                        //     <div className="image">
                                        //         <img
                                        //             src={
                                        //                 relatedPost?.image ||
                                        //                 noimage
                                        //             }
                                        //             alt={relatedPost?.title}
                                        //             onError={(e) => {
                                        //                 e.target.src = noimage;
                                        //                 e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                        //             }}
                                        //         />
                                        //         <div className="overlay"></div>
                                        //     </div>
                                        //     <div className="details">
                                        //         <h4 className="title">
                                        //             <Link
                                        //                 to={`/blogs/${relatedPost?.id}`}
                                        //             >
                                        //                 {relatedPost?.title}
                                        //             </Link>
                                        //         </h4>
                                        //         <p className="date">
                                        //             {relatedPost?.date}
                                        //         </p>
                                        //     </div>
                                        // </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetails;
