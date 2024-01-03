
import SearchBar from "../Components/SearchBar";

import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import Pagination from "@/GeneralComponents/Pagination/Pagination";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";

const header = [
    {
        title: "رقم الخدمة",
        ref: ['number'],
    },
    {
        title: "الخدمة",
        ref: ['name'],
    },
    {
        title: "السعر",
        ref: ['price'],
    },
    {
        title: "التصنيف",
        ref: ['category'],
    },
    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,
    },
    {
        title: "عرض/ تعديل",
        ref: [''],
        link: "/admin/services/",
        linkRef: "_id",
    },
   
]
export default function AdminServicesPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
        state: "active",
    });
    let deleteId = null;

    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const state = searchParams.get('state');

    const { isLoading, isError, data, refetch } = useQuery(
        ['get-services', page, search, state],
        () => adminAxios.get(`services?page=${Number(page) - 1 || 0}&search=${search || ""}&state=${state || "all"}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 1,
        }
    );
    const deleteQuery = useQuery(
        ['get-services'],
        () => adminAxios.delete(`services/${deleteId}`),
        {
            enabled: false,
            retry: 1,
            keepPreviousData: true,
        }
    );


    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
            search: search || "",
            state: state || 'all',
        });
    };
    const onSearch = (se) => {

        setSearch({
            page: page || 1,
            search: se.search || "",
            state: se.state || "all",
        });
    };
    

    if (isLoading || deleteQuery.isLoading) {
        return <Spinner />;
    }
    if (isError || deleteQuery.isError) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }
    return (
        <>
            <h5 className=" mb-5">الخدمات</h5>
            <SearchBar selectedState={state} onSearch={onSearch} value={search || ""} />
            
            <DataTable header={header} data={data.data.services} />
            <br />
            <Pagination onChangePage={onChangePage} count={Math.ceil(data.data.count / 10)} current={Number(page) || 1} />
        </>
    )
}
