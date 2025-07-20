/* eslint-disable no-unused-vars */
import React from "react";
import { X, AlertTriangle } from "lucide-react";

function DeleteConfirmModal({ type, onClose, onConfirm }) {
    const title = type === 'section' ? 'حذف القسم' : 'حذف العنصر';
    const message = type === 'section' 
        ? 'هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع العناصر الموجودة داخل هذا القسم أيضاً. هذا الإجراء لا يمكن التراجع عنه.'
        : 'هل أنت متأكد من حذف هذا العنصر؟ هذا الإجراء لا يمكن التراجع عنه.';

    return (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-black">
                        {title}
                    </h3>

                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <AlertTriangle size={24} className="text-red-500 ml-3" />
                        <p className="text-gray-700">{message}</p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            إلغاء
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                        >
                            تأكيد الحذف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal; 