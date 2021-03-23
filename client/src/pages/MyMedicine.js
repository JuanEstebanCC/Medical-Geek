import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Logo from "../images/logo.ico";
import MedicineImage from "../images/medicaments.png";

const MyMedicine = () => {
    const [data, setData] = useState([])
    useEffect(async () => {
        const res = await fetch('/user_data?' + new URLSearchParams({ id: localStorage.getItem('id') }));
        const data = await res.json();
        setData(data[0].medicines)
    }, [])
    return (
        <>
            <nav>
                <div class="nav-wrapper deep-purple lighten-1">
                    <div className="row">
                        <div className="col s1">
                            <a href="/dashboard" class="brand-logo"> <img className="ml-5 hoverable" width="65" src={Logo} />
                            </a>
                        </div>
                        <div className="col s11">
                            <label className="text-white">This is your medicine!</label>
                        </div>
                    </div>
                </div>
            </nav>
            {console.log(data)}
            <div className="row">
                <div className="col s6">
                    <h3 className="mt-5">These are your medications.</h3>
                    <div>
                        {
                            data.map((item, index) => {
                                return <div classNameName="card">
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.nameMedicine}</h5>
                                        <b>Indicationes:</b>
                                        <p className="card-text">How many: {item.how_many}</p>
                                        <p className="card-text">How often: {item.how_often}</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="col s6">
                    <img
                        className="materialboxed mt-5 hoverable"
                        width="550"
                        src={MedicineImage}
                    />
                </div>
            </div>
        </>
    )

}

export default withRouter(MyMedicine)