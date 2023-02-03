import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";
import { Spiner } from "../../components/spinner/Spinner";
import { useEffect } from "react";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import moment from "moment"

export const Profile = () => {
  const [showspin, setShowSpin] = useState(true);
  const [userprofile, setUserProfile] = useState({});

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
    
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="" />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofile.fname + userprofile.lname}</h3>
                <h4>
                  <i className="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
                  <span>{userprofile.email}</span>{" "}
                </h4>
                <h5>
                  <i className="fa-solid fa-mobile"></i>&nbsp;:-{" "}
                  <span>{userprofile.mobile}</span>{" "}
                </h5>
                <h4>
                  <i className="fa-solid fa-person"></i>&nbsp;:- <span>{userprofile.gender}</span>{" "}
                </h4>
                <h4>
                  <i className="fa-solid fa-location-pin location"></i>&nbsp;:-{" "}
                  <span>{userprofile.location}</span>{" "}
                </h4>
                <h4>
                  Status&nbsp;:- <span>{userprofile.status}</span>{" "}
                </h4>
                <h5>
                  <i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                  Created&nbsp;:- <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span>{" "}
                </h5>
                <h5>
                  {" "}
                  <i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                  Updated&nbsp;:- <span>2-01-2023</span>{" "}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
