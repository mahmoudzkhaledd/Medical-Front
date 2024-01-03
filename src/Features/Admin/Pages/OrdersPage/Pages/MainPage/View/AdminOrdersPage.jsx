import Pagination from "../../../../../../../GeneralComponents/Pagination/Pagination";
import SearchBar from "../Components/SearchBar";

import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";
const header = [
    {
        title: "رقم الطلب",
        ref: ['number'],
        link: "",
    },
    {
        title: "الخدمة",
        ref: ['serviceId', 'name'],
        link: "",
        replacement: "غير موجودة",
    },
    {
        title: "الحالة",
        ref: ['status'],
        link: "",
    },
    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,


    },
    {
        title: "عرض",
        ref: [''],
        link: "/admin/orders/",
        linkRef: "_id"
    },
]
export default function AdminOrdersPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
        state: "all",
        responsable: false,
    });

    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const state = searchParams.get('state');
    const responsable = searchParams.get('responsable');

    const { isLoading, isError, data, refetch } = useQuery(
        ['get-orders', page, search, state, responsable],
        () => adminAxios.get(`orders?page=${Number(page) - 1 || 0}&search=${search || ""}&state=${state || "all"}&responsable=${responsable}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 1,
        }
    );



    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
            search: search || "",
            state: state || 'all',
            responsable: responsable || false,
        });
    };
    const onSearch = (se) => {

        setSearch({
            page: page || 1,
            search: se.search || "",
            state: se.state || "all",
            responsable: se.responsable || false,
        });
    };


    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }

    return (

        <>
            <h5 className=" mb-5">الطلبات</h5>
            <SearchBar responsable={responsable == 'true'} selectedState={state} onSearch={onSearch} value={search || ""} />
            
            <DataTable header={header} data={data.data.orders} />
            <br />
            <Pagination onChangePage={onChangePage} count={Math.ceil((data.data.count || 0) / 10)} current={Number(page) || 1} />
        </>
    )
}
