'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" size="3" />
      </TextField.Root>
      <TextArea placeholder="Issue Description" size="3" />
      <Button size="3">Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
