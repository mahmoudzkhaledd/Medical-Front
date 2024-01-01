
export default function SearchFilter({ }) {


    return (
        <div className="flex items-center justify-center p-4">
            <div
                id="dropdown"
                className="z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
            >
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                    <li className="flex items-center">
                        <input
                            id="apple"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="apple"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Apple (56)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="fitbit"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="fitbit"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Fitbit (56)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="dell"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="dell"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Dell (56)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="asus"
                            type="checkbox"
                            defaultValue=""
                            defaultChecked=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="asus"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Asus (97)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="logitech"
                            type="checkbox"
                            defaultValue=""
                            defaultChecked=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="logitech"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Logitech (97)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="msi"
                            type="checkbox"
                            defaultValue=""
                            defaultChecked=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="msi"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            MSI (97)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="bosch"
                            type="checkbox"
                            defaultValue=""
                            defaultChecked=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="bosch"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Bosch (176)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="sony"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="sony"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Sony (234)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="samsung"
                            type="checkbox"
                            defaultValue=""
                            defaultChecked=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="samsung"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Samsung (76)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="canon"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="canon"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Canon (49)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="microsoft"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="microsoft"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Microsoft (45)
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input
                            id="razor"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                            htmlFor="razor"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Razor (49)
                        </label>
                    </li>
                </ul>
            </div>
        </div>

    )
}
