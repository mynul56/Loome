import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@loome.com');
    toast({
      title: "Email Copied",
      description: "hello@loome.com has been copied to your clipboard.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in" aria-label="Contact Loomé">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-heading font-medium mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground text-balance">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-medium mb-4">Send us a Message</h2>
              <p className="text-muted-foreground mb-6">
                Have a question about our products, sizing, or custom orders? We're here to help.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-medium mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border/50 rounded-lg p-6 elegant-shadow">
                  <h3 className="font-heading font-medium mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-4">
                    For general inquiries, orders, and customer support
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">hello@loome.com</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyEmail}
                      className="h-auto p-1 text-accent hover:text-accent"
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="bg-card border border-border/50 rounded-lg p-6 elegant-shadow">
                  <h3 className="font-heading font-medium mb-2">Response Time</h3>
                  <p className="text-muted-foreground">
                    We respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please mark your message as "Urgent" in the subject line.
                  </p>
                </div>

                <div className="bg-card border border-border/50 rounded-lg p-6 elegant-shadow">
                  <h3 className="font-heading font-medium mb-2">Business Hours</h3>
                  <p className="text-muted-foreground mb-2">
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                  </p>
                  <p className="text-muted-foreground">
                    Saturday - Sunday: 10:00 AM - 4:00 PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-heading font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                  Facebook
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Stay updated with our latest collections and behind-the-scenes content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;