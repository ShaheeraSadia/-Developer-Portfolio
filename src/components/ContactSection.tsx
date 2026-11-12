import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  CheckCircle2,
  Sparkles,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';
import { useSEO } from '../hooks/useSEO';
import { XIcon } from './icons/XIcon';
import { sectionSEOConfig } from '../data/seoConfig';
import { 
  validateFormSecurity, 
  generateSecurityChallenge, 
  checkRateLimit, 
  recordSubmission 
} from '../utils/formSecurity';
import { sendContactEmail, generateMailtoUrl } from '../utils/emailService';

export const ContactSection: React.FC = () => {
  useSEO(sectionSEOConfig.contact);

  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Frontend Web App (React / SPA)',
    message: '',
  });

  // Anti-Hacker & Anti-Bot Defense States
  const [honeypotFax, setHoneypotFax] = useState('');
  const [honeypotToken, setHoneypotToken] = useState('');
  const [securityChallenge, setSecurityChallenge] = useState(() => generateSecurityChallenge());
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [threatAlert, setThreatAlert] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);
  const [sanitizedData, setSanitizedData] = useState<{
    name: string;
    email: string;
    projectType: string;
    message: string;
  } | null>(null);

  // Velocity / time-trap: tracks when form mounted
  const formLoadedAtRef = useRef<number>(Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [firstTimeActivationNotice, setFirstTimeActivationNotice] = useState(false);
  const [dispatchError, setDispatchError] = useState<string | null>(null);

  // Check rate limit on mount and run cooldown ticker
  useEffect(() => {
    const rateStatus = checkRateLimit();
    if (!rateStatus.allowed && rateStatus.remainingCooldownSeconds > 0) {
      setCooldownSeconds(rateStatus.remainingCooldownSeconds);
    }
  }, []);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setThreatAlert(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  const handleRefreshChallenge = () => {
    setSecurityChallenge(generateSecurityChallenge());
    setChallengeAnswer('');
    setThreatAlert(null);
    showToast('New human verification challenge generated', 'info');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerConfig.email);
    setCopied(true);
    showToast(`Copied ${developerConfig.email} to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopySanitizedMessage = () => {
    if (!sanitizedData) return;
    const textToCopy = `From: ${sanitizedData.name} (${sanitizedData.email})\nCategory: ${sanitizedData.projectType}\n\n${sanitizedData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedMessage(true);
    showToast('Copied sanitized message to clipboard!');
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setThreatAlert(null);
    setDispatchError(null);

    // 1. Basic Required Check
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // 2. Comprehensive Anti-Hacker & Bot Validation
    const securityCheck = validateFormSecurity(
      {
        name: formState.name,
        email: formState.email,
        projectType: formState.projectType,
        message: formState.message,
        honeypotFax,
        honeypotToken,
      },
      formLoadedAtRef.current,
      securityChallenge.answer,
      challengeAnswer
    );

    if (!securityCheck.isValid) {
      const threatMsg = securityCheck.threatDetected || 'Security validation failed.';
      setThreatAlert(threatMsg);
      showToast(threatMsg, 'error');

      // If rate limited, trigger countdown
      const rateStatus = checkRateLimit();
      if (!rateStatus.allowed && rateStatus.remainingCooldownSeconds > 0) {
        setCooldownSeconds(rateStatus.remainingCooldownSeconds);
      }

      // If challenge answer was incorrect, generate fresh challenge
      if (threatMsg.includes('verification answer incorrect')) {
        setSecurityChallenge(generateSecurityChallenge());
        setChallengeAnswer('');
      }
      return;
    }

    setIsSubmitting(true);

    // Record submission into rate limiting ledger
    recordSubmission();

    // Store cleaned sanitized data
    const cleanData = securityCheck.sanitizedData || {
      name: formState.name.trim(),
      email: formState.email.trim(),
      projectType: formState.projectType,
      message: formState.message.trim(),
    };
    setSanitizedData(cleanData);

    try {
      // Real API transmission to recipient inbox
      const result = await sendContactEmail(cleanData);

      setIsSubmitting(false);

      if (result.success) {
        setIsSent(true);
        if (result.isFirstTimeActivation) {
          setFirstTimeActivationNotice(true);
        }
        showToast('Inquiry delivered to inbox successfully!', 'success');
      } else {
        // Fallback handled smoothly
        setDispatchError(result.message || 'Direct mail service error.');
        showToast('Email service notice: you can also send via your email client.', 'warning');
      }
    } catch (err) {
      setIsSubmitting(false);
      const errMsg = err instanceof Error ? err.message : 'Transmission failed';
      setDispatchError(errMsg);
      showToast('Network issue. Click below to send via your email client.', 'error');
    }
  };

  const handleResetForm = () => {
    setIsSent(false);
    setFirstTimeActivationNotice(false);
    setDispatchError(null);
    setFormState({
      name: '',
      email: '',
      projectType: 'Frontend Web App (React / SPA)',
      message: '',
    });
    setHoneypotFax('');
    setHoneypotToken('');
    setChallengeAnswer('');
    setThreatAlert(null);
    setSecurityChallenge(generateSecurityChallenge());
    formLoadedAtRef.current = Date.now();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1e293b]">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Contact &amp; Collaboration
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-sans">
            Available for full-time engineering roles, frontend contract work, and client-side architecture consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-7 sm:p-9 space-y-6 shadow-lg shadow-black/20">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  Let's Build Together
                </h3>
                <p className="text-xs sm:text-sm text-white font-sans leading-relaxed">
                  Whether you have an upcoming project, a full-time role opening, or want to discuss frontend performance, feel free to send a message.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-3 pt-2">
                <div className="bg-[#0a0d12] p-4 rounded-xl border border-[#1e293b] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#3b82f6] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block">Direct Email</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#f8fafc]">{developerConfig.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b] hover:border-slate-600 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="bg-[#0a0d12] p-4 rounded-xl border border-[#1e293b] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#3b82f6] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Response SLA</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#f8fafc]">Within 24 business hours</span>
                  </div>
                </div>

                <div className="bg-[#0a0d12] p-4 rounded-xl border border-[#1e293b] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#3b82f6] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Location &amp; Timezone</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#f8fafc]">{developerConfig.location} ({developerConfig.timezone})</span>
                  </div>
                </div>
              </div>

              {/* Direct Mail Client Quick Action */}
              <div className="p-3 bg-[#0a0d12] border border-blue-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Prefer Native Email?</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  You can click below to launch your system's default email client (Gmail, Apple Mail, Outlook).
                </p>
                <a
                  href={`mailto:${developerConfig.email}?subject=${encodeURIComponent('[Inquiry] Project Discussion / Full-Time Role')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
                >
                  <span>Launch Mail App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-[#1e293b] flex items-center gap-2">
                <a
                  href={developerConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={developerConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={developerConfig.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] flex items-center justify-center gap-2 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-sm">
              {isSent ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-[#22c55e] border border-emerald-500/20 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Transmitted to {developerConfig.email}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#f8fafc]">Message Delivered to Inbox</h3>
                    <p className="text-sm text-[#94a3b8] max-w-md mx-auto font-sans leading-relaxed">
                      Thank you for reaching out, <strong className="text-white">{sanitizedData?.name || formState.name}</strong>. Your inquiry has been routed directly to <span className="text-blue-400 font-mono">{developerConfig.email}</span> with a reply address set to <span className="text-emerald-400 font-mono">{sanitizedData?.email || formState.email}</span>.
                    </p>
                  </div>

                  {/* One-Time Activation Reminder Banner */}
                  {firstTimeActivationNotice && (
                    <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-left text-xs text-amber-200 space-y-1">
                      <div className="flex items-center gap-2 font-semibold text-amber-300">
                        <Info className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>First-Time Email Activation Required</span>
                      </div>
                      <p className="text-amber-200/90 font-sans leading-relaxed pl-6">
                        FormSubmit has sent a one-time activation email to <strong className="text-white">{developerConfig.email}</strong>. Please check your inbox or spam folder and click <em>"Activate Form"</em> to receive all incoming inquiries.
                      </p>
                    </div>
                  )}

                  {/* Quick Action Options */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={generateMailtoUrl(sanitizedData || formState)}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Email Client (Backup)</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySanitizedMessage}
                      className="px-4 py-2.5 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMessage ? 'Copied Message' : 'Copy Message'}</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[#1e293b]/60">
                    <button
                      type="button"
                      id="contact-send-another-btn"
                      onClick={handleResetForm}
                      className="px-5 py-2 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
                    >
                      ← Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Hacker Threat Alert Banner */}
                  {threatAlert && (
                    <div className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-xl flex items-start gap-3 text-xs text-red-200 animate-shake">
                      <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-semibold text-red-300 block">Security Check Notice</span>
                        <p className="text-red-200/90 leading-relaxed font-sans">{threatAlert}</p>
                      </div>
                    </div>
                  )}

                  {/* Dispatch Error Notice with Immediate Mailto Fallback */}
                  {dispatchError && (
                    <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-2 text-xs text-amber-200">
                      <div className="flex items-center gap-2 font-semibold text-amber-300">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Email Transmission Note</span>
                      </div>
                      <p className="text-amber-200/90 leading-relaxed font-sans">
                        {dispatchError} — You can still send your message directly using the button below:
                      </p>
                      <a
                        href={generateMailtoUrl(formState)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 border border-amber-500/40 rounded-lg font-mono text-[11px] transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Default Email App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* Rate Limit Cooldown Notice */}
                  {cooldownSeconds > 0 && (
                    <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-center gap-2.5 text-xs text-amber-200 font-mono">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Anti-Spam Rate Limit: Please wait {cooldownSeconds}s before submitting again.</span>
                    </div>
                  )}

                  {/* Invisible Honeypot Anti-Bot Traps */}
                  {/* Automated bots crawl DOM and fill these fields automatically */}
                  <div
                    aria-hidden="true"
                    className="opacity-0 absolute -top-[9999px] -left-[9999px] w-0 h-0 overflow-hidden pointer-events-none"
                  >
                    <label htmlFor="contact_fax_hp">Leave this field blank if human:</label>
                    <input
                      id="contact_fax_hp"
                      type="text"
                      name="contact_organization_fax_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotFax}
                      onChange={(e) => setHoneypotFax(e.target.value)}
                    />
                    <label htmlFor="contact_token_hp">Verification Token Signature:</label>
                    <input
                      id="contact_token_hp"
                      type="text"
                      name="contact_system_token_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotToken}
                      onChange={(e) => setHoneypotToken(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-input-name" className="text-xs font-mono text-slate-200 font-medium block">
                        Your Name <span className="text-[#3b82f6]">*</span>
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        maxLength={80}
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (threatAlert) setThreatAlert(null);
                        }}
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-400 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-input-email" className="text-xs font-mono text-slate-200 font-medium block">
                        Your Email <span className="text-[#3b82f6]">*</span>
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        maxLength={100}
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (threatAlert) setThreatAlert(null);
                        }}
                        placeholder="alex@company.com"
                        className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-select-category" className="text-xs font-mono text-slate-200 font-medium block">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-select-category"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Frontend Web App (React / SPA)">Frontend Web App (React / SPA)</option>
                      <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                      <option value="Performance & Web Worker Optimization">Performance &amp; Web Worker Optimization</option>
                      <option value="Design System & UI Architecture">Design System &amp; UI Architecture</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-input-message" className="text-xs font-mono text-slate-200 font-medium block">
                        Message <span className="text-[#3b82f6]">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">
                        {formState.message.length}/3000
                      </span>
                    </div>
                    <textarea
                      id="contact-input-message"
                      required
                      rows={4}
                      maxLength={3000}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (threatAlert) setThreatAlert(null);
                      }}
                      placeholder="Hi Shaheera, I'd like to discuss a project..."
                      className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-400 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Interactive Anti-Bot Human Verification Challenge */}
                  <div className="p-3.5 bg-[#0a0d12] border border-blue-500/25 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">Human Verification</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            Anti-Bot
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">
                          {securityChallenge.question}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <input
                        id="contact-security-answer"
                        type="text"
                        inputMode="numeric"
                        required
                        maxLength={4}
                        value={challengeAnswer}
                        onChange={(e) => {
                          setChallengeAnswer(e.target.value);
                          if (threatAlert) setThreatAlert(null);
                        }}
                        placeholder="Answer"
                        className="w-20 px-3 py-1.5 bg-[#0f172a] border border-[#1e293b] focus:border-blue-500 rounded-lg text-xs font-mono text-center text-white placeholder-slate-500 outline-none transition-colors"
                        title="Enter the answer to verify you are a human visitor"
                      />
                      <button
                        type="button"
                        id="refresh-challenge-btn"
                        onClick={handleRefreshChallenge}
                        className="p-2 bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Generate a new security challenge"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting || cooldownSeconds > 0}
                    className="w-full py-3 px-6 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] active:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span className="text-xs font-mono">Delivering message securely...</span>
                      </div>
                    ) : cooldownSeconds > 0 ? (
                      <span className="text-xs font-mono">Cooldown Active ({cooldownSeconds}s)</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Hacker Defense System Status Bar */}
                  <div className="pt-3 border-t border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-medium">Direct Inbox Delivery</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b]">Anti-Bot Honeypot</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b]">XSS Sanitized</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b]">Reply-To Enabled</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b]">RFC Mail Validated</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

