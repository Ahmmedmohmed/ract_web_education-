/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowRight, Upload, Eye, EyeOff, Loader2 } from "lucide-react";

// api
import {
    publicCreateClassRoom,
    publicGetQuranPathsAdmin,
} from "../../../../api/public/authPublic";

// store
import UserDataStore from "../../../../store/UserDataStore";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import { App_Admin, nameMainColor } from "../../../../utils/constants";
import { validateImageUrl } from "../../../../utils/helpers";

function ClassRoomsCreate() {
    const { quranpathId } = useParams();
    const navigate = useNavigate();
    const { userData } = UserDataStore();

    const [quranPaths, setQuranPaths] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchQuranPaths = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetQuranPathsAdmin();
                // currentPage,
                // selectedStatus

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب التصنيفات"
                    );
                } else {
                    setQuranPaths(data);

                    setValue("quran_path", quranpathId);
                    // setAllCategories(data.results);
                    // setTotalPages(Math.ceil(data.count / PAGE_SIZE));
                    // setTotalCount(data.count);
                }
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء جلب البيانات"
                );
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuranPaths();
    }, [quranpathId, setValue]);

    //
    const handleSectionSubmit = async (formData) => {
        try {
            setIsLoading(true);

            const sectionData = new FormData();
            sectionData.append("user", userData?.id || null);
            sectionData.append("quran_path", formData.quran_path || null);

            sectionData.append("title", formData.title);
            sectionData.append("description", formData.description || "");
            sectionData.append(
                "preservation_decision",
                formData.preservation_decision || ""
            );
            sectionData.append(
                "associated_sciences",
                formData.associated_sciences || ""
            );
            sectionData.append(
                "condition_acceptance",
                formData.condition_acceptance || ""
            );

            sectionData.append("is_visible", isVisible);

            // for (let [key, value] of sectionData.entries()) {
            //     console.log(`-->`, key, value);
            //     console.log(`---------------`);
            // }

            // const { data, error } = await publicCreateClassRoom(sectionData);

            // // console.log(`error`, error);
            // // console.log(`data`, data);

            // if (error) {
            //     if (error.image) {
            //         setErrorsMessage(error.image);
            //         Toast("error", error.image);
            //     } else if (error.message) {
            //         Toast("error", error.message);
            //     }
            // } else {
            //     Toast("success", "تم إنشاء السنه الدراسية بنجاح");
            //     navigate(`/${App_Admin}/quranpaths/${quranpathId}`);
            // }
        } catch (error) {
            console.error("Error creating section:", error);
            Toast("error", "حدث خطأ أثناء إنشاء السنه الدراسية");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className={`animate-spin h-12 w-12 text-blue-600`} />
            </div>
        );
    }

    // console.log(`quranPaths`, quranPaths);
    // console.log(`quranpathId`, quranpathId);

    return (
        <>
            <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
                <div className="">
                    <div className="flex justify-start items-center gap-2 mb-8">
                        <button
                            onClick={() =>
                                navigate(
                                    `/${App_Admin}/quranpaths/${quranpathId}`
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold text-gray-800">
                            إضافة سنه دراسية جديد
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit(handleSectionSubmit)}
                            className="space-y-6 flex flex-col gap-6"
                        >
                            <div>
                                <label
                                    htmlFor="quran_path"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    مسارات القران*
                                </label>
                                <select
                                    id="quran_path"
                                    name="quran_path"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    {...register("quran_path", {
                                        required: "المسار مطلوب",
                                    })}
                                    autoComplete="off"
                                    // disabled={isSubmitting || isLoading}
                                    disabled={true}
                                    required
                                >
                                    <option value="">اختر مسار</option>
                                    {quranPaths?.map((path, index) => (
                                        <option key={index} value={path.id}>
                                            {path.id}) {path.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.quran_path && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.quran_path.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    اسم السنه الدراسية*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("title", {
                                        required: "اسم السنه الدراسية مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="مثال: خُطَّةٌ مُتكَامِلَةٌ لِخَتْمِ القُرْآنِ حِفْظًا وفَهْمًا."
                                    className={`w-full min-h-40 p-2 border border-gray-300 rounded-md focus:ring-1 focus:border-blue-500 outline-0 resize-none`}
                                    {...register("description", {
                                        // required: ``,
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    // required
                                />
                            </div>

                            {/* مُقَرَّرُ الحِفْظِ */}
                            <div>
                                <label
                                    htmlFor="preservation_decision"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    مُقَرَّرُ الحِفْظِ*
                                </label>
                                <input
                                    type="text"
                                    id="preservation_decision"
                                    name="preservation_decision"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("preservation_decision", {
                                        required: "مُقَرَّرُ الحِفْظِ مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.preservation_decision && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.preservation_decision.message}
                                    </p>
                                )}
                            </div>

                            {/* العُلُومُ المُصَاحِبَةُ* */}
                            <div>
                                <label
                                    htmlFor="associated_sciences"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    العُلُومُ المُصَاحِبَةُ*
                                </label>
                                <input
                                    type="text"
                                    id="associated_sciences"
                                    name="associated_sciences"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("associated_sciences", {
                                        required:
                                            "العُلُومُ المُصَاحِبَةُ مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.associated_sciences && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.associated_sciences.message}
                                    </p>
                                )}
                            </div>

                            {/*  شَرْطُ القَبُولِ   */}
                            <div>
                                <label
                                    htmlFor="condition_acceptance"
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    شَرْطُ القَبُولِ*
                                </label>
                                <input
                                    type="text"
                                    id="condition_acceptance"
                                    name="condition_acceptance"
                                    placeholder="مثال: كمي"
                                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                                    {...register("condition_acceptance", {
                                        required: "شَرْطُ القَبُولِ مطلوب",
                                    })}
                                    autoComplete="off"
                                    disabled={isSubmitting || isLoading}
                                    required
                                />
                                {errors.condition_acceptance && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.condition_acceptance.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center cursor-pointer">
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
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
                                        navigate(
                                            `/${App_Admin}/quranpaths/${quranpathId}`
                                        )
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
                                        : "حفظ السنه الدراسية"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClassRoomsCreate;
