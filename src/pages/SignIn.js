import React , { useContext, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/Input";
import firebase from "firebase/app";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

function SignIn () {
    const [ email, setEmail ] = useState("");
    const [ pwd, setPassword ] = useState("");
    const { user , setUser } = useContext(UserContext);

    const onLoginClick = () => {
        console.log("onLoginClick");
        firebase
        .auth()
        .signInWithEmailAndPassword(email, pwd)
        .then(res => {
            console.log(res);
            setUser({ email: res.user.email, uid: res.user.uid });
        })
        .catch(error => {
            console.log(error);
        });
    }
    if (user?.uid) {
        return <Redirect to="/allproducts" />;
    }
    return (
        <div className = "cls_SignInWrapper">
            <div className = "cls_SignInBox">
                <div className = "cls_PageTitle">Log In</div>
                <div className = "cls_SignInFormWrapper">
                    <InputBox type = "text" value = {email} placeholder = "Email Address" handleChange = {(value) => setEmail(value)} />
                    <InputBox type = "password" value = {pwd} placeholder = "Password" handleChange = {(value) => setPassword(value)} />
                    <Button value = "Login" onBtnClick = {() => onLoginClick()} />
                </div>
            </div>
        </div>
    )
}

export default SignIn;