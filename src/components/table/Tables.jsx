import React from "react";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

import "./table.css";
import { NavLink } from "react-router-dom";
export const Tables = () => {
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
                  <tr>
                    <td>1</td>
                    <td>Mukesh Kumar</td>
                    <td>mkvermashk@gmail.com </td>
                    <td>Male</td>
                    <td>
                      <Dropdown className="text-centre">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          id="dropdown-basic"
                        >
                          <Badge>
                            Active <i class="fa-solid fa-angle-down"></i>
                          </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Active</Dropdown.Item>
                          <Dropdown.Item>InActive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="img_parent">
                      <img src={`/man.png`} alt="img" />
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="action"
                          id="dropdown-basic"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <NavLink
                              to={`/userprofile/1`}
                              className="text-decoration-none"
                            >
                              <i
                                class="fa-solid fa-eye"
                                style={{ color: "green" }}
                              ></i>{" "}
                              <span>View</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <NavLink
                              to={`/edit/1`}
                              className="text-decoration-none"
                            >
                              <i
                                class="fa-solid fa-pen-to-square"
                                style={{ color: "blue" }}
                              ></i>{" "}
                              <span>Edit</span>
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div >
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
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};
