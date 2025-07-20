/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

// Style
import "./VideoHome.scss";

// Assets
import videobanner from "../../../../assets/images/video/video-banner.jpg";
import videobg from "../../../../assets/images/video/video-bg.png";
import videoshape1 from "../../../../assets/images/video/video-shape-1.png";
import videoshape2 from "../../../../assets/images/video/video-shape-2.png";
import noimage from "../../../../assets/images/error/no-image.jpg";
import { Play } from "lucide-react";

function VideoHome() {
    const navigate = useNavigate();

    return (
        <>
            <section
                className="video has-bg-image pt-36"
                aria-label="video"
                // style={{background: }}
                // style="
                //         background-image: url('./assets/images/video-bg.png');
                //     "
            >
                <div className="container">
                    <div className="video-card">
                        <div
                            className="video-banner img-holder has-after"
                            // style={"--width: ; --height: "}
                        >
                            <img
                                src={
                                    videobanner ||
                                    noimage ||
                                    "./assets/images/video-banner.jpg"
                                }
                                width="970"
                                height="550"
                                loading="lazy"
                                alt="video banner"
                                onError={(e) => {
                                    e.target.src = noimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className="img-cover"
                            />

                            <button
                                className="play-btn"
                                aria-label="play video"
                                onClick={() => {
                                    navigate(`/courses`);
                                }}
                            >
                                {/* <ion-icon
                                    name="play"
                                    aria-hidden="true"
                                ></ion-icon> */}
                                <Play />
                            </button>
                        </div>

                        <img
                            src={
                                videoshape1 ||
                                "./assets/images/video-shape-1.png"
                            }
                            width="1089"
                            height="605"
                            loading="lazy"
                            alt={`video shape 1`}
                            className="shape video-shape-1"
                        />

                        <img
                            src={
                                videoshape2 ||
                                "./assets/images/video-shape-2.png"
                            }
                            width="158"
                            height="174"
                            loading="lazy"
                            alt="video"
                            className="shape video-shape-2"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default VideoHome;
