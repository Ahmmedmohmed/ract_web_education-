import React from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

function UserCertificate() {
    const studentName = "محمد العمري";
    const courseName = " تصميم المواقع";
    const progress = "90";
    const issueDate = "";

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border-8 border-primary-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary-700 mb-8">
                    شهادة إتمام
                </h1>

                <div className="mb-8">
                    <p className="text-xl mb-2">نشهد أن</p>
                    <p className="text-3xl font-bold text-primary-800 mb-4">
                        {studentName}
                    </p>
                    <p className="text-xl">قد أتم بنجاح</p>
                    <p className="text-2xl font-bold text-primary-700 mt-2">
                        {courseName}
                    </p>
                </div>

                <div className="mb-8">
                    <p className="text-lg">بنسبة إتمام</p>
                    <p className="text-3xl font-bold text-primary-600 mt-1">
                        {progress}%
                    </p>
                </div>

                <div className="text-gray-600">
                    <p>صدرت في</p>
                    <p className="font-semibold">
                        {/* {format(new Date(issueDate), "dd MMMM yyyy", {
                            locale: ar,
                        })} */}
                        {new Date().getFullYear()}
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex justify-center items-center">
                        <div className="text-center mx-8">
                            <div className="w-32 h-px bg-gray-400 mb-2"></div>
                            <p className="text-gray-600">توقيع المدير</p>
                        </div>
                        <div className="text-center mx-8">
                            <div className="w-32 h-px bg-gray-400 mb-2"></div>
                            <p className="text-gray-600">ختم المؤسسة</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCertificate;
