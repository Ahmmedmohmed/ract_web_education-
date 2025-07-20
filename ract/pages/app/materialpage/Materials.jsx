/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { useNavigate } from "react-router-dom";

// style
import "./Materials.scss";

// ui component
import Rate from "../../../ui/rate/Rate";
import MainTitle from "../../../ui/title/MainTitle";

// assets
import teacher1image from "../../../assets/images/teacher/teacher-1.svg";
import teacher2image from "../../../assets/images/teacher/teacher-2.svg";
import teacher3image from "../../../assets/images/teacher/teacher-3.png";
import teacher4image from "../../../assets/images/teacher/teacher-4.png";
import teacher5image from "../../../assets/images/teacher/teacher-5.png";
import teacher6image from "../../../assets/images/teacher/teacher-6.png";
import teacher7image from "../../../assets/images/teacher/teacher-7.png";

function Materials() {
    const navigate = useNavigate();
    const [activeMada, setActiveMada] = useState(0); // حالة لتتبع المادة النشطة

    // بيانات المواد والمعلمين
    const materials = [
        {
            name: "اللغة العربية",
            teachers: [
                {
                    id: 1,
                    name: "الأستاذ طلحاوي صابر",
                    image: teacher1image,
                    description:
                        "أستاذ جامعي تخصص اٍعلام آلي خريج جامعة حسيبة بن بوعلي الشلف خبرة 10 سنوات تدريس",
                    groups: "السبت سا9 صباحا - الثلاثاء سا16 مساءا - الأربعاء سا10 صباحا",
                },
                {
                    id: 2,
                    name: "الأستاذ اٍسحاق بن فرج",
                    image: teacher2image,
                    description:
                        "أستاذ جامعي تخصص اٍعلام آلي خريج المدرسة العليا للاٍعلام الآلي بلعباس خبرة 10 سنوات تدريس",
                    groups: "السبت سا9 صباحا - الثلاثاء سا16 مساءا - الأربعاء سا10 صباحا",
                },
                // يمكنك إضافة المزيد من المعلمين هنا
            ],
        },
        {
            name: "اللغة الإنجليزية",
            teachers: [
                {
                    id: 3,
                    name: "الأستاذ أحمد",
                    image: teacher3image,
                    description:
                        "أستاذ رياضيات خريج المدرسة العليا للأساتذة خبرة 10 سنوات تدريس",
                    groups: "السبت سا9 صباحا - الثلاثاء سا16 مساءا - الأربعاء سا10 صباحا",
                },
                {
                    id: 4,
                    name: "الأستاذ أحمد",
                    image: teacher3image,
                    description:
                        "أستاذ رياضيات خريج المدرسة العليا للأساتذة خبرة 10 سنوات تدريس",
                    groups: "السبت سا9 صباحا - الثلاثاء سا16 مساءا - الأربعاء سا10 صباحا",
                },
                // يمكنك إضافة المزيد من المعلمين هنا
            ],
        },
        // يمكنك إضافة المزيد من المواد هنا
    ];

    // console.log(`d1`, materials);
    // console.log(`d2`, materials[activeMada]);
    // console.log(`d3`, materials[activeMada]?.teachers);

    // تأثيرات ScrollReveal
    useEffect(() => {
        ScrollReveal({
            distance: "50px",
            duration: 2500,
            delay: 100,
        });

        ScrollReveal().reveal(".main-title", {
            delay: 1000,
            origin: "top",
        });
        ScrollReveal().reveal(".cours h4", {
            delay: 600,
            origin: "top",
        });
        ScrollReveal().reveal(".cours .mawad", {
            delay: 600,
            origin: "bottom",
        });
        ScrollReveal().reveal(".cours .teachersbox", {
            delay: 1200,
            origin: "right",
            distance: "250px",
        });
    }, []);

    return (
        <>
            <div className="cours">
                <div className="container">
                    <MainTitle
                        data-aos="fade-down"
                        onClick={() => {
                            navigate(`/material`);
                        }}
                    >
                        {`الدُروس`}
                    </MainTitle>

                    <h4>
                        يمكنك مشاهدة الدروس اٍبحث و اٍكتشف المواد التي تريد
                        دراستها ثم اٍنطلق
                    </h4>

                    <div className="mawad">
                        {materials &&
                            materials?.map((mada, index) => (
                                <div
                                    key={index}
                                    className={`mada ${
                                        activeMada === index ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        setActiveMada(index);
                                    }}
                                >
                                    {mada?.name}
                                </div>
                            ))}
                    </div>

                    <div className="parentOfTeachers">
                        <div className="arabic active-arabic">
                            <div className="teachersbox">
                                {materials[activeMada]?.teachers?.map(
                                    (teacher, index) => (
                                        // <div
                                        //     key={index}
                                        //     className="arabic active-arabic"
                                        // >
                                        //     <div className="teachersbox">
                                        //         <div>{teacher?.name}</div>
                                        //     </div>
                                        // </div>
                                        <div
                                            className="teachearbox"
                                            key={index}
                                        >
                                            <div className="teachercontent">
                                                <div className="teacherImage">
                                                    <img
                                                        src={teacher?.image}
                                                        alt={teacher?.name}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="teacherInfo">
                                                    <h3>{teacher?.name}</h3>
                                                    <Rate />
                                                    <p>
                                                        {teacher?.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="teachersContect">
                                                <div className="group">
                                                    <h3 className="title">
                                                        المجموعات المتاحة:
                                                    </h3>
                                                    <p>{teacher?.groups}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="cours">
                <div className="container">
                    <h2 className="main-title">الدُروس</h2>

                    <h4>
                        يمكنك مشاهدة الدروس اٍبحث و اٍكتشف المواد التي تريد
                        دراستها ثم اٍنطلق
                    </h4>

                    <div className="mawad">
                        <div className="mada active">اللغة العربية</div>
                        <div className="mada">اللغة الاٍنجليزية</div>
                        <div className="mada">اللغة الفرنسية</div>
                        <div className="mada">الشريعة</div>
                        <div className="mada">الرياضيات</div>
                    </div>

                    <div className="parentOfTeachers">
                        <div className="arabic active-arabic">
                            <div className="teachersbox">
                                <div className="teachearbox teachearbox-1">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher1image ||
                                                    "images/teacher-1.svg"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ طلحاوي صابر</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                جامعة حسيبة بن بوعلي الشلف خبرة
                                                10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-2">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher2image ||
                                                    "images/teacher-2.svg"
                                                }
                                                alt={`teacher 2 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ اٍسحاق بن فرج</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                المدرسة العليا للاٍعلام الآلي
                                                بلعباس خبرة 10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-3">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-3.png"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ أحمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ رياضيات خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher4image ||
                                                    "images/teacher-4.png"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ مصطفى</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher5image ||
                                                    "images/teacher-5.png"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ محمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher6image ||
                                                    "images/teacher-6.png"
                                                }
                                                alt={`teacher 6 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ يوسف</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>

                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="arabic">
                            <div className="teachersbox">
                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher4image ||
                                                    "images/teacher-4.png"
                                                }
                                                alt={`teacher 4 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ مصطفى</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher5image ||
                                                    "images/teacher-5.png"
                                                }
                                                alt={`teacher5image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ محمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher6image ||
                                                    "images/teacher-6.png"
                                                }
                                                alt={`teacher 6 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ يوسف</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-1">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher1image ||
                                                    "images/teacher-1.svg"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ طلحاوي صابر</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                جامعة حسيبة بن بوعلي الشلف خبرة
                                                10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>

                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-2">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher2image ||
                                                    "images/teacher-2.svg"
                                                }
                                                alt={`teacher2image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ اٍسحاق بن فرج</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                المدرسة العليا للاٍعلام الآلي
                                                بلعباس خبرة 10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-3">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-3.png"
                                                }
                                                alt={`teacher 3 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ أحمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ رياضيات خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="arabic">
                            <div className="teachersbox">
                                <div className="teachearbox teachearbox-2">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher2image ||
                                                    "images/teacher-2.svg"
                                                }
                                                alt={`teacher 2 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ اٍسحاق بن فرج</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                المدرسة العليا للاٍعلام الآلي
                                                بلعباس خبرة 10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-1">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher1image ||
                                                    "images/teacher-1.svg"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ طلحاوي صابر</h3>
                                            <Rate />
                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                جامعة حسيبة بن بوعلي الشلف خبرة
                                                10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher5image ||
                                                    "images/teacher-5.png"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ محمد</h3>
                                            <Rate />
                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-6.png"
                                                }
                                                alt={`teacher 3 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ يوسف</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-3">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-3.png"
                                                }
                                                alt={`teacher 3 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ أحمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ رياضيات خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher4image ||
                                                    "images/teacher-4.png"
                                                }
                                                alt={`teacher 4 image`}
                                            />
                                        </div>
                                        <div className="teacherInfo">
                                            <h3>الأستاذ مصطفى</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="arabic">
                            <div className="teachersbox">
                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher5image ||
                                                    "images/teacher-5.png"
                                                }
                                                alt={`teacher 5 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ محمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher6image ||
                                                    "images/teacher-6.png"
                                                }
                                                alt={`teacher 6 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ يوسف</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-1">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher1image ||
                                                    "images/teacher-1.svg"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ طلحاوي صابر</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                جامعة حسيبة بن بوعلي الشلف خبرة
                                                10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-2">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher2image ||
                                                    "images/teacher-2.svg"
                                                }
                                                alt={`teacher 2 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ اٍسحاق بن فرج</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                المدرسة العليا للاٍعلام الآلي
                                                بلعباس خبرة 10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-3">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-3.png"
                                                }
                                                alt={`teacher 3 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ أحمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ رياضيات خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher4image ||
                                                    "images/teacher-4.png"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ مصطفى</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="arabic">
                            <div className="teachersbox">
                                <div className="teachearbox teachearbox-1">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher7image ||
                                                    "images/teacher-7.png"
                                                }
                                                alt={`teacher 7 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ طلحاوي صابر</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                جامعة حسيبة بن بوعلي الشلف خبرة
                                                10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>

                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-2">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher2image ||
                                                    "images/teacher-2.svg"
                                                }
                                                alt={`teacher 1 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ اٍسحاق بن فرج</h3>

                                            <Rate />

                                            <p>
                                                أستاذ جامعي تخصص اٍعلام آلي خريج
                                                المدرسة العليا للاٍعلام الآلي
                                                بلعباس خبرة 10 سنوات تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-3">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher3image ||
                                                    "images/teacher-3.png"
                                                }
                                                alt={`teacher 3 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ أحمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ رياضيات خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>
                                                السبت سا9 صباحا - الثلاثاء سا16
                                                مساءا - الأربعاء سا10 صباحا
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher4image ||
                                                    "images/teacher-4.png"
                                                }
                                                alt={`teacher 4 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ مصطفى</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher5image ||
                                                    "images/teacher-5.png"
                                                }
                                                alt={`teacher 5 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ محمد</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="teachearbox teachearbox-4">
                                    <div className="teachercontent">
                                        <div className="teacherImage">
                                            <img
                                                src={
                                                    teacher6image ||
                                                    "images/teacher-6.png"
                                                }
                                                alt={`teacher 6 image`}
                                            />
                                        </div>

                                        <div className="teacherInfo">
                                            <h3>الأستاذ يوسف</h3>

                                            <Rate />

                                            <p>
                                                أستاذ الشريعة خريج المدرسة
                                                العليا للأساتذة خبرة 10 سنوات
                                                تدريس
                                            </p>
                                        </div>
                                    </div>

                                    <div className="teachersContect">
                                        <div className="group">
                                            <h3 className="title">
                                                المجموعات المتاحة:
                                            </h3>
                                            <p>المجموعة أ - المجموعة ب</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Materials;
