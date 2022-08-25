import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import Navbar from "../components/LandingNav";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import gif from "../utils/lpt.png";
import logo from "../utils/logo.png";
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

	const handleRedirect = (id, uuid) => {
		Router.push({
			pathname: `/client/${id}`,
			query: { uuid: uuid },
		});
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

			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<Image src={gif} height={550} width={800} />
					</div>
					<div class="col-md-4">
						<div style={{ paddingTop: "100px" }}>
							<Image src={logo} height={200} width={600} />
						</div>
						<h5
							style={{
								fontFamily: "Arial, Helvetica, sans-serif",
								wordSpacing: "2px",
								color: "1B203E",
							}}
						>
							Remote monitoring and management is the process of supervising and
							controlling IT systems by means of locally installed agents that
							can be accessed by a management service provider.
						</h5>
						<Button
							style={{
								backgroundColor: "#1B203E",
								borderRadius: "20%",
								marginTop: "20px",
							}}
						>
							<i class="fa fa-arrow-down" aria-hidden="true"></i>
						</Button>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-md-4">
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
			</div>
			{/* <div className="container" style={{ margin: "50px auto", width: "80%" }}>
				<Link href="/client/new">
					<Button
						variant="filled"
						mr="md"
						size="sm"
						style={{
							backgroundColor: "#1B203E",
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
										<i class="fa fa-external-link" aria-hidden="true"></i>
									</td>
								</tr>
							))
							: null}
					</tbody>
				</Table>
			</div> */}
		</div>
	);
}
