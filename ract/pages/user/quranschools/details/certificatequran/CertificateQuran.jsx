/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BadgeCheck, Download } from "lucide-react";

// utils
import { SERVER_URL } from "../../../../../utils/constants";

// components
import { SectionTitle } from "../com";

const CertificateQuran = ({ certificates }) => {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = (url) => {
        setDownloading(true);
        setTimeout(() => {
            window.open(url, "_blank");
            setDownloading(false);
        }, 1500);
    };

    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-certificate"></i>
                        <BadgeCheck />
                    }
                    title="شهاداتي"
                    colorClass="bg-emerald-50"
                />

                <div className="p-5">
                    {certificates && certificates.length > 0 ? (
                        <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            الشَّهادة
                                        </th>
                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            الملاحظة
                                        </th>
                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            الإجراء
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {certificates?.map((cert, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-bold text-emerald-800">
                                                {cert.title}
                                            </td>

                                            <td className="p-3 text-gray-700 text-sm leading-relaxed">
                                                {cert.description}
                                            </td>

                                            <td className="p-3">
                                                <a
                                                    href={
                                                        cert.file_url ||
                                                        `${SERVER_URL}${cert.file}`
                                                    }
                                                    target="_blank"
                                                    download={true}
                                                    className="flex items-center gap-2 bg-blue-500 p-2 text-white   hover:bg-blue-600 rounded-xl transition-all duration-500 w-max "
                                                    title="تنزيل"
                                                >
                                                    <Download size={14} />
                                                    <span>تحميل</span>
                                                </a>

                                                {/* <button
                                                    onClick={() =>
                                                        handleDownload(cert.url)
                                                    }
                                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-bold ${
                                                        downloading
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-emerald-600 hover:bg-emerald-700"
                                                    }`}
                                                    disabled={downloading}
                                                >
                                                    {downloading ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-download"></i>
                                                    )}
                                                    <span>تحميل</span>
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="p-4 bg-gray-50 rounded-lg text-gray-600 text-center">
                            لا توجد شهادات متاحة حاليًا.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CertificateQuran;
