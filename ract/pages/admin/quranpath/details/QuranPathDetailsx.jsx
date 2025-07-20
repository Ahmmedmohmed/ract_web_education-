/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
    Users,
    BookOpen,
    ChevronDown,
    TrendingUp,
    CheckCircle,
    Award,
    User,
    ArrowRight,
    Plus,
    Save,
    X,
    Image as ImageIcon,
    Hash,
    Clock,
    Landmark,
    Tag,
    Edit,
    GraduationCap,
    Link as LinkIcon,
    CalendarDays,
    BookText,
    Trash,
    Repeat,
    FileText,
    UserSquare,
    Download,
    Upload,
    UserCheck,
    UserX,
    Mail,
    MessageSquare,
    BarChart,
    AlertTriangle,
    Star,
    Layers,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { publicGetQuranPathById } from "../../../../api/public/authPublic";
import Toast from "../../../../plugin/Toast";
import { App_Admin } from "../../../../utils/constants";

// --- HELPER FUNCTIONS ---
const getRatingFromGrade = (grade) => {
    if (grade === null || grade === undefined) return null;
    if (grade === 0) return "غياب";
    if (grade >= 90) return "ممتاز";
    if (grade >= 80) return "جيد جدًا";
    if (grade >= 70) return "جيد";
    if (grade >= 60) return "مقبول";
    if (grade >= 50) return "ضعيف";
    return "ضعيف جدًا";
};

