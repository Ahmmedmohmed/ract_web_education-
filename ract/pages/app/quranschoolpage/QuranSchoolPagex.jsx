/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

const pricingConfig = {
    hifz: { egp: 1200, sar: 250, usd: 98 },
    murajaa: { egp: 1200, sar: 250, usd: 98 },
    ijaza: { egp: 1200, sar: 250, usd: 98 },
};

// Simplified exchange rates for demonstration. A real app would use a live API.
// Rates are based on the zone's base currency.
const exchangeRates = {
    egp: { SYP: 320, LBP: 2250, TRY: 8.2, SDG: 15, NGN: 35, ILS: 3.7 },
    sar: {
        AED: 0.98,
        KWD: 0.08,
        QAR: 0.98,
        BHD: 0.1,
        OMR: 0.1,
        IQD: 350,
        JOD: 0.19,
        IDR: 4000,
        MYR: 1.25,
        PKR: 75,
        BDT: 32,
    },
    usd: {
        EUR: 0.92,
        GBP: 0.79,
        CAD: 1.37,
        AUD: 1.5,
        AZN: 1.7,
        ALL: 93,
        BAM: 1.8,
        BGN: 1.8,
        BYN: 3.2,
        CHF: 0.89,
        CNY: 7.2,
        GEL: 2.8,
        JPY: 157,
        KGS: 87,
        KZT: 445,
        MKD: 57,
        MNT: 3450,
        MXN: 18,
        MYR: 4.7,
        NOK: 10.5,
        PLN: 3.9,
        RUB: 88,
        SEK: 10.4,
        SGD: 1.35,
        TJS: 10.8,
        UAH: 40.5,
        UZS: 12600,
    },
};

