import React from 'react';
import { 
  Code, 
  Smartphone, 
  Zap, 
  Palette, 
  ShoppingCart, 
  Layers, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  features: string[];
  badge: string;
}

export const ServicesSection: React.FC<{ onExploreProjects?: () => void }> = ({ onExploreProjects }) => {
  const services: ServiceItem[] = [
    {
      icon: Code,
      title: 'Frontend Web Development',
      category: 'React & Modern JavaScript',
      description: 'Engineering responsive, state-driven Single Page Applications (SPAs) with clean component hierarchies, predictable data flow, and modern ES6+ standards.',
      features: ['React 19 & Modern Component Architecture', 'TypeScript & Type-Safe Interfaces', 'Modular UI State Management', 'Cross-Browser Compatibility'],
      badge: 'Core Expertise',
    },
    {
      icon: Smartphone,
      title: 'Responsive UI/UX & Mobile Apps',
      category: 'Cross-Device Optimization',
      description: 'Building mobile-first layouts with intuitive navigation, fluid typography scales, touch-friendly tap targets, and snappy active micro-interactions.',
      features: ['Mobile-First Adaptive Grids', 'Touch & Gesture Optimization', '60 FPS Smooth UI Animations', 'Figma to Clean Code Implementation'],
      badge: 'High Demand',
    },
    {
      icon: Zap,
      title: 'Web Performance Optimization',
      category: 'Zero Server Latency',
      description: 'Maximizing client-side compute efficiency by offloading heavy algorithms to Web Workers, minimizing bundle payloads, and passing Core Web Vitals.',
      features: ['Web Worker Off-Thread Processing', 'Zero Server Latency Architectures', 'Core Web Vitals & Fast INP Profiling', 'Bundle Splitting & Lazy Asset Loading'],
      badge: 'Performance',
    },
    {
      icon: Palette,
      title: 'Design Systems & CSS Engineering',
      category: 'Tailwind CSS & Design Tokens',
      description: 'Architecting scalable design token engines, dark/light theme systems, WCAG 2.1 AA accessible color palettes, and unified UI component libraries.',
      features: ['Tailwind CSS Utility Architectures', 'Dynamic CSS Variable (:root) Compilers', 'WCAG AA/AAA Contrast Verification', 'Mathematical Typographic Scales'],
      badge: 'Accessibility',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce & Interactive Utilities',
      category: 'Client-Side Web Tools',
      description: 'Developing high-conversion shopping carts, persistent local storage states, dynamic product filtering engines, and smooth checkout UI flows.',
      features: ['Client-Side Cart Persistence', 'Real-Time Multi-Attribute Filtering', 'Zero-Reload State Transitions', 'Form Validations & Error Handling'],
      badge: 'E-Commerce',
    },
    {
      icon: Layers,
      title: 'Client-Side SaaS & Media Tools',
      category: 'In-Browser Computing',
      description: 'Building private, in-browser media compression tools, Canvas graphics generators, SVG icon compilers, and export pipelines with total user data privacy.',
      features: ['HTML5 Canvas & SVG Rendering', '100% In-Browser Privacy Protection', 'Format Conversion & Media Pipelines', 'Real-Time Visual Generators'],
      badge: 'Privacy-First',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#0a0d12] text-[#f8fafc] border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-[#1e293b]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#3b82f6] uppercase tracking-wider block">
              What I Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Services &amp; Capabilities
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Delivering clean code, fast interfaces, and robust client-side software architectures tailored to modern web standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#0f172a] rounded-2xl p-6 sm:p-7 border border-[#1e293b] hover:border-slate-600 hover:bg-[#1e293b] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-sm"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#0a0d12] text-[#3b82f6] flex items-center justify-center border border-[#1e293b] group-hover:border-blue-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#0a0d12] text-[#94a3b8] border border-[#1e293b]">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#3b82f6] block">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-[#3b82f6] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="mt-6 pt-5 border-t border-[#1e293b] space-y-2">
                  {service.features.map((feat, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Action */}
                <div className="mt-6 pt-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] hover:text-blue-300 transition-colors"
                  >
                    <span>Discuss this service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
