import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Database, Share2, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us. This includes: name, email address, phone number, shipping address, billing information, and payment details."
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: "We use the information we collect to: process and fulfill your orders, communicate with you about your orders and account, send promotional emails and marketing communications (with your consent), improve our website and services, prevent fraudulent transactions, and comply with legal obligations."
    },
    {
      icon: Share2,
      title: "Information Sharing",
      content: "We may share your information with: service providers who perform services on our behalf (payment processing, shipping, data analysis), business partners with your consent, and law enforcement when required by law. We do not sell your personal information to third parties."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security."
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our website may not function properly without cookies."
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: "You have the right to: access your personal information, request correction of inaccurate information, request deletion of your information, object to processing of your information, and withdraw consent at any time. To exercise these rights, please contact us at mianusmanjee09@gmail.com."
    }
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Privacy <span className="italic font-serif text-gold">Policy</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Last Updated: May 7, 2026
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 leading-relaxed text-lg">
            Tawakkal ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <section.icon className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-xl font-bold mb-4 tracking-tight">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Questions About Our <span className="italic font-serif text-gold">Privacy Policy?</span>
          </h2>
          <p className="text-white/70 mb-8">
            If you have any questions or concerns about this Privacy Policy, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="mailto:mianusmanjee09@gmail.com" className="bg-gold text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-colors">
              Email Us
            </a>
            <a href="/contact" className="border border-white/30 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors">
              Contact Page
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
