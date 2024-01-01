import { Route, Routes, } from 'react-router-dom';
import LandingPage from './LandingPage/View/LandingPage';
import ServicesPage from './ServicesPage/View/ServicesPage';
import ServiceDetailsPage from './ServiceDetailsPage/ServiceDetailsPage';
import OrdersPage from './OrdersPage/OrdersPage';
import OrderPage from './OrderPage/OrderPage';
import ProfileSettingsPage from './ProfileSettings/ProfileSettingsPage';


export default [
    <Route key={'/'} path='/' element={<LandingPage />} />,
    <Route key={'/settings'} path='/settings' element={<ProfileSettingsPage />} />,
    <Route key={'/services'} path='/services' element={<ServicesPage />} />,
    <Route key={'/services/:id'} path='/services/:id' element={<ServiceDetailsPage />} />,
    <Route key={'/orders'} path='/orders' element={<OrdersPage />} />,
    <Route key={'/orders/:id'} path='/orders/:id' element={<OrderPage />} />,
]


