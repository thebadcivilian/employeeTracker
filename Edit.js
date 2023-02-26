import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [id, setid] = useState(0);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setid(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));

    setEmail(localStorage.getItem("email"));
    setPosition(localStorage.getItem("position"));
    setDepartment(localStorage.getItem("department"));
    setPhone(localStorage.getItem("phone"));
    setBirthday(localStorage.getItem("birthday"));
    setLocation(localStorage.getItem("location"));
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();

    axios
      .put(`https://63edcc87d466e0c18ba35701.mockapi.io/crud/${id}`, {
        emp_name: name,

        emp_email: email,
        emp_position: position,
        emp_department: department,
        emp_phone: phone,
        emp_birthday: birthday,
        emp_location: location,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="col-md-4 container">
        <form onSubmit={updateHandler}>
          <div className="my-2">
            <Link to="/">
              <button className="btn btn-success ">Go to Employees data</button>
            </Link>
          </div>
          <div className="form-group">
            <label>Update name:</label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Name"
              className="form-control"
            ></input>
          </div>

          <div className="form-group my-3">
            <label>Department:</label>
            <select
              required
              className="mx-3"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option value="null">--Choose options--</option>
              <option value="Development">Development</option>
              <option value="HR">HR</option>
              <option value="Training">Training</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group my-3">
            <label>Position:</label>
            <select
              required
              className="mx-3"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            >
              <option value="null">--Choose options--</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Quality Testing">Quality Testing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Update email:</label>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
              className="form-control"
            ></input>
          </div>

          <div className="form-group my-3">
            <label>Phone:</label>
            <input
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              type="tel"
              name="Phone number"
              placeholder="Phone"
              className="form-control"
            ></input>
          </div>

          <div className="form-group my-3">
            <label>Birthday:</label>
            <input
              required
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              value={birthday}
              type="date"
              name="Birthday"
              placeholder="Birthday"
              className="form-control"
            ></input>
          </div>

          <address className="form-group my-3">
            <label>Location:</label>
            <input
              required
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              value={location}
              type="text"
              placeholder="Location"
              className="form-control"
            ></input>
          </address>

          <br></br>
          <div className="d-grid">
            <input
              required
              type="submit"
              value="Update"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
