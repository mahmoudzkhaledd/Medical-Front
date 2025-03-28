import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";

export default function NotFoundPage({ }) {


    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                هذه الصفحة غير متوفرة
                            </h1>
                            <p className="my-2 text-gray-800">
                                نأسف لذلك! يمكنك زيارة الصفحة الرئيسية للوصول لوجهتك بشكل صحيح
                            </p>
                            <br />
                            <Link to='/'>
                                <Button text="الصفحة الرئيسية" color="var(--primary)" textColor="white" verticalPadding={15} horizontalPadding={30} fontSize="1.1rem" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>

    )
}
