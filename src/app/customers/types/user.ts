export type User = {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  points_balance: number;
  status: boolean;
  tenant_id: string;
  birth_date?: string | null; // ISO 8601 date (yyyy-mm-dd)
  gender?: "male" | "female" | "other" | null;
  notes?: string | null;
};
