import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isloading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate()

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser
     action(inputData)
  };
  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup successful.")
    }
    if(registerError){
      toast.error(registerData.data.message || "Signup failed.")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful.")
      navigate("/chat")
    }
    if(loginError){
      toast.error(loginData.data.message || "Login failed.")
    }
  },[loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Tabs defaultValue="account" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="guest">Guest</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required="true"
                  placeholder="Eg. omkar"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required="true"
                  placeholder="Eg. user@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button  disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
              registerIsLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                </>
              ) : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here.After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. user@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
            <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                    </>
                  ) : "Login"
                }</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="guest">
          <Card>
            <CardHeader>
              <CardTitle>Continue as guest</CardTitle>
              <CardDescription>
                No signup required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. user@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                    </>
                  ) : "Login as guest"
                }</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;