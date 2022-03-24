import { Button } from "@mantine/core";
import { Plus, Trash } from "tabler-icons-react";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/Navbar";
import styles from "../../styles/client/client.module.css";
import { firestore } from "../../utils/firebase";
import Link from "next/link";

export default function authorized_apps() {
  const [apps, setApps] = useState([]);

  useEffect(onMounted, []);

  async function onMounted() {
    const docSnapshots = await firestore.collection("authorized_apps").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());
    if (docs.length > 0) setApps(docs);
  }

  async function removeApp(id) {
    try {
      const docSnapshot = await firestore
        .collection("authorized_apps")
        .where("id", "==", id);
      docSnapshot.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });

      onMounted();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={styles.main_wrapper}>
      <ResponsiveAppBar />
      <div className={styles.container} style={{ paddingBottom: "3em" }}>
        <h1>Authorized Apps</h1>

        <div>
          {apps.length > 0 ? (
            apps.map((app) => (
              <div key={app.id}>
                <h3 style={{margin: '0.5em 0'}}>{app.name}</h3>
                <p style={{margin: '0.5em 0'}}>{app.hash}</p>
                <Button onClick={() => removeApp(app.id)}>
                  <Trash />
                </Button>
              </div>
            ))
          ) : (
            <p>No authorized apps found</p>
          )}
        </div>

        <div
          style={{
            marginTop: "1em",
          }}
        >
          <Link href="/authorized_apps/add">
            <Button>
              <Plus /> New application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
