
import React from 'react'
import { useState, useEffect } from "react"
import ResponsiveAppBar from "../components/Navbar";
import {
    Search
} from "tabler-icons-react";
import {
    Input,
    Code,
    Button,
    Table,
    Badge,
    Modal,
    Group,
    Tabs,
    Alert,
} from "@mantine/core";
import axios from 'axios';


const searchbyapp = () => {

    const [application, setApplication] = useState("");
    const [rows, setRows] = useState([]);


    function onKeyCapture(e) {
        if (e.key === "Enter") {
            runCommand();
        }
    }

    const searchUsers = async () => {
        // setCommandOutput("Loading...");
        // console.log(application);


        const res = await axios.get("/api/app/users/" + application);
        console.log(res);

        if (res.data) {
            return res.data;
        }
        else {
            console.log("nothing")
        }
    };




    return (
        <div>
            <ResponsiveAppBar />
            <div className="wrapper">
                <Input
                    style={{ maxWidth: "800px", padding: "20px 20px", margin: "20px 20px" }}
                    icon={<Search size={20} />}
                    placeholder="Name of the application"
                    onChange={(e) => setApplication(e.target.value)}
                    onKeyDownCapture={onKeyCapture}
                />
                <Button
                    style={{ backgroundColor: "#673ab7", margin: "0px 20px", float: "20px 20px" }}
                    onClick={() => { setRows(searchUsers) }}
                >
                    Run
                </Button>



            </div>
        </div>
    )
}

export default searchbyapp