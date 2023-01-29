import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { HALFLEAP_API_URL } from 'lib/constants';
import { post } from 'lib/fetch';
import { HalfleapErrorResponse } from 'lib/types';

export type AccountCreateVars = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type AccountCreateData = Awaited<ReturnType<typeof createAccount>>;

async function createAccount({
  email,
  password,
  firstName,
  lastName,
}: AccountCreateVars) {
  const body = JSON.stringify({
    email,
    secret: password,
    firstName,
    lastName,
  });

  const res = await post(`${HALFLEAP_API_URL}/genesis`, body, {
    headers: { Authorization: 'Bearer ${token}' },
  });

  if (res.error) {
    throw new Error(res.error.message);
  }
  return res;
}

export default function useCreateAccountMutation(
  options?: Omit<
    UseMutationOptions<AccountCreateData, unknown, AccountCreateVars>,
    'mutationFn'
  >
) {
  return useMutation<AccountCreateData, HalfleapErrorResponse, AccountCreateVars>(
    ['accountCreate'],
    createAccount,
    { ...options }
  );
}
