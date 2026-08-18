import React from 'react';
import { 
  Code, 
  Smartphone, 
  Zap, 
  Palette, 
  ShoppingCart, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
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
      features: ['React 19 & Component Architecture', 'TypeScript & Type-Safe Interfaces', 'Modular UI State Management', 'Cross-Browser Compatibility'],
      badge: 'Core Expertise',
    },
    {
      icon: Smartphone,
      title: 'Responsive UI/UX & Mobile Apps',
      category: 'Cross-Device Optimization',
      description: 'Building mobile-first layouts with intuitive navigation, fluid typography scales, touch-friendly tap targets, and snappy :active micro-interactions.',
      features: ['Mobile-First Adaptive Grids', 'Touch & Gesture Optimization', '60 FPS CSS & Motion Animations', 'Pixel-Perfect Figma Translations'],
      badge: 'High Demand',
    },
    {
      icon: Zap,
      title: 'Web Performance Optimization',
      category: 'Zero Server Latency',
      description: 'Maximizing client-side compute efficiency by offloading heavy algorithms to Web Workers, minimizing bundle payloads, and passing Core Web Vitals with 100/100 scores.',
      features: ['Web Worker Off-Thread Processing', 'Zero Server Latency Architectures', 'Core Web Vitals & Lighthouse 100', 'Bundle Splitting & Lazy Assets'],
      badge: 'Speed SLA',
    },
    {
      icon: Palette,
      title: 'Design Systems & CSS Engineering',
      category: 'Tailwind CSS & Design Tokens',
      description: 'Architecting scalable design token engines, dark/light theme systems, WCAG 2.1 AAA accessible color palettes, and unified UI component libraries.',
      features: ['Tailwind CSS Utility Architectures', 'Dynamic CSS Variable (:root) Compilers', 'WCAG AAA Contrast Verification', 'Custom Iconography & Typography Scales'],
      badge: 'A11y Compliant',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce & Interactive Utilities',
      category: 'Client-Side Web Tools',
      description: 'Developing high-conversion shopping carts, persistent local storage states, dynamic product filtering engines, and checkout UI flows.',
      features: ['Client-Side Cart Persistence', 'Real-Time Multi-Attribute Filtering', 'Zero-Reload State Transitions', 'Secure Form Validations'],
      badge: 'Conversion Focused',
    },
    {
      icon: Layers,
      title: 'Client-Side SaaS & Media Tools',
      category: 'In-Browser Computing',
      description: 'Building private, in-browser media compression tools, Canvas graphics generators, SVG icon compilers, and export pipelines with total user data privacy.',
      features: ['HTML5 Canvas & SVG Rendering', '100% In-Browser Privacy Protection', 'Format Conversion & Media Pipelines', 'Real-Time Visual Generators'],
      badge: 'Zero Telemetry',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#12161f] text-white border-b border-[#2a3245] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-[#2a3245]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00eeff] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-pulse"></span>
              <span className="font-bold">SERVICES &amp; CAPABILITIES</span>
              <span className="text-gray-500">//</span>
              <span>WHAT I OFFER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              My <span className="text-[#00eeff] text-glow-cyan">Specialized Services</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-md leading-relaxed font-sans">
            Delivering clean code, lightning-fast interfaces, and robust client-side software architectures tailored to modern web standards.
          </p>
        </div>

        {/* Services 3-Column Grid with Hover Zoom & Cyan Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#1b202c] rounded-2xl p-6 sm:p-7 border border-[#2a3245] hover:border-[#00eeff] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,238,255,0.25)] flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#12161f] text-[#00eeff] flex items-center justify-center border border-[#00eeff]/30 group-hover:border-[#00eeff] group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(0,238,255,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#12161f] text-[#00eeff] border border-[#00eeff]/20">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#00eeff] uppercase tracking-wider block">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00eeff] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="mt-6 pt-5 border-t border-[#12161f] space-y-2">
                  {service.features.map((feat, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00eeff] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Action */}
                <div className="mt-6 pt-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#00eeff] group-hover:underline"
                  >
                    <span>request_this_service</span>
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
