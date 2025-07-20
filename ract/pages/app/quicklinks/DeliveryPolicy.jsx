/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function DeliveryPolicy() {
    const delivery = [
        `
        مهمتنا الأولى هي أن نقدم لك أفضل تجربة تسوق عبر الإنترنت، لذلك سهلنا عليك شحنتك بسهولة لأن راحتك هي أولويتنا
        `,

        `
        تقوم  رياده التعليم بتوصيل طلباتك بشكل أساسي من خلال طرف ثالث لضمان شحن طلبك في الوقت المناسب.
        `,

        `
        طريقة التوصيل في رياده التعليم  هي التوصيل خلال يومين إلى أربعة أيام كحد أقصى، اعتمادًا على منطقتك الجغرافية، مما يتيح لك خيار اختيار الوقت المناسب لك للتوصيل في أي وقت خلال اليوم أو الأسبوع أو حتى خلال الشهر.
        `,

        `
        في حالة الطلبات العاجلة، يرجى الاتصال بخدمة العملاء وسنبذل قصارى جهدنا لمساعدتك.
        `,

        `       
        سنطلب توقيعك على نسخة من الفاتورة لتأكيد استلام البضاعة. سنقوم بتسليم الطلب إلى العنوان المسجل، ونعتبر توقيع أي شخص في العنوان بمثابة إيصال للطلب.
        `,
        `
        إذا لم يكن هناك أحد في العنوان المسجل لاستلام طلبك، فسنطلب منك الاتصال بخدمة العملاء لدينا للموافقة على وقت تسليم آخر. لا تستطيع الشركة محاولة التسليم أكثر من مرتين. الشركة ليست مسؤولة عن أي طلب يتجاوز 7 أيام من محاولة التسليم الأولى.
        `,

        `       
        يتم تنفيذ الطلبات الموجودة في المخزون في غضون 5-7 أيام عمل.
        `,

        `
        يتم تنفيذ الطلبات المصنوعة حسب الطلب وفقًا لوقت الإنتاج الفردي المذكور في صفحة وصف المنتج.
        `,

        `
        تكلفة التسليم هي إما
        `,

        `
        يتم حسابها عند الخروج بناءً على المنتج وعنوان التسليم
        `,

        `
        يتم تحديدها بعد الطلب للطلبات الخاصة، ويتم تضمينها في الرصيد النهائي لطلبك
        `,

        `       
        وقت التسليم
        `,

        `
        سيتم تزويدك بوقت تسليم تقديري بمجرد تقديم طلبك. أوقات التسليم تقديرية وتبدأ من تاريخ الشحن، وليس تاريخ الطلب. يجب استخدام أوقات التسليم كدليل فقط وتخضع لقبول طلبك والموافقة عليه.
        `,

        `
        ما لم تكن هناك ظروف استثنائية، فإننا نبذل قصارى جهدنا لتلبية طلبك في غضون 5 أيام عمل من تاريخ طلبك. أيام العمل هي من السبت إلى الجمعة، باستثناء العطلات الرسمية.
        `,

        `
        قد يختلف تاريخ التسليم بسبب ممارسات الشحن الخاصة بالناقل، وموقع التسليم، وطريقة التسليم، والعناصر المطلوبة. قد يتم تسليم المنتجات أيضًا في شحنات منفصلة.
        `,

        `
        لمعرفة تكلفة طلبك، ما عليك سوى إضافة العناصر التي ترغب في شرائها إلى عربة التسوق الخاصة بك، ثم الانتقال إلى صفحة الدفع. بمجرد الوصول إلى شاشة الدفع، سيتم عرض رسوم الشحن.
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
                                سياسة التوصيل
                            </h1>
                            <p
                                data-aos="fade-down"
                                className="text-center md:text-start text-xl mb-8 w-full text-gray-500 aos-init aos-animate"
                            >
                                يرجى العلم أن أيام العمل الرسمية في رياده
                                التعليم من الأحد إلى الخميس. الجمعة والسبت
                                والأعياد والعطلات الرسمية هي عطلات لجميع موظفي
                                رياده التعليم وشركات الشحن
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="flex items-start flex-col justify-center md:items-start">
                            <ul className="space-y-2 flex flex-col gap-10">
                                {delivery &&
                                    delivery?.map((term, index) => (
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

export default DeliveryPolicy;
