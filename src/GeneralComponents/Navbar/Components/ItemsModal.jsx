import Button from '@/GeneralElements/Button/Button'
import { logOutUser } from '@/hooks/UserRedux/UserModelSlice'
import { userStore } from '@/hooks/UserRedux/UserStore'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
export default function ItemsModal({ closeModal, isOpen }) {
    const nav = useNavigate();
    const disp = useDispatch();
    const logOut = () => {
        disp(logOutUser());
        nav(0);
        return;
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                <div className="mt-2">
                                    <a href="/#landing-header" onClick={closeModal}><Button className="mb-3" text={"الرئيسية"} width={"100%"} /></a>
                                    <a href="/#best-providing" onClick={closeModal}><Button className="mb-3" text={"الخدمات"} width={"100%"} /></a>
                                    <a href="/#about-us" onClick={closeModal}><Button className="mb-3" text={"من نحن"} width={"100%"} /></a>
                                    <Link to="/contact" onClick={closeModal}><Button className="mb-3" text={"اتصل بنا"} width={"100%"} /></Link>

                                    {
                                        userStore.getState().user.user == null ? <>
                                            <Link to="/login" onClick={closeModal}>
                                                <Button
                                                    className="mb-3"
                                                    width={"100%"}
                                                    color="transparent"
                                                    bordered={true}
                                                    borderColor="var(--text)"
                                                    borderWidth={2}
                                                    faicon="fa-solid fa-circle-arrow-left"
                                                    text="تسجيل الدخول"
                                                />
                                            </Link>
                                            <Link to="/register" onClick={closeModal}>
                                                <Button
                                                    width={"100%"}
                                                    className="mb-3"
                                                    color="var(--text)"
                                                    textColor="var(--text-invert)"
                                                    faicon="fa-solid fa-circle-plus"
                                                    text="إنشاء حساب جديد" />
                                            </Link>
                                        </> : <>
                                            <Link to="/orders" onClick={closeModal}>
                                                <Button className="mb-3" text={"طلباتي"} width={"100%"} />
                                            </Link>
                                            <Link to="/settings" onClick={closeModal}>
                                                <Button className="mb-3" text={"اعدادات الحساب"} width={"100%"} />
                                            </Link>
                                            {
                                                (userStore.getState().user.user != null && !userStore.getState().user.user.verifiedEmail) &&
                                                <Link to="/verify-email" onClick={closeModal}>
                                                    <Button className="mb-3" text={"تفعيل الحساب"} width={"100%"} />
                                                </Link>
                                            }
                                            <Button
                                                color="var(--text)"
                                                textColor="var(--text-invert)"
                                                borderRadius={30}
                                                onClick={logOut}
                                                faicon="fa-solid fa-right-from-bracket"
                                                text="تسجيل الخروج" />
                                        </>
                                    }
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


