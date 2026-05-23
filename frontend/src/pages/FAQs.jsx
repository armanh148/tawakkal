import React, { useEffect, useState } from 'react';
import { ChevronDown, HelpCircle, Search, MessageCircle } from 'lucide-react';

const FAQs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'products', name: 'Products & Sizing' },
    { id: 'payment', name: 'Payment & Pricing' },
    { id: 'account', name: 'Account & Support' }
  ];

  const faqs = [
    // Orders & Shipping
    {
      category: 'orders',
      question: "Can I purchase a return shipping label?",
      answer: "Currently, we do not provide pre-paid return shipping labels. If you need to return an item, please use a reliable and trackable courier service to send the package back to our warehouse address. Keep your tracking number for reference."
    },
    {
      category: 'orders',
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a confirmation email and SMS with a tracking number. You can track your order on our website using the 'Track Order' feature or directly on the courier's website using the provided tracking number."
    },
    {
      category: 'orders',
      question: "What are the shipping charges?",
      answer: "We offer three shipping options: Standard Delivery (PKR 150, 3-5 days), Express Delivery (PKR 350, 1-2 days), and Cash on Delivery (PKR 200, 3-5 days). Free shipping is available on orders over PKR 5,000."
    },
    {
      category: 'orders',
      question: "How long does delivery take?",
      answer: "Orders are processed within 1-2 business days. Standard delivery takes 3-5 business days within Pakistan. Express delivery is available for 1-2 business days in major cities. Remote areas may require additional 2-3 days."
    },

    // Returns & Exchanges
    {
      category: 'returns',
      question: "Can I exchange items?",
      answer: "Yes, we offer exchanges within 7 days of delivery if the size is incorrect or the product does not meet your expectations. Please ensure the items are unworn, unwashed, and have all original tags attached. Exchange requests can be made through your account or by contacting customer service."
    },
    {
      category: 'returns',
      question: "Should I know anything else about the Online Return Policy?",
      answer: "Returns are generally accepted only for manufacturing defects or if the wrong item was dispatched. Please note that shipping charges are non-refundable unless the return is due to an error on our part. All return requests must be made within 7 days of delivery."
    },
    {
      category: 'returns',
      question: "What is the Store Returns Policy?",
      answer: "Items purchased online can only be returned or exchanged through our online portal and cannot be processed at physical retail locations. Conversely, store purchases must be exchanged at the original point of sale with a valid receipt within 7 days."
    },
    {
      category: 'returns',
      question: "What items are final sale?",
      answer: "All items purchased from the 'Clearance' or 'Flash Sale' sections are considered final sale and cannot be returned or exchanged. Additionally, customized stitched suits and accessories (jewelry, handbags) are non-returnable for hygiene and personalization reasons."
    },

    // Products & Sizing
    {
      category: 'products',
      question: "How do I find my correct size?",
      answer: "Each product page has a detailed size guide specific to that item. You can also visit our Size Guide page for general measurements. If you're between sizes, we recommend sizing up for a comfortable fit. For custom stitching, provide your exact measurements."
    },
    {
      category: 'products',
      question: "Are the product colors accurate?",
      answer: "We make every effort to display product colors as accurately as possible. However, actual colors may vary slightly due to photographic lighting sources, monitor settings, and fabric dye variations. If you have specific color concerns, please contact us before ordering."
    },
    {
      category: 'products',
      question: "What fabrics do you use?",
      answer: "We use a variety of premium fabrics including Lawn, Cotton, Chiffon, Silk, Velvet, Jacquard, and more. Visit our Fabric Glossary page for detailed information about each fabric type, its characteristics, and care instructions."
    },

    // Payment & Pricing
    {
      category: 'payment',
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods: Credit/Debit Cards (Visa, Mastercard), Bank Transfers, Cash on Delivery (COD), and Digital Wallets (Easypaisa, JazzCash). All online payments are secured with SSL encryption."
    },
    {
      category: 'payment',
      question: "Is Cash on Delivery available?",
      answer: "Yes, Cash on Delivery (COD) is available for all orders within Pakistan. A nominal fee of PKR 200 applies for COD orders. Please ensure someone is available to receive and pay for the order at the time of delivery."
    },
    {
      category: 'payment',
      question: "Are there any hidden charges?",
      answer: "No, there are no hidden charges. The price displayed on the product page is the final price. Shipping charges are shown at checkout based on your selected delivery method. All applicable taxes are included in the product price."
    },

    // Account & Support
    {
      category: 'account',
      question: "How do I create an account?",
      answer: "Click on the 'Account' icon in the top right corner and select 'Sign Up'. Enter your email address, create a password, and fill in your details. Creating an account allows you to track orders, save addresses, and access exclusive offers."
    },
    {
      category: 'account',
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through multiple channels: Phone (0300-7904231), WhatsApp (0323-0000883), Email (mianusmanjee09@gmail.com), or visit our Contact page to fill out a form. We respond to all inquiries within 24 hours."
    },
    {
      category: 'account',
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. If you don't receive the email within a few minutes, please check your spam folder or contact customer support."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Help Center</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Frequently Asked <span className="italic font-serif text-gold">Questions</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories & Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => {
            const categoryFAQs = filteredFAQs.filter(faq => faq.category === category.id);
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-gold" />
                  {category.name}
                </h2>
                <div className="space-y-4">
                  {categoryFAQs.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    return (
                      <div 
                        key={globalIndex}
                        className="bg-white border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium pr-4">{faq.question}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${openIndex === globalIndex ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MessageCircle className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Still Have <span className="italic font-serif text-gold">Questions?</span>
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our customer support team is here to help you with any inquiries.
          </p>
          <a href="/contact" className="inline-block bg-gold text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-colors">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
