import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import Navbar from "../components/LandingNav";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import gif from "../utils/connections.png";
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

	const handleRedirect = (id, uuidx) => {
		Router.push({pathname: `/client/${id}`, query : { uuid: uuidx}}, `/client/${id}`);
	};

	return (
		<div className={styles.landing}>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
			/>

			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
				crossorigin="anonymous"
			></link>

			<ResponsiveAppBar />

			<main className={styles.alignImage}>
				<Image src={gif} height={350} width={350} />
			</main>
			{/* <div className="container">
				<div className="row">
					<div className="col-md-4">
						<a style={{ textDecoration: "none", color: "black" }} href="/home">
							<div className={styles.card}>
								<h3>All Clients</h3>
								<p>
									All the available clients on the network with our client
									installed
								</p>
							</div>
						</a>
					</div>
					<div className="col-md-4">
						<a
							href="/authorized_apps"
							style={{ textDecoration: "none", color: "black" }}
						>
							<div className={styles.card}>
								<h3>Authorized Apps</h3>
								<p>
									All the available clients on the network with our client
									installed
								</p>
							</div>
						</a>
					</div>
					<div className="col-md-4 pd-2">
						<a
							href="/reports"
							style={{ textDecoration: "none", color: "black" }}
						>
							<div className={styles.card}>
								<h3>Reports</h3>
								<p>Statistical view of all the data of the users available</p>
							</div>
						</a>
					</div>
				</div>
			</div> */}

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
						<i className="fa fa-plus" aria-hidden="true"></i>
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
							<th>Host Name</th>

							<th>Unique Id</th>
							<th>IPv4</th>
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
										<td>{data.hostname}</td>

										<td>{data.id}</td>
										<td>{data.ipv4}</td>
										<td style={{ color: data.status ? "green" : "red" }}>
											{data.status ? "Online" : "Offline"}
										</td>
										<td>{Date(data.epoch)}</td>
										<td onClick={() => handleRedirect(data.ipv4, data.id)}>
											<i className="fa fa-external-link" aria-hidden="true"></i>
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
