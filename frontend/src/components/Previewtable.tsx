type Props = {
  headers: string[];
  rows: any[];
};

export default function PreviewTable({ headers, rows }: Props) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-xl">
        <thead className="bg-blue-700 text-white">
          <tr className="border-b border-slate-700 hover:bg-slate-700 transition">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td className="px-4 py-3 text-slate-200">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}