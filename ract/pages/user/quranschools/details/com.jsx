export const SectionTitle = ({ icon, title, colorClass = "bg-emerald-50" }) => (
    <div
        className={`flex items-center gap-4 p-5 border-b border-gray-200 ${colorClass}`}
    >
        <div className="text-emerald-700">{icon}</div>
        <h3 className="text-xl font-bold text-emerald-800">{title}</h3>
    </div>
);