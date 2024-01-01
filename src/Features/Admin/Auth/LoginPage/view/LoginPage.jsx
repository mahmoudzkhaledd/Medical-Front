import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import adminModel from "@/Models/AdminModel";
import { adminAxios } from "@/Utils/AdminAxios";
import { setAdmin } from "@/hooks/AdminRedux/AdminModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AdminLoginPage({ }) {
    const nav = useNavigate();
    const disp = useDispatch();
    const[loading,setLoading] = useState(false);
    const login = async (e) => {
        e.preventDefault();
        const { username, password, pinNumber } = Object.fromEntries(new FormData(document.getElementById('frm-login')).entries());
       setLoading(true);
        try {
            const res = await adminAxios.post('login', {
                username,
                password,
                pinNumber,
            });
            const data = await adminModel.safeParseAsync(res.data.admin);

            if (res.status == 200 && data.success) {
                disp(setAdmin(data.data));
                nav('/admin');
            } else {
                throw new Error("خطأ في البيانات");
            }
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            const res = ex.response;
            if (res == null) return;
            // if (res.status == 401) {
            //     toast.error("الرجاء التحقق من الايميل او الباسورد");
            // }else if(res.status == 402){
            //     toast.error("لقد تم ايقاف حسابك الرجاء التواصل مع صاحب الموقع");
            // }else{
            //     toast.error(ex.message);
            // }
        }
    }

    return (
        <section >

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            تسجيل الدخول الأدمن
                        </h1>
                        <form id="frm-login" className="space-y-4 md:space-y-6 flex flex-col gap-0" action="#" onSubmit={login}>
                            <TextBox  dir="ltr" name="username" placeholder="اسم المستخدم" label="اسم المستخدم" />
                            <TextBox  dir="ltr" name="password" type="password" placeholder="كلمة المرور" label="كلمة المرور" />
                            <TextBox  dir="ltr" name="pinNumber" placeholder="رمز الحماية" label="رمز الحماية" />
                            <Button disabled={loading} loading={loading} text="تسجيل الدخول" width="100%" />
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}
