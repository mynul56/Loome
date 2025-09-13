import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqSections = [
    {
      category: 'Orders & Shipping',
      id: 'shipping',
      questions: [
        {
          question: 'When will Loomé officially launch?',
          answer: 'Loomé will officially launch on September 20, 2025. Pre-orders will be available starting August 1, 2025.'
        },
        {
          question: 'What are your shipping options?',
          answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All orders over $200 qualify for complimentary standard shipping within the continental United States.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to select international destinations. International shipping rates and delivery times vary by location. Please contact us for specific shipping information to your country.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking confirmation email with your tracking number and a link to monitor your package\'s progress.'
        }
      ]
    },
    {
      category: 'Products & Sizing',
      id: 'products',
      questions: [
        {
          question: 'What materials do you use?',
          answer: 'We exclusively use premium materials sourced from renowned textile mills, including Italian cotton, French linen, and ethically-sourced wool. Each fabric is selected for its quality, durability, and comfort.'
        },
        {
          question: 'How should I choose my size?',
          answer: 'We recommend referring to our detailed size guide on each product page. Our pieces are designed with a classic, tailored fit. If you\'re between sizes or have questions, our customer service team is happy to provide personalized sizing recommendations.'
        },
        {
          question: 'Are your pieces suitable for all seasons?',
          answer: 'Our collection focuses on trans-seasonal pieces that can be layered and styled throughout the year. We use breathable, natural fabrics that adapt to different climates and occasions.'
        },
        {
          question: 'Do you offer custom sizing or alterations?',
          answer: 'Currently, we offer our pieces in standard sizes. However, we\'re exploring custom sizing options for future releases. Please contact us if you have specific fit requirements.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      id: 'returns',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return window for unworn, unwashed items in their original condition with tags attached. Returns are processed within 7-10 business days of receipt.'
        },
        {
          question: 'How do I initiate a return or exchange?',
          answer: 'Please contact our customer service team at hello@loome.com or use our returns portal. We\'ll provide you with a prepaid return label and detailed instructions.'
        },
        {
          question: 'Do you offer exchanges?',
          answer: 'Yes, we offer exchanges for different sizes or colors within 30 days of purchase, subject to availability. The exchange process is similar to returns.'
        },
        {
          question: 'Are return shipping costs covered?',
          answer: 'For domestic returns, we provide prepaid return labels. International return shipping costs are the responsibility of the customer unless the item was defective or incorrectly sent.'
        }
      ]
    },
    {
      category: 'Care & Maintenance',
      id: 'care',
      questions: [
        {
          question: 'How should I care for my Loomé pieces?',
          answer: 'Each garment comes with specific care instructions. Generally, we recommend dry cleaning for optimal longevity, though many pieces can be gently hand-washed or machine-washed on delicate cycles.'
        },
        {
          question: 'Will the colors fade over time?',
          answer: 'Our premium dyes and fabrics are selected for their colorfastness. With proper care, your Loomé pieces will maintain their color and quality for years to come.'
        },
        {
          question: 'Can I iron my Loomé shirts?',
          answer: 'Yes, most of our pieces can be ironed. We recommend using the appropriate heat setting for the fabric type and using a pressing cloth for delicate materials. Steaming is often preferred to maintain the fabric\'s integrity.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in" aria-label="Frequently Asked Questions">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-heading font-medium mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </section>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-3xl font-heading font-medium mb-6 text-accent">
                {section.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${section.id}-${index}`}
                    className="border border-border/50 rounded-lg px-6 elegant-shadow"
                  >
                    <AccordionTrigger className="text-left font-heading font-medium hover:text-accent transition-elegant">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-16 text-center bg-accent/5 rounded-lg p-12">
          <h2 className="text-3xl font-heading font-medium mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@loome.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-elegant"
            >
              Email Us
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-accent text-accent rounded-md font-medium hover:bg-accent/10 transition-elegant"
            >
              Contact Form
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;