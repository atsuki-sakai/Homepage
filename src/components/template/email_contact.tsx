import * as React from 'react';
import { type ContactSchema } from '@/lib/schemats';

export function EmailContact({ name, email, company, phone, category, message, budget }: ContactSchema) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Thank you for contacting KONDAX.</p>
      <p>We will get back to you as soon as possible.</p>

      <p>Email: {email}</p>
      {company && <p>Company: {company}</p>}
      {phone && <p>Phone: {phone}</p>}
      {category && <p>Category: {category}</p>}
      {budget && <p>Budget: {budget}</p>}

      <p>Message:</p>
      <p>{message}</p>
    </div>
  );
}