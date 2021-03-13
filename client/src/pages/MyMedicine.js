import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

const MyMedicine = () => {
    const [data, setData] = useState([])
    useEffect(async ()=>{
        const res = await fetch('/user_data?' + new URLSearchParams({id: localStorage.getItem('id')}));
        const data = await res.json();
        setData(data[0].medicines)
    }, [])
    return (
        <body>
            {console.log(data)}
            <div className="nav-medicine">
                <div className="logo-medicine">

                </div>

            </div>
            <div className="main-container">
                <div className="container-left">
                    <div className="tittle-login">
                        <p className="main-tittle general-letter">These are your medications.</p>
                        <br />
                    </div>
                    <div>
                        {
                            data.map((item,index)=>{
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
                <div className="container-right">
                    <div className="image-mymedicine">
                    
                    </div>
                </div>
            </div>
        </body>
    )

}

export default withRouter(MyMedicine)