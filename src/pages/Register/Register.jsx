import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from 'react-select';
import { useEffect } from "react";
import {registerfunc} from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import { addData } from "../../context/ContextProvider";
export const Register = () => {
 
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");

  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const { setUseradd } = useContext(addData);

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    }
  },[image])

  const setinputValue =(e)=>{
    
    const {name,value} = e.target;

   setInputData({...inputdata,[name]:value})
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

   // profile set
   const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10 || mobile.length < 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {

      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await registerfunc(data,config);
      
      if(response.status === 200){
        setInputData({
          ...inputdata,
          fname:"",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data)
        toast.success("Registration successfully done");
        navigate("/");
      }else{
        toast.error("Error!")
      }
    }
  }
  // status optios
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  return (
    <>
      <div className="container">
        <h2 className="text-center mt-1">Register Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={preview ? preview:"/man.png"} alt="img" />
          </div>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={inputdata.fname}
                  placeholder="Enter FirstName"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={inputdata.lname}
                  placeholder="Enter LastName"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputdata.email}
                  placeholder="Enter Email"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={inputdata.mobile}
                  placeholder="Enter Mobile"
                  onChange={setinputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={setinputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={setinputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name='user_profile'onChange={setProfile}  placeholder='Select Your Profile' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name='location'value={inputdata.location}  onChange={setinputValue}  placeholder='Enter Your Location' />
                </Form.Group>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};
