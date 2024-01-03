import { Link } from "react-router-dom";
function getValueByKey(key, obj, replacement) {
    return (Array.isArray(key) && key.length > 1 && obj[key[0]] != null)
        ? getValueByKey(key.slice(1), obj[key[0]])
        : (obj[key] || replacement);
}
export default function DataTable({ data, header, }) {


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-100 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((e, idx) => <th key={idx} scope="col" className="px-6 py-3">
                                {e.title}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => <tr key={e._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            {
                                header.map((p, idx) => <td key={idx}
                                    style={{ maxWidth: "200px" }}
                                    className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                                >
                                    {p.link ? <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={p.link + e[p.linkRef]}>{p.title}</Link> :
                                        !p.date ? (p.boolTrue || p.boolFalse) ? (getValueByKey(p.ref, e, p.replacement) ? p.boolTrue : p.boolFalse) : getValueByKey(p.ref, e, p.replacement)

                                            : getValueByKey(p.ref, e, p.replacement).split('T')[0]}

                                </td>)
                            }
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}
