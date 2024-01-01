import Button from "@/GeneralElements/Button/Button";
import Logo from "@/GeneralElements/Logo/Logo";
import { IoMenu } from "react-icons/io5";
import AdminModal from "./Components/AdminModal/AdminModal";
import { useState } from "react";
import { useResolvedPath } from "react-router-dom";

export default function AdminNavbar({ }) {
    const [showModal, setShowModal] = useState(false);
    const path = useResolvedPath();

    return (
        <div className="sm flex flex-row justify-between items-center p-5 bg-[color:var(--secondary)]">
            <AdminModal selected={path.pathname == '/admin' ? "" : path.pathname.split('/admin/')[1].split('/')[0]} closeModal={() => setShowModal(false)} isOpen={showModal} />
            <Logo link="/admin"/>
            <Button onClick={() => setShowModal(true)} className="sm" icon={<IoMenu />} verticalPadding={15} horizontalPadding={15} borderRadius="50%" />
        </div>
    )
}
