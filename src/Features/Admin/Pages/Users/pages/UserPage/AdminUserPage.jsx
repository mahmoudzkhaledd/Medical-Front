import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';
import UserAddressComponent from "./Components/UserComponent/UserComponent";


import { useState } from "react";
import Button from "@/GeneralElements/Button/Button";
import { toast } from "react-toastify";


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function AdminUserPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(false);

    const { isLoading, error, data, refetch } = useQuery(
        `get-user-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`users/${searchParams.id || ""}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.user == null) {
        return <SorryDiv message="هذا المستخدم غير موجودة, الرجاء المحاولة مرة اخرى مع مستخدم اخر" />
    }
    const user = data.data.user;
    const activeAccount = async () => {
        if (window.confirm("هل أنت متأكد؟") && user != null) {

            setLoading(true);
            try {
                const res = await adminAxios.post(`users/${user._id}/active-account`);
                refetch();
                toast("تمت العميلة بنجاح");
            } catch (ex) {
                toast.error(ex.message);

            }
            setLoading(false);
        }
    }
    const banUser = async () => {
        if (window.confirm(`هل أنت متأكد من ${user.banned ? "الغاء حظر" : "حظر"} المستخدم؟`) && user != null) {

            setLoading(true);
            try {
                const res = await adminAxios.post(`users/${user._id}/ban`);
                refetch();
                toast(`تم ${user.banned ? "الغاء حظر" : "حظر"} المستخدم بنجاح`);
            } catch (ex) {
                toast.error(ex.message);

            }
            setLoading(false);
        }
    }
    const enterUserAccount = async () => {
        setLoading(true);
        try {
            const res = await adminAxios.post(`users/${user._id}/enter-account`);
            if (res.data.token != null) {
                localStorage.setItem('token', res.data.token);
                window.open(`/`)
            }

        } catch (ex) {
            
            toast.error(ex.message);
        }
        setLoading(false);
    }
    return (
        <main>
            <div className="flex gap-5">
                <h5>مستخدم رقم {user.number}</h5>
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">
                <UserAddressComponent user={user} />

                <div className="col-span-2">
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">بيانات المستخدم</h3>
                            <Button loading={loading} disabled={loading} onClick={enterUserAccount} text="دخول الحساب" />
                        </div>
                        <br />
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">رقم المستخدم</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.number}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> اسم المستخدم</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> الايميل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.email}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> رقم الهاتف</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.phone}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> الجنس</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.gender ? "ذكر" : "أنثى"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2"> حالة الحساب</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {user.verifiedEmail ? "مفعل" : "غير مفعل"}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">تاريخ إنشاء الحساب</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">أخر تعديل</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    {moment(user.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-2">الحالة</dt>
                                <dd className="text-sm font-semibold text-gray-900">
                                    <i className={`${!user.banned ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"} ml-2`}></i>
                                    {user.banned ? "محظور" : "غير محظور"}
                                </dd>
                            </div>
                        </dl>
                        <br />
                        <div className="flex flex-row gap-4">
                            <Button disabled={loading} loading={loading} text={!user.banned ? "حظر المستخدم" : "الغاء الحظر"} onClick={banUser} />
                            <Button disabled={loading} loading={loading} text={!user.verifiedEmail ? "تفعيل الحساب" : "الغاء تفعيل الحساب"} onClick={activeAccount} />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
