import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const MyMedicine = () => {
    return (

        <body>
            <div className="main-container">
                <div className="container-center">
                    <div className="tittle-login">
                        <p className="main-tittle general-letter">¡Someone of your patientes <br/>needs medicine?!</p>
                        <p className="letter general-letter">
                            Here you can prescribe medications <br />
                            <br />
                                to those you are caring for <br /><br /><br /><br />
                        </p>
                    </div>
                    <div className="">
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
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
                                            >
                                            <option value="first patient">first patient</option>
                                            <option value="first patient">second patient</option>
                                            <option value="first patient">third patient</option>
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
                                                how often should the patient take it?
                      </label>
                                            <Field
                                                type="time"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                            />
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
            </div>
            {/*  <div className="gray-div"/> */}


        </body>

    )
}

export default withRouter(MyMedicine)