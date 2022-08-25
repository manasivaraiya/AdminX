import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import Navbar from "../components/LandingNav";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import DevicesTable from "../components/DevicesTable"
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import gif from "../utils/connections.png";
import styles from "../styles/Home.module.css";
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



import axios from "axios";

const style = {
	minWidth: "900px !important",
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflow: 'scroll',
};




function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};
	return (
		<Dialog className={style} onClose={handleClose} open={open}
			maxWidth="xl"
		>
			<div style={{ margin: "20px" }}>
				<DialogTitle style={{
					padding: "0",
					paddingTop: "20px",
					marginBottom: "5px"

				}}><b >All connected PCs in the network</b></DialogTitle>

				<hr style={{ paddingBottom: "10px" }} />
				<DevicesTable
					elements={props.elements}
					rows={props.devices} />

			</div>

		</Dialog>
	);
}
export default function dashboard() {
	const [elements, setElements] = useState([]);
	// const { user, logout } = useUser();
	const [devices, setDevices] = useState([]);

	const getallUsers = async () => {
		const data = await getUsers();
		console.log(typeof data);
		console.log("data is", data);
		setElements(data);
		// console.log(typeof (elements));
		// data.forEach((user) => console.log(user));
	};

	const scanAllDevices = async () => {
		const res = await axios.get("/api/get_clients");
		setDevices(res.data.devices);
		console.log(res.data.devices);
	}

	useEffect(() => {
		getallUsers();


	}, []);

	const handleRedirect = (id, uuid) => {
		Router.push(
			{
				pathname: `/client/${id}`,
				query: { uuid: uuid }
			}
		);
	};


	const [open, setOpen] = useState(false);
	// const handleOpen = async () => {
	// 	// await scanAllDevices();
	// 	setOpen(true)
	// };
	// const handleClose = () => setOpen(false);

	const handleClickOpen = async () => {
		await scanAllDevices();
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		// setSelectedValue(value);
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
			<>
				<SimpleDialog
					className={style}
					devices={devices}
					elements={elements}
					open={open}
					onClose={handleClose}
					style={{ minWidth: "1000px !important" }}
				/>
			</>
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
				<Button
					variant="filled"
					mr="md"
					style={{
						backgroundColor: "#28315C",
						position: "fixed",
						bottom: "40px",
						right: "40px",
						borderRadius: "50%",
						height: "50px",
						width: "50px",
					}}
					onClick={handleClickOpen}
				>
					<i className="fa fa-search-plus fa-md" aria-hidden="true" ></i>
				</Button>

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
			</div>
		</div >
	);
}


SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};