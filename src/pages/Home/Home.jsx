import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import "./home.css";
import { useNavigate } from "react-router-dom";
import { Tables } from "../../components/table/Tables";
import {Spiner} from '../../components/spinner/Spinner';
import { useEffect } from "react";
import { addData,updateData } from "../../context/ContextProvider";
import Alert from 'react-bootstrap/Alert';
import { usergetfunc } from "../../services/Apis";


export const Home = () => {

  const navigate = useNavigate();
  const { useradd,setUseradd } = useContext(addData);
  const {update, setUpdate} = useContext(updateData);

  const [showspin,setShowSpin] = useState(true);
  const [userdata,setUserData] = useState([]);

  const addUser = () => {
    navigate("/register");
  };
  const userGet = async()=>{
    const response =await usergetfunc();

    if(response.status === 200){
      setUserData(response.data);
      
    }else{
      console.log("error for get user data")
    }

    
  }
  useEffect(()=>{
      userGet()
    setTimeout(()=>{
         setShowSpin(false)
    },1200)
  },[])
  return (
    <>
    {
     useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Succesfully Added</Alert>:""
    }
    {
      update?<Alert variant="primary" onClose={() => setUpdate("")} dismissible>{useradd.fname.toUpperCase()} Succesfully Updated</Alert>:""
    }
    <div className="container">
      <div className="main_div">
        {/* search add btn */}
        <div className="search_add mt-4 d-flex justify-content-between">
          <div className="search col-lg-4">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success" className="search_btn">
                Search
              </Button>
            </Form>
          </div>
          <div className="add_btn">
            <Button variant="primary" onClick={addUser}>
              {" "}
              <i className="fa-solid fa-plus"></i>&nbsp; Add User
            </Button>
          </div>
        </div>
        {/* export,gender,status */}

        <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
          <div className="export_csv">
            <Button className="export_btn">Export To Csv</Button>
          </div>
          <div className="filter_gender">
            <div className="filter">
              <h3>Filter By Gender</h3>
              <div className="gender d-flex justify-content-between">
                <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="gender"
                  value={"All"}
                  defaultChecked
                />
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                />
              </div>
            </div>
          </div>
          {/* short by value */}
          <div className="filter_newold">
            <h3>Short By Value</h3>
            <Dropdown className="text-center">
              <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                <i className="fa-solid fa-sort"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Old</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* filter by status */}
          <div className="filter_status">
            <div className="status">
              <h3>Filter By Status</h3>
              <div className="status_radio d-flex justify-content-between flex-wrap">
                <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="status"
                  value={"All"}
                  defaultChecked
                />
                <Form.Check
                  type={"radio"}
                  label={`Active`}
                  name="status"
                  value={"Active"}
                />
                <Form.Check
                  type={"radio"}
                  label={`InActive`}
                  name="status"
                  value={"InActive"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
     {
      showspin ? <Spiner/>:<Tables 
      userdata={userdata}/>
     }
    </div>
    </>
    
  );
};
