import { TextInput, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/Navbar";
import styles from "../../styles/client/client.module.css";
import { firestore } from "../../utils/firebase";
import { ArrowLeft } from "tabler-icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function add_authorized_app() {
  const router = useRouter();
  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(e);
    try {
      const data = {
        id: Math.round(Math.random() * 10000),
        name: e.target[0].value,
        hash: e.target[1].value,
        version: e.target[2].value,
      };

      await firestore.collection("authorized_apps").add(data);
      router.push("/authorized_apps");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={styles.main_wrapper}>
      <ResponsiveAppBar />

      <div className={styles.container} style={{ paddingBottom: "3em" }}>
        <Link href="/authorized_apps">
          <Button variant="white" color="gray">
            <ArrowLeft /> Back
          </Button>
        </Link>
        <h1>Add an Authorized App</h1>

        <form onSubmit={onFormSubmit}>
          <TextInput
            label="Application Name"
            placeholder="Application Name"
            name="name"
            required
          ></TextInput>
          <br />
          <TextInput
            label="Application Hash"
            placeholder="Application Name"
            name="hash"
            required
          ></TextInput>
          <br />

          <TextInput
            label="Application Version"
            placeholder="Application Version"
            name="version"
            required
          ></TextInput>
          <br />

          <Button
            type="submit"
            style={{
              marginTop: "1em",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
