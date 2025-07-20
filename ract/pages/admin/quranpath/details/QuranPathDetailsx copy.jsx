/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    Calendar,
    CircleDashed,
    Clock,
    Edit,
    Eye,
    EyeOff,
    File,
    FileText,
    GraduationCap,
    Layers,
    ListTodo,
    Loader2,
    Menu,
    Presentation,
    Users,
} from "lucide-react";

// api
import { publicGetQuranPathById } from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin } from "../../../../utils/constants";
import { formatDateAR, formatDuration } from "../../../../utils/helpers";

function QuranPathDetailsx() {
    const { quranpathId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [quranpathData, setQuranPathData] = useState(null);

    useEffect(() => {
        const fetchQuranPath = async () => {
            try {
                const { data, error } = await publicGetQuranPathById(
                    quranpathId
                );

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/quranpaths`);
                    setIsLoading(false);
                } else {
                    setQuranPathData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching section:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/quranpaths`);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuranPath();
    }, [quranpathId, navigate]);

    //
    const handleVisibilityChange = async (courseId, newVisibility) => {
        // try {
        //     const { data, error } = await publicUpdateCourseVisibility(
        //         courseId,
        //         newVisibility
        //     );
        //     if (error) {
        //         Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
        //     } else {
        //         setCourses(
        //             courses.map((course) =>
        //                 course.id === courseId
        //                     ? { ...course, is_visible: newVisibility }
        //                     : course
        //             )
        //         );
        //         Toast("success", "تم تحديث حالة الدورة بنجاح");
        //     }
        // } catch (error) {
        //     console.error("Error updating status:", error);
        //     Toast("error", "حدث خطأ أثناء تحديث الحالة");
        // }
    };

    // ========================================================
    const [selectedYear, setSelectedYear] = useState(
        quranpathData?.class_rooms[0]
    );
    const [selectedLevelId, setSelectedLevelId] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState("");

    const filteredClasses = quranpathData?.class_rooms?.filter((cls) => {
        console.log(`cls`, cls);

        if (cls.quran_path !== quranpathId) return false;

        if (quranpathId === "hifz" && cls.academicYear !== selectedYear)
            return false;

        if (quranpathId === "murajaa" && cls.levelId !== selectedLevelId)
            return false;

        return true;
    });

    // ========================================================
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    console.log(`quranpathData`, quranpathData);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-between items-center gap-2 mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    navigate(`/${App_Admin}/quranpaths`)
                                }
                                className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                            >
                                <ArrowRight size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800">
                                {quranpathData.title}
                            </h1>
                        </div>
                    </div>

                    <div>
                        {/* {addStudentModalOpen && (
                            <AddStudentToClassModal
                                onClose={() => setAddStudentModalOpen(false)}
                                onSave={onAddNewStudent}
                                trackId={trackId}
                                classes={filteredClasses}
                            />
                        )} */}

                        {/* {modalState.isOpen && (
                            <ClassFormModal
                                onClose={() =>
                                    setModalState({
                                        isOpen: false,
                                        mode: null,
                                        data: null,
                                    })
                                }
                                onSave={handleSaveClass}
                                classData={modalState.data}
                                academicYears={data.academicYears}
                                track={track}
                                selectedYear={selectedYear}
                                selectedLevelId={selectedLevelId}
                            />
                        )} */}

                        {/* {zoomModalState.isOpen && (
                            <ZoomMeetingFormModal
                                onClose={() =>
                                    setZoomModalState({
                                        isOpen: false,
                                        data: null,
                                    })
                                }
                                onSave={(item) =>
                                    handleSaveItem("zoomMeetings", item, () =>
                                        setZoomModalState({
                                            isOpen: false,
                                            data: null,
                                        })
                                    )
                                }
                                meetingData={zoomModalState.meetingData}
                            />
                        )} */}

                        {/* {wirdModalState.isOpen && (
                            <QuranWirdFormModal
                                onClose={() =>
                                    setWirdModalState({
                                        isOpen: false,
                                        data: null,
                                    })
                                }
                                onSave={(item) =>
                                    handleSaveItem(
                                        "quranRecitations",
                                        item,
                                        () =>
                                            setWirdModalState({
                                                isOpen: false,
                                                data: null,
                                            })
                                    )
                                }
                                wirdData={wirdModalState.wirdData}
                            />
                        )} */}

                        {/* {examModalState.isOpen && (
                            <ExamFormModal
                                onClose={() =>
                                    setExamModalState({
                                        isOpen: false,
                                        data: null,
                                    })
                                }
                                onSave={(item) =>
                                    handleSaveItem("exams", item, () =>
                                        setExamModalState({
                                            isOpen: false,
                                            data: null,
                                        })
                                    )
                                }
                                examData={examModalState.examData}
                            />
                        )} */}

                        {/* {attendanceModalState.isOpen && (
                            <AttendanceFormModal
                                onClose={() =>
                                    setAttendanceModalState({
                                        isOpen: false,
                                        data: null,
                                    })
                                }
                                onSave={(item) =>
                                    handleSaveItem("attendanceLog", item, () =>
                                        setAttendanceModalState({
                                            isOpen: false,
                                            data: null,
                                        })
                                    )
                                }
                                sessionData={attendanceModalState.sessionData}
                            />
                        )} */}

                        {/* {fileModalState.isOpen && (
                            <FileFormModal
                                onClose={() =>
                                    setFileModalState({
                                        isOpen: false,
                                        data: null,
                                    })
                                }
                                onSave={(item) =>
                                    handleSaveItem("classFiles", item, () =>
                                        setFileModalState({
                                            isOpen: false,
                                            data: null,
                                        })
                                    )
                                }
                                fileData={fileModalState.data}
                            />
                        )} */}

                        {/* {statsModalOpen && selectedClass && (
                            <ClassStatisticsModal
                                onClose={() => setStatsModalOpen(false)}
                                classData={selectedClass}
                                allStudents={data.students}
                                grades={data.grades}
                            />
                        )} */}

                        {/* <ConfirmationModal
                            isOpen={showConfirmModal}
                            message={`هل أنت متأكد من حذف هذا العنصر؟`}
                            onConfirm={confirmDeleteItem}
                            onCancel={() => setShowConfirmModal(false)}
                        /> */}

                        {/* <div className="flex flex-wrap items-center gap-5 mb-8">
                            <div
                                className={`w-16 h-16 rounded-lg flex items-center justify-center text-white ${
                                    track.color === "green"
                                        ? "bg-green-600"
                                        : track.color === "blue"
                                        ? "bg-blue-600"
                                        : "bg-purple-600"
                                }`}
                            >
                                {track.icon}
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    {track.name}
                                </h1>
                                <p className="text-slate-600">
                                    {track.description}
                                </p>
                            </div>

                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 mr-auto"
                                onClick={() => setAddStudentModalOpen(true)}
                            >
                                <UserSquare size={18} />
                                إضافة طالب للفصل
                            </button>
                        </div> */}

                        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
                            <div className="flex flex-col  gap-5">
                                {quranpathData?.name === "save" && (
                                    <div className="flex-1">
                                        <label
                                            htmlFor="year-select"
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <GraduationCap
                                                size={18}
                                                className="text-slate-600"
                                            />
                                            <span>
                                                السَّنَةُ الدِّرَاسِيَّةُ:
                                            </span>
                                        </label>

                                        <select
                                            id="year-select"
                                            className="w-full p-2 border border-slate-300 rounded-lg"
                                            value={selectedYear}
                                            onChange={(e) =>
                                                setSelectedYear(e.target.value)
                                            }
                                        >
                                            {quranpathData?.class_rooms.map(
                                                (classroom, index) => (
                                                    <option
                                                        key={index}
                                                        value={classroom?.title}
                                                    >
                                                        {classroom?.title}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                )}

                                {quranpathData?.name === "review" &&
                                    quranpathData?.review_levels && (
                                        <div className="flex-1">
                                            <label
                                                htmlFor="level-select"
                                                className="flex items-center gap-2 mb-2"
                                            >
                                                <Layers
                                                    size={18}
                                                    className="text-slate-600"
                                                />
                                                <span>المستوى:</span>
                                            </label>
                                            <select
                                                id="level-select"
                                                className="w-full p-2 border border-slate-300 rounded-lg"
                                                value={selectedLevelId || ""}
                                                onChange={(e) =>
                                                    setSelectedLevelId(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {quranpathData?.review_levels?.map(
                                                    (level, index) => (
                                                        <option
                                                            key={index}
                                                            value={level?.title}
                                                        >
                                                            {level?.title}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    )}

                                <div className="flex-1">
                                    <label
                                        htmlFor="class-select"
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <BookOpen
                                            size={18}
                                            className="text-slate-600"
                                        />
                                        <span>الفَصْلُ:</span>
                                    </label>

                                    <div className="flex gap-2">
                                        <select
                                            id="class-select"
                                            className="flex-1 p-2 border border-slate-300 rounded-lg"
                                            value={selectedClassId || ""}
                                            onChange={(e) =>
                                                setSelectedClassId(
                                                    e.target.value
                                                )
                                            }
                                            disabled={
                                                filteredClasses?.length === 0
                                            }
                                        >
                                            {filteredClasses?.length > 0 ? (
                                                filteredClasses?.map((cls) => (
                                                    <option
                                                        key={cls.id}
                                                        value={cls.id}
                                                    >
                                                        {cls.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>
                                                    لا تُوجَدُ فُصُولٌ في هذا
                                                    المستوى
                                                </option>
                                            )}
                                        </select>

                                        {/* <button
                                            className="px-3 py-2 bg-slate-100 text-slate-800 rounded-lg"
                                            onClick={() =>
                                                openClassModal(
                                                    "edit",
                                                    selectedClass
                                                )
                                            }
                                            disabled={!selectedClass}
                                        >
                                            <Edit size={16} />
                                            تَعْدِيلٌ
                                        </button> */}

                                        {/* <button
                                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                                            onClick={() =>
                                                handleDeleteItem({
                                                    type: "classes",
                                                    item: selectedClass,
                                                })
                                            }
                                            disabled={!selectedClass}
                                        >
                                            <Trash size={16} />
                                        </button> */}

                                        {/* <button
                                            className="px-3 py-2 bg-green-600 text-white rounded-lg"
                                            onClick={() =>
                                                openClassModal("add")
                                            }
                                        >
                                            <Plus size={16} />
                                            إِضَافَةٌ
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {selectedClass ? (
                                <>
                                    <ClassSummaryCard
                                        classData={selectedClass}
                                        onShowStats={() =>
                                            setStatsModalOpen(true)
                                        }
                                    />
                                    <StudentManagementCard
                                        selectedClass={selectedClass}
                                        allStudents={data.students}
                                        grades={data.grades}
                                        onUpdateGrade={onUpdateGrade}
                                        onUpdateAttendance={onUpdateAttendance}
                                        onUpdateCertificate={
                                            onUpdateCertificate
                                        }
                                        onUpdateNote={onUpdateNote}
                                    />
                                    <ZoomMeetingsCard
                                        meetings={
                                            selectedClass.zoomMeetings || []
                                        }
                                        openZoomModal={(item) =>
                                            setZoomModalState({
                                                isOpen: true,
                                                meetingData: item,
                                            })
                                        }
                                        onDeleteMeeting={(item) =>
                                            handleDeleteItem({
                                                type: "zoomMeetings",
                                                item,
                                                name: item.title,
                                            })
                                        }
                                    />
                                    <AttendanceTrackerCard
                                        attendanceLog={
                                            selectedClass.attendanceLog || []
                                        }
                                        openAttendanceModal={(item) =>
                                            setAttendanceModalState({
                                                isOpen: true,
                                                sessionData: item,
                                            })
                                        }
                                        onDeleteAttendance={(item) =>
                                            handleDeleteItem({
                                                type: "attendanceLog",
                                                item,
                                                name: `جلسة يوم ${item.date}`,
                                            })
                                        }
                                    />
                                    <QuranWirdTrackerCard
                                        recitations={
                                            selectedClass.quranRecitations || []
                                        }
                                        openWirdModal={(item) =>
                                            setWirdModalState({
                                                isOpen: true,
                                                wirdData: item,
                                            })
                                        }
                                        onDeleteWird={(item) =>
                                            handleDeleteItem({
                                                type: "quranRecitations",
                                                item,
                                                name: `ورد يوم ${item.date}`,
                                            })
                                        }
                                    />
                                    <ExamsTrackerCard
                                        exams={selectedClass.exams || []}
                                        openExamModal={(item) =>
                                            setExamModalState({
                                                isOpen: true,
                                                examData: item,
                                            })
                                        }
                                        onDeleteExam={(item) =>
                                            handleDeleteItem({
                                                type: "exams",
                                                item,
                                                name: item.curriculum,
                                            })
                                        }
                                    />
                                    <ClassFilesCard
                                        files={selectedClass.classFiles || []}
                                        openFileModal={(item) =>
                                            setFileModalState({
                                                isOpen: true,
                                                data: item,
                                            })
                                        }
                                        onDeleteFile={(item) =>
                                            handleDeleteItem({
                                                type: "classFiles",
                                                item,
                                                name: item.name,
                                            })
                                        }
                                    />
                                </>
                            ) : (
                                <div className="col-span-2 py-10 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl">
                                    الرَّجاءُ اِخْتِيَارُ فَصْلٍ لِعَرْضِ
                                    تَفَاصِيلِهِ، أو إِضَافَةُ فَصْلٍ جَدِيدٍ.
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuranPathDetailsx;
