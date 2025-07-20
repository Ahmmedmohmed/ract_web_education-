/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiList } from "react-icons/fi";
import {
    Plus,
    ArrowLeft,
    Edit,
    Trash2,
    FileText,
    ArrowRight,
    Eye,
    EyeOff,
    ScrollText,
} from "lucide-react";

// Api
// import { questionBankApi } from "../../api/api";
import { publicGetQuestionBanksAdmin } from "../../../../api/public/authPublic";

// data
import { questionbank } from "../../../../data/data";

// plugin
import Toast from "../../../../plugin/Toast";

// utils
import {
    App_Admin,
    nameMainColor,
    PAGE_SIZE,
} from "../../../../utils/constants";

// assets
import noimage from "../../../../assets/images/error/no-image.jpg";

function TestResultsList() {
    const navigate = useNavigate();

    const [questionBanks, setQuestionBanks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestionBanksAdmin = async () => {
            try {
                setIsLoading(true);

                const { data, error } = await publicGetQuestionBanksAdmin();

                // console.log(`error`, error);
                // console.log(`data`, data);

                if (error) {
                    Toast(
                        "error",
                        error.message || "حدث خطأ أثناء جلب بنوك الاختبارات"
                    );
                    navigate(`/${App_Admin}/home`);
                } else {
                    setQuestionBanks(data);
                    setIsLoading(false);
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

        fetchQuestionBanksAdmin();
    }, []);

    if (isLoading && !questionBanks.length) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6  pb-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center justify-start mb-6">
                        <button
                            onClick={() => {
                                navigate(`/${App_Admin}/home`);
                                // moveBack();
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all text-black"
                        >
                            <ArrowRight size={20} />
                        </button>

                        <h1 className="text-3xl font-bold mr-2 text-black">
                            إدارة نتائج الاختبارات
                        </h1>
                    </div>
                </div>

                <div
                    className={`bg-white rounded-lg shadow-md overflow-hidden `}
                >
                    <div className={`py-4  `}>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`}
                                ></div>
                            </div>
                        ) : questionBanks?.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-gray-500">
                                    لم يتم العثور على أي نتائج اختبار.انتظر حتى
                                    يتم إجراء الاختبارات من قبل الطلاب
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 overflow-x-auto">
                                <table className="min-w-full   divide-gray-200 text-lg md:text-2xl">
                                    <thead className="bg-gray-50 ">
                                        <tr className="">
                                            <th
                                                scope="col"
                                                className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider "
                                            >
                                                رقم
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                الصورة
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-4 text-start  font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                الاختبار
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-2 py-4 text-end  font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                الاجراءات
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {questionBanks?.map((bank, index) => (
                                            <tr
                                                key={index}
                                                className={`  py-4 rounded-md mb-4 shadow 
                                                    ${
                                                        bank?.is_visible ===
                                                        false
                                                            ? "bg-gray-300"
                                                            : "bg-white"
                                                    }
                                                    `}
                                                onClick={() => {
                                                    navigate(
                                                        `/${App_Admin}/test-results/${bank?.id}`
                                                    );
                                                }}
                                            >
                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex  ">
                                                        <span className="me-4">
                                                            {/* {index + 1}) */}
                                                            {questionBanks?.length -
                                                                ((1 - 1) *
                                                                    PAGE_SIZE +
                                                                    index)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex w-full">
                                                        <div className="flex items-start w-full">
                                                            <div className="flex-shrink-0 w-full">
                                                                <div className="h-20  rounded-md overflow-hidden bg-white w-full">
                                                                    <img
                                                                        src={
                                                                            bank.image_url ||
                                                                            bank?.image ||
                                                                            noimage
                                                                        }
                                                                        alt="bank"
                                                                        onError={(
                                                                            e
                                                                        ) => {
                                                                            e.target.src =
                                                                                noimage;
                                                                            e.target.onerror =
                                                                                null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                                                                        }}
                                                                        className="h-full w-full max-h-40 object-fill"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="flex">
                                                        <div className="flex items-start">
                                                            <div className="flex-1 truncate">
                                                                <p className="text-gray-800 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px] md:max-w-[250px]">
                                                                    {
                                                                        bank?.title
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className=" flex items-start gap-4 space-x-2 justify-end">
                                                        <button
                                                            className={`flex items-center gap-4  text-blue-600 `}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/${App_Admin}/test-results/${bank?.id}`
                                                                );
                                                            }}
                                                        >
                                                            عرض النتائج
                                                            <ScrollText
                                                                size={18}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TestResultsList;
