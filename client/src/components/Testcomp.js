import React from 'react'
import { useLocation } from "react-router-dom";


function Testcomp(props) {
    const location = useLocation();
    return (
        <div>
            I'm from here {location.state.from}
        </div>
    )
}

export default Testcomp
