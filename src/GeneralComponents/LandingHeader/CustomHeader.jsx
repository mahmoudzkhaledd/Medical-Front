import Button from '@/GeneralElements/Button/Button';
import './style.css';
import { Link } from 'react-router-dom';

export default function CustomHeader({ linkTo, image, data }) {
    return (
        <section id='landing-header' className={`grid grid-2 landing-header__main-cont rounded-3xl px-10 ${image ? "py-6" : "py-10"} mb-5`}>
            <div className=' text-center flex flex-col items-center justify-center '>
                <h1 className='text-3xl font-bold text-center'> {data?.title}</h1>
                <h1 className='text-lg font-normal text-gray-400 mt-5 text-center'> {data?.subTitle}</h1>
                {linkTo && <Link to={linkTo}>
                    <Button className="mt-5" text="تصفح الخدمات" faicon="fa-solid fa-circle-arrow-left" />
                </Link>}
            </div>
            {
                image && <div className='flex items-center justify-center'>
                    {<img className='no-select max-w-xs' src={image} />}
                </div>
            }
        </section>
    )
}
