import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { Link, useNavigate, useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';
import { orderStages } from "@/Utils/stages";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import Button from "@/GeneralElements/Button/Button";
import { useContext, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import UserAddressComponent from "../../../Users/pages/UserPage/Components/UserComponent/UserComponent";
import ResponsableAdmin from "./Components/ResponsableAdmin/ResponsableAdmin";
import { orderContext } from "./OrderContext/OrderContext";
const shcema = z.object({
    status: z.enum([...orderStages.map(e => e.state), 'refused'],),
    dateSelected: z.date().nullable().optional(),
    refuseReason: z.string().max(1000, { message: "يجب الا تزيد الرسالة عن 1000 حرف" }).optional(),
});
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function AdminOrderPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    const ctx = useContext(orderContext);
    const { isLoading, error, data,refetch } = useQuery(
        `get-order-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`orders/${searchParams.id || ""}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.order == null) {
        return <SorryDiv message="هذه الخدمة غير موجودة, الرجاء المحاولة مرة اخرى مع خدمة مختلفة" />
    }
    const order = data.data.order;
    const changeOrderState = async () => {
        const { status, dateSelected, refuseReason } = Object.fromEntries(new FormData(document.getElementById('frm-change-state')).entries());
        setLoading('state');
        try {
            const data = await shcema.parse({ status, dateSelected: dateSelected != "" ? new Date(dateSelected) : null, refuseReason });

            const res = await adminAxios.post(`orders/${order._id}/change-state`, data);
            refetch();
            toast("تم تغيير الحالة بنجاح");
        } catch (ex) {

            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0])
            } else if (ex.response != null && ex.response.data.errors != null && ex.response.data.errors.length != 0) {
                toast.error(ex.response.data.errors[0].msg);
            }
            else {
                toast.error(ex.message);
            }
        }
        setLoading(null);
    }
    const clearDate = () => {
        document.getElementById('date').value = null;
    };
    const deleteOrder = async () => {
        if (window.confirm("هل أنت متأكد من حذف الطلب؟") && order != null) {
            setLoading('del');
            try {
                const res = await adminAxios.delete(`orders/${order._id}/delete`);
                nav('/admin/orders');
            } catch (ex) {

            }
            setLoading(null);
        }
    };
    const splt = order.dateSelected?.split('/') || [];
    const date = splt.length != 3 ? null : `${pad(splt[2], 4, 0)}-${pad(splt[0], 2, 0)}-${pad(splt[1], 2, 0)}`;
    if (ctx.order == null) {
        ctx.order = order;
    }
    return (
        <main>

            <div className="flex gap-5">
                <h5>طلب رقم {order.number}</h5>

            </div>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-full xl:col-auto">
                    {order.serviceId?.thumbnailImage && <img
                        className="shadow-lg max-w-xs mx-auto shadow-gray-200 rounded-2xl overflow-hidden mb-6"
                        src={order.serviceId.thumbnailImage?.url}
                        alt=""
                    />}
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl overflow-hidden mb-6">

                    </div>

                    <UserAddressComponent openAccountArrow={true} user={order.userId} />
                    <br />
                    <ResponsableAdmin refetch={refetch} responableAdmins={order.responsableAdmins} />
                </div>
                <div className="col-span-2">
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">بيانات الطلب</h3>
                            <Button loading={loading == 'del'} disabled={loading != null} onClick={deleteOrder} faicon="fa-solid fa-xmark" />
                        </div>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">رقم الطلب</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {order.number}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> الخدمة</dt>
                                <Link to={order.serviceId != null ? `/admin/services/${order.serviceId?._id}` : null}
                                    className="link text-sm font-semibold text-gray-900">
                                    {order.serviceId?.name || "تم حذفها"}
                                </Link>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">تاريخ الجلسة التالية</dt>
                                <dd
                                    className="text-sm font-semibold text-gray-900">
                                    {order.dateSelected == null ? "لم يتم التحديد" : moment(order.dateSelected).format("MMMM Do YYYY")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">تاريخ الإنشاء</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">أخر تعديل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(order.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">الحالة</dt>
                                <dd className="text-sm font-semibold text-gray-900">{order.status}</dd>
                            </div>




                            <div className="sm:col-span-2">
                                <dt className="text-lg font-medium text-gray-900 mb-2">ملاحظات من العميل </dt>
                                <dt className="mt-1 space-y-3 text-sm text-gray-500">
                                    <p className=" leading-7">
                                        {order.notes}
                                    </p>
                                </dt>
                            </div>
                        </dl>
                    </div>
                    <form id="frm-change-state" onSubmit={(e) => e.preventDefault()} className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6 flex flex-col gap-4">
                        <h3 className="text-xl font-bold">حالة الطلب</h3>
                        <div >
                            <label
                                htmlFor="status"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                تغيير حالة الطلب
                            </label>
                            <select
                                id="status"
                                name="status"
                                defaultValue={order.status}
                                disabled={loading}
                                className="bg-gray-50 px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {
                                    orderStages.map((e, idx) => <option key={idx} value={e.state} >{e.name}</option>)
                                }
                                <option value={"refused"} >تم الرفض</option>
                            </select>
                        </div>
                        <div className="flex flex-row gap-4 w-100 items-end">
                            <TextBox initialValue={date} id={'date'} disabled={loading} width={'100%'} name="dateSelected" label="الجلسة التالية" placeholder="الجلسة التالية" type="date" textAlign={"end"} />
                            <Button height={47} onClick={clearDate} faicon="fa-solid fa-xmark" />
                        </div>
                        <TextBox disabled={loading} name="refuseReason" initialValue={order.refuseReason} area={true} label="سبب الرفض (ان تم الرفض)" placeholder="سبب الرفض" />
                        <Button disabled={loading != null} loading={loading == 'state'} onClick={changeOrderState} text="تغيير الحالة" />
                    </form>
                </div>
            </div>
        </main>
    )
}
