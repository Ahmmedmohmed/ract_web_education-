/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, Link } from "react-router-dom";

// utils
import { namecurrency, nameMainColor } from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function PowerpointCard({ powerpoint }) {
    const navigate = useNavigate();

    // console.log(`powerpoint`, powerpoint);

    return (
        <>
            <li
                // key={index}
                className="group cursor-pointer"
                onClick={() => {
                    navigate(`/powerpoints/${powerpoint?.id}`);
                }}
                data-aos="flip-left"
                //
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
                        // style={{ width: 370, height: 220 }}
                    >
                        <img
                            src={
                                powerpoint?.image_url ||
                                powerpoint?.image ||
                                noimage
                            }
                            // width="370"
                            // height="220"
                            className="transition-all duration-500 min-h-96 max-h-96 w-full object-fill group-hover:scale-125"
                            alt={`${powerpoint?.title} - ${powerpoint?.description}`}
                            onError={(e) => {
                                e.target.src = noimage;
                                e.target.onerror = null;
                            }}
                            loading="lazy"
                        />
                    </figure>

                    <div
                        className="card-content p-7 flex flex-col gap-4"
                        onClick={() => {
                            // navigate(`/courses/${powerpoint?.id}`);
                        }}
                    >
                        <h3 className="h3">
                            <Link
                                // to={`/courses/${powerpoint?.id}`}
                                // href="#"
                                className={`card-title truncate text-4xl group-hover:text-blue-600 transition-all duration-500 my-4`}
                            >
                                {powerpoint?.title}
                            </Link>
                        </h3>

                        <div className="wrapper flex items-center gap-4 text-2xl">
                            {/* <div className="rating-wrapper flex items-center gap-2 text-amber-400">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                            </div> */}

                            <p className="rating-text text-black font-bold">
                                {/* {powerpoint?.rating
                                                            ? `(${course.rating})`
                                                            : "(5.0)"}{" "} */}
                                {/* (5.0) تقييم */}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-3xl font-bold">
                            {powerpoint?.price_after_discount > 0 ? (
                                <data
                                    className={`price   text-blue-600 font-bold`}
                                    value={powerpoint?.price_after_discount}
                                >
                                    {powerpoint?.price_after_discount}{" "}
                                    {namecurrency}
                                </data>
                            ) : (
                                <data
                                    className={`price   text-blue-600 font-bold`}
                                    value={powerpoint?.price_after_discount}
                                >
                                    {powerpoint?.price_after_discount}{" "}
                                    {namecurrency}
                                </data>
                            )}

                            {powerpoint?.price >
                                powerpoint?.price_after_discount && (
                                <span className="text-gray-500 line-through text-2xl">
                                    {powerpoint.price} {namecurrency}
                                </span>
                            )}

                            {powerpoint?.discount > 0 && (
                                <span className="bg-red-100 text-red-600 text-lg px-2 py-1 rounded">
                                    خصم {powerpoint.discount} {namecurrency}
                                </span>
                            )}
                        </div>

                        <ul className="card-meta-list flex items-center gap-4 font-bold">
                            <li className="card-meta-item flex items-center gap-2 text-3xl">
                                <ion-icon
                                    name="people-outline"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className={`span text-blue-500`}>
                                    {powerpoint?.total_enrolled_students}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </>
    );
}

export default PowerpointCard;
