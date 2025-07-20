export const pricingConfig = {
    hifz: { egp: 1200, sar: 250, usd: 98 },
    murajaa: { egp: 1200, sar: 250, usd: 98 },
    ijaza: { egp: 1200, sar: 250, usd: 98 },
};

// Simplified exchange rates for demonstration. A real app would use a live API.
// Rates are based on the zone's base currency.
export const exchangeRates = {
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

export const countries = [
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

export const hifzData = [
    {
        year: "السَّنَةُ التَّمْهِيدِيَّةُ",
        hifz: "جُزْءَانِ (مِنْ سُورَةِ النَّاسِ إِلَى تَبَارَكَ)",
        olum: "التَّجْوِيدُ المُيَسَّرُ، آدَابُ حَمَلَةِ القُرْآنِ، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الأَوَّلُ",
        hifz: "3 أَجْزَاءٍ (مِنَ التَّحْرِيمِ إِلَى الأَحْقَافِ)",
        olum: "تُحْفَةُ الأَطْفَالِ، آدَابُ حَمَلَةِ القُرْآنِ، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الثَّانِي",
        hifz: "3.5 أَجْزَاءٍ (مِنَ الجَاثِيَةِ إِلَى سَبَأٍ)",
        olum: "شرح متن الجزرية، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الثَّالِثُ",
        hifz: "4 أَجْزَاءٍ (مِنَ الأَحْزَابِ إِلَى المُؤْمِنُونَ)",
        olum: "شرح متن الجزرية، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الرَّابِعُ",
        hifz: "5.5 أَجْزَاءٍ (مِنَ الحَجِّ إِلَى يُوسُفَ)",
        olum: "مُحَاضَرَاتٌ فِي عُلُومِ القُرْآنِ، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ الخَامِسُ",
        hifz: "5.5 أَجْزَاءٍ (مِنْ هُودٍ إِلَى الأَنْعَامِ)",
        olum: "القَوَاعِدُ الحِسَانُ، شَرْحُ أُصُولِ التَّفْسِيرِ، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
    {
        year: "الصَّفُّ السَّادِسُ",
        hifz: "6.5 أَجْزَاءٍ (مِنَ المَائِدَةِ إِلَى البَقَرَةِ)",
        olum: "مُتَشَابِهَاتُ القُرْآنِ، تفسير القرآن الكريم، أَسْبَابُ النُّزُولِ",
    },
];

export const testRanges = {
    الأول: "من سورة الناس إلى سورة تبارك",
    الثاني: "من سورة الناس إلى سورة الأحقاف",
    الثالث: "من سورة الناس إلى سورة سبأ",
    الرابع: "من سورة الناس إلى سورة المؤمنون",
    الخامس: "من سورة الناس إلى سورة يوسف",
    السادس: "من سورة الناس إلى سورة الأنعام",
};

export const murajaaData = {
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

export const ijazahData = [
    "خَتْمُ القُرْآنِ 3 مَرَّاتٍ.",
    "لَا تَتَجَاوَزُ مُدَّةُ الإِجَازَةِ عَامًا.",
    "تَسْمِيعُ جُزْءٍ كَامِلٍ فِي الحَلْقَةِ.",
    "الحُصُولُ عَلَى إِجَازَةٍ فِي الجَزَرِيَّةِ.",
    "اجْتِيَازُ الاخْتِبَارِ النِّهَائِيِّ بِنَجَاحٍ.",
];

export const testAppointments = [
    { day: "الأحد، 29 يونيو 2025", time: "11:00 صباحًا" },
    { day: "الأحد، 29 يونيو 2025", time: "05:00 مساءً" },
    { day: "الثلاثاء، 1 يوليو 2025", time: "10:00 صباحًا" },
    { day: "الثلاثاء، 1 يوليو 2025", time: "06:00 مساءً" },
];

//
export const getRatingFromGrade = (grade) => {
    if (grade === null || grade === undefined) return null;
    if (grade === 0) return "غياب";
    if (grade >= 90) return "ممتاز";
    if (grade >= 80) return "جيد جدًا";
    if (grade >= 70) return "جيد";
    if (grade >= 60) return "مقبول";
    if (grade >= 50) return "ضعيف";
    return "ضعيف جدًا";
};

export const getRatingClass = (rating) => {
    switch (rating) {
        case "ممتاز":
            return "bg-green-100 text-green-800";
        case "جيد جدًا":
            return "bg-blue-100 text-blue-800";
        case "جيد":
            return "bg-teal-100 text-teal-800";
        case "مقبول":
            return "bg-yellow-100 text-yellow-800";
        case "ضعيف":
            return "bg-orange-100 text-orange-800";
        case "ضعيف جدًا":
            return "bg-red-100 text-red-800";
        case "غياب":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getAttendanceClass = (status) => {
    switch (status) {
        case "early_attendance":
            return "bg-green-100 text-green-800";
        case "late_attendance":
            return "bg-yellow-100 text-yellow-800";
        case "absence":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const studentData = {
    track: "مسار الحفظ",
    academicYear: "الصف الثاني",
    className: "فصل الفاروق عمر",
    schedule: {
        quran: "السبت والثلاثاء - 10:00 صباحًا",
        sciences: "الأربعاء - 10:00 مساءً (بتوقيت مصر)",
    },
    history: [
        { date: "2025-10-26", present: null, past: null },
        { date: "2025-10-19", present: null, past: null },
        {
            date: "2025-10-12",
            present: { from: "سبأ: 16", to: "سبأ: 30", grade: 97 },
            past: { from: "فاطر: 15", to: "فاطر: 28", grade: 98 },
        },
        {
            date: "2025-10-05",
            present: { from: "سبأ: 1", to: "سبأ: 15", grade: 85 },
            past: { from: "فاطر: 1", to: "فاطر: 14", grade: 92 },
        },
        {
            date: "2025-09-28",
            present: { from: "فاطر: 29", to: "فاطر: 45", grade: 78 },
            past: { from: "يس: 55", to: "يس: 83", grade: 88 },
        },
        {
            date: "2025-09-21",
            present: { from: "فاطر: 15", to: "فاطر: 28", grade: 65 },
            past: { from: "يس: 33", to: "يس: 54", grade: 75 },
        },
        {
            date: "2025-09-14",
            present: { from: "فاطر: 1", to: "فاطر: 14", grade: 0 },
            past: { from: "يس: 1", to: "يس: 32", grade: 0 },
        },
    ],
    teacherNote:
        "أداءٌ مُمتازٌ هذا الأسبوع يا عبد الله، استمر على هذا التَّقدُّم. ركِّز قليلاً على أحكام الإدغام في مُراجعتك القادمة، وبارك الله فيك.",
    nextLecture: {
        title: "شرح أحكام النون الساكنة والتنوين",
        details:
            "سنتناول في هذه المحاضرة شرحًا تفصيليًا لأحكام الإظهار، الإدغام، الإقلاب، والإخفاء مع أمثلة تطبيقية من القرآن الكريم.",
        dateTime: new Date(
            new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
        ),
        zoomLink: "https://zoom.us/j/1234567890",
    },
    exams: [
        {
            date: "الأحد 15/9/2025",
            syllabus: { from: "الجزء الأول", to: "الجزء الخامس" },
            grade: 95,
            status: "completed",
            type: "نصف سنوي",
        },
        {
            date: "الأحد 9/10/2025",
            syllabus: { from: "الجزء السادس", to: "الجزء العاشر" },
            grade: null,
            status: "pending",
            type: "شهري",
        },
        {
            date: "الأحد 9/11/2025",
            syllabus: { from: "الجزء الحادي عشر", to: "الجزء الخامس عشر" },
            grade: 0,
            status: "completed",
            type: "شهري",
        },
        {
            date: "الأحد 1/12/2025",
            syllabus: { from: "الجزء السادس عشر", to: "الجزء العشرون" },
            grade: 88,
            status: "completed",
            type: "سنوي",
        },
        {
            date: "الأحد 15/1/2026",
            syllabus: {
                from: "الجزء الواحد والعشرون",
                to: "الجزء الخامس والعشرون",
            },
            grade: null,
            status: "pending",
            type: "شهري",
        },
        {
            date: "الأحد 1/3/2026",
            syllabus: { from: "الجزء السادس والعشرون", to: "الجزء الثلاثون" },
            grade: 92,
            status: "completed",
            type: "نصف سنوي",
        },
    ],
    attendanceLog: [
        { date: "السبت 28/6/2025", type: "حلقة قرآن", status: "early" },
        {
            date: "الأربعاء 25/6/2025",
            type: "محاضرة علوم قرآن",
            status: "late",
        },
        { date: "الثلاثاء 24/6/2025", type: "حلقة قرآن", status: "early" },
        { date: "السبت 21/6/2025", type: "حلقة قرآن", status: "absent" },
    ],
    certificates: [
        {
            id: "cert1",
            title: "شهادة إتمام المستوى الأول",
            url: "https://www.africau.edu/images/default/sample.pdf",
            message:
                "لأدائكَ المتميِّزِ والتزامِكَ بحضورِ الحلقاتِ بانتظامٍ في المستوى الأول.",
        },
        {
            id: "cert2",
            title: "شهادة تقدير لحفظ جزء عم",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            message:
                "لجهودكَ المبذولةِ في حفظِ جزءِ عمَّ وإتقانِكَ أحكامَ التلاوةِ.",
        },
        {
            id: "cert3",
            title: "شهادة مشاركة في الأنشطة الصيفية",
            url: "https://www.africau.edu/images/default/sample.pdf",
            message:
                "لمشاركتكَ الفعَّالةِ في الأنشطةِ الصَّيفيَّةِ القرآنيَّةِ.",
        },
        {
            id: "cert4",
            title: "شهادة التفوق في التجويد",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            message: "لتحقيقكَ أعلى الدَّرجاتِ في اختبارِ التجويدِ العمليِّ.",
        },
        {
            id: "cert5",
            title: "شهادة ختم سورة البقرة",
            url: "https://www.africau.edu/images/default/sample.pdf",
            message: "لإتمامكَ حفظَ سورةِ البقرةِ العظيمةِ بفضلِ اللهِ.",
        },
    ],
    downloadableFiles: [
        {
            id: "file1",
            name: "كتاب التجويد الميسر",
            details: "نسخة PDF من كتاب التجويد المعتمد للمستوى الأول.",
            url: "https://www.africau.edu/images/default/sample.pdf",
        },
        {
            id: "file2",
            name: "ملخص أحكام النون الساكنة",
            details: "ملخص شامل لأحكام النون الساكنة والتنوين مع أمثلة.",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
            id: "file3",
            name: "جدول مراجعة الأجزاء الأولى",
            details: "جدول مقترح لتنظيم مراجعة الأجزاء من 1 إلى 5.",
            url: "https://www.africau.edu/images/default/sample.pdf",
        },
    ],
};

//
export const getRatingFromGradeStudnet = (grade) => {
    if (grade === 0) return "غياب";
    if (grade >= 90) return "ممتاز";
    if (grade >= 80) return "جيد جدًا";
    if (grade >= 70) return "جيد";
    if (grade >= 60) return "مقبول";
    if (grade >= 50) return "ضعيف";
    if (grade >= 30) return "ضعيف جدًا";
    return "غير محفوظ";
};

// Function to get the CSS class for the rating, now includes 'Absent' class
export const getRatingClassStudent = (rating) => {
    switch (rating) {
        case "ممتاز":
            return "bg-emerald-50 text-emerald-700";
        case "جيد جدًا":
            return "bg-blue-50 text-blue-700";
        case "جيد":
            return "bg-amber-50 text-amber-700";
        case "مقبول":
            return "bg-orange-50 text-orange-700";
        case "ضعيف":
            return "bg-red-50 text-red-700";
        case "ضعيف جدًا":
            return "bg-red-100 text-red-800";
        case "غير محفوظ":
            return "bg-gray-100 text-gray-700";
        case "غياب":
            return "bg-red-200 text-red-900";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export const getStatusClass = (status) => {
    switch (status) {
        case "complete":
            return "bg-emerald-50 text-emerald-700";
        case "didnot_start":
            return "bg-red-50 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export const getExamTypeClass = (type) => {
    switch (type) {
        case "شهري":
            return "bg-blue-50 text-blue-700";
        case "نصف سنوي":
            return "bg-purple-50 text-purple-700";
        case "سنوي":
            return "bg-amber-50 text-amber-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export const getAttendanceStatusClass = (status) => {
    switch (status) {
        case "early_attendance":
            return "bg-emerald-50 text-emerald-700";
        case "late_attendance":
            return "bg-amber-50 text-amber-700";
        case "absence":
            return "bg-red-50 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export const getAttendanceStatusIcon = (status) => {
    switch (status) {
        case "early_attendance":
            return <i className="fas fa-user-check mr-2"></i>;
        case "late_attendance":
            return <i className="fas fa-clock mr-2"></i>;
        case "absence":
            return <i className="fas fa-user-xmark mr-2"></i>;
        default:
            return <i className="fas fa-question-circle mr-2"></i>;
    }
};

//
export const examType = {
    monthly: "شهري",
    biannual: "نصف سنوي",
    ultimate: "نهائي",
    // total_formation: "تشكيل كلي",
    // end_words: "اواخر الكلمات",
};
//
export const examStatus = {
    didnot_start: "لم يبدأ",
    complete: "مكتمل",
};
//
export const sessionType = {
    quran_ring: "حلقة قران",
    quranic_sciences_lecture: "محاضرة علوم قران",
};

//
export const classType = {
    male: "ذكور",
    female: "إناث",
    mixed: "مختلط",
};

//
export const presenceAndAbsenceStatus = {
    not_register: "لم تسجل",
    early_attendance: "حضور مبكر",
    late_attendance: "حضور متاخر",
    absence: "غياب",
};
