import { runMiddleware } from '@/config/cors';
import { COMMON_API_RESPONSES } from '@/constants/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyCaptcha(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ error: 'No token provided' });
  }

  const secretKey = process.env.GOOGLE_RE_CAPTCHA_SECRET;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    await runMiddleware(req, res);
    const response = await fetch(verificationUrl, {
      method: 'POST',
    });
    const data = await response.json();

    if (data.success) {
      res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({ success: true });
    } else {
      res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ success: false, error: data['error-codes'] });
    }
  } catch (error) {
    res
      .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
      .json({ error: 'Failed to verify reCAPTCHA' });
  }
};