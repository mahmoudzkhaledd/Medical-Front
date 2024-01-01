import { Link } from "react-router-dom";

export default function ServicesTable({ data, onDelete }) {


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-100 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            رقم الخدمة
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الخدمة
                        </th>
                        <th scope="col" className="px-6 py-3">
                            السعر
                        </th>
                        <th scope="col" className="px-6 py-3">
                            التصنيف
                        </th>
                        <th scope="col" className="px-6 py-3">
                            تاريخ الإضافة
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, idx) => <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td
                                style={{ maxWidth: "200px" }}
                                className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                            >
                                {e.number}
                            </td>
                            <td
                                style={{ maxWidth: "200px" }}
                                className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                            >
                                {e.name}
                            </td>
                            <td style={{ maxWidth: "200px" }} className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap ">{e.price} جنيه</td>
                            <td style={{ maxWidth: "200px" }} className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap ">{e.category}</td>
                            <td style={{ maxWidth: "200px" }} className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap ">{e.createdAt.split('T')[0]}</td>

                            <td style={{ maxWidth: "200px" }} className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap ">
                                <Link
                                    to={`/admin/services/${e._id}`}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    عرض/تعديل
                                </Link>
                            </td>
                            <td className="px-6 py-4 overflow-hidden overflow-ellipsis max-w-xs font-medium whitespace-nowrap ">
                                <span
                                    onClick={()=> onDelete(e._id)}
                                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    {e.active ? "اخفاء" : "اظهار"}
                                </span>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}
