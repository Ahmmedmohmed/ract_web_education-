/* eslint-disable no-unused-vars */
import { UserCheck } from "lucide-react";

// data
import {
    getAttendanceStatusClass,
    getAttendanceStatusIcon,
    presenceAndAbsenceStatus,
    sessionType,
} from "../../../../../data/quranschoolDate";

// utils
import { formatDateDay } from "../../../../../utils/helpers";

// components
import { SectionTitle } from "../com";

const DegreePresenceAndAbsence = ({ log }) => {
    // const totalLectures = 100;
    // const presentCount = log?.filter(
    //     (l) => l.status === "early" || l.status === "late"
    // ).length;
    // const attendancePercentage = (presentCount / totalLectures) * 100;

    const totalLectures = log?.length || 0;
    const presentCount = log?.filter(
        (l) => l.status === "early_attendance" || l.status === "late_attendance"
    ).length;
    const attendancePercentage = (presentCount / totalLectures) * 100;

    // console.log(`log`, log);
    // console.log(`presentCount`, presentCount);
    // console.log(`attendancePercentage`, attendancePercentage);

    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-user-check"></i>
                        <UserCheck />
                    }
                    title="مُتابعة الحُضُور والغِياب"
                    colorClass="bg-emerald-50"
                />
                <div className="p-5">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-600">
                                نِسْبَة الحُضُور الإجمالية
                            </label>
                            <span className="text-sm text-gray-600">
                                {presentCount}/{totalLectures} حلقة
                            </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div
                                className="bg-emerald-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ width: `${attendancePercentage}%` }}
                            >
                                {attendancePercentage.toFixed(0)}%
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        تاريخ المحاضرة
                                    </th>

                                    <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        نوع المحاضرة
                                    </th>

                                    <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {log?.map((entry, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="p-3 font-bold text-emerald-800 whitespace-nowrap">
                                            {formatDateDay(
                                                entry?.presence_and_absence
                                                    ?.created_at
                                            )}
                                        </td>

                                        <td className="p-3">
                                            {
                                                sessionType[
                                                    entry?.presence_and_absence
                                                        ?.session_type
                                                ]
                                            }
                                        </td>

                                        <td className="p-3">
                                            <div
                                                className={`flex items-center gap-4 px-4 py-1 rounded-full text-sm font-bold shadow-sm w-max
                                                ${getAttendanceStatusClass(
                                                    entry.status
                                                )}
                                            `}
                                            >
                                                {getAttendanceStatusIcon(
                                                    entry.status
                                                )}
                                                {
                                                    presenceAndAbsenceStatus[
                                                        entry.status
                                                    ]
                                                }
                                                {/* {entry.status === "early"
                                                ? "حضور مبكر"
                                                : entry.status === "late"
                                                ? "حضور متأخر"
                                                : "غياب"} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DegreePresenceAndAbsence;
