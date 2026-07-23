type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: Props) {
  return (
    <div className="
        mt-8
        rounded-2xl
        bg-slate-800/80
        backdrop-blur-md
        border
        border-slate-700
        shadow-2xl
        ">
      <div className="border-b border-slate-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}