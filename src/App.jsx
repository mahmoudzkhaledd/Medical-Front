import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from 'react-router-dom';
import CoreRoutes from './Features/Core/CoreRoutes';
import Navbar from './GeneralComponents/Navbar/View/Navbar';
import AuthRoutes from './Features/Auth/AuthRoutes';
import NotFoundPage from './Features/Core/404/NotFoundPage';
import Footer from './GeneralComponents/Footer/Footer';
import AdminRoutes from './Features/Admin/AdminRoutes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Spinner from './GeneralElements/Spinner/Spinner';
import SorryDiv from './GeneralComponents/SorryDiv/SorryDiv';
import { userAxios } from './Utils/UserAxios';
import { useDispatch } from 'react-redux';
import { logOutUser, setUser } from './hooks/UserRedux/UserModelSlice';
import UserProvider from './hooks/UserRedux/UserProvider';
import userModel from './Models/UserModel';
import { useEffect, useLayoutEffect } from 'react';
const protectedRoutes = [
  '/settings',
  "/verify-email",
]
function MainRoute() {

  const path = window.location.pathname;
  const disp = useDispatch();
  const nav = useNavigate();

  const { isLoading, error, data, refetch } = useQuery(
    "get-client",
    () => userAxios.post('login/token').then((d) => {
      const user = userModel.parse(d.data.user);
      if (user != null) {
        disp(setUser(d.data.user));
      }
      return user;
    }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: false,
      enabled: localStorage.getItem('token') != null,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error != null && error.response != null && error.response.status == 501) {
    return <div className='w-screen h-screen flex flex-col text-center px-4 justify-center items-center'>
      <SorryDiv message={error.response.data.message} />
    </div>;
  }
  if (error != null && error.response != null && error.response.status == 403) { 
    disp(logOutUser());
    window.location.href = '/';
    return 
  }
  if (data != null && localStorage.getItem('token') != null) {
    if (data.verifiedEmail && path == "/verify-email") {
      return <Navigate to={"/"} replace={true} />;
    }
    if (path == "/login" || path == "/register") {
      return <Navigate to={"/"} replace={true} />;
    }
  } else {
    if (protectedRoutes.includes(path)) {
      return <Navigate to={"/"} replace={true} />;
    }
  }
  if (error != null && error.response != null && error.response.status == 401) {

    disp(logOutUser());
    nav(0);
    return;
  }
  return (
    <div className="screen-padding">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

const queryClient = new QueryClient();
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainRoute />}>
              {CoreRoutes}
              {AuthRoutes}
            </Route>
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
