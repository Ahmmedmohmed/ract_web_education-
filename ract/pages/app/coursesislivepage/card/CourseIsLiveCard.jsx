/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Clock, Library, Users } from "lucide-react";
import useGeoLocation from "react-ipgeolocation";

// utils
import {
    namecurrency as defaultCurrency,
    namecurrency,
    nameMainColor,
} from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function CourseIsLiveCard({ course }) {
    const navigate = useNavigate();
    const [pricing, setPricing] = useState({
        price: 0,
        originalPrice: 0,
        discount: 0,
        currency: defaultCurrency,
    });

    const { country } = useGeoLocation();

    useEffect(() => {
        let price, originalPrice, discount, currency;

        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country?.countryCode || country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            price =
                course?.price_after_discount_egypt ||
                course?.price_like_egypt ||
                0;
            originalPrice = course?.price_like_egypt || 0;
            discount = course?.discount_like_egypt || 0;
            currency = "جنيه";
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            price =
                course?.price_after_discount_saudi ||
                course?.price_like_saudi ||
                0;
            originalPrice = course?.price_like_saudi || 0;
            discount = course?.discount_like_saudi || 0;
            currency = "ريال";
        } else {
            // باقي الدول (أمريكا وغيرها)
            price =
                course?.price_after_discount_america ||
                course?.price_like_america ||
                0;
            originalPrice = course?.price_like_america || 0;
            discount = course?.discount_like_america || 0;
            currency = "دولار";
        }

        setPricing({
            price,
            originalPrice,
            discount,
            currency,
        });
    }, [country, course]);

    return (
        <>
            <li
                className="group cursor-pointer"
                onClick={() => {
                    if (course?.is_live) {
                        navigate(`/coursesislive/${course?.id}`);
                    } else {
                        navigate(`/courses/${course?.id}`);
                    }
                }}
                data-aos="flip-left"
            >
                <div
                    className={` bg-white rounded-2xl overflow-hidden 
                        shadow transition-all hover:-translate-y-4 
                        hover:shadow-2xl
                        duration-500 pb-2 relative
                    `}
                >
                    <figure
                        className="card-banner img-holder min-h-96 overflow-hidden"
                        //
                    >
                        <img
                            src={course?.image_url || course?.image || noimage}
                            className="transition-all duration-500 min-h-96 max-h-96 w-full object-fill group-hover:scale-125"
                            alt={`${course?.title} - ${course?.description}`}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null;
                            }}
                            loading="lazy"
                        />
                    </figure>

                    <div
                        className={`abs-badge absolute top-3 right-3 rounded-lg flex items-center gap-2 bg-blue-500 text-white px-2 py-1 text-lg`}
                    >
                        <Clock size={16} />
                        <span className="span">{course?.duration}</span>
                    </div>

                    <div className="card-content p-7 flex flex-col gap-4">
                        <h3 className="h3">
                            <Link
                                className={`card-title truncate text-4xl group-hover:text-blue-600 transition-all duration-500 my-4`}
                            >
                                {course?.title}
                            </Link>
                        </h3>

                        <div className="wrapper flex items-center gap-4 text-2xl">
                            <p className="rating-text text-black font-bold"></p>
                        </div>

                        <div className="flex items-center gap-4 text-3xl font-bold">
                            {pricing.price > 0 ? (
                                <data
                                    className={`price text-blue-600 font-bold`}
                                    value={pricing.price}
                                >
                                    {pricing.price}
                                    {namecurrency}
                                    {/* {pricing.currency} */}
                                </data>
                            ) : (
                                <data
                                    className={`price text-blue-600 font-bold`}
                                    value={pricing.price}
                                >
                                    مجاناً
                                </data>
                            )}

                            {pricing.originalPrice > pricing.price && (
                                <span className="text-gray-500 line-through text-2xl">
                                    {pricing.originalPrice}
                                    {namecurrency}
                                    {/* {pricing.currency} */}
                                </span>
                            )}

                            {pricing.discount > 0 && (
                                <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                    خصم {pricing.discount}
                                    {namecurrency}
                                    {/* {pricing.currency} */}
                                </span>
                            )}
                        </div>

                        <ul className="card-meta-list flex items-center gap-4 font-bold">
                            {course?.is_live === false && (
                                <li className="card-meta-item flex items-center gap-2 text-3xl">
                                    <Library />
                                    <span className={`span text-blue-500`}>
                                        {course?.total_lesson}
                                    </span>
                                </li>
                            )}

                            {course?.total_enrolled_students > 0 ? (
                                <li className="card-meta-item flex items-center gap-2 text-3xl">
                                    <Users />
                                    <span className={`span text-blue-500`}>
                                        {course?.total_enrolled_students}
                                    </span>
                                </li>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                </div>
            </li>
        </>
    );
}

export default CourseIsLiveCard;
