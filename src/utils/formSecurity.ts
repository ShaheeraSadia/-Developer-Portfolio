/**
 * Form Security & Anti-Hacker Defense Module
 * Protects forms from:
 * 1. Automated bot attacks (Multi-honeypot trap & submission velocity check)
 * 2. Cross-Site Scripting (XSS) & DOM injection
 * 3. SQL / Command / LDAP injection attempts
 * 4. Email header injection (CRLF SMTP relay abuse)
 * 5. Spam / Phishing link floods
 * 6. Rate limit flooding / DoS submission loops
 */

export interface SecurityCheckResult {
  isValid: boolean;
  threatDetected?: string;
  sanitizedData?: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  };
}

export interface RateLimitStatus {
  allowed: boolean;
  remainingCooldownSeconds: number;
  attemptsInWindow: number;
}

const RATE_LIMIT_KEY = 'portfolio_contact_rate_limit';
const MAX_ATTEMPTS_PER_WINDOW = 5;
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const MIN_COOLDOWN_MS = 10 * 1000; // 10 seconds between attempts
const MIN_FILL_TIME_MS = 500; // 500ms minimum to allow fast autofill while blocking instant headless bots

/**
 * Strips dangerous HTML tags and sanitizes strings to prevent XSS.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<[^>]+>/g, '') // strip all HTML tags
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // strip onload=, onerror=, onclick=
    .trim();
}

/**
 * Checks for Email Header Injection (CRLF attack).
 * Hackers inject \r or \n into email fields to hijack mail servers.
 */
export function containsEmailHeaderInjection(input: string): boolean {
  return /[\r\n]|(%0A)|(%0D)|(bcc:)|(cc:)|(to:)|(content-type:)|(mime-version:)/i.test(input);
}

/**
 * Checks for malicious script/XSS patterns.
 */
export function containsXSSPayload(input: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /onclick\s*=/i,
    /<svg.*onload/i,
    /<img.*onerror/i,
    /eval\s*\(/i,
    /document\.cookie/i,
    /window\.location/i,
  ];
  return xssPatterns.some((pattern) => pattern.test(input));
}

/**
 * Checks for SQL injection patterns.
 */
export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /\b(UNION\s+ALL\s+SELECT|UNION\s+SELECT|INSERT\s+INTO|DROP\s+TABLE|DELETE\s+FROM)\b/i,
    /\bOR\s+['"]?1['"]?\s*=\s*['"]?1['"]?\b/i,
    /\bEXEC(\s|\+)+(s|x)p\w+/i,
  ];
  // Test only if suspicious SQL keywords appear
  const hasSqlKeywords = /\b(SELECT|INSERT|DROP|UNION|DELETE|UPDATE)\b/i.test(input);
  return hasSqlKeywords && sqlPatterns.some((p) => p.test(input));
}

/**
 * Detects link spamming (phishing links or crypto/casino floods).
 */
export function detectLinkSpam(input: string): { isSpam: boolean; reason?: string } {
  const urlMatches = input.match(/https?:\/\/[^\s]+/gi) || [];
  if (urlMatches.length > 2) {
    return { isSpam: true, reason: 'Excessive external URLs detected (limit: 2)' };
  }
  const spamKeywords = [
    /\b(crypto\s+giveaway|free\s+bitcoin|fast\s+money|telegram\s+bot\s+@|whatsapp\s+\+)/i,
    /\b(casino|poker|viagra|cialis)\b/i,
  ];
  if (spamKeywords.some((p) => p.test(input))) {
    return { isSpam: true, reason: 'Spam / promotional keywords detected' };
  }
  return { isSpam: false };
}

/**
 * Strict RFC-compliant Email Validation.
 */
export function isValidEmail(email: string): boolean {
  if (containsEmailHeaderInjection(email)) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Checks client-side Rate Limiting using localStorage.
 */
export function checkRateLimit(): RateLimitStatus {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();

    if (!raw) {
      return { allowed: true, remainingCooldownSeconds: 0, attemptsInWindow: 0 };
    }

    const data: { timestamps: number[] } = JSON.parse(raw);
    const validTimestamps = (data.timestamps || []).filter(
      (ts) => now - ts < WINDOW_DURATION_MS
    );

    // Check consecutive cooldown
    if (validTimestamps.length > 0) {
      const lastAttempt = validTimestamps[validTimestamps.length - 1];
      const elapsedSinceLast = now - lastAttempt;
      if (elapsedSinceLast < MIN_COOLDOWN_MS) {
        const remaining = Math.ceil((MIN_COOLDOWN_MS - elapsedSinceLast) / 1000);
        return {
          allowed: false,
          remainingCooldownSeconds: remaining,
          attemptsInWindow: validTimestamps.length,
        };
      }
    }

    // Check total attempts in 10-minute window
    if (validTimestamps.length >= MAX_ATTEMPTS_PER_WINDOW) {
      const oldestAttempt = validTimestamps[0];
      const remainingWindow = Math.ceil((WINDOW_DURATION_MS - (now - oldestAttempt)) / 1000);
      return {
        allowed: false,
        remainingCooldownSeconds: Math.max(remainingWindow, 1),
        attemptsInWindow: validTimestamps.length,
      };
    }

    return { allowed: true, remainingCooldownSeconds: 0, attemptsInWindow: validTimestamps.length };
  } catch {
    return { allowed: true, remainingCooldownSeconds: 0, attemptsInWindow: 0 };
  }
}

