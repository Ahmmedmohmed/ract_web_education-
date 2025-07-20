/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, ChartNoAxesCombined } from "lucide-react";

// style
// import "./BookCard.scss";

// utils
import { formatDateAR } from "../../../../utils/helpers";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function BookCard({ book }) {
    const navigate = useNavigate();

    // console.log(`book`, book);

    return (
        <>
            <li
                onClick={() => {
                    navigate(`/books/${book?.id}`);
                }}
                // data-aos="flip-left"
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
                            src={book?.image_url || book?.image || noimage}
                            // width="370"
                            // height="370"
                            loading="lazy"
                            alt={`${book?.title}`}
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
                            to={`/books/${book?.id}`}
                            // href="#"
                            className="card-btn absolute -top-16 left-10 bg-blue-500 text-white
                            transition-all duration-500
                            p-8 rounded-full opacity-0 hover:bg-red-400
                            group-hover:opacity-100 group-hover:translate-y-4
                            "
                            aria-label="read more"
                        >
                            {/* <ion-icon
                                name="arrow-forward-outline"
                                aria-hidden="true"
                            ></ion-icon> */}
                            <ArrowRight size={24} />
                        </Link>

                        <h3 className="h3">
                            <Link
                                to={`/books/${book?.id}`}
                                // href="#"
                                className="card-title my-8 mx-6 transition-all duration-500
                                hover:text-blue-500
                                "
                            >
                                {book?.title}
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
                                    {formatDateAR(book?.created_at)}
                                </span>
                            </li>

                            {/* <li className="card-meta-item">
                                <ion-icon
                                    name="chatbubbles-outline"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">
                                    {book?.total_comment}
                                </span>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </li>
        </>
    );
}

export default BookCard;
