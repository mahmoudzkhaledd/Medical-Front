import { logOutUser } from "@/hooks/UserRedux/UserModelSlice";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileIcon({ }) {
    const [show, setShow] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();
    const user = userStore.getState().user.user;
    if (user == null) {
        return <></>
    }
    const logOut = () => {
        disp(logOutUser());
        nav(0);
        return;
    };
    return (
        <div className="ml-3">
            <div>
                <button
                    onClick={() => setShow(!show)}
                    type="button"
                    className="flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300"
                    id="user-menu-button-2"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-2"
                >
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="w-8 h-8 rounded-full"
                        src="/images/user.png"
                        alt="user photo"
                    />
                </button>
            </div>
            {
                show && <>
                    <div onClick={() => setShow(false)} className="absolute top-0 left-0 right-0 bottom-0 " />
                    <div
                        className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-300 block"
                        id="dropdown-2"
                        style={{
                            position: "absolute",
                            inset: "auto auto auto auto",
                            margin: 0,
                        }}
                        data-popper-placement="bottom"
                    >

                        <div className="py-3 px-4" role="none">
                            <p className="text-sm" role="none">
                                {user.name}
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                {user.email}
                            </p>
                        </div>
                        <ul className="py-1" role="none">

                            <li>
                                <Link
                                    to="/orders"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    طلباتي
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/settings"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    الاعدادات
                                </Link>
                            </li>
                            {
                                (userStore.getState().user.user != null && !userStore.getState().user.user.verifiedEmail) && <li>
                                    <Link
                                        to="/verify-email"
                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        تفعيل الحساب
                                    </Link>
                                </li>
                            }

                            <li onClick={logOut} className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                                تسجيل الخروج
                            </li>
                        </ul>
                    </div>
                </>
            }
        </div>

    )
}
