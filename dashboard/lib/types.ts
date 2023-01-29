export { type User as AuthUser } from '@supabase/supabase-js';

export type HalfleapErrorResponse = {
  code: number;
  message: string;
};

export type HalfleapResponse<T> = T & HalfleapErrorResponse;
