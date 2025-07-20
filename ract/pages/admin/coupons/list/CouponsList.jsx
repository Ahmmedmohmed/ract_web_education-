/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Plus,
    Search,
    ArrowRight,
    Eye,
    EyeOff,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// api
import {
    adminGetCoupons,
    adminDeleteCoupon,
    adminUpdateCouponVisibility,
    adminSearchCoupons,
} from "../../../../api/admin/authAdmin";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_Admin,
    namecurrency,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

function CouponsList() {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        couponId: null,
    });
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, [currentPage]);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchQuery.trim() === "") {
            fetchCoupons();
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchQuery]);

    const fetchCoupons = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await adminGetCoupons(currentPage);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الكوبونات");
            } else {
                setCoupons(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
            Toast("error", "حدث خطأ غير متوقع");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await adminSearchCoupons(
                searchQuery,
                currentPage
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء البحث");
            } else {
                setCoupons(data.results);
                setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                setTotalCount(data.count);
            }
        } catch (error) {
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
        } else if (searchQuery.trim() === "") {
            fetchCoupons();
        }
    };

    const handleToggleCouponVisibility = async (couponId) => {
        try {
            const coupon = coupons.find((c) => c.id === couponId);
            if (!coupon) return;

            const { data, error } = await adminUpdateCouponVisibility(
                couponId,
                !coupon.is_visible
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setCoupons((prevCoupons) =>
                    prevCoupons.map((coupon) =>
                        coupon.id === couponId
                            ? { ...coupon, is_visible: !coupon.is_visible }
                            : coupon
                    )
                );
                Toast("success", "تم تحديث حالة الكوبون بنجاح");
            }
        } catch (error) {
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
    };

    const handleDelete = (couponId) => {
        setDeleteConfirmation({
            show: true,
            couponId,
        });
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);

            const { error } = await adminDeleteCoupon(
                deleteConfirmation.couponId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setCoupons((prevCoupons) =>
                    prevCoupons.filter(
                        (coupon) => coupon.id !== deleteConfirmation.couponId
                    )
                );
                Toast("success", "تم حذف الكوبون بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            Toast("error", "حدث خطأ أثناء الحذف");
        } finally {
            setDeleteConfirmation({ show: false, couponId: null });
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading && coupons.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`ee`, coupons);

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

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة الكوبونات
                        </h1>
                    </div>

                    <Link
                        to={`/${App_Admin}/coupons/create`}
                        className={`flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-500`}
                    >
                        <Plus size={18} />
                        <span>إضافة كوبون جديد</span>
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
                                placeholder="البحث عن كوبون..."
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

                {/* Coupons list */}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                        ></div>
                    </div>
                ) : coupons.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">
                            {searchQuery
                                ? "لا توجد كوبونات مطابقة لبحثك"
                                : "لا توجد كوبونات حاليا"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 my-6 flex flex-col gap-4">
                        {coupons.map((coupon, index) => (
                            <div
                                key={index}
                                className={` p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 ${
                                    !coupon.is_visible
                                        ? "bg-gray-300"
                                        : "bg-white"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-500">
                                            {/* {(currentPage - 1) * PAGE_SIZE +
                                                index +
                                                1}
                                            ) */}
                                            {coupon.id})
                                        </span>

                                        <div className="flex items-center gap-4">
                                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                                {coupon.name}
                                            </h3>

                                            <div className="flex flex-wrap gap-4 ">
                                                <span
                                                    className={`text-blue-600 font-medium`}
                                                >
                                                    خصم: [{coupon.discount}{" "}
                                                    {namecurrency}]
                                                </span>

                                                {/* <span className="text-gray-500">
                                                    {coupon.code}
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                handleToggleCouponVisibility(
                                                    coupon.id
                                                )
                                            }
                                            className={`p-2 rounded-full hover:bg-gray-100 ${
                                                coupon.is_visible
                                                    ? `text-blue-600`
                                                    : "text-gray-500"
                                            }`}
                                            title={
                                                coupon.is_visible
                                                    ? "إخفاء الكوبون"
                                                    : "إظهار الكوبون"
                                            }
                                        >
                                            {coupon.is_visible ? (
                                                <Eye size={18} />
                                            ) : (
                                                <EyeOff size={18} />
                                            )}
                                        </button>

                                        <Link
                                            to={`/${App_Admin}/coupons/update/${coupon.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                            title="تعديل"
                                        >
                                            <FiEdit size={18} />
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(coupon.id)
                                            }
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                            title="حذف"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
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
                            {Math.min(currentPage * PAGE_SIZE, totalCount)} من
                            أصل {totalCount} كوبون
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
                                    } else if (currentPage >= totalPages - 2) {
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

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-2">...</span>
                            )}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <button
                                    onClick={() => handlePageChange(totalPages)}
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
                                        Math.min(totalPages, currentPage + 1)
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

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">
                                تأكيد الحذف
                            </h3>
                            <p className="mb-6">
                                هل أنت متأكد من حذف هذا الكوبون؟ لا يمكن التراجع
                                عن هذا الإجراء.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() =>
                                        setDeleteConfirmation({
                                            show: false,
                                            couponId: null,
                                        })
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "جاري الحذف..." : "حذف"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CouponsList;
