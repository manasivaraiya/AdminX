import { Table } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import { firestore } from "../utils/firebase";
import firebase from "../utils/firebase";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import { Link } from "@mui/material";
// import withAuth from '../auth/withAuth';
// import { useUser } from '../auth/useUser';

export default function dashboard() {

  const [elements, setElements] = useState([]);
  // const { user, logout } = useUser();

  const getallUsers = async () => {

    const data = await getUsers();
    console.log(typeof (data));
    setElements(data);
    console.log(typeof (elements));
    data.forEach((user) => console.log(user));



  }

  useEffect(() => {

    getallUsers();


  }, [])

  return (
    
    <div>
      <ResponsiveAppBar />
      <div className="container" style={{ marginTop: "30px" }}>
        <Table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Mac Address</th>
              <th>Name</th>
              <th>Url</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Response</th>
            </tr>
          </thead>
          {/* {elements} */}
          <tbody>
            {elements.length > 0 ? elements.map((data, index) =>

              <tr>
                <td>{index + 1}</td>
                <td>{data.id}</td>
                <td>
                  <Link href={ `client/${data.id}`
                    }
                  >{data.name}
                  </Link>
                </td>
                <td>{data.url}</td>
                <td>{data.description}</td>
                <td>{data.status ? "Online" : "Offline"}</td>
                <td>{data.lastResponse.toDate().toDateString()}</td>
              </tr>

            ) : null
            }

          </tbody>
        </Table>
      </div>
    </div>
  );
}
