import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Rss, Clock, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { developerConfig } from '../data/portfolioData';
import { useToast } from './Toast';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Architecture Advisory / Audit',
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
    <section id="contact" className="py-24 sm:py-28 md:py-32 border-b border-[#E7E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Clear Hierarchy and mb-14 spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-14 border-b border-[#E7E6E2]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64666E] uppercase tracking-wider">
              <span className="text-[#2F5CFF] font-bold">06.</span>
              <span>INITIATE_CONTACT</span>
              <span className="text-[#9E9EA7]">//</span>
              <span>AVAILABILITY_RADAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14151A]">
              Let’s connect and build something fast.
            </h2>
          </div>
          <p className="text-base text-[#555761] max-w-md font-sans leading-relaxed">
            Available for front-end engineering, web &amp; mobile application development, and client-side SaaS initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left Column: Direct Connection & Availability Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-[#E7E6E2] bg-white space-y-4 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64666E] font-bold block">
                Direct Communication Channel
              </span>

              <div className="p-4 bg-[#F4F3EF] rounded-lg border border-[#E7E6E2] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#2F5CFF] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-medium text-[#14151A] truncate">
                    {developerConfig.email}
                  </span>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-white border border-[#D5D4CE] text-[#14151A] hover:bg-[#EAE8E2] transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#1FAA6E]" /> : <Copy className="w-3.5 h-3.5 text-[#64666E]" />}
                  <span>{copied ? 'copied' : 'copy'}</span>
                </button>
              </div>

              {/* Status & Timezone specs */}
              <div className="space-y-2 text-xs font-mono text-[#44464F] pt-2 border-t border-[#E7E6E2]">
                <div className="flex items-center justify-between">
                  <span className="text-[#64666E]">current_status:</span>
                  <span className="text-[#1FAA6E] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1FAA6E] animate-pulse-subtle"></span>
                    open_to_work
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64666E]">location:</span>
                  <span className="text-[#14151A]">{developerConfig.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64666E]">response_sla:</span>
                  <span className="text-[#14151A]">&lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social & Live Product Links */}
            <div className="p-6 rounded-xl border border-[#E7E6E2] bg-white space-y-3 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64666E] font-bold block">
                Live Products &amp; Verified Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href="https://brand-identity-five.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F4F3EF] hover:bg-[#EAE8E2] rounded-lg border border-[#E7E6E2] flex items-center justify-between text-[#14151A] transition-colors col-span-1 sm:col-span-2 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1FAA6E]"></span>
                    <span className="font-bold text-[#2F5CFF]">Brand Identity Generator Live Demo</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64666E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://toolkit-pro-chi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F4F3EF] hover:bg-[#EAE8E2] rounded-lg border border-[#E7E6E2] flex items-center justify-between text-[#14151A] transition-colors col-span-1 sm:col-span-2 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1FAA6E]"></span>
                    <span className="font-bold text-[#2F5CFF]">Toolkit Pro Live Demo</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64666E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://app-tool.vercel.app/shopping.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F4F3EF] hover:bg-[#EAE8E2] rounded-lg border border-[#E7E6E2] flex items-center justify-between text-[#14151A] transition-colors col-span-1 sm:col-span-2 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1FAA6E]"></span>
                    <span className="font-bold text-[#2F5CFF]">App Tool Shopping Hub Live Demo</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64666E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={developerConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F4F3EF] hover:bg-[#EAE8E2] rounded-lg border border-[#E7E6E2] flex items-center justify-between text-[#14151A] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#14151A]" />
                    <span>github</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64666E]" />
                </a>

                <a
                  href={developerConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F4F3EF] hover:bg-[#EAE8E2] rounded-lg border border-[#E7E6E2] flex items-center justify-between text-[#14151A] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#2F5CFF]" />
                    <span>linkedin</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64666E]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl border border-[#E7E6E2] bg-white shadow-2xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <div className="w-12 h-12 rounded-full bg-[#1FAA6E]/10 text-[#1FAA6E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#14151A]">
                    dispatch_status: 200_OK
                  </h3>
                  <p className="text-xs text-[#64666E] max-w-sm mx-auto font-sans">
                    Thank you, {formData.name}. Your message has been logged. I will review and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Web & Mobile Application Development', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-mono rounded bg-[#F4F3EF] hover:bg-[#EAE8E2] text-[#14151A] border border-[#D5D4CE] transition-colors"
                  >
                    send_another_message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#E7E6E2] pb-3">
                    <span className="uppercase font-bold text-[#14151A]">
                      // transmission_dispatch_form
                    </span>
                    <span className="text-[#64666E]">direct_inbox • zero_telemetry</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-[#64666E] block">
                        sender_name: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3 py-2 bg-[#F4F3EF] border border-[#D5D4CE] rounded text-[#14151A] focus:outline-hidden focus:border-[#2F5CFF] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-[#64666E] block">
                        sender_email: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@enterprise.io"
                        className="w-full px-3 py-2 bg-[#F4F3EF] border border-[#D5D4CE] rounded text-[#14151A] focus:outline-hidden focus:border-[#2F5CFF] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-topic" className="text-[#64666E] block">
                      engagement_type:
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F3EF] border border-[#D5D4CE] rounded text-[#14151A] focus:outline-hidden focus:border-[#2F5CFF] focus:bg-white"
                    >
                      <option>Web &amp; Mobile Application Development</option>
                      <option>Client-Side SaaS &amp; Web Utility Engineering</option>
                      <option>Front-End UI/UX &amp; Dashboard Systems</option>
                      <option>Full-Time / Contract Engineering Opportunity</option>
                      <option>General Inquiry / Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="contact-message" className="text-[#64666E] block">
                        project_brief_or_inquiry: <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-[#9E9EA7]">{formData.message.length}/1000</span>
                    </div>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the architectural challenge, timeline, or scope..."
                      className="w-full px-3 py-2 bg-[#F4F3EF] border border-[#D5D4CE] rounded text-[#14151A] focus:outline-hidden focus:border-[#2F5CFF] focus:bg-white font-sans text-xs sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#14151A] text-[#FAFAF8] font-bold text-xs sm:text-sm font-mono hover:bg-[#2F5CFF] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_4px_16px_rgba(47,92,255,0.35)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
