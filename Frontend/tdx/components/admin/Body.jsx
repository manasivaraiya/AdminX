import { Grid, Card, Text, Space, ThemeIcon, Group } from "@mantine/core";
import { AlertCircle, PlugConnected, ReportMoney } from "tabler-icons-react";
import MyLineChart from "./MyLineChart";
import MyPieChart from "./MyPieChart";

function AdminBody() {
  return (
    <>
      <Space h="md" />
      <h1>Dashboard</h1>
      <Space h="md" />

      {/* Three Cards */}
      <Grid>
        <Grid.Col span={4}>
          <Card>
            <Group position="apart">
              <div>
                <Text color="gray" size="xs">
                  Money Saved
                </Text>
                <Text weight={700} size="xl">
                  $2,400
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
                  Threats Averted
                </Text>
                <Text weight={700} size="xl">
                  420
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
                  Active Connections
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
      <Grid>
        <Grid.Col span={5}>
          <MyPieChart />
        </Grid.Col>
        <Grid.Col span={7}>
          <MyLineChart />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AdminBody;
