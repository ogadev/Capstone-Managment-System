import React from 'react';
import './styles/forms.css'

/*************************************************************************
We ended up not using this because we decided to use our forms but this is 
how you add a google form.
**************************************************************************/


function GoogleForms () {
    return (
        <div className="form">
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScSq2XFBjqVQtPs_AfIMCcf36efbef5z7vjkGyGKFn_Ev7r1w/viewform?embedded=true" 
                width="700" 
                height="100vh" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0">Loading…
            </iframe>
        </div>
    )
}

export default GoogleForms
