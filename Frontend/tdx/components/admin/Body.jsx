import {
  Grid,
  Card,
  Text,
  Space,
  ThemeIcon,
  Group,
  Divider,
} from "@mantine/core";
import { Archive, AppsOff, ReportAnalytics } from "tabler-icons-react";
import MyLineChart from "./MyLineChart";
import MyPieChart from "./MyPieChart";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminBody() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pastIncidents, setPastIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const getTotalAtive = async () => {
    setLoading(true);
    const res = await axios.get("/api/number_of_agents");
    console.log(res);
    if (res.data) {
      console.log("indiseeeeeee");
      setActiveUsers(res.data.registered_devices);
      setRegisteredUsers(res.data.total_devices);
      setLoading(false);
      return res.data;
    } else {
      setLoading(false);
      return {};
    }
  };

  const getPastIncidents = async () => {
    setLoading(true);
    const res = await axios.get("/api/incident_series");
    console.log(res);
    if (res.data) {
      setPastIncidents(res.data.response);
      setLoading(false);
      return res.data;
    } else {
      setLoading(false);
      return {};
    }
  };
  useEffect(() => {
    getTotalAtive();
    getPastIncidents();
  }, []);

  return (
    <div style={{ padding: "0rem 40px" }}>
      <Space h="md" />
      <h2>Organization level Overview</h2>
      <Divider />
      <Space h="xl" />

      {/* Three Cards */}
      <Grid>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  <b>Total Incidents</b> (last 7 days)
                </Text>
                <Text weight={700} size="xl">
                  23
                </Text>
              </div>
              <ThemeIcon size="xl">
                <ReportAnalytics />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  <b>Total Apps Uninstalled by Admin</b> (last 7 days)
                </Text>
                <Text weight={700} size="xl">
                  15
                </Text>
              </div>
              <ThemeIcon size="xl" color="red">
                <Archive />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  <b>Vulnerable Applications</b>
                </Text>
                <Text weight={700} size="xl">
                  12
                </Text>
              </div>
              <ThemeIcon size="xl" color="orange">
                <AppsOff />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts */}
      <Space h="md" />
      <Grid gutter={12}>
        <Grid.Col span={5}>
          <Card>
            {!loading && registeredUsers && activeUsers && (
              <MyPieChart
                loading={loading}
                registeredUsers={registeredUsers}
                activeUsers={activeUsers}
              />
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={7}>
          <Card>
            {!loading && pastIncidents.length > 0 && (
              <MyLineChart loading={loading} pastIncidents={pastIncidents} />
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default AdminBody;
