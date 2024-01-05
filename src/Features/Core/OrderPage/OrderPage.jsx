import { useQuery } from "react-query";
import { canceledStages, orderStages, refusedStages } from "../../../Utils/stages";
import { userAxios } from "@/Utils/UserAxios";
import { Link, useParams } from "react-router-dom";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import moment from "moment";
import Button from "@/GeneralElements/Button/Button";
import { useState } from "react";
import OrderModal from "@/GeneralComponents/OrderModal/OrderModal";

function getStatusNumber(status) {
    const arr = (status != "refused" && status != "canceled") ? orderStages : status == "refused" ? refusedStages : canceledStages;
    for (let i = 0; i < (arr).length; i++) {
        if (arr[i].state == status) {
            return i;
        }
    }
    return arr.length;
}
export default function OrderPage({ }) {
    const params = useParams();
    const [loading, setLoading] = useState(null);
    const [showModal, setModal] = useState(false);

    const { isLoading, error, data, refetch } = useQuery(
        "get-order",
        () => userAxios.get(`orders/${params.id}`),
        {
            refetchOnWindowFocus: false,
            enabled: params.id != null && params.id.length == 24,
            retry: 1,
        },
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data == null || data.data.order == null) {
        return <SorryDiv message="لا يمكن ايجاد هذا الطلب, الرجاء المحاولة مع طلب اخر" />
    }
    const order = data.data.order;
    const statusNumber = getStatusNumber(order.status || "");
    const cancelOrder = async () => {
        if (window.confirm("هل أنت متأكد من الغاء الطلب؟")) {
            setLoading('cancel');
            try {
                const res = await userAxios.post(`/orders/${order._id}/cancel`);
                refetch();
            } catch (ex) {
            }
            setLoading(null);
        }
    }

    return (
        <div>
            <h5>طلب رقم #{order.number}</h5>
            <br />
            {
                order.serviceId != null &&
                <OrderModal order={order} refetch={refetch} service={order.serviceId} isOpen={showModal} closeModal={() => setModal(false)} editMode={true} />
            }
            <div className="col-span-2">
                <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                    <h3 className="mb-4 text-xl font-bold">معلومات عن الطلب</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">الذهاب للخدمة </dt>
                            <dd className="text-sm font-semibold text-gray-900">
                                <Link className=" underline text-blue-700" to={order.serviceId != null ? `/services/${order.serviceId._id}` : null}>
                                    {order.serviceId == null ? "تم حذفها من قبل المديرين" : "الخدمة"}
                                </Link>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">رقم الطلب</dt>
                            <dd className="text-sm font-semibold text-gray-900">
                                {order.number}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">تاريخ الإنشاء</dt>
                            <dd className="text-sm font-semibold text-gray-900">
                                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                            </dd>
                        </div>






                        <div className="sm:col-span-2">
                            <dt className="text-lg font-medium text-gray-900">ملاحظات في الطلب</dt>
                            <dt className="mt-1 space-y-3 text-sm text-gray-500">
                                <p className=" leading-7">
                                    {order.notes}
                                </p>
                            </dt>
                        </div>
                    </dl>

                    {
                        order.status == "refused" && <>
                            <br />
                            <div
                                id="alert-2"
                                className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 "
                                role="alert"
                            >
                                <i className="fa-solid fa-circle-exclamation text-2xl"></i>
                                <span className="sr-only">Info</span>
                                <div className="ms-3 text-sm font-medium inline-block w-5/6">
                                    <h6 className=" mb-1 font-bold">سبب الرفض</h6>

                                    <p className=" break-words">{order.refuseReason || ""}</p>
                                </div>

                            </div>

                        </>
                    }
                    {
                        (order.status == "accepted" || order.status == "running") && <>
                            <br />
                            <div
                                id="alert-2"
                                className="flex items-center p-4 mb-4 text-yellow-400 rounded-lg bg-red-50 "
                                role="alert"
                            >
                                <i className="fa-solid fa-circle-check text-2xl"></i>
                                <span className="sr-only">Info</span>
                                <div className="ms-3 text-sm font-medium inline-block w-5/6">
                                    <h6 className=" mb-2 font-bold"> موعد الجلسة التالية</h6>

                                    <p className=" break-words">{order.dateSelected != null ? moment(order.dateSelected).format("LL") : "لم يتم التحديد بعد"}</p>
                                </div>

                            </div>

                        </>
                    }
                    {
                        (order.status == "pending" || order.status == 'canceled' || order.status == 'accepted') && <>
                            <br />
                            <div className="flex flex-row gap-4">
                                <Button loading={loading == 'cancel'} disabled={loading != null} onClick={cancelOrder} text={order.status == 'canceled' ? "تفعيل الطلب" : "الغاء الطلب"} />
                                <Button loading={loading == 'edit'} disabled={loading != null} onClick={() => setModal(true)} text="تعديل الملاحظات" />
                            </div>
                        </>
                    }
                </div>

            </div>
            <br />

            <h5 className=" font-bold">حالة الطلب</h5>
            <br />
            <ol className="items-start sm:flex">
                {
                    ((order.status != "refused" && order.status != "canceled") ? orderStages : order.status == "refused" ? refusedStages : canceledStages)
                        .map((s, idx) => <li key={idx} className="relative mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className={`z-10 flex flex-col items-center justify-center w-10 h-10 bg-[color:${idx <= statusNumber ? "var(--primary)" : "var(--secondary)"}] rounded-full ring-0 ring-white  sm:ring-8  shrink-0`}>
                                    <i className={s.icon}></i>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 " />
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    {s.name}
                                </h3>
                                <p className="text-base font-normal text-gray-500 ">
                                    {s.description}
                                </p>
                            </div>
                        </li>)
                }


            </ol>

        </div>

    )
}
