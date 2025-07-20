import React from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

// data
import { examStatus, examType } from "../../../../../data/quranschoolDate";

// utils
import { App_Admin } from "../../../../../utils/constants";
import { formatDateDay } from "../../../../../utils/helpers";

function QuranExamsList({ quranpathId, chapterinquranId, chapterInQuran }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-fuchsia-50 rounded-xl border border-slate-200 p-6 shadow-md  ">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                    <h4 className="text-2xl font-bold text-slate-800">
                        تَتَبُّعُ الاِخْتِبَارَاتِ
                    </h4>
                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                        onClick={() => {
                            // openExamModal();
                            navigate(
                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/quranexams/create`
                            );
                        }}
                    >
                        <Plus size={16} />
                        إِضَافَةُ اِخْتِبَارٍ
                    </button>
                </div>

                {chapterInQuran?.quran_exams &&
                chapterInQuran?.quran_exams.length > 0 ? (
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b border-slate-200">
                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        التَّارِيخُ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        مَنْهَجُ الاِخْتِبَارِ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        النَّوْعُ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الحَالَةُ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الإِجْرَاءَاتُ
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {chapterInQuran.quran_exams.map(
                                    (exam, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                        >
                                            <td className="p-3 text-slate-800">
                                                {/* {new Date(
                                                    exam?.date_time
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
                                                        exam?.date_time
                                                    )}
                                                </span>
                                            </td>

                                            <td className="p-3 text-slate-800">
                                                {exam?.title}
                                            </td>

                                            <td className="p-3 text-slate-800">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold 
                                                        shadow-sm w-max
                                                        ${
                                                            exam?.exam_status ===
                                                            "complete"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-slate-100 text-slate-800"
                                                        }
                                                    `}
                                                >
                                                    {examType[exam?.exam_type]}
                                                </span>
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold 
                                                        shadow-sm w-max
                                                        ${
                                                            exam?.exam_status ===
                                                            "complete"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-slate-100 text-slate-800"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        examStatus[
                                                            exam?.exam_status
                                                        ]
                                                    }
                                                </span>
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2 justify-start">
                                                    <button
                                                        onClick={() => {
                                                            // openExamModal(
                                                            //     exam
                                                            // )
                                                            navigate(
                                                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/quranexams/update/${exam?.id}`
                                                            );
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                        title="تعديل"
                                                    >
                                                        <Edit size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            // onDeleteExam(
                                                            //     exam
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
                        لَا تُوجَدُ اِخْتِبَارَاتٌ مُجَدْوَلَةٌ لِهَذَا الفَصْلِ
                        بَعْدُ.
                    </p>
                )}
            </div>
        </>
    );
}

export default QuranExamsList;
