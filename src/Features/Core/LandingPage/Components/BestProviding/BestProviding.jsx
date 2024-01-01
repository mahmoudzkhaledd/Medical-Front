import ServiceCard from "@/GeneralComponents/ServiceCard/ServiceCard";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function BestProviding() {
    const { isLoading, error, data } = useQuery(
        'get-most-visited-services',
        () => userAxios.get('services/most-visited'),
        {
            retry: 1,
            refetchOnWindowFocus: false,

        }
    );
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <section id="best-providing">
            <div className="flex justify-between items-center mb-5">
                <h5>الخدمات الشائعة</h5>
                <Link to="/services"> {"كل الخدمات >"} </Link>
            </div>
            <div className="grid grid-3 auto-cols-max flex justify-center items-center md:flex md:flex-col md:items-center">
                {
                    (data && data.data && data.data.visited) && data.data.visited.map((e, idx) => <ServiceCard key={idx} service={e} />)
                }

            </div>
        </section>
    )
}
