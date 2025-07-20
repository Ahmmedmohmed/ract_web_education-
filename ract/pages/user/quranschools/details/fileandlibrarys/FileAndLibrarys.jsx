/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Download, FileDown, LoaderCircle } from "lucide-react";

// components
import { SectionTitle } from "../com";

const FileAndLibrarys = ({ files }) => {
    const [downloadingFileId, setDownloadingFileId] = useState(null);

    const handleDownload = (url, fileId) => {
        setDownloadingFileId(fileId);
        setTimeout(() => {
            window.open(url, "_blank");
            setDownloadingFileId(null);
        }, 1500);
    };

    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-file-download"></i>
                        <FileDown />
                    }
                    title="ملفاتي القابلة للتحميل"
                    colorClass="bg-blue-50"
                />

                <div className="p-5">
                    {files && files.length > 0 ? (
                        <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            اسم الملف
                                        </th>

                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            تفاصيل الملف
                                        </th>

                                        <th className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            الإجراء
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {files?.map((file, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-bold text-emerald-800">
                                                {file.title}
                                            </td>

                                            <td className="p-3 text-gray-700 text-sm leading-relaxed">
                                                {file.description}
                                            </td>

                                            <td className="p-3">
                                                <a
                                                    href={
                                                        file.file_url ||
                                                        file.file
                                                    }
                                                    target="_blank"
                                                    download={true}
                                                    className="flex items-center gap-2 bg-blue-500 p-2 text-white   hover:bg-blue-600 rounded-xl transition-all duration-500"
                                                    title="تنزيل"
                                                >
                                                    <Download size={14} />
                                                    <span>تحميل</span>
                                                </a>

                                                {/* <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            file.file_url ||
                                                                file.file,
                                                            file.id
                                                        )
                                                    }
                                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-bold 
                                                        ${
                                                            downloadingFileId
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-emerald-600 hover:bg-emerald-700"
                                                        }
                                                    `}
                                                    disabled={
                                                        downloadingFileId !==
                                                        null
                                                    }
                                                >
                                                    {downloadingFileId ===
                                                    file.id ? (
                                                        // <i className="fas fa-spinner fa-spin"></i>
                                                        <LoaderCircle
                                                            size={16}
                                                        />
                                                    ) : (
                                                        // <i className="fas fa-download"></i>
                                                        <Download size={16} />
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
                            لا توجد ملفات قابلة للتحميل حاليًا.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
export default FileAndLibrarys;
