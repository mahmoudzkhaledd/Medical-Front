import { adminRoles } from "@/Utils/AdminRoles";

export default function AdminRolesComponent({ roles }) {

    if (roles == null) {
        return <></>
    }
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6  ">
            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl ">
                صلاحيات المدير
            </h5>
            <p className="text-sm font-normal text-gray-500 ">
                يعرض الصلاحيات المتاحة للمدير في لوحة التحكم, يمكن لمن له الصلاحية في التعديل تعديل هذه الصلاحيات
            </p>
            <ul className="my-4 space-y-3">
                {
                    adminRoles.map((e, idx) => <li key={idx} className=" cursor-pointer flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow   ">
                        <span className="flex-1 ms-3 ">{e.name}</span>
                        <i className={`${roles[e.ref] ? "fa-solid fa-circle-check text-yellow-500" : "fa-solid fa-circle-xmark"} text-lg`}></i>
                    </li>)
                }
            </ul>

        </div>

    )
}