const countries = [
    { name: "أذربيجان", code: "994", iso: "az", currency: "AZN", zone: "usd" },
    { name: "الأرجنتين", code: "54", iso: "ar", currency: "ARS", zone: "usd" },
    { name: "الأردن", code: "962", iso: "jo", currency: "JOD", zone: "sar" },
    { name: "إسبانيا", code: "34", iso: "es", currency: "EUR", zone: "usd" },
    { name: "أستراليا", code: "61", iso: "au", currency: "AUD", zone: "usd" },
    { name: "أفغانستان", code: "93", iso: "af", currency: "AFN", zone: "sar" },
    { name: "ألبانيا", code: "355", iso: "al", currency: "ALL", zone: "usd" },
    { name: "ألمانيا", code: "49", iso: "de", currency: "EUR", zone: "usd" },
    { name: "الإمارات", code: "971", iso: "ae", currency: "AED", zone: "sar" },
    { name: "أندورا", code: "376", iso: "ad", currency: "EUR", zone: "usd" },
    { name: "إندونيسيا", code: "62", iso: "id", currency: "IDR", zone: "sar" },
    { name: "أنغولا", code: "244", iso: "ao", currency: "AOA", zone: "egp" },
    { name: "أوغندا", code: "256", iso: "ug", currency: "UGX", zone: "egp" },
    { name: "أوكرانيا", code: "380", iso: "ua", currency: "UAH", zone: "usd" },
    { name: "أوزبكستان", code: "998", iso: "uz", currency: "UZS", zone: "sar" },
    { name: "إيران", code: "98", iso: "ir", currency: "IRR", zone: "sar" },
    { name: "أيرلندا", code: "353", iso: "ie", currency: "EUR", zone: "usd" },
    { name: "إيطاليا", code: "39", iso: "it", currency: "EUR", zone: "usd" },
    { name: "إثيوبيا", code: "251", iso: "et", currency: "ETB", zone: "egp" },
    { name: "باكستان", code: "92", iso: "pk", currency: "PKR", zone: "sar" },
    { name: "البحرين", code: "973", iso: "bh", currency: "BHD", zone: "sar" },
    { name: "البرازيل", code: "55", iso: "br", currency: "BRL", zone: "usd" },
    { name: "البرتغال", code: "351", iso: "pt", currency: "EUR", zone: "usd" },
    { name: "بروناي", code: "673", iso: "bn", currency: "BND", zone: "sar" },
    { name: "بلجيكا", code: "32", iso: "be", currency: "EUR", zone: "usd" },
    { name: "بلغاريا", code: "359", iso: "bg", currency: "BGN", zone: "usd" },
    { name: "بنغلاديش", code: "880", iso: "bd", currency: "BDT", zone: "sar" },
    {
        name: "البوسنة والهرسك",
        code: "387",
        iso: "ba",
        currency: "BAM",
        zone: "usd",
    },
    { name: "بولندا", code: "48", iso: "pl", currency: "PLN", zone: "usd" },
    { name: "بيلاروسيا", code: "375", iso: "by", currency: "BYN", zone: "usd" },
    { name: "تايلاند", code: "66", iso: "th", currency: "THB", zone: "usd" },
    { name: "تنزانيا", code: "255", iso: "tz", currency: "TZS", zone: "egp" },
    { name: "توغو", code: "228", iso: "tg", currency: "XOF", zone: "egp" },
    { name: "تركيا", code: "90", iso: "tr", currency: "TRY", zone: "egp" },
    {
        name: "تركمانستان",
        code: "993",
        iso: "tm",
        currency: "TMT",
        zone: "sar",
    },
    { name: "تشاد", code: "235", iso: "td", currency: "XAF", zone: "egp" },
    { name: "تونس", code: "216", iso: "tn", currency: "TND", zone: "egp" },
    { name: "جزر القمر", code: "269", iso: "km", currency: "KMF", zone: "sar" },
    { name: "الجزائر", code: "213", iso: "dz", currency: "DZD", zone: "egp" },
    {
        name: "جنوب أفريقيا",
        code: "27",
        iso: "za",
        currency: "ZAR",
        zone: "egp",
    },
    { name: "جورجيا", code: "995", iso: "ge", currency: "GEL", zone: "usd" },
    { name: "جيبوتي", code: "253", iso: "dj", currency: "DJF", zone: "egp" },
    { name: "روسيا", code: "7", iso: "ru", currency: "RUB", zone: "usd" },
    {
        name: "ساحل العاج",
        code: "225",
        iso: "ci",
        currency: "XOF",
        zone: "egp",
    },
    { name: "سريلانكا", code: "94", iso: "lk", currency: "LKR", zone: "sar" },
    { name: "السعودية", code: "966", iso: "sa", currency: "SAR", zone: "sar" },
    { name: "السنغال", code: "221", iso: "sn", currency: "XOF", zone: "egp" },
    { name: "سنغافورة", code: "65", iso: "sg", currency: "SGD", zone: "usd" },
    { name: "سوريا", code: "963", iso: "sy_opp", currency: "SYP", zone: "egp" },
    { name: "سورينام", code: "597", iso: "sr", currency: "SRD", zone: "sar" },
    { name: "السويد", code: "46", iso: "se", currency: "SEK", zone: "usd" },
    { name: "سويسرا", code: "41", iso: "ch", currency: "CHF", zone: "usd" },
    { name: "سيراليون", code: "232", iso: "sl", currency: "SLL", zone: "egp" },
    { name: "الصين", code: "86", iso: "cn", currency: "CNY", zone: "usd" },
    { name: "الصومال", code: "252", iso: "so", currency: "SOS", zone: "egp" },
    { name: "طاجيكستان", code: "992", iso: "tj", currency: "TJS", zone: "sar" },
    { name: "العراق", code: "964", iso: "iq", currency: "IQD", zone: "sar" },
    { name: "عُمان", code: "968", iso: "om", currency: "OMR", zone: "sar" },
    { name: "الغابون", code: "241", iso: "ga", currency: "XAF", zone: "egp" },
    { name: "غامبيا", code: "220", iso: "gm", currency: "GMD", zone: "egp" },
    { name: "غانا", code: "233", iso: "gh", currency: "GHS", zone: "egp" },
    { name: "غيانا", code: "592", iso: "gy", currency: "GYD", zone: "sar" },
    { name: "غينيا", code: "224", iso: "gn", currency: "GNF", zone: "egp" },
    {
        name: "غينيا بيساو",
        code: "245",
        iso: "gw",
        currency: "XOF",
        zone: "egp",
    },
    { name: "فرنسا", code: "33", iso: "fr", currency: "EUR", zone: "usd" },
    { name: "فلسطين", code: "970", iso: "ps", currency: "ILS", zone: "egp" },
    { name: "الفلبين", code: "63", iso: "ph", currency: "PHP", zone: "usd" },
    { name: "فنلندا", code: "358", iso: "fi", currency: "EUR", zone: "usd" },
    { name: "قبرص", code: "357", iso: "cy", currency: "EUR", zone: "usd" },
    { name: "قطر", code: "974", iso: "qa", currency: "QAR", zone: "sar" },
    {
        name: "قيرغيزستان",
        code: "996",
        iso: "kg",
        currency: "KGS",
        zone: "sar",
    },
    { name: "كازاخستان", code: "7", iso: "kz", currency: "KZT", zone: "sar" },
    { name: "الكاميرون", code: "237", iso: "cm", currency: "XAF", zone: "egp" },
    { name: "كمبوديا", code: "855", iso: "kh", currency: "KHR", zone: "usd" },
    { name: "كندا", code: "1", iso: "ca", currency: "CAD", zone: "usd" },
    { name: "كوسوفو", code: "383", iso: "xk", currency: "EUR", zone: "usd" },
    { name: "الكويت", code: "965", iso: "kw", currency: "KWD", zone: "sar" },
    { name: "كينيا", code: "254", iso: "ke", currency: "KES", zone: "egp" },
    { name: "لبنان", code: "961", iso: "lb", currency: "LBP", zone: "egp" },
    { name: "ليبيا", code: "218", iso: "ly", currency: "LYD", zone: "egp" },
    { name: "مالي", code: "223", iso: "ml", currency: "XOF", zone: "egp" },
    { name: "ماليزيا", code: "60", iso: "my", currency: "MYR", zone: "sar" },
    { name: "مصر", code: "20", iso: "eg", currency: "EGP", zone: "egp" },
    { name: "المغرب", code: "212", iso: "ma", currency: "MAD", zone: "egp" },
    {
        name: "مقدونيا الشمالية",
        code: "389",
        iso: "mk",
        currency: "MKD",
        zone: "usd",
    },
    { name: "المكسيك", code: "52", iso: "mx", currency: "MXN", zone: "usd" },
    {
        name: "المملكة المتحدة",
        code: "44",
        iso: "gb",
        currency: "GBP",
        zone: "usd",
    },
    { name: "المالديف", code: "960", iso: "mv", currency: "MVR", zone: "sar" },
    { name: "منغوليا", code: "976", iso: "mn", currency: "MNT", zone: "usd" },
    { name: "موريتانيا", code: "222", iso: "mr", currency: "MRU", zone: "egp" },
    { name: "موزمبيق", code: "258", iso: "mz", currency: "MZN", zone: "egp" },
    { name: "النرويج", code: "47", iso: "no", currency: "NOK", zone: "usd" },
    { name: "النمسا", code: "43", iso: "at", currency: "EUR", zone: "usd" },
    { name: "النيجر", code: "227", iso: "ne", currency: "XOF", zone: "egp" },
    { name: "الهند", code: "91", iso: "in", currency: "INR", zone: "sar" },
    { name: "هولندا", code: "31", iso: "nl", currency: "EUR", zone: "usd" },
    { name: "اليابان", code: "81", iso: "jp", currency: "JPY", zone: "usd" },
    { name: "اليمن", code: "967", iso: "ye", currency: "YER", zone: "sar" },
    { name: "اليونان", code: "30", iso: "gr", currency: "EUR", zone: "usd" },
].sort((a, b) => a.name.localeCompare(b.name, "ar"));

