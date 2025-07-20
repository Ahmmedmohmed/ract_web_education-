/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Edit,
    Trash,
    Plus,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
} from "lucide-react";

// api
import {
    adminGetCategories,
    adminGetSections,
    adminDeleteSection,
    adminUpdateSectionVisibility,
    adminGetSectionsAdmin,
    adminGetCategoriesAdmin,
} from "../../../../api/admin/authAdmin";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

// plugin
import Toast from "../../../../plugin/Toast";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function AdminSectionsList() {
    const navigate = useNavigate();

    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);

    const [expandedCategories, setExpandedCategories] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for delete confirmation modal
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [sectionToDeleteId, setSectionToDeleteId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        sectionId: null,
        message: "",
    });

    useEffect(() => {
        fetchSections();
        // fetchCategories();
    }, []);

    const fetchSections = async () => {
        try {
            setIsLoading(true);

            const { data, error } = await adminGetSectionsAdmin();
            // currentPage,
            // selectedStatus

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب الاقسام");
                navigate(`/${App_Admin}/home`);
            } else {
                setSections(data);
                setIsLoading(false);
                // setAllCategories(data.results);
                // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                // setTotalCount(data.count);
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

    // const fetchCategories = async () => {
    //     try {
    //         setIsLoading(true);

    //         const { data, error } = await adminGetCategoriesAdmin();
    //         // currentPage,
    //         // selectedStatus

    //         // console.log(`error`, error);
    //         // console.log(`data`, data);

    //         if (error) {
    //             Toast("error", error.message || "حدث خطأ أثناء جلب التصنيفات");
    //         } else {
    //             setCategories(data);
    //             // setAllCategories(data.results);
    //             // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    //             // setTotalCount(data.count);
    //         }
    //     } catch (error) {
    //         setError(
    //             error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
    //         );
    //         setIsLoading(false);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const getSectionsByCategory = (categoryId) => {
        return sections?.filter(
            (section) => section?.category?.id == categoryId
        );
    };

    const handleVisibilityChange = async (sectionId, newVisibility) => {
        // console.log(`sectionId`, sectionId);
        // console.log(`newVisibility`, newVisibility);

        try {
            const { data, error } = await adminUpdateSectionVisibility(
                sectionId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setSections(
                    sections.map((section) =>
                        section.id === sectionId
                            ? { ...section, is_visible: newVisibility }
                            : section
                    )
                );
                Toast("success", "تم تحديث حالة التصنيف بنجاح");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Toast("error", "حدث خطأ أثناء تحديث الحالة");
        }
        // setActiveDropdown(null);
    };

    const handleDelete = (sectionId) => {
        // setSectionToDeleteId(sectionId);
        // setShowDeleteConfirm(true);
        setDeleteConfirmation({
            show: true,
            sectionId,
            message: "هل أنت متأكد من حذف هذا القسم؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await adminDeleteSection(
                deleteConfirmation.sectionId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setSections(
                    sections.filter(
                        (section) => section.id !== deleteConfirmation.sectionId
                    )
                );
                Toast("success", "تم حذف القسم بنجاح");
                navigate(`/${App_Admin}/home`);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            Toast("error", "حدث خطأ أثناء الحذف");
        }
        setDeleteConfirmation({
            show: false,
            sectionId: null,
            message: "",
        });
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setSectionToDeleteId(null);
    };

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

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //         </div>
    //     );
    // }

    // console.log(`categories`, categories);
    // console.log(`sections`, sections);

    return (
        <>
            <div className="space-y-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center flex-wrap mb-8">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => navigate(`/${App_Admin}/home`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة أقسام الدورات
                        </h1>
                    </div>

                    <button
                        onClick={() =>
                            navigate(`/${App_Admin}/sections/create`)
                        }
                        className={`flex items-center gap-2 px-4 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200`}
                    >
                        <Plus size={18} />
                        <span>إضافة قسم جديد</span>
                    </button>
                </div>

                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : sections?.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                {/* لا توجد تصنيفات مطابقة لبحثك */}
                                لم يتم أضافة أقسام حتي الان
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="text-right text-gray-600 bg-gray-200">
                                            <th className="py-3 px-4 font-semibold">
                                                الصورة
                                            </th>

                                            <th className="py-3 px-4 font-semibold">
                                                اسم القسم
                                            </th>

                                            <th className="py-3 px-4 font-semibold hidden md:block">
                                                الحالة
                                            </th>

                                            <th className="py-3 px-4 font-semibold text-end">
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sections?.map((section, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
                                                    !section?.is_visible
                                                        ? "bg-gray-200 text-gray-700"
                                                        : "hover:bg-gray-50"
                                                }`}
                                            >
                                                <td className="py-3 px-4">
                                                    <img
                                                        src={
                                                            section?.image_url ||
                                                            section?.image ||
                                                            noimage
                                                        }
                                                        alt={section?.title}
                                                        onError={(e) => {
                                                            e.target.src =
                                                                noimage; // صورة افتراضية
                                                            e.target.onerror =
                                                                null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                        }}
                                                        className="h-20 w-full object-contain rounded-md shadow-sm"
                                                    />
                                                </td>

                                                <td className="py-3 px-4 font-medium truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]">
                                                    {section?.title}
                                                    {section?.grade &&
                                                        ` (${section?.grade})`}
                                                </td>

                                                <td className="py-3 px-4 hidden md:block h-full">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            !section?.is_visible
                                                                ? "bg-red-500 text-white"
                                                                : "bg-green-500 text-white"
                                                        }`}
                                                    >
                                                        {!section?.is_visible
                                                            ? "مخفي"
                                                            : "ظاهر"}
                                                    </span>
                                                </td>

                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() =>
                                                                handleVisibilityChange(
                                                                    section?.id,
                                                                    section?.is_visible
                                                                        ? false
                                                                        : true
                                                                )
                                                            }
                                                            className="p-2 text-gray-600 hover:bg-gray-300 rounded-full transition-colors duration-200"
                                                            title={
                                                                !section?.is_visible
                                                                    ? "إظهار القسم"
                                                                    : "إخفاء القسم"
                                                            }
                                                        >
                                                            {!section?.is_visible ? (
                                                                <EyeOff
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            )}
                                                        </button>

                                                        <Link
                                                            to={`/${App_Admin}/sections/update/${section?.id}`}
                                                            className={`p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200`}
                                                            title="تعديل القسم"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    section?.id
                                                                )
                                                            }
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                                                            title="حذف القسم"
                                                        >
                                                            <Trash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
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
                                            categoryId: null,
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

export default AdminSectionsList;
