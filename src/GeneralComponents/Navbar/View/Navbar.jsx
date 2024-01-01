import Button from '@/GeneralElements/Button/Button';
import './style.css';
import Logo from '@/GeneralElements/Logo/Logo';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import ItemsModal from '../Components/ItemsModal';
import { userStore } from '@/hooks/UserRedux/UserStore';
import { logOutUser } from '@/hooks/UserRedux/UserModelSlice';
import { useDispatch } from 'react-redux';
import ProfileIcon from '../Components/ProfileIcon';
export default function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate();
    const disp = useDispatch();
    
    return (
        <>
            <ItemsModal closeModal={() => setShowModal(false)} isOpen={showModal} />
            <nav className='main-nav__nav-bar d-space mb-8'>
                <Logo />

                <Button onClick={() => setShowModal(true)} className="sm" icon={<IoMenu />} verticalPadding={15} horizontalPadding={15} borderRadius="50%" />
                <ul className='lg main-nav__items d-flex-1'>
                    <li><a href="/#landing-header">الرئيسية</a></li>
                    <li><a href="/#best-providing">الخدمات</a></li>
                    <li><a href="/#about-us">من نحن</a></li>
                    <li><a href="/#">اتصل بنا</a></li>
                </ul>

                <div className='lg'>


                    {
                        userStore.getState().user.user == null ? <div className='lg d-flex-1'>
                            <Link to="/login">
                                <Button
                                    color="transparent"
                                    bordered={true}
                                    borderColor="var(--text)"
                                    borderWidth={2}
                                    borderRadius={30}
                                    faicon="fa-solid fa-circle-arrow-left"
                                    text="تسجيل الدخول"
                                />
                            </Link>
                            <Link to="/register">
                                <Button
                                    color="var(--text)"
                                    textColor="var(--text-invert)"
                                    borderRadius={30}
                                    faicon="fa-solid fa-circle-plus" text="إنشاء حساب جديد" />
                            </Link>
                        </div> : <ProfileIcon />
                        // <Button
                        //     color="var(--text)"
                        //     textColor="var(--text-invert)"
                        //     borderRadius={30}
                        //     onClick={logOut}
                        //     faicon="fa-solid fa-right-from-bracket"
                        //     text="تسجيل الخروج" />
                    }
                </div>
            </nav>
        </>
    )
}
