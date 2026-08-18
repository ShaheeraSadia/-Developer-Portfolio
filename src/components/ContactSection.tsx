import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, CheckCircle2, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Web & Mobile Application Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerConfig.email);
    setCopied(true);
    showToast(`Copied ${developerConfig.email} to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Message transmitted successfully!', 'success');
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#1f242d] text-white border-b border-[#323946]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#323946]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">06. INITIATE CONTACT</span>
              <span className="text-gray-500">//</span>
              <span>AVAILABILITY RADAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let’s Connect and <span className="text-[#00eeff] text-glow-cyan">Build Something Fast</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md font-sans leading-relaxed">
            Available for front-end engineering, web &amp; mobile application development, and client-side SaaS initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left Column: Direct Connection & Verified Profiles Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl border border-[#323946] bg-[#323946] space-y-5 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00eeff] font-bold block">
                // direct_communication_channel
              </span>

              {/* Direct Email Pill with Copy Button */}
              <div className="p-4 bg-[#1f242d] rounded-xl border border-[#323946] flex items-center justify-between gap-2 group hover:border-[#00eeff]/50 transition-colors">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#00eeff] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-medium text-white truncate">
                    {developerConfig.email}
                  </span>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#323946] border border-[#00eeff]/30 text-[#00eeff] hover:bg-[#00eeff] hover:text-[#1f242d] hover:shadow-[0_0_10px_#00eeff] transition-all shrink-0 cursor-pointer font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'copied' : 'copy'}</span>
                </button>
              </div>

              {/* Status Specs */}
              <div className="space-y-2.5 text-xs font-mono text-gray-300 pt-2 border-t border-[#1f242d]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">current_status:</span>
                  <span className="text-[#00eeff] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse shadow-[0_0_6px_#00eeff]"></span>
                    open_to_work
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">location:</span>
                  <span className="text-white font-medium">{developerConfig.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">response_sla:</span>
                  <span className="text-white font-medium">&lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social Media & Verified Profiles */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[#323946] bg-[#323946] space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00eeff] font-bold block">
                // verified_profiles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href={developerConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1f242d] hover:bg-[#1f242d]/80 rounded-xl border border-[#323946] hover:border-[#00eeff] flex items-center justify-between text-white transition-all group hover:shadow-[0_0_12px_rgba(0,238,255,0.2)]"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#00eeff]" />
                    <span className="font-semibold">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00eeff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={developerConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1f242d] hover:bg-[#1f242d]/80 rounded-xl border border-[#323946] hover:border-[#00eeff] flex items-center justify-between text-white transition-all group hover:shadow-[0_0_12px_rgba(0,238,255,0.2)]"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#00eeff]" />
                    <span className="font-semibold">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00eeff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://brand-identity-five.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1f242d] hover:bg-[#1f242d]/80 rounded-xl border border-[#323946] hover:border-[#00eeff] flex items-center justify-between text-white transition-all col-span-1 sm:col-span-2 group hover:shadow-[0_0_12px_rgba(0,238,255,0.2)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00eeff]"></span>
                    <span className="font-semibold text-[#00eeff]">Brand Identity Generator Live Demo</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00eeff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://toolkit-pro-chi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1f242d] hover:bg-[#1f242d]/80 rounded-xl border border-[#323946] hover:border-[#00eeff] flex items-center justify-between text-white transition-all col-span-1 sm:col-span-2 group hover:shadow-[0_0_12px_rgba(0,238,255,0.2)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00eeff]"></span>
                    <span className="font-semibold text-[#00eeff]">Toolkit Pro Live Demo</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00eeff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: User Inquiry Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#323946] bg-[#323946] shadow-[0_0_25px_rgba(0,0,0,0.25)]">
              {submitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <div className="w-14 h-14 rounded-full bg-[#00eeff]/15 text-[#00eeff] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,238,255,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    dispatch_status: 200_OK
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your transmission has been logged. I will review your message and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Web & Mobile Application Development', message: '' });
                    }}
                    className="px-5 py-2.5 text-xs font-mono rounded-xl bg-[#00eeff] text-[#1f242d] font-bold hover:bg-[#55f3ff] hover:shadow-[0_0_15px_#00eeff] transition-all cursor-pointer"
                  >
                    send_another_message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#1f242d] pb-3">
                    <span className="uppercase font-bold text-white flex items-center gap-1.5">
                      <span className="text-[#00eeff]">//</span> transmission_dispatch_form
                    </span>
                    <span className="text-gray-400 text-[11px]">direct_inbox • zero_telemetry</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-gray-300 block">
                        sender_name: <span className="text-[#00eeff]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3.5 py-2.5 bg-[#1f242d] border border-[#323946] rounded-xl text-white focus:outline-hidden focus:border-[#00eeff] focus:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all font-sans text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-gray-300 block">
                        sender_email: <span className="text-[#00eeff]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@enterprise.io"
                        className="w-full px-3.5 py-2.5 bg-[#1f242d] border border-[#323946] rounded-xl text-white focus:outline-hidden focus:border-[#00eeff] focus:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="text-gray-300 block">
                      engagement_type:
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1f242d] border border-[#323946] rounded-xl text-white focus:outline-hidden focus:border-[#00eeff] focus:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all font-sans text-sm"
                    >
                      <option>Web &amp; Mobile Application Development</option>
                      <option>Client-Side SaaS &amp; Web Utility Engineering</option>
                      <option>Frontend UI/UX &amp; Dashboard Systems</option>
                      <option>Full-Time / Contract Opportunity</option>
                      <option>General Inquiry / Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="contact-message" className="text-gray-300 block">
                        project_brief_or_inquiry: <span className="text-[#00eeff]">*</span>
                      </label>
                      <span className="text-[11px] text-gray-400">{formData.message.length}/1000</span>
                    </div>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your project scope, requirements, or timeline..."
                      className="w-full px-3.5 py-2.5 bg-[#1f242d] border border-[#323946] rounded-xl text-white focus:outline-hidden focus:border-[#00eeff] focus:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all font-sans text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00eeff] text-[#1f242d] font-bold text-sm font-mono hover:bg-[#55f3ff] hover:shadow-[0_0_20px_#00eeff] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'dispatching_payload...' : 'dispatch_message'}</span>
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
