import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { Link, useNavigate, useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';


import { useState } from "react";
import Button from "@/GeneralElements/Button/Button";
import { toast } from "react-toastify";
import AdminRolesComponent from "./Components/AdminRolesComponent/AdminRolesComponent";


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function AdminPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    const { isLoading, error, data, refetch } = useQuery(
        `get-admin-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`admins/${searchParams.id || ""}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.admin == null) {
        return <SorryDiv message="هذا المدير غير موجودة, الرجاء المحاولة مرة اخرى مع مستخدم اخر" />
    }
    const admin = data.data.admin;

    const banUser = async () => {
        if (window.confirm(`هل أنت متأكد من ${admin.suspended ? "تفعيل" : "ايقاف"} المستخدم؟`) && admin != null) {

            setLoading('act');
            try {
                const res = await adminAxios.post(`admins/${admin._id}/suspend`);
                refetch();
                toast(`تم ${admin.suspended ? "تفعيل" : "وقف"} الحساب بنجاح`);
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        }
    }
    const deleteAdmin = async () => {
        if (window.confirm(`هل أنت متأكد من ${admin.suspended ? "تفعيل" : "ايقاف"} المستخدم؟`) && admin != null) {

            setLoading('del');
            try {
                const res = await adminAxios.delete(`admins/${admin._id}/delete`);
                nav('/admin/admins', { replace: true });
            } catch (ex) { }
            setLoading(null);
        }
    }

    return (
        <main>
            <div className="flex gap-5">
                <h5>مدير رقم {admin.number}</h5>
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-2">
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">بيانات المدير</h3>
                            <Link to={`/admin/admins/${admin._id}/edit`}>
                                <Button faicon="fa-solid fa-wand-magic-sparkles" />
                            </Link>
                        </div>
                        <br />
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">رقم المدير</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {admin.number}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">الحساب الرئيسي</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    <i className={`${admin.master ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"} ml-2`}></i>
                                    {admin.master ? "نعم" : "لا"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> اسم المدير</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {admin.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> اسم المستخدم</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {admin.username}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> الايميل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {admin.email}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> رقم الهاتف</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {admin.phone}
                                </dd>
                            </div>



                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">تاريخ إنشاء الحساب</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(admin.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">أخر تعديل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(admin.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">الطلبات المسؤول عنها</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    <Link className="link" to={`/admin/admins/${admin._id}/orders`}>
                                        عرض
                                    </Link>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">الحالة</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    <i className={`${!admin.suspended ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"} ml-2`}></i>
                                    {admin.suspended ? "موقوف" : "غير موقوف"}
                                </dd>
                            </div>

                        </dl>
                        <br />

                        {
                            !admin.master &&
                            <div className="flex flex-row gap-4">
                                <Button disabled={loading != null} loading={loading == 'act'} text={admin.suspended ? "تفعيل الحساب" : "ايقاف الحساب"} onClick={banUser} />
                                <Button disabled={loading != null} loading={loading == 'del'} text="حذف المدير" onClick={deleteAdmin} />
                            </div>
                        }
                    </div>

                </div>
                <AdminRolesComponent roles={admin?.roles} />
            </div>
        </main>
    )
}
