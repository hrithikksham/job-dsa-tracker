export type JobStatus =
  | "Applied"
  | "On process"
  | "Rejected"
  | "Accepted";

export interface Job {
  id: string;
  company_name: string;
  role_name: string;
  salary?: string;
  location: string;
  status: JobStatus;
  date_of_apply: string;
  jd_text?: string;
  created_at?: string;
  updated_at?: string;
}