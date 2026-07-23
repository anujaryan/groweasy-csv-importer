type Props = {
  data?: any[];
};

export default function ImportedTable({ data = [] }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No imported records found.
      </p>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-blue-700 text-white">
          <tr className="border-b border-slate-700 hover:bg-slate-700 transition">
            {headers.map((header) => (
              <th key={header} className="border p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}  className="px-4 py-3 text-slate-200">
                  {String(row[header] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}