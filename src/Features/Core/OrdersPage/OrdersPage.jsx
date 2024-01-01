import { useQuery } from "react-query";
import OrderCard from "./Components/OrderCard/OrderCard";
import { userAxios } from "@/Utils/UserAxios";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";

export default function OrdersPage({ }) {

    const { isLoading, error, data } = useQuery(
        'get-my-orders',
        () => userAxios.get('/orders'),
        {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    )

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.orders == null) {
        return <SorryDiv message="لا يمكن العثور على البيانات الرجاء المحاولة مرة اخرى" />
    }


    return (
        <div className="flex flex-col gap-5">
            {
                data.data.orders.length != 0 ? data.data.orders.map((e, idx) => <OrderCard key={idx} order={e} />)
                    : <SorryDiv message="لم يتم طلب أي خدمة بعد"/>
            }
        </div>
    );
   
}
