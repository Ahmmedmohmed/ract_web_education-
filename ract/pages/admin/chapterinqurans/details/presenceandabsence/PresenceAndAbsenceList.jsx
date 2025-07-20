import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";

// data
import { sessionType } from "../../../../../data/quranschoolDate";

// utils
import { App_Admin } from "../../../../../utils/constants";
import { formatDateDay } from "../../../../../utils/helpers";

function PresenceAndAbsenceList({
    quranpathId,
    chapterinquranId,
    chapterInQuran,
}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6 shadow-md  ">
                <div className="flex justify-between items-center pb-5 mb-5 border-b border-orange-100">
                    <h4 className="text-2xl font-bold text-slate-800">
                        سجل الحضور والغياب
                    </h4>

                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                        onClick={() => {
                            // openAttendanceModal();
                            navigate(
                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/presenceandabsences/create`
                            );
                        }}
                    >
                        <Plus size={16} />
                        <span>إضافة جلسة</span>
                    </button>
                </div>

                {chapterInQuran?.presence_and_absences &&
                chapterInQuran?.presence_and_absences?.length > 0 ? (
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b border-orange-100">
                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        التاريخ
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        نوع الجلسة
                                    </th>

                                    <th className="text-right p-3 text-xl font-bold text-black uppercase">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {chapterInQuran?.presence_and_absences?.map(
                                    (session, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-orange-50 border-b border-orange-100 last:border-0"
                                        >
                                            <td className="p-3 text-slate-800">
                                                {/* {new Date(
                                                    session.date_time
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
                                                        session?.date_time
                                                    )}
                                                </span>
                                            </td>

                                            <td className="p-3 text-slate-800">
                                                {
                                                    sessionType[
                                                        session.session_type
                                                    ]
                                                }
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2 justify-start">
                                                    <button
                                                        onClick={() => {
                                                            // openAttendanceModal(
                                                            //     session
                                                            // )
                                                            navigate(
                                                                `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/presenceandabsences/update/${session.id}`
                                                            );
                                                        }}
                                                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                        title="تعديل"
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            // onDeleteAttendance(
                                                            //     session
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
                        لم يتم تسجيل أي جلسات حضور بعد.
                    </p>
                )}
            </div>
        </>
    );
}

export default PresenceAndAbsenceList;