const hifzData = [
    {
        year: "السَّنَةُ التَّمْهِيدِيَّةُ",
        hifz: "جُزْءَانِ (مِنْ سُورَةِ النَّاسِ إِلَى تَبَارَكَ)",
        olum: "التَّجْوِيدُ المُيَسَّرُ، آدَابُ حَمَلَةِ القُرْآنِ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الأَوَّلُ",
        hifz: "3 أَجْزَاءٍ (مِنَ التَّحْرِيمِ إِلَى الأَحْقَافِ)",
        olum: "تُحْفَةُ الأَطْفَالِ، آدَابُ حَمَلَةِ القُرْآنِ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الثَّانِي",
        hifz: "3.5 أَجْزَاءٍ (مِنَ الجَاثِيَةِ إِلَى سَبَأٍ)",
        olum: "الجَزَرِيَّةُ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الثَّالِثُ",
        hifz: "4 أَجْزَاءٍ (مِنَ الأَحْزَابِ إِلَى المُؤْمِنُونَ)",
        olum: "الجَزَرِيَّةُ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الرَّابِعُ",
        hifz: "5.5 أَجْزَاءٍ (مِنَ الحَجِّ إِلَى يُوسُفَ)",
        olum: "مُحَاضَرَاتٌ فِي عُلُومِ القُرْآنِ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الخَامِسُ",
        hifz: "5.5 أَجْزَاءٍ (مِنْ هُودٍ إِلَى الأَنْعَامِ)",
        olum: "القَوَاعِدُ الحِسَانُ، شَرْحُ أُصُولِ التَّفْسِيرِ، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ السَّادِسُ",
        hifz: "6.5 أَجْزَاءٍ (مِنَ المَائِدَةِ إِلَى البَقَرَةِ)",
        olum: "مُتَشَابِهَاتُ القُرْآنِ لِلطَّيَّار، تَفْسِيرُ الجَلَالَيْنِ، أَسْبَابُ النُّزُولِ",
    },
];

const testRanges = {
    الأول: "من سورة الناس إلى سورة تبارك",
    الثاني: "من سورة الناس إلى سورة الأحقاف",
    الثالث: "من سورة الناس إلى سورة سبأ",
    الرابع: "من سورة الناس إلى سورة المؤمنون",
    الخامس: "من سورة الناس إلى سورة يوسف",
    السادس: "من سورة الناس إلى سورة الأنعام",
};

const murajaaData = {
    level1: {
        title: "خُطَّةُ الخَتْمِ فِي عَامَيْنِ",
        table: `<thead><tr><th>رقم الختمة</th><th>التسميع اليومي</th><th>الأيام أسبوعيًا</th><th>مدة الختمة</th></tr></thead><tbody><tr><td>1</td><td>6 صفحات</td><td>2</td><td>12 شهرًا</td></tr><tr><td>2</td><td>12 صفحة</td><td>2</td><td>6 أشهر</td></tr><tr><td>3</td><td>16 صفحة</td><td>3</td><td>3 أشهر</td></tr><tr><td>4</td><td>جزء كامل</td><td>5</td><td>شهر واحد</td></tr></tbody></table>`,
    },
    level2: {
        title: "خُطَّةُ الخَتْمِ فِي عَامٍ",
        table: `<thead><tr><th>رقم الختمة</th><th>التسميع اليومي</th><th>الأيام أسبوعيًا</th><th>مدة الختمة</th></tr></thead><tbody><tr><td>1</td><td>12 صفحة</td><td>2</td><td>6 أشهر</td></tr><tr><td>2</td><td>16 صفحة</td><td>3</td><td>3 أشهر</td></tr><tr><td>3</td><td>جزء كامل</td><td>5</td><td>شهر واحد</td></tr></tbody></table>`,
    },
    level3: {
        title: "خُطَّةُ الخَتْمِ فِي 6 أَشْهُرٍ",
        table: `<thead><tr><th>رقم الختمة</th><th>التسميع اليومي</th><th>الأيام أسبوعيًا</th><th>مدة الختمة</th></tr></thead><tbody><tr><td>1</td><td>16 صفحة</td><td>3</td><td>3 أشهر</td></tr><tr><td>2</td><td>جزء كامل</td><td>5</td><td>شهر واحد</td></tr></tbody></table>`,
    },
};

const ijazahData = [
    "خَتْمُ القُرْآنِ 3 مَرَّاتٍ.",
    "لَا تَتَجَاوَزُ مُدَّةُ الإِجَازَةِ عَامًا.",
    "تَسْمِيعُ جُزْءٍ كَامِلٍ فِي الحَلْقَةِ.",
    "الحُصُولُ عَلَى إِجَازَةٍ فِي الجَزَرِيَّةِ.",
    "اجْتِيَازُ الاخْتِبَارِ النِّهَائِيِّ بِنَجَاحٍ.",
];

const testAppointments = [
    { day: "الأحد، 29 يونيو 2025", time: "11:00 صباحًا" },
    { day: "الأحد، 29 يونيو 2025", time: "05:00 مساءً" },
    { day: "الثلاثاء، 1 يوليو 2025", time: "10:00 صباحًا" },
    { day: "الثلاثاء، 1 يوليو 2025", time: "06:00 مساءً" },
];

const Header = () => (
    <header
        className="bg-gradient-to-r from-gray-900 to-gray-800 bg-cover bg-center text-white py-32 text-center"
        style={{
            backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1599182392134-269389a4288e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY4OTU5OTM0N3w&lib=rb-4.0.3&q=80&w=1600')",
        }}
    >
        <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-5">مَدرَسَةُ القُرْآنِ</h1>
            <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                رِحْلَتُكَ المُتكَامِلَةُ لِحِفْظِ كِتَابِ اللهِ وتَدَبُّرِهِ.
            </p>
            <div className="space-x-4">
                <a
                    href="#tracks"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg inline-block transition-colors"
                >
                    اكْتَشِفِ المَسَارَاتِ
                </a>
                <a
                    href="#faq"
                    className="border-2 border-white hover:bg-white hover:text-blue-500 text-white font-bold py-4 px-8 rounded-lg inline-block transition-colors"
                >
                    الأَسْئِلَةُ الشَّائِعَةُ
                </a>
            </div>
        </div>
    </header>
);

