/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function TermsAndConditions() {
    const terms = [
        `
        ١. تتعارض مع صورة  العامة أو النية الحسنة أو السمعة.
        `,

        `
        ٢. الترويج لأي نشاط أو محتوى غير قانوني، بما في ذلك على سبيل المثال لا الحصر إساءة معاملة الأطفال أو الحيوانات والعنف والاستخدام غير المشروع للمخدرات والشرب دون السن القانونية.
        `,

        `
        ٣. تنتهك حقوق الطبع والنشر أو براءات الاختراع أو العلامات التجارية أو الأسرار التجارية أو غيرها من حقوق الملكية أو حقوق الدعاية أو الخصوصية الخاصة بنا أو بشركات أخري.
        `,

        `
        ٤. عدم مشاركة صريحة أو ضمنية أيًا من بياناتك أو أنشطتك أو أسبابك قد أقرناها، دون موافقتنا الخطية المسبقة في كل حالة.
        `,
        `
        ٥. انتهاك أي قانون أو قانون أو مرسوم أو لائحة معمول بها في البلاد، أو تشجيع أي سلوك يمكن أن يشكل جريمة جنائية أو ينشأ عنه مسؤولية مدنية.
        `,

        `
        ٦. التشهير أو تشهيرية أو تهديدية أو مضايقة أو اقتحام للخصوصية أو مسيئة أو مؤذية أو كراهية أو تمييزية أو إباحية أو فاحشة.
        `,

        `
        ٧. إرسال أي سر تجاري أو معلومات أخرى أو معلومات غير عامة عن أي شخص أو شركة أو كيان دون الحصول على إذن بذلك.
        `,

        `
        ٨. تقييد أو منع أي زائر آخر من استخدام منصة ، بما في ذلك، على سبيل المثال لا الحصر، عن طريق “اختراق” أو تشويه أي جزء من منصة  أو تعديل، تتغيير، ترخيص فرعي، ترجمة، بيع، هندسة عكسية، إلغاء ترجمة، أو فك أي جزء من منصة ا .
        `,

        `
        ٩. إزالة أي حقوق نشر أو علامة تجارية أو غيرها من إشعارات حقوق الملكية الواردة في منصة   .
        `,

        `
        ١٠. الباطن أو البيع أو الإيجار أو التأجير أو النقل أو التنازل عن أو نقل أي حقوق بموجب الشروط إلى أي طرف ثالث، أو الاستغلال التجاري أو الربح بطريقة أخرى من المعلومات أو محتوى منصة  أو أي جزء منها، بأي شكل من الأشكال، باستثناء ما هو مسموح به صراحة هنا.
        `,

        `
        ١١. “طباعه” أو “نسخ” أي جزء من منصة  دون إذن خطي مسبق منا.
        `,

        `
        ١٢. توزيع أي فيروس أو فيروس متنقل أو أي ملفات أو نصوص برمجية أو برامج مشابهة أو ضارة.
        `,

        `
        ١٣. التدخل مع أو تعطل أي خدمات أو معدات بقصد التسبب في حمل زائد أو غير متناسب على البنية التحتية لشركة  أو الجهات المرخصة لها أو مورديها.
        `,

        `
        ١٤. تنطوي على إعداد أو توزيع البريد غير المرغوب فيه أو الرسائل غير المرغوب فيها أو سلسلة الرسائل أو المخططات الهرمية أو غيرها من رسائل البريد الإلكتروني التجارية الضخمة أو غير المرغوب فيها أو تنتهك بأي شكل من الأشكال قانون مكافحة الاعتداء على المواد الإباحية والتسويق غير المسموح بها (كان سبام أكت ٢٠٠٣) أو ما يعادلها، المعمول بها، القانون الأجنبي.
        `,

        `
        ١٥. استخدام أي روبوت، أو شبكة، أو تطبيق للبحث / استرجاع الموقع، أو أي جهاز أو عملية أخرى يدوية أو أوتوماتيكية لاسترداد أو فهرسة “مخزن البيانات” في منصة أو إعادة إنتاج أو التحايل على أي شكل من الأشكال الهيكل الملاحي أو العرض التقديمي لمنصة  أو المحتويات والمصادقة والتدابير الأمنية.
        `,

        `
        ١٦. تزوير العناوين أو الهويات أو التلاعب بمعرفات الهوية من أجل إخفاء أصل أي إرسال.
        `,

        `
        ١٧. تنفيذ أي شكل من أشكال مراقبة الشبكة أو تشغيل محلل شبكة أو حزمة بحث أو تقنية أخرى لاعتراض أو فك شفرة أو استخراج أو عرض أي حزم تستخدم للاتصال بين خوادم  للنظام الأساسي أو أي بيانات غير مخصصة لك ، الصورة. حصاد أو جمع معلومات حول أي زائر أو أعضاء من منصة دون موافقتهم الصريحة؛ و / أو
        `,
        `
        ١٨. يحتوي على أي إشارة إلى أو تشبه أي أطراف ثالثة محددة، ما لم يتم الحصول على موافقة من جميع هؤلاء الأفراد وأولياء أمورهم / الوصي القانوني إذا كانوا تحت سن الرشد حسب قانون الدولة.. 
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
                                الأحكام والشروط
                            </h1>
                            <p
                                data-aos="fade-down"
                                className="text-center md:text-start text-xl mb-8 w-full text-gray-500 aos-init aos-animate"
                            >
                                كجزء من سياسة الاستخدام المقبول ، فإنك توافق على
                                عدم استخدام المعلومات أو الخدمات أو أي جزء آخر
                                من منصة ا لاتخاذ أي إجراء أو إجراءات من شأنها:
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="flex items-start flex-col justify-center md:items-start">
                            <ul className="space-y-2 flex flex-col gap-10">
                                {terms &&
                                    terms?.map((term, index) => (
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

                                {/* <li>
                                    <a
                                        aria-current="page"
                                        className="hover:ps-2 text-gray-700 hover:text-black flex items-center gap-2 transition-all active"
                                        href="/"
                                        data-discover="true"
                                    >
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
                                            className="lucide lucide-chevrons-left"
                                        >
                                            <path d="m11 17-5-5 5-5" />
                                            <path d="m18 17-5-5 5-5" />
                                        </svg>
                                        <span>المنتجات</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        aria-current="page"
                                        className="hover:ps-2 text-gray-700 hover:text-black flex items-center gap-2 transition-all active"
                                        href="/"
                                        data-discover="true"
                                    >
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
                                            className="lucide lucide-chevrons-left"
                                        >
                                            <path d="m11 17-5-5 5-5" />
                                            <path d="m18 17-5-5 5-5" />
                                        </svg>
                                        <span>من نحن</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        aria-current="page"
                                        className="hover:ps-2 text-gray-700 hover:text-black flex items-center gap-2 transition-all active"
                                        href="/"
                                        data-discover="true"
                                    >
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
                                            className="lucide lucide-chevrons-left"
                                        >
                                            <path d="m11 17-5-5 5-5" />
                                            <path d="m18 17-5-5 5-5" />
                                        </svg>
                                        <span>اتصل بنا</span>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsAndConditions;
