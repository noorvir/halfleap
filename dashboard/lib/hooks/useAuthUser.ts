import { useSession } from '@supabase/auth-helpers-react';

export default function useAuthUser() {
  return useSession().user;
}
