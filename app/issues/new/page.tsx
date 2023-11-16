'use client';

import ErrorMessage from '@/components/shared/ErrorMessage';
import { createIssueSchema } from '@/libs/validation/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type TIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const createNewIssue = async (data: TCreateIssueInput) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error: any) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(createNewIssue)}>
        <TextField.Root>
          <TextField.Input
            placeholder="Issue Title"
            size="3"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button
          size="3"
          className="cursor-pointer"
          radius="full"
          disabled={isSubmitting}
        >
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
