enum IIssueStatus {
  OPEN,
  IN_PROGRESS,
  CLOSED,
}

type IUpdateIssueInput = {
  title?: string;
  description?: string;
  status?: IIssueStatus;
}

type TCreateIssueInput = {
  title: string;
  description: string;
  status?: IIssueStatus;
};

type IIssue = TCreateIssueInput & { id?: number; createdAt?: Date | string };