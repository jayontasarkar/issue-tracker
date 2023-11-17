'use client';

import ErrorMessage from '@/components/shared/ErrorMessage';
import Spinner from '@/components/shared/Spinner';
import { issueSchema } from '@/libs/validation/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { z } from 'zod';

type TIssueForm = z.infer<typeof issueSchema>;

type Props = {
  issue?: Issue;
};

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TIssueForm>({
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
    },
    resolver: zodResolver(issueSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = handleSubmit(async (data: TCreateIssueInput) => {
    setIsSubmitting(true);
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues/list');
      router.refresh();
    } catch (error: any) {
      setError(error?.message);
    }
    setIsSubmitting(false);
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
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
            <SimpleMdeReact placeholder="Issue Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button
          size="3"
          className="cursor-pointer"
          radius="full"
          disabled={isSubmitting}
        >
          {issue ? 'Update Issue' : 'Submit New Issue'}
          {` `}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
