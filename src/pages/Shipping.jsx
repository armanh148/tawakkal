import React, { useEffect } from 'react';
import { Truck, Clock, MapPin, Package, AlertCircle, CheckCircle } from 'lucide-react';

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shippingMethods = [
    {
      title: "Standard Delivery",
      time: "3-5 Business Days",
      cost: "PKR 150",
      description: "Our standard shipping option for all orders within Pakistan. Reliable and cost-effective."
    },
    {
      title: "Express Delivery",
      time: "1-2 Business Days",
      cost: "PKR 350",
      description: "Fast delivery for urgent orders. Available in major cities across Pakistan."
    },
    {
      title: "Cash on Delivery (COD)",
      time: "3-5 Business Days",
      cost: "PKR 200",
      description: "Pay when you receive your order. Additional charges apply for COD service."
    }
  ];

  const handlingInfo = [
    {
      icon: Package,
      title: "Order Processing",
      content: "Orders are processed within 1-2 business days. During sale periods or high demand, processing may take up to 3 business days. You will receive a confirmation email once your order is shipped."
    },
    {
      icon: MapPin,
      title: "Delivery Areas",
      content: "We deliver to all major cities in Pakistan including Lahore, Karachi, Islamabad, Faisalabad, Rawalpindi, Multan, and more. For remote areas, delivery may take additional 2-3 days."
    },
    {
      icon: Clock,
      title: "Delivery Timeframes",
      content: "Delivery times are estimates and commence from the date of shipping, not the date of order. Business days exclude weekends and public holidays. Unforeseen circumstances may cause delays."
    },
    {
      icon: AlertCircle,
      title: "Order Tracking",
      content: "Once your order is shipped, you will receive an email with a tracking number. You can track your order on our website or through the courier's website using this tracking number."
    }
  ];

  const policies = [
    "Free shipping on orders over PKR 5,000",
    "Multiple items may be shipped separately",
    "Shipping charges are non-refundable",
    "Incorrect addresses may result in additional charges",
    "We are not responsible for delays due to customs or weather"
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Delivery</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Shipping & <span className="italic font-serif text-gold">Handling</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Fast, reliable delivery to your doorstep
          </p>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Options</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Shipping <span className="italic font-serif text-gold">Methods</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {shippingMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 shadow-lg border-t-2 border-gold text-center">
                <Truck className="w-12 h-12 text-gold mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-2 tracking-tight">{method.title}</h3>
                <div className="text-2xl font-bold text-gold mb-4">{method.cost}</div>
                <div className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                  <Clock size={14} />
                  {method.time}
                </div>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handling Information */}
      <section className="py-24 bg-[#f9f9f9] border-y border-gold/10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Details</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Handling <span className="italic font-serif text-gold">Information</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {handlingInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 tracking-tight">{info.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Policies */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Policies</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Important <span className="italic font-serif text-gold">Notes</span>
            </h2>
          </div>

          <div className="bg-white p-8 shadow-sm border border-gray-100">
            <ul className="space-y-4">
              {policies.map((policy, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Shipping <span className="italic font-serif text-gold">Questions?</span>
          </h2>
          <p className="text-white/70 mb-8">
            If you have any questions about shipping or your order status, our team is here to help.
          </p>
          <a href="/contact" className="inline-block bg-gold text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-colors">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
