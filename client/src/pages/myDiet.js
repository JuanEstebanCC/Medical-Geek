import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Logo from "../images/logo.ico";

const MyDiet = () => {

    const [data, setdata] = useState([{}]);
    const [list, setlist] = useState('');

    useEffect(async () => {

        const res = await fetch('/user_data?' + new URLSearchParams({ id: localStorage.getItem('id') }));

        const data = await res.json();
        console.log(data[0].dietType)

        if (data[0].dietType !== "null" && typeof data[0].dietType !== 'object') {
            const response = await fetch('/diet?' + new URLSearchParams({ typeDiet: data[0].dietType }));

            const diet = await response.json();

            setdata(diet);
            setlist(diet[0].list)
        }

    }, [])
    const array = Array.from(list)

    if (data[0].typeDiet) {
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
                                <label className="text-white">This is your diet!</label>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="col s6">
                        <h2 className="text-center"> <b> {data[0].typeDiet} </b> </h2>
                        <h4 className="flow-text">{data[0].description}</h4>
                        <ul>
                            {
                                array.map(item =>
                                    <li>{item}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="col s6">
                        <img className="materialboxed center-block mt-5" width="600" src={data[0].imageURL}></img>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2021 Medical Geek, All rights reserved.
            <a className="grey-text text-darken-4 right" href="https://github.com/JuanEstebanCC/Medical-Geek">GitHub Code</a>
                    </div>
                </div>
            </>
        );
    } else {
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
                                <label className="text-white">This is your diet!</label>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <h1> <b> You don't have a diet assigned </b> </h1>
                    <h4>Please contact your doctor</h4>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2021 Medical Geek, All rights reserved.
            <a className="grey-text text-darken-4 right" href="https://github.com/JuanEstebanCC/Medical-Geek">GitHub Code</a>
                    </div>
                </div>
            </>
        )
    }
};

export default withRouter(MyDiet);