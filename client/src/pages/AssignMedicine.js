import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import faker from "faker";

const AssignMedicine = () => {

    const [data, setData] = useState([]);
    const [patient, setPatient] = useState('');
    const [value, onChange] = useState('10:30');
    const [times, setTimes] = useState([]);

    useEffect(async()=>{

        const res = await fetch('/user_data?' + new URLSearchParams({id: localStorage.getItem('id')}));

        const data = await res.json();

        fetch(`/my_patientes?doctorName=${data[0].full_name}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
                setData(data)
         })
    },[])

    function AssignMedication(values){
        const hours = [];
        times.map(item => {
            hours.push(item.hour);
        })
        
        fetch('/assign_medicine', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                "patient_email":patient, 
                "medicineName": values.medicine_name, 
                "how_many": values.how_many,
                "how_often": hours
            })
        })
    }

    function addTime(time){
        const newhour = {
            hour: time,
            uid: faker.random.uuid()
        }
        setTimes([...times, newhour])   
    }

    function deleteHour(uid){
        setTimes(times.filter(item => item.uid !== uid));
    }

    const validate = Yup.object({
        medicine_name: Yup.string().required("Name required"),
        how_many: Yup.number(),
        how_often: Yup.string()
      });
    return (

        <body>
            
            <div className="nav-medicine">
                <div className="logo-medicine">
                    
                </div>
                
            </div>
            <div className="main-container">
                <div className="container-left">
                    <div className="tittle-login">
                        <p className="main-tittle general-letter">Prescribe medications to your patientes</p>
                        <br/>
                    </div>
                    <div className="medicine-form">
                        <Formik
                            initialValues={{
                                patient: "juanescifuentes75@gmail.com",
                                medicine_name: "",
                                how_many:"",
                                how_often: ""
                            }}
                            onSubmit={(values) => {
                                AssignMedication(values)
                            }}
                            validationSchema={validate}
                        >
                            {(formik) => (
                                <Form>
                                    <div className="">
                                        <div class="mb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label letter general-letter"
                                            >
                                                Patient
                      </label>
                                            <select

                                                className="form-control"
                                                id="patient"
                                                name="patient"
                                                onChange={(e)=>{
                                                    setPatient(e.target.value)
                                                }}
                                            >
                                                <option value="">-</option>
                                                {
                                                    data.map((item,index)=>{
                                                        return <option value={item.email}>{item.full_name}</option>
                                                    })
                                                }
                                                
                                            
                                            </select>
                                        </div>
                                        {/* <div class="mb-3">
                                            <br />
                                        </div> */}
                                        <div class="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="form-label letter general-letter"
                                            >
                                                Name of the medicine
                      </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="medicine_name"
                                                name="medicine_name"
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="form-label letter general-letter"
                                            >
                                                how many?
                                            </label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id="how_many"
                                                name="how_many"
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="form-label letter general-letter"
                                            >
                                                how often (hours)
                                            </label>
                                            <div className="time">
                                            <TimePicker
                                                type="textbox"
                                                format="HH:mm"
                                                disableClock="true"
                                                onChange={onChange}
                                                value={value}
                                            />
                                            <input type="button" value="Add hour" onClick={()=>addTime(value)}/>
                                        </div>
                                            {
                                                times.map((item)=>
                                                    <div key={item.uid} className="show-time">
                                                        <h4>{item.hour}</h4>
                                                        <input className="delete-hour" type="button" onClick={()=>deleteHour(item.uid)}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="button">
                                        <button type="submit" className="button-login letter">
                                            assign
                    </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/*  <div className="text-invitation letter general-letter">
                        Don´t have an account yet? <br />
                        <br />
                        <br />
                        <a href="/register">Register now</a>
                    </div> */}
                </div>
                <div className="container-left">
                    <div className="assigMedicine_image">
                        
                    </div>
                </div>
            </div>


        </body>

    )
}

export default withRouter(AssignMedicine)