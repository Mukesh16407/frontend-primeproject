/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import './edit.css'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from 'react-select';
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Spiner } from '../../components/spinner/Spinner';
import { editfunc, singleUsergetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import { useContext } from 'react';
import { updateData } from '../../context/ContextProvider';


export const Edit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });
  const [showspin, setShowSpin] = useState(true);
  const [status, setStatus] = useState("Active");

  const [image, setImage] = useState("");
  //get data from database
  const [imgdata,setImgdata] = useState("");

  const [preview, setPreview] = useState("");

  const {setUpdate} = useContext(updateData);
 
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

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if(response.status === 200){
      setInputData(response.data);
      setStatus(response.data.status);
      setImgdata(response.data.profile)

    }else{
      console.log("error");
    }
    
  };
 
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
      data.append("user_profile",image || imgdata)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await editfunc(id,data,config);

      if(response.status === 200){
        setUpdate(response.data)
        navigate("/")
      }
     
     
    }
  }

  useEffect(()=>{
    userProfileGet();
  },[id])

  useEffect(()=>{
    if(image){
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  },[image])

  
  // status optios
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  return (
    <>
    {showspin ? <Spiner/> : <div className="container">
        <h2 className="text-center mt-1">Update Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}alt="img" />
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
                    checked={inputdata.gender ==="Male" ? true:false}
                    onChange={setinputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender ==="Female" ? true:false}
                    onChange={setinputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} defaultValue={status} onChange={setStatusValue} />
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
      </div>}
     
    </>
  )
}