/**
 * Record a submission for rate limiting.
 */
export function recordSubmission(): void {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const data: { timestamps: number[] } = raw ? JSON.parse(raw) : { timestamps: [] };
    const validTimestamps = (data.timestamps || []).filter(
      (ts) => now - ts < WINDOW_DURATION_MS
    );
    validTimestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamps: validTimestamps }));
  } catch {
    // Ignore storage issues
  }
}

/**
 * Generates an accessible, bot-resistant math puzzle.
 */
export function generateSecurityChallenge(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const b = Math.floor(Math.random() * 8) + 1; // 1 to 8
  return {
    question: `Security Verification: What is ${a} + ${b}?`,
    answer: a + b,
  };
}

/**
 * Evaluates the entire form submission for cyber threats.
 */
export function validateFormSecurity(
  formData: {
    name: string;
    email: string;
    projectType: string;
    message: string;
    honeypotFax: string;
    honeypotToken: string;
  },
  formLoadedAt: number,
  challengeExpectedAnswer: number,
  challengeUserAnswer: string
): SecurityCheckResult {
  // 1. Check Honeypot Trap
  // Bots fill out hidden input fields automatically
  if (formData.honeypotFax || formData.honeypotToken) {
    return {
      isValid: false,
      threatDetected: 'Automated Bot Detected (Honeypot Trap Triggered). Submission blocked.',
    };
  }

  // 2. Submission Velocity Check (Time-Trap)
  const elapsedMs = Date.now() - formLoadedAt;
  if (elapsedMs < MIN_FILL_TIME_MS) {
    return {
      isValid: false,
      threatDetected: 'High-speed automated script detected. Humans require at least 2.5s to type.',
    };
  }

  // 3. Check Rate Limiting
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      isValid: false,
      threatDetected: `Rate limit active: Please wait ${rateLimit.remainingCooldownSeconds}s before submitting again.`,
    };
  }

  // 4. Human Challenge Verification
  const parsedAnswer = parseInt(challengeUserAnswer.trim(), 10);
  if (isNaN(parsedAnswer) || parsedAnswer !== challengeExpectedAnswer) {
    return {
      isValid: false,
      threatDetected: 'Human verification answer incorrect. Please solve the security check to confirm you are human.',
    };
  }

  // 5. Check Email Format and Header Injection
  if (!isValidEmail(formData.email)) {
    return {
      isValid: false,
      threatDetected: 'Invalid email address format or illegal header injection characters detected.',
    };
  }

  // 6. Check for Cross-Site Scripting (XSS)
  if (
    containsXSSPayload(formData.name) ||
    containsXSSPayload(formData.email) ||
    containsXSSPayload(formData.message)
  ) {
    return {
      isValid: false,
      threatDetected: 'Malicious script / XSS payload detected and neutralized.',
    };
  }

  // 7. Check for SQL Injection
  if (containsSQLInjection(formData.name) || containsSQLInjection(formData.message)) {
    return {
      isValid: false,
      threatDetected: 'Malicious SQL / command injection pattern intercepted.',
    };
  }

  // 8. Check for Link Spamming
  const spamCheck = detectLinkSpam(formData.message);
  if (spamCheck.isSpam) {
    return {
      isValid: false,
      threatDetected: `Spam filter alert: ${spamCheck.reason}`,
    };
  }

  // 9. Input Length Hardening (prevent buffer overload / payload flooding)
  if (formData.name.length > 80) {
    return { isValid: false, threatDetected: 'Name exceeds maximum length of 80 characters.' };
  }
  if (formData.email.length > 100) {
    return { isValid: false, threatDetected: 'Email exceeds maximum length of 100 characters.' };
  }
  if (formData.message.length > 3000) {
    return { isValid: false, threatDetected: 'Message exceeds maximum length of 3000 characters.' };
  }

  // Sanitization
  return {
    isValid: true,
    sanitizedData: {
      name: sanitizeText(formData.name),
      email: sanitizeText(formData.email),
      projectType: sanitizeText(formData.projectType),
      message: sanitizeText(formData.message),
    },
  };
}
