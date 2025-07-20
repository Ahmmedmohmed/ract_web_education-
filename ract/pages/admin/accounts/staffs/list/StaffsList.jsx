/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Mail,
    Phone,
    User,
    MoreVertical,
    Check,
    X,
    Trash2,
    Eye,
    Shield,
    Plus,
    ArrowRight,
} from "lucide-react";

// API
import {
    getStaffsList,
    searchStaffs,
    updateStaffStatus,
    deleteStaff,
} from "../../../../../api/admin/authAdmin";

// store
import UserDataStore from "../../../../../store/UserDataStore";

// utils
import {
    PAGE_SIZE,
    App_Admin,
    nameMainColor,
} from "../../../../../utils/constants";

// plugin
import Toast from "../../../../../plugin/Toast";

// assets
import noimage from "../../../../../assets/images/error/no-image.jpg";
import userimage from "../../../../../assets/images/user/default-user.jpg";

function StaffsList() {
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([]);
    const [allStaffs, setAllStaffs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const dropdownRef = useRef(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        staffId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    let { userData } = UserDataStore();

    // Fetch staffs from API
    useEffect(() => {
        fetchStaffs();
    }, [currentPage, selectedRole, selectedStatus]);

    // Handle search with debounce
    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // if (searchQuery.trim() !== "") {
        //     setIsLoading(true);
        //     setSearchTimeout(
        //         setTimeout(() => {
        //             handleSearch();
        //         }, 500)
        //     );
        // } else
        if (searchQuery.trim() === "") {
            fetchStaffs();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchStaffs = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await getStaffsList(
                currentPage,
                selectedRole,
                selectedStatus
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب المساعدين");
            } else {
                setStaffs(data.results);
                setAllStaffs(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error fetching staffs:", error);
            Toast("error", "حدث خطأ غير متوقع");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const { data, error } = await searchStaffs(
                searchQuery,
                currentPage
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setStaffs(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error searching staffs:", error);
            Toast("error", "حدث خطأ أثناء البحث");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchAction = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() !== "") {
            setIsLoading(true);
            setSearchTimeout(
                setTimeout(() => {
                    handleSearch();
                }, 500)
            );
            // } else if (searchQuery.trim() === "" && messages.length === 0) {
        } else if (searchQuery.trim() === "") {
            fetchStaffs();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleDropdown = (staffId) => {
        setActiveDropdown(activeDropdown === staffId ? null : staffId);
    };

    const handleStatusChange = async (staffId, newStatus) => {
        try {
            const { data, error } = await updateStaffStatus(staffId, {
                // is_active: newStatus === "active",
                // is_active: newStatus === true,
                is_active: newStatus,
            });

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setStaffs(
                    staffs.map((staff) =>
                        staff?.user?.id === staffId
                            ? {
                                  ...staff,
                                  user: {
                                      ...staff?.user,
                                      is_active: newStatus,
                                  },
                              }
                            : staff
                    )
                );
                Toast("success", "تم تحديث حالة المساعد بنجاح");
            }
        } catch (error) {
            console.error("Error updating staff status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        setActiveDropdown(null);
    };

    const confirmDelete = async () => {
        try {
            const { error } = await deleteStaff(deleteConfirmation.staffId);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setStaffs(
                    staffs.filter(
                        (staff) => staff?.user.id !== deleteConfirmation.staffId
                    )
                );
                fetchStaffs();
                Toast("success", "تم حذف المساعد بنجاح");
            }
        } catch (error) {
            console.error("Error deleting staff:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({ show: false, staffId: null, message: "" });
    };

    const handleDelete = (staffId) => {
        setDeleteConfirmation({
            show: true,
            staffId,
            message: "هل أنت متأكد من حذف هذا المساعد؟",
        });
    };

    const resetFilters = () => {
        setSelectedRole("");
        setSelectedStatus("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    const getStatusText = (isActive) => {
        return isActive ? "نشط" : "غير نشط";
    };

    const getStatusColor = (isActive) => {
        return isActive
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    };

    const getGenderText = (gender) => {
        return gender === "Male"
            ? "ذكر"
            : gender === "Female"
            ? "أنثى"
            : "غير محددة";
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

    // console.log(`staffs`, staffs);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => navigate(`/${App_Admin}/home`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>
                        <h1 className="text-3xl font-bold text-black">
                            إدارة المساعدين
                        </h1>
                    </div>

                    <Link
                        to={`/${App_Admin}/staffs/create`}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة مسؤول جديد
                    </Link>
                </div>

                {/* Search and filter */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search
                                size={20}
                                className={`absolute left-3 top-1.5 text-gray-400 cursor-pointer hover:text-blue-600`}
                                onClick={() => {
                                    handleSearchAction();
                                }}
                            />

                            <label
                                htmlFor="search-filter"
                                className="hidden"
                            ></label>
                            <input
                                type="text"
                                id="search-filter"
                                name="search-filter"
                                placeholder="البحث عن مسؤول..."
                                className={`w-full pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 transition-all`}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* <div className="flex-shrink-0">
                        <button
                            onClick={toggleFilters}
                            className="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50"
                        >
                            <Filter size={18} className="ml-1" />
                            تصفية
                            <ChevronDown size={16} className="mr-1" />
                        </button>
                    </div> */}
                    </div>

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    الصلاحيات
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedRole}
                                    onChange={(e) =>
                                        setSelectedRole(e.target.value)
                                    }
                                >
                                    <option value="">الكل</option>
                                    <option value="superstaff">
                                        مدير النظام
                                    </option>
                                    <option value="staff">مسؤول</option>
                                    <option value="moderator">مشرف</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    الحالة
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value)
                                    }
                                >
                                    <option value="">الكل</option>
                                    <option value="active">نشط</option>
                                    <option value="inactive">غير نشط</option>
                                </select>
                            </div>
                            <div className="md:text-left mt-4 md:mt-auto">
                                <button
                                    onClick={resetFilters}
                                    className={`text-blue-600 hover:text-blue-700`}
                                >
                                    إعادة تعيين الفلاتر
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Staffs List */}
                <div className="space-y-4 my-6 flex flex-col gap-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : staffs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لا يوجد مسؤولين مطابقين لبحثك
                            </p>
                        </div>
                    ) : (
                        staffs.map((staff, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-sm 
                                    hover:shadow-md transition-shadow 
                                    duration-200
                                    ${
                                        staff?.user.id === userData?.id &&
                                        "hidden"
                                    } 
                                `}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16">
                                                <img
                                                    src={
                                                        staff?.image ||
                                                        userimage
                                                    }
                                                    alt={staff?.user?.full_name}
                                                    onError={(e) => {
                                                        e.target.src =
                                                            userimage;
                                                        e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                    }}
                                                    className="h-16 w-16 rounded-full object-cover"
                                                />
                                            </div>

                                            <div className="mr-4">
                                                <h3 className="text-lg font-semibold text-black">
                                                    {staff?.user?.full_name}
                                                </h3>

                                                <div className="flex items-center mt-1">
                                                    <span
                                                        className={`text-sm text-blue-600 ml-2 flex items-center`}
                                                    >
                                                        <Shield
                                                            size={14}
                                                            className="ml-1"
                                                        />
                                                        {/* {staff?.role} */}
                                                        {
                                                            positionChoices[
                                                                staff.position
                                                            ]
                                                        }
                                                    </span>

                                                    <span
                                                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                            staff?.user
                                                                ?.is_active
                                                        )}`}
                                                    >
                                                        {getStatusText(
                                                            staff?.user
                                                                ?.is_active
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="relative"
                                            ref={
                                                activeDropdown === staff?.id
                                                    ? dropdownRef
                                                    : null
                                            }
                                        >
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition-all"
                                                onClick={() =>
                                                    toggleDropdown(staff?.id)
                                                }
                                            >
                                                <MoreVertical size={20} />
                                            </button>

                                            {activeDropdown === staff?.id && (
                                                <div className="absolute left-0 bg-white shadow-lg rounded-md py-1 w-36 z-10 transition-all">
                                                    <Link
                                                        to={`/${App_Admin}/staffs/${staff?.id}`}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        <Eye
                                                            size={16}
                                                            className="ml-2 text-gray-500"
                                                        />
                                                        عرض - ({staff?.id})
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                staff?.user?.id,
                                                                staff?.user
                                                                    ?.is_active
                                                                    ? false
                                                                    : true
                                                                // staff?.user?.is_active
                                                                //     ? "inactive"
                                                                //     : "active"
                                                            )
                                                        }
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        {staff?.user
                                                            ?.is_active ? (
                                                            <>
                                                                <X
                                                                    size={16}
                                                                    className="ml-2 text-red-500"
                                                                />
                                                                إلغاء تنشيط
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Check
                                                                    size={16}
                                                                    className="ml-2 text-green-500"
                                                                />
                                                                تنشيط
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                staff?.user.id
                                                            )
                                                        }
                                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-right"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            className="ml-2"
                                                        />
                                                        حذف
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-lg text-gray-500">
                                                معلومات الاتصال
                                            </span>

                                            <div className="flex items-center mt-1 text-gray-700">
                                                <Mail
                                                    size={14}
                                                    className="ml-1"
                                                />
                                                {staff?.user?.email}
                                            </div>

                                            <div className="flex items-center mt-1 text-gray-700">
                                                <Phone
                                                    size={14}
                                                    className="ml-1"
                                                />
                                                {staff?.phone_number ||
                                                    "غير متوفر"}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-lg text-gray-500">
                                                بيانات شخصية
                                            </span>

                                            <div className="mt-1 text-gray-700">
                                                العمر:{" "}
                                                {staff?.age || "غير محدد"} سنة
                                            </div>

                                            <div className="mt-1 text-gray-700">
                                                الجنس:{" "}
                                                {getGenderText(staff?.gender)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">
                                                القسم
                                            </span>

                                            <div className="mt-1 text-gray-700">
                                                {/* {staff?.department} */}
                                                {
                                                    departmentChoices[
                                                        staff.department
                                                    ]
                                                }
                                            </div>
                                        </div>

                                        {/* <div className="flex flex-col">
                                            <span className="text-lg text-gray-500">
                                                الصلاحيات
                                            </span>

                                            <div className="mt-1 text-gray-700"> 
                                                {staff?.powers === "Complete"
                                                    ? "كاملة"
                                                    : staff?.powers === "Medium"
                                                    ? "متوسطة"
                                                    : staff?.powers ===
                                                      "Limited"
                                                    ? "محدودة"
                                                    : "غير محددة"}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    {totalCount > PAGE_SIZE && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                            <div className="text-sm text-gray-600">
                                عرض {(currentPage - 1) * PAGE_SIZE + 1} إلى{" "}
                                {Math.min(currentPage * PAGE_SIZE, totalCount)}{" "}
                                من أصل {totalCount} مسؤول
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            Math.max(1, currentPage - 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-md ${
                                        currentPage === 1
                                            ? "text-gray-400 cursor-not-allowed"
                                            : `text-blue-600 hover:bg-blue-50`
                                    }`}
                                >
                                    <ChevronRight size={20} />
                                </button>

                                {Array.from(
                                    { length: Math.min(5, totalPages) },
                                    (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (
                                            currentPage >=
                                            totalPages - 2
                                        ) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() =>
                                                    handlePageChange(pageNum)
                                                }
                                                className={`px-3 py-1 rounded-md ${
                                                    currentPage === pageNum
                                                        ? `bg-blue-600 text-white`
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    }
                                )}

                                {totalPages > 5 &&
                                    currentPage < totalPages - 2 && (
                                        <span className="px-2">...</span>
                                    )}

                                {totalPages > 5 &&
                                    currentPage < totalPages - 2 && (
                                        <button
                                            onClick={() =>
                                                handlePageChange(totalPages)
                                            }
                                            className={`px-3 py-1 rounded-md ${
                                                currentPage === totalPages
                                                    ? `bg-blue-600 text-white`
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {totalPages}
                                        </button>
                                    )}

                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            Math.min(
                                                totalPages,
                                                currentPage + 1
                                            )
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-md ${
                                        currentPage === totalPages
                                            ? "text-gray-400 cursor-not-allowed"
                                            : `text-blue-600 hover:bg-blue-50`
                                    }`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4 text-black">
                                تأكيد الحذف
                            </h3>

                            <p className="mb-6">{deleteConfirmation.message}</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() =>
                                        setDeleteConfirmation({
                                            show: false,
                                            staffId: null,
                                            message: "",
                                        })
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={confirmDelete}
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

export default StaffsList;
