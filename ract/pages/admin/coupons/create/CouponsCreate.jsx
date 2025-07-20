/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff } from "lucide-react";

// api
import { adminCreateCoupon } from "../../../../api/admin/authAdmin";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";

function CouponsCreate() {
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleCouponSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const couponData = new FormData();
            couponData.append("user", userData?.id || null);
            couponData.append("name", formData.name);
            couponData.append("discount", formData.discount);
            couponData.append("is_visible", isVisible);

            const { data, error } = await adminCreateCoupon(couponData);

            if (error) {
                Toast("error", error.message || "حدث خطأ أثناء إنشاء الكوبون");
            } else {
                Toast("success", "تم إنشاء الكوبون بنجاح");
                navigate(`/${App_Admin}/coupons`);
            }
        } catch (error) {
            console.error("Error creating coupon:", error);
            Toast("error", "حدث خطأ أثناء إنشاء الكوبون");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() => navigate(`/${App_Admin}/coupons`)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة كوبون جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleCouponSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    اسم الكوبون*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="مثال: CODE100"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("name", {
                                        required: "اسم الكوبون مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="discount"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    قيمة الخصم*
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    placeholder="مثال: 20"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    min="1"
                                    max="1000"
                                    {...register("discount", {
                                        required: "قيمة الخصم مطلوبة",
                                        min: {
                                            value: 1,
                                            message:
                                                "يجب أن تكون قيمة الخصم 1 على الأقل",
                                        },
                                        max: {
                                            value: 1000,
                                            message:
                                                "يجب أن تكون قيمة الخصم 1000 كحد أقصى",
                                        },
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.discount && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.discount.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                                        isVisible
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {isVisible ? (
                                        <Eye
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    ) : (
                                        <EyeOff
                                            size={16}
                                            className="text-gray-600"
                                        />
                                    )}
                                    {isVisible ? "ظاهر" : "مخفي"}
                                </button>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() =>
                                        navigate(`/${App_Admin}/coupons`)
                                    }
                                    disabled={isSubmitting || isLoading}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <Save size={18} />
                                    {isSubmitting || isLoading
                                        ? "جاري الحفظ..."
                                        : "حفظ الكوبون"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CouponsCreate;
