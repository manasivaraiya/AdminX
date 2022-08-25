import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import { firestore } from "../utils/firebase";
import firebase from "../utils/firebase";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";

export default function dashboard() {
	const [elements, setElements] = useState([]);
	// const { user, logout } = useUser();

	const getallUsers = async () => {
		const data = await getUsers();
		console.log(typeof data);
		setElements(data);
		// console.log(typeof (elements));
		// data.forEach((user) => console.log(user));
	};

	useEffect(() => {
		getallUsers();
	}, []);

	// getallUsers();

	// firebase.database().ref("Users").on("value", snapshot =>{
	//   let userlist = [];
	//   snapshot.forEach(snap =>{
	//     userlist.push(snap.val());
	//   })
	//   this.setState({elements: userlist});
	// })

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

	const handleRedirect = (id) => {
		Router.push(`/client/${id}`);
	};

	return (
		<div>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
			/>

			<ResponsiveAppBar />
			{/* <h2 style={{ textAlign: "center" }}>All the available clients</h2> */}

			<div
				className="container"
				style={{ marginTop: "30px", width: "80%", margin: "auto" }}
			>
				<Link href="/client/new">
					<Button
						variant="filled"
						mr="md"
						size="sm"
						style={{
							backgroundColor: "#28315C",
							position: "fixed",
							bottom: "50px",
							right: "50px",
							borderRadius: "50%",
							height: "50px",
							width: "50px",
						}}
					>
						<i class="fa fa-plus" aria-hidden="true"></i>
					</Button>
				</Link>
				<Table style={{ marginTop: "10px" }}>
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Mac Address</th>
							<th>Name</th>
							<th>Url</th>
							<th>Description</th>
							<th>Status</th>
							<th>Last Response</th>
							<th>Open</th>
						</tr>
					</thead>
					<tbody>
						{elements.length > 0
							? elements.map((data, index) => (
									<tr>
										<td>{index + 1}</td>
										<td>{data.mac_add}</td>
										<td>{data.name}</td>
										<td>{data.url}</td>
										<td>{data.description}</td>
										<td>{data.status ? "Online" : "Offline"}</td>
										<td>
											{data.lastResponse
												? data.lastResponse.toDate().toDateString()
												: ""}
										</td>
										<td onClick={() => handleRedirect(data.mac_add)}>
											<i class="fa fa-external-link" aria-hidden="true"></i>
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
