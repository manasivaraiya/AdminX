import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import { firestore } from "../utils/firebase";
import firebase from "../utils/firebase";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import connection from "../utils/connection.png";
import styles from "../styles/Home.module.css";
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
			<main className={styles.alignImage}>
				<Image
					src={connection}
					alt="Picture of the author"
					width={200}
					height={200}
				/>
			</main>
			<div className="container" style={{ margin: "50px auto", width: "80%" }}>
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

				<Table
					striped
					highlightOnHover
					verticalSpacing="md"
					style={{ fontFamily: "Arial" }}
				>
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Ip Address</th>
							<th>Name</th>
							<th>Host Name</th>
							<th>Description</th>
							<th>Status</th>
							<th>Last Response</th>
							<th>Open</th>
						</tr>
					</thead>
					<tbody id="clients">
						{elements.length > 0
							? elements.map((data, index) => (
									<tr>
										<td>{index + 1}</td>
										<td>{data.mac_add}</td>
										<td style={{ fontWeight: "bold" }}>{data.name}</td>
										<td>{data.url}</td>
										<td>{data.description}</td>
										<td style={{ color: data.status ? "green" : "red" }}>
											{data.status ? "Online" : "Offline"}
										</td>
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
