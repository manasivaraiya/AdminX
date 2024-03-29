import styles from "../../styles/client/client.module.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [userhostname, setUserhostname] = useState("");

  const [ip, setip] = useState("");


  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  useEffect(() => {
    if (!router.isReady) {
      // console.log("exit")
      return
    };
    // console.log("entry")
    console.log(router.query);

    // console.log(clientURL);

    setClientURL("http://" + router.query.id + ":8080");
    setUserDocId(router.query.uuid);
    setUserhostname(router.query.hostname);
    setip(router.query.id);




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
        },
        {
          label: 'No',
          onClick: () => window.history.go(0)
        }
      ]
    });
  }

  const succStatus = () => toast.success("Success");
  const failStatus = () => toast.error("Failure");


  const handleUninstall = async (name) => {
    // console.log(name);
    const exec = `Get-Package -Provider Programs -IncludeWindowsInstaller -Name "${name}" |  % { & ($_.Meta.Attributes["UninstallString"] -replace '"') /S}`;
    // console.log(exec);
    const res = await axios.post(clientURL, {
      command: exec,
    });

    // console.log(res)
    if ((res.data.err).length > 0) {
      // window.alert('ERROR')
      failStatus()
    }
    else {
      succStatus()
    }

    // setCommand(exec);
    // runCommand();
  };

  const name = userhostname;
  const description = "Home PC";
  const url = ip;
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

  const saveApplications = async (data) => {
    try {
      const list = {
        installed_apps: data
      };

      firestore
        .collection("Users")
        .doc(userDocId) // Later
        .update(list);
    } catch (e) {
      console.error("failed", e);
      setCommandOutput("Error");
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
      // console.log("wil wiat")
      const res = await axios.post(clientURL, data);
      // console.log({ res, status: res.status });
      console.log("doneeeeeee")
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
    console.log("getsystemreport called");
    try {
      if (clientURL === "") return;
      const res = await axios.get(clientURL + "/data");
      const res2 = await axios.get(clientURL + "/hardware");
      if (res.status == 200 && res2.status == 200) {
        const output = JSON.parse(res.data.out);
        const output2 = JSON.parse(res2.data.out);
        // const output = testJSON.output;
        // const output2 = testJSON.output2;
        console.log({ output, output2 });
        const network_data = [];
        for(var i=0; i<output.length; i++){
          network_data.push({
            ComputerName : output[i].ComputerName,
            Interface : output[i].InterfaceAlias,
            InterfaceDescription : output[i].InterfaceDescription
          });
        }
        const network_details = [];
        for(var i =0; i<output2.CsNetworkAdapters.length; i++){
          network_details.push({
            IPAddress : output2.CsNetworkAdapters[i].IPAddresses,
            Interface : output2.CsNetworkAdapters[i].ConnectionID
          });
        }
        const processors_details = [];
        for(var i=0;i<output2.CsProcessors.length; i++){
          processors_details.push({
            Name : output2.CsProcessors[i].Name,
            NumberOfCores : output2.CsProcessors[i].NumberOfCores,
            Status : output2.CsProcessors[i].Status
          });
        }
        const data = {
          network_data: network_data,
          system_data: {
            ProductName : output2.WindowsProductName,
            Owner : output2.WindowsRegisteredOwner,
            SystemRootDir : output2.WindowsSystemRoot,
            BiosName : output2.BiosName,
            BiosStatus : output2.BiosStatus,
            NetworkDetails : network_details,
            Processors : processors_details,
            Architecture : output2.OsArchitecture,
            Language : output2.OsLanguage,
            TimeZone : output2.TimeZone
          },
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
    if (userDocId === "" || clientURL === "") return;
    console.log("insided mounted")
    getLogs();

    console.log(clientURL);
    console.log(userDocId)
    const data = {
      command:
        "Get-Package -IncludeWindowsInstaller -Name *| select Name, Version | ConvertTo-Json",
    };
    try {
      if (clientURL === "") {
        console.log("returning while getting apps")
        return;

      };

      const res = await axios.post(clientURL, data);
      if (res && res.status == 200) {
        const output = JSON.parse(res.data.out);
        // console.log(output);
        await saveApplications(output);
        setApps(output);
        getVulnerabilities(output);
        await getSystemReport();
      }
    } catch (e) {
      console.error("Axios request failed", e);
    }
  }

  useEffect(onMounted, [clientURL, userDocId]);

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
              onClick={() => submit(element.Name)}
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
      if (userDocId === "") {
        // console.log("exiting logs")
        return;
      };
      const docSnapshots = await firestore
        .collection("Users")
        .doc(userDocId)
        .collection("Logs")
        .get();
      const docs = docSnapshots.docs.map((doc) => doc.data());
      docs.sort((a, b) => a.timestamp < b.timestamp);
      // console.log("done with logs", docs)
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
      <ToastContainer />
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
        <div className={styles.card}>
          <h1 className={styles.profile_name}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            >
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
            </svg>
            {name}
          </h1>
          <h3 className={styles.profile_desc}>
            <svg
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M128 96h384v256h64v-272c0-26.38-21.62-48-48-48h-416c-26.38 0-48 21.62-48 48V352h64V96zM624 383.1h-608c-8.75 0-16 7.25-16 16v16c0 35.25 28.75 64 64 64h512c35.25 0 64-28.75 64-64v-16C640 391.2 632.8 383.1 624 383.1z" />
            </svg>
            {description}
          </h3>
          <h4 className={styles.profile_url}>{url}</h4>
          <div className={styles.profile_buttons}>
            <h5 style={{ color: "#4caf50", fontWeight: "bold" }}>
              <span className={styles.dot}></span> Connected
            </h5>
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