/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
    faXTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

// style
import "./Teachers.scss";

// ui
import Rate from "../../../ui/rate/Rate";
import MainTitle from "../../../ui/title/MainTitle";

// assets
import teacher1image from "../../../assets/images/teacher/teacher-1.svg";
import teacher2image from "../../../assets/images/teacher/teacher-2.svg";
import teacher3image from "../../../assets/images/teacher/teacher-3.png";
import teacher4image from "../../../assets/images/teacher/teacher-4.png";
import teacher5image from "../../../assets/images/teacher/teacher-5.png";
import teacher6image from "../../../assets/images/teacher/teacher-6.png";
import teacher7image from "../../../assets/images/teacher/teacher-7.png";

function Teachers() {
    const navigate = useNavigate();

    return (
        <>
            <div className="teachers" id="teachers">
                <div className="container">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/teacher`);
                        }}
                    >
                        {`أساتذتنا`}
                    </MainTitle>

                    <div className="teachersbox">
                        <div
                            className="teachearbox teachearbox-1"
                            data-aos="flip-left"
                        >
                            <div className="teachercontent">
                                <div className="teacherImage">
                                    <img
                                        src={
                                            teacher1image ||
                                            "images/teacher-1.svg"
                                        }
                                        alt={`teacher 1 image`}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="teacherInfo">
                                    <h3>{`الأستاذ طلحاوي صابر`}</h3>

                                    <Rate />

                                    <p>
                                        أستاذ جامعي تخصص اٍعلام آلي خريج جامعة
                                        حسيبة بن بوعلي الشلف خبرة 10 سنوات تدريس
                                    </p>
                                </div>
                            </div>

                            <div className="teachersContect">
                                <div className="group">
                                    <h3 className="title">
                                        المجموعات المتاحة:
                                    </h3>
                                    <p>المجموعة أ - المجموعة ب</p>
                                </div>

                                <div className="teacherContact">
                                    <h3 className="title">تواصل مع الأستاذ:</h3>

                                    <div className="social">
                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faXTwitter}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faLinkedinIn}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </a>

                                        <a href="">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="teachearbox teachearbox-2"
                            data-aos="flip-left"
                        >
                            <div className="teachercontent">
                                <div className="teacherImage">
                                    <img
                                        src={
                                            teacher2image ||
                                            "images/teacher-2.svg"
                                        }
                                        alt={`teacher 2 image`}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="teacherInfo">
                                    <h3>الأستاذ اٍسحاق بن فرج</h3>

                                    <Rate />

                                    <p>
                                        أستاذ جامعي تخصص اٍعلام آلي خريج المدرسة
                                        العليا للاٍعلام الآلي بلعباس خبرة 10
                                        سنوات تدريس
                                    </p>
                                </div>
                            </div>
                            <div className="teachersContect">
                                <div className="group">
                                    <h3 className="title">
                                        المجموعات المتاحة:
                                    </h3>

                                    <p>المجموعة أ - المجموعة ب</p>
                                </div>

                                <div className="teacherContact">
                                    <h3 className="title">تواصل مع الأستاذ:</h3>

                                    <div className="social">
                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faXTwitter}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faLinkedinIn}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </a>

                                        <a href="">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="teachearbox teachearbox-3"
                            data-aos="flip-left"
                        >
                            <div className="teachercontent">
                                <div className="teacherImage">
                                    <img
                                        src={
                                            teacher3image ||
                                            "images/teacher-2.svg"
                                        }
                                        alt={`teacher 3 image`}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="teacherInfo">
                                    <h3>الأستاذ أحمد</h3>

                                    <Rate />

                                    <p>
                                        أستاذ رياضيات خريج المدرسة العليا
                                        للأساتذة خبرة 10 سنوات تدريس
                                    </p>
                                </div>
                            </div>

                            <div className="teachersContect">
                                <div className="group">
                                    <h3 className="title">
                                        المجموعات المتاحة:
                                    </h3>

                                    <p>المجموعة أ - المجموعة ب</p>
                                </div>

                                <div className="teacherContact">
                                    <h3 className="title">تواصل مع الأستاذ:</h3>

                                    <div className="social">
                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faXTwitter}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faLinkedinIn}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </a>

                                        <a href="">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="teachearbox teachearbox-4"
                            data-aos="flip-left"
                        >
                            <div className="teachercontent">
                                <div className="teacherImage">
                                    <img
                                        src={
                                            teacher4image ||
                                            "images/teacher-1.svg"
                                        }
                                        alt={`teacher 4 image`}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="teacherInfo">
                                    <h3>الأستاذ مصطفى</h3>

                                    <Rate />

                                    <p>
                                        أستاذ الشريعة خريج المدرسة العليا
                                        للأساتذة خبرة 10 سنوات تدريس
                                    </p>
                                </div>
                            </div>

                            <div className="teachersContect">
                                <div className="group">
                                    <h3 className="title">
                                        المجموعات المتاحة:
                                    </h3>

                                    <p>المجموعة أ - المجموعة ب</p>
                                </div>

                                <div className="teacherContact">
                                    <h3 className="title">تواصل مع الأستاذ:</h3>

                                    <div className="social">
                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faXTwitter}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faLinkedinIn}
                                            />
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </a>

                                        <a href="">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Teachers;
