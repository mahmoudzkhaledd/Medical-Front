
import { useEffect, useState } from "react";
import { adminConfig } from "../../../AdminConfig";
import { adminAxios } from "@/Utils/AdminAxios";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";

export default function AdminMainPage({ }) {
    const [data, setData] = useState({
        data: null,
        loading: true,
    });
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await adminAxios.get('counters');

                setData({
                    data: res.data.counters,
                    loading: false,
                });
            } catch (ex) {
                setData({
                    data: null,
                    loading: false,
                });
            }
        }
        loadData();
    }, []);
    if (data.loading) {
        return <Spinner />
    }
    if (data.data == null) {
        return <SorryDiv message="حدث خطا, الرجاء اعادة المحاولة" />
    }
    const obj = {};
    for (const c of data.data) {
        obj[c._id] = c.seq;
    }
    return (
        <div className="minpage__content flex flex-row flex-wrap gap-5" >
            {
                adminConfig.homepageCards.map((e, idx) =>
                    <div key={idx} className="flex flex-item gap-4 items-center px-7 py-4 bg-[color:var(--secondary)] rounded-lg shadow-xs">
                        <div className="w-10 h-10 flex flex-col items-center justify-center text-blue-500 bg-blue-100 rounded-full">
                            <i className={e.icon} />
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                {e.title}
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                {obj[e.ref] || 0}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>

    )
}
