import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import firebase from '../../utils/firebase'

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
  const [name,setName] = useState('');
  const [url,setUrl] = useState('');
  const [description,setDescription] = useState('');
  const [status,setStatus] = useState('');
  const [lastresponse,setLastResponse] = useState('');

  const handleOnChange = (e) =>{
    setName(e.target.value);
    setUrl(e.target.value);
    setDescription(e.target.value);
    setStatus(e.target.value);
    setLastResponse(e.target.value);
  }

  const createUser = () =>{
    const userRef = firebase.database().ref("User")
    const user = {
      name,
      url,
      description,
      status,
      lastresponse
    }
    userRef.push()
  }

  return (
    // <div>
    //   <form>
    //     <input label = 'name' placeholder="xyz" onChange={handleOnChange} value = {name}></input>
    //     <button type="submit" onClick={createUser}>Submit</button>
    //   </form>
    // </div>
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Name"
          placeholder="xyz"
          onChange={handleOnChange}
          value = {name}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="URL"
          placeholder="iu6urdhcg"
          onChange={handleOnChange}
          value = {url}
          {...form.getInputProps('url')}
        />

        <TextInput
          label="Description"
        //   placeholder="iu6urdhcg"
        onChange={handleOnChange}
          value = {description}
          {...form.getInputProps('description')}
        />

        <TextInput
          label="Status"
          placeholder="Active"
          onChange={handleOnChange}
          value = {status}
          {...form.getInputProps('status')}
        />

        <TextInput
          label="Last Response"
          placeholder="24/12/21 - 09:30"
          onChange={handleOnChange}
          value = {lastresponse}
          {...form.getInputProps('lastResponse')}
        />

        <Group position="right" mt="md">
          <Button type="submit" onClick={createUser}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}