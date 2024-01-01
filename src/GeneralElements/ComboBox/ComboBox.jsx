import { useState } from "react"
import Button from "../Button/Button";

export default function ComboBox({ items = [], text = "", selected, onSelect, className = "", }) {
    const [showDropdown, setShow] = useState(false);

    return (
        <>
            <Button className="h-100" text={selected?.text || text} faicon="fa-solid fa-sort-down" onClick={() => setShow(!showDropdown)} />

            {
                showDropdown && <div
                    style={{ marginTop: 10 }}
                    className="z-10 m-0  absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        {
                            items.map((e, idx) => <li onClick={() => { onSelect && onSelect(e); setShow(false) }} key={idx} className={`block cursor-pointer px-4 py-2 ${selected == e ? "bg-gray-200" : ""} hover:bg-gray-100 hover:text-slate-950 dark:hover:bg-gray-600 dark:hover:text-white`}>
                                {e.text}
                            </li>)
                        }

                    </ul>
                </div>
            }
        </>

    )
}
