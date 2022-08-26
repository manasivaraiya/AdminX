import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import Navbar from "../components/LandingNav";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import DevicesTable from "../components/DevicesTable";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import gif from "../utils/lpt.png";
import logo from "../utils/logo.png";
import styles from "../styles/Home.module.css";
export default function Home() {

	const getallUsers = async () => {
		const data = await getUsers();
		console.log(typeof data);
		console.log("data is", data);
		// console.log(typeof (elements));
		// data.forEach((user) => console.log(user));
	};

	const scanAllDevices = async () => {
		const res = await axios.get("/api/get_clients");
		console.log(res.data.devices);
	};

	// useEffect(() => {
	// 	getallUsers();
	// }, []);

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

			<Navbar />

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
							<a href="#bottom">
								<i class="fa fa-arrow-down" aria-hidden="true"></i>
							</a>
						</Button>
					</div>
				</div>
			</div>
			<h1
				style={{
					textAlign: "center",
					fontFamily: "Arial, Helvetica, sans-serif",
					wordSpacing: "2px",
					fontWeight: "700",
					color: "#1B203E",
				}}
			>
				SERVICES
			</h1>
			<div class="container" id="bottom" style={{ margin: "80px" }}>
				<div class="row">
					<div class="col-md-2 "></div>
					<div class="col-md-4 ">
						<a
							style={{ textDecoration: "none", color: "black" }}
							href="/allclients"
						>
							<div className={styles.card}>
								<h3>All Clients</h3>
								<p>
									All the available clients on the network with our agent
									installed
								</p>
							</div>
						</a>
					</div>
					<div className="col-md-4 ">
						<a
							href="/authorized_apps"
							style={{ textDecoration: "none", color: "black" }}
						>
							<div className={styles.card}>
								<h3>Authorized Apps</h3>
								<p>
									The authorized apps present on the client's machine and it's
									details
								</p>
							</div>
						</a>
					</div>
					<div class="col-md-2 "></div>
				</div>
				<div class="row">
					<div class="col-md-2 "></div>
					<div className="col-md-4 ">
						<a
							href="/admin"
							style={{ textDecoration: "none", color: "black" }}
						>
							<div className={styles.card}>
								<h3>Reports</h3>
								<p>Statistical view of all the data of the users available</p>
							</div>
						</a>
					</div>
					<div className="col-md-4 ">
						<a
							href="/reports"
							style={{ textDecoration: "none", color: "black" }}
						>
							<div className={styles.card}>
								<h3>Mass Uninstall</h3>
								<p>Search for an application on all the users PC and uninstall</p>
							</div>
						</a>
					</div>
					<div class="col-md-2 "></div>
				</div>
			</div>
			{/* <section className={styles.timeline}>
				<article>
					<div className={styles.inner}>
						<h2 className={styles.h2}>The Title</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							quis rutrum nunc, eget dictum massa. Nam faucibus felis nec augue
							adipiscing, eget commodo libero mattis.
						</p>
					</div>
				</article>
				<article>
					<div className={styles.inner}>
						<h2 className={styles.h2}>The Title</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							quis rutrum nunc, eget dictum massa. Nam faucibus felis nec augue
							adipiscing, eget commodo libero mattis.
						</p>
					</div>
				</article>
				<article>
					<div className={styles.inner}>
						<h2 className={styles.h2}>The Title</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							quis rutrum nunc, eget dictum massa. Nam faucibus felis nec augue
							adipiscing, eget commodo libero mattis.
						</p>
					</div>
				</article>
			</section> */}
			<br></br>
		</div>
	);
}

// SimpleDialog.propTypes = {
// 	onClose: PropTypes.func.isRequired,
// 	open: PropTypes.bool.isRequired,
// 	selectedValue: PropTypes.string.isRequired,
// };
