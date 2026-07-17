export function SkeletonTable({
  rows = 5,
  columns = 5,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden animate-pulse">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th
                key={index}
                className="px-6 py-4"
              >
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100"
            >
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-6 py-4"
                >
                  <div
                    className={`
                      h-4
                      rounded
                      bg-gray-200
                      ${
                        columnIndex === 0
                          ? 'w-16'
                          : columnIndex === columns - 1
                          ? 'w-24'
                          : 'w-32'
                      }
                    `}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonTable;