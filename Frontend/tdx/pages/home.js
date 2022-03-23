<<<<<<< HEAD
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
=======
>>>>>>> 38d989c0c14ed7f63d7b5e6144499fab7506fd72
import { Table } from "@mantine/core";
import ResponsiveAppBar from "../components/Navbar";

export default function dashboard() {
  const elements = [
    { SrNo: 1, url: 12.011, status: "Active", name: "Neelansh", desc: "User", lastres: "12/2/21-9.30" },
    { SrNo: 2, url: 14.007, status: "Inactive", name: "Nishit", desc: "Bob's Computer", lastres: "12/2/21-9.30" },
    { SrNo: 3, url: 88.906, status: "Active", name: "Raj", desc: "User", lastres: "12/2/21-9.30" },
    { SrNo: 4, url: 137.33, status: "Active", name: "Manan", desc: "File", lastres: "12/2/21-9.30" },
    { SrNo: 5, url: 140.12, status: "Inactive", name: "Jayesh", desc: "File", lastres: "12/2/21-9.30" },
  ];

  const rows = elements.map((element) => (
    <tr key={element.SrNo}>
      <td>{element.SrNo}</td>
      <td>{element.name}</td>
      <td>{element.url}</td>
      <td>{element.desc}</td>
      <td>{element.status}</td>
      <td>{element.lastres}</td>
    </tr>
  ));

  return (
    <div>
<<<<<<< HEAD
      <Table className={styles.my_table}>
        test
        <thead className={styles.my_th}>
=======
        <ResponsiveAppBar/>
      <Table>
        <thead>
>>>>>>> 38d989c0c14ed7f63d7b5e6144499fab7506fd72
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Url</th>
            <th>Description</th>
            <th>Status</th>
            <th>Last Response</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
