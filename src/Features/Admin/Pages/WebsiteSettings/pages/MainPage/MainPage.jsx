import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function WebsiteSettingsMainPage({ }) {
    const { isLoading, error, data, refetch } = useQuery(
        `web-configs-get`,
        () => adminAxios.get(`configs`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        });
    const [loading, setLoading] = useState(false);
    const changeWebsiteAvailability = async (available) => {
        if (window.confirm(available == null ? "هل أنت متأكد من حفظ الرسالة؟" : "هل أنت متأكد من ايقاف الموقع؟")) {
            const message = document.getElementById('closed-message').value;
            setLoading(true);
            try {
                const res = await adminAxios.post(`configs/change-available`, { message, available: available });
                refetch();

            } catch (ex) { }
            setLoading(false);
        }
    }
    if (isLoading) {
        return <Spinner />;
    }
    const configs = data.data.configs;
    if (error || data == null || configs == null) {
        return <SorryDiv message="حدث خطأ الرجاء المحاولة في وقت لاحق" />
    }
    return (
        <div>
            <h5>اعدادات الموقع</h5>
            <br />
            <div className="grid grid-2">
                <div className="w-100 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className=" text-lg font-bold">
                        الاعدادات الرئيسية
                    </h5>

                </div>
                <div className="w-100 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className=" text-lg font-bold">
                        ايقاف الموقع
                    </h5>
                    <br />
                    <div className="flex flex-col gap-4">
                        <TextBox id={'closed-message'} maxLength={100} disabled={loading} initialValue={configs.closedMessage} className="w-100" placeholder="جاري عمل صيانة للموقع ..." label="الرسالة" />
                        <div className="flex flex-row gap-2 mt-2 justify-between">
                            <Button loading={loading} disabled={loading} onClick={() => changeWebsiteAvailability(null)} text="حفظ" />
                            <Button loading={loading} disabled={loading} onClick={() => changeWebsiteAvailability(!configs.available)} text={configs.available ? "ايقاف" : "تفعيل"} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
