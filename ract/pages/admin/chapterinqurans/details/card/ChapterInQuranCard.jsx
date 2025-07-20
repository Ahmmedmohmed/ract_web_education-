import React from "react";
import {
    BarChart,
    BookOpen,
    Clock,
    Edit,
    Landmark,
    Tag,
    Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// data
import { classType } from "../../../../../data/quranschoolDate";

// utils
import { App_Admin } from "../../../../../utils/constants";

// assets
import noimage from "../../../../../assets/images/error/no-image.jpg";

function ChapterInQuranCard({ chapterInQuran }) {
    const { quranpathId } = useParams();
    
    return (
        <>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md ">
                <div className="flex flex-col md:flex-row gap-6 relative">
                    {/*  */}
                    <Link
                        to={`/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/update/${chapterInQuran?.id}`}
                        className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                        title="تعديل الدورة"
                    >
                        <Edit size={20} className=" transition-all" />
                    </Link>

                    <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden relative">
                        <img
                            src={
                                chapterInQuran?.image ||
                                chapterInQuran?.image_url ||
                                noimage
                            }
                            alt={`صورة تعريفية لـ ${chapterInQuran?.title}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = noimage;
                            }}
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-3xl font-bold text-slate-800 mb-5">
                            {chapterInQuran?.title}
                        </h3>

                        <div className="mb-5 pb-5 border-b border-slate-200">
                            <h4 className="text-2xl font-bold text-black mb-3 uppercase">
                                تَفَاصِيلُ الفَصْلِ
                            </h4>

                            <div className="space-y-2 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-slate-800">
                                    <Users
                                        size={16}
                                        className="text-indigo-600"
                                    />
                                    <span>
                                        {
                                            chapterInQuran?.total_enrolled_students
                                        }{" "}
                                        / {chapterInQuran?.maximum_students}{" "}
                                        طَالِبٍ
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-800">
                                    <Tag
                                        size={16}
                                        className="text-indigo-600"
                                    />
                                    <span>
                                        فَصْلُ:{" "}
                                        {classType[chapterInQuran?.class_type]}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {(chapterInQuran?.date_quran_sessions ||
                            chapterInQuran?.quranic_sciences_lecture_schedule) && (
                            <div className="mb-5 pb-5 border-b border-slate-200">
                                <h4 className="text-2xl font-bold text-black mb-3 uppercase">
                                    مَوَاعِيدُ الحَلَقَاتِ
                                </h4>

                                <div className="space-y-2 flex flex-col gap-2">
                                    {chapterInQuran?.date_quran_sessions && (
                                        <div className="flex items-center gap-2 text-slate-800">
                                            <Clock
                                                size={16}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                حَلَقَاتِ القُرْآنِ:{" "}
                                                {
                                                    chapterInQuran?.date_quran_sessions
                                                }
                                            </span>
                                        </div>
                                    )}

                                    {chapterInQuran?.quranic_sciences_lecture_schedule && (
                                        <div className="flex items-center gap-2 text-slate-800">
                                            <Clock
                                                size={16}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                مُحَاضَرَاتِ القُرْآنِ:{" "}
                                                {
                                                    chapterInQuran?.quranic_sciences_lecture_schedule
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {(chapterInQuran?.approach_quran ||
                            chapterInQuran?.quran_sciences) && (
                            <div>
                                <h4 className="text-2xl font-bold text-black mb-3 uppercase">
                                    المَنْهَجُ المُقَرَّرُ
                                </h4>

                                <div className="space-y-2 flex flex-col gap-2">
                                    {chapterInQuran?.approach_quran && (
                                        <div className="flex items-center gap-2 text-slate-800">
                                            <BookOpen
                                                size={16}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                مَنْهَجُ القُرْآنِ:{" "}
                                                {chapterInQuran?.approach_quran}
                                            </span>
                                        </div>
                                    )}

                                    {chapterInQuran?.quran_sciences && (
                                        <div className="flex items-center gap-2 text-slate-800">
                                            <Landmark
                                                size={16}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                عُلُومِ القُرْآنِ:{" "}
                                                {chapterInQuran?.quran_sciences}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 hidden">
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                        // onClick={onShowStats}
                    >
                        <BarChart size={16} />
                        عرض إحصائيات الفصل
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChapterInQuranCard;
