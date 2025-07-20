import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";

// utils
import { App_Admin } from "../../../../../utils/constants";
import { formatDateDay } from "../../../../../utils/helpers";

function QuranCirclesList({ quranpathId, chapterinquranId, chapterInQuran }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-emerald-50 rounded-xl border border-slate-200 p-6 shadow-md ">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                    <h4 className="text-2xl font-bold text-slate-800">
                        تَتَبُّعُ حَلَقَاتِ القُرْآنِ
                    </h4>

                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                        onClick={() => {
                            // openWirdModal();
                            navigate(
                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/qurancircles/create`
                            );
                        }}
                    >
                        <Plus size={16} />
                        إِضَافَةُ وَرْدٍ
                    </button>
                </div>

                {chapterInQuran?.quran_circles &&
                chapterInQuran?.quran_circles.length > 0 ? (
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b border-slate-200">
                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        التَّارِيخُ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الحاضر
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الماضي
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الإِجْرَاءَاتُ
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {chapterInQuran?.quran_circles?.map(
                                    (wird, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                        >
                                            <td className="p-3 text-slate-800 ">
                                                {/* {new Date(
                                                    wird.date_time
                                                ).toLocaleDateString(
                                                    "ar-EG-u-nu-latn",
                                                    {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )} */}

                                                <span className="w-max">
                                                    {formatDateDay(
                                                        wird?.date_time
                                                    )}
                                                </span>
                                            </td>

                                            <td className="p-3 text-slate-800">
                                                {wird.present_roses}
                                            </td>

                                            <td className="p-3 text-slate-800">
                                                {wird.past_roses}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2 justify-start">
                                                    <button
                                                        onClick={() => {
                                                            // openWirdModal(
                                                            //     wird
                                                            // )
                                                            navigate(
                                                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/qurancircles/update/${wird.id}`
                                                            );
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                        title="تعديل"
                                                    >
                                                        <Edit size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            // onDeleteWird(
                                                            //     wird
                                                            // )
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                        title="حذف"
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                        لا تُوجَدُ مَدْخَلاَتُ وَرْدٍ لِهَذَا الفَصْلِ بَعْدُ.
                    </p>
                )}
            </div>
        </>
    );
}

export default QuranCirclesList;
