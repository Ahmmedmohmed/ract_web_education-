import { Check } from "lucide-react";

// data
import {
    examStatus,
    examType,
    getExamTypeClass,
    getRatingClassStudent,
    getRatingFromGradeStudnet,
    getStatusClass,
} from "../../../../../data/quranschoolDate";

// utils
import { formatDateDay } from "../../../../../utils/helpers";

// components
import { SectionTitle } from "../com";

const DegreeQuranExam = ({ exams }) => {
    return (
        <>
            {/* {console.log(`exams`, exams)} */}
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-check-circle"></i>
                        <Check />
                    }
                    title="جَدْول الاخْتِبارات المقررة"
                    colorClass="bg-blue-50"
                />

                <div className="overflow-y-auto max-h-96 p-5">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-3 text-lg font-bold text-black uppercase tracking-wider">
                                    مَوْعِد الاخْتِبار
                                </th>

                                <th className="p-3 text-lg font-bold text-black uppercase tracking-wider">
                                    نَوْع الاخْتِبار
                                </th>

                                <th className="p-3 text-lg font-bold text-black uppercase tracking-wider">
                                    مَنْهَج الاخْتِبار
                                </th>

                                <th className="p-3 text-lg font-bold text-black uppercase tracking-wider">
                                    الدَّرجة والأداء
                                </th>

                                <th className="p-3 text-lg font-bold text-black uppercase tracking-wider">
                                    الحالة
                                </th>
                            </tr>
                        </thead>

                        {exams?.length > 0 ? (
                            <tbody>
                                {exams?.map((exam, index) => {
                                    const rating =
                                        exam?.degree_exam !== null
                                            ? getRatingFromGradeStudnet(
                                                  exam?.degree_exam
                                              )
                                            : null;

                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-bold text-emerald-800 whitespace-nowrap">
                                                {formatDateDay(
                                                    exam?.quran_exam?.created_at
                                                )}
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`px-4 py-1 rounded-full text-sm font-bold min-w-[90px] inline-block text-center shadow-sm
                                                    ${getExamTypeClass(
                                                        exam?.quran_exam
                                                            ?.exam_type
                                                    )}
                                                `}
                                                >
                                                    {
                                                        examType[
                                                            exam?.quran_exam
                                                                ?.exam_type
                                                        ]
                                                    }
                                                </span>
                                            </td>

                                            {/* <td className="p-3">{`مِن ${exam?.syllabus.from} إلَى ${exam?.syllabus.to}`}</td> */}

                                            <td className="p-3 text-black">
                                                {exam?.quran_exam?.title}
                                            </td>

                                            <td className="p-3">
                                                {exam?.quran_exam
                                                    ?.exam_status ===
                                                "complete" ? (
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[60px] text-center  shadow-sm
                                                            ${getRatingClassStudent(
                                                                rating
                                                            )}
                                                            `}
                                                        >
                                                            {exam?.degree_exam ===
                                                            0
                                                                ? "0%"
                                                                : `${exam?.degree_exam}%`}
                                                        </span>

                                                        <span
                                                            className={`px-4 py-1 rounded-full text-sm font-bold min-w-[80px] text-center  shadow-sm
                                                            ${getRatingClassStudent(
                                                                rating
                                                            )}
                                                        `}
                                                        >
                                                            {rating}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    "---"
                                                )}
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`px-4 py-1 rounded-full text-sm font-bold min-w-[80px] inline-block text-center shadow-sm 
                                                    ${getStatusClass(
                                                        exam?.quran_exam
                                                            ?.exam_status
                                                    )}
                                                `}
                                                >
                                                    {
                                                        examStatus[
                                                            exam?.quran_exam
                                                                ?.exam_status
                                                        ]
                                                    }
                                                    {/* {exam?.status === "completed"
                                                    ? "مُكْتَمَل"
                                                    : "لم يبدأ"} */}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        ) : (
                            <></>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
};
export default DegreeQuranExam;
