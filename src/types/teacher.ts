
import { Teacher } from "@/types/database";

export interface TeacherWithProfile extends Teacher {
  profile?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
}