const Features = () => (
    <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            لِمَاذَا تَخْتَارُ مَدرَسَتَنَا؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-100">
                <i className="fas fa-users text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-2xl font-semibold mb-3">
                    فُصُولٌ مُصَغَّرَةٌ
                </h3>
                <p className="text-gray-700">
                    8 طُلَّابٍ فَقَطْ فِي كُلِّ فَصْلٍ لِضَمَانِ أَقْصَى
                    دَرَجَاتِ التَّرْكِيزِ.
                </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-100">
                <i className="fas fa-book-open-reader text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-2xl font-semibold mb-3">
                    مَنْهَجٌ عِلْمِيٌّ مُتَكَامِلٌ
                </h3>
                <p className="text-gray-700">
                    بِجَانِبِ الحِفْظِ، يَدْرُسُ الطَّالِبُ التَّجْوِيدَ،
                    والتَّفْسِيرَ، وعُلُومَ القُرْآنِ.
                </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-100">
                <i className="fas fa-tasks text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-2xl font-semibold mb-3">
                    اخْتِبَارُ تَحْدِيدِ مُسْتَوَى
                </h3>
                <p className="text-gray-700">
                    نَضْمَنُ وُجُودَكَ فِي المُسْتَوَى المُنَاسِبِ لَكَ مِنْ
                    خِلَالِ اخْتِبَارِ قَبُولٍ.
                </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-100">
                <i className="fas fa-chart-line text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-2xl font-semibold mb-3">
                    اخْتِبَارَاتٌ دَوْرِيَّةٌ
                </h3>
                <p className="text-gray-700">
                    لِضَمَانِ الجَوْدَةِ، تُجْرَى اخْتِبَارَاتٌ شَهْرِيَّةٌ،
                    نِصْفُ سَنَوِيَّةٍ، وسَنَوِيَّةٌ.
                </p>
            </div>
        </div>
    </section>
);

const Faq = () => (
    <section id="faq" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            أَسْئِلَةٌ شَائِعَةٌ
        </h2>
        <div className="max-w-4xl mx-auto">
            <details className="bg-white mb-3 rounded-lg border border-gray-200 overflow-hidden">
                <summary className="p-6 text-xl font-semibold cursor-pointer relative">
                    كَيْفَ يَتِمُّ تَحْدِيدُ نِظَامِ الدَّفْعِ؟
                    <span className="fas fa-chevron-down absolute left-6 top-7 transition-transform"></span>
                </summary>
                <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-loose">
                        يُمْكِنُكَ اخْتِيَارُ الدَّفْعِ مَرَّةً وَاحِدَةً
                        سَنَوِيًّا والاسْتِفَادَةُ مِنْ خَصْمٍ، أَوْ الدَّفْعُ
                        عَلَى دُفْعَتَيْنِ كُلَّ فَصْلٍ دِرَاسِيٍّ.
                    </p>
                </div>
            </details>
            <details className="bg-white mb-3 rounded-lg border border-gray-200 overflow-hidden">
                <summary className="p-6 text-xl font-semibold cursor-pointer relative">
                    مَاذَا لَوْ فَاتَنِي أَحَدُ الفُصُولِ؟
                    <span className="fas fa-chevron-down absolute left-6 top-7 transition-transform"></span>
                </summary>
                <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-loose">
                        يَتِمُّ تَسْجِيلُ جَمِيعِ الفُصُولِ ويُمْكِنُكَ
                        الرُّجُوعُ إِلَيْهَا فِي أَيِّ وَقْتٍ مِنْ خِلَالِ
                        لَوْحَةِ التَّحَكُّمِ الخَاصَّةِ بِكَ.
                    </p>
                </div>
            </details>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-blue-800 text-white py-10 text-center">
        <div className="container mx-auto px-4">
            <p>
                &copy; 2025 [اسم المنصة التعليمية]. جَمِيعُ الحُقُوقِ
                مَحْفُوظَةٌ.
            </p>
        </div>
    </footer>
);

