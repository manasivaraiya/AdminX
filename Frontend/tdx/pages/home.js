import { Table } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import {firestore} from "../utils/firebase";
import firebase from "../utils/firebase";

export default function dashboard() {
  const elements = [];
  firebase.database().ref("Users").on("value", snapshot =>{
    let userlist = [];
    snapshot.forEach(snap =>{
      userlist.push(snap.val());
    })
    this.setState({elements: userlist});
  })

  // ComponentDidMount(){
  //   firebase.database().ref("Users").on("value", snapshot =>{
  //     let userlist = [];
  //     snapshot.forEach(snap =>{
  //       userlist.push(snap.val());
  //     })
  //     this.setState({elements = userlist});
  //   })
  // };

  // const rows = elements.map((element) => (
  //   <tr key={element.SrNo}>
  //     <td>{element.SrNo}</td>
  //     <td>{element.name}</td>
  //     <td>{element.url}</td>
  //     <td>{element.desc}</td>
  //     <td>{element.status}</td>
  //     <td>{element.lastres}</td>
  //   </tr>
  // ));

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container" style={{ marginTop: "30px" }}>
        <Table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Url</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Response</th>
            </tr>
          </thead>
          <tbody>{this.state.elements.map(data =>{
            return(
              <tr>
                <td>{data.SrNo}</td>
                <td>{data.name}</td>
                <td>{data.url}</td>
                <td>{data.desc}</td>
                <td>{data.status}</td>
                <td>{data.lastres}</td>
              </tr>
            )
          })}</tbody>
        </Table>
      </div>
    </div>
  );
}
