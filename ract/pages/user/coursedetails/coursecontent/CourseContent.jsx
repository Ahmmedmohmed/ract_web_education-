/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Play,
    Clock,
    FileText,
    Video,
} from "lucide-react";
import { nameMainColor } from "../../../../utils/constants";

const CourseContent = ({ sections, onSelectItem }) => {
    // console.log(`sections`, sections);

    // console.log(
    //     `--`,
    //     Object?.fromEntries(sections?.map((_, index) => [index, index === 0]))
    // );

    // const [expandedSections, setExpandedSections] = useState(
    //     Object?.fromEntries(sections?.map((_, index) => [index, index === 0]))
    // );

    const [expandedSections, setExpandedSections] = useState(
        sections && sections.length > 0
            ? Object.fromEntries(
                  sections.map((_, index) => [index, index === 0])
              )
            : {}
    );

    const toggleSection = (sectionIndex) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex],
        }));
    };

    const getItemIcon = (type) => {
        switch (type) {
            case "video":
                return <Video size={20} className="text-primary-600" />;
            case "assessment":
                return <FileText size={20} className="text-yellow-600" />;
            case "document":
                return <FileText size={20} className="text-blue-600" />;
            default:
                return <FileText size={20} className="text-gray-600" />;
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="font-bold text-lg text-black">
                        محتوى الدورة
                    </h2>
                </div>

                <div className="divide-y">
                    {sections?.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="overflow-hidden">
                            <button
                                className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                    toggleSection(sectionIndex);
                                }}
                            >
                                <span className="font-medium">
                                    {section.title}
                                </span>

                                <span className="text-gray-500">
                                    {expandedSections[sectionIndex] ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </span>
                            </button>

                            {expandedSections[sectionIndex] && (
                                <div className="bg-gray-50 border-t border-gray-200">
                                    {section?.lessons?.map(
                                        (item, itemIndex) => (
                                            <button
                                                key={itemIndex}
                                                className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
                                                onClick={() => {
                                                    onSelectItem(item);
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`text-blue-500 `}
                                                    >
                                                        {/* {item.type ===
                                                        "video" ? (
                                                            // <Play size={16} />
                                                            <Video
                                                                size={20}
                                                                className="text-primary-600"
                                                            />
                                                        ) : (
                                                            <FileText
                                                                size={20}
                                                                className="text-yellow-600"
                                                            />
                                                            // <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                                                            //     اختبار
                                                            // </span>
                                                        )} */}

                                                        {getItemIcon(
                                                            item?.type
                                                        )}
                                                    </span>

                                                    <span className="text-gray-700">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <span>
                                                        {item.duration ||
                                                            "00:00"}
                                                    </span>
                                                    <Clock
                                                        size={14}
                                                        className="mr-1"
                                                    />
                                                </div>
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CourseContent;
