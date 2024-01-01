import { Link } from "react-router-dom";

export default function Logo({className = "",link = "/"}) {
    

    return (
        <Link className={`no-select font-bold text-2xl ${className}`} to={link}>ميديكال</Link>
    )
}
