/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// style
import "./Works.scss";

// ui
import MainTitle from "../../../ui/title/MainTitle";

// assets
import acountimage from "../../../assets/images/works/acount.png";
import arrowimage from "../../../assets/images/works/arrow-imag.png";
import mawadimage from "../../../assets/images/works/mawad.png";
import allmodarisimage from "../../../assets/images/works/allmodaris.png";
import timeimage from "../../../assets/images/works/time.png";

function Works() {
    const navigate = useNavigate();

    return (
        <>
            <div className="works" id="works">
                <div className="container">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/work`);
                        }}
                    >
                        {`كيف يعمل موقع مُعلم ؟`}
                    </MainTitle>

                    <div className="boxes">
                        <div className="box" data-aos="fade-down">
                            <div className="content" data-aos="fade-left">
                                <h4 className="title">{`الخطوة الأولى :`}</h4>
                                <p>
                                    {`قم بالإشتراك أولا و ذلك باٍنشاء حساب جديد
                                    بملئ المعلومات المطلوبة`}
                                </p>

                                <Link to={`/signup`} href="" className="btn">
                                    {`قم بالإشتراك`}
                                </Link>
                            </div>

                            <div className="image-box" data-aos="fade-right">
                                <img
                                    src={acountimage || "images/acount.png"}
                                    alt={`acount image`}loading="lazy"
                                />
                            </div>

                            <img
                                className="arow-img arow-right arow-right-1"
                                src={arrowimage || "images/arrow-imag.png"}
                                alt={`arrow image`}loading="lazy"
                            />
                        </div>

                        <div className="box" data-aos="fade-down">
                            <div className="image-box" data-aos="fade-left">
                                <img
                                    src={mawadimage || "images/mawad.png"}
                                    alt={`mawad image`}loading="lazy"
                                />
                            </div>

                            <div className="content" data-aos="fade-right">
                                <h4 className="title">{`الخطوة الثانية :`}</h4>

                                <p>
                                    {`اٍختر المواد التعليمية التي تريديها لتنطلق
                                    في الدرس`}
                                </p>

                                <Link to={`/`} href="" className="btn">
                                    {`اٍختر الآن`}
                                </Link>
                            </div>

                            <img
                                className="arow-img arow-left arow-left-1"
                                src={arrowimage || "./images/arrow-imag.png"}
                                alt={`arrow image`}loading="lazy"
                            />
                        </div>

                        <div className="box" data-aos="fade-down">
                            <div className="content" data-aos="fade-left">
                                <h4 className="title">{`الخطوة الثالثة :`}</h4>

                                <p>
                                    {`قم باٍختيار المدرس الذي يناسبك و ذلك بالضغط
                                    على الزر أسفله`}
                                </p>

                                <Link to={`/`} href="" className="btn">
                                    {`قم بالاٍختيار`}
                                </Link>
                            </div>

                            <div className="image-box" data-aos="fade-right">
                                <img
                                    src={
                                        allmodarisimage ||
                                        "images/allmodaris.png"
                                    }
                                    alt={`allmodaris image`}loading="lazy"
                                />
                            </div>

                            <img
                                className="arow-img arow-right arow-right-2"
                                src={arrowimage || "images/arrow-imag.png"}
                                alt={`arrow image`}loading="lazy"
                            />
                        </div>

                        <div className="box" data-aos="fade-down">
                            <div className="image-box" data-aos="fade-left">
                                <img
                                    src={timeimage || "images/time.png"}
                                    alt={`time image`}loading="lazy"
                                />
                            </div>

                            <div className="content" data-aos="fade-right">
                                <h4 className="title">{`الخطوة الرابعة :`}</h4>

                                <p>
                                    {` قم باِختيار الوقت الذي يناسبك ثم اٍنطلق في
                                    الدرس`}
                                </p>

                                <Link to={`/`} href="" className="btn">
                                    {`اٍنطلق الآن`}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Works;
