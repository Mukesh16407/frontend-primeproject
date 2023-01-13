import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";
export const Profile = () => {
  return (
    <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
      <Card.Body>
        <Row>
          <div className="col">
            <div className="card-profile-stats d-flex justify-content-center">
              <img src={`/man.png`} alt="" />
            </div>
          </div>
        </Row>
        <div className="text-center">
          <h3>Mukesh Kumar</h3>
          <h4>
            <i class="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
            <span>mkvermashk@gmail.com</span>{" "}
          </h4>
          <h5>
            <i class="fa-solid fa-mobile"></i>&nbsp;:- <span>8295543215</span>{" "}
          </h5>
          <h4>
            <i class="fa-solid fa-person"></i>&nbsp;:-{" "}
            <span>Male</span>{" "}
          </h4>
          <h4>
            <i class="fa-solid fa-location-pin location"></i>&nbsp;:-{" "}
            <span>Patna</span>{" "}
          </h4>
          <h4>
            Status&nbsp;:- <span>Pending</span>{" "}
          </h4>
          <h5>
            <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
            Created&nbsp;:-{" "}
            <span>20-11-2022</span>{" "}
          </h5>
          <h5>
            {" "}
            <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
            Updated&nbsp;:- <span>2-01-2023</span>{" "}
          </h5>
        </div>
      </Card.Body>
    </Card>
  );
};
