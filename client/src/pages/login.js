import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavbarHome from '../components/navbarHome'
import { Formik, Form, Field } from 'formik'

const Login = () => {
    const [tipo_usuario, setTipo_usuario] = useState(0)


    //función para realizar petición en donde se válide que el usuario existe
    function login(){

    }
    //Fin función

    return (
        <body>
            <NavbarHome />
            <div className="main">

                <Formik
                    initialValues={{
                        correo: '',
                        contrasena: '',
                        tipo_usuario: tipo_usuario
                    }}

                    onSubmit={(values)=>{
                        Login(values)
                    }}
                >
                    {
                        (formik) => (
                            <Form>
                                <div className="login">
                                    <div class="mb-3">
                                        <label htmlFor="Tipo_usuario" className="form-label">tipo de usuario</label>
                                        <select name="tipo_usuario" className="form-control" onChange={(e) => setTipo_usuario(e.target.value)}>
                                            <option value="0">-</option>
                                            <option value="1">Médico</option>
                                            <option value="2">Paciente</option>
                                        </select>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label htmlFor="correo" className="form-label">Correo</label>
                                        <Field type="email" className="form-control" id="correo" name="correo" />

                                    </div>

                                    <div class="mb-3">
                                        <label htmlFor="contrasena" className="form-label">Contrasena</label>
                                        <Field type="password" className="form-control" id="contrasena" name="contrasena" />

                                    </div>

                                    <div class="d-grid gap-2">
                                        <button class="btn btn-dark" type="submit">Ingresar</button>
                                    </div>
                                </div>

                            </Form>
                        )
                    }

                </Formik>
            </div>

        </body>
    );
}

export default withRouter(Login);