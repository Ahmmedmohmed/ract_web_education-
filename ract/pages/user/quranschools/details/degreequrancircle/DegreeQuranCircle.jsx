import { ChartSpline } from "lucide-react";

// data
import {
    getRatingClassStudent,
    getRatingFromGradeStudnet,
} from "../../../../../data/quranschoolDate";

// utils
import { formatDateDay } from "../../../../../utils/helpers";

// components
import { SectionTitle } from "../com";

const DegreeQuranCircle = ({ history }) => {
    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-chart-line"></i>
                        <ChartSpline />
                    }
                    title="جَدْول المُتابعة التَّراكمي"
                    colorClass="bg-emerald-50"
                />

                <div className="overflow-y-auto max-h-96 p-5">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    التَّاريخ
                                </th>

                                <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    الدَّرس الجديد (الحاضر)
                                </th>

                                <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    المُراجعة (الماضي)
                                </th>

                                <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    الأداء
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {history?.map((record, index) => {
                                if (record?.degree_present_roses) {
                                    const presentRating =
                                        getRatingFromGradeStudnet(
                                            record?.degree_present_roses
                                        );
                                    const pastRating =
                                        getRatingFromGradeStudnet(
                                            record?.degree_past_roses
                                        );

                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-bold text-emerald-800 whitespace-nowrap">
                                                {formatDateDay(
                                                    record?.quran_circle
                                                        ?.created_at
                                                )}
                                            </td>

                                            <td className="p-3">
                                                {
                                                    record?.quran_circle
                                                        ?.present_roses
                                                }
                                            </td>

                                            <td className="p-3">
                                                {
                                                    record?.quran_circle
                                                        ?.past_roses
                                                }
                                            </td>

                                            <td className="p-3 min-w-[300px]">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-600 text-sm w-14">
                                                            الحاضر:
                                                        </span>

                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[60px] text-center shadow-sm 
                                                        ${getRatingClassStudent(
                                                            presentRating
                                                        )}
                                                    `}
                                                        >
                                                            {
                                                                record?.degree_present_roses
                                                            }
                                                            %
                                                        </span>

                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[80px] text-center  shadow-sm 
                                                        ${getRatingClassStudent(
                                                            presentRating
                                                        )}
                                                    `}
                                                        >
                                                            {presentRating}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-600 text-sm w-14">
                                                            الماضي:
                                                        </span>

                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[60px] text-center  shadow-sm
                                                        ${getRatingClassStudent(
                                                            pastRating
                                                        )}
                                                    `}
                                                        >
                                                            {
                                                                record?.degree_past_roses
                                                            }
                                                            %
                                                        </span>

                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[80px] text-center  shadow-sm
                                                        ${getRatingClassStudent(
                                                            pastRating
                                                        )}
                                                    `}
                                                        >
                                                            {pastRating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                                    >
                                        <td className="p-3 font-bold text-emerald-800 whitespace-nowrap">
                                            {formatDateDay(
                                                record?.quran_circle?.created_at
                                            )}
                                        </td>

                                        <td className="p-3 text-gray-400 italic">
                                            ---
                                        </td>

                                        <td className="p-3 text-gray-400 italic">
                                            ---
                                        </td>

                                        <td className="p-3 text-gray-500">
                                            لم تُسجَّل بعد
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DegreeQuranCircle;
