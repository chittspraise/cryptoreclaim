import { Suspense } from 'react';
import { ResetPasswordFormClient } from './ResetPasswordFormClient';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormClient />
    </Suspense>
  );
}