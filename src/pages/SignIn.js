import React , { useContext, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/Input";
import firebase from "firebase/app";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import SignUp from "./SignUp";

function SignIn () {
    const [ email, setEmail ] = useState("");
    const [ pwd, setPassword ] = useState("");
    const [ errorMessage , setErrorMessage] = useState("");
    const [ signUpView, setSignUpView ] = useState(false);
    const { user , setUser } = useContext(UserContext);

    const onLoginClick = () => {
        console.log("onLoginClick");
        setErrorMessage("");
        firebase
        .auth()
        .signInWithEmailAndPassword(email, pwd)
        .then(res => {
            console.log(res);
            let userDetails = { email: res.user.email, uid: res.user.uid }
            localStorage.setItem("user", JSON.stringify(userDetails))
            setUser(true);
        })
        .catch(error => {
            error.message && setErrorMessage(error.message);
            console.log(error);
        });
    }
    if (user) {
        return <Redirect to="/allproducts" />;
    }
    else 
    {
        return (
            signUpView === false ? 
            <div className = "cls_SignInWrapper">
                <div className = "cls_SignInBox">
                    <div className = "cls_PageTitle">Log In</div>
                    <div className = "cls_SignInFormWrapper">
                        <InputBox type = "text" value = {email} placeholder = "Email Address" handleChange = {(value) => setEmail(value)} />
                        <InputBox type = "password" value = {pwd} placeholder = "Password" handleChange = {(value) => setPassword(value)} />
                        {   
                            errorMessage !== "" && 
                            <div className = "cls_errorMessageWrapper">
                                {errorMessage}
                            </div>
                        }
                        <Button value = "Login" onBtnClick = {() => onLoginClick()} />
                    </div>
                    <div className = "cls_SignUpTextCont" onClick = {() => setSignUpView(true)}>
                        Not a member yet! Click here to <span>Sign Up</span>
                    </div>
                </div>
            </div>
            : 
            <SignUp onLoginViewPress = {() => setSignUpView(false)}/>

        )
    }
}

export default SignIn;