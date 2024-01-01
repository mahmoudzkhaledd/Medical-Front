import { Link } from "react-router-dom";


const data = [
    {
        title: "العنوان",
        icon: "fa-solid fa-location-dot",
        ref: "address",
    },
    {
        title: "المدينة",
        icon: "fa-solid fa-building-wheat",
        ref: "city",
    },
    {
        title: "الشارع",
        icon: "fa-solid fa-road",
        ref: "street",
    },
]

export default function UserAddressComponent({ user,openAccountArrow }) {

    if (user == null) {
        return <></>;
    }
    return (
        <div aria-label="card" className="p-8 rounded-3xl shadow-lg bg-white  h-fit w-full">
            <div aria-label="header" className="flex items-center ">
                <div className="flex items-center justify-center rounded-full w-10 h-10 ml-4 bg-[color:var(--secondary)]">
                    <i className="fa-solid fa-user mx-auto" />
                </div>
                <div className="space-y-0.5 flex-1">
                    <h3 className="font-medium text-lg tracking-tight text-gray-900 leading-tight">
                        بيانات المستخدم
                    </h3>
                    <p className="text-sm font-normal text-gray-400 leading-none">
                        العنوان
                    </p>
                </div>
                { openAccountArrow &&<Link
                    to={`/admin/users/${user._id}`}
                    className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 7l-10 10" />
                        <path d="M8 7l9 0l0 9" />
                    </svg>
                </Link>}
            </div>
            <div aria-label="content" className="mt-9 grid gap-3">
                {
                    data.map((e, idx) => <div key={idx} className="flex items-center space-x-4 px-4 py-2 rounded-full bg-gray-100">
                        <span className="ml-4 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                            <i className={e.icon}></i>
                        </span>
                        <div className="flex flex-col flex-1">
                            <h3 className="text-sm font-medium">{e.title}</h3>
                            <div className="divide-x divide-gray-200 mt-auto">
                                <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                                    {user[e.ref]}
                                </span>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>

    )
}
