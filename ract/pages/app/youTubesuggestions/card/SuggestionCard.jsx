/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, ChartNoAxesCombined } from "lucide-react";

// style
// import "./SuggestionCard.scss";

// utils
import { formatDateAR } from "../../../../utils/helpers";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function SuggestionCard({ blog }) {
    const navigate = useNavigate();

    // دالة لتحويل رابط يوتيوب إلى رابط embed
    const getEmbedUrl = (url) => {
        if (!url) return null;

        // إذا كان الرابط بالفعل بصيغة embed
        if (url.includes("embed")) return url;

        // استخراج معرف الفيديو من الروابط المختلفة
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        const videoId = match && match[2].length === 11 ? match[2] : null;

        if (!videoId) return null;

        return `https://www.youtube.com/embed/${videoId}`;
    };

    const embedUrl = getEmbedUrl(blog?.video_url);

    return (
        <>
            <li data-aos="flip-left">
                <div className="suggestion-card group transition-all duration-500 ">
                    {embedUrl ? (
                        <figure className="card-banner img-holder has-after rounded-2xl min-h[300px] h-[300px]">
                            <div className="video-container h-full">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={embedUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    className="h-full"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </figure>
                    ) : (
                        <figure
                            className="card-banner img-holder has-after
                                    rounded-2xl  min-h-[300px]
                                    after:inset-0
                                    after:opacity-0 after:bg-gray-500/30 after:transition-all after:duration-500
                                    group-hover:after:opacity-100
                                    "
                        >
                            <img
                                src={blog?.image_url || blog?.image || noimage}
                                loading="lazy"
                                alt={`${blog?.title}`}
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null;
                                }}
                                className="img-cover transition-all duration-500 group-hover:scale-110"
                            />
                        </figure>
                    )}

                    <div
                        className="card-content relative mx-6 bg-white rounded-2xl z-[1]
                        p-8 -mt-4 shadow-md 
                        "
                    >
                        <div
                            className="card-btn absolute -top-16 left-10 bg-blue-500 text-white
                            transition-all duration-500
                            p-8 rounded-full opacity-0 hover:bg-red-400
                            group-hover:opacity-100 group-hover:translate-y-4
                            "
                            aria-label="read more"
                        >
                            <ArrowRight size={24} />
                        </div>

                        <h3
                            className="card-title h3 my-8 mx-6 transition-all duration-500
                                hover:text-blue-500
                                "
                        >
                            {blog?.title}
                        </h3>
                    </div>
                </div>
            </li>
        </>
    );
}

export default SuggestionCard;
