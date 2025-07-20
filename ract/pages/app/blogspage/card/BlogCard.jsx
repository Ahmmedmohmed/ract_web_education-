import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, ChartNoAxesCombined } from "lucide-react";

// style
// import "./BlogCard.scss";

// utils
import { formatDateAR } from "../../../../utils/helpers";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function BlogCard({ blog }) {
    const navigate = useNavigate();

    return (
        <>
            <li
                onClick={() => {
                    navigate(`/blogs/${blog?.id}`);
                }}
                data-aos="flip-left"
            >
                <div className="blog-card group transition-all duration-500 ">
                    <figure
                        className="card-banner img-holder has-after
                    rounded-2xl min-h-[300px]
                    after:inset-0
                    after:opacity-0 after:bg-gray-500/30 after:transition-all after:duration-500
                    group-hover:after:opacity-100 
                    "
                    >
                        <img
                            src={blog?.image_url || blog?.image || noimage}
                            // width="370"
                            // height="370"
                            loading="lazy"
                            alt={`${blog?.title}`}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            className="img-cover transition-all duration-500 group-hover:scale-110"
                        />
                    </figure>

                    <div
                        className="card-content relative mx-6 bg-white rounded-2xl z-[1]
                        p-8 -mt-28 shadow-md
                        "
                    >
                        <Link
                            to={`/blogs/${blog?.id}`}
                            // href="#"
                            className="card-btn absolute -top-16 left-10 bg-blue-500 text-white
                            transition-all duration-500
                            p-8 rounded-full opacity-0 hover:bg-red-400
                            group-hover:opacity-100 group-hover:translate-y-4
                            "
                            aria-label="read more"
                        >
                            <ArrowRight size={24} />
                            {/* <ion-icon
                                name="arrow-forward-outline"
                                aria-hidden="true"
                            ></ion-icon> */}
                        </Link>

                        {/* <Link
                            to={`/blogs/${blog?.id}`}
                            href="#"
                            className="card-subtitle uppercase text-2xl"
                        >
                            {blog?.subtitle}
                        </Link> */}

                        <h3 className="h3">
                            <Link
                                to={`/blogs/${blog?.id}`}
                                // href="#"
                                className="card-title my-8 mx-6 transition-all duration-500
                                hover:text-blue-500
                                "
                            >
                                {blog?.title}
                            </Link>
                        </h3>

                        <ul className="card-meta-list flex flex-wrap gap-4 gap-x-8 mb-8">
                            <li className="card-meta-item flex items-center text-2xl gap-4 ">
                                {/* <ion-icon
                                    name="calendar-outline"
                                    aria-hidden="true"
                                ></ion-icon> */}
                                <CalendarDays
                                    size={20}
                                    className="text-blue-500 "
                                />

                                <span className="span">
                                    {formatDateAR(blog?.created_at)}
                                </span>
                            </li>

                            <div className="card-meta-item flex items-center text-2xl gap-4 ">
                                <ChartNoAxesCombined
                                    size={20}
                                    className="text-blue-500 "
                                />
                                <span>{blog?.views} </span>
                                <span>مشاهدات</span>
                            </div>

                            {/* <li className="card-meta-item">
                                <ion-icon
                                    name="chatbubbles-outline"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">
                                    {blog?.total_comment}
                                </span>
                            </li> */}
                        </ul>

                        <p className="card-text  line-clamp-2 text-2xl">
                            {blog?.summary}
                        </p>
                    </div>
                </div>
            </li>
        </>
    );
}

export default BlogCard;
