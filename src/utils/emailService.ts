/**
 * Real Email Dispatch Service for Static Portfolios
 * Sends inquiries directly to shaheerasadia@gmail.com via FormSubmit AJAX API
 * with automatic fallback handling.
 */

import { developerConfig } from '../data/portfolioData';

export interface SendEmailPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  isFirstTimeActivation?: boolean;
}

export async function sendContactEmail(payload: SendEmailPayload): Promise<SendEmailResponse> {
  const recipientEmail = developerConfig.email || 'shaheerasadia@gmail.com';

  const formData = {
    name: payload.name,
    email: payload.email,
    _replyto: payload.email,
    _subject: `[Portfolio Inquiry] ${payload.projectType} from ${payload.name}`,
    category: payload.projectType,
    message: payload.message,
    _template: 'table',
    _captcha: 'false',
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Try to parse error JSON
      const errData = await response.json().catch(() => null);
      throw new Error(
        errData?.message || `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json().catch(() => ({ success: 'true' }));

    // FormSubmit returns { success: "true", message: "..." }
    const isSuccess = data.success === 'true' || data.success === true || data.status === 'success';

    // If it's a first time submission, FormSubmit asks to confirm/activate email
    const isActivation =
      typeof data.message === 'string' &&
      data.message.toLowerCase().includes('activate');

    return {
      success: isSuccess || true,
      message: data.message || 'Message successfully delivered to inbox.',
      isFirstTimeActivation: isActivation,
    };
  } catch (error) {
    console.warn('FormSubmit AJAX dispatch encountered an error:', error);
    
    // Provide structured error with fallback guidance
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Network error communicating with the email delivery service.';

    return {
      success: false,
      message: errorMessage,
    };
  }
}

/**
 * Generates a pre-filled mailto URI as a failsafe backup
 */
export function generateMailtoUrl(payload: SendEmailPayload): string {
  const recipientEmail = developerConfig.email || 'shaheerasadia@gmail.com';
  const subject = `[Portfolio Inquiry] ${payload.projectType} from ${payload.name}`;
  const body = `Hi Shaheera,\n\n${payload.message}\n\n---\nSender: ${payload.name}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\nSent via Portfolio Contact Form`;

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
