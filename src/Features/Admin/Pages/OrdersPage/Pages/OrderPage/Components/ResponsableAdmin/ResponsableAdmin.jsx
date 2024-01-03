import Button from "@/GeneralElements/Button/Button";
import { useContext, useState } from "react";
import AddResponsableAdminModal from "../AddAdminModal/AddResponsableAdminModal";
import { adminAxios } from "@/Utils/AdminAxios";
import { orderContext } from "../../OrderContext/OrderContext";
import { Link } from "react-router-dom";

export default function ResponsableAdmin({ responableAdmins = [], refetch }) {
    const order = useContext(orderContext).order;

    const [loading, setLoading] = useState(null);
    const [showModal, setModal] = useState(false);
    const deleteAdmin = async (id, index) => {
        if (id == null || !window.confirm("هل أنت متأكد من حذف المدير من الطلب؟")) return;
        console.log(id);
        setLoading(index)
        try {
            const res = await adminAxios.delete(`/orders/${order._id}/admins/${id}`);
            refetch();
        } catch (ex) {

        }
        setLoading(null)
    }
    if (order == null) {
        return <></>
    }
    const refetchData = async () => {
        setLoading('ref');
        await refetch();
        setLoading(null);
    }
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            {
                showModal && <AddResponsableAdminModal isOpen={showModal} closeModal={() => setModal(false)} />
            }
            <div className="flex flex-row justify-between items-center">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    المسؤولين عن الطلب
                </h5>
                <Button loading={loading == 'ref'} disabled={loading != null} onClick={refetchData} faicon="fa-solid fa-arrows-rotate" />
            </div>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                المديرين المسؤولين عن الطلب ومتابعة الطلب
            </p>
            <ul className="my-4 space-y-3">
                {
                    responableAdmins.map((e, idx) => <li key={idx} className="flex cursor-pointer items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <Link className="w-100" to={`/admin/admins/${e._id}`} >
                            <span className="flex-1 ms-3 ">{e.name}</span>
                        </Link>
                        <Button loading={loading == idx} disabled={loading != null} onClick={() => deleteAdmin(e._id, idx)} faicon="fa-solid fa-xmark" />
                    </li>)
                }

            </ul>
            <div>
                <Button onClick={() => setModal(true)} text="اضافة مديرين" width={'100%'} />
            </div>
        </div>


    )
}
