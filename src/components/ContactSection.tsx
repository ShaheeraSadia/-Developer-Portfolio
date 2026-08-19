import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  Twitter, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';
import { useSEO } from '../hooks/useSEO';
import { sectionSEOConfig } from '../data/seoConfig';

export const ContactSection: React.FC = () => {
  useSEO(sectionSEOConfig.contact);

  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Frontend Web App (React / SPA)',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerConfig.email);
    setCopied(true);
    showToast(`Copied ${developerConfig.email} to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Message transmitted successfully!');
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Contact &amp; Collaboration
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Available for full-time engineering roles, frontend contract work, and client-side architecture consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#f8fafc]">
                  Let's Build Together
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] font-sans leading-relaxed">
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
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-sm">
              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-[#22c55e] border border-emerald-500/20 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#f8fafc]">Message Sent Successfully</h3>
                    <p className="text-sm text-[#94a3b8] max-w-sm mx-auto font-sans">
                      Thank you for reaching out, {formState.name}. I'll review your inquiry and reply to {formState.email} within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormState({
                        name: '',
                        email: '',
                        projectType: 'Frontend Web App (React / SPA)',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2 rounded-xl bg-[#0a0d12] hover:bg-[#1e293b] border border-[#1e293b] hover:border-slate-600 text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#94a3b8] block">
                        Your Name <span className="text-[#3b82f6]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#94a3b8] block">
                        Your Email <span className="text-[#3b82f6]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#94a3b8] block">
                      Inquiry Category
                    </label>
                    <select
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
                    <label className="text-xs font-mono text-[#94a3b8] block">
                      Message <span className="text-[#3b82f6]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Shaheera, I'd like to discuss a project..."
                      className="w-full bg-[#0a0d12] border border-[#1e293b] focus:border-[#3b82f6] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] placeholder-slate-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] active:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="text-xs font-mono">Transmitting message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
