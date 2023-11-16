'use client';

import { createIssueSchema } from '@/libs/validation/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
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
        {errors.title?.message && (
          <Text color="red">{errors.title?.message}</Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue Description" {...field} />
          )}
        />
        {errors.description?.message && (
          <Text color="red" as="p">
            {errors.description?.message}
          </Text>
        )}

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
