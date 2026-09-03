import { Input } from "../components/input";
import { Button } from "../components/button";
import { useState } from "react";
import { loginValidate } from "../utils/login_validator";
import { Card } from "../components/card";
import { ToastMessage } from "../components/toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../interceptor/auth.interceptor";
import { Loader } from "../components/Loader";

export function Login() {
  const navigate = useNavigate();
  const [isSignUp, setSignUp] = useState(false);
  const [formErrs, setFormErrs] = useState({
    userName: "",
    password: "",
  });
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [successMsg, setSuccess] = useState("");
  const [errorMsg, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLoginFormErrs = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errMsg = loginValidate(name, value);
    setFormErrs((prev) => ({ ...prev, [name]: errMsg }));
    setValid(Object.values({...formErrs, [name]:errMsg}).every((m)=>m === ''))
    
  };

  const signIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post(
        "dev-vault/auth/login",
        {
          userName: formData.userName,
          password: formData.password,
        },
      );
      setSuccess(res.data?.message);
      sessionStorage.setItem("jwt_token",res.data?.accessToken);
      // sessionStorage.setItem("refresh_token",res.data?.refreshToken);
      localStorage.setItem('userName',res.data?.userName);
      localStorage.setItem('userId',res?.data.userId);
      setTimeout(()=>{
        setSuccess("");
        navigate('/snippets')
      },500)
      
      
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setTimeout(()=>{
        setError("")
      },1500)
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post(
        "dev-vault/auth/signUp",
        {
          userName: formData.userName,
          password: formData.password,
        },
      );
      setSuccess(res.data?.message);
      setTimeout(()=>{
        setSignUp(false)
        setSuccess("");
      },1000)
    } catch (err) {
      setError(err.response?.data?.error ||  err.response?.data?.message || "Something went wrong!");
       setTimeout(()=>{
        setError("")
      },1500)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6">
      <div className="w-full max-w-sm">
       <Card title={isSignUp ? "Create your Dev Vault account" : "Welcome back to Dev Vault"}>
        <form onSubmit={isSignUp ? signUp : signIn}>
          <div className="mb-4 font-medium">
            <label className="mb-2 w-full block">User Name</label>
            <Input
              name="userName"
              className="py-2 input"
              type="text"
              value={formData.userName}
              placeHolder="Enter UserName"
              onChange={onLoginFormErrs}
              error={formErrs.userName}
            />
          </div>

          <div className="mb-4 font-medium">
            <label className="mb-2 w-full block">Password</label>
            <Input
              name="password"
              type="password"
              placeHolder="Enter Password"
              className="py-2 input"
              value={formData.password}
              onChange={onLoginFormErrs}
              error={formErrs.password}
            />
          </div>

          <Button type="submit" disabled={!valid || isSubmitting}>
            {isSubmitting ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>
          {isSignUp ? (
            <p>
              Already have an account ?{" "}
              <a
                className="underline cursor-pointer"
                onClick={() => setSignUp((prev) => !prev)}
              >
                Sign In
              </a>
            </p>
          ) : (
            <p>
              Don't have an account ?{" "}
              <a
                className="underline cursor-pointer"
                onClick={() => setSignUp((prev) => !prev)}
              >
                Sign Up
              </a>
            </p>
          )}
        </form>
      </Card>
      </div>
      <div>
      {isSubmitting && <Loader message={isSignUp ? "Creating your account..." : "Signing you in..."} fullScreen />}
      {
        successMsg && ( <ToastMessage type="success" msg={successMsg}></ToastMessage>)
      }
      
      {
        errorMsg && (
        <ToastMessage type="error" msg={errorMsg}></ToastMessage>
        )
      }
        
      </div>
    </div>
  );
}
