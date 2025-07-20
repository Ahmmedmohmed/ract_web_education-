/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// data
// import {
//     murajaaData,
//     testAppointments,
// } from "../../../../../../data/quranschoolDate";

function MurajaaDetails({ path }) {
    const [activeTab, setActiveTab] = useState(1);
    // const [activeTab, setActiveTab] = useState("level1");

    return (
        <>
            <div
                id="murajaa-details"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8"
            >
                <h4 className="text-3xl font-bold text-center mb-8 text-blue-800">
                    تَفَاصِيلُ {path?.title}
                    {/* مَسَارِ المُرَاجَعَةِ والتَّثْبِيتِ */}
                </h4>

                <p className="text-lg text-center max-w-3xl mx-auto mb-8">
                    يَتِمُّ إِجْرَاءُ مُقَابَلَةٍ مَعَ الطَّالِبِ لِتَحْدِيدِ
                    المُسْتَوَى المُنَاسِبِ لَهُ.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {path?.review_levels.map((level, index) => (
                        <button
                            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg border 
                                ${
                                    // activeTab === "level1"
                                    activeTab === index + 1
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white border-gray-300"
                                }
                            `}
                            onClick={() => {
                                setActiveTab(index + 1);
                            }}
                            key={index}
                        >
                            <span>{level?.title}</span>
                            <span>({level?.duration})</span>

                            {/* المُسْتَوَى الأَوَّلُ (عَامَانِ) */}
                        </button>
                    ))}

                    {/* <button
                        className={`px-5 py-2 rounded-lg border ${
                            activeTab === "level1"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300"
                        }`}
                        onClick={() => setActiveTab("level1")}
                    >
                        المُسْتَوَى الأَوَّلُ (عَامَانِ)
                    </button>
                    
                    <button
                        className={`px-5 py-2 rounded-lg border ${
                            activeTab === "level2"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300"
                        }`}
                        onClick={() => setActiveTab("level2")}
                    >
                        المُسْتَوَى الثَّانِي (عَامٌ)
                    </button>

                    <button
                        className={`px-5 py-2 rounded-lg border ${
                            activeTab === "level3"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300"
                        }`}
                        onClick={() => setActiveTab("level3")}
                    >
                        المُسْتَوَى الثَّالِثُ (6 أَشْهُرٍ)
                    </button> */}
                </div>

                {path?.review_levels?.map((level, index) => (
                    <div
                        key={index}
                        className={`bg-white pt-6 rounded-lg border border-gray-200 mb-6 
                        ${activeTab === index + 1 ? "block" : "hidden"}
                        `}
                    >
                        <h5 className="flex items-center justify-start gap-2 text-xl font-bold mb-4 text-blue-800">
                            <span>خُطَّةُ الخَتْمِ فِي</span>
                            <span>({level.duration})</span>
                        </h5>

                        <div className="overflow-x-auto flex items-start justify-between gap-2  text-xl ">
                            <div className=" flex-1 border border-gray-200 p-2">
                                <h3 className="mb-4 text-black">رقم الختمة</h3>
                                <ul className="flex flex-col gap-2">
                                    {level?.stamp_number?.map(
                                        (number, index) => (
                                            <li key={index}>{number}</li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className=" flex-1 border border-gray-200 p-2">
                                <h3 className="mb-4 text-black">
                                    التسميع اليومي
                                </h3>
                                <ul className="flex flex-col gap-2">
                                    {level?.daily_auscultation?.map(
                                        (number, index) => (
                                            <li key={index}>{number}</li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className=" flex-1 border border-gray-200 p-2">
                                <h3 className="mb-4 text-black">
                                    الأيام أسبوعيًا
                                </h3>
                                <ul className="flex flex-col gap-2">
                                    {level?.days_per_week?.map(
                                        (number, index) => (
                                            <li key={index}>{number}</li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className=" flex-1 border border-gray-200 p-2">
                                <h3 className="mb-4 text-black">مدة الختمة</h3>
                                <ul className="flex flex-col gap-2">
                                    {level?.duration_seal?.map(
                                        (number, index) => (
                                            <li key={index}>{number}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th>رقم الختمة</th>
                                        <th>التسميع اليومي</th>
                                        <th>الأيام أسبوعيًا</th>
                                        <th>مدة الختمة</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>6 صفحات</td>
                                        <td>2</td>
                                        <td>12 شهرًا</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>12 صفحة</td>
                                        <td>2</td>
                                        <td>6 أشهر</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>16 صفحة</td>
                                        <td>3</td>
                                        <td>3 أشهر</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>جزء كامل</td>
                                        <td>5</td>
                                        <td>شهر واحد</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                ))}

                {/* {Object.entries(murajaaData).map(([key, value]) => (
                    <div
                        key={key}
                        className={`bg-white p-5 rounded-lg border border-gray-200 mb-6 ${
                            activeTab === key ? "block" : "hidden"
                        }`}
                    >
                        <h5 className="text-xl font-bold mb-4 text-blue-800">
                            {value.title}
                        </h5>
                        <div className="overflow-x-auto">
                            <table
                                className="w-full border-collapse"
                                dangerouslySetInnerHTML={{
                                    __html: value.table,
                                }}
                            ></table>
                        </div>
                    </div>
                ))} */}
            </div>
        </>
    );
}

export default MurajaaDetails;