const CustomCountrySelect = ({ onCountryChange, resetKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const selectRef = useRef(null);

    useEffect(() => {
        setSelectedCountry(null);
    }, [resetKey]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target))
                setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [selectRef]);

    const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        onCountryChange(country);
    };

    const getFlagUrl = (country) => {
        if (country.iso === "sy_opp") {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/20px-Flag_of_Syria.svg.png";
        }
        return `https://flagcdn.com/w20/${country.iso.toLowerCase()}.png`;
    };

    return (
        <div className="relative" ref={selectRef}>
            <div
                className={`flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer ${
                    isOpen ? "border-blue-500" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCountry ? (
                    <div className="flex items-center">
                        <img
                            className="w-5 h-5 ml-2"
                            src={getFlagUrl(selectedCountry)}
                            alt={`${selectedCountry.name} flag`}
                        />
                        <span>{selectedCountry.name}</span>
                    </div>
                ) : (
                    <span>-- الرَّجَاءُ الاخْتِيَارُ --</span>
                )}
                <span
                    className={`fas fa-chevron-down transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                ></span>
            </div>
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                        <div
                            key={country.iso}
                            className="flex items-center p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleSelect(country)}
                        >
                            <img
                                className="w-5 h-5 ml-2"
                                src={getFlagUrl(country)}
                                alt={`${country.name} flag`}
                            />
                            <span>{country.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PricingSummary = ({
    trackType,
    selectedCountry,
    paymentPlan,
    setPaymentPlan,
}) => {
    if (!selectedCountry) return null;

    const { zone, currency } = selectedCountry;
    const basePrice = pricingConfig[trackType][zone];

    let rate = 1;
    if (zone === "egp" && currency !== "EGP")
        rate = exchangeRates.egp[currency] || 1;
    else if (zone === "sar" && currency !== "SAR")
        rate = exchangeRates.sar[currency] || 1;
    else if (zone === "usd" && currency !== "USD")
        rate = exchangeRates.usd[currency] || 1;

    const localPrice = Math.round(basePrice * rate);
    const deposit = Math.round(localPrice * 0.1);
    const remaining = localPrice - deposit;

    const firstInstallment = Math.ceil(remaining / 2);
    const secondInstallment = remaining - firstInstallment;

    const depositText = `لِتَأْكِيدِ الحَجْزِ، يُطْلَبُ دَفْعُ رسوم تأكيد الحجز بقيمة <strong>${deposit.toLocaleString()} ${currency}</strong>.`;

    return (
        <div className="bg-blue-50 border border-blue-500 rounded-lg p-5 text-center my-4">
            <h4 className="text-2xl font-bold text-blue-800 mb-4">
                تَكَالِيفُ المَسَارِ وَخُطَطُ الدَّفْعِ
            </h4>
            <p className="text-lg mb-2">
                <strong>المَبْلَغُ الإِجْمَالِيُّ:</strong>{" "}
                {localPrice.toLocaleString()} {currency}
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 my-4">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name={`${trackType}_payment`}
                        value="annual"
                        checked={paymentPlan === "annual"}
                        onChange={(e) => setPaymentPlan(e.target.value)}
                        className="mr-2"
                    />
                    دَفْعَةٌ وَاحِدَةٌ
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name={`${trackType}_payment`}
                        value="biannual"
                        checked={paymentPlan === "biannual"}
                        onChange={(e) => setPaymentPlan(e.target.value)}
                        className="mr-2"
                    />
                    دُفْعَتَانِ (تَقْسِيطٌ)
                </label>
            </div>
            <div className="border-t border-blue-500 pt-4 mt-4">
                {paymentPlan === "annual" ? (
                    <p className="font-bold text-blue-800">
                        المَبْلَغُ المُتَبَقِّي يُدْفَعُ مَرَّةً وَاحِدَةً:{" "}
                        {remaining.toLocaleString()} {currency} (قَبْلَ بَدْءِ
                        الدِّرَاسَةِ)
                    </p>
                ) : (
                    <>
                        <p className="font-bold text-blue-800">
                            الدُّفْعَةُ الأُولَى:{" "}
                            {firstInstallment.toLocaleString()} {currency}{" "}
                            (قَبْلَ الفَصْلِ الدِّرَاسِيِّ الأَوَّلِ)
                        </p>
                        <p className="font-bold text-blue-800">
                            الدُّفْعَةُ الثَّانِيَةُ:{" "}
                            {secondInstallment.toLocaleString()} {currency}{" "}
                            (قَبْلَ الفَصْلِ الدِّرَاسِيِّ الثَّانِي)
                        </p>
                    </>
                )}
            </div>
            <p className="bg-orange-50 border border-orange-200 text-gray-800 font-medium rounded-lg p-3 mt-4 text-sm">
                <i className="fas fa-info-circle text-orange-500 mr-2"></i>
                <span dangerouslySetInnerHTML={{ __html: depositText }} />
            </p>
        </div>
    );
};

const RegistrationForm = ({
    trackType,
    formTitle,
    submitText,
    children,
    onSubmit,
    showPricingCondition = false,
}) => {
    const [countryInfo, setCountryInfo] = useState(null);
    const [whatsapp, setWhatsapp] = useState("");
    const [showPricing, setShowPricing] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState("annual");
    const [resetKey, setResetKey] = useState(0);
    const formRef = useRef(null);

    useEffect(() => {
        if (countryInfo && whatsapp.trim().length > 5) {
            setShowPricing(true);
        } else {
            setShowPricing(false);
        }
    }, [countryInfo, whatsapp]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
        formRef.current.reset();
        setCountryInfo(null);
        setWhatsapp("");
        setShowPricing(false);
        setPaymentPlan("annual");
        setResetKey((prev) => prev + 1);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h4 className="text-2xl font-bold text-center mb-8 text-blue-800">
                {formTitle}
            </h4>
            <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="max-w-3xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block font-semibold mb-2">
                            الاسْمُ الكَامِلُ
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            العُمْرُ
                        </label>
                        <input
                            type="number"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-2">
                            الدَّوْلَةُ
                        </label>
                        <CustomCountrySelect
                            onCountryChange={setCountryInfo}
                            resetKey={resetKey}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            رَقْمُ الهَاتِفِ
                        </label>
                        <div className="flex">
                            <input
                                type="tel"
                                required
                                className="flex-1 p-3 border border-gray-300 rounded-l-lg border-r-0"
                            />
                            <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg font-mono">
                                +{countryInfo?.code || ""}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            رَقْمُ الوَاتس آب
                        </label>
                        <div className="flex">
                            <input
                                type="tel"
                                required
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-l-lg border-r-0"
                            />
                            <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg font-mono">
                                +{countryInfo?.code || ""}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block font-semibold mb-2">
                        البَرِيدُ الإلِكْتُرُونِيُّ
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                {children}

                {showPricing && (
                    <PricingSummary
                        trackType={trackType}
                        selectedCountry={countryInfo}
                        paymentPlan={paymentPlan}
                        setPaymentPlan={setPaymentPlan}
                    />
                )}

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                    >
                        {submitText}
                    </button>
                </div>
            </form>
        </div>
    );
};

const HifzTrackDetails = () => {
    const [activeTimelineIndex, setActiveTimelineIndex] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [prereqConfirmed, setPrereqConfirmed] = useState(false);

    const [countryInfo, setCountryInfo] = useState(null);
    const [whatsapp, setWhatsapp] = useState("");
    const [showPricing, setShowPricing] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState("annual");
    const formRef = useRef(null);
    const [resetKey, setResetKey] = useState(0);

    const handleTimelineClick = (index) =>
        setActiveTimelineIndex((prevIndex) =>
            prevIndex === index ? null : index
        );
    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        setPrereqConfirmed(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedLevel && selectedLevel !== "تمهيدي" && !prereqConfirmed) {
            alert("الرجاء الإقرار بأنك قرأت شروط القبول أولاً.");
            return;
        }
        if (selectedLevel === "تمهيدي") {
            alert(
                "شُكْرًا لَكَ! تَمَّ اسْتِلَامُ طَلَبِكَ. سَيَتِمُّ الآنَ تَحْوِيلُكَ لِصَفْحَةِ الدَّفْعِ."
            );
        } else {
            alert(
                "شُكْرًا لَكَ! تَمَّ حَجْزُ مَوْعِدِ اخْتِبَارِكَ. سَنُبَلِّغُكَ بِالنَّتِيجَةِ قَرِيبًا لِإِكْمَالِ عَمَلِيَّةِ التَّسْجِيلِ."
            );
        }
        formRef.current.reset();
        setSelectedLevel("");
        setCountryInfo(null);
        setWhatsapp("");
        setShowPricing(false);
        setPaymentPlan("annual");
        setResetKey((prev) => prev + 1);
    };

    const selectedOption = document.querySelector(
        `#hifz-level option[value="${selectedLevel}"]`
    );
    const curriculumIndex = selectedOption
        ? parseInt(selectedOption.dataset.index, 10)
        : -2;

    useEffect(() => {
        if (
            countryInfo &&
            whatsapp.trim().length > 5 &&
            selectedLevel === "تمهيدي"
        ) {
            setShowPricing(true);
        } else {
            setShowPricing(false);
        }
    }, [countryInfo, whatsapp, selectedLevel]);

    return (
        <div
            id="hifz-details"
            className="bg-gray-50 p-8 rounded-lg border border-gray-200"
        >
            <h4 className="text-3xl font-bold text-center mb-8 text-blue-800">
                تَفَاصِيلُ مَسَارِ الحِفْظِ والإِتْقَانِ
            </h4>
            <div className="relative max-w-4xl mx-auto">
                <div className="absolute right-6 top-0 bottom-0 w-1 bg-blue-500"></div>
                {hifzData.map((item, index) => (
                    <div
                        className={`relative pl-10 pr-4 py-4 mb-4 cursor-pointer ${
                            activeTimelineIndex === index
                                ? "bg-white shadow-md"
                                : ""
                        }`}
                        key={index}
                        onClick={() => handleTimelineClick(index)}
                    >
                        <div
                            className={`absolute right-0 top-4 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10 ${
                                activeTimelineIndex === index
                                    ? "bg-blue-500"
                                    : ""
                            }`}
                        ></div>
                        <h5
                            className={`text-xl font-bold mb-2 ${
                                activeTimelineIndex === index
                                    ? "text-blue-600"
                                    : "text-blue-800"
                            }`}
                        >
                            {item.year}
                        </h5>
                        <div
                            className={`${
                                activeTimelineIndex === index
                                    ? "block"
                                    : "hidden"
                            } bg-white p-5 rounded-lg border border-gray-200 mt-3`}
                        >
                            <p className="mb-2">
                                <strong>مُقَرَّرُ الحِفْظِ:</strong> {item.hifz}
                            </p>
                            <p>
                                <strong>العُلُومُ المُصَاحِبَةُ:</strong>{" "}
                                {item.olum}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-10">
                <h4 className="text-2xl font-bold text-center mb-8 text-blue-800">
                    اسْتِمَارَةُ التَّقْدِيمِ لِمَسَارِ الحِفْظِ
                </h4>
                <form
                    className="max-w-3xl mx-auto"
                    id="hifz-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                الاسْمُ الكَامِلُ
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                العُمْرُ
                            </label>
                            <input
                                type="number"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-2">
                                الدَّوْلَةُ
                            </label>
                            <CustomCountrySelect
                                onCountryChange={setCountryInfo}
                                resetKey={resetKey}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                رَقْمُ الهَاتِفِ
                            </label>
                            <div className="flex">
                                <input
                                    type="tel"
                                    required
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg border-r-0"
                                />
                                <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg font-mono">
                                    +{countryInfo?.code || ""}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                رَقْمُ الوَاتس آب
                            </label>
                            <div className="flex">
                                <input
                                    type="tel"
                                    required
                                    value={whatsapp}
                                    onChange={(e) =>
                                        setWhatsapp(e.target.value)
                                    }
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg border-r-0"
                                />
                                <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg font-mono">
                                    +{countryInfo?.code || ""}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">
                            البَرِيدُ الإلِكْتُرُونِيُّ
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <hr className="border-t-2 border-gray-200 my-8" />

                    <div className="mb-5">
                        <label
                            htmlFor="hifz-level"
                            className="block font-semibold mb-2"
                        >
                            اخْتَرِ الصَّفَّ الدِّرَاسِيَّ
                        </label>
                        <select
                            id="hifz-level"
                            required
                            value={selectedLevel}
                            onChange={handleLevelChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="" disabled>
                                -- الرَّجَاءُ الاخْتِيَارُ --
                            </option>
                            <option value="تمهيدي" data-index="-1">
                                السَّنَةُ التَّمْهِيدِيَّةُ
                            </option>
                            <option value="الأول" data-index="0">
                                الصَّفُّ الأَوَّلُ
                            </option>
                            <option value="الثاني" data-index="1">
                                الصَّفُّ الثَّانِي
                            </option>
                            <option value="الثالث" data-index="2">
                                الصَّفُّ الثَّالِثُ
                            </option>
                            <option value="الرابع" data-index="3">
                                الصَّفُّ الرَّابِعُ
                            </option>
                            <option value="الخامس" data-index="4">
                                الصَّفُّ الخَامِسُ
                            </option>
                            <option value="السادس" data-index="5">
                                الصَّفُّ السَّادِسُ
                            </option>
                        </select>
                    </div>

                    {selectedLevel && (
                        <>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-5">
                                <h5 className="text-xl font-bold text-orange-600 mb-3">
                                    مَنْهَجُ الصَّفِّ المُخْتَارِ
                                </h5>
                                <p className="mb-2">
                                    <strong>مُقَرَّرُ الحِفْظِ:</strong>{" "}
                                    {hifzData[curriculumIndex + 1]?.hifz}
                                </p>
                                <p>
                                    <strong>العُلُومُ المُصَاحِبَةُ:</strong>{" "}
                                    {hifzData[curriculumIndex + 1]?.olum}
                                </p>
                            </div>

                            {selectedLevel !== "تمهيدي" ? (
                                <>
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-5">
                                        <h5 className="text-xl font-bold text-orange-600 mb-3">
                                            شَرْطُ القَبُولِ وَالاخْتِبَارُ
                                        </h5>
                                        <p className="mb-3">
                                            القَبُولُ في هذا الصَّفِّ يَشْتَرِطُ
                                            إتْقانَكَ لِمَناهِجِ السَّنَواتِ
                                            السَّابِقَةِ.
                                        </p>
                                        <p className="mb-3">
                                            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded">
                                                {testRanges[selectedLevel]}
                                            </span>
                                        </p>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={prereqConfirmed}
                                                onChange={(e) =>
                                                    setPrereqConfirmed(
                                                        e.target.checked
                                                    )
                                                }
                                                required
                                                className="mr-2"
                                            />
                                            أُقِرُّ بأنني قرأتُ الشرطَ وفهمتُه.
                                        </label>
                                    </div>

                                    <div
                                        className={`transition-opacity ${
                                            prereqConfirmed
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }`}
                                    >
                                        <div className="mb-5">
                                            <label className="block font-semibold mb-3">
                                                اخْتَرْ مَوْعِدًا لِاخْتِبَارِ
                                                تَحْدِيدِ المُسْتَوَى
                                            </label>
                                            <div className="space-y-3">
                                                {testAppointments.map(
                                                    (slot, index) => (
                                                        <label
                                                            key={index}
                                                            className="block"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="hifz_test_slot"
                                                                value={`${slot.day} - ${slot.time}`}
                                                                required
                                                                disabled={
                                                                    !prereqConfirmed
                                                                }
                                                                className="hidden"
                                                            />
                                                            <div
                                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                                    !prereqConfirmed
                                                                        ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                                                                        : "hover:border-blue-500"
                                                                }`}
                                                            >
                                                                <div>
                                                                    <h5 className="text-lg font-semibold">
                                                                        {
                                                                            slot.day
                                                                        }
                                                                    </h5>
                                                                    <p className="text-gray-600">
                                                                        الساعة:{" "}
                                                                        {
                                                                            slot.time
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-5">
                                        <label className="block font-semibold mb-3">
                                            اخْتَرِ الفَصْلَ الدِّرَاسِيَّ
                                            المُنَاسِبَ
                                        </label>
                                        <div className="space-y-3">
                                            <label className="block">
                                                <input
                                                    type="radio"
                                                    name="hifz_class"
                                                    value="anwar"
                                                    required
                                                    className="hidden"
                                                />
                                                <div className="flex justify-between items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                                                    <div>
                                                        <h5 className="text-lg font-semibold">
                                                            فَصْلُ الأَنْوَارِ
                                                            المُحَمَّدِيَّةِ
                                                        </h5>
                                                        <p className="text-gray-600">
                                                            الأَحَدُ
                                                            والثُّلَاثَاءُ (8:00
                                                            ص - 10:00 ص)
                                                        </p>
                                                    </div>
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        مُتَاحٌ (5/8)
                                                    </span>
                                                </div>
                                            </label>
                                            <label className="block">
                                                <input
                                                    type="radio"
                                                    name="hifz_class"
                                                    value="riyadh"
                                                    disabled
                                                    className="hidden"
                                                />
                                                <div className="flex justify-between items-center p-4 border-2 rounded-lg bg-gray-100 cursor-not-allowed">
                                                    <div>
                                                        <h5 className="text-lg font-semibold">
                                                            فَصْلُ رِيَاضِ
                                                            الجَنَّةِ
                                                        </h5>
                                                        <p className="text-gray-600">
                                                            الاثْنَيْنِ
                                                            والأَرْبِعَاءُ (9:00
                                                            ص - 10:30 ص)
                                                        </p>
                                                    </div>
                                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                                        مُمْتَلِئٌ (8/8)
                                                    </span>
                                                </div>
                                            </label>
                                            <label className="block">
                                                <input
                                                    type="radio"
                                                    name="hifz_class"
                                                    value="furqan"
                                                    className="hidden"
                                                />
                                                <div className="flex justify-between items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                                                    <div>
                                                        <h5 className="text-lg font-semibold">
                                                            فَصْلُ الفُرْقَانِ
                                                        </h5>
                                                        <p className="text-gray-600">
                                                            السَّبْتُ
                                                            والاثْنَيْنِ (7:00 م
                                                            - 9:00 م)
                                                        </p>
                                                    </div>
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        مُتَاحٌ (3/8)
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {showPricing && (
                                        <PricingSummary
                                            trackType="hifz"
                                            selectedCountry={countryInfo}
                                            paymentPlan={paymentPlan}
                                            setPaymentPlan={setPaymentPlan}
                                        />
                                    )}
                                </>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                                >
                                    {selectedLevel === "تمهيدي"
                                        ? "التَّقْدِيمُ ودَفْعُ رسوم الحَجْزِ"
                                        : "حَجْزُ الاخْتِبَارِ وتَقْدِيمُ الطَّلَبِ"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const MurajaaTrackDetails = () => {
    const [activeTab, setActiveTab] = useState("level1");
    const trackConfig = {
        type: "murajaa",
        formTitle: "اسْتِمَارَةُ طَلَبِ مُقَابَلَةٍ لِمَسَارِ المُرَاجَعَةِ",
        submitText: "حَجْزُ مَوْعِدِ المُقَابَلَةِ",
        depositText:
            "بَعْدَ قَبُولِكَ، سَيُطْلَبُ مِنْكَ دَفْعُ رسومِ تأكيدِ الحجزِ بقيمة <strong>{amount} {currency}</strong>.",
    };

    return (
        <div
            id="murajaa-details"
            className="bg-gray-50 p-8 rounded-lg border border-gray-200"
        >
            <h4 className="text-3xl font-bold text-center mb-8 text-blue-800">
                تَفَاصِيلُ مَسَارِ المُرَاجَعَةِ والتَّثْبِيتِ
            </h4>
            <p className="text-lg text-center max-w-3xl mx-auto mb-8">
                يَتِمُّ إِجْرَاءُ مُقَابَلَةٍ مَعَ الطَّالِبِ لِتَحْدِيدِ
                المُسْتَوَى المُنَاسِبِ لَهُ.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                    className={`px-5 py-2 rounded-lg border ${
                        activeTab === "level1"
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-300"
                    }`}
                    onClick={() => setActiveTab("level1")}
                >
                    المُسْتَوَى الأَوَّلُ (عَامَانِ)
                </button>
                <button
                    className={`px-5 py-2 rounded-lg border ${
                        activeTab === "level2"
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-300"
                    }`}
                    onClick={() => setActiveTab("level2")}
                >
                    المُسْتَوَى الثَّانِي (عَامٌ)
                </button>
                <button
                    className={`px-5 py-2 rounded-lg border ${
                        activeTab === "level3"
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-300"
                    }`}
                    onClick={() => setActiveTab("level3")}
                >
                    المُسْتَوَى الثَّالِثُ (6 أَشْهُرٍ)
                </button>
            </div>

            {Object.entries(murajaaData).map(([key, value]) => (
                <div
                    key={key}
                    className={`bg-white p-5 rounded-lg border border-gray-200 mb-6 ${
                        activeTab === key ? "block" : "hidden"
                    }`}
                >
                    <h5 className="text-xl font-bold mb-4 text-blue-800">
                        {value.title}
                    </h5>
                    <div className="overflow-x-auto">
                        <table
                            className="w-full border-collapse"
                            dangerouslySetInnerHTML={{ __html: value.table }}
                        ></table>
                    </div>
                </div>
            ))}

            <RegistrationForm
                trackType="murajaa"
                {...trackConfig}
                onSubmit={(e) => alert("تم حجز موعد المقابلة بنجاح!")}
            >
                <div className="mb-5">
                    <label className="block font-semibold mb-2">
                        نُبْذَةٌ عَنْ مُسْتَوَاكَ الحَالِيِّ
                    </label>
                    <textarea
                        rows="4"
                        placeholder="مثال: ختمتُ القرآن منذ سنة، وحفظي متقن بنسبة 70%..."
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>

                <div className="mb-5">
                    <label className="block font-semibold mb-3">
                        اخْتَرْ مَوْعِدًا لِلمُقَابَلَةِ (مواعيد مُتاحة)
                    </label>
                    <div className="space-y-3">
                        {testAppointments.map((slot, index) => (
                            <label key={index} className="block">
                                <input
                                    type="radio"
                                    name="murajaa_test_slot"
                                    value={`${slot.day} - ${slot.time}`}
                                    required
                                    className="hidden"
                                />
                                <div className="p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                                    <div>
                                        <h5 className="text-lg font-semibold">
                                            {slot.day}
                                        </h5>
                                        <p className="text-gray-600">
                                            الساعة: {slot.time}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </RegistrationForm>
        </div>
    );
};

const IjazahTrackDetails = () => {
    const trackConfig = {
        type: "ijaza",
        formTitle: "اسْتِمَارَةُ التَّقْدِيمِ لِمَسَارِ الإِجَازَةِ",
        submitText: "حَجْزُ مَوْعِدِ المُقَابَلَةِ",
        depositText:
            "لِتَأْكِيدِ الحَجْزِ، يُرْجَى دَفْعُ رسومِ تأكيدِ الحجزِ بقيمة <strong>{amount} {currency}</strong>.",
    };

    return (
        <div
            id="ijaza-details"
            className="bg-gray-50 p-8 rounded-lg border border-gray-200"
        >
            <h4 className="text-3xl font-bold text-center mb-8 text-blue-800">
                شُرُوطُ الحُصُولِ عَلَى الإِجَازَةِ
            </h4>

            <ul className="max-w-3xl mx-auto space-y-3 mb-10">
                {ijazahData.map((item, index) => (
                    <li
                        key={index}
                        className="bg-white p-4 rounded-lg border-r-4 border-blue-500 flex items-start"
                    >
                        <span className="text-blue-500 text-xl font-bold ml-3">
                            ✓
                        </span>
                        <span className="text-lg">{item}</span>
                    </li>
                ))}
            </ul>

            <RegistrationForm
                trackType="ijaza"
                {...trackConfig}
                onSubmit={(e) => alert("تم حجز موعد المقابلة بنجاح!")}
            >
                <div className="mb-5">
                    <label className="flex items-start">
                        <input type="checkbox" required className="mt-1 mr-2" />
                        <span>
                            أُقِرُّ بِأَنِّي أُتْقِنُ حِفْظَ القُرْآنِ الكَرِيمِ
                            كَامِلًا ومُسْتَعِدٌّ لِشُرُوطِ المَسَارِ.
                        </span>
                    </label>
                </div>

                <div className="mb-5">
                    <label className="block font-semibold mb-3">
                        اخْتَرْ مَوْعِدًا لِلمُقَابَلَةِ (مواعيد مُتاحة)
                    </label>
                    <div className="space-y-3">
                        {testAppointments.map((slot, index) => (
                            <label key={index} className="block">
                                <input
                                    type="radio"
                                    name="ijaza_test_slot"
                                    value={`${slot.day} - ${slot.time}`}
                                    required
                                    className="hidden"
                                />
                                <div className="p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                                    <div>
                                        <h5 className="text-lg font-semibold">
                                            {slot.day}
                                        </h5>
                                        <p className="text-gray-600">
                                            الساعة: {slot.time}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </RegistrationForm>
        </div>
    );
};

const Tracks = () => {
    const [activeTrack, setActiveTrack] = useState("");
    return (
        <section
            id="tracks"
            className="container mx-auto px-4 py-20 bg-gray-50"
        >
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
                اخْتَرْ مَسَارَكَ في رِحْلَةِ القُرْآنِ
            </h2>
            <p className="text-lg text-center max-w-2xl mx-auto mb-12 text-gray-600">
                لِكُلِّ طَالِبٍ هَدَفٌ، ولِكُلِّ هَدَفٍ مَسَارٌ. تَصَفَّحِ
                المَسَارَاتِ واخْتَرْ مَا يُنَاسِبُ طُمُوحَكَ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-2xl font-bold mb-4 text-blue-800">
                        مَسَارُ الحِفْظِ
                    </h3>
                    <p className="text-gray-700 mb-6">
                        خُطَّةٌ مُتكَامِلَةٌ لِخَتْمِ القُرْآنِ حِفْظًا
                        وفَهْمًا.
                    </p>
                    <button
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        onClick={() => setActiveTrack("hifz")}
                    >
                        عَرْضُ تَفَاصِيلِ الخُطَّةِ والتَّقْدِيم
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-2xl font-bold mb-4 text-blue-800">
                        مَسَارُ المُرَاجَعَةِ
                    </h3>
                    <p className="text-gray-700 mb-6">
                        بَرْنَامَجٌ مُكَثَّفٌ لِمَنْ خَتَمَ القُرْآنَ ويُرِيدُ
                        تَثْبِيتَ حِفْظِهِ.
                    </p>
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        onClick={() => setActiveTrack("murajaa")}
                    >
                        طَلَبُ مُقَابَلَةٍ وتَقْدِيم
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-2xl font-bold mb-4 text-blue-800">
                        مَسَارُ الإِجَازَةِ
                    </h3>
                    <p className="text-gray-700 mb-6">
                        لِلْحُفَّاظِ المُتْقِنِينَ السَّاعِينَ لِنَيْلِ
                        الإِجَازَةِ بِسَنَدٍ مُتَّصِلٍ.
                    </p>
                    <button
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        onClick={() => setActiveTrack("ijaza")}
                    >
                        الشُّرُوطُ والتَّقْدِيم
                    </button>
                </div>
            </div>

            {activeTrack === "hifz" && <HifzTrackDetails />}
            {activeTrack === "murajaa" && <MurajaaTrackDetails />}
            {activeTrack === "ijaza" && <IjazahTrackDetails />}
        </section>
    );
};

function QuranSchoolPagex() {
    return (
        <>
            <Header />
            <main>
                <Features />
                <Tracks />
                <Faq />
            </main>
            <Footer />
        </>
    );
}

export default QuranSchoolPagex;
