/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Mail,
    Phone,
    Calendar,
    Shield,
    User,
    Lock,
    Key,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Check,
    X,
    BookOpen,
} from "lucide-react";

// API
import {
    getTeacherDetails,
    updateTeacherStatus,
    deleteTeacher,
} from "../../../../../api/admin/authAdmin";

// plugin
import Toast from "../../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../../utils/constants";

// UI
import Row from "../../../../../ui/global/Row";
import MainTitle from "../../../../../ui/title/MainTitle";
import ContentTitle from "../../../../../ui/title/ContentTitle";

// assets
import noimage from "../../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../../assets/images/user/default-user.jpg";

function TeacherDetails() {
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [teacherCourses, setTeacherCourses] = useState([]);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await getTeacherDetails(teacherId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب بيانات المدرس"
                    );
                    navigate(`/${App_Admin}/teachers`);
                } else {
                    setTeacher(data);
                }
            } catch (error) {
                console.error("Error fetching teacher details:", error);
                Toast("error", "حدث خطأ غير متوقع");
            } finally {
                setIsLoading(false);
            }
        };

        if (teacherId) {
            fetchTeacherDetails();
        }
    }, [teacherId, navigate]);

    const handleStatusChange = async () => {
        try {
            setIsUpdatingStatus(true);

            const newStatus = !teacher?.user?.is_active;

            const { data, error } = await updateTeacherStatus(
                teacher?.user?.id,
                {
                    is_active: newStatus,
                }
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                // setTeacher({ ...teacher, is_active: newStatus });
                setTeacher({
                    ...teacher,
                    user: { ...teacher.user, is_active: newStatus },
                });
                Toast(
                    "success",
                    `تم ${newStatus ? "تنشيط" : "إلغاء تنشيط"} المدرس بنجاح`
                );
            }
        } catch (error) {
            console.error("Error updating teacher status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const { error } = await deleteTeacher(teacher.user.id);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف المدرس بنجاح");
                navigate(`/${App_Admin}/teachers`);
            }
            Toast("success", "سيتم تنفيذ الحذف بعد التأكيد النهائي");
            navigate(`/${App_Admin}/teachers`);
        } catch (error) {
            console.error("Error deleting teacher:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("ar-EG", options);
    };

    const subjectChoices = {
        mathematics: "رياضيات",
        advanced_mathematics: "رياضيات متقدمة",
        applied_mathematics: "رياضيات تطبيقية",
        chemistry: "كيمياء",
        organic_chemistry: "كيمياء عضوية",
        physics: "فيزياء",
        advanced_physics: "فيزياء متقدمة",
        biology: "أحياء",
        molecular_biology: "أحياء جزيئية",
        computer_science: "علوم الحاسب",
        advanced_computer_science: "علوم حاسب متقدمة",
        information_technology: "تقنية معلومات",
        arabic_language: "لغة عربية",
        english_language: "لغة إنجليزية",
        advanced_english_language: "لغة انجليزية متقدمة",
        history: "تاريخ",
        geography: "جغرافيا",
        psychology: "علم النفس",
        environmental_science: "علوم بيئية",
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!teacher) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-lg mb-4">لم يتم العثور على المدرس</div>
                    <button
                        onClick={() => navigate(`/${App_Admin}/teachers`)}
                        className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600`}
                    >
                        <ArrowRight className="ml-2" size={16} />
                        العودة إلى قائمة المدرسين
                    </button>
                </div>
            </>
        );
    }

    // console.log(`--dd`, teacher);

    return (
        <>
            <div className="space-y-6">
                {/* <Row>
                <MainTitle>تفاصيل المدرس</MainTitle>
            </Row> */}

                {/* Back button and actions */}
                <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => navigate(`/${App_Admin}/teachers`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-black">
                            معلومات المدرس
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleStatusChange}
                            disabled={isUpdatingStatus}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                teacher?.user?.is_active
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                        >
                            {isUpdatingStatus ? (
                                "جاري التحديث..."
                            ) : teacher?.user?.is_active ? (
                                <>
                                    <X size={16} />
                                    إلغاء التنشيط
                                </>
                            ) : (
                                <>
                                    <Check size={16} />
                                    تنشيط
                                </>
                            )}
                        </button>

                        {/* <button
                        onClick={() =>
                            navigate(`/${App_Admin}/teachers/update/${teacher.id}`)
                        }
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 flex items-center gap-2"
                    >
                        <Edit size={16} />
                        تعديل
                    </button> */}

                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            حذف
                        </button>
                    </div>
                </div>

                {/* <Row>
                <ContentTitle>معلومات المدرس</ContentTitle>
            </Row> */}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Teacher Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-8 pb-8 border-b">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:ml-6">
                            <img
                                src={teacher.image || userimage}
                                alt={teacher?.user?.full_name}
                                onError={(e) => {
                                    e.target.src = userimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="text-center md:text-right">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {teacher?.user?.full_name}
                            </h2>

                            <div className="flex items-center justify-center md:justify-start mt-2">
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        teacher?.user?.is_active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {teacher?.user?.is_active
                                        ? "نشط"
                                        : "غير نشط"}
                                </span>

                                <span className="mx-2 text-gray-400">•</span>

                                <span className="text-gray-500">
                                    رقم المدرس: {teacher?.user?.id}
                                </span>
                            </div>

                            {teacher.bio && (
                                <p className="text-gray-500 mt-2">
                                    {teacher.bio || ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Teacher Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            المعلومات الشخصية
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-center">
                                <Mail
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        البريد الإلكتروني
                                    </p>

                                    <p className="text-gray-800">
                                        {teacher.user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Phone
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        رقم الهاتف
                                    </p>

                                    <p className="text-gray-800">
                                        {teacher.phone || "غير متوفر"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <User
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        العمر
                                    </p>

                                    <p className="text-gray-800">
                                        {teacher.age || "غير محدد"} سنة
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <User
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        الجنس
                                    </p>

                                    <p className="text-gray-800">
                                        {teacher.gender === "Male"
                                            ? "ذكر"
                                            : teacher.gender === "Female"
                                            ? "أنثى"
                                            : "غير محدد"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Calendar
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        تاريخ الانضمام
                                    </p>
                                    <p className="text-gray-800">
                                        {formatDate(teacher.created_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Shield
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        الدور
                                    </p>
                                    <p className="text-gray-800">
                                        {teacher.powers === "Complete"
                                            ? "كاملة"
                                            : teacher.powers === "Medium"
                                            ? "متوسطة"
                                            : teacher.powers === "Limited"
                                            ? "محدودة"
                                            : "غير محددة"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <BookOpen
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        المادة
                                    </p>
                                    <p className="text-gray-800">
                                        {subjectChoices[teacher?.subject]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher Courses */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            الدورات التدريسية
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            اسم الدورة
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            عدد الطلاب
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            تاريخ البداية
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            الحالة
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {teacherCourses?.length > 0 ? (
                                        teacherCourses?.map((course, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {course.title}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Award
                                                            size={14}
                                                            className={`ml-1 text-blue-500`}
                                                        />
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                course.studentsCount
                                                            }{" "}
                                                            طالب
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {course.startDate}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            course.status ===
                                                            "جاري"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-green-100 text-green-800"
                                                        }`}
                                                    >
                                                        {course.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                لا توجد دورات مسجلة لهذا المعلم
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4 text-black">
                                تأكيد الحذف
                            </h3>

                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا المدرس؟ لا يمكن التراجع
                                عن هذا الإجراء.
                            </p>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default TeacherDetails;
