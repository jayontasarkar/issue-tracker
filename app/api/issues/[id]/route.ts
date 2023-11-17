import { issueSchema } from "@/libs/validation/issueSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type TParams = {
  params: {
    id: string;
  }
}

export async function PATCH(request: NextRequest, { params }: TParams) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id
    }
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: TParams) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: +issue.id
    }
  })

  return NextResponse.json({});
}