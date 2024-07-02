import React from 'react'
// import animateSignup from './animateSignup.png'
import { Input, Button, Checkbox } from "antd";

export default function SignUpForm() {

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (

        <div className="mainDiv">
            <div className="loginDiv">
                <div className="head">
                    <h1>Sign up</h1>
                </div>
                <div className="Form">
                    <div className="inp">

                        <Input type="text" placeholder="Username" />
                    </div>
                    <div className="inp">

                        <Input type="email" placeholder="Enter Email" />
                    </div>
                    <div className="inp">
                        <Input type="password" placeholder="Enter New Password" />
                    </div>
                    <div className="inp">
                        <Input type="password" placeholder="Confirm Password" />
                    </div>

                    <div className="inp">
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </div>
                    <div className="btn">
                        <Button className="Button" >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
            <div className="imgDiv">
                <img
                    // src={animateSignup}
                    alt=""
                />
            </div>
        </div>

    )
}
