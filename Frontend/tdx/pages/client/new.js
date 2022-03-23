import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Demo() {
  const form = useForm({
    initialValues: {
      name: '',
      url: '',
      description: '',
      status: '',
      lastResponse: '',
      termsOfService: false,
    },

  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Name"
          placeholder="xyz"
          {...form.getInputProps('name')}
        />

        <TextInput
          label="URL"
          placeholder="iu6urdhcg"
          {...form.getInputProps('url')}
        />

        <TextInput
          label="Description"
        //   placeholder="iu6urdhcg"
          {...form.getInputProps('description')}
        />

        <TextInput
          label="Status"
          placeholder="Active"
          {...form.getInputProps('status')}
        />

        <TextInput
          label="Last Response"
          placeholder="24/12/21 - 09:30"
          {...form.getInputProps('lastResponse')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}