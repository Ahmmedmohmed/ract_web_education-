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
    Building,
    Briefcase,
} from "lucide-react";

// API
import {
    getStaffDetails,
    updateStaffStatus,
    deleteStaff,
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

function StaffDetails() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [staff, setStaff] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await getStaffDetails(staffId);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب بيانات المساعد"
                    );
                    navigate(`/${App_Admin}/staffs`);
                } else {
                    setStaff(data);
                }
            } catch (error) {
                console.error("Error fetching staff details:", error);
                Toast("error", "حدث خطأ غير متوقع");
            } finally {
                setIsLoading(false);
            }
        };

        if (staffId) {
            fetchStaffDetails();
        }
    }, [staffId, navigate]);

    const handleStatusChange = async () => {
        try {
            setIsUpdatingStatus(true);

            const newStatus = !staff?.user?.is_active;

            const { data, error } = await updateStaffStatus(staff?.user?.id, {
                is_active: newStatus,
            });

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                // setStaff({ ...staff, is_active: newStatus });
                setStaff({
                    ...staff,
                    user: { ...staff.user, is_active: newStatus },
                });
                Toast(
                    "success",
                    `تم ${newStatus ? "تنشيط" : "إلغاء تنشيط"} المساعد بنجاح`
                );
            }
        } catch (error) {
            console.error("Error updating staff status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const { error } = await deleteStaff(staff.user.id);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                Toast("success", "تم حذف المساعد بنجاح");
                navigate(`/${App_Admin}/staffs`);
            }
            Toast("success", "سيتم تنفيذ الحذف بعد التأكيد النهائي");
            navigate(`/${App_Admin}/staffs`);
        } catch (error) {
            console.error("Error deleting staff:", error);
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

    const positionChoices = {
        finance: "المالية",
        hr_manager: "مدير الموارد البشرية",
        accounting: "محاسبة",
        it_manager: "مدير تقنية المعلومات",
        customer_service_supervisor: "مشرفة خدمة العملاء",
        facilities_manager: "مدير المرافق",
        administrative_assistant: "مساعدة إدارية",
        security_supervisor: "مشرف الأمن",
        public_relations_coordinator: "منسقة علاقات عامة",
        procurement_manager: "مدير المشتريات",
        recruitment_specialist: "أخصائية توظيف",
        maintenance_supervisor: "مشرف صيانة",
        librarian: "أمينة مكتبة",
        transportation_supervisor: "مشرف النقل",
        marketing_specialist: "أخصائية تسويق",
        quality_manager: "مدير الجودة",
    };

    const departmentChoices = {
        employee_affairs: "شؤون الموظفين",
        finance: "المالية",
        information_technology: "تقنية المعلومات",
        customer_service: "خدمة العملاء",
        facilities: "المرافق",
        student_affairs: "شؤون الطلاب",
        security: "الأمن",
        public_relations: "العلاقات العامة",
        procurement: "المشتريات",
        human_resources: "الموارد البشرية",
        maintenance: "الصيانة",
        library: "المكتبة",
        transportation: "النقل",
        marketing: "التسويق",
        quality: "الجودة",
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

    if (!staff) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-lg mb-4">
                        لم يتم العثور على المساعد
                    </div>
                    <button
                        onClick={() => navigate(`/${App_Admin}/staffs`)}
                        className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600`}
                    >
                        <ArrowRight className="ml-2" size={16} />
                        العودة إلى قائمة المساعدين
                    </button>
                </div>
            </>
        );
    }

    // console.log(`--dd`, staff);

    return (
        <>
            <div className="space-y-6">
                {/* <Row>
                <MainTitle>تفاصيل المساعد</MainTitle>
            </Row> */}

                {/* Back button and actions */}
                <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => navigate(`/${App_Admin}/staffs`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-black">
                            معلومات المساعد
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleStatusChange}
                            disabled={isUpdatingStatus}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                staff?.user?.is_active
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                        >
                            {isUpdatingStatus ? (
                                "جاري التحديث..."
                            ) : staff?.user?.is_active ? (
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
                            navigate(`/${App_Admin}/staffs/update/${staff.id}`)
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
                <ContentTitle>معلومات المساعد</ContentTitle>
            </Row> */}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Staff Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-8 pb-8 border-b">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:ml-6">
                            <img
                                src={staff.image || userimage}
                                alt={staff?.user?.full_name}
                                onError={(e) => {
                                    e.target.src = userimage;
                                    e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="text-center md:text-right">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {staff?.user?.full_name}
                            </h2>

                            <div className="flex items-center justify-center md:justify-start mt-2">
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        staff?.user?.is_active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {staff?.user?.is_active ? "نشط" : "غير نشط"}
                                </span>

                                <span className="mx-2 text-gray-400">•</span>

                                <span className="text-gray-500">
                                    رقم المساعد: {staff?.user?.id}
                                </span>
                            </div>

                            {staff.bio && (
                                <p className="text-gray-500 mt-2">
                                    {staff.bio || ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Staff Information */}
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
                                        {staff.user.email}
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
                                        {staff.phone || "غير متوفر"}
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
                                        {staff.age || "غير محدد"} سنة
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
                                        {staff.gender === "Male"
                                            ? "ذكر"
                                            : staff.gender === "Female"
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
                                        {formatDate(staff.created_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Building
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        القسم
                                    </p>
                                    <p className="text-gray-800">
                                        {departmentChoices[staff?.department]}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Briefcase
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        المنصب
                                    </p>
                                    <p className="text-gray-800">
                                        {positionChoices[staff?.position]}
                                    </p>
                                </div>
                            </div>

                            {/* <div className="flex items-center">
                                <Shield
                                    className="ml-3 text-gray-400"
                                    size={18}
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        الدور
                                    </p>
                                    <p className="text-gray-800">
                                        {staff.powers === "Complete"
                                            ? "كاملة"
                                            : staff.powers === "Medium"
                                            ? "متوسطة"
                                            : staff.powers === "Limited"
                                            ? "محدودة"
                                            : "غير محددة"}
                                    </p>
                                </div>
                            </div> */}

                            {/* <div className="flex items-center">
                                <Key className="ml-3 text-gray-400" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        مستوى الصلاحيات
                                    </p>

                                    <p className="text-gray-800">
                                        {staff.permissions || "غير محددة"}
                                    </p>
                                </div>
                            </div> */}

                            {/* {staff.address && (
                                <div className="md:col-span-2 lg:col-span-3">
                                    <div className="flex items-start">
                                        <User
                                            className="ml-3 text-gray-400 mt-1"
                                            size={18}
                                        />
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                العنوان
                                            </p>
                                            <p className="text-gray-800">
                                                {staff.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>

                    {/* Permissions Details */}
                    {/* <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            الصلاحيات التفصيلية
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            {staff.permissions_list?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {staff.permissions_list.map(
                                        (permission, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center"
                                            >
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${
                                                        permission.has_access
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    }`}
                                                ></div>
                                                <span className="text-gray-800">
                                                    {permission.name}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    لا توجد صلاحيات محددة
                                </p>
                            )}
                        </div>
                    </div> */}

                    {/* Last Activity */}
                    {/* <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            آخر النشاطات
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-right">
                                            النشاط
                                        </th>
                                        <th className="py-2 px-4 border-b text-right">
                                            الوقت
                                        </th>
                                        <th className="py-2 px-4 border-b text-right">
                                            عنوان IP
                                        </th>
                                        <th className="py-2 px-4 border-b text-right">
                                            الجهاز
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.last_activities?.length > 0 ? (
                                        staff.last_activities.map(
                                            (activity, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="py-2 px-4 border-b">
                                                        {activity.action}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {activity.timestamp}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {activity.ip_address}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {activity.device}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="py-4 text-center text-gray-500"
                                            >
                                                لا توجد نشاطات مسجلة
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4 text-black">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا المساعد؟ لا يمكن التراجع
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

export default StaffDetails;
