/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGeoLocation from "react-ipgeolocation";

// utils
import { namecurrency, nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";
import islamicdome from "../../../../assets/images/bg/islamic-dome.png";

function PackageCard({ packageCourse }) {
    const navigate = useNavigate();
    const [pricing, setPricing] = useState({
        price: 0,
        originalPrice: 0,
        discount: 0,
        currency: namecurrency,
    });

    const { country } = useGeoLocation();

    useEffect(() => {
        let price, originalPrice, discount, currency;

        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country?.countryCode || country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            price =
                packageCourse?.price_after_discount_egypt ||
                packageCourse?.price_like_egypt ||
                0;
            originalPrice = packageCourse?.price_like_egypt || 0;
            discount = packageCourse?.discount_like_egypt || 0;
            currency = "جنيه";
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            price =
                packageCourse?.price_after_discount_saudi ||
                packageCourse?.price_like_saudi ||
                0;
            originalPrice = packageCourse?.price_like_saudi || 0;
            discount = packageCourse?.discount_like_saudi || 0;
            currency = "ريال";
        } else {
            // باقي الدول (أمريكا وغيرها)
            price =
                packageCourse?.price_after_discount_america ||
                packageCourse?.price_like_america ||
                0;
            originalPrice = packageCourse?.price_like_america || 0;
            discount = packageCourse?.discount_like_america || 0;
            currency = "دولار";
        }

        setPricing({
            price,
            originalPrice,
            discount,
            currency,
        });
    }, [country, packageCourse]);

    // console.log(`packageCourse`, packageCourse);

    return (
        <>
            <li
                // key={index}
                className="group cursor-pointer select-none "
                onClick={() => {
                    navigate(`/packages/${packageCourse?.id}`);
                }}
                data-aos="flip-left"
                //
            >
                <div
                    className={`  
                        rounded-2xl overflow-hidden 
                        shadow transition-all hover:-translate-y-4 
                        duration-500 pb-2 relative
                        rounded-tr-4xl
                    `}
                >
                    <figure
                        className="card-banner card-banner-course img-holder  min-h-[350px] overflow-hidden relative   "
                        // style={{ width: 370, height: 220 }}
                    >
                        <img
                            src={islamicdome}
                            className="transition-all duration-500 min-h-[350px] max-h-[350px] w-full object-fill absolute top-0 left-0 z-[2]"
                            // group-hover:scale-125
                            alt={`${packageCourse?.title} - ${packageCourse?.description}`}
                            loading="lazy"
                        />

                        <img
                            src={
                                packageCourse?.image_url ||
                                packageCourse?.image ||
                                noimage
                            }
                            // width="370"
                            // height="220"
                            className="imgCo transition-all duration-500  min-h-[350px] max-h-[350px] w-full object-fill "
                            alt={`${packageCourse?.title} - ${packageCourse?.description}`}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                            }}
                            loading="lazy"
                        />
                    </figure>

                    <div
                        className="card-content p-7 flex flex-col gap-4 bg-white transition-all duration-500 shadow hover:shadow-2xl"
                        onClick={() => {
                            // navigate(`/courses/${packageCourse?.id}`);
                        }}
                    >
                        <div className="border border-gray-400 rounded-2xl text-center flex flex-col items-center justify-center gap-4 py-2 overflow-hidden">
                            <h3 className="h3">
                                <Link
                                    // to={`/courses/${packageCourse?.id}`}
                                    // href="#"
                                    className={`card-title truncate text-4xl group-hover:text-blue-600 transition-all duration-500 line-clamp-1 max-w-full`}
                                >
                                    {packageCourse?.title}
                                </Link>
                            </h3>

                            <div className="wrapper flex items-center gap-4 text-2xl  ">
                                <p className="rating-text text-black font-bold line-clamp-1">
                                    {packageCourse?.description}
                                </p>
                            </div>

                            <div className="wrapper flex items-center gap-4 text-2xl">
                                {/* <div className="rating-wrapper flex items-center gap-2 text-amber-400">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                            </div> */}

                                <p className="rating-text text-black font-bold">
                                    {/* {packageCourse?.rating
                                                            ? `(${course.rating})`
                                                            : "(5.0)"}{" "} */}
                                    {/* (5.0) تقييم */}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-3xl font-bold">
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

                        {/* <div className="flex items-center gap-4 text-3xl font-bold">
                            {packageCourse?.price_after_discount > 0 ? (
                                <data
                                    className={`price   text-blue-600 font-bold`}
                                    value={packageCourse?.price_after_discount}
                                >
                                    {packageCourse?.price_after_discount}{" "}
                                    {namecurrency}
                                </data>
                            ) : (
                                <data
                                    className={`price   text-blue-600 font-bold`}
                                    value={packageCourse?.price_after_discount}
                                >
                                    {packageCourse?.price_after_discount}{" "}
                                    {namecurrency}
                                </data>
                            )}

                            {packageCourse?.price >
                                packageCourse?.price_after_discount && (
                                <span className="text-gray-500 line-through text-2xl">
                                    {packageCourse?.price} {namecurrency}
                                </span>
                            )}

                            {packageCourse?.discount > 0 && (
                                <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                    خصم {packageCourse?.discount} %
                                </span>
                            )}
                        </div> */}
                    </div>
                </div>
            </li>
        </>
    );
}

export default PackageCard;
