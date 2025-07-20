// https://chat.deepseek.com/a/chat/s/45286dd6-4a56-4ed7-b1c9-dfac7cffe776
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGeoLocation from "react-ipgeolocation";
import {
    Plus,
    Search,
    Users,
    Clock,
    Menu,
    Trash,
    Edit,
    Filter,
    ChevronDown,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    EyeOff,
    Eye,
    Calendar,
    Loader2,
    FileText,
    File,
    Download,
    Paperclip,
    BadgeDollarSign,
    BadgePercent,
    DollarSign,
    ShieldUser,
    ExternalLink,
} from "lucide-react";

// api
import {
    publicGetPackages,
    publicSearchPackages,
    publicUpdatePackageVisibility,
    publicDeletePackage,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// utils
import { formatDuration, formatDateAR } from "../../../../utils/helpers";
import {
    App_User,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// plugin
import Toast from "../../../../plugin/Toast";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function PackagesList() {
    const navigate = useNavigate();

    let { userData } = UserDataStore();

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        courseId: null,
        message: "",
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    const { country } = useGeoLocation();
    const [countryString, setCountryString] = useState("saudi");

    useEffect(() => {
        fetchCourses();
    }, [currentPage]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchCourses();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await publicGetPackages(currentPage);

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الباقات");
            } else {
                setCourses(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
            );
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const { data, error } = await publicSearchPackages(
                searchQuery,
                currentPage
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setCourses(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            console.error("Error searching courses:", error);
            Toast("error", "حدث خطأ أثناء البحث");
            setIsLoading(false);
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
        } else if (searchQuery.trim() === "") {
            fetchCourses();
            setIsLoading(false);
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleVisibilityChange = async (courseId, newVisibility) => {
        try {
            const { data, error } = await publicUpdatePackageVisibility(
                courseId,
                newVisibility
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setCourses(
                    courses.map((course) =>
                        course.id === courseId
                            ? { ...course, is_visible: newVisibility }
                            : course
                    )
                );
                Toast("success", "تم تحديث حالة الباقة بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    const handleDelete = (courseId) => {
        setDeleteConfirmation({
            show: true,
            courseId,
            message: "هل أنت متأكد من حذف هذه الباقة",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await publicDeletePackage(
                deleteConfirmation.courseId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setCourses(
                    courses.filter(
                        (course) => course.id !== deleteConfirmation.courseId
                    )
                );
                Toast("success", "تم حذف الباقة بنجاح");
                navigate(`/${App_User}/home`);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            courseId: null,
            message: "",
        });
    };

    //
    useEffect(() => {
        // تأكد من أن country هو كود الدولة (مثل 'SA' أو 'EG')
        const countryCode = country || "SA";

        if (["EG", "LY"].includes(countryCode)) {
            // مصر وليبيا
            setCountryString("egypt");
        } else if (["SA", "AE", "QA", "KW", "BH", "OM"].includes(countryCode)) {
            // السعودية ودول الخليج
            setCountryString("saudi");
        } else {
            // باقي الدول (أمريكا وغيرها)
            setCountryString("america");
        }
    }, [country]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    // console.log(`course`, courses);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => {
                                navigate(`/${App_User}/home`);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة الباقات
                        </h1>
                    </div>

                    {/* <Link
                        to={`/${App_User}/packages/students/create`}
                        className="md:ms-auto px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all"
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة طالب الي الباقة
                    </Link> */}

                    <Link
                        to={`/${App_User}/packages/create`}
                        className={`px-4 py-4 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-all`}
                    >
                        <Plus size={18} className="ml-1" />
                        إضافة باقة جديدة
                    </Link>
                </div>

                {/* Search and filter */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search
                                size={20}
                                className={`absolute left-3 top-1.5 text-gray-400 cursor-pointer hover:text-blue-600 `}
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
                                placeholder="البحث عن باقة..."
                                className={`w-full pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 transition-all `}
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

                    {/* {showFilters && (
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
                                                 <option value="superadmin">
                                                     مدير النظام
                                                 </option>
                                                 <option value="admin">مسؤول</option>
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
                                                 className="text-blue-600 hover:text-blue-700"
                                             >
                                                 إعادة تعيين الفلاتر
                                             </button>
                                         </div>
                                     </div>
                                 )} */}
                </div>

                <div className="">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : courses?.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                لم يتم اضافة باقات حتي الان
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 my-12 flex flex-col gap-8">
                            {courses?.map((course, index) => (
                                <div
                                    key={index}
                                    className={`group card hover:shadow-lg transition-shadow duration-200 
                                        ${
                                            course?.is_visible === false
                                                ? "bg-gray-200"
                                                : ""
                                        }
                                        ${
                                            course?.is_admin === true
                                                ? `border-s-4 border-blue-600`
                                                : "border-s-4 border-amber-700"
                                        }
                                    
                                    `}
                                >
                                    <div className="flex flex-col md:flex-row p-4">
                                        <div
                                            className="w-full md:min-w-60 md:max-w-60 h-60 md:h-40   overflow-hidden rounded-lg md:ml-4 mb-4 md:mb-0 cursor-pointer border border-gray-300 shadow-md"
                                            onClick={() => {
                                                // if (
                                                //     userData?.id ===
                                                //     course?.user?.id
                                                // ) {
                                                //     navigate(
                                                //         `/${App_User}/packages/${course?.id}`
                                                //     );
                                                // }
                                            }}
                                        >
                                            <img
                                                src={
                                                    course?.image_url ||
                                                    course?.image ||
                                                    noimage
                                                }
                                                alt={course?.title}
                                                onError={(e) => {
                                                    e.target.src = noimage;
                                                    e.target.onerror = null;
                                                }}
                                                loading="lazy"
                                                className="w-full h-full object-fill md:max-h-40"
                                            />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between ">
                                            <div className="flex justify-between items-start">
                                                <Link
                                                // to={
                                                //     userData?.id ===
                                                //     course?.user?.id
                                                //         ? `/${App_User}/packages/${course?.id}`
                                                //         : `/${App_User}/packages`
                                                // }
                                                >
                                                    <h2
                                                        className={`text-3xl font-bold text-black hover:text-blue-600 transition-all duration-500 hover:transition-all hover:duration-500 group-hover:text-blue-600 truncate`}
                                                    >
                                                        {course?.title}
                                                    </h2>
                                                </Link>

                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/packages/${course?.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-red-50 rounded-md"
                                                        // onClick={() => {
                                                        //     // handleDelete(
                                                        //     //     course?.id
                                                        //     // );
                                                        //     navigate(`/packages/${course?.id}`)
                                                        // }}
                                                        title="عرض الباقة"
                                                        target="_blank"
                                                    >
                                                        <ExternalLink
                                                            size={18}
                                                        />
                                                    </Link>

                                                    <button
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                        onClick={() => {
                                                            handleVisibilityChange(
                                                                course?.id,
                                                                !course?.is_visible
                                                            );
                                                        }}
                                                        title={
                                                            course?.is_visible ===
                                                            false
                                                                ? "إظهار الباقة"
                                                                : "إخفاء الباقة"
                                                        }
                                                    >
                                                        {course?.is_visible ===
                                                        false ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>

                                                    {userData?.id ===
                                                        course?.user?.id && (
                                                        <Link
                                                            to={`/${App_User}/packages/update/${course?.id}`}
                                                            className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md`}
                                                            title="تعديل الباقة"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>
                                                    )}

                                                    <button
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                        onClick={() => {
                                                            handleDelete(
                                                                course?.id
                                                            );
                                                        }}
                                                        title="حذف الباقة"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-2xl text-gray-600 -mt-2 mb-4 pe-10 line-clamp-1">
                                                {course?.description}
                                            </p>

                                            {countryString === "egypt" ? (
                                                <div className="flex items-center flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <DollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر قبل الخصم
                                                        </span>
                                                        {
                                                            course.price_like_egypt
                                                        }
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgePercent
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>خصم</span>
                                                        {
                                                            course.discount_like_egypt
                                                        }{" "}
                                                        %
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgeDollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر بعد الخصم
                                                        </span>
                                                        {
                                                            course.price_after_discount_egypt
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}

                                            {countryString === "saudi" ? (
                                                <div className="flex items-center flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <DollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر قبل الخصم
                                                        </span>
                                                        {
                                                            course.price_like_saudi
                                                        }
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgePercent
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>خصم</span>
                                                        {
                                                            course.discount_like_saudi
                                                        }{" "}
                                                        %
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgeDollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر بعد الخصم
                                                        </span>
                                                        {
                                                            course.price_after_discount_saudi
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}

                                            {countryString === "america" ? (
                                                <div className="flex items-center flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <DollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر قبل الخصم
                                                        </span>
                                                        {
                                                            course.price_like_america
                                                        }
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgePercent
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>خصم</span>
                                                        {
                                                            course.discount_like_america
                                                        }{" "}
                                                        %
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2">
                                                        <BadgeDollarSign
                                                            size={16}
                                                            // className="ml-1"
                                                        />
                                                        <span>
                                                            السعر بعد الخصم
                                                        </span>
                                                        {
                                                            course.price_after_discount_america
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}

                                            <div className="flex items-center flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                <div className="flex items-center justify-center gap-2">
                                                    <ShieldUser
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    {course.is_admin
                                                        ? "مسؤل"
                                                        : "مستخدم"}
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <Calendar
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    {formatDateAR(
                                                        course.created_at
                                                    )}
                                                </div>
                                            </div>

                                            {/* <div className="flex items-center flex-wrap gap-4 text-lg text-gray-500 mt-auto">
                                                <div className="flex items-center justify-center gap-2">
                                                    <DollarSign
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    <span>السعر قبل الخصم</span>
                                                    {course.price}
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <BadgePercent
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    <span>خصم</span>
                                                    {course.discount} %
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <BadgeDollarSign
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    <span>السعر بعد الخصم</span>
                                                    {
                                                        course.price_after_discount
                                                    }
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <ShieldUser
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    {course.is_admin
                                                        ? "مسؤل"
                                                        : "مستخدم"}
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <Calendar
                                                        size={16}
                                                        // className="ml-1"
                                                    />
                                                    {formatDateAR(
                                                        course.created_at
                                                    )}
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalCount > PAGE_SIZE && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                            <div className="text-sm text-gray-600">
                                عرض {(currentPage - 1) * PAGE_SIZE + 1} إلى{" "}
                                {Math.min(currentPage * PAGE_SIZE, totalCount)}{" "}
                                من أصل {totalCount} باقة
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

                {deleteConfirmation?.show && (
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
                                            courseId: null,
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

export default PackagesList;
