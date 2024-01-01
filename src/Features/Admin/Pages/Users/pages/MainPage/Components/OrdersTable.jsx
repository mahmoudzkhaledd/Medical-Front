import moment from "moment";
import { Link } from "react-router-dom";

export default function OrdersTable({ data, onDelete }) {

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-100 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            رقم المستخدم
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الاسم
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الايميل
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الحالة
                        </th>
                        <th scope="col" className="px-6 py-3">
                            تاريخ التسجيل
                        </th>
                        <th scope="col" className="px-6 py-3">
                           عرض
                        </th>
                       
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
                            <td
                                style={{ maxWidth: "200px" }}
                                className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                            >
                                {e.email}
                            </td>
                            <td
                                style={{ maxWidth: "200px" }}
                                className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                            >
                                {e.banned ? "محظور" : "غير محظور"}
                            </td>
                            <td
                                style={{ maxWidth: "200px" }}
                                className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                            >
                                {moment(e.createdAt).format("LL")}
                            </td>

                            
                            <td style={{ maxWidth: "200px" }} className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap ">
                                <Link
                                    to={`/admin/users/${e._id}`}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    عرض
                                </Link>
                            </td>
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}
