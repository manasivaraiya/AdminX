import { AppShell, Navbar, Header } from "@mantine/core";
import CustomNavbar from "../Navbar";
import AdminBody from "./Body";

function AdminHome() {
  return (
    <AppShell
      padding="md"
      // navbar={
      //   <Navbar width={{ base: 200 }} height={500} p="xs">
      //     <h1>Hmm</h1>
      //   </Navbar>
      // }
      header={
        <CustomNavbar />
        // <Header height={60} p="xs">
        //   {/* Header content */}
        //   <h1>Hmm</h1>
        // </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <AdminBody />
    </AppShell>
  );
}

export default AdminHome;
