import { MessageCircleHeart } from "lucide-react";

// components
import { SectionTitle } from "../com";

const TeacherNote = ({ notes }) => {
    return (
        <>
            <div
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden  `}
            >
                <SectionTitle
                    icon={
                        // <i className="fas fa-comment-alt"></i>
                        <MessageCircleHeart />
                    }
                    title="مُلَاحَظَاتُ المُعَلِّم"
                    colorClass="bg-purple-50"
                />

                {notes?.length > 0 ? (
                    <>
                        {notes?.map((note, index) => (
                            <div className="p-5  " key={index}>
                                <blockquote className="relative bg-purple-50 p-5 rounded-lg border border-purple-200 border-r-4 text-purple-900 text-lg leading-relaxed shadow-sm ">
                                    {note?.description}
                                    <span className="absolute right-3 top-0 text-4xl text-purple-300 leading-none">
                                        "
                                    </span>
                                </blockquote>
                            </div>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
export default TeacherNote;
