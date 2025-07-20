/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Trash2 } from "lucide-react";

// api
import {
    publicGetPackageCourseDiscountById,
    publicUpdatePackageCourseDiscount,
} from "../../../../api/public/authPublic";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

function PackagesDiscount() {
    // const { sectionId } = useParams();

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchPackageCourseDiscountById = async () => {
            try {
                const { data, error } =
                    await publicGetPackageCourseDiscountById();

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب البيانات"
                    );
                    navigate(`/${App_Admin}/packages`);
                } else {
                    // Set form values
                    setValue("number", data.number);
                }
            } catch (error) {
                console.error("Error fetching section:", error);
                Toast("error", "حدث خطأ غير متوقع");
                navigate(`/${App_Admin}/packages`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackageCourseDiscountById();
    }, [navigate, setValue]);

    const handleUpdate = async (formData) => {
        try {
            setIsLoading(true);

            const updateData = new FormData();
            updateData.append("number", formData.number);

            const { data, error } = await publicUpdatePackageCourseDiscount(
                updateData
            );

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء التحديث");
            } else {
                Toast("success", "تم تحديث الخصم بنجاح");
                navigate(`/${App_Admin}/packages`);
            }
        } catch (error) {
            console.error("Error updating section:", error);
            Toast("error", "حدث خطأ أثناء التحديث");
        } finally {
            setIsLoading(false);
        }
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

    // console.log(`sectionData`, sectionData);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => navigate(`/${App_Admin}/packages`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            تعديل خصم الباقات
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            {/* number */}
                            <div>
                                <label
                                    htmlFor="number"
                                    className="block text-lg font-medium text-black mb-2"
                                >
                                    اسم القسم*
                                </label>
                                <input
                                    type="number"
                                    id="number"
                                    name="number"
                                    placeholder="مثال: 20"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("number", {
                                        required: "القيمة مطلوبة",
                                        min: {
                                            value: 0,
                                            message:
                                                "القيمة لا يمكن أن يكون أقل من 0",
                                        },
                                        value: 0,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.number && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.number.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                        onClick={() =>
                                            navigate(`/${App_Admin}/packages`)
                                        }
                                        disabled={isLoading}
                                    >
                                        إلغاء
                                    </button>

                                    <button
                                        type="submit"
                                        className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                        disabled={isLoading}
                                    >
                                        <Save size={18} />
                                        {isLoading
                                            ? "جاري الحفظ..."
                                            : "حفظ التغييرات"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PackagesDiscount;
