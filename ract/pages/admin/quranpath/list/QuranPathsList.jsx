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
    BookOpen,
    Users,
    TrendingUp,
    CircleCheckBig,
    Award,
} from "lucide-react";

// api
import {
    publicGetQuranPaths,
    publicDeleteQuranPath,
    publicUpdateQuranPathVisibility,
    publicGetQuranPathsAdmin,
} from "../../../../api/public/authPublic";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

// plugin
import Toast from "../../../../plugin/Toast";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function QuranPathsList() {
    const navigate = useNavigate();

    const [quranPaths, setQuranPaths] = useState([]);

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

            const { data, error } = await publicGetQuranPathsAdmin();
            // currentPage,
            // selectedStatus

            // console.log(`error`, error);
            // console.log(`data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء جلب المسارات");
                navigate(`/${App_Admin}/home`);
            } else {
                setQuranPaths(data);
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

    const handleVisibilityChange = async (sectionId, newVisibility) => {
        // console.log(`sectionId`, sectionId);
        // console.log(`newVisibility`, newVisibility);

        try {
            const { data, error } = await publicUpdateQuranPathVisibility(
                sectionId,
                newVisibility
            );

            // console.log(`---error`, error);
            // console.log(`---data`, data);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء تحديث الحالة");
            } else {
                setQuranPaths(
                    quranPaths.map((section) =>
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
            message: "هل أنت متأكد من حذف هذا المسار؟",
        });
    };

    const confirmDelete = async () => {
        try {
            const { error } = await publicDeleteQuranPath(
                deleteConfirmation.sectionId
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء الحذف");
            } else {
                setQuranPaths(
                    quranPaths.filter(
                        (section) => section.id !== deleteConfirmation.sectionId
                    )
                );
                Toast("success", "تم حذف المسار بنجاح");
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
    // console.log(`quranPaths`, quranPaths);

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
                            إدارة مسارات القران
                        </h1>
                    </div>

                    {/* <button
                        onClick={() =>
                            navigate(`/${App_Admin}/quranpaths/create`)
                        }
                        className={`flex items-center gap-2 px-4 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200`}
                    >
                        <Plus size={18} />
                        <span>إضافة مسار جديد</span>
                    </button> */}
                </div>

                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                            ></div>
                        </div>
                    ) : quranPaths?.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">
                                {/* لا توجد تصنيفات مطابقة لبحثك */}
                                لم يتم أضافة مسار حتي الان
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quranPaths?.map((path, index) => (
                                    <div
                                        key={index}
                                        className={` rounded-3xl shadow-md border border-gray-200 
                                            hover:shadow-md transition-all duration-500 
                                            hover:-translate-y-4
                                            ${
                                                path.name === "save"
                                                    ? "border-green-200"
                                                    : path.name === "review"
                                                    ? "border-blue-200"
                                                    : "border-purple-200"
                                            }
                                            ${
                                                path?.is_visible === false
                                                    ? "bg-gray-400 text-gray-700"
                                                    : "bg-white"
                                            }
                                        `}
                                    >
                                        <div
                                            className={`p-4 flex items-center gap-4 
                                                ${
                                                    path.name === "save"
                                                        ? "bg-green-50 border-b border-green-200"
                                                        : path.name === "review"
                                                        ? "bg-blue-50 border-b border-blue-200"
                                                        : "bg-purple-50 border-b border-purple-200"
                                                }
                                            `}
                                        >
                                            <div
                                                className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                                                    ${
                                                        path.name === "save"
                                                            ? "bg-green-500"
                                                            : path.name ===
                                                              "review"
                                                            ? "bg-blue-500"
                                                            : "bg-purple-500"
                                                    }
                                            `}
                                            >
                                                {path.name === "save" ? (
                                                    <TrendingUp
                                                        size={24}
                                                        className="text-white"
                                                    />
                                                ) : path.name === "review" ? (
                                                    <CircleCheckBig
                                                        size={24}
                                                        className="text-white"
                                                    />
                                                ) : (
                                                    <Award
                                                        size={24}
                                                        className="text-white"
                                                    />
                                                )}
                                            </div>

                                            <h3 className="text-3xl font-bold text-gray-900">
                                                {path.title}
                                            </h3>
                                        </div>

                                        <div className="p-6 py-8">
                                            <p className="text-black mb-4 text-2xl">
                                                {path.description}
                                            </p>

                                            <div className="flex gap-4 text-xl">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen
                                                        size={18}
                                                        className="text-gray-400"
                                                    />

                                                    <span className="text-gray-700 font-medium flex items-center justify-start gap-2">
                                                        <span>الفصول:</span>

                                                        <span className="font-bold text-lg">
                                                            {
                                                                path.total_chapter_in_quran
                                                            }
                                                        </span>
                                                    </span>
                                                </div>

                                                <div
                                                    className="group flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-all duration-500 "
                                                    onClick={() => {
                                                        navigate(
                                                            `/${App_Admin}/quranpaths/${path?.id}/students`
                                                        );
                                                    }}
                                                >
                                                    <Users
                                                        size={18}
                                                        className="text-gray-400 group-hover:text-blue-500 transition-all duration-500"
                                                    />

                                                    <span className="text-gray-700 font-medium flex items-center justify-start gap-2  group-hover:text-blue-500 transition-all duration-500 ">
                                                        <span>الطلاب:</span>

                                                        <span className="font-bold text-lg">
                                                            {
                                                                path.total_enrolled_students
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 border-t border-gray-200  flex items-center justify-start gap-4">
                                            <button
                                                className={`w-full py-4 px-4 rounded-lg text-white font-bold 
                                                    flex items-center justify-center gap-2
                                                    transition-all duration-500 
                                                    hover:transition-all hover:duration-500
                                                    ${
                                                        path.name === "save"
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : path.name ===
                                                              "review"
                                                            ? "bg-blue-500 hover:bg-blue-600"
                                                            : "bg-purple-500 hover:bg-purple-600"
                                                    }`}
                                                onClick={() => {
                                                    // handleSelectTrack(id)
                                                    navigate(
                                                        // `/${App_Admin}/quranpathsx/${path.id}`
                                                        `/${App_Admin}/quranpaths/${path.id}`
                                                    );
                                                }}
                                            >
                                                <span className="text-xl">
                                                    إدارة المسار
                                                </span>
                                                <ArrowRight size={20} />
                                            </button>

                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    // to={`/${App_Admin}/quranpaths/update/${path?.id}`}
                                                    to={`/${App_Admin}/quranpaths/${path?.id}/students`}
                                                    className={`p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200`}
                                                    title="عرض الطلاب"
                                                >
                                                    <Users size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        handleVisibilityChange(
                                                            path?.id,
                                                            path?.is_visible
                                                                ? false
                                                                : true
                                                        );
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-gray-300 rounded-full transition-colors duration-200"
                                                    title={
                                                        !path?.is_visible
                                                            ? "إظهار المسار"
                                                            : "إخفاء المسار"
                                                    }
                                                >
                                                    {!path?.is_visible ? (
                                                        <EyeOff
                                                            size={18}
                                                            className="text-gray-600"
                                                        />
                                                    ) : (
                                                        <Eye size={18} />
                                                    )}
                                                </button>

                                                <Link
                                                    to={`/${App_Admin}/quranpaths/update/${path?.id}`}
                                                    className={`p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200`}
                                                    title="تعديل المسار"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>

                        // <>
                        //     <div className="bg-gray-100 p-4">
                        //         <div className="overflow-x-auto">
                        //             <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        //                 <thead>
                        //                     <tr className="text-right text-gray-600 bg-gray-200">
                        //                         <th className="py-3 px-4 font-semibold">
                        //                             اسم المسار
                        //                         </th>

                        //                         <th className="py-3 px-4 font-semibold hidden md:block">
                        //                             الحالة
                        //                         </th>

                        //                         <th className="py-3 px-4 font-semibold text-end">
                        //                             الإجراءات
                        //                         </th>
                        //                     </tr>
                        //                 </thead>

                        //                 <tbody>
                        //                     {quranPaths?.map((path, index) => (
                        //                         <tr
                        //                             key={index}
                        //                             className={`border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
                        //                                 !path?.is_visible
                        //                                     ? "bg-gray-200 text-gray-700"
                        //                                     : "hover:bg-gray-50"
                        //                             }`}
                        //                         >
                        //                             <td className="py-3 px-4 font-medium truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]">
                        //                                 {path?.title}
                        //                                 {path?.grade &&
                        //                                     ` (${path?.grade})`}
                        //                             </td>

                        //                             <td className="py-3 px-4 hidden md:block h-full">
                        //                                 <span
                        //                                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        //                                         !path?.is_visible
                        //                                             ? "bg-red-500 text-white"
                        //                                             : "bg-green-500 text-white"
                        //                                     }`}
                        //                                 >
                        //                                     {!path?.is_visible
                        //                                         ? "مخفي"
                        //                                         : "ظاهر"}
                        //                                 </span>
                        //                             </td>

                        //                             <td className="py-3 px-4">
                        //                                 <div className="flex items-center justify-end gap-3">
                        //                                     <button
                        //                                         onClick={() =>
                        //                                             handleVisibilityChange(
                        //                                                 path?.id,
                        //                                                 path?.is_visible
                        //                                                     ? false
                        //                                                     : true
                        //                                             )
                        //                                         }
                        //                                         className="p-2 text-gray-600 hover:bg-gray-300 rounded-full transition-colors duration-200"
                        //                                         title={
                        //                                             !path?.is_visible
                        //                                                 ? "إظهار المسار"
                        //                                                 : "إخفاء المسار"
                        //                                         }
                        //                                     >
                        //                                         {!path?.is_visible ? (
                        //                                             <EyeOff
                        //                                                 size={
                        //                                                     18
                        //                                                 }
                        //                                             />
                        //                                         ) : (
                        //                                             <Eye
                        //                                                 size={
                        //                                                     18
                        //                                                 }
                        //                                             />
                        //                                         )}
                        //                                     </button>

                        //                                     <Link
                        //                                         to={`/${App_Admin}/quranpaths/update/${path?.id}`}
                        //                                         className={`p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200`}
                        //                                         title="تعديل المسار"
                        //                                     >
                        //                                         <Edit
                        //                                             size={18}
                        //                                         />
                        //                                     </Link>

                        //                                     {/* <button
                        //                                     onClick={() =>
                        //                                         handleDelete(
                        //                                             path?.id
                        //                                         )
                        //                                     }
                        //                                     className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                        //                                     title="حذف المسار"
                        //                                 >
                        //                                     <Trash size={18} />
                        //                                 </button> */}
                        //                                 </div>
                        //                             </td>
                        //                         </tr>
                        //                     ))}
                        //                 </tbody>
                        //             </table>
                        //         </div>
                        //     </div>
                        // </>
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

export default QuranPathsList;
