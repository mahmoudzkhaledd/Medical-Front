import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
const schema = z.object({
    address: z.string().min(0).max(200, { message: "يجب أن يكون العنوان 200 حرف بحد اقصى" }),
    city: z.string().min(0).max(100, { message: "يجب أن تكون المدينة 100 حرف بحد اقصى" }),
    street: z.string().min(0).max(100, { message: "يجب أن يكون الشارع 100 حرف بحد اقصى" }),
    phone: z.string().min(0).max(15, { message: "يجب أن يكون رقم الهاتف 15 حرف بحد اقصى" }),
});
const schemaPassword = z.object({
    oldPassword: z.string()
        .min(8, { message: "يجب أن يكون الباسورد 8 حرف بحد ادنى" })
        .max(200, { message: "يجب أن يكون الباسورد 200 حرف بحد اقصى" }),
    newPassword: z.string()
        .min(8, { message: "يجب أن يكون الباسورد 8 حرف بحد ادنى" })
        .max(200, { message: "يجب أن يكون الباسورد 200 حرف بحد اقصى" }),
});
export default function ProfileSettingsPage({ }) {
    const [loading, setLoading] = useState(null);
    const user = userStore.getState().user.user;
    const saveChanges = async () => {
        const { address, city, street, phone } = Object.fromEntries(new FormData(document.getElementById('frm-changes')).entries());
        setLoading('save');
        try {
            const data = await schema.parseAsync({ address, city, street, phone });
            const res = await userAxios.post('update-account', data);
            toast("تم التغيير بنجاح");
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            } else {
                toast.error(ex.message);
            }
        }
        setLoading(null);
    };
    const resetPassword = async () => {
        const { oldPassword, newPassword, newPasswordConfirm } = Object.fromEntries(new FormData(document.getElementById("frm-reset-password")).entries());
        setLoading('pass');
        try {
            const data = await schemaPassword.parseAsync({ oldPassword, newPassword, newPasswordConfirm });
            if (data.newPassword != newPasswordConfirm) {
                throw new Error('كلمات المرور غير متطابقة');
            }
            const res = await userAxios.post('reset-password', data);
            toast("تم التغيير بنجاح");
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            } else {
                toast.error(ex.message);
            }
        }
        setLoading(null);
    };
    return (
        <main>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-6">
                <div className="col-span-full mb-4 xl:mb-0">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                        اعدادات البروفايل
                    </h1>
                </div>
                
                <div className="col-span-2">
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <h3 className="mb-4 text-xl font-bold">معلومات الحساب</h3>
                        <form id="frm-changes" action="#" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} maxLength={200} initialValue={user.address} name="address" placeholder="العنوان" label="العنوان" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} maxLength={100} initialValue={user.city} name="city" placeholder="المدينة" label="المدينة" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} maxLength={100} initialValue={user.street} name="street" placeholder="الشارع" label="الشارع" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={true} initialValue={user.email} name="email" placeholder="الايميل" label="الايميل" type="email" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} maxLength={15} initialValue={user.phone} name="phone" placeholder="رقم الهاتف" label="رقم الهاتف" type="number" />
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <Button loading={loading == 'save'} disabled={loading != null} text="حفظ التغييرات" onClick={saveChanges} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                        <h3 className="mb-4 text-xl font-bold">اعادة تعيين كلمة المرور</h3>
                        <form id="frm-reset-password" action="#" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} name="oldPassword" placeholder="••••••••" label="الباسورد الحالي" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} name="newPassword" placeholder="••••••••" label="الباسورد الجديد" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextBox disabled={loading} name="newPasswordConfirm" placeholder="••••••••" label="اعادة الباسورد الجديد" />
                                </div>

                                <div className="col-span-6 sm:col-full">
                                    <Button disabled={loading != null} onClick={resetPassword} loading={loading == 'pass'} text="اعادة التعيين" />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </main>
    )
}
