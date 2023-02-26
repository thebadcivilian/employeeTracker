import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowLoading from "./ShowLoading";

function Read() {
  const [apiData, setApiData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    axios
      .get("https://63edcc87d466e0c18ba35701.mockapi.io/crud")
      .then((response) => {
        setApiData(response.data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const setDataToStorage = (
    id,
    name,
    department,
    position,
    email,
    phone,
    birthday,
    location
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("department", department);
    localStorage.setItem("position", position);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("birthday", birthday);
    localStorage.setItem("location", location);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://63edcc87d466e0c18ba35701.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();

    return axios
      .get(
        `https://63edcc87d466e0c18ba35701.mockapi.io/crud?emp_name=${searchValue}`
      )
      .then((response) => {
        setApiData(response.data);
        setSearchValue("");
      })
      .catch((err) => console.log(err));
  };

  const nameSortHandler = async (e) => {
    return axios
      .get(`https://63edcc87d466e0c18ba35701.mockapi.io/crud?sortBy=emp_name`)
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const locationSortHandler = async (e) => {
    return axios
      .get(
        `https://63edcc87d466e0c18ba35701.mockapi.io/crud?sortBy=emp_location`
      )
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const resetHandler = () => {
    getData();
  };

  const url = "https://63edcc87d466e0c18ba35701.mockapi.io/crud/";

  const searchUrl = url?.searchParams;

  console.log("search--------------------", searchUrl);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="my-2">
            <Link to="/create">
              <button className="btn btn-success ">Add new Employees</button>
            </Link>
          </div>
          <table className="table table-bordered table-striped table-dark table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DEPARTMENT</th>
                <th>POSITION</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>BIRTHDAY</th>
                <th>LOCATION</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && <ShowLoading />}
              {isLoading &&
                apiData.length !== 0 &&
                apiData.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.emp_name}</td>
                      <td>{emp.emp_department}</td>
                      <td>{emp.emp_position}</td>
                      <td>{emp.emp_email}</td>
                      <td>{emp.emp_phone}</td>
                      <td>{emp.emp_birthday}</td>
                      <td>{emp.emp_location}</td>

                      <td>
                        <Link to="/edit">
                          <button
                            onClick={() => {
                              setDataToStorage(
                                emp.id,
                                emp.emp_name,
                                emp.emp_department,
                                emp.emp_position,
                                emp.emp_email,
                                emp.emp_phone,
                                emp.emp_birthday,
                                emp.emp_location
                              );
                            }}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to permanently delete this item?"
                              )
                            ) {
                              deleteHandler(emp.id);
                            }
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <form onSubmit={searchSubmitHandler}>
          <input
            type="text"
            className="form-control"
            value={searchValue}
            placeholder="Search Name..."
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <input
            type="submit"
            value=" Search"
            className="btn btn-primary my-2"
          ></input>
        </form>
        <div>
          <button className="btn btn-primary mr-2" onClick={resetHandler}>
            Reset
          </button>

          <button className="btn btn-primary mx-2" onClick={nameSortHandler}>
            sort by name
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={locationSortHandler}
          >
            sort by location
          </button>
        </div>
      </div>
    </>
  );
}

export default Read;
