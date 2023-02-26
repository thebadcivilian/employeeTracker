import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");

  console.log(name);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("https://63edcc87d466e0c18ba35701.mockapi.io/crud", {
        emp_name: name,
        emp_department: department,
        emp_position: position,
        emp_email: email,
        emp_phone: phone,
        emp_location: location,
        emp_birthday: birthday,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));

    setName("");

    setEmail("");
    setPosition("");
    setDepartment("");
    setPhone("");
    setLocation("");
    setBirthday("");
  };

  return (
    <>
      <div className="col-md-4 container">
        <form onSubmit={submitHandler}>
          <div className="my-2">
            <Link to="/">
              <button className="btn btn-success ">Go to Employees data</button>
            </Link>
          </div>
          <div className="form-group my-2">
            <label>Name:</label>
            <input
              required
              value={name}
              name="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
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
              <option value="department">Development</option>
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
              <option value="">--Choose options--</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Quality Testing">Quality Tester</option>
            </select>
          </div>
          <div className="form-group my-3">
            <label>Email:</label>
            <input
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="text"
              name="email"
              placeholder="Email"
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
          <div>
            <input
              type="submit"
              value="Add employee"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default Create;
