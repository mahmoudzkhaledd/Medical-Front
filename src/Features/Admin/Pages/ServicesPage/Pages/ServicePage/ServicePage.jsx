import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { Link, useNavigate, useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';
import Button from "@/GeneralElements/Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";



export default function ServicePage({ }) {
    const searchParams = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isLoading, error, data, refetch,remove } = useQuery("get-sertice",
        () => adminAxios.get(`services/${searchParams.id || ""}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error) {
        return <SorryDiv message="هذه الخدمة غير موجودة, الرجاء المحاولة مرة اخرى مع خدمة مختلفة" />
    }
    const disableService = async () => {
        if (window.confirm("هل أنت متأكد من الغاء الخدمة؟") && data.data.service != null) {
            setLoading(true);
            try {
                const res = await adminAxios.delete(`services/${data.data.service._id}`);
                refetch();
                remove();
                toast(`تم ${data.data.service.active ? "الغاء" : "تنشيط"} الخدمة بنجاح`);
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(false);
        }
    };
    const deleteService = async () => {
        if (window.confirm("هل أنت متأكد من حذف الخدمة؟") && data.data.service != null) {
            setLoading(true);
            try {
                const res = await adminAxios.delete(`services/${data.data.service._id}/delete`);
                nav('/admin/services');
                remove();
                toast("تم حذف الخدمة بنجاح");
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(false);
        }
    };

    return (
        <main>
            <div className="flex gap-5">
                <h5>{data.data.service.name}</h5>
                <Link to={window.location.pathname + "/edit"}>
                    <Button className="h-100" faicon="fa-solid fa-wand-magic-sparkles" />
                </Link>
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-full xl:col-auto">
                    {data.data.service.thumbnailImage && <img
                        className="shadow-lg max-w-xs mx-auto shadow-gray-200 rounded-2xl overflow-hidden mb-6"
                        src={data.data.service.thumbnailImage?.url}
                        alt=""
                    />}
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl overflow-hidden mb-6">

                    </div>
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold">الشخص المسؤول</h3>

                            <span className="mt-5 bg-[color:var(--primary)] text-xs font-bold uppercase text-[color:var(--text)] px-3 py-1.5 rounded-md mb-2 mr-2">
                                {data.data.service.adminId?.name || "لا يوجد"}
                            </span>
                        </div>
                    </div>


                </div>
                <div className="col-span-2">
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">معلومات عن الخدمة</h3>
                            <Button loading={loading} disabled={loading} onClick={deleteService} faicon="fa-solid fa-xmark" />
                        </div>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">رقم الخدمة</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {data.data.service.number}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">تاريخ الإنشاء</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(data.data.service.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">أخر تعديل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(data.data.service.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">التصنيف</dt>
                                <dd className="text-sm font-semibold text-gray-900">{data.data.service.category}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">عملية ناجحة</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {data.data.service.doneOrders}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">الطلبات المعلقة</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {data.data.service.pendingOrders}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">السعر</dt>
                                <dd className="text-sm font-semibold text-gray-900">{data.data.service.price} جنيه</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">الحالة</dt>
                                <dd className="text-sm font-semibold text-gray-900">{data.data.service.active ? "نشطة" : "ملغاة"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">الطلبات</dt>
                                <Link className="link" to={`/admin/services/${data.data.service._id}/orders`}>
                                    عرض
                                </Link>
                            </div>

                            <div className="sm:col-span-2">
                                <dt className="text-lg font-medium text-gray-900">وصف الخدمة</dt>
                                <dt className="mt-1 space-y-3 text-sm text-gray-500">
                                    <p className=" leading-7">
                                        {data.data.service.description}
                                    </p>
                                </dt>
                            </div>
                            <div className="sm:col-span-2">
                                <Button disabled={loading} loading={loading} text={data.data.service.active ? "الغاء الخدمة" : "تنشيط لخدمة"} onClick={disableService} />
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </main>
    )
}