const getRatingClass = (rating) => {
    switch (rating) {
        case "ممتاز":
            return "bg-green-100 text-green-800";
        case "جيد جدًا":
            return "bg-blue-100 text-blue-800";
        case "جيد":
            return "bg-teal-100 text-teal-800";
        case "مقبول":
            return "bg-yellow-100 text-yellow-800";
        case "ضعيف":
            return "bg-orange-100 text-orange-800";
        case "ضعيف جدًا":
            return "bg-red-100 text-red-800";
        case "غياب":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getAttendanceClass = (status) => {
    switch (status) {
        case "early":
            return "bg-green-100 text-green-800";
        case "late":
            return "bg-yellow-100 text-yellow-800";
        case "absent":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

// --- DATA STRUCTURE SIMULATION ---
const initialData = {
    tracks: {
        hifz: {
            name: "مسار الحفظ",
            description:
                "خُطَّةٌ مُتكَامِلَةٌ لِخَتْمِ القُرْآنِ حِفْظًا وفَهْمًا.",
            icon: <TrendingUp />,
            color: "green",
        },
        murajaa: {
            name: "مسار المراجعة والتثبيت",
            description:
                "بَرْنَامَجٌ مُكَثَّفٌ لِمَنْ خَتَمَ القُرْآنَ ويُرِيدُ تَثْبِيتَ حِفْظِهِ.",
            icon: <CheckCircle />,
            color: "blue",
            levels: {
                level1: { name: "المستوى الأول" },
                level2: { name: "المستوى الثاني" },
                level3: { name: "المستوى الثالث" },
            },
        },
        ijaza: {
            name: "مسار الإجازة",
            description:
                "لِلْحُفَّاظِ المُتْقِنِينَ السَّاعِينَ لِنَيْلِ الإِجَازَةِ بِسَنَدٍ مُتَّصِلٍ.",
            icon: <Award />,
            color: "purple",
        },
    },
    academicYears: [
        "الصف التمهيدي",
        "الصف الأول",
        "الصف الثاني",
        "الصف الثالث",
        "الصف الرابع",
        "الصف الخامس",
        "الصف السادس",
    ],
    classes: {
        "class-1": {
            id: "class-1",
            name: "فصل الناصر صلاح الدين",
            track: "hifz",
            academicYear: "الصف التمهيدي",
            studentIds: ["student-1", "student-2"],
            maxStudents: 8,
            quranCirclesSchedule: "السبت والثلاثاء 10ص",
            quranLecturesSchedule: "والثلاثاء 11ص",
            imageUrl: "https://placehold.co/600x400/054a29/ffffff?text=فصل",
            type: "ذكور",
            quranCurriculum: "حفظ جزء عم",
            quranScienceCurriculum: "التجويد وأحكام النون الساكنة",
            attendanceLog: [
                { id: "att-1", date: "2025-06-25", type: "حلقة قرآن" },
                { id: "att-2", date: "2025-06-27", type: "محاضرة علوم قرآن" },
                { id: "att-3", date: "2025-06-29", type: "حلقة قرآن" },
            ],
            zoomMeetings: [
                {
                    id: "zoom-1",
                    title: "حلقة مراجعة سورة البقرة",
                    details: "مراجعة جماعية للربع الأول من سورة البقرة",
                    link: "https://zoom.us/j/1234567890?pwd=test",
                    scheduleTime: "2025-06-29T23:55:00",
                },
                {
                    id: "zoom-2",
                    title: "محاضرة في أحكام التجويد",
                    details: "شرح أحكام الإدغام والقلب",
                    link: "https://zoom.us/j/0987654321?pwd=test",
                    scheduleTime: "2025-07-01T10:00:00",
                },
            ],
            quranRecitations: [
                {
                    id: "rec-1",
                    date: "2025-06-25",
                    pastWird: "جزء عم",
                    currentWird: "جزء تبارك",
                },
                {
                    id: "rec-2",
                    date: "2025-06-27",
                    pastWird: "جزء تبارك",
                    currentWird: "جزء قد سمع",
                },
            ],
            exams: [
                {
                    id: "exam-1",
                    date: "2025-07-15",
                    curriculum: "امتحان في جزء عم كاملاً",
                    status: "لم يبدأ",
                    type: "شهري",
                },
                {
                    id: "exam-2",
                    date: "2025-06-20",
                    curriculum: "امتحان في أحكام النون الساكنة",
                    status: "مكتمل",
                    type: "نصف سنوي",
                },
            ],
            classFiles: [
                {
                    id: "file-1",
                    name: "كتاب التجويد المصور",
                    description:
                        "نسخة PDF من كتاب التجويد المصور للدكتور أيمن سويد.",
                    fileUrl: "#",
                    fileName: "tajweed_ayman_suwaid.pdf",
                },
            ],
        },
        "class-2": {
            id: "class-2",
            name: "فصل روضة الإيمان",
            track: "murajaa",
            levelId: "level1",
            studentIds: ["student-4"],
            maxStudents: 8,
            quranCirclesSchedule: "الأحد والأربعاء 5م",
            quranLecturesSchedule: "",
            imageUrl: "https://placehold.co/600x400/4f46e5/ffffff?text=فصل",
            type: "إناث",
            quranCurriculum: "مراجعة 5 أجزاء",
            quranScienceCurriculum: "",
            zoomMeetings: [],
            quranRecitations: [],
            exams: [],
            attendanceLog: [],
            classFiles: [],
        },
        "class-3": {
            id: "class-3",
            name: "فصل أهل القرآن (إجازة)",
            track: "ijaza",
            studentIds: ["student-3", "student-5"],
            maxStudents: 5,
            quranCirclesSchedule: "حسب الاتفاق",
            quranLecturesSchedule: "",
            imageUrl: "https://placehold.co/600x400/8b5cf6/ffffff?text=إجازة",
            type: "مختلط",
            quranCurriculum: "إقراء القرآن كاملاً",
            quranScienceCurriculum: "دراسة متن الشاطبية",
            zoomMeetings: [],
            quranRecitations: [],
            exams: [],
            attendanceLog: [],
            classFiles: [],
        },
        "class-4": {
            id: "class-4",
            name: "فصل الأترجة",
            track: "hifz",
            academicYear: "الصف الأول",
            studentIds: [],
            maxStudents: 10,
            quranCirclesSchedule: "الإثنين والخميس 8ص",
            quranLecturesSchedule: "",
            imageUrl: "https://placehold.co/600x400/2a9d8f/ffffff?text=فصل",
            type: "إناث",
            quranCurriculum: "",
            quranScienceCurriculum: "",
            zoomMeetings: [],
            quranRecitations: [],
            exams: [],
            attendanceLog: [],
            classFiles: [],
        },
    },
    students: {
        "student-1": {
            id: "student-1",
            name: "عبدالله بن محمد الأزهري",
            email: "abdullah@example.com",
            age: 15,
            country: "مصر",
            track: "hifz",
        },
        "student-2": {
            id: "student-2",
            name: "فاطمة بنت علي المغربي",
            email: "fatima@example.com",
            age: 14,
            country: "المغرب",
            track: "hifz",
        },
        "student-3": {
            id: "student-3",
            name: "يوسف بن خالد الشامي",
            email: "yusuf@example.com",
            age: 22,
            country: "سوريا",
            track: "ijaza",
        },
        "student-4": {
            id: "student-4",
            name: "خديجة بنت أحمد المدني",
            email: "khadija@example.com",
            age: 20,
            country: "السعودية",
            track: "murajaa",
        },
        "student-5": {
            id: "student-5",
            name: "أنس بن مالك العراقي",
            email: "anas@example.com",
            age: 25,
            country: "العراق",
            track: "ijaza",
        },
    },
    grades: {
        "student-1": {
            recitations: {
                "rec-1": { pastGrade: 95, currentGrade: 92 },
                "rec-2": { pastGrade: 88, currentGrade: 90 },
            },
            exams: { "exam-2": { grade: 98 } },
            certificates: [
                {
                    id: "cert-1654209841029",
                    title: "شهادة إتمام جزء عم",
                    reason: "لإتمامه حفظ جزء عم بتفوق وإتقان.",
                    fileUrl: "#",
                    fileName: "sample.pdf",
                },
            ],
            attendance: {
                "att-1": "early",
                "att-2": "late",
                "att-3": "absent",
            },
            teacherNotes: [
                {
                    id: "note-1",
                    date: "2025-06-28",
                    text: "يُظهر الطالب تقدماً ملحوظاً في أحكام التجويد، لكنه يحتاج إلى مزيد من التركيز على المراجعة اليومية.",
                },
            ],
        },
        "student-2": {
            recitations: { "rec-1": { pastGrade: 98, currentGrade: 99 } },
            exams: {},
            certificates: [],
            attendance: {},
            teacherNotes: [],
        },
        "student-3": {
            recitations: {},
            exams: {},
            certificates: [],
            attendance: {},
            teacherNotes: [],
        },
        "student-4": {
            recitations: {},
            exams: {},
            certificates: [],
            attendance: {},
            teacherNotes: [],
        },
        "student-5": {
            recitations: {},
            exams: {},
            certificates: [],
            attendance: {},
            teacherNotes: [],
        },
    },
};

// --- Modal Component ---
const Modal = ({ children, onClose, title, size = "md" }) => {
    const modalRef = useRef();
    const handleBackdropClick = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };
    const sizeClass = {
        md: "max-w-2xl",
        lg: "max-w-4xl",
    }[size];

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-slate-900/70 flex items-center justify-center p-5 z-50"
        >
            <div
                className={`bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh] w-full ${sizeClass}`}
            >
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

// --- Confirmation Modal Component ---
const ConfirmationModal = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
    confirmButtonText = "تَأْكِيدٌ",
    cancelButtonText = "إِلْغَاءٌ",
}) => {
    return isOpen ? (
        <Modal onClose={onCancel} title="تَأْكِيدُ الحَذْفِ">
            <div className="flex flex-col items-center gap-5 p-5 text-center">
                <Trash size={48} className="text-red-500" />
                <p className="text-slate-700">{message}</p>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                    onClick={onConfirm}
                >
                    {confirmButtonText}
                </button>
                <button
                    className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg"
                    onClick={onCancel}
                >
                    {cancelButtonText}
                </button>
            </div>
        </Modal>
    ) : null;
};

// --- Add Student To Class Modal ---
const AddStudentToClassModal = ({ onClose, onSave, trackId, classes }) => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: "",
        country: "",
    });
    const [selectedClassId, setSelectedClassId] = useState("");

    useEffect(() => {
        if (classes.length > 0) {
            const firstAvailableClass = classes.find(
                (c) => c.studentIds.length < c.maxStudents
            );
            if (firstAvailableClass) {
                setSelectedClassId(firstAvailableClass.id);
            }
        }
    }, [classes]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (
            !student.name ||
            !student.email ||
            !student.age ||
            !student.country ||
            !selectedClassId
        ) {
            alert("الرجاء تعبئة جميع الحقول واختيار فصل.");
            return;
        }
        const studentDataWithTrack = { ...student, track: trackId };
        onSave(studentDataWithTrack, selectedClassId);
        onClose();
    };

    return (
        <Modal onClose={onClose} title="إضافة طالب جديد إلى فصل">
            <div className="mb-5">
                <label
                    htmlFor="student-name"
                    className="block font-medium text-slate-700 mb-2"
                >
                    الاسم الكامل
                </label>
                <input
                    id="student-name"
                    name="name"
                    type="text"
                    value={student.name}
                    onChange={handleInputChange}
                    placeholder="مثال: عبد الرحمن بن أحمد"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="student-email"
                    className="block font-medium text-slate-700 mb-2"
                >
                    البريد الإلكتروني
                </label>
                <input
                    id="student-email"
                    name="email"
                    type="email"
                    value={student.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <label
                        htmlFor="student-age"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        العمر
                    </label>
                    <input
                        id="student-age"
                        name="age"
                        type="number"
                        value={student.age}
                        onChange={handleInputChange}
                        placeholder="15"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    />
                </div>
                <div>
                    <label
                        htmlFor="student-country"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        البلد
                    </label>
                    <input
                        id="student-country"
                        name="country"
                        type="text"
                        value={student.country}
                        onChange={handleInputChange}
                        placeholder="مثال: مصر"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="class-select-add"
                    className="block font-medium text-slate-700 mb-2"
                >
                    اختر الفصل
                </label>
                <select
                    id="class-select-add"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                >
                    <option value="" disabled>
                        -- اختر فصلاً --
                    </option>
                    {classes.map((cls) => {
                        const isFull = cls.studentIds.length >= cls.maxStudents;
                        return (
                            <option
                                key={cls.id}
                                value={cls.id}
                                disabled={isFull}
                            >
                                {cls.name} ({cls.studentIds.length}/
                                {cls.maxStudents}) {isFull ? "(ممتلئ)" : ""}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <UserSquare size={18} />
                إضافة الطالب للفصل
            </button>
        </Modal>
    );
};

// --- Class Form Modal ---
const ClassFormModal = ({
    onClose,
    onSave,
    classData = {},
    academicYears,
    track,
    selectedYear,
    selectedLevelId,
}) => {
    const [cls, setCls] = useState({
        name: "",
        maxStudents: 8,
        quranCirclesSchedule: "",
        quranLecturesSchedule: "",
        imageUrl: "",
        type: "ذكور",
        academicYear: track?.id === "hifz" ? selectedYear : "",
        levelId: track?.id === "murajaa" ? selectedLevelId : "",
        quranCurriculum: "",
        quranScienceCurriculum: "",
        ...classData,
    });
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCls((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCls((prev) => ({ ...prev, imageUrl: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!cls.name) {
            alert("الرجاء إدخال اسم الفصل.");
            return;
        }
        onSave(cls);
    };

    return (
        <Modal
            onClose={onClose}
            title={classData.id ? "تعديل الفصل" : "إضافة فصل جديد"}
        >
            <div className="mb-4">
                <label
                    htmlFor="class-name"
                    className="block font-medium text-slate-700 mb-2"
                >
                    اسم الفصل
                </label>
                <input
                    id="class-name"
                    name="name"
                    type="text"
                    value={cls.name}
                    onChange={handleInputChange}
                    placeholder="مثال: فصل الأبرار"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            {track?.id === "hifz" && (
                <div className="mb-4">
                    <label
                        htmlFor="academic-year"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        السنة الدراسية
                    </label>
                    <select
                        id="academic-year"
                        name="academicYear"
                        value={cls.academicYear}
                        onChange={handleInputChange}
                        disabled
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-100"
                    >
                        {academicYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {track?.id === "murajaa" && (
                <div className="mb-4">
                    <label
                        htmlFor="level-select-form"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        المستوى
                    </label>
                    <select
                        id="level-select-form"
                        name="levelId"
                        value={cls.levelId}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                        {Object.entries(track?.levels).map(([id, level]) => (
                            <option key={id} value={id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="class-type"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        نوع الفصل
                    </label>
                    <select
                        id="class-type"
                        name="type"
                        value={cls.type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                        <option value="ذكور">ذكور</option>
                        <option value="إناث">إناث</option>
                        <option value="مختلط">مختلط</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="class-max-students"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        الحد الأقصى للطلاب
                    </label>
                    <input
                        id="class-max-students"
                        name="maxStudents"
                        type="number"
                        value={cls.maxStudents}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium text-slate-700 mb-2">
                    صورة الفصل
                </label>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="p-2 border border-dashed border-slate-300 rounded-lg flex items-center gap-2 bg-slate-50"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <Upload size={18} />
                        <span>رفع صورة</span>
                    </button>
                    <span className="text-slate-500">أو</span>
                    <input
                        name="imageUrl"
                        type="text"
                        value={cls.imageUrl}
                        onChange={handleInputChange}
                        placeholder="أدخل رابط الصورة"
                        className="flex-1 p-2 border border-slate-300 rounded-lg"
                    />
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="class-schedule"
                    className="block font-medium text-slate-700 mb-2"
                >
                    مواعيد حلقات القرآن
                </label>
                <input
                    id="class-schedule"
                    name="quranCirclesSchedule"
                    type="text"
                    value={cls.quranCirclesSchedule}
                    onChange={handleInputChange}
                    placeholder="مثال: السبت والثلاثاء 10ص"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="class-lecture-schedule"
                    className="block font-medium text-slate-700 mb-2"
                >
                    مواعيد محاضرات علوم القرآن
                </label>
                <input
                    id="class-lecture-schedule"
                    name="quranLecturesSchedule"
                    type="text"
                    value={cls.quranLecturesSchedule}
                    onChange={handleInputChange}
                    placeholder="مثال: الأحد 5م"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="class-quran-curriculum"
                    className="block font-medium text-slate-700 mb-2"
                >
                    منهج القرآن
                </label>
                <input
                    id="class-quran-curriculum"
                    name="quranCurriculum"
                    type="text"
                    value={cls.quranCurriculum}
                    onChange={handleInputChange}
                    placeholder="مثال: حفظ جزء تبارك"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="class-quran-science-curriculum"
                    className="block font-medium text-slate-700 mb-2"
                >
                    منهج علوم القرآن
                </label>
                <input
                    id="class-quran-science-curriculum"
                    name="quranScienceCurriculum"
                    type="text"
                    value={cls.quranScienceCurriculum}
                    onChange={handleInputChange}
                    placeholder="مثال: أحكام المدود"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} /> حفظ الفصل
            </button>
        </Modal>
    );
};

// --- Certificate Form Modal ---
const CertificateFormModal = ({ onClose, onSave, certificateData = null }) => {
    const [certificate, setCertificate] = useState({
        title: "",
        reason: "",
        fileUrl: null,
        fileName: "",
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (certificateData) {
            setCertificate(certificateData);
        }
    }, [certificateData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCertificate((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCertificate((prev) => ({
                    ...prev,
                    fileUrl: event.target.result,
                    fileName: file.name,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!certificate.title || !certificate.reason || !certificate.fileUrl) {
            alert("الرجاء تعبئة جميع الحقول ورفع ملف الشهادة.");
            return;
        }
        onSave(certificate);
        onClose();
    };

    return (
        <Modal
            onClose={onClose}
            title={certificateData ? "تعديل شهادة" : "إضافة شهادة جديدة"}
        >
            <div className="mb-4">
                <label
                    htmlFor="cert-title"
                    className="block font-medium text-slate-700 mb-2"
                >
                    عنوان الشهادة
                </label>
                <input
                    id="cert-title"
                    name="title"
                    type="text"
                    value={certificate.title}
                    onChange={handleInputChange}
                    placeholder="مثال: شهادة إتمام المستوى الأول"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="cert-reason"
                    className="block font-medium text-slate-700 mb-2"
                >
                    السبب والتفاصيل
                </label>
                <textarea
                    id="cert-reason"
                    name="reason"
                    value={certificate.reason}
                    onChange={handleInputChange}
                    placeholder="لأدائه المتميز والتزامه..."
                    rows="3"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block font-medium text-slate-700 mb-2">
                    ملف الشهادة (PDF/Image)
                </label>
                <button
                    type="button"
                    className="w-full p-3 border border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 bg-slate-50"
                    onClick={() => fileInputRef.current.click()}
                >
                    <Upload size={18} />
                    <span>{certificate.fileName || "رفع ملف"}</span>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {certificate.fileUrl &&
                certificate.fileUrl.startsWith("data:image") && (
                    <img
                        src={certificate.fileUrl}
                        alt="معاينة"
                        className="w-full rounded-lg mb-4"
                    />
                )}
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} />
                حفظ الشهادة
            </button>
        </Modal>
    );
};

// --- Zoom Meeting Form Modal ---
const ZoomMeetingFormModal = ({ onClose, onSave, meetingData }) => {
    const [meeting, setMeeting] = useState({
        title: "",
        details: "",
        link: "",
        scheduleTime: "",
    });

    useEffect(() => {
        if (meetingData) {
            const formattedTime = meetingData.scheduleTime
                ? new Date(meetingData.scheduleTime).toISOString().slice(0, 16)
                : "";
            setMeeting({ ...meetingData, scheduleTime: formattedTime });
        }
    }, [meetingData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeeting((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!meeting.title || !meeting.link || !meeting.scheduleTime) {
            alert("يرجى ملء العنوان والرابط والوقت.");
            return;
        }
        onSave({
            ...meeting,
            scheduleTime: new Date(meeting.scheduleTime).toISOString(),
        });
    };

    return (
        <Modal
            onClose={onClose}
            title={meetingData ? "تعديل موعد" : "إضافة موعد زوم جديد"}
        >
            <div className="mb-4">
                <label
                    htmlFor="zoom-title"
                    className="block font-medium text-slate-700 mb-2"
                >
                    عنوان الجلسة
                </label>
                <input
                    id="zoom-title"
                    name="title"
                    type="text"
                    value={meeting.title}
                    onChange={handleInputChange}
                    placeholder="مثال: حلقة مراجعة"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="zoom-details"
                    className="block font-medium text-slate-700 mb-2"
                >
                    التفاصيل
                </label>
                <textarea
                    id="zoom-details"
                    name="details"
                    value={meeting.details}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="تفاصيل إضافية عن الجلسة"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                ></textarea>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="zoom-link"
                    className="block font-medium text-slate-700 mb-2"
                >
                    رابط زوم
                </label>
                <input
                    id="zoom-link"
                    name="link"
                    type="url"
                    value={meeting.link}
                    onChange={handleInputChange}
                    placeholder="https://zoom.us/..."
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="zoom-time"
                    className="block font-medium text-slate-700 mb-2"
                >
                    الوقت والتاريخ
                </label>
                <input
                    id="zoom-time"
                    name="scheduleTime"
                    type="datetime-local"
                    value={meeting.scheduleTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} /> حفظ الموعد
            </button>
        </Modal>
    );
};

// --- Quran Wird Form Modal ---
const QuranWirdFormModal = ({ onClose, onSave, wirdData }) => {
    const [wird, setWird] = useState({
        date: new Date().toISOString().split("T")[0],
        currentWird: "",
        pastWird: "",
    });

    useEffect(() => {
        if (wirdData) setWird(wirdData);
    }, [wirdData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWird((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!wird.date || !wird.currentWird || !wird.pastWird) {
            alert("يرجى ملء جميع الحقول.");
            return;
        }
        onSave(wird);
    };

    return (
        <Modal
            onClose={onClose}
            title={wirdData ? "تعديل الورد" : "إضافة ورد جديد"}
        >
            <div className="mb-4">
                <label
                    htmlFor="wird-date"
                    className="block font-medium text-slate-700 mb-2"
                >
                    التاريخ
                </label>
                <input
                    id="wird-date"
                    name="date"
                    type="date"
                    value={wird.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="wird-current"
                    className="block font-medium text-slate-700 mb-2"
                >
                    الورد الحاضر
                </label>
                <input
                    id="wird-current"
                    name="currentWird"
                    type="text"
                    value={wird.currentWird}
                    onChange={handleInputChange}
                    placeholder="مثال: جزء تبارك"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="wird-past"
                    className="block font-medium text-slate-700 mb-2"
                >
                    الورد الماضي
                </label>
                <input
                    id="wird-past"
                    name="pastWird"
                    type="text"
                    value={wird.pastWird}
                    onChange={handleInputChange}
                    placeholder="مثال: جزء عم"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} /> حفظ الورد
            </button>
        </Modal>
    );
};

// --- Exam Form Modal ---
const ExamFormModal = ({ onClose, onSave, examData }) => {
    const [exam, setExam] = useState({
        date: new Date().toISOString().split("T")[0],
        curriculum: "",
        type: "شهري",
        status: "لم يبدأ",
    });

    useEffect(() => {
        if (examData) setExam(examData);
    }, [examData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExam((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!exam.date || !exam.curriculum) {
            alert("يرجى ملء التاريخ والمنهج.");
            return;
        }
        onSave(exam);
    };

    return (
        <Modal
            onClose={onClose}
            title={examData ? "تعديل الاختبار" : "إضافة اختبار جديد"}
        >
            <div className="mb-4">
                <label
                    htmlFor="exam-date"
                    className="block font-medium text-slate-700 mb-2"
                >
                    التاريخ
                </label>
                <input
                    id="exam-date"
                    name="date"
                    type="date"
                    value={exam.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="exam-curriculum"
                    className="block font-medium text-slate-700 mb-2"
                >
                    منهج الاختبار
                </label>
                <input
                    id="exam-curriculum"
                    name="curriculum"
                    type="text"
                    value={exam.curriculum}
                    onChange={handleInputChange}
                    placeholder="مثال: امتحان في جزء عم"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="exam-type"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        النوع
                    </label>
                    <select
                        id="exam-type"
                        name="type"
                        value={exam.type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                        <option value="شهري">شهري</option>
                        <option value="نصف سنوي">نصف سنوي</option>
                        <option value="نهائي">نهائي</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="exam-status"
                        className="block font-medium text-slate-700 mb-2"
                    >
                        الحالة
                    </label>
                    <select
                        id="exam-status"
                        name="status"
                        value={exam.status}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                        <option value="لم يبدأ">لم يبدأ</option>
                        <option value="مكتمل">مكتمل</option>
                    </select>
                </div>
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} /> حفظ الاختبار
            </button>
        </Modal>
    );
};

// --- Attendance Form Modal ---
const AttendanceFormModal = ({ onClose, onSave, sessionData }) => {
    const [session, setSession] = useState({
        date: new Date().toISOString().split("T")[0],
        type: "حلقة قرآن",
    });

    useEffect(() => {
        if (sessionData) setSession(sessionData);
    }, [sessionData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSession((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!session.date || !session.type) {
            alert("يرجى ملء جميع الحقول.");
            return;
        }
        onSave(session);
    };

    return (
        <Modal
            onClose={onClose}
            title={sessionData ? "تعديل الجلسة" : "إضافة جلسة حضور جديدة"}
        >
            <div className="mb-4">
                <label
                    htmlFor="session-date"
                    className="block font-medium text-slate-700 mb-2"
                >
                    التاريخ
                </label>
                <input
                    id="session-date"
                    name="date"
                    type="date"
                    value={session.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="session-type"
                    className="block font-medium text-slate-700 mb-2"
                >
                    نوع الجلسة
                </label>
                <select
                    id="session-type"
                    name="type"
                    value={session.type}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg"
                >
                    <option value="حلقة قرآن">حلقة قرآن</option>
                    <option value="محاضرة علوم قرآن">محاضرة علوم قرآن</option>
                </select>
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} /> حفظ الجلسة
            </button>
        </Modal>
    );
};

// --- File Form Modal ---
const FileFormModal = ({ onClose, onSave, fileData = null }) => {
    const [file, setFile] = useState({
        name: "",
        description: "",
        fileUrl: null,
        fileName: "",
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileData) {
            setFile(fileData);
        }
    }, [fileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFile((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFile((prev) => ({
                    ...prev,
                    fileUrl: event.target.result,
                    fileName: uploadedFile.name,
                }));
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleSubmit = () => {
        if (!file.name || !file.fileUrl) {
            alert("الرجاء تعبئة اسم الملف ورفع الملف.");
            return;
        }
        onSave(file);
        onClose();
    };

    return (
        <Modal
            onClose={onClose}
            title={fileData ? "تعديل ملف" : "إضافة ملف جديد"}
        >
            <div className="mb-4">
                <label
                    htmlFor="file-name"
                    className="block font-medium text-slate-700 mb-2"
                >
                    اسم الملف
                </label>
                <input
                    id="file-name"
                    name="name"
                    type="text"
                    value={file.name}
                    onChange={handleInputChange}
                    placeholder="مثال: كتاب التجويد المصور"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="file-description"
                    className="block font-medium text-slate-700 mb-2"
                >
                    وصف الملف
                </label>
                <textarea
                    id="file-description"
                    name="description"
                    value={file.description}
                    onChange={handleInputChange}
                    placeholder="وصف موجز لمحتوى الملف..."
                    rows="3"
                    className="w-full p-3 border border-slate-300 rounded-lg"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block font-medium text-slate-700 mb-2">
                    الملف المرفق
                </label>
                <button
                    type="button"
                    className="w-full p-3 border border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 bg-slate-50"
                    onClick={() => fileInputRef.current.click()}
                >
                    <Upload size={18} />
                    <span>{file.fileName || "رفع ملف"}</span>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} />
                حفظ الملف
            </button>
        </Modal>
    );
};

// --- Teacher Note Form Modal ---
const NoteFormModal = ({ onClose, onSave, noteData = null }) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (noteData && noteData.text) {
            setText(noteData.text);
        }
    }, [noteData]);

    const handleSubmit = () => {
        if (!text.trim()) {
            alert("الرجاء كتابة الملاحظة.");
            return;
        }
        onSave({ ...noteData, text });
        onClose();
    };

    return (
        <Modal
            onClose={onClose}
            title={
                noteData && noteData.id
                    ? "تعديل الملاحظة"
                    : "إضافة ملاحظة جديدة"
            }
        >
            <div className="mb-4">
                <label
                    htmlFor="note-text"
                    className="block font-medium text-slate-700 mb-2"
                >
                    نص الملاحظة
                </label>
                <textarea
                    id="note-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="5"
                    placeholder="اكتب ملاحظاتك هنا لتظهر للطالب..."
                    className="w-full p-3 border border-slate-300 rounded-lg"
                ></textarea>
            </div>
            <button
                className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={handleSubmit}
            >
                <Save size={18} />
                حفظ الملاحظة
            </button>
        </Modal>
    );
};

// --- Class Summary Card Component ---
const ClassSummaryCard = ({ classData, onShowStats }) => {
    if (!classData) return null;
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-36 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                        src={classData.imageUrl}
                        alt={`صورة تعريفية لـ ${classData.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/150x150/e2e8f0/64748b?text=صورة";
                        }}
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-5">
                        {classData.name}
                    </h3>
                    <div className="mb-5 pb-5 border-b border-slate-200">
                        <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                            تَفَاصِيلُ الفَصْلِ
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Users size={16} className="text-indigo-600" />
                                <span>
                                    {classData.studentIds.length} /{" "}
                                    {classData.maxStudents} طَالِبٍ
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-800">
                                <Tag size={16} className="text-indigo-600" />
                                <span>فَصْلُ {classData.type}</span>
                            </div>
                        </div>
                    </div>

                    {(classData.quranCirclesSchedule ||
                        classData.quranLecturesSchedule) && (
                        <div className="mb-5 pb-5 border-b border-slate-200">
                            <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                                مَوَاعِيدُ الحَلَقَاتِ
                            </h4>
                            <div className="space-y-2">
                                {classData.quranCirclesSchedule && (
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <Clock
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                        <span>
                                            حَلَقَاتِ القُرْآنِ:{" "}
                                            {classData.quranCirclesSchedule}
                                        </span>
                                    </div>
                                )}
                                {classData.quranLecturesSchedule && (
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <Clock
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                        <span>
                                            مُحَاضَرَاتِ القُرْآنِ:{" "}
                                            {classData.quranLecturesSchedule}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {(classData.quranCurriculum ||
                        classData.quranScienceCurriculum) && (
                        <div>
                            <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                                المَنْهَجُ المُقَرَّرُ
                            </h4>
                            <div className="space-y-2">
                                {classData.quranCurriculum && (
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <BookOpen
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                        <span>
                                            مَنْهَجُ القُرْآنِ:{" "}
                                            {classData.quranCurriculum}
                                        </span>
                                    </div>
                                )}
                                {classData.quranScienceCurriculum && (
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <Landmark
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                        <span>
                                            عُلُومِ القُرْآنِ:{" "}
                                            {classData.quranScienceCurriculum}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-200">
                <button
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                    onClick={onShowStats}
                >
                    <BarChart size={16} />
                    عرض إحصائيات الفصل
                </button>
            </div>
        </div>
    );
};

// --- Zoom Meetings Card Component ---
const ZoomMeetingsCard = ({ meetings, openZoomModal, onDeleteMeeting }) => {
    const now = new Date();
    const upcomingMeetings = meetings
        .filter((meeting) => {
            const meetingTime = new Date(meeting.scheduleTime);
            return meetingTime >= now || now - meetingTime < 60 * 60 * 1000; // Show if upcoming or started in the last hour
        })
        .sort((a, b) => new Date(a.scheduleTime) - new Date(b.scheduleTime));

    return (
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
            <div className="flex justify-between items-center pb-5 mb-5 border-b border-blue-100">
                <h4 className="text-lg font-bold text-blue-700">
                    مَوْعِدُ الحَلَقَةِ القَادِمَةِ
                </h4>
                <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
                    onClick={() => openZoomModal()}
                >
                    <Plus size={16} />
                    إِضَافَةُ مَوْعِدٍ
                </button>
            </div>
            {upcomingMeetings && upcomingMeetings.length > 0 ? (
                <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => {
                        const meetingTime = new Date(meeting.scheduleTime);
                        const isLinkActive = now >= meetingTime;
                        return (
                            <div
                                key={meeting.id}
                                className="bg-white rounded-lg border border-slate-200 p-4"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h5 className="text-lg font-semibold text-slate-800">
                                        {meeting.title}
                                    </h5>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                openZoomModal(meeting)
                                            }
                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                            title="تعديل"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                onDeleteMeeting(meeting)
                                            }
                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                            title="حذف"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                </div>
                                <p className="flex items-center gap-2 text-slate-600 mb-4">
                                    <BookText size={16} />{" "}
                                    {meeting.details || "لا توجد تفاصيل."}
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                                        <CalendarDays size={16} />
                                        {meetingTime.toLocaleDateString(
                                            "ar-EG-u-nu-latn",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                        <Clock size={16} />
                                        {meetingTime.toLocaleTimeString(
                                            "ar-EG-u-nu-latn",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </span>
                                    {isLinkActive ? (
                                        <a
                                            href={meeting.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
                                        >
                                            <LinkIcon size={16} /> انْضِمْ الآنَ
                                        </a>
                                    ) : (
                                        <span className="px-3 py-2 bg-slate-200 text-slate-500 rounded-lg flex items-center gap-2 text-sm">
                                            <Clock size={16} /> لَمْ يَحِنْ
                                            الوَقْتُ بَعْدُ
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    لا تُوجَدُ مَوَاعِيدُ زُومٍ مُجْدْوَلَةٍ لِهَذَا الفَصْلِ.
                </p>
            )}
        </div>
    );
};

// --- Quran Wird Tracker Card Component ---
const QuranWirdTrackerCard = ({ recitations, openWirdModal, onDeleteWird }) => {
    const sortedRecitations = [...recitations].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                <h4 className="text-lg font-bold text-slate-800">
                    تَتَبُّعُ حَلَقَاتِ القُرْآنِ
                </h4>
                <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
                    onClick={() => openWirdModal()}
                >
                    <Plus size={16} />
                    إِضَافَةُ وَرْدٍ
                </button>
            </div>
            {sortedRecitations && sortedRecitations.length > 0 ? (
                <div className="overflow-y-auto max-h-64">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b border-slate-200">
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    التَّارِيخُ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الحاضر
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الماضي
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الإِجْرَاءَاتُ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedRecitations.map((wird) => (
                                <tr
                                    key={wird.id}
                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                >
                                    <td className="p-3 text-slate-800">
                                        {new Date(wird.date).toLocaleDateString(
                                            "ar-EG-u-nu-latn",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {wird.currentWird}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {wird.pastWird}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-start">
                                            <button
                                                onClick={() =>
                                                    openWirdModal(wird)
                                                }
                                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                title="تعديل"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDeleteWird(wird)
                                                }
                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                title="حذف"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    لا تُوجَدُ مَدْخَلاَتُ وَرْدٍ لِهَذَا الفَصْلِ بَعْدُ.
                </p>
            )}
        </div>
    );
};

// --- Exams Tracker Card Component ---
const ExamsTrackerCard = ({ exams, openExamModal, onDeleteExam }) => {
    const sortedExams = [...exams].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                <h4 className="text-lg font-bold text-slate-800">
                    تَتَبُّعُ الاِخْتِبَارَاتِ
                </h4>
                <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
                    onClick={() => openExamModal()}
                >
                    <Plus size={16} />
                    إِضَافَةُ اِخْتِبَارٍ
                </button>
            </div>
            {sortedExams && sortedExams.length > 0 ? (
                <div className="overflow-y-auto max-h-64">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b border-slate-200">
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    التَّارِيخُ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    مَنْهَجُ الاِخْتِبَارِ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    النَّوْعُ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الحَالَةُ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الإِجْرَاءَاتُ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedExams.map((exam) => (
                                <tr
                                    key={exam.id}
                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                >
                                    <td className="p-3 text-slate-800">
                                        {new Date(exam.date).toLocaleDateString(
                                            "ar-EG-u-nu-latn",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {exam.curriculum}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {exam.type}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                exam.status === "مكتمل"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-slate-100 text-slate-800"
                                            }`}
                                        >
                                            {exam.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-start">
                                            <button
                                                onClick={() =>
                                                    openExamModal(exam)
                                                }
                                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                title="تعديل"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDeleteExam(exam)
                                                }
                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                title="حذف"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
    );
};

// --- Attendance Tracker Card Component ---
const AttendanceTrackerCard = ({
    attendanceLog,
    openAttendanceModal,
    onDeleteAttendance,
}) => {
    const sortedLog = [...(attendanceLog || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
            <div className="flex justify-between items-center pb-5 mb-5 border-b border-orange-100">
                <h4 className="text-lg font-bold text-slate-800">
                    سجل الحضور والغياب
                </h4>
                <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
                    onClick={() => openAttendanceModal()}
                >
                    <Plus size={16} />
                    إضافة جلسة
                </button>
            </div>
            {sortedLog && sortedLog.length > 0 ? (
                <div className="overflow-y-auto max-h-64">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-orange-50">
                            <tr className="border-b border-orange-100">
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    التاريخ
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    نوع الجلسة
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedLog.map((session) => (
                                <tr
                                    key={session.id}
                                    className="hover:bg-orange-50 border-b border-orange-100 last:border-0"
                                >
                                    <td className="p-3 text-slate-800">
                                        {new Date(
                                            session.date
                                        ).toLocaleDateString(
                                            "ar-EG-u-nu-latn",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {session.type}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-start">
                                            <button
                                                onClick={() =>
                                                    openAttendanceModal(session)
                                                }
                                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                title="تعديل"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDeleteAttendance(session)
                                                }
                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                title="حذف"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    لم يتم تسجيل أي جلسات حضور بعد.
                </p>
            )}
        </div>
    );
};

// --- Class Files Card Component ---
const ClassFilesCard = ({ files, openFileModal, onDeleteFile }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex justify-between items-center pb-5 mb-5 border-b border-slate-200">
                <h4 className="text-lg font-bold text-slate-800">
                    ملفات ومكتبة الفصل
                </h4>
                <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
                    onClick={() => openFileModal()}
                >
                    <Plus size={16} />
                    إضافة ملف
                </button>
            </div>
            {files && files.length > 0 ? (
                <div className="overflow-y-auto max-h-64">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b border-slate-200">
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    اسم الملف
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الوصف
                                </th>
                                <th className="text-right p-3 text-xs font-semibold text-slate-500 uppercase">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr
                                    key={file.id}
                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                >
                                    <td className="p-3 text-slate-800">
                                        {file.name}
                                    </td>
                                    <td className="p-3 text-slate-800">
                                        {file.description}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-start">
                                            <a
                                                href={file.fileUrl}
                                                download={file.fileName}
                                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full"
                                                title="تنزيل"
                                            >
                                                <Download size={14} />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    openFileModal(file)
                                                }
                                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                title="تعديل"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDeleteFile(file)
                                                }
                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                title="حذف"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    لا توجد ملفات مرفقة لهذا الفصل بعد.
                </p>
            )}
        </div>
    );
};

// --- Student Management Component ---
const StudentManagementCard = ({
    selectedClass,
    allStudents,
    grades,
    onUpdateGrade,
    onUpdateAttendance,
    onUpdateCertificate,
    onUpdateNote,
}) => {
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [gradingMode, setGradingMode] = useState("recitations");
    const [certificateModal, setCertificateModal] = useState({
        isOpen: false,
        data: null,
    });
    const [noteModal, setNoteModal] = useState({ isOpen: false, data: null });
    const [deleteTarget, setDeleteTarget] = useState(null); // { type, data }

    const classStudents = selectedClass.studentIds
        .map((id) => allStudents[id])
        .filter(Boolean);

    useEffect(() => {
        if (classStudents.length > 0) {
            if (
                !selectedStudentId ||
                !classStudents.some((s) => s.id === selectedStudentId)
            ) {
                setSelectedStudentId(classStudents[0].id);
            }
        } else {
            setSelectedStudentId("");
        }
    }, [selectedClass.id, JSON.stringify(selectedClass.studentIds)]);

    const selectedStudent = selectedStudentId
        ? allStudents[selectedStudentId]
        : null;

    const handleGradeChange = (studentId, type, itemId, gradeField, value) => {
        const gradeValue = value === "" ? null : parseInt(value, 10);
        if (
            value !== "" &&
            (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100)
        )
            return;
        onUpdateGrade(studentId, type, itemId, gradeField, gradeValue);
    };

    const handleAttendanceChange = (studentId, attendanceRecordId, status) => {
        onUpdateAttendance(studentId, attendanceRecordId, status);
    };

    const handleSaveCertificate = (certificate) => {
        const action = certificate.id ? "update" : "add";
        onUpdateCertificate(
            selectedStudent.id,
            "certificates",
            certificate,
            action
        );
        setCertificateModal({ isOpen: false, data: null });
    };

    const handleSaveNote = (note) => {
        const action = note.id ? "update" : "add";
        onUpdateNote(selectedStudent.id, note, action);
        setNoteModal({ isOpen: false, data: null });
    };

    const handleDelete = (type, data) => {
        setDeleteTarget({ type, data });
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        const { type, data } = deleteTarget;
        if (type === "certificate") {
            onUpdateCertificate(
                selectedStudent.id,
                "certificates",
                data,
                "delete"
            );
        } else if (type === "note") {
            onUpdateNote(selectedStudent.id, data, "delete");
        }
        setDeleteTarget(null);
    };

    if (!selectedClass || classStudents.length === 0) {
        return (
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
                <h4 className="text-lg font-bold text-slate-800 mb-5">
                    إدارة وتقييم الطلاب
                </h4>
                <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    لا يوجد طلاب في هذا الفصل لعرضهم.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
            {certificateModal.isOpen && (
                <CertificateFormModal
                    onClose={() =>
                        setCertificateModal({ isOpen: false, data: null })
                    }
                    onSave={handleSaveCertificate}
                    certificateData={certificateModal.data}
                />
            )}
            {noteModal.isOpen && (
                <NoteFormModal
                    onClose={() => setNoteModal({ isOpen: false, data: null })}
                    onSave={handleSaveNote}
                    noteData={noteModal.data}
                />
            )}
            <ConfirmationModal
                isOpen={!!deleteTarget}
                message={`هل أنت متأكد من حذف هذا العنصر؟`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            <h4 className="text-lg font-bold text-slate-800 mb-5">
                إدارة وتقييم الطلاب
            </h4>
            <div className="flex flex-wrap items-center gap-4 pb-5 mb-5 border-b border-purple-200">
                <label
                    htmlFor="student-select"
                    className="flex items-center gap-2"
                >
                    <UserSquare size={18} className="text-purple-600" /> اختر
                    الطالب:
                </label>
                <select
                    id="student-select"
                    className="flex-1 min-w-[200px] p-2 border border-slate-300 rounded-lg"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                    {classStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedStudent && (
                <div className="animate-fade-in">
                    <div className="flex flex-wrap gap-5 bg-white p-4 rounded-lg mb-5">
                        <div className="text-slate-600">
                            <strong className="text-slate-800 font-semibold">
                                الاسم الكامل:
                            </strong>{" "}
                            {selectedStudent.name}
                        </div>
                        <div className="text-slate-600">
                            <strong className="text-slate-800 font-semibold">
                                العمر:
                            </strong>{" "}
                            {selectedStudent.age} سنة
                        </div>
                        <div className="text-slate-600">
                            <strong className="text-slate-800 font-semibold">
                                البلد:
                            </strong>{" "}
                            {selectedStudent.country}
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
                                onClick={() => setGradingMode("recitations")}
                            >
                                تتبع الحلقات
                            </button>
                            <button
                                className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                    gradingMode === "exams"
                                        ? "bg-white border-b-white text-indigo-600"
                                        : "text-slate-500"
                                }`}
                                onClick={() => setGradingMode("exams")}
                            >
                                تتبع الاختبارات
                            </button>
                            <button
                                className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                    gradingMode === "attendance"
                                        ? "bg-white border-b-white text-indigo-600"
                                        : "text-slate-500"
                                }`}
                                onClick={() => setGradingMode("attendance")}
                            >
                                تتبع الحضور
                            </button>
                            <button
                                className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                    gradingMode === "certificates"
                                        ? "bg-white border-b-white text-indigo-600"
                                        : "text-slate-500"
                                }`}
                                onClick={() => setGradingMode("certificates")}
                            >
                                تتبع الشهادات
                            </button>
                            <button
                                className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                                    gradingMode === "teacherNotes"
                                        ? "bg-white border-b-white text-indigo-600"
                                        : "text-slate-500"
                                }`}
                                onClick={() => setGradingMode("teacherNotes")}
                            >
                                ملاحظات المعلم
                            </button>
                        </div>

                        <div className="border border-slate-200 rounded-b-lg rounded-tr-lg bg-white p-4 max-h-[350px] overflow-y-auto">
                            {gradingMode === "recitations" && (
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ...(selectedClass.quranRecitations ||
                                                []),
                                        ]
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.date) -
                                                    new Date(a.date)
                                            )
                                            .map((rec) => {
                                                const studentGrades =
                                                    grades[selectedStudent.id]
                                                        ?.recitations?.[
                                                        rec.id
                                                    ] || {};
                                                const pastRating =
                                                    getRatingFromGrade(
                                                        studentGrades.pastGrade
                                                    );
                                                const currentRating =
                                                    getRatingFromGrade(
                                                        studentGrades.currentGrade
                                                    );
                                                return (
                                                    <tr
                                                        key={rec.id}
                                                        className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                    >
                                                        <td className="p-3 text-slate-800">
                                                            {new Date(
                                                                rec.date
                                                            ).toLocaleDateString(
                                                                "ar-EG"
                                                            )}
                                                        </td>
                                                        <td className="p-3 text-slate-800">
                                                            {rec.currentWird}
                                                        </td>
                                                        <td className="p-3">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                className="w-16 p-1 border border-slate-300 rounded text-center font-semibold"
                                                                value={
                                                                    studentGrades.currentGrade ??
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleGradeChange(
                                                                        selectedStudent.id,
                                                                        "recitations",
                                                                        rec.id,
                                                                        "currentGrade",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="p-3 text-slate-800">
                                                            {rec.pastWird}
                                                        </td>
                                                        <td className="p-3">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                className="w-16 p-1 border border-slate-300 rounded text-center font-semibold"
                                                                value={
                                                                    studentGrades.pastGrade ??
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleGradeChange(
                                                                        selectedStudent.id,
                                                                        "recitations",
                                                                        rec.id,
                                                                        "pastGrade",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="p-3">
                                                            <div className="flex flex-col gap-1 items-start">
                                                                {currentRating && (
                                                                    <span
                                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getRatingClass(
                                                                            currentRating
                                                                        )}`}
                                                                    >
                                                                        {
                                                                            currentRating
                                                                        }
                                                                    </span>
                                                                )}
                                                                {pastRating && (
                                                                    <span
                                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getRatingClass(
                                                                            pastRating
                                                                        )}`}
                                                                    >
                                                                        {
                                                                            pastRating
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            )}
                            {gradingMode === "exams" && (
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...(selectedClass.exams || [])]
                                            .filter(
                                                (ex) => ex.status === "مكتمل"
                                            )
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.date) -
                                                    new Date(a.date)
                                            )
                                            .map((exam) => {
                                                const studentExamGrade =
                                                    grades[selectedStudent.id]
                                                        ?.exams?.[exam.id] ||
                                                    {};
                                                const examRating =
                                                    getRatingFromGrade(
                                                        studentExamGrade.grade
                                                    );
                                                return (
                                                    <tr
                                                        key={exam.id}
                                                        className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                    >
                                                        <td className="p-3 text-slate-800">
                                                            {new Date(
                                                                exam.date
                                                            ).toLocaleDateString(
                                                                "ar-EG"
                                                            )}
                                                        </td>
                                                        <td className="p-3 text-slate-800">
                                                            {exam.curriculum}
                                                        </td>
                                                        <td className="p-3 text-slate-800">
                                                            {exam.type}
                                                        </td>
                                                        <td className="p-3">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                className="w-16 p-1 border border-slate-300 rounded text-center font-semibold"
                                                                value={
                                                                    studentExamGrade.grade ??
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleGradeChange(
                                                                        selectedStudent.id,
                                                                        "exams",
                                                                        exam.id,
                                                                        "grade",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="p-3">
                                                            {examRating && (
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getRatingClass(
                                                                        examRating
                                                                    )}`}
                                                                >
                                                                    {examRating}
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            )}

                            {gradingMode === "attendance" && (
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
                                        {[
                                            ...(selectedClass.attendanceLog ||
                                                []),
                                        ]
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.date) -
                                                    new Date(a.date)
                                            )
                                            .map((rec) => {
                                                const attendanceStatus =
                                                    grades[selectedStudent.id]
                                                        ?.attendance?.[
                                                        rec.id
                                                    ] || "not-recorded";
                                                return (
                                                    <tr
                                                        key={rec.id}
                                                        className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                    >
                                                        <td className="p-3 text-slate-800">
                                                            {new Date(
                                                                rec.date
                                                            ).toLocaleDateString(
                                                                "ar-EG"
                                                            )}
                                                        </td>
                                                        <td className="p-3 text-slate-800">
                                                            {rec.type}
                                                        </td>
                                                        <td className="p-3">
                                                            <select
                                                                className={`p-1 border rounded font-semibold ${getAttendanceClass(
                                                                    attendanceStatus
                                                                )}`}
                                                                value={
                                                                    attendanceStatus
                                                                }
                                                                onChange={(e) =>
                                                                    handleAttendanceChange(
                                                                        selectedStudent.id,
                                                                        rec.id,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="not-recorded">
                                                                    لم تسجل
                                                                </option>
                                                                <option value="early">
                                                                    حضور مبكر
                                                                </option>
                                                                <option value="late">
                                                                    حضور متأخر
                                                                </option>
                                                                <option value="absent">
                                                                    غياب
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            )}

                            {gradingMode === "certificates" && (
                                <div className="animate-fade-in">
                                    <button
                                        className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                        onClick={() =>
                                            setCertificateModal({
                                                isOpen: true,
                                                data: null,
                                            })
                                        }
                                    >
                                        <Plus size={16} /> إضافة شهادة جديدة
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
                                            {(
                                                grades[selectedStudent.id]
                                                    ?.certificates || []
                                            ).map((cert) => (
                                                <tr
                                                    key={cert.id}
                                                    className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                                >
                                                    <td className="p-3 text-slate-800">
                                                        {cert.title}
                                                    </td>
                                                    <td className="p-3 text-slate-800">
                                                        {cert.reason}
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex gap-2 justify-start">
                                                            <a
                                                                href={
                                                                    cert.fileUrl
                                                                }
                                                                download={
                                                                    cert.fileName ||
                                                                    "certificate.pdf"
                                                                }
                                                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full"
                                                                title="تنزيل"
                                                            >
                                                                <Download
                                                                    size={14}
                                                                />
                                                            </a>
                                                            <button
                                                                onClick={() =>
                                                                    setCertificateModal(
                                                                        {
                                                                            isOpen: true,
                                                                            data: cert,
                                                                        }
                                                                    )
                                                                }
                                                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full"
                                                                title="تعديل"
                                                            >
                                                                <Edit
                                                                    size={14}
                                                                />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        "certificate",
                                                                        cert
                                                                    )
                                                                }
                                                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full"
                                                                title="حذف"
                                                            >
                                                                <Trash
                                                                    size={14}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {gradingMode === "teacherNotes" && (
                                <div className="animate-fade-in">
                                    <button
                                        className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm mb-4"
                                        onClick={() =>
                                            setNoteModal({
                                                isOpen: true,
                                                data: null,
                                            })
                                        }
                                    >
                                        <Plus size={16} /> إضافة ملاحظة جديدة
                                    </button>
                                    <div className="max-h-[300px] overflow-y-auto space-y-4">
                                        {(
                                            grades[selectedStudent.id]
                                                ?.teacherNotes || []
                                        ).length > 0 ? (
                                            [
                                                ...(grades[selectedStudent.id]
                                                    ?.teacherNotes || []),
                                            ]
                                                .sort(
                                                    (a, b) =>
                                                        new Date(b.date) -
                                                        new Date(a.date)
                                                )
                                                .map((note) => (
                                                    <div
                                                        key={note.id}
                                                        className="bg-slate-50 border border-slate-200 rounded-lg p-4"
                                                    >
                                                        <div className="flex justify-between items-center mb-3">
                                                            <span className="flex items-center gap-2 text-sm text-slate-500">
                                                                <CalendarDays
                                                                    size={14}
                                                                />
                                                                {new Date(
                                                                    note.date
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
                                                                    onClick={() =>
                                                                        setNoteModal(
                                                                            {
                                                                                isOpen: true,
                                                                                data: note,
                                                                            }
                                                                        )
                                                                    }
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
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            "note",
                                                                            note
                                                                        )
                                                                    }
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
                                                            {note.text}
                                                        </p>
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="py-5 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
                                                لا توجد ملاحظات لهذا الطالب بعد.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Statistics Modal ---
const ClassStatisticsModal = ({ onClose, classData, allStudents, grades }) => {
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const calculateClassStats = () => {
            const studentIds = classData.studentIds;
            const studentsInClass = studentIds
                .map((id) => allStudents[id])
                .filter(Boolean);
            const attendanceLog = classData.attendanceLog || [];
            const recitations = classData.quranRecitations || [];
            const exams = (classData.exams || []).filter(
                (e) => e.status === "مكتمل"
            );

            // --- Attendance ---
            let totalPossibleAttendances =
                studentIds.length * attendanceLog.length;
            let totalPresent = 0;
            let totalLate = 0;
            let totalAbsent = 0;
            const studentAbsences = {};

            studentIds.forEach((studentId) => {
                studentAbsences[studentId] = 0;
                const studentGrades = grades[studentId];
                if (studentGrades && studentGrades.attendance) {
                    attendanceLog.forEach((session) => {
                        const status = studentGrades.attendance[session.id];
                        if (status === "early") totalPresent++;
                        else if (status === "late") totalLate++;
                        else if (status === "absent") {
                            totalAbsent++;
                            studentAbsences[studentId]++;
                        } else {
                            totalAbsent++;
                            studentAbsences[studentId]++;
                        }
                    });
                } else {
                    totalAbsent += attendanceLog.length;
                    studentAbsences[studentId] = attendanceLog.length;
                }
            });

            const attendanceRate =
                totalPossibleAttendances > 0
                    ? ((totalPresent + totalLate) / totalPossibleAttendances) *
                      100
                    : 0;

            const mostAbsentStudents = Object.entries(studentAbsences)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([studentId, count]) => ({
                    name: allStudents[studentId]?.name || "طالب غير معروف",
                    absences: count,
                }))
                .filter((s) => s.absences > 0);

            // --- Performance ---
            const studentDetails = studentsInClass.map((student) => {
                const studentGrades = grades[student.id] || {};
                const studentAttendance = studentGrades.attendance || {};
                const studentRecitations = studentGrades.recitations || {};
                const studentExams = studentGrades.exams || {};

                let presentCount = 0;
                let lateCount = 0;
                attendanceLog.forEach((log) => {
                    if (studentAttendance[log.id] === "early") presentCount++;
                    if (studentAttendance[log.id] === "late") lateCount++;
                });
                const studentAttRate =
                    attendanceLog.length > 0
                        ? ((presentCount + lateCount) / attendanceLog.length) *
                          100
                        : 0;

                let gradeSum = 0;
                let gradeCount = 0;
                Object.values(studentRecitations).forEach((rec) => {
                    if (rec.currentGrade != null) {
                        gradeSum += rec.currentGrade;
                        gradeCount++;
                    }
                    if (rec.pastGrade != null) {
                        gradeSum += rec.pastGrade;
                        gradeCount++;
                    }
                });
                Object.values(studentExams).forEach((exam) => {
                    if (exam.grade != null) {
                        gradeSum += exam.grade;
                        gradeCount++;
                    }
                });
                const avgGrade = gradeCount > 0 ? gradeSum / gradeCount : 0;

                return {
                    id: student.id,
                    name: student.name,
                    attendanceRate: studentAttRate,
                    averageGrade: avgGrade,
                    recitationsDone: Object.keys(studentRecitations).length,
                    examsDone: Object.keys(studentExams).length,
                };
            });

            const avgRecitationGrade =
                studentDetails.reduce((acc, s) => acc + s.averageGrade, 0) /
                    studentDetails.length || 0;
            const avgExamGrade =
                studentDetails.reduce((acc, s) => acc + s.averageGrade, 0) /
                    studentDetails.length || 0; // Simplified for now

            const topStudents = [...studentDetails]
                .sort((a, b) => b.averageGrade - a.averageGrade)
                .slice(0, 3)
                .filter((s) => s.averageGrade > 0);
            const studentsNeedingAttention = [...studentDetails]
                .sort((a, b) => a.averageGrade - b.averageGrade)
                .slice(0, 3)
                .filter((s) => s.averageGrade > 0 && s.averageGrade < 70);

            setStats({
                studentCount: studentsInClass.length,
                totalSessions: attendanceLog.length,
                totalCompletedExams: exams.length,
                attendance: {
                    rate: attendanceRate,
                    present: totalPresent,
                    late: totalLate,
                    absent: totalAbsent,
                    mostAbsent: mostAbsentStudents,
                },
                performance: {
                    avgRecitation: avgRecitationGrade,
                    avgExam: avgExamGrade,
                    topStudents,
                    needingAttention: studentsNeedingAttention,
                },
                studentDetails,
            });
        };

        calculateClassStats();
    }, [classData, allStudents, grades]);

    if (!stats) {
        return (
            <Modal onClose={onClose} title="جاري حساب الإحصائيات..." size="lg">
                <div>Loading...</div>
            </Modal>
        );
    }

    return (
        <Modal
            onClose={onClose}
            title={`إحصائيات فصل: ${classData.name}`}
            size="lg"
        >
            <div className="flex flex-wrap gap-1 mb-5 border-b border-slate-200">
                <button
                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                        activeTab === "overview"
                            ? "bg-white border-b-white text-indigo-600"
                            : "text-slate-500"
                    }`}
                    onClick={() => setActiveTab("overview")}
                >
                    نظرة عامة
                </button>
                <button
                    className={`px-4 py-2 border border-slate-200 bg-slate-50 rounded-t-lg ${
                        activeTab === "details"
                            ? "bg-white border-b-white text-indigo-600"
                            : "text-slate-500"
                    }`}
                    onClick={() => setActiveTab("details")}
                >
                    تفاصيل نشاط الطلاب
                </button>
            </div>

            {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h4 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-200">
                            نظرة عامة
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500">
                                        إجمالي الطلاب
                                    </span>
                                    <strong className="block text-xl text-slate-800">
                                        {stats.studentCount}
                                    </strong>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                    <BookText size={24} />
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500">
                                        إجمالي الجلسات
                                    </span>
                                    <strong className="block text-xl text-slate-800">
                                        {stats.totalSessions}
                                    </strong>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500">
                                        الاختبارات المكتملة
                                    </span>
                                    <strong className="block text-xl text-slate-800">
                                        {stats.totalCompletedExams}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h4 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-200">
                            إحصائيات الحضور
                        </h4>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-slate-500">
                                    معدل الحضور العام
                                </span>
                                <span className="text-sm font-semibold">
                                    {stats.attendance.rate.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-600 h-2.5 rounded-full"
                                    style={{
                                        width: `${stats.attendance.rate.toFixed(
                                            1
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-around mb-5 text-sm">
                            <span className="text-green-700">
                                {stats.attendance.present} حضور
                            </span>
                            <span className="text-yellow-700">
                                {stats.attendance.late} تأخر
                            </span>
                            <span className="text-red-700">
                                {stats.attendance.absent} غياب
                            </span>
                        </div>
                        {stats.attendance.mostAbsent.length > 0 && (
                            <>
                                <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                                    الطلاب الأكثر غيابًا
                                </h5>
                                <ul className="space-y-2">
                                    {stats.attendance.mostAbsent.map((s, i) => (
                                        <li
                                            key={i}
                                            className="flex justify-between items-center bg-white p-2 rounded border border-slate-200"
                                        >
                                            <span>{s.name}</span>
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                                {s.absences} غياب
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h4 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-200">
                            إحصائيات الأداء
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <div className="text-center">
                                <span className="block text-sm text-slate-500">
                                    متوسط درجات التسميع
                                </span>
                                <strong className="block text-xl text-blue-600">
                                    {stats.performance.avgRecitation.toFixed(1)}
                                    %
                                </strong>
                            </div>
                            <div className="text-center">
                                <span className="block text-sm text-slate-500">
                                    متوسط درجات الاختبارات
                                </span>
                                <strong className="block text-xl text-green-600">
                                    {stats.performance.avgExam.toFixed(1)}%
                                </strong>
                            </div>
                        </div>
                        {stats.performance.topStudents.length > 0 && (
                            <>
                                <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                                    <Star
                                        size={16}
                                        className="text-yellow-500"
                                    />{" "}
                                    الطلاب الأوائل
                                </h5>
                                <ul className="space-y-2">
                                    {stats.performance.topStudents.map(
                                        (s, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between items-center bg-white p-2 rounded border border-slate-200"
                                            >
                                                <span>{s.name}</span>
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                    {s.averageGrade.toFixed(1)}%
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </>
                        )}
                        {stats.performance.needingAttention.length > 0 && (
                            <>
                                <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2 mt-4">
                                    <AlertTriangle
                                        size={16}
                                        className="text-orange-500"
                                    />{" "}
                                    طلاب بحاجة لمتابعة
                                </h5>
                                <ul className="space-y-2">
                                    {stats.performance.needingAttention.map(
                                        (s, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between items-center bg-white p-2 rounded border border-slate-200"
                                            >
                                                <span>{s.name}</span>
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                                                    {s.averageGrade.toFixed(1)}%
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}
            {activeTab === "details" && (
                <div className="animate-fade-in">
                    <div className="max-h-[50vh] overflow-y-auto">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr className="border-b border-slate-200">
                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                        اسم الطالب
                                    </th>
                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                        معدل الحضور
                                    </th>
                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                        متوسط الدرجات
                                    </th>
                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                        التسميعات المنجزة
                                    </th>
                                    <th className="text-right p-3 text-sm font-semibold text-slate-500">
                                        الاختبارات المنجزة
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.studentDetails.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                                    >
                                        <td className="p-3 text-slate-800">
                                            {student.name}
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {student.attendanceRate.toFixed(1)}%
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {student.averageGrade.toFixed(1)}%
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {student.recitationsDone}
                                        </td>
                                        <td className="p-3 text-slate-800">
                                            {student.examsDone}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Modal>
    );
};

// --- Track Management View ---
const TrackManagementView = ({
    trackId,
    data,
    onBack,
    onUpdateData,
    onUpdateGrade,
    onUpdateAttendance,
    onUpdateCertificate,
    onAddNewStudent,
    onUpdateNote,
}) => {
    console.log(
        `
        ---------------------------------------
        trackId `,
        trackId,
        
        `---------------------------------------data `,
        data,
        
        `---------------------------------------onBack `,
        onBack,
        
        `---------------------------------------onUpdateData `,
        onUpdateData,
        
        `---------------------------------------onUpdateGrade `,
        onUpdateGrade,
        
        `--------------------------------------- onUpdateAttendance `,
        onUpdateAttendance,
        
        `--------------------------------------- onUpdateCertificate `,
        onUpdateCertificate,

        `--------------------------------------- onAddNewStudent `,
        onAddNewStudent,

        ` --------------------------------------- onUpdateNote `,
        onUpdateNote
    );

    const [selectedYear, setSelectedYear] = useState(data.academicYears[0]);
    const [selectedLevelId, setSelectedLevelId] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState("");
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: null,
        data: null,
    });
    const [zoomModalState, setZoomModalState] = useState({
        isOpen: false,
        meetingData: null,
    });
    const [wirdModalState, setWirdModalState] = useState({
        isOpen: false,
        wirdData: null,
    });
    const [examModalState, setExamModalState] = useState({
        isOpen: false,
        examData: null,
    });
    const [attendanceModalState, setAttendanceModalState] = useState({
        isOpen: false,
        sessionData: null,
    });
    const [fileModalState, setFileModalState] = useState({
        isOpen: false,
        data: null,
    });
    const [statsModalOpen, setStatsModalOpen] = useState(false);
    const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteConfig, setDeleteConfig] = useState(null);

    const track = data.tracks[trackId];

    useEffect(() => {
        if (track?.levels) {
            setSelectedLevelId(Object.keys(track?.levels)[0]);
        }
    }, [trackId]);

    const filteredClasses = Object.values(data.classes).filter((cls) => {
        if (cls.track !== trackId) return false;
        if (trackId === "hifz" && cls.academicYear !== selectedYear)
            return false;
        if (trackId === "murajaa" && cls.levelId !== selectedLevelId)
            return false;
        return true;
    });

    useEffect(() => {
        const currentClasses = Object.values(data.classes).filter((cls) => {
            if (cls.track !== trackId) return false;
            if (trackId === "hifz" && cls.academicYear !== selectedYear)
                return false;
            if (trackId === "murajaa" && cls.levelId !== selectedLevelId)
                return false;
            return true;
        });

        if (currentClasses.length > 0) {
            if (
                !selectedClassId ||
                !currentClasses.some((c) => c.id === selectedClassId)
            ) {
                setSelectedClassId(currentClasses[0].id);
            }
        } else {
            setSelectedClassId("");
        }
    }, [trackId, selectedYear, selectedLevelId, data.classes]);

    const openClassModal = (mode, classData = null) => {
        const initialClassData =
            mode === "add"
                ? {
                      name: "",
                      maxStudents: 8,
                      quranCirclesSchedule: "",
                      quranLecturesSchedule: "",
                      imageUrl: `https://placehold.co/600x400/${Math.floor(
                          Math.random() * 16777215
                      ).toString(16)}/ffffff?text=فصل`,
                      type: "ذكور",
                      academicYear: trackId === "hifz" ? selectedYear : null,
                      levelId: trackId === "murajaa" ? selectedLevelId : null,
                      quranCurriculum: "",
                      quranScienceCurriculum: "",
                      zoomMeetings: [],
                      quranRecitations: [],
                      exams: [],
                      attendanceLog: [],
                      studentIds: [],
                      classFiles: [],
                  }
                : classData;
        setModalState({ isOpen: true, mode, data: initialClassData });
    };

    const handleSaveClass = (classToSave) => {
        if (!classToSave || classToSave.name.trim() === "") return;

        if (modalState.mode === "add") {
            const newClassId = `class-${Date.now()}`;
            const newClass = { ...classToSave, id: newClassId, track: trackId };
            onUpdateData("classes", newClass, "add");
            setSelectedClassId(newClassId);
        } else {
            onUpdateData("classes", classToSave, "update");
        }
        setModalState({ isOpen: false, mode: null, data: null });
    };

    const handleSaveItem = (type, newItem, closeModal) => {
        const currentClass = data.classes[selectedClassId];
        let updatedItems;
        if (newItem.id) {
            updatedItems = (currentClass[type] || []).map((item) =>
                item.id === newItem.id ? newItem : item
            );
        } else {
            const itemId = `${type.slice(0, 3)}-${Date.now()}`;
            updatedItems = [
                ...(currentClass[type] || []),
                { ...newItem, id: itemId },
            ];
        }
        onUpdateData(
            "classes",
            { ...currentClass, [type]: updatedItems },
            "update"
        );
        closeModal();
    };

    const handleDeleteItem = (config) => {
        setDeleteConfig(config);
        setShowConfirmModal(true);
    };

    const confirmDeleteItem = () => {
        if (deleteConfig) {
            const { type, item } = deleteConfig;
            if (type === "classes") {
                onUpdateData(type, item, "delete");
            } else {
                const currentClass = data.classes[selectedClassId];
                const updatedItems = currentClass[type].filter(
                    (i) => i.id !== item.id
                );
                onUpdateData(
                    "classes",
                    { ...currentClass, [type]: updatedItems },
                    "update"
                );
            }
            setDeleteConfig(null);
            setShowConfirmModal(false);
        }
    };

    const selectedClass = selectedClassId
        ? data.classes[selectedClassId]
        : null;

    return (
        <div>
            {addStudentModalOpen && (
                <AddStudentToClassModal
                    onClose={() => setAddStudentModalOpen(false)}
                    onSave={onAddNewStudent}
                    trackId={trackId}
                    classes={filteredClasses}
                />
            )}
            {modalState.isOpen && (
                <ClassFormModal
                    onClose={() =>
                        setModalState({ isOpen: false, mode: null, data: null })
                    }
                    onSave={handleSaveClass}
                    classData={modalState.data}
                    academicYears={data.academicYears}
                    track={track}
                    selectedYear={selectedYear}
                    selectedLevelId={selectedLevelId}
                />
            )}
            {zoomModalState.isOpen && (
                <ZoomMeetingFormModal
                    onClose={() =>
                        setZoomModalState({ isOpen: false, data: null })
                    }
                    onSave={(item) =>
                        handleSaveItem("zoomMeetings", item, () =>
                            setZoomModalState({ isOpen: false, data: null })
                        )
                    }
                    meetingData={zoomModalState.meetingData}
                />
            )}
            {wirdModalState.isOpen && (
                <QuranWirdFormModal
                    onClose={() =>
                        setWirdModalState({ isOpen: false, data: null })
                    }
                    onSave={(item) =>
                        handleSaveItem("quranRecitations", item, () =>
                            setWirdModalState({ isOpen: false, data: null })
                        )
                    }
                    wirdData={wirdModalState.wirdData}
                />
            )}
            {examModalState.isOpen && (
                <ExamFormModal
                    onClose={() =>
                        setExamModalState({ isOpen: false, data: null })
                    }
                    onSave={(item) =>
                        handleSaveItem("exams", item, () =>
                            setExamModalState({ isOpen: false, data: null })
                        )
                    }
                    examData={examModalState.examData}
                />
            )}
            {attendanceModalState.isOpen && (
                <AttendanceFormModal
                    onClose={() =>
                        setAttendanceModalState({ isOpen: false, data: null })
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
            )}
            {fileModalState.isOpen && (
                <FileFormModal
                    onClose={() =>
                        setFileModalState({ isOpen: false, data: null })
                    }
                    onSave={(item) =>
                        handleSaveItem("classFiles", item, () =>
                            setFileModalState({ isOpen: false, data: null })
                        )
                    }
                    fileData={fileModalState.data}
                />
            )}
            {statsModalOpen && selectedClass && (
                <ClassStatisticsModal
                    onClose={() => setStatsModalOpen(false)}
                    classData={selectedClass}
                    allStudents={data.students}
                    grades={data.grades}
                />
            )}

            <ConfirmationModal
                isOpen={showConfirmModal}
                message={`هل أنت متأكد من حذف هذا العنصر؟`}
                onConfirm={confirmDeleteItem}
                onCancel={() => setShowConfirmModal(false)}
            />

            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-5"
            >
                <ArrowRight size={20} />
                <span>العَوْدَةُ إِلَى المَسَارَاتِ</span>
            </button>
            <div className="flex flex-wrap items-center gap-5 mb-8">
                <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white ${
                        track?.color === "green"
                            ? "bg-green-600"
                            : track?.color === "blue"
                            ? "bg-blue-600"
                            : "bg-purple-600"
                    }`}
                >
                    {track?.icon}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        {track?.name}
                    </h1>
                    <p className="text-slate-600">{track?.description}</p>
                </div>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 mr-auto"
                    onClick={() => setAddStudentModalOpen(true)}
                >
                    <UserSquare size={18} />
                    إضافة طالب للفصل
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
                <div className="flex flex-col md:flex-row gap-5">
                    {trackId === "hifz" && (
                        <div className="flex-1">
                            <label
                                htmlFor="year-select"
                                className="flex items-center gap-2 mb-2"
                            >
                                <GraduationCap
                                    size={18}
                                    className="text-slate-600"
                                />{" "}
                                السَّنَةُ الدِّرَاسِيَّةُ:
                            </label>
                            <select
                                id="year-select"
                                className="w-full p-2 border border-slate-300 rounded-lg"
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                }
                            >
                                {data.academicYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {trackId === "murajaa" && track?.levels && (
                        <div className="flex-1">
                            <label
                                htmlFor="level-select"
                                className="flex items-center gap-2 mb-2"
                            >
                                <Layers size={18} className="text-slate-600" />{" "}
                                المستوى:
                            </label>
                            <select
                                id="level-select"
                                className="w-full p-2 border border-slate-300 rounded-lg"
                                value={selectedLevelId || ""}
                                onChange={(e) =>
                                    setSelectedLevelId(e.target.value)
                                }
                            >
                                {Object.entries(track?.levels).map(
                                    ([id, level]) => (
                                        <option key={id} value={id}>
                                            {level.name}
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
                            <BookOpen size={18} className="text-slate-600" />{" "}
                            الفَصْلُ:
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="class-select"
                                className="flex-1 p-2 border border-slate-300 rounded-lg"
                                value={selectedClassId || ""}
                                onChange={(e) =>
                                    setSelectedClassId(e.target.value)
                                }
                                disabled={filteredClasses.length === 0}
                            >
                                {filteredClasses.length > 0 ? (
                                    filteredClasses.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>
                                        لا تُوجَدُ فُصُولٌ في هذا المستوى
                                    </option>
                                )}
                            </select>
                            <button
                                className="px-3 py-2 bg-slate-100 text-slate-800 rounded-lg"
                                onClick={() =>
                                    openClassModal("edit", selectedClass)
                                }
                                disabled={!selectedClass}
                            >
                                <Edit size={16} />
                                تَعْدِيلٌ
                            </button>
                            <button
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
                            </button>
                            <button
                                className="px-3 py-2 bg-green-600 text-white rounded-lg"
                                onClick={() => openClassModal("add")}
                            >
                                <Plus size={16} />
                                إِضَافَةٌ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedClass ? (
                    <>
                        <ClassSummaryCard
                            classData={selectedClass}
                            onShowStats={() => setStatsModalOpen(true)}
                        />
                        <StudentManagementCard
                            selectedClass={selectedClass}
                            allStudents={data.students}
                            grades={data.grades}
                            onUpdateGrade={onUpdateGrade}
                            onUpdateAttendance={onUpdateAttendance}
                            onUpdateCertificate={onUpdateCertificate}
                            onUpdateNote={onUpdateNote}
                        />
                        <ZoomMeetingsCard
                            meetings={selectedClass.zoomMeetings || []}
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
                            attendanceLog={selectedClass.attendanceLog || []}
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
                            recitations={selectedClass.quranRecitations || []}
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
                                setFileModalState({ isOpen: true, data: item })
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
                        الرَّجاءُ اِخْتِيَارُ فَصْلٍ لِعَرْضِ تَفَاصِيلِهِ، أو
                        إِضَافَةُ فَصْلٍ جَدِيدٍ.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Admin Dashboard Component ---
export default function QuranPathDetailsx() {
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

    const [data, setData] = useState(initialData);
    const [view, setView] = useState("dashboard"); // 'dashboard' or 'track'
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleSelectTrack = (trackId) => {
        setSelectedTrack(trackId);
        setView("track");
    };

    const handleDataUpdate = (dataType, item, action) => {
        setData((prevData) => {
            const newCollection = { ...prevData[dataType] };

            if (action === "add" || action === "update") {
                newCollection[item.id] = item;
            } else if (action === "delete") {
                delete newCollection[item.id];
            }

            return { ...prevData, [dataType]: newCollection };
        });
    };

    const handleGradeUpdate = (studentId, type, itemId, gradeField, grade) => {
        setData((prevData) => {
            const newGrades = JSON.parse(JSON.stringify(prevData.grades));
            if (!newGrades[studentId])
                newGrades[studentId] = {
                    recitations: {},
                    exams: {},
                    certificates: [],
                };
            if (!newGrades[studentId][type]) newGrades[studentId][type] = {};
            if (!newGrades[studentId][type][itemId])
                newGrades[studentId][type][itemId] = {};
            newGrades[studentId][type][itemId][gradeField] = grade;
            return { ...prevData, grades: newGrades };
        });
    };

    const handleAttendanceUpdate = (studentId, attendanceId, status) => {
        setData((prevData) => {
            const newGrades = JSON.parse(JSON.stringify(prevData.grades));
            if (!newGrades[studentId])
                newGrades[studentId] = {
                    recitations: {},
                    exams: {},
                    certificates: [],
                    attendance: {},
                };
            if (!newGrades[studentId].attendance)
                newGrades[studentId].attendance = {};
            newGrades[studentId].attendance[attendanceId] = status;
            return { ...prevData, grades: newGrades };
        });
    };

    const handleCertificateUpdate = (studentId, type, item, action) => {
        setData((prevData) => {
            const newGrades = JSON.parse(JSON.stringify(prevData.grades));
            if (!newGrades[studentId])
                newGrades[studentId] = {
                    recitations: {},
                    exams: {},
                    certificates: [],
                };
            if (!newGrades[studentId][type]) newGrades[studentId][type] = [];

            const items = newGrades[studentId][type];

            if (action === "add") {
                items.push({ ...item, id: `cert-${Date.now()}` });
            } else if (action === "update") {
                const index = items.findIndex((c) => c.id === item.id);
                if (index > -1) items[index] = item;
            } else if (action === "delete") {
                newGrades[studentId][type] = items.filter(
                    (c) => c.id !== item.id
                );
            }

            return { ...prevData, grades: newGrades };
        });
    };

    const handleNoteUpdate = (studentId, note, action) => {
        setData((prevData) => {
            const newGrades = JSON.parse(JSON.stringify(prevData.grades));
            if (!newGrades[studentId])
                newGrades[studentId] = {
                    recitations: {},
                    exams: {},
                    certificates: [],
                    attendance: {},
                    teacherNotes: [],
                };
            if (!newGrades[studentId].teacherNotes)
                newGrades[studentId].teacherNotes = [];

            let notes = newGrades[studentId].teacherNotes;

            if (action === "add") {
                notes.push({
                    ...note,
                    id: `note-${Date.now()}`,
                    date: new Date().toISOString().split("T")[0],
                });
            } else if (action === "update") {
                const index = notes.findIndex((n) => n.id === note.id);
                if (index > -1) notes[index] = { ...notes[index], ...note };
            } else if (action === "delete") {
                newGrades[studentId].teacherNotes = notes.filter(
                    (n) => n.id !== note.id
                );
            }

            return { ...prevData, grades: newGrades };
        });
    };

    const handleAddNewStudent = (newStudentData, classId) => {
        setData((prevData) => {
            const newStudentId = `student-${Date.now()}`;
            const newStudent = { id: newStudentId, ...newStudentData };

            const newStudents = {
                ...prevData.students,
                [newStudentId]: newStudent,
            };

            const newClasses = { ...prevData.classes };
            const targetClass = newClasses[classId];
            if (targetClass) {
                targetClass.studentIds.push(newStudentId);
            }

            const newGrades = {
                ...prevData.grades,
                [newStudentId]: {
                    recitations: {},
                    exams: {},
                    certificates: [],
                    attendance: {},
                    teacherNotes: [],
                },
            };

            return {
                ...prevData,
                students: newStudents,
                classes: newClasses,
                grades: newGrades,
            };
        });
    };

    const trackStats = Object.keys(data.tracks).reduce((acc, trackId) => {
        const classesInTrack = Object.values(data.classes).filter(
            (c) => c.track === trackId
        );
        const studentCount = classesInTrack.reduce(
            (sum, c) => sum + c.studentIds.length,
            0
        );
        acc[trackId] = {
            classCount: classesInTrack.length,
            studentCount: studentCount,
        };
        return acc;
    }, {});

    return (
        <div dir="rtl" className="min-h-screen bg-slate-50 p-5">
            <div className="max-w-7xl mx-auto">
                {view === "dashboard" ? (
                    <div className="animate-fade-in">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                لَوْحَةُ تَحَكُّمِ المَدْرَسَةِ القُرْآنِيَّةِ
                            </h2>
                            <p className="text-lg text-slate-600">
                                أَهْلاً بِكَ! مِنْ هُنَا يُمْكِنُكَ إِدَارَةُ
                                جَمِيعِ المَسَارَاتِ التَّعْلِيمِيَّةِ.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(data.tracks).map(([id, track]) => (
                                <div
                                    key={id}
                                    className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                                        track.color === "green"
                                            ? "bg-green-50 border border-green-100"
                                            : track.color === "blue"
                                            ? "bg-blue-50 border border-blue-100"
                                            : "bg-purple-50 border border-purple-100"
                                    }`}
                                >
                                    <div
                                        className={`p-5 flex items-center gap-5 ${
                                            track.color === "green"
                                                ? "bg-green-50 border-b border-green-100"
                                                : track.color === "blue"
                                                ? "bg-blue-50 border-b border-blue-100"
                                                : "bg-purple-50 border-b border-purple-100"
                                        }`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
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
                                            <h3 className="text-xl font-bold text-slate-800">
                                                {track.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-slate-600 mb-6">
                                            {track.description}
                                        </p>
                                        <div className="flex gap-5">
                                            <div className="flex items-center gap-2">
                                                <BookOpen
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                                <div>
                                                    <span className="text-sm text-slate-500">
                                                        الفصول:
                                                    </span>
                                                    <span
                                                        className={`block text-lg font-bold ${
                                                            track.color ===
                                                            "green"
                                                                ? "text-green-600"
                                                                : track.color ===
                                                                  "blue"
                                                                ? "text-blue-600"
                                                                : "text-purple-600"
                                                        }`}
                                                    >
                                                        {
                                                            trackStats[id]
                                                                .classCount
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                                <div>
                                                    <span className="text-sm text-slate-500">
                                                        الطلاب:
                                                    </span>
                                                    <span
                                                        className={`block text-lg font-bold ${
                                                            track.color ===
                                                            "green"
                                                                ? "text-green-600"
                                                                : track.color ===
                                                                  "blue"
                                                                ? "text-blue-600"
                                                                : "text-purple-600"
                                                        }`}
                                                    >
                                                        {
                                                            trackStats[id]
                                                                .studentCount
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-slate-50 border-t border-slate-200">
                                        <button
                                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-bold ${
                                                track.color === "green"
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : track.color === "blue"
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "bg-purple-600 hover:bg-purple-700"
                                            }`}
                                            onClick={() =>
                                                handleSelectTrack(id)
                                            }
                                        >
                                            <span>إدارة المسار</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <TrackManagementView
                            trackId={selectedTrack}
                            data={data}
                            onBack={() => setView("dashboard")}
                            onUpdateData={handleDataUpdate}
                            onUpdateGrade={handleGradeUpdate}
                            onUpdateAttendance={handleAttendanceUpdate}
                            onUpdateCertificate={handleCertificateUpdate}
                            onAddNewStudent={handleAddNewStudent}
                            onUpdateNote={handleNoteUpdate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
