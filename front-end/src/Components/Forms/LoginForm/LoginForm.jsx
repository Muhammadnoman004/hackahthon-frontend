import React from 'react'
import './LoginForm.css'
import animateLogin from '../../../assets/animateSignup.png'
import { Input, Button, Checkbox } from "antd";

export default function LoginForm() {

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (

        <div className="mainDiv">
            <div className="loginDiv">
                <div className="head">
                    <h1>Login</h1>
                </div>
                <div className="Form">

                    <div className="inp">

                        <Input type="email" placeholder="Enter Email" />
                    </div>
                    <div className="inp">
                        <Input type="password" placeholder="Enter Password" />
                    </div>


                    <div className="inp">
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </div>
                    <div className="btn">
                        <Button className="Button" >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
            <div className="imgDiv">
                <img
                    src={animateLogin}
                    alt=""
                />
            </div>
        </div>

    )
}
