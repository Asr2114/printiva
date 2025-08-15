'use client'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Address",
            details: "123 Print Street, Design City, DC 12345"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Phone",
            details: "+1 (555) 123-4567"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            details: "hello@printiva.com"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Business Hours",
            details: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Have questions about our products or need help with your order? 
                        We'd love to hear from you!
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="order">Order Support</option>
                                        <option value="product">Product Questions</option>
                                        <option value="customization">Customization Help</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>
                                
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                                            <p className="text-gray-600">{info.details}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer list-none font-medium text-gray-900 hover:text-black transition-colors">
                                        How long does shipping take?
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="mt-2 text-gray-600 text-sm">
                                        Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.
                                    </p>
                                </details>
                                
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer list-none font-medium text-gray-900 hover:text-black transition-colors">
                                        Can I customize my own design?
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="mt-2 text-gray-600 text-sm">
                                        Absolutely! We have a built-in design studio where you can create custom designs or upload your own artwork.
                                    </p>
                                </details>
                                
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer list-none font-medium text-gray-900 hover:text-black transition-colors">
                                        What's your return policy?
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="mt-2 text-gray-600 text-sm">
                                        We offer a 30-day return policy for all products. Custom items may have different return terms.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
