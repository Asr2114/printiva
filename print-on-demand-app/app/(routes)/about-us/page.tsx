'use client'
import { motion } from 'framer-motion'
import { Award, Users, Truck, Shield, Heart, Zap } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function AboutUs() {
    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '50K+', label: 'Products Sold' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Customer Support' }
    ];

    const values = [
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Customer First",
            description: "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction."
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Quality Assured",
            description: "Every product meets our high standards for quality, durability, and design excellence."
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Innovation",
            description: "We continuously innovate to bring you the latest in print-on-demand technology and design tools."
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Community",
            description: "Building a community of creators, designers, and customers who share our passion for quality."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "/hero.png",
            bio: "Passionate about bringing creative designs to life through quality products."
        },
        {
            name: "Mike Chen",
            role: "Head of Design",
            image: "/hero.png",
            bio: "Expert in creating intuitive design tools that empower creators."
        },
        {
            name: "Emily Rodriguez",
            role: "Customer Success",
            image: "/hero.png",
            bio: "Dedicated to ensuring every customer has an amazing experience."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        About Printiva
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        We're on a mission to democratize custom design and bring your creative vision to life 
                        through high-quality, personalized products.
                    </motion.p>
                </div>
            </div>

            {/* Mission Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                At Printiva, we believe everyone deserves access to high-quality, custom-designed products. 
                                Whether you're a professional designer, a small business owner, or someone who just loves 
                                creating unique items, we provide the tools and platform to make your ideas a reality.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our advanced design studio, combined with premium materials and fast production, 
                                ensures that every product meets the highest standards of quality and craftsmanship.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-white">
                                <Award className="h-16 w-16 text-yellow-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Why Choose Printiva?</h3>
                                <ul className="space-y-3 text-gray-200">
                                    <li className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Premium quality materials</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Advanced design tools</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Fast production & shipping</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Exceptional customer support</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl text-gray-300">Numbers that tell our story</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600">The principles that guide everything we do</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600">The passionate people behind Printiva</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                            >
                                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <Image 
                                        src={member.image} 
                                        alt={member.name}
                                        width={120}
                                        height={120}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-gray-600 mb-3">{member.role}</p>
                                    <p className="text-gray-500 text-sm">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Ready to Start Creating?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of creators who trust Printiva to bring their designs to life. 
                            Start your creative journey today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                Explore Products
                            </button>
                            <button className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
