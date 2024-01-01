import Button from '@/GeneralElements/Button/Button'
import { adminAxios } from '@/Utils/AdminAxios'
import { userStore } from '@/hooks/UserRedux/UserStore'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { orderContext } from '../../OrderContext/OrderContext'
import Spinner from '@/GeneralElements/Spinner/Spinner'
import SorryDiv from '@/GeneralComponents/SorryDiv/SorryDiv'
import { Link } from 'react-router-dom'
export default function AddResponsableAdminModal({ closeModal, isOpen }) {
    const order = useContext(orderContext).order;
    const [loading, setLoading] = useState(false);

    const { isLoading, error, data, refetch } = useQuery(
        "get-admins-for-order",
        () => order != null ? adminAxios.get(`/orders/${order._id}/admins`) : null,
        {
            enabled: order != null,
            refetchOnWindowFocus: false,
            retry: 1,
        }
    )
    if (order == null) {
        return <></>;
    }
    const addAdmin = async (id) => {
        if (id == null) return;
        setLoading(true)
        try {
            const res = await adminAxios.post(`/orders/${order._id}/admins`, { adminId: id });
            refetch();
        } catch (ex) {

        }
        setLoading(false)
    }
    return (
        <Transition appear show={isOpen || false} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                                <h5>اضافة مديرين للطلب</h5>
                                {
                                    isLoading ? <Spinner /> : (error || data.data.admins == null) ? <SorryDiv message='حدثت مشكلة الرجاء المحاولة مرة اخرى' /> : <></>
                                }
                                {
                                    (!isLoading && !error && data != null && data.data.admins != null) && <>
                                        {
                                            data.data.admins.length == 0 ?
                                                <SorryDiv message='لا يوجد مديرين للاضافة' /> :
                                                <ul className="my-4 space-y-3">
                                                    {
                                                        data.data.admins.map((e, idx) =>
                                                            <li key={idx} className="flex justify-between cursor-pointer items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                                <Link className='w-100' target='__blank' to={`/admin/admins/${e._id}`} >
                                                                    <span className="flex-1 ms-3 ">{e.name}</span>
                                                                   
                                                                </Link>
                                                                <Button loading={loading} disabled={loading} onClick={() => addAdmin(e._id)} faicon="fa-solid fa-add" />
                                                            </li>)
                                                    }
                                                </ul>
                                        }
                                    </>

                                }


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
