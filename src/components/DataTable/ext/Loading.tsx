interface LoadingProps {
  cols?: number;
  rows?: number;
}

export function Loading({ cols = 5, rows = 6 }: LoadingProps) {
  return (
    <table className="w-full mt-2">
      <thead>
        <tr>
          {Array.from(Array(cols).keys()).map((i) => (
            <th
              key={`head-${i}`}
              className="text-slate-400 text-xs font-semibold uppercase text-left p-2 first:pl-0"
            >
              <div className="h-2 bg-gray-400 rounded skeleton animate-shine"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(rows).keys()).map((row) => (
          <tr key={`row-${row}`}>
            {Array.from(Array(cols).keys()).map((col) => (
              <td
                key={`${row}-${col}`}
                className="py-3 px-2 border-t border-slate-200 text-sm first:pl-0 last:pr-0"
              >
                <div className="h-2 bg-gray-300 rounded skeleton animate-shine"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
