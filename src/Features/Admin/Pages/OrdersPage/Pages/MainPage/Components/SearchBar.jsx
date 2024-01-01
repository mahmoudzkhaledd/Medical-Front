import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { orderStages } from "@/Utils/stages";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ value, onSearch, selectedState, responsable }) {
    const textRef = useRef();
    useEffect(() => {
        textRef.current.value = value;
    }, []);
    return (
        <div className="w-100 flex flex-wrap justify-between mb-5 gap-4">
            <div className="flex gap-3  justify-center items-center">

                <TextBox width={200} reference={textRef} placeholder="البحث" />
                <select
                    id="status"
                    name="status"
                    defaultValue={orderStages.filter((e) => e.state == selectedState || selectedState == 'all' || selectedState == 'canceled' || selectedState == 'refused').length == 0 ? "all" : selectedState}

                    className="bg-gray-50 px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value={"all"} >الكل </option>
                    {
                        orderStages.map((e, idx) => <option key={idx} value={e.state} >{e.name}</option>)
                    }
                    <option value={"refused"} >تم الرفض</option>
                    <option value={"canceled"} >تم الالغاء</option>
                </select>

                <Button className="h-100" onClick={() => onSearch({ responsable: document.getElementById('responsable-for').checked || false, search: textRef.current.value, state: document.getElementById('status').value })} faicon="fa-solid fa-magnifying-glass" width={50} height={40} />
            </div>
            <div className="flex items-center mb-4">
                <input
                    id="responsable-for"
                    type="checkbox"
                    defaultChecked={responsable || false}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="responsable-for"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    المسؤول عنها
                </label>
            </div>
        </div>
    )
}
