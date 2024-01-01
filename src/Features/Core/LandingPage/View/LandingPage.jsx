import AboutUs from "../Components/AboutUs/AboutUs";
import BestProviding from "../Components/BestProviding/BestProviding";
import ContactUs from "../Components/ContactUs/ContactUs";
import CustomHeader from "../../../../GeneralComponents/LandingHeader/CustomHeader";

export default function LandingPage({ }) {


    return (
        <div className="dim-100 col-2">
            <CustomHeader linkTo="/services" image={window.location.origin + '/images/doctor.svg'}/>
            <BestProviding />
            <AboutUs />
            <ContactUs />
            
        </div>
    )
}
