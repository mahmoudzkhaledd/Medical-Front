import Button from "@/GeneralElements/Button/Button";
import ComboBox from "@/GeneralElements/ComboBox/ComboBox";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { states } from "../SearchStates";

export default function SearchBar({ value, onSearch, selectedState }) {
    const textRef = useRef();
    useEffect(() => {
        textRef.current.value = value;
        selectedState = selectedState || states[0].value;
        let found = false;
        for (const i of states) {
            if (i.value == selectedState) {
                setState(i);
                found = true;
                break;
            }
        }
        if (!found) setState(states[0]);
    }, []);
    const [state, setState] = useState(null);
    
    const onSelect = (e) => {
        setState(e);
    };
    return (
        <div className="w-100 flex justify-between mb-5 flex-wrap gap-3">
            <div className="flex gap-3  justify-center items-center">
                <TextBox reference={textRef} placeholder="البحث" />
                <ComboBox selected={state} items={states} text="حالة الخدمة" onSelect={onSelect} />
                <Button className="h-100" onClick={() => onSearch({ search: textRef.current.value, state: state.value || states[0].value })} faicon="fa-solid fa-magnifying-glass" width={50} height={40} />
            </div>
            <Link to="/admin/services/new-service">
                <Button text="خدمة جديدة" />
            </Link>
        </div>
    )
}
