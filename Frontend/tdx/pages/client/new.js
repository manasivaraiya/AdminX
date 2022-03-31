import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { firestore } from '../../utils/firebase';
import { useRouter } from "next/router";
// import { styles } from "../../styles/clients/client.module.css";
import { styles } from "../../styles/client/clientadd.module.css";
import ResponsiveAppBar from "../../components/Navbar"


export default function Demo() {
  const router = useRouter();

  // const form = useForm({
  //   initialValues: {`
  //     name: '',
  //     url: '',
  //     description: '',
  //     status: '',
  //     lastResponse: '',
  //     termsOfService: false,
  //   },
  // });
  // const [name, setName] = useState('');
  // const [url, setUrl] = useState('');
  // const [id, setId] = useState('');
  // const [description, setDescription] = useState('');
  // const [status, setStatus] = useState('');
  // const [lastresponse, setLastResponse] = useState('');

  async function onFormSubmit(e) {
    e.preventDefault();
    // console.log(e);
    try {
      const data = {
        name: e.target[0].value,
        mac_add: e.target[1].value,
        url: e.target[2].value,
        description: e.target[3].value,
      };

      await firestore.collection("Users").add(data);
      router.push("/home");
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <div className='main_wrapper'>
      <ResponsiveAppBar />
      <div style={{ paddingBottom: "3em", marginTop: "60px !important", width: "60%", margin: "auto" }}>
        <h1>Add a new User</h1>
        <form style={{ marginTop: "20px" }} onSubmit={onFormSubmit}>
          <TextInput
            label="Name"
            placeholder="User Name"
            name="name"
            required
          ></TextInput>
          <br />
          <TextInput
            label="MAC Address"
            placeholder="MAC Address"
            name="mac address"
            required
          ></TextInput>
          <br />
          <TextInput
            label="URL"
            placeholder="URL "
            name="url"
            required
          ></TextInput>
          <br />

          <TextInput
            label="Description"
            placeholder="User  Description"
            name="description"
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