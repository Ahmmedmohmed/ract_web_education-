/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { nameMainColor } from "../../../../utils/constants";

function Stat({ title, value, to }) {
    const navigate = useNavigate();

    return (
        <>
            <li
                className={`min-h-full ${to && "cursor-pointer"}`}
                data-aos="flip-left"
                onClick={() => {
                    navigate(to);
                }}
            >
                <div
                    className={`stats-card min-h-full text-center p-8 rounded-4xl bg-blue-200/80 flex flex-col gap-4`}
                >
                    <h3
                        className={`card-title text-7xl text-blue-700 font-bold`}
                    >
                        {value || 0}
                    </h3>

                    <p className="card-text text-3xl font-bold text-gray-600">
                        {title}
                    </p>
                </div>
            </li>
        </>
    );
}

export default Stat;
