import styles from "../../styles/client/client.module.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Apps,
  Terminal,
  PlayerPlay,
  Trash,
  Wallpaper,
  BrandGoogleAnalytics,
  FileDownload,
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
import { AlertCircle } from "tabler-icons-react";
import { useEffect, useState } from "react";
import Script from 'next/script'
import ResponsiveAppBar from "../../components/Navbar";
import axios from "axios";
import { firestore } from "../../utils/firebase";
// import testJSON from "../../test.json";
import Head from "next/head";
import { useRouter } from 'next/router'

const Client = ({ props }) => {

  const router = useRouter();
  const [clientURL, setClientURL] = useState("");
  const [userDocId, setUserDocId] = useState("");


  useEffect(() => {
    if (!router.isReady) { return };
    setClientURL("http://" + router.query.id + ":8080");
    console.log(clientURL);
    setUserDocId(router.query.uuid);

  }, [router.isReady]);


  // const clientURL = "https://bc-e9-2f-8c-1d-c8.loca.lt";
  // const clientURL = "https:/ack-smashers-0.loca.lt";
  // const userDocId = "TdflnohiSh/stOZeB8ODWsX";

  const logOutputLetterLimit = 600;

  const [command, setCommand] = useState("");
  const [commandOutput, setCommandOutput] = useState("");

  const [logs, setLogs] = useState([]);

  const [apps, setApps] = useState([]);

  const [opened, setOpened] = useState(false);
  const [selectedVuln, setSelectedVulnInfo] = useState({});

  const [systemReport, setSystemReport] = useState("");

  // const handleUninstall = async (name) => {
  //   console.log(name);
  //   const exec = `Get-Package -Provider Programs -IncludeWindowsInstaller -Name "${name}" |  % { & ($_.Meta.Attributes["UninstallString"] -replace '"') /S}`;
  //   console.log(exec);
  //   const res = await axios.post("/api/uninstall_app", {
  //     application: name,
  //     // platform: 
  //   });

  //   console.log(res)

  //   // setCommand(exec);
  //   // runCommand();
  // };

  const submit = (elementName) => {

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUninstall(elementName)
          // onClick={() => handleUninstall(element.Name)}
        },
        {
          label: 'No',
          onClick: () => window.history.go(0)
        }
      ]
    });
  }

  const handleUninstall = async (name) => {
    // console.log(name);
    const exec = `Get-Package -Provider Programs -IncludeWindowsInstaller -Name "${name}" |  % { & ($_.Meta.Attributes["UninstallString"] -replace '"') /S}`;
    // console.log(exec);
    const res = await axios.post(clientURL, {
      command: exec,
    });

    console.log(res)

    // setCommand(exec);
    // runCommand();
  };

  const name = "OMEN-win";
  const description = "Jayesh's Home PC";
  const url = "192.168.198.169";
  const last_seen = "online";
  const status = "active";

  function NewlineText(props) {
    const text = props.text;
    if (text) {
      return text.split("\n").map((str) => (
        <pre>
          <span>{str}</span>
          <br />
        </pre>
      ));
    } else {
      return "";
    }
  }

  const runCommand = async () => {
    setCommandOutput("Loading...");
    const data = {
      command: command,
    };
    // console.log("data is", data);

    try {
      if (clientURL === "" || userDocId === "") return;
      const res = await axios.post(clientURL, data);
      // console.log({ res, status: res.status });
      if (res && res.status == 200) {
        // const output = JSON.parse(res.data);
        // console.log(res.data);
        const op = res.data.out;
        // console.log(op);
        setCommandOutput(op);

        // Event log
        const date = new Date();
        firestore
          .collection("Users")
          .doc(userDocId) // Later
          .collection("Logs")
          .add({
            datetime: date.toString(),
            timestamp: Date.now(),
            command,
            output: op,
          });
      } else {
        console.log("Failed");
        setCommandOutput("Error");
      }
    } catch (e) {
      console.error("failed", e);
      setCommandOutput("Error");
    }

    // setCommand("");
  };

  const handleVulnInfo = (vuln) => {
    setSelectedVulnInfo(vuln);
    setOpened(true);
  };
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  const getVulnerabilities = async (data) => {
    // data.forEach(async (app) => { console.log("oasndo") })
    // console.log(data);
    let newElements = await Promise.all(
      data.map(async (element) => {
        let vulnerabilities = [];
        let name = element.Name;
        name = name.toLowerCase();
        name = name.replace(/ /g, "_");
        name = name.replace(/\(.+\)/g, "");
        // name = name.replace(/\d+$/, "")
        const version = element.Version;
        const url = `https://services.nvd.nist.gov/rest/json/cves/1.0/?isExactMatch=true&addOns=cves&cpeMatchString=cpe:2.3:*:*:${name}:${version}`;

        try {
          const res = await axios.get(url);
          if (res.status == 200) {
            if (res.data.totalResults > 0) {
              for (let i = 0; i < Math.min(res.data.totalResults, 3); i++) {
                vulnerabilities.push(res.data.result.CVE_Items[i]);
              }
            }
          }
        } catch (e) {
          console.log("not found");
        }
        // console.log({ ...element, vulnerabilities });

        return { ...element, vulnerabilities };
      })
    );

    setApps(newElements);
    // console.log(newElements);
    // newElements.forEach((element) => {
    //   if (element.vulnerabilities.length > 0) {
    //     console.log(element);
    //   }
    // });
  };

  async function getSystemReport() {
    // console.log("getsystemreport called");
    try {
      if (clientURL === "") return;
      const res = await axios.get(clientURL + "/data");
      const res2 = await axios.get(clientURL + "/hardware");
      if (res.status == 200 && res2.status == 200) {
        const output = JSON.parse(res.data.out);
        const output2 = JSON.parse(res2.data.out);
        // const output = testJSON.output;
        // const output2 = testJSON.output2;
        // console.log({ output, output2 });
        const data = {
          network_data: output,
          system_data: output2,
        };

        let finalOutput = "";
        finalOutput = JSON.stringify(data, null, 2);

        setSystemReport(finalOutput);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function onMounted() {
    getLogs();
    const data = {
      command:
        "Get-Package -IncludeWindowsInstaller -Name *| select Name, Version | ConvertTo-Json",
    };
    try {
      if (clientURL === "") return;
      const res
        = await axios.post(clientURL, data);
      if (res && res.status == 200) {
        const output = JSON.parse(res.data.out);
        setApps(output);
        getVulnerabilities(output);
        getSystemReport();
      }
    } catch (e) {
      console.error("Axios request failed", e);
    }
  }

  useEffect(onMounted, []);

  const CRITICALITY = {
    LOW: "#2196f3",
    MEDIUM: "#ff9800",
    HIGH: "#ff784e",
  };

  function onKeyCapture(e) {
    if (e.key === "Enter") {
      runCommand();
    }
  }

  function handleVulnClick() {
    // console.log(e);
    console.log("opening");
  }

  const rows =
    apps.length > 0
      ? apps.map((element, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{element.Name}</td>
          <td>{element.Version}</td>
          <td>
            <Trash
              style={{ cursor: "pointer" }}
              size={20}
              strokeWidth={2}
              color={"#ff0000"}
              // onClick={() => handleUninstall(element.Name)}
              onClick = {()=>submit(element.Name)}
            />
          </td>
          <td>
            {element &&
              element.vulnerabilities &&
              element.vulnerabilities.length > 0
              ? element.vulnerabilities.map((vulnerability, index) => (
                // <span style={{ marginRight: "10px", color: CRITICALITY[vulnerability.impact.baseMetricV2.severity] }}>{vulnerability.cve.CVE_data_meta.ID}</span>
                <Badge
                  style={{
                    backgroundColor:
                      CRITICALITY[
                      vulnerability.impact.baseMetricV3.cvssV3.baseSeverity
                      ],
                    cursor: "pointer",
                  }}
                  size="md"
                  mr="md"
                  mb="sm"
                  variant="filled"
                  radius="lg"
                  onClick={() => handleVulnInfo(vulnerability)}
                >
                  {vulnerability.cve.CVE_data_meta.ID}
                </Badge>
              ))
              : "No known Issues"}
          </td>
        </tr>
      ))
      : [];

  async function getLogs() {
    try {
      if (userDocId === "") return;
      const docSnapshots = await firestore
        .collection("Users")
        .doc(userDocId)
        .collection("Logs")
        .get();
      const docs = docSnapshots.docs.map((doc) => doc.data());
      docs.sort((a, b) => a.timestamp > b.timestamp);
      setLogs(docs);
    } catch (e) {
      console.error("Error while fetching logs", e);
    }
  }

  function downloadAsPDF() {
    try {
      const container = document.getElementById("systemReportContainer");
      html2pdf(container);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.main_wrapper}>
      <Head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
          integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></Script>
      </Head>
      <ResponsiveAppBar />

      <Modal
        size="lg"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
      // title="Addition Information"
      >
        {/* Modal content
         */}
        {/* {selectedVuln.cve.CVE_data_meta.ID}
        cons */}
        {
          // console.log((selectedVuln.impact.baseMetricV3.impactScore))
        }
        {selectedVuln &&
          selectedVuln.cve &&
          selectedVuln.cve.description &&
          selectedVuln.cve.CVE_data_meta && (
            <>
              <p
                style={{
                  fontSize: "14px",
                  color: "#808080",
                  fontWeight: "bold",
                }}
              >
                {selectedVuln.cve.CVE_data_meta.ASSIGNER}
              </p>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {selectedVuln.cve.CVE_data_meta.ID}
              </p>

              <div className="desc" style={{ margin: "25px 0px" }}>
                <p>{selectedVuln.cve.description.description_data[0].value}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1.5em",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    // backgroundColor: "#ddd",
                    border: "1px solid #eee",
                    padding: "1em 1.5em",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <b
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  >
                    Severity
                  </b>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {selectedVuln.impact.baseMetricV3.cvssV3.baseSeverity}
                  </span>
                </p>
                <p
                  style={{
                    // backgroundColor: "#72a3f2",
                    border: "1px solid #eee",
                    padding: "1em 1.5em",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <b
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  >
                    Exploitability Score
                  </b>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {selectedVuln.impact.baseMetricV3.exploitabilityScore}
                    <span style={{ fontSize: "14px", color: "#2e2e2e" }}>
                      /10
                    </span>
                  </span>
                </p>
                <p
                  style={{
                    // backgroundColor: "#f29872",
                    border: "1px solid #eee",
                    padding: "1em 1.5em",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <b
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  >
                    Impact Score
                  </b>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {selectedVuln.impact.baseMetricV3.impactScore}
                    <span style={{ fontSize: "14px", color: "#2e2e2e" }}>
                      /10
                    </span>
                  </span>
                </p>
              </div>

              <div
                className="add-info"
                style={{
                  marginTop: "25px",
                  backgroundColor: "#e8e8e8",
                  borderRadius: "10px",
                  padding: "2em",
                  fontSize: "14px",
                }}
              >
                <p style={{ fontWeight: "500", marginBottom: "0.5em" }}>
                  Additional Information
                </p>
                {selectedVuln.cve.references.reference_data.map(
                  (reference, index) => (
                    <div style={{ marginBottom: "5px" }}>
                      <a
                        href={reference.url}
                        target="_blank"
                        style={{
                          fontWeight: "300",
                          textDecoration: "underline",
                        }}
                      >
                        {reference.url}
                      </a>
                      <br />
                    </div>
                  )
                )}
              </div>
            </>
          )}
      </Modal>
      <div className={styles.container} style={{ paddingBottom: "3em" }}>
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
              Connected
            </Button>
            {/* <Button
              variant="filled"
              size="sm"
              style={{ backgroundColor: "#f44336" }}
            >
              Delete Client
            </Button> */}
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
                  onKeyDownCapture={onKeyCapture}
                />
                <Button
                  style={{ backgroundColor: "#673ab7", margin: "0px 20px" }}
                  onClick={runCommand}
                >
                  Run
                </Button>
              </div>
              <div
                style={{
                  marginTop: "1em",
                  backgroundColor: "#eee",
                  padding: "1em 2em",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                <NewlineText text={commandOutput} />
              </div>

              {/* <p>{ }</p> */}
            </Tabs.Tab>
            <Tabs.Tab label="Installed Apps" icon={<Apps size={20} />}>
              <Table striped verticalSpacing="md" style={{ width: "80%" }}>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Action</th>
                    <th>Known Issues</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Tabs.Tab>
            <Tabs.Tab label="Logs" icon={<Wallpaper size={20} />}>
              <Table striped verticalSpacing="md" style={{ width: "80%" }}>
                <thead>
                  <tr>
                    <th>Date and Time</th>
                    <th>Command</th>
                    <th>Output</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0
                    ? logs.map((log) => (
                      <tr key={log.timestamp}>
                        <td style={{ fontSize: "12px" }}>{log.datetime}</td>
                        <td style={{ fontSize: "12px" }}>{log.command}</td>
                        <td>
                          <p style={{ fontSize: "12px" }}>
                            {log.output.length > logOutputLetterLimit
                              ? log.output.slice(0, logOutputLetterLimit) +
                              "..."
                              : log.output}
                          </p>
                        </td>
                        <td style={{ fontSize: "12px" }}>{log.timestamp}</td>
                      </tr>
                    ))
                    : null}
                </tbody>
              </Table>
            </Tabs.Tab>
            <Tabs.Tab
              label="System Report"
              icon={<BrandGoogleAnalytics size={20} />}
            >
              <Button
                style={{
                  margin: "0 0 1em 0",
                  display: systemReport.length > 0 ? "block" : "hidden",
                }}
                onClick={() => downloadAsPDF()}
              >
                {" "}
                <FileDownload /> &nbsp; Download as PDF
              </Button>
              <div
                id="systemReportContainer"
                style={{
                  maxWidth: "100%",
                  overflow: "scroll",
                  backgroundColor: "#f5f5f5",
                  padding: "2em",
                  borderRadius: "10px",
                }}
              >
                {systemReport.length > 0 ? (
                  <NewlineText text={systemReport}></NewlineText>
                ) : (
                  "No system report generated yet"
                )}
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


export default Client;