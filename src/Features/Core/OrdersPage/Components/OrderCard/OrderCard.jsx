import moment from "moment";
import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
    return (
        <Link
            to={`/orders/${order._id}`}
            className="flex px-5 flex-row items-center bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <div className="flex flex-col font-bold text-4xl items-center justify-center w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg">
                {order.number}
            </div>
            <div className="flex flex-col justify-between px-4 leading-normal w-100">
                <h5 className="mb-2 break-words py-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {order.serviceId?.name }
                </h5>
                <p className="mb-2 font-normal text-gray-500 dark:text-gray-400">
                    {(order.notes || "").length == 0 ? "لا يوجد ملاحظات" : (order.notes || "")}
                </p>
                <p className="mb-2 text-gray-400 dark:text-gray-400">
                    {"تاريخ الانشاء " + moment(order.createdAt, "").fromNow()}
                </p>
            </div>
        </Link>

    )
}
