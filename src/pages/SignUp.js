import React , { useContext, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/Input";
import firebase from "firebase/app";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

function SignUp ({onLoginViewPress}) {
    const [ email, setEmail ] = useState("");
    const [ pwd, setPassword ] = useState("");
    const { user , setUser } = useContext(UserContext);

    const onSignUpClick = () => {
        console.log("onSignUpClick");
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(res => {
            console.log(res);
            let userDetails = { email: res.user.email, uid: res.user.uid }
            localStorage.setItem("user", JSON.stringify(userDetails))
            setUser(true);
        })
        .catch(error => {
            if(error.code && error.code === "auth/email-already-in-use")
            {
                alert("Email address already in use.");
            }
            console.log(error);
        });
    }
    return (
        <div className = "cls_SignUpWrapper">
            <div className = "cls_SignUpBox">
                <div className = "cls_PageTitle">Sign Up</div>
                <div className = "cls_SignUpFormWrapper">
                    <InputBox type = "text" value = {email} placeholder = "Email Address" handleChange = {(value) => setEmail(value)} />
                    <InputBox type = "password" value = {pwd} placeholder = "Password" handleChange = {(value) => setPassword(value)} />
                    <Button value = "Submit" onBtnClick = {() => onSignUpClick()} />
                </div>
                <div className = "cls_SignInTextCont" onClick = {onLoginViewPress}>
                    Already a Member? Click here to <span>Login</span>
                </div>
            </div>
        </div>
    )
}

export default SignUp;