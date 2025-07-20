/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    CalendarDays,
    Download,
    Edit,
    Plus,
    Save,
    Trash,
    UserSquare,
} from "lucide-react";

// api
import {
    publicUpdateDegreePresenceAndAbsenceStatus,
    publicUpdateDegreeQuranCircle,
    publicUpdateDegreeQuranExam,
} from "../../../../../api/public/authPublic";

// data
import {
    examType,
    getAttendanceClass,
    getRatingClass,
    getRatingFromGrade,
    sessionType,
} from "../../../../../data/quranschoolDate";

// plugin
import Toast from "../../../../../plugin/Toast";

// utils
import { App_Admin, SERVER_URL } from "../../../../../utils/constants";

function StudentEnrollments({
    enrollmentStuents,
    setEnrollmentStuents,
    quranpathId,
    chapterinquranId,
}) {
    const navigate = useNavigate();

    const [degreePresenceAndAbsences, setDegreePresenceAndAbsences] = useState(
        []
    );

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    //
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [gradingMode, setGradingMode] = useState("recitations");
    const [classStudents, setClassStudents] = useState("recitations");

    const [selectedStudent, setSelectedStudent] = useState([]);

    //
    const [degreePresentRoses, setDegreePresentRoses] = useState("");
    const [degreePastRoses, setDegreePastRoses] = useState("");
    const [degreeExam, setDegreeExam] = useState("");

    //
    // const selectedStudent = selectedStudentId
    //     ? enrollmentStuents[selectedStudentId]
    //     : enrollmentStuents[0];

    //

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (selectedStudentId) {
            // console.log(`eeee`);
            // enrollmentStuents.filter((studnet) => {
            //     if (studnet.id === selectedStudentId) {
            //         setSelectedStudent(enrollmentStuents[+selectedStudentId]);
            //     }
            // } )
            // // enrollmentStuents.
            // setSelectedStudent(enrollmentStuents[+selectedStudentId - 1]);
            // setSelectedStudent(
            //     enrollmentStuents.filter(
            //         (studnet) => studnet.id === +selectedStudentId
            //     )
            // );

            let x = enrollmentStuents.find(
                (studnet) => studnet.id === +selectedStudentId
            );
            setSelectedStudent(x);

            // console.log(`selectedStudent-----------------`, selectedStudent);
            // console.log(`selectedStudentId--------`, selectedStudentId);
        } else {
            setSelectedStudent(enrollmentStuents[0]);
            // console.log(`selectedStudent0`, selectedStudent);
        }
    }, [enrollmentStuents, selectedStudent, selectedStudentId]);

    useEffect(() => {
        setDegreePresenceAndAbsences(
            selectedStudent?.degree_presence_and_absence
        );
    }, [selectedStudent?.degree_presence_and_absence]);

    //
    const handleDegreePresenceAndAbsenceStatusChange = async (
        messageId,
        newStatus
    ) => {
        try {
            const { data, error } =
                await publicUpdateDegreePresenceAndAbsenceStatus(
                    messageId,
                    newStatus
                );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setDegreePresenceAndAbsences(
                    degreePresenceAndAbsences.map((message) =>
                        message.id === messageId
                            ? { ...message, status: newStatus }
                            : message
                    )
                );
                Toast("success", "تم تحديث الحالة بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    //
    const handleDegreeQuranExamSubmit = async (examId) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();

            if (degreeExam) {
                courseData.append("degree_exam", degreeExam || "");
            }

            // courseData.append("is_visible", isVisible);

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`------------------------------`);
            // }

            const { data, error } = await publicUpdateDegreeQuranExam(
                examId,
                courseData
            );

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
            } else {
                Toast("success", "تم تحديث الدرجة بنجاح");
                // navigate(`/${App_Admin}/books`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            Toast("error", "حدث خطأ أثناء تحديث الدرجة");
        } finally {
            setIsLoading(false);
        }
    };

    //
    const handleDegreeQuranCircleSubmit = async (circleId) => {
        try {
            setIsLoading(true);

            const courseData = new FormData();

            if (degreePresentRoses) {
                courseData.append(
                    "degree_present_roses",
                    degreePresentRoses || ""
                );
            }
            if (degreePastRoses) {
                courseData.append("degree_past_roses", degreePastRoses || "");
            }

            // courseData.append("is_visible", isVisible);

            // for (let [key, value] of courseData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`------------------------------`);
            // }

            const { data, error } = await publicUpdateDegreeQuranCircle(
                circleId,
                courseData
            );

            console.log(`error`, error);
            console.log(`data`, data);

            if (error) {
                if (error.image) {
                    setErrorsMessage(error.image);
                    Toast("error", error.image);
                } else if (error.message) {
                    Toast("error", error.message);
                }
            } else {
                Toast("success", "تم تحديث الدرجة بنجاح");
                // navigate(`/${App_Admin}/books`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            Toast("error", "حدث خطأ أثناء تحديث الدرجة");
        } finally {
            setIsLoading(false);
        }
    };

    // console.log(`enrollmentStuents`, enrollmentStuents);
    // console.log(`degreePresentRoses`, degreePresentRoses);

    return (
        <>
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-6 shadow-md ">
                <h4 className="text-2xl font-bold text-slate-800 mb-5">
                    إدارة وتقييم الطلاب
                </h4>

                <div className="flex flex-wrap items-center gap-4 pb-5 mb-5 border-b border-purple-200">
                    <label
                        htmlFor="student-select"
                        className="flex items-center gap-2"
                    >
                        <UserSquare size={18} className="text-purple-600" />
                        <span>اختر الطالب:</span>
                    </label>

                    <select
                        id="student-select"
                        className="flex-1 min-w-[200px] p-2 border border-slate-300 rounded-lg"
                        value={selectedStudentId}
                        onChange={(e) => {
                            setSelectedStudentId(e.target.value);
                            // console.log(`---------=--------------------------`);
                            // console.log(`e.target.value`, e.target.value);
                        }}
                    >
                        {enrollmentStuents?.map((student) => (
                            <option key={student?.id} value={student?.id}>
                                {student?.full_name} - [{student?.student?.id}){" "}
                                {student?.student?.full_name}]
                            </option>
                        ))}
                    </select>
                </div>

                {selectedStudent ? (
                    <div className="animate-fade-in">
                        <div className="flex flex-wrap gap-6 bg-white p-4 rounded-lg mb-5">
                            <div className="flex items-center gap-2 text-slate-600">
                                <strong className=" text-slate-800 font-semibold">
                                    الاسم الكامل:
                                </strong>
                                <span>{selectedStudent?.full_name}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                                <strong className=" text-slate-800 font-semibold">
                                    العمر:
                                </strong>
                                <span>{selectedStudent?.age} سنة</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                                <strong className=" text-slate-800 font-semibold">
                                    البلد:
                                </strong>
                                <span>{selectedStudent?.country}</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-1 mb-[-1px]">
                                <button
                                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                        gradingMode === "recitations"
                                            ? "bg-white border-b-white text-indigo-600"
                                            : "text-slate-500"
                                    }`}
                                    onClick={() => {
                                        setGradingMode("recitations");
                                    }}
                                >
                                    تتبع الحلقات
                                </button>

                                <button
                                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                        gradingMode === "exams"
                                            ? "bg-white border-b-white text-indigo-600"
                                            : "text-slate-500"
                                    }`}
                                    onClick={() => {
                                        setGradingMode("exams");
                                    }}
                                >
                                    تتبع الاختبارات
                                </button>

                                <button
                                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                        gradingMode === "attendance"
                                            ? "bg-white border-b-white text-indigo-600"
                                            : "text-slate-500"
                                    }`}
                                    onClick={() => {
                                        setGradingMode("attendance");
                                    }}
                                >
                                    تتبع الحضور
                                </button>

                                <button
                                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                        gradingMode === "certificates"
                                            ? "bg-white border-b-white text-indigo-600"
                                            : "text-slate-500"
                                    }`}
                                    onClick={() => {
                                        setGradingMode("certificates");
                                    }}
                                >
                                    تتبع الشهادات
                                </button>

                                <button
                                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                        gradingMode === "teacherNotes"
                                            ? "bg-white border-b-white text-indigo-600"
                                            : "text-slate-500"
                                    }`}
                                    onClick={() => {
                                        setGradingMode("teacherNotes");
                                    }}
                                >
                                    ملاحظات المعلم
                                </button>
                            </div>

                            <div className="border border-slate-200 rounded-b-lg rounded-tr-lg bg-white p-4 max-h-[400px] overflow-y-auto">
                                {gradingMode === "recitations" && (
                                    <div className="animate-fade-in">
                                        {/* <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                            onClick={() => {
                                                // setNoteModal({
                                                //     isOpen: true,
                                                //     data: null,
                                                // })
                                                // navigate(
                                                // `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/teachernotes/create`
                                                // );
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>إضافة درجة حلقة جديدة</span>
                                        </button> */}

                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        التاريخ
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الحاضر
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        درجة الحاضر
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الماضي
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        درجة الماضي
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        التقدير
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الإِجْرَاءَاتُ
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    // [
                                                    //     ...(selectedClass.quranRecitations ||
                                                    //         []),
                                                    // ]
                                                    //     .sort(
                                                    //         (a, b) =>
                                                    //             new Date(
                                                    //                 b.date
                                                    //             ) -
                                                    //             new Date(
                                                    //                 a.date
                                                    //             )
                                                    //     )
                                                    selectedStudent?.degree_quran_circle?.map(
                                                        (rec, index) => {
                                                            // const studentGrades =
                                                            //     grades[
                                                            //         selectedStudent
                                                            //             .id
                                                            //     ]
                                                            //         ?.recitations?.[
                                                            //         rec
                                                            //             .id
                                                            //     ] || {};

                                                            const presentRosesRating =
                                                                getRatingFromGrade(
                                                                    rec?.degree_present_roses
                                                                );
                                                            const pastRosesRating =
                                                                getRatingFromGrade(
                                                                    rec?.degree_past_roses
                                                                );

                                                            // console.log(
                                                            //     `presentRosesRating`,
                                                            //     presentRosesRating
                                                            // );
                                                            // console.log(
                                                            //     `pastRosesRating`,
                                                            //     pastRosesRating
                                                            // );

                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                                >
                                                                    <td className="p-3 text-slate-800">
                                                                        {new Date(
                                                                            rec?.created_at
                                                                        ).toLocaleDateString(
                                                                            "ar-EG"
                                                                        )}
                                                                    </td>

                                                                    <td className="p-3 text-slate-800">
                                                                        {
                                                                            rec
                                                                                ?.quran_circle
                                                                                ?.present_roses
                                                                        }
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <div>
                                                                            {/* {console.log(
                                                                                `rec?.degree_present_roses`,
                                                                                rec?.degree_present_roses
                                                                            )} */}
                                                                            <label
                                                                                htmlFor={`degree_present_roses${index}`}
                                                                                className="  text-lg font-medium text-black mb-2 hidden"
                                                                            ></label>
                                                                            <input
                                                                                type="number"
                                                                                id={`degree_present_roses${index}`}
                                                                                name={`degree_present_roses${index}`}
                                                                                min="0"
                                                                                max="100"
                                                                                placeholder="مثال: 50 أو 0"
                                                                                className="w-20 text-black p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                                                {...register(
                                                                                    `degree_present_roses${index}`,
                                                                                    {
                                                                                        required:
                                                                                            "الدرجة مطلوب",
                                                                                        min: {
                                                                                            value: 0,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أقل من 0",
                                                                                        },
                                                                                        max: {
                                                                                            value: 100,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أكثر من 100",
                                                                                        },
                                                                                        value: rec?.degree_present_roses,
                                                                                    }
                                                                                )}
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    //
                                                                                    setDegreePresentRoses(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                autoComplete="off"
                                                                                disabled={
                                                                                    isSubmitting ||
                                                                                    isLoading
                                                                                }
                                                                                required
                                                                                // value={
                                                                                //     rec?.degree_present_roses ??
                                                                                //     ""
                                                                                // }
                                                                                // onChange={(
                                                                                //     e
                                                                                // ) => {
                                                                                //     // handleGradeChange(
                                                                                //     //     selectedStudent.id,
                                                                                //     //     "recitations",
                                                                                //     //     rec?.id,
                                                                                //     //     "currentGrade",
                                                                                //     //     e
                                                                                //     //     .target
                                                                                //     //     .value
                                                                                //     // )
                                                                                // }}
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-3 text-slate-800">
                                                                        {
                                                                            rec
                                                                                ?.quran_circle
                                                                                ?.past_roses
                                                                        }
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <div>
                                                                            <label
                                                                                htmlFor={`degree_past_roses${index}`}
                                                                                className="  text-lg font-medium text-black mb-2 hidden"
                                                                            ></label>
                                                                            <input
                                                                                type="number"
                                                                                id={`degree_past_roses${index}`}
                                                                                name={`degree_past_roses${index}`}
                                                                                min="0"
                                                                                max="100"
                                                                                placeholder="مثال: 50 أو 0"
                                                                                className="w-20 text-black p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                                                {...register(
                                                                                    `degree_past_roses${index}`,
                                                                                    {
                                                                                        required:
                                                                                            "الدرجة مطلوب",
                                                                                        min: {
                                                                                            value: 0,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أقل من 0",
                                                                                        },
                                                                                        max: {
                                                                                            value: 100,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أكثر من 100",
                                                                                        },
                                                                                        value: rec?.degree_past_roses,
                                                                                    }
                                                                                )}
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    //
                                                                                    setDegreePastRoses(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                autoComplete="off"
                                                                                disabled={
                                                                                    isSubmitting ||
                                                                                    isLoading
                                                                                }
                                                                                required
                                                                                // value={
                                                                                //     rec?.degree_past_roses ??
                                                                                //     ""
                                                                                // }
                                                                                // onChange={(
                                                                                //     e
                                                                                // ) => {
                                                                                //     // handleGradeChange(
                                                                                //     //     selectedStudent.id,
                                                                                //     //     "recitations",
                                                                                //     //     rec?.id,
                                                                                //     //     "pastGrade",
                                                                                //     //     e
                                                                                //     //         .target
                                                                                //     //         .value
                                                                                //     //     )
                                                                                // }}
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <div className="flex flex-col gap-1 items-start">
                                                                            {presentRosesRating && (
                                                                                <span
                                                                                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                                                    ${getRatingClass(
                                                                                        presentRosesRating
                                                                                    )}
                                                                                `}
                                                                                >
                                                                                    الحاضر:
                                                                                    {
                                                                                        presentRosesRating
                                                                                    }
                                                                                </span>
                                                                            )}

                                                                            {pastRosesRating && (
                                                                                <span
                                                                                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                                                    ${getRatingClass(
                                                                                        pastRosesRating
                                                                                    )}
                                                                                `}
                                                                                >
                                                                                    الماضي:
                                                                                    {
                                                                                        pastRosesRating
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <button
                                                                            onClick={() => {
                                                                                // openWirdModal(
                                                                                //     wird
                                                                                // )
                                                                                // navigate(
                                                                                //     `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/qurancircles/update/${wird.id}`
                                                                                // );
                                                                                // let x = `degree_present_roses${index}`
                                                                                // console.log(
                                                                                //     `getValues`,
                                                                                //     getValues()
                                                                                //         .x
                                                                                // );
                                                                                // console.log(
                                                                                //     `exam`,
                                                                                //     exam.id
                                                                                // );
                                                                                handleDegreeQuranCircleSubmit(
                                                                                    rec?.id
                                                                                    // getValues()
                                                                                    //     .degree_exam
                                                                                );
                                                                            }}
                                                                            // type="submit"
                                                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                                            title="حفظ الدرجة"
                                                                        >
                                                                            <Save
                                                                                size={
                                                                                    18
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {gradingMode === "exams" && (
                                    <div className="animate-fade-in">
                                        {/* <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                            onClick={() => {
                                                // setNoteModal({
                                                //     isOpen: true,
                                                //     data: null,
                                                // })
                                                // navigate(
                                                // `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/teachernotes/create`
                                                // );
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>إضافة درجة اختبار جديد</span>
                                        </button> */}

                                        {/* <form
                                            // onSubmit={handleSubmit(
                                            //     handleDegreeQuranExamSubmit
                                            // )}
                                            encType="multipart/form-data"
                                        > */}
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        التاريخ
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        منهج الاختبار
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        النوع
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الدرجة
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        التقدير
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الإِجْرَاءَاتُ
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    // [
                                                    //     ...(selectedClass.exams ||
                                                    //         []),
                                                    // ]
                                                    //     .filter(
                                                    //         (ex) =>
                                                    //             ex.status ===
                                                    //             "مكتمل"
                                                    //     )
                                                    //     .sort(
                                                    //         (a, b) =>
                                                    //             new Date(
                                                    //                 b.date
                                                    //             ) -
                                                    //             new Date(
                                                    //                 a.date
                                                    //             )
                                                    //     )
                                                    selectedStudent?.degree_quran_exam?.map(
                                                        (exam, index) => {
                                                            // const studentExamGrade =
                                                            //     grades[
                                                            //         selectedStudent
                                                            //             .id
                                                            //     ]?.exams?.[
                                                            //         exam.id
                                                            //     ] || {};

                                                            const examRating =
                                                                getRatingFromGrade(
                                                                    exam.degree_exam
                                                                );

                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                                >
                                                                    <td className="p-3 text-slate-800">
                                                                        {new Date(
                                                                            exam.created_at
                                                                        ).toLocaleDateString(
                                                                            "ar-EG"
                                                                        )}
                                                                    </td>

                                                                    <td className="p-3 text-slate-800">
                                                                        {
                                                                            exam
                                                                                ?.quran_exam
                                                                                ?.title
                                                                        }
                                                                    </td>

                                                                    <td className="p-3 text-slate-800">
                                                                        {
                                                                            examType[
                                                                                exam
                                                                                    ?.quran_exam
                                                                                    ?.exam_type
                                                                            ]
                                                                        }
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <div>
                                                                            <label
                                                                                htmlFor={`degree_exam${index}`}
                                                                                className="  text-lg font-medium text-black mb-2 hidden"
                                                                            ></label>
                                                                            <input
                                                                                type="number"
                                                                                id={`degree_exam${index}`}
                                                                                name={`degree_exam${index}`}
                                                                                min="0"
                                                                                max="100"
                                                                                placeholder="مثال: 50 أو 0"
                                                                                // className="w-16 p-1 border border-slate-300 rounded text-center font-semibold"
                                                                                className="w-20 text-black p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                                                {...register(
                                                                                    `degree_exam${index}`,
                                                                                    {
                                                                                        required:
                                                                                            "الدرجة مطلوب",
                                                                                        min: {
                                                                                            value: 0,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أقل من 0",
                                                                                        },
                                                                                        max: {
                                                                                            value: 100,
                                                                                            message:
                                                                                                "الدرجة لا يمكن أن تكون أكثر من 100",
                                                                                        },
                                                                                        value: exam?.degree_exam,
                                                                                    }
                                                                                )}
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    //
                                                                                    setDegreeExam(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                autoComplete="off"
                                                                                disabled={
                                                                                    isSubmitting ||
                                                                                    isLoading
                                                                                }
                                                                                required
                                                                                // value={
                                                                                //     exam?.degree_exam ??
                                                                                //     ""
                                                                                // }
                                                                                // onChange={(
                                                                                //     e
                                                                                // ) => {
                                                                                //     // handleGradeChange(
                                                                                //     //     selectedStudent.id,
                                                                                //     //     "exams",
                                                                                //     //     exam.id,
                                                                                //     //     "grade",
                                                                                //     //     e
                                                                                //     //     .target
                                                                                //     //     .value
                                                                                //     // )
                                                                                // }}
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-3">
                                                                        {examRating && (
                                                                            <span
                                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getRatingClass(
                                                                                    examRating
                                                                                )}`}
                                                                            >
                                                                                {
                                                                                    examRating
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <button
                                                                            onClick={() => {
                                                                                // openWirdModal(
                                                                                //     wird
                                                                                // )
                                                                                // navigate(
                                                                                //     `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/qurancircles/update/${wird.id}`
                                                                                // );
                                                                                // console.log(
                                                                                //     `getValues`,
                                                                                //     getValues()
                                                                                //         .degree_exam
                                                                                // );
                                                                                // console.log(
                                                                                //     `exam`,
                                                                                //     exam.id
                                                                                // );

                                                                                handleDegreeQuranExamSubmit(
                                                                                    exam?.id
                                                                                    // getValues()
                                                                                    //     .degree_exam
                                                                                );
                                                                            }}
                                                                            // type="submit"
                                                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                                            title="حفظ الدرجة"
                                                                        >
                                                                            <Save
                                                                                size={
                                                                                    18
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        {/* </form> */}
                                    </div>
                                )}

                                {gradingMode === "attendance" && (
                                    <div className="animate-fade-in">
                                        {/* <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                            onClick={() => {
                                                // setNoteModal({
                                                //     isOpen: true,
                                                //     data: null,
                                                // })
                                                // navigate(
                                                // `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/teachernotes/create`
                                                // );
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>إضافة حضور جديد</span>
                                        </button> */}

                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        التاريخ
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        نوع الجلسة
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الحالة
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    // [
                                                    //     ...(selectedClass.attendanceLog ||
                                                    //         []),
                                                    // ]
                                                    //     .sort(
                                                    //         (a, b) =>
                                                    //             new Date(
                                                    //                 b.date
                                                    //             ) -
                                                    //             new Date(
                                                    //                 a.date
                                                    //             )
                                                    //     )
                                                    // selectedStudent?.degree_presence_and_absence?.map(
                                                    degreePresenceAndAbsences?.map(
                                                        (rec, index) => {
                                                            const attendanceStatus =
                                                                rec.status ||
                                                                "not-recorded";

                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                                >
                                                                    <td className="p-3 text-slate-800">
                                                                        {new Date(
                                                                            rec.created_at
                                                                        ).toLocaleDateString(
                                                                            "ar-EG"
                                                                        )}
                                                                    </td>

                                                                    <td className="p-3 text-slate-800">
                                                                        {
                                                                            sessionType[
                                                                                rec
                                                                                    .presence_and_absence
                                                                                    .session_type
                                                                            ]
                                                                        }
                                                                    </td>

                                                                    <td className="p-3">
                                                                        <label
                                                                            htmlFor={`DegreePresenceAndAbsence${index}`}
                                                                            className="hidden"
                                                                        ></label>
                                                                        <select
                                                                            id={`DegreePresenceAndAbsence${index}`}
                                                                            name={`DegreePresenceAndAbsence${index}`}
                                                                            className={`p-1 border rounded font-semibold 
                                                                            ${getAttendanceClass(
                                                                                attendanceStatus
                                                                            )}
                                                                        `}
                                                                            value={
                                                                                rec.status
                                                                                // attendanceStatus
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                // handleAttendanceChange(
                                                                                //     selectedStudent.id,
                                                                                //     rec.id,
                                                                                //     e
                                                                                //         .target
                                                                                //         .value
                                                                                // )

                                                                                handleDegreePresenceAndAbsenceStatusChange(
                                                                                    rec.id,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }}
                                                                        >
                                                                            <option value="not_register">
                                                                                لم
                                                                                تسجل
                                                                            </option>

                                                                            <option value="early_attendance">
                                                                                حضور
                                                                                مبكر
                                                                            </option>

                                                                            <option value="late_attendance">
                                                                                حضور
                                                                                متأخر
                                                                            </option>

                                                                            <option value="absence">
                                                                                غياب
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {gradingMode === "certificates" && (
                                    <div className="animate-fade-in">
                                        <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                            onClick={() => {
                                                // setCertificateModal(
                                                //     {
                                                //         isOpen: true,
                                                //         data: null,
                                                //     }
                                                // );
                                                navigate(
                                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/certificatequrans/create`
                                                );
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>إضافة شهادة جديدة</span>
                                        </button>

                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        عنوان الشهادة
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        السبب/التفاصيل
                                                    </th>

                                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                                        الإجراءات
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    // (
                                                    //     grades[
                                                    //         selectedStudent
                                                    //             .id
                                                    //     ]
                                                    //         ?.certificates ||
                                                    //     []
                                                    // )
                                                    selectedStudent?.certificate_quran?.map(
                                                        (cert) => (
                                                            <tr
                                                                key={cert.id}
                                                                className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                            >
                                                                <td className="p-3 text-slate-800">
                                                                    {cert.title}
                                                                </td>

                                                                <td className="p-3 text-slate-800">
                                                                    {
                                                                        cert.description
                                                                    }
                                                                </td>

                                                                <td className="p-3">
                                                                    <div className="flex gap-2 justify-start">
                                                                        <a
                                                                            href={
                                                                                cert.file_url ||
                                                                                `${SERVER_URL}${cert.file}`
                                                                            }
                                                                            // download={
                                                                            //     cert.fileName ||
                                                                            //     "certificate.pdf"
                                                                            // }
                                                                            target="_blank"
                                                                            download={
                                                                                true
                                                                            }
                                                                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full"
                                                                            title="تنزيل"
                                                                        >
                                                                            <Download
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </a>

                                                                        <button
                                                                            onClick={() => {
                                                                                // setCertificateModal(
                                                                                //     {
                                                                                //         isOpen: true,
                                                                                //         data: cert,
                                                                                //     }
                                                                                // )
                                                                                navigate(
                                                                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/certificatequrans/update/${cert?.id}`
                                                                                );
                                                                            }}
                                                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                                            title="تعديل"
                                                                        >
                                                                            <Edit
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => {
                                                                                // handleDelete(
                                                                                //     "certificate",
                                                                                //     cert
                                                                                // );
                                                                            }}
                                                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                                            title="حذف"
                                                                        >
                                                                            <Trash
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {gradingMode === "teacherNotes" && (
                                    <div className="animate-fade-in">
                                        <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                            onClick={() => {
                                                // setNoteModal({
                                                //     isOpen: true,
                                                //     data: null,
                                                // })
                                                navigate(
                                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/teachernotes/create`
                                                );
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>إضافة ملاحظة جديدة</span>
                                        </button>

                                        <div className="max-h-[300px] overflow-y-auto space-y-4 flex flex-col gap-4">
                                            {
                                                // (
                                                //     grades[
                                                //         selectedStudent
                                                //             .id
                                                //     ]?.teacherNotes ||
                                                //     []
                                                // ).length > 0 ? (
                                                //     [
                                                //         ...(grades[
                                                //             selectedStudent
                                                //                 .id
                                                //         ]
                                                //             ?.teacherNotes ||
                                                //             []),
                                                //     ]
                                                //         .sort(
                                                //             (a, b) =>
                                                //                 new Date(
                                                //                     b.date
                                                //                 ) -
                                                //                 new Date(
                                                //                     a.date
                                                //                 )
                                                //         )
                                                selectedStudent?.teacher_note
                                                    .length > 0 ? (
                                                    selectedStudent?.teacher_note?.map(
                                                        (note, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-slate-50 border border-slate-200 rounded-lg p-4"
                                                            >
                                                                <div className="flex justify-between items-center mb-3">
                                                                    <span className="flex items-center gap-2 text-sm text-slate-500">
                                                                        <CalendarDays
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        {new Date(
                                                                            note?.updated_at
                                                                        ).toLocaleDateString(
                                                                            "ar-EG-u-nu-latn",
                                                                            {
                                                                                year: "numeric",
                                                                                month: "long",
                                                                                day: "numeric",
                                                                            }
                                                                        )}
                                                                    </span>

                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                // setNoteModal(
                                                                                //     {
                                                                                //         isOpen: true,
                                                                                //         data: note,
                                                                                //     }
                                                                                // )
                                                                                navigate(
                                                                                    `/${App_Admin}/quranpaths/${quranpathId}/chapterinqurans/${chapterinquranId}/students/${selectedStudent?.student?.id}/teachernotes/update/${note?.id}`
                                                                                );
                                                                            }}
                                                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                                            title="تعديل"
                                                                        >
                                                                            <Edit
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => {
                                                                                // handleDelete(
                                                                                //     "note",
                                                                                //     note
                                                                                // )
                                                                            }}
                                                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                                            title="حذف"
                                                                        >
                                                                            <Trash
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <p className="text-slate-800 whitespace-pre-wrap">
                                                                    {
                                                                        note?.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                                                        لا توجد ملاحظات لهذا
                                                        الطالب بعد.
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}

                                {/*  */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default StudentEnrollments;
