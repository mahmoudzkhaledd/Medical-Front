import { Route, Routes } from "react-router-dom";
import AdminServicesPage from "./Pages/MainPage/View/AdminServicesPage";
import AddServicePage from "./Pages/AddServicePage/view/AddServicePage";
import ServicePage from "./Pages/ServicePage/ServicePage";
import ServiceOrdersPage from "./Pages/ServiceOrdersPage/View/ServiceOrdersPage";

export default function AdminServicesRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminServicesPage />} />
            <Route path="/:id" element={<ServicePage />} />
            <Route path="/:id/edit" element={<AddServicePage editMode={true} />} />
            <Route path="/:id/orders" element={<ServiceOrdersPage />} />
            <Route path="/new-service" element={<AddServicePage />} />
        </Routes>
    );
}