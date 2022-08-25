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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            // display: "flex",
            // gridAutoFlow: "row",
            // flexWrap: "wrap",
            // justifyContent: "flex-start",
          }}
        >

          {apps.length > 0 ? (
            apps.map((app) => (
              <div
                className={styles.card_wrapper}
                key={app.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1em",
                  padding: "1em",
                  border: "2px solid #eeeeee",
                  minWidth: "500px",
                  
                }}
                
              >
                <div className="card-info">
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "0px",
                    }}
                  >
                    {app.name}
                  </h1>
                  <p
                    style={{
                      color: "#555555",
                      fontSize: "0.8rem",
                      marginTop: "5px",
                    }}
                  >
                    <b>Version</b>: {app.version}
                  </p>
                  <p
                    style={{
                      color: "#808080",
                      fontSize: "0.8rem",
                      marginTop: "5px",
                    }}
                  >
                    <b>Hash</b>: {app.hash}
                  </p>
                </div>
                
                <div
                  className={styles.card_button}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Trash className={styles.trash}
                    color="red"
                    variant="outline"
                    onClick={() => removeApp(app.id)}
                    size={30}
                  />
                </div>
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
            <Button
            style={{
              marginTop: "1em",
              backgroundColor: "#28315C",
            }}>
              <Plus /> New application
            </Button>
          </Link>
        </div>
      </div>
    </div>

  );
}
