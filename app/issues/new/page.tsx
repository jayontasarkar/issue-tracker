'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>
      <TextArea placeholder="Issue Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;