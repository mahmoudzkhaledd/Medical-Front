import AboutUs from "../Components/AboutUs/AboutUs";

import CustomHeader from "../../../../GeneralComponents/LandingHeader/CustomHeader";
import GeneralDetails from "../Components/GeneralDetails/GeneralDetails";
import { configs } from '../../CoreTexts.js'
export default function LandingPage({ }) {


    return (
        <div className="dim-100 col-2">
            <CustomHeader data={configs.header} linkTo="/services" image={window.location.origin + '/images/doctor.svg'} />
            {/* <BestProviding /> */}
            {
                configs.body.map((e, idx) => <GeneralDetails key={idx} data={e} />)
            }
            <AboutUs data={configs.teamMembers}/>
            

        </div>
    )
}
