import { adminRoles } from "@/Utils/AdminRoles";

export default function AdminRolesAdder({ className = "", selectedRoles, }) {

    selectedRoles = selectedRoles || {};
    return (
        <div

            className={`${className} w-100 h-fit bg-white rounded-lg shadow w-60 `}
        >
            <div className="p-3">
                <h6 className=" mb-4">صلاحيات المدير</h6>
                <hr />
            </div>
            <ul
                className="h-100 px-3 pb-3 overflow-y-auto text-sm text-gray-700 "
                aria-labelledby="dropdownSearchButton"
            >
                {
                    adminRoles.map((e, idx) => <li key={idx}>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                            <input
                                id={`checkbox-item-${idx}`}
                                type="checkbox"
                                defaultValue=""
                                name={e.ref}
                                defaultChecked={selectedRoles[e.ref]}
                                className="chk-role w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                            />
                            <label
                                htmlFor={`checkbox-item-${idx}`}
                                className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                            >
                                {e.name}
                            </label>
                        </div>
                    </li>)
                }

            </ul>

        </div>

    )
}
