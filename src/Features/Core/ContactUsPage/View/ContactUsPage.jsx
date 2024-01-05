import { configs } from "../../CoreTexts"
export default function ContactUsPage({ }) {


    return (
        <section className="bg-white ">
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
                        {configs.contactUs.title}
                    </h1>
                    <p className="mt-3 text-gray-500 ">
                        {configs.contactUs.subTitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
                    {
                        configs.contactUs.points.map((e, idx) => <div key={idx}>
                            <span className="flex flex-col items-center justify-center w-12 h-12 text-blue-500 rounded-full bg-blue-100/80 ">
                                <i className={`${e.icon} text-lg`}></i>
                            </span>
                            <h2 className="mt-4 text-lg font-medium text-gray-800 ">
                                {e.title}
                            </h2>
                            <p className="mt-2 text-gray-500 ">
                                {e.subTitle}
                            </p>
                            <p className="mt-2 text-blue-500 ">
                                {e.data}
                            </p>
                        </div>)
                    }

                </div>
            </div>
        </section>

    )
}
