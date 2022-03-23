import styles from "../../styles/client/client.module.css";
import { Tabs } from "@mantine/core";
import { Apps, Terminal, PlayerPlay } from "tabler-icons-react";
import { Input, Code, Button, Table } from "@mantine/core";
import { useState } from "react";
import ResponsiveAppBar from "../../components/Navbar";

export default function Client({ props }) {

    const [command, setCommand] = useState("");
    const [commandOutput, setCommandOutput] = useState("");
    // const [apps, setApps] = useState([]);
    const apps = [
        { name: "Carbon", version: "1.0.0" },
        { name: "Python", version: "1.0.0" },
        { name: "Vs Code", version: "1.0.0" },
        { name: "Python 2", version: "1.0.0" },
        { name: "Python 3", version: "1.0.0" },
        { name: "Python 4", version: "1.0.0" },
    ];

    const rows = apps.map((element, index) => (
        <tr key={element.name}>
            <td>{index + 1}</td>
            <td>{element.name}</td>
            <td>{element.version}</td>
        </tr>
    ));

    // props.client.name = "raj";
    const name = "Raj Tiwari";
    const description = "Raj's Home PC";
    const url = "127.0.0.1";
    const last_seen = "3 hrs ago";
    const status = "active";

    function runCommand() {
        console.log(command);
        setCommandOutput(" ..  backend  Frontend  .git  README.md");
        setCommand("");
    }
    return (
        <div className={styles.main_wrapper}>
            <ResponsiveAppBar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.profile_name} >{name}</h1>
                    <h3 className={styles.profile_desc}>{description}</h3>
                    <h4 className={styles.profile_url}>{url}</h4>


                    <div className={styles.profile_buttons
                    }>
                        <Button variant="filled" mr="md" size="sm" style={{ backgroundColor: "#f44336" }}>
                            Connect
                        </Button>
                        <Button variant="filled" size="sm" style={{ backgroundColor: "#4caf50" }}>
                            Delete Client
                        </Button>
                    </div>
                    {/* <h3>Last Seen: {last_seen}</h3>
                <h3>Status: {status}</h3> */}
                </div>

                <div className={styles.tab_wrapper}>
                    <Tabs color="violet" tabPadding="md">
                        <Tabs.Tab label="Run Command" icon={<Terminal size={20} />}>
                            <div className={styles.run_code_wrapper}>
                                <Input
                                    // style={{ minWidth: "500px" }}
                                    icon={<PlayerPlay size={20} />}
                                    placeholder="ls -a"
                                    onChange={(e) => setCommand(e.target.value)}
                                />
                                <Button
                                    // color={"violet"}
                                    // color={"#482880"}
                                    style={{ backgroundColor: "#673ab7", margin: "0px 20px" }}
                                    onClick={runCommand}
                                >
                                    Run
                                </Button>
                            </div>

                            <Code>
                                <p>{commandOutput}</p>
                            </Code>
                        </Tabs.Tab>
                        <Tabs.Tab label="Installed Apps" icon={<Apps size={20} />}>
                            <Table striped verticalSpacing="md" style={{ width: "80%" }}>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Name</th>
                                        <th>Version</th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                        </Tabs.Tab>
                    </Tabs>
                </div>
            </div>

        </div >
    );
}
