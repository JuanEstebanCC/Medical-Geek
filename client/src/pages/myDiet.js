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
            <body>
                <div className="myDiet">
                    <div className="header-myDiet">
                        <span className="logo-diet"></span>
                        <h1>Hello - My Diet</h1>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIXRSORJ7ZOtQACCs3zHBDxvPqVFq3EFnRgA&usqp=CAU" />
                        <button className="button-myDiet" >Close</button>
                    </div>
                    <div className="diet">
                        <h2>{data[0].typeDiet}</h2>
                        <img src={data[0].imageURL}></img>
                        <p>{data[0].description}</p>
                        <ul>
                            {
                                array.map(item =>
                                    <li>{item}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </body>
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
            </>
        )
    }
};

export default withRouter(MyDiet);