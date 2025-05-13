
export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  role: 'teacher' | 'admin' | 'student';
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type Teacher = {
  id: string;
  user_id?: string | null;
  specialization: string;
  department: string;
  years_of_experience?: number;
  schedule?: string | null;
  total_classes?: number;
  education?: string | null;
  address?: string | null;
  date_of_birth?: string | null;
  join_date?: string | null;
  created_at: string;
  updated_at: string;
};

export type Student = {
  id: string;
  user_id?: string | null;
  grade: string;
  parent_name: string;
  parent_phone: string;
  date_of_birth?: string | null;
  address?: string | null;
  enrollment_date?: string | null;
  gender?: string | null;
  attendance_rate?: number;
  overall_grade?: string | null;
  created_at: string;
  updated_at: string;
};

export type Class = {
  id: string;
  name: string;
  description?: string | null;
  teacher_id?: string | null;
  schedule?: string | null;
  room_number?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  days?: string[] | null;
  created_at: string;
  updated_at: string;
};

export type Attendance = {
  id: string;
  student_id: string;
  class_id: string;
  date: string;
  status: string;
  time?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

export type Grade = {
  id: string;
  student_id: string;
  class_id: string;
  subject: string;
  grade: number;
  date: string;
  notes?: string | null;
  status?: string | null;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at: string;
  read: boolean;
  created_at: string;
};
