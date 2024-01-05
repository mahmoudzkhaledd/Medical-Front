
export default function GeneralDetails({ data }) {


    return (
        <div className={`container p-8 mx-auto xl:px-0 flex flex-wrap mb-10 lg:gap-10 lg:flex-nowrap ${data.reversed ? "flex-row-reverse" : ""} `}>
            <div className="flex  justify-center w-full lg:w-1/2 ">
                <div>
                    <img
                        alt="Benefits"
                        loading="lazy"
                        width={521}
                        height={548}
                        decoding="async"
                        data-nimg={1}
                        className="object-cover rounded-lg"

                        src={data.image}
                        style={{ color: "transparent" }}
                    />
                </div>
            </div>
            <div className="flex flex-wrap items-center w-full lg:w-1/2 ">
                <div>
                    <div className="flex flex-col w-full mt-4">
                        <h3 className="max-w-2xl mt-3 text-center text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl lg:text-right ">
                            {data.title}

                        </h3>
                        <p className="max-w-2xl text-center py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl lg:text-right ">
                            {data.subTitle}
                        </p>
                    </div>
                    <div className="w-full mt-5">
                        {
                            data.points.map((e, idx) => <div key={idx} className="flex items-start mt-8 space-x-3">
                                <div className="flex ml-4 items-center justify-center flex-shrink-0 mt-1 bg-[color:var(--primary)] rounded-md w-11 h-11 ">
                                    <i className={`${e.icon} text-2xl text-white`}></i>
                                </div>
                                <div>
                                    <h4 className="text-xl  font-medium text-gray-800 ">
                                        {e.title}
                                    </h4>
                                    <p className="mt-1 text-gray-500 ">
                                        {e.subTitle}
                                    </p>
                                </div>
                            </div>)
                        }


                    </div>
                </div>
            </div>
        </div>

    )
}
