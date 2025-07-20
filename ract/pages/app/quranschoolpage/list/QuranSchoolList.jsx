/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// api
import { appGetQuranPathsApp } from "../../../../api/app/authApp";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { PAGE_SIZE } from "../../../../utils/constants";

// components
import HifzTrackDetails from "./hifztrackdetails/HifzTrackDetails";
import MurajaaTrackDetails from "./murajaatrackdetails/MurajaaTrackDetails";
import IjazahTrackDetails from "./ijazahtrackdetails/IjazahTrackDetails";

// --- TRACK-SPECIFIC COMPONENTS ---
const Tracks = () => {
    const navigate = useNavigate();

    let { userData } = UserDataStore();

    const [activeTrack, setActiveTrack] = useState("");

    const [quranPath, setQuranPath] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchQuranPath = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await appGetQuranPathsApp(
                    currentPage,
                    selectedStatus
                );

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                    navigate(`/`);
                } else {
                    setQuranPath(data);
                    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
                navigate(`/`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuranPath();
    }, [currentPage, selectedStatus]);

    // console.log(`quranPath`, quranPath);
    // console.log(`quranPath`, quranPath[1]);

    return (
        <>
            <section
                className="section course min-h-dvh"
                id="tracks courses-courses"
                //
            >
                <div className="container py-20">
                    {/* <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
                        اخْتَرْ مَسَارَكَ في رِحْلَةِ القُرْآنِ
                    </h2>

                    <p className="text-lg text-center max-w-2xl mx-auto mb-12 text-gray-600">
                        لِكُلِّ طَالِبٍ هَدَفٌ، ولِكُلِّ هَدَفٍ مَسَارٌ.
                        تَصَفَّحِ المَسَارَاتِ واخْتَرْ مَا يُنَاسِبُ طُمُوحَكَ.
                    </p> */}

                    <p className="section-subtitle" data-aos="fade-down">
                        {`
                              لِكُلِّ طَالِبٍ هَدَفٌ، ولِكُلِّ هَدَفٍ مَسَارٌ.
                        تَصَفَّحِ المَسَارَاتِ واخْتَرْ مَا يُنَاسِبُ طُمُوحَكَ.
                        `}
                    </p>

                    <h2 className="h2 section-title" data-aos="fade-down">
                        {`
                           اخْتَرْ مَسَارَكَ في رِحْلَةِ القُرْآنِ
                        `}
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : quranPath?.length === 0 ? (
                        <div className="text-center text-2xl font-bold py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لا توجد مسارات حاليا
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {quranPath.map((path, index) => (
                                <div
                                    className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 transition-all duration-500 hover:shadow-lg hover:-translate-y-4"
                                    key={index}
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <h3
                                            className={`
                                            text-3xl font-bold mb-4
                                            
                                            ${
                                                path?.name === "save"
                                                    ? "text-blue-600"
                                                    : path?.name === "review"
                                                    ? "text-emerald-600"
                                                    : path?.name === "vacation"
                                                    ? "text-amber-600"
                                                    : "text-cyan-600"
                                            }
                                            `}
                                        >
                                            {path?.title}
                                        </h3>

                                        <p className="text-gray-700 mb-6">
                                            {path?.description}
                                        </p>

                                        <button
                                            className={`
                                                text-white 
                                                font-bold py-3 px-6 rounded-lg transition-all duration-500
                                                 ${
                                                     path?.name === "save"
                                                         ? "bg-blue-600 hover:bg-blue-700"
                                                         : path?.name ===
                                                           "review"
                                                         ? "bg-emerald-600 hover:bg-emerald-700"
                                                         : path?.name ===
                                                           "vacation"
                                                         ? "bg-amber-600 hover:bg-amber-700"
                                                         : "bg-cyan-600 hover:bg-cyan-700"
                                                 }
                                            `}
                                            onClick={() => {
                                                {
                                                    userData?.id
                                                        ? ""
                                                        : navigate(`/login`);
                                                }

                                                if (path?.name === "save") {
                                                    setActiveTrack("hifz");
                                                } else if (
                                                    path?.name === "review"
                                                ) {
                                                    setActiveTrack("murajaa");
                                                } else if (
                                                    path?.name === "vacation"
                                                ) {
                                                    setActiveTrack("ijaza");
                                                } else {
                                                    // setActiveTrack("");
                                                }
                                            }}
                                        >
                                            {path?.name === "save"
                                                ? "عَرْضُ تَفَاصِيلِ الخُطَّةِ والتَّقْدِيم"
                                                : path?.name === "review"
                                                ? "طَلَبُ مُقَابَلَةٍ وتَقْدِيم"
                                                : path?.name === "vacation"
                                                ? "الشُّرُوطُ والتَّقْدِيم"
                                                : ""}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {userData?.id ? (
                        <>
                            {activeTrack === "hifz" && (
                                <HifzTrackDetails path={quranPath[0]} />
                            )}
                            {activeTrack === "murajaa" && (
                                <MurajaaTrackDetails path={quranPath[1]} />
                            )}
                            {activeTrack === "ijaza" && (
                                <IjazahTrackDetails path={quranPath[2]} />
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </section>
        </>
    );
};

function QuranSchoolList() {
    return (
        <>
            <Tracks />
        </>
    );
}

export default QuranSchoolList;
