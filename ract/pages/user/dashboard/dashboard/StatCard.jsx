/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

function StatCard({
    title,
    value,
    icon,
    to,
    color = "bg-green-100 text-green-700",
}) {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="card flex items-center p-6 cursor-pointer"
                data-aos="fade-down"
                onClick={() => {
                    navigate(to);
                }}
            >
                {/* <div
                    className={`p-3 rounded-full 
                        ml-3 flex items-center justify-center
                        ${color}
                    `}
                >
                    {icon}
                </div> */}
                <div
                    className={`h-20 w-20  grid place-items-center rounded-full mx-auto   overflow-hidden
                    ${color}
                    `}
                >
                    {/* {category.icon} */}
                    <div className="card-ico n">
                        <img
                            src={icon}
                            // width="40"
                            // height="40"
                            loading="lazy"
                            alt={`${title}`}
                            className="img"
                        />
                    </div>
                </div>

                <div>
                    <p className="text-lg font-bold text-gray-500">{title}</p>

                    <p className="text-2xl font-bold text-black">{value}</p>
                </div>
            </div>
        </>
    );
}

export default StatCard;
