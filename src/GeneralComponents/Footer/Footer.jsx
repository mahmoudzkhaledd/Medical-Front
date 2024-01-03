
export default function Footer({ }) {
    return (
        <footer className="bg-white rounded-lg shadow  mt-10 dark:bg-gray-800 ">
            <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 إسم الشركة™. كل الحقوق محفوظة.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            المزيد عنا
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                        سياسة الخصوصية
                        </a>
                    </li>
                   
                    <li>
                        <a href="#" className="hover:underline">
                            إتصل بنا
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
