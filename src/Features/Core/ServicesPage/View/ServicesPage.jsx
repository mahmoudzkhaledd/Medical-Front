import CustomHeader from "@/GeneralComponents/LandingHeader/CustomHeader";
import Pagination from "@/GeneralComponents/Pagination/Pagination";
import ServiceCard from "@/GeneralComponents/ServiceCard/ServiceCard";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export default function ServicesPage({ }) {

    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
    });
    const page = searchParams.get('page');
    const search = searchParams.get('search');

    const { isLoading, error, data } = useQuery(
        ["get-services", page, search],
        () => userAxios.get(`services?page=${Number(page) - 1 || 0}&search=${search || ""}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    );
    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
            search: search || "",
        });
    };
    const onSearch = (se) => {
        setSearch({
            page: page || 1,
            search: se || "",
        });
    };
    return (
        <section>
            <CustomHeader />
            <div className="flex flex-row flex-wrap justify-center gap-4 ">
                {
                    (userStore.getState().user.user != null && localStorage.getItem('token') != null) ?
                        isLoading ? <Spinner /> : data && data.data.services && (
                            data.data.services.length > 0 ? data.data.services.map((e, idx) => <ServiceCard key={idx} service={e} />) :
                                <SorryDiv message="لا يوجد بيانات الى الان, الرجاء العودة في وقت لاحق"/>
                        )
                        :
                        <div className="w-100 h-56 flex flex-col items-center justify-center">
                            <h5>من فضلك سجل الدخول حتى تتمكن من تصفح جميع الخدمات</h5>
                        </div>
                }
            </div>

            <Pagination onChangePage={onChangePage} className=" mt-10" current={Number(page) || 1} count={data != null ? Math.ceil(data.data.count / 10) || 0 : 0} />
        </section>
    )
}
