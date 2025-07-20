import React from "react";

// utils

// assets
import error500 from "../../assets/images/error/error-500.webp";

function ProblemData() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                {/* <h1 className="text-9xl font-bold text-primary-600">404</h1> */}
                <div className="max-w-60 max-h-60">
                    <img
                        src={error500}
                        alt={error500}
                        onError={(e) => {
                            e.target.src = error500;
                            e.target.onerror = null; // لمنع التكرار إذا فشلت الصورة الافتراضية
                        }}
                        className="max-w-60 max-h-60"
                    />
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-2">
                    حدثت مشكلة ما
                </h2>

                <p className="text-gray-600 mb-8 max-w-md">
                    حدثة مشكلة أثناء جلب البيانات الرجاء المحاولاة لاحقا.
                </p>
            </div>
        </>
    );
}

export default ProblemData;
