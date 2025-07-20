import React, { useState } from "react";

function HifzDetails({ path }) {
    const [activeTimelineIndex, setActiveTimelineIndex] = useState(null);

    const handleTimelineClick = (index) => {
        setActiveTimelineIndex((prevIndex) =>
            prevIndex === index ? null : index
        );
    };

    return (
        <>
            <div
                id="hifz-details"
                className="bg-gray-50 py-8 rounded-lg border border-gray-200 mb-8"
            >
                <h4 className="text-4xl font-bold text-center mb-8 text-blue-800">
                    تَفَاصِيلُ مَسَارِ الحِفْظِ والإِتْقَانِ
                </h4>

                <div className="relative max-w-7xl mx-auto">
                    <div className="absolute right-6 top-0 bottom-0 w-1 bg-blue-500"></div>

                    {path?.class_rooms?.map((item, index) => (
                        <div
                            className={`relative ps-16 pe-8 py-4 mb-4 cursor-pointer ${
                                activeTimelineIndex === index
                                    ? "bg-white shadow-md"
                                    : ""
                            }`}
                            key={index}
                            onClick={() => {
                                handleTimelineClick(index);
                            }}
                        >
                            <div
                                className={`absolute right-3 top-4 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10 
                                    ${
                                        activeTimelineIndex === index
                                            ? "bg-blue-500"
                                            : ""
                                    }
                                `}
                            ></div>

                            <h5
                                className={`text-2xl font-bold mb-2 
                                    ${
                                        activeTimelineIndex === index
                                            ? "text-blue-600"
                                            : "text-blue-800"
                                    }
                                `}
                            >
                                {/* {item.year} */}
                                {item.title}
                            </h5>

                            <div
                                className={`
                                    bg-white p-5 rounded-lg border border-gray-200 mt-3
                                    ${
                                        activeTimelineIndex === index
                                            ? "block"
                                            : "hidden"
                                    } 
                                `}
                            >
                                <p className="text-2xl mb-2 text-black flex gap-2">
                                    <strong>مُقَرَّرُ الحِفْظِ:</strong>{" "}
                                    {item.preservation_decision}
                                </p>

                                <p className="text-2xl text-black flex gap-2">
                                    <strong>العُلُومُ المُصَاحِبَةُ:</strong>{" "}
                                    {item.associated_sciences}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HifzDetails;
