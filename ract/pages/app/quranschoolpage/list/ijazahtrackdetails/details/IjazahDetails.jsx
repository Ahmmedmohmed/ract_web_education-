/* eslint-disable no-unused-vars */
import React from "react";
import { ijazahData } from "../../../../../../data/quranschoolDate";

function IjazahDetails({ path }) {
    return (
        <>
            <div
                id="ijaza-details"
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8"
            >
                <h4 className="text-3xl font-bold text-center mb-8 text-blue-800">
                    شُرُوطُ الحُصُولِ عَلَى الإِجَازَةِ
                </h4>

                <ul className="  space-y-3 flex flex-col gap-4 mb-10">
                    {ijazahData?.map((item, index) => (
                        <li
                            key={index}
                            className="bg-white p-4 rounded-lg border-r-4 border-blue-500 flex items-start shadow-sm"
                        >
                            <span className="text-blue-500 text-xl font-bold ml-3">
                                ✓
                            </span>
                            <span className="text-lg text-black">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default IjazahDetails;
