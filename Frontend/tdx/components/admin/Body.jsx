import { Grid, Card, Text, Space, ThemeIcon, Group } from "@mantine/core";
import { AlertCircle, PlugConnected, ReportMoney } from "tabler-icons-react";
import MyLineChart from "./MyLineChart";
import MyPieChart from "./MyPieChart";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminBody() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const getTotalAtive = async () => {
    const res = axios.get("/api/number_of_agents");
    console.log(res);
    if (res.data) {
      return res.data;
    } else {
      return {};
    }
  };
  useEffect(() => {
    getTotalAtive();
  }, []);

  return (
    <div style={{ padding: "0rem 40px" }}>
      <Space h="md" />
      <h1>Organization Overview</h1>
      <Space h="md" />

      {/* Three Cards */}
      <Grid>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  Total Incidents
                </Text>
                <Text weight={700} size="xl">
                  140
                </Text>
              </div>
              <ThemeIcon size="xl">
                <ReportMoney />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  Total Apps Uninstalled by Admin
                </Text>
                <Text weight={700} size="xl">
                  15
                </Text>
              </div>
              <ThemeIcon size="xl" color="red">
                <AlertCircle />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  Yes to think
                </Text>
                <Text weight={700} size="xl">
                  12
                </Text>
              </div>
              <ThemeIcon size="xl" color="green">
                <PlugConnected />
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
            <MyPieChart />
          </Card>
        </Grid.Col>
        <Grid.Col span={7}>
          <Card>
            <MyLineChart />
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default AdminBody;
