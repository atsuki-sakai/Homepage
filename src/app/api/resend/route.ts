import React from 'react';
import { Resend } from 'resend';
import { EmailContact } from '@/components/template/email_contact';
import { contactSchema } from '@/lib/schemats';
import { render } from '@react-email/render'
import { z } from 'zod';
import { convertContactTopics } from '@/lib/utils';


if(!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('📧 API Route: Starting POST request');
    
    const body = await request.json();
    console.log('📧 API Route: Body parsed successfully');
    
    // Zodバリデーション
    const validatedBody = contactSchema.parse(body);
    const { email, category = '一般的なお問い合わせ' } = validatedBody;

    const html = await render(
      React.createElement(EmailContact, validatedBody)
    ) as string;

    // Resendでメール送信
    const { data, error } = await resend.emails.send({
        from: 'noreply@kondax.com',
        to: ['kondax.sakai@gmail.com', email],
        subject: `[${convertContactTopics(category)}] お問い合わせを受け付けました。`,
        html
    });
    console.log('📧 API Route: Resend response received', { data, error });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ 
        success: false, 
        error: 'メール送信に失敗しました。' 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました。ありがとうございます。',
      data 
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        success: false,
        error: '入力内容に不備があります。',
        details: error.errors
      }, { status: 400 });
    }

    console.error('API error:', error);
    return Response.json({ 
      success: false,
      error: 'サーバーエラーが発生しました。' 
    }, { status: 500 });
  }
}