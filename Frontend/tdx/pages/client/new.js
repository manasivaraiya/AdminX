import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import {firestore} from '../../utils/firebase'

export default function Demo() {
  // const form = useForm({
  //   initialValues: {
  //     name: '',
  //     url: '',
  //     description: '',
  //     status: '',
  //     lastResponse: '',
  //     termsOfService: false,
  //   },
  // });
<<<<<<< HEAD
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [lastresponse, setLastResponse] = useState('');
=======
  const [name,setName] = useState('');
  const [url,setUrl] = useState('');
  const [id,setId] = useState('');
  const [description,setDescription] = useState('');
  const [status,setStatus] = useState('');
  const [lastresponse,setLastResponse] = useState('');
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b

  const handleOnChange = (e) => {
    setName(e.target.value);
    setUrl(e.target.value);
    setId(e.target.value);
    setDescription(e.target.value);
    setStatus(e.target.value);
    setLastResponse(e.target.value);
  }

<<<<<<< HEAD
  const createUser = () => {
    const userRef = firebase.database().ref("User")
=======
  const createUser = (e) =>{
    e.preventDefault();
    // const userRef = firebase.database().ref("User")
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
    const user = {
      name,
      url,
      id,
      description,
      status,
      lastresponse
    }
    // console.log(user)
    // userRef.push()
    firestore.collection("Users").add(user)
  }

  return (
    // <div>
    //   <form onSubmit={createUser}>
    //     <input label = 'name' placeholder="xyz" onChange={handleOnChange} value = {name}></input>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={createUser}>
        <TextInput
          label="Name"
          placeholder="xyz"
          onChange={handleOnChange}
<<<<<<< HEAD
          value={name}
          {...form.getInputProps('name')}
=======
          value = {name}
          // {...form.getInputProps('name')}
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
        />

        <TextInput
          label="URL"
          placeholder="iu6urdhcg"
          onChange={handleOnChange}
<<<<<<< HEAD
          value={url}
          {...form.getInputProps('url')}
=======
          value = {url}
          // {...form.getInputProps('url')}
        />

        <TextInput
          label="id"
          placeholder="xyz"
          onChange={handleOnChange}
          value = {id}
          // {...form.getInputProps('id')}
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
        />

        <TextInput
          label="Description"
          onChange={handleOnChange}
<<<<<<< HEAD
          value={description}
          {...form.getInputProps('description')}
=======
          value = {description}
          // {...form.getInputProps('description')}
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
        />

        <TextInput
          label="Status"
          placeholder="Active"
          onChange={handleOnChange}
<<<<<<< HEAD
          value={status}
          {...form.getInputProps('status')}
=======
          value = {status}
          // {...form.getInputProps('status')}
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
        />

        <TextInput
          label="Last Response"
          placeholder="24/12/21 - 09:30"
          onChange={handleOnChange}
<<<<<<< HEAD
          value={lastresponse}
          {...form.getInputProps('lastResponse')}
=======
          value = {lastresponse}
          // {...form.getInputProps('lastResponse')}
>>>>>>> 072f8a0c7670120422acab9b97485c7cb879eb5b
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}