import React, { useEffect } from 'react';
import { AlertTriangle, FileText, Scale, Truck, RotateCcw, ShieldAlert } from 'lucide-react';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const disclaimers = [
    {
      icon: FileText,
      title: "Product Information",
      content: "While we strive to provide accurate product descriptions, images, and pricing, we do not warrant that product descriptions, colors, or other content available on the site are accurate, complete, reliable, current, or error-free. Actual product colors may vary due to photographic lighting sources or your monitor settings."
    },
    {
      icon: Scale,
      title: "Pricing & Availability",
      content: "All prices displayed on our website are in Pakistani Rupees (PKR) and are inclusive of applicable taxes unless stated otherwise. Prices and availability are subject to change without notice. We reserve the right to limit quantities and discontinue products at any time."
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: "Delivery times are estimates and commence from the date of shipping, not the date of order. We are not responsible for delays caused by customs, weather conditions, or courier service disruptions. Risk of loss and title for items pass to you upon delivery to the carrier."
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      content: "Return and exchange policies are subject to the terms outlined in our specific policy pages. We reserve the right to refuse returns that do not meet our criteria. Final sale items, custom orders, and accessories cannot be returned or exchanged."
    },
    {
      icon: ShieldAlert,
      title: "Intellectual Property",
      content: "All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Tawakkal or its content suppliers and is protected by copyright laws. Unauthorized use, reproduction, or distribution is strictly prohibited."
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: "In no event shall Tawakkal, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or purchase of products. Our total liability shall not exceed the amount you paid for the product in question."
    }
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Legal Notice</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            <span className="italic font-serif text-gold">Disclaimer</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Please read the following terms carefully before using our services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {disclaimers.map((item, index) => (
              <div key={index} className="bg-white p-8 shadow-sm border-l-4 border-gold hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Notice */}
      <section className="py-16 px-6 bg-[#f9f9f9] border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">General Notice</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by these disclaimers. We reserve the right to modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Need <span className="italic font-serif text-gold">Clarification?</span>
          </h2>
          <p className="text-white/70 mb-8">
            If you have any questions about our disclaimers or terms, please don't hesitate to reach out.
          </p>
          <a href="/contact" className="inline-block bg-gold text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
