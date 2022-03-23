import styles from "../../styles/client/client.module.css";
import { Tabs } from "@mantine/core";
import { Apps, Terminal, PlayerPlay, Trash } from "tabler-icons-react";
import { Input, Code, Button, Table } from "@mantine/core";
import { useState } from "react";
import ResponsiveAppBar from "../../components/Navbar";
import axios from "axios";

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
  const handleUninstall = (name) => {
    console.log(name);
  };

  const rows = apps.map((element, index) => (
    <tr key={element.name}>
      <td>{index + 1}</td>
      <td>{element.name}</td>
      <td>{element.version}</td>
      <td>
        <Trash
          size={20}
          strokeWidth={2}
          color={"#ff0000"}
          onClick={() => handleUninstall(element.name)}
        />
      </td>
    </tr>
  ));

  const name = "Raj Tiwari";
  const description = "Raj's Home PC";
  const url = "127.0.0.1";
  const last_seen = "3 hrs ago";
  const status = "active";

  function NewlineText(props) {
    const text = props.text;
    if (text) {
      return text.split("\n").map((str) => <p>{str}</p>);
    } else {
      return "";
    }
  }

  const runCommand = async () => {
    console.log(command);
    setCommandOutput("Loading...");
    setCommand("");
    const data = {
      command: command,
    };

    try {
      const res = await axios.post(
        "https://30444335-3732-5a31-3132-bce92f8c1dc8.loca.lt",
        data
      );
      console.log({ res, status: res.status });
      if (res && res.status == 200) {
        // const output = JSON.parse(res.data);
        console.log(res.data);
        const op = res.data.out;
        console.log(op);
        setCommandOutput(op);
      } else {
        console.log("failed");
        setCommandOutput("Error");
      }
    } catch (e) {
      console.error("failed", e);
      setCommandOutput("Error");
    }
  };
  return (
    <div className={styles.main_wrapper}>
      <ResponsiveAppBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.profile_name}>{name}</h1>
          <h3 className={styles.profile_desc}>{description}</h3>
          <h4 className={styles.profile_url}>{url}</h4>
          <div className={styles.profile_buttons}>
            <Button
              variant="filled"
              mr="md"
              size="sm"
              style={{ backgroundColor: "#4caf50" }}
            >
              Connect
            </Button>
            <Button
              variant="filled"
              size="sm"
              style={{ backgroundColor: "#f44336" }}
            >
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
                <NewlineText text={commandOutput} />

                {/* <p>{ }</p> */}
              </Code>
            </Tabs.Tab>
            <Tabs.Tab label="Installed Apps" icon={<Apps size={20} />}>
              <Table striped verticalSpacing="md" style={{ width: "80%" }}>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
