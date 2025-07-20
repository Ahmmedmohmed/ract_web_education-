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
    Award,
} from "lucide-react";

// API
import {
    getStudentDetails,
    updateStudentStatus,
    deleteStudent,
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

function StudentDetails() {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await getStudentDetails(studentId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب بيانات الطالب"
                    );
                    navigate(`/${App_Admin}/students`);
                } else {
                    setStudent(data);
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
                Toast("error", "حدث خطأ غير متوقع");
            } finally {
                setIsLoading(false);
            }
        };

        if (studentId) {
            fetchStudentDetails();
        }
    }, [studentId, navigate]);

    const handleStatusChange = async () => {
        try {
            setIsUpdatingStatus(true);

            const newStatus = !student?.user?.is_active;

            const { data, error } = await updateStudentStatus(
                student?.user?.id,
                {
                    is_active: newStatus,
                }
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                // setStudent({ ...student, is_active: newStatus });
                setStudent({
                    ...student,
                    user: { ...student.user, is_active: newStatus },
                });
                Toast(
                    "success",
                    `تم ${newStatus ? "تنشيط" : "إلغاء تنشيط"} الطالب بنجاح`
                );
            }
        } catch (error) {
            console.error("Error updating student status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const { error } = await deleteStudent(student.user.id);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف الطالب بنجاح");
                navigate(`/${App_Admin}/students`);
            }
            Toast("success", "سيتم تنفيذ الحذف بعد التأكيد النهائي");
            navigate(`/${App_Admin}/students`);
        } catch (error) {
            console.error("Error deleting student:", error);
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div
                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                ></div>
            </div>
        );
    }

    if (!student) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-lg mb-4">لم يتم العثور على الطالب</div>
                    <button
                        onClick={() => navigate(`/${App_Admin}/students`)}
                        className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 `}
                    >
                        <ArrowRight className="ml-2" size={16} />
                        العودة إلى قائمة الطلاب
                    </button>
                </div>
            </>
        );
    }

    // console.log(`--dd`, student);

    return (
        <>
            <div className="space-y-6">
                {/* <Row>
                <MainTitle>تفاصيل الطالب</MainTitle>
            </Row> */}

                {/* Back button and actions */}
                <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => navigate(`/${App_Admin}/students`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-black">
                            معلومات الطالب
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleStatusChange}
                            disabled={isUpdatingStatus}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                student?.user?.is_active
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                        >
                            {isUpdatingStatus ? (
                                "جاري التحديث..."
                            ) : student?.user?.is_active ? (
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
                            navigate(`/${App_Admin}/students/update/${student.id}`)
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
                <ContentTitle>معلومات الطالب</ContentTitle>
            </Row> */}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Student Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-8 pb-8 border-b">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:ml-6">
                            <img
                                src={student.image || userimage}
                                alt={student?.user?.full_name}
                                onError={(e) => {
                                    e.target.src = userimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="text-center md:text-right">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {student?.user?.full_name}
                            </h2>

                            <div className="flex items-center justify-center md:justify-start mt-2">
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        student?.user?.is_active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {student?.user?.is_active
                                        ? "نشط"
                                        : "غير نشط"}
                                </span>

                                <span className="mx-2 text-gray-400">•</span>

                                <span className="text-gray-500">
                                    رقم الطالب: {student?.user?.id}
                                </span>
                            </div>

                            {student.bio && (
                                <p className="text-gray-500 mt-2">
                                    {student.bio || ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Student Information */}
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
                                        {student.user.email}
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
                                        {student.phone || "غير متوفر"}
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
                                        {student.age || "غير محدد"} سنة
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
                                        {student.gender === "Male"
                                            ? "ذكر"
                                            : student.gender === "Female"
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
                                        {formatDate(student.created_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Award
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        عدد الدورات المسجلة
                                    </p>
                                    <p className="text-gray-800">
                                        {student?.enrolledCourses} دورات
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            الدورات المسجلة
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
                                            المدرس
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            تاريخ البداية
                                        </th>
                                        {/* <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        تاريخ النهاية
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        التقدم
                                    </th> */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {enrolledCourses?.length > 0 ? (
                                        enrolledCourses?.map(
                                            (course, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {course?.title}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {course?.instructor}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {course?.startDate}
                                                    </td>

                                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {course?.endDate}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`bg-blue-500 h-2.5 rounded-full`}
                                                        style={{
                                                            width: `${course?.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 text-center">
                                                    {course?.progress}%
                                                </div>
                                            </td> */}
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                لا توجد دورات مسجلة لهذا الطالب
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
                                هل أنت متأكد من حذف هذا الطالب؟ لا يمكن التراجع
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

export default StudentDetails;
