import React from "react";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

import "./table.css";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import { statuschangefunc } from "../../services/Apis";
import {ToastContainer, toast } from "react-toastify";
import { Pagginations } from "../paggination/Pagginations";

export const Tables = ({userdata,deleteUser,userGet,handlePrevious,handleNext,page,pageCount,setPage}) => {

  const handleChangeStatus = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error ")
    }
    
  }
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? userdata.map((item,index)=>{
                    return(
                      <tr key={item._id}>
                    <td>{index +1}</td>
                    <td>{item.fname + " " + item.lname}</td>
                    <td>{item.email} </td>
                    <td>{item.gender==="Female" ?"F":"M"}</td>
                    <td>
                      <Dropdown className="text-centre">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          id="dropdown-basic"
                        >
                          <Badge bg={item.status === "Active" ? "primary" : "danger"}>
                            {item.status} <i className="fa-solid fa-angle-down"></i>
                          </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>handleChangeStatus(item._id,"Active")}>Active</Dropdown.Item>
                          <Dropdown.Item onClick={()=>handleChangeStatus(item._id,"InActive")}>InActive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="img_parent">
                      <img src={`${BASE_URL}/uploads/${item.profile}`} alt="img" />
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="action"
                          id="dropdown-basic"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <NavLink
                              to={`/userprofile/${item._id}`}
                              className="text-decoration-none"
                            >
                              <i
                                className="fa-solid fa-eye"
                                style={{ color: "green" }}
                              ></i>{" "}
                              <span>View</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <NavLink
                              to={`/edit/${item._id}`}
                              className="text-decoration-none"
                            >
                              <i
                                className="fa-solid fa-pen-to-square"
                                style={{ color: "blue" }}
                              ></i>{" "}
                              <span>Edit</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div onClick={() => deleteUser(item._id)}>
                              <i
                                class="fa-solid fa-trash"
                                style={{ color: "red" }}
                              ></i>{" "}
                              <span>Delete</span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                    )
                  }): <div className='no_data text-center'>NO Data Found</div>
                  }
                  
                </tbody>
              </Table>
              <Pagginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};
