
import React from 'react';

import mls_canada_img from '../../media/images/Multisensor_Canada.png';
import mls_scf_img from '../../media/images/Multisensor_Scientific.png';

const image_style = { width: 150, height: 'auto', marginTop: 15, marginBottom: 15, };


const Header = ({

}) => (
    <div className="row" style={{ backgroundColor: 'white', }}>
        <div className="col-md-2">
            <img style={{ ...image_style, marginLeft: 20, }} src={mls_scf_img}></img>
        </div>
        <div className="col-md-offset-8 col-md-2">
            <img className="pull-right" style={{ ...image_style, marginRight: 20,  }} src={mls_canada_img}></img>
        </div>
    </div>
);


export default Header;