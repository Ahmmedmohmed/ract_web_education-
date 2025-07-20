/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function RefundPolicy() {
    const refund = [
        `    
        – لديك 14 يومًا لإعادة المنتجات المباعة بعد الاستلام و سيتم خصم تكلفة الشحن من خلال المرتجع في حساب العميل الخاص بك أو الاتصال على رقم خدمة العملاء () أو عبر الإيميل
        `,

        `
        – إذا كانت السلعة شابها عيب أو لا تعمل بصورة صحيحة او حتى لا تطابق وصف الموقع أو مزيفة أو تم استلامها تالفة نتيجة النقل والشحن ، يكون لك الحق فى استرجاعها خلال 30 يوم من تاريخ استلامها مجاناَ، وسوف يتم رد قيمة السلعة إليكم خلال مدة اقصها 14 يوم عمل.
        `,

        `
        – عند إرجاع المنتج, تأكد من وجود جميع الملحقات والملصقات الخاصة بالطلب بحالتها السليمة وأن المنتج فى عبوته الاصلية بحلتها السليمة التى تم الاستلام بها و أن العبوة مغلقة بغلق المصنع (فى حالة الأستبدال خلال 14 يوم )وايضاَ المشتملات فى حالة أذا كان المنتج شامل هداية أو ملحقات أستثنائية. إذا قمت بإنشاء كلمة مرور للجهاز الذى ترغب فى إسترجاعه, فيرجى التأكد من إزالته و إلا لن يتم اكمال الطلب بشكل صحيح و ذلك للمنتجات التى تظهر بها عيوب صناعة خلال 30 يوم من الشراء و ينطبق على حالة أرجاعها أستلامها بكافة المشتملات و الملصقات و عبوة الجهاز بحلتها السليمة.
        `,

        `
        بعض المنتجات لا يمكن استرجاعها و هى:
        `,

        `
        المنتجات التالفة (باستثناء تلف النقل)
        `,

        `
        المنتجات التي ليست في عبواتها الأصلية
        `,

        `
        المنتجات التي لا تشمل جميع الملحقات
        `,

        `
        المنتجات غير المختومة من مجموعات المنتجات التالية
        `,
    ];

    return (
        <>
            <div className="py-40 relative bg-white text-black">
                <div className="relative container mx-auto py-20 px-4 min-h-dvh">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="flex items-center flex-col justify-center md:items-start">
                            <h1
                                data-aos="fade-down"
                                className="text-center md:text-start text-4xl md:text-6xl font-bold mb-6 w-full  aos-init aos-animate"
                            >
                                سياسة استرداد الأموال
                            </h1>
                            <p
                                data-aos="fade-down"
                                className="text-center md:text-start text-xl mb-8 w-full text-gray-500 aos-init aos-animate"
                            >
                                ستمتع بالتسوق مع ميزات سياسة الإرجاع التالية:
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="flex items-start flex-col justify-center md:items-start">
                            <ul className="space-y-2 flex flex-col gap-10">
                                {refund &&
                                    refund?.map((term, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/termsandconditions`}
                                                aria-current="page"
                                                className="hover:ps-2 text-gray-700 hover:text-black flex items-start gap-5 transition-all active text-2xl"
                                                href="/"
                                                data-discover="true"
                                            >
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-chevrons-left  text-2xl"
                                                    >
                                                        <path d="m11 17-5-5 5-5" />
                                                        <path d="m18 17-5-5 5-5" />
                                                    </svg>
                                                </span>

                                                <span>{term}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RefundPolicy;
