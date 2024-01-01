import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import OrderModal from "../../../GeneralComponents/OrderModal/OrderModal";
import { useState } from "react";

export default function ServiceDetailsPage({ }) {
    const params = useParams();
    const [showModal, setShowModal] = useState(false);

    const { isLoading, error, data, } = useQuery(
        "get-service",
        () => userAxios.get(`services/${params.id}`),
        {
            retry: 1,
            refetchOnWindowFocus: false,
            enabled: params.id != null && params.id.length == 24,
        }
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data == null || data.data.service == null) {
        return <SorryDiv message="لم نتمكن من العثور على الخدمة المطلوبة الرجاء اعادة المحاولة مع خدمة مختلفة" />;
    }
    const service = data.data.service;

    return (
        <section >
            <OrderModal  isOpen={showModal} service={service} closeModal={() => setShowModal(false)} />
            <div className="container mx-auto px-4">

                <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-3 lg:row-end-1">
                        <div className="lg:flex lg:items-start">
                            <div className="lg:order-2 lg:ml-5">
                                <div className="max-w-xl overflow-hidden rounded-lg">
                                    <img
                                        className="w-full max-w-full object-cover"
                                        src={service.thumbnailImage?.url || "https://www.lumahealth.com/wp-content/uploads/2023/09/Chiang-Mai-hospitals.jpg"}
                                        alt=""
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                            {service.name}
                        </h1>
                        <div className="mt-5 flex items-center justify-between">

                            <p className="ml-2 text-sm font-medium text-gray-500">
                                تقييم   {service.rating || 0}
                            </p>
                            <div className="flex items-center">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <p className="ml-2 text-sm font-medium text-gray-500">
                                تصنيف
                            </p>
                            <p className="ml-2 text-sm font-medium text-gray-500">
                                {service.category}
                            </p>
                        </div>

                        <div className="mt-10 gap-4 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                            <div className="flex items-end">
                                <h1 className="text-3xl font-bold">{service.price}</h1>
                                <span className="text-base"> &nbsp; جنيه   </span>
                            </div>

                            <Button
                                onClick={() => setShowModal(true)}
                                icon={<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0 mr-3 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>}
                                className="bg-gray-900 text-center text-base font-bold text-white hover:bg-gray-800 px-12 py-3 md:px-5" text="طلب الان" />
                            {/* <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                            >

                                طلب الان
                            </button> */}
                        </div>

                    </div>
                    <div className="lg:col-span-3">
                        <div className="border-b border-gray-300">
                            <nav className="flex gap-4">
                                <a
                                    href="#"
                                    title=""
                                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                >
                                    {" "}
                                    الوصف{" "}
                                </a>

                            </nav>
                        </div>
                        <div className="mt-8 flow-root sm:mt-12">
                            <h1 className="text-3xl font-bold">مميزات الخدمة</h1>
                            <p className="mt-4 leading-8">
                                {service.description}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
