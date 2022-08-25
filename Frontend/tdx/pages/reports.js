import { Table, Button } from "@mantine/core";
import { Component } from "react/cjs/react.production.min";
import ResponsiveAppBar from "../components/Navbar";
import Navbar from "../components/LandingNav";
import { getUsers } from "../utils/users";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import gif from "../utils/connection.png";
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

			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
				crossorigin="anonymous"
			></link>

			<ResponsiveAppBar />

			<h4>Under construction</h4>
		</div>
	);
}
