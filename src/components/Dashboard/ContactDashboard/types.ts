export type ContactMessageStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
};

