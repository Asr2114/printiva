'use client'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image src="/logo3.svg" alt="Logo" width={140} height={32} className="invert" />
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your premier destination for custom print-on-demand products. 
                            Create, customize, and bring your designs to life with our high-quality merchandise.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Size Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">
                                    123 Print Street<br />
                                    Design City, DC 12345
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">hello@printiva.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-gray-300 text-sm mb-6">
                            Subscribe to our newsletter for the latest products and exclusive offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                            />
                            <Button className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-lg">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Printiva. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
