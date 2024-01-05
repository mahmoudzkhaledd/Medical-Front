import Button from '@/GeneralElements/Button/Button';
import './style.css';
import { Link } from 'react-router-dom';
export default function ServiceCard({ service }) {
    return (



        <div style={{maxWidth: "350px",}} className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
                style={{
                    maxWidth: "100%",
                    aspectRatio: 16 / 9,
                    objectFit: "cover",
                }}
                className="rounded-t-lg" src={service.thumbnailImage?.url || "https://www.lumahealth.com/wp-content/uploads/2023/09/Chiang-Mai-hospitals.jpg"} alt="" />
            <div className="p-5">
                <Link to={`/services/${service._id}`}>
                    <h6 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {service.name}
                    </h6>
                </Link>
                <p className="mb-3 font-normal break-words text-gray-700 dark:text-gray-400">
                    {(service.subDescription == null || service.subDescription == "") ? "لا يوجد وصف مختصر للخدمة": service.subDescription}
                </p>
                <Link to={`/services/${service._id}`}>
                    <Button text="أطلب الأن" faicon="fa-solid fa-arrow-left" />
                </Link>

            </div>
        </div>


    )
    return (
        <div>
            <img className="service-card__image rounded-xl object-cover" src="https://www.lumahealth.com/wp-content/uploads/2023/09/Chiang-Mai-hospitals.jpg"></img>
            <div className='flex justify-between items-center'>
                <div className='mt-2 px-4 py-0 rounded-xl bg-yellow-500'>
                    <p>Service</p>
                </div>

                <div className=' flex items-center gap-2'>
                    {[...Array(5)].map((x, i) =>
                        <i className="fa-solid fa-star" />
                    )}
                </div>
            </div>
        </div>
    )
}
