import React from 'react'

function HomeSections() {
  return (
    <div className="space-y-28 py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white to-gray-50">

      {/* Interactive Hero Section (No Media) */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-center py-24 px-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-4 animate-pulse">
          Print Your Passion.
        </h1>
        <p className="max-w-2xl mx-auto text-lg font-light">
          Design stunning apparel, accessories, and more — no design skills required. Your imagination, our canvas.
        </p>
        <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300">
          Launch Your First Product
        </button>
      </section>

      {/* Interactive Icon Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {[
          { icon: "🖌️", title: "Unlimited Creativity", desc: "Choose from endless design options, templates, and colors." },
          { icon: "📦", title: "No Minimum Orders", desc: "Order 1 or 100 – perfect for individuals or teams." },
          { icon: "🚀", title: "Lightning Fast Delivery", desc: "Print and ship in days with real-time order tracking." },
        ].map(({ icon, title, desc }, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-gray-600 mt-2">{desc}</p>
          </div>
        ))}
      </section>

      {/* Spotlight Callout */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-16 text-center shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">India’s Most Loved Print-On-Demand Platform</h2>
        <p className="max-w-3xl mx-auto text-lg">Join thousands of happy creators, businesses, and artists who've made their mark with our platform.</p>
        <button className="mt-8 bg-white text-indigo-700 px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition">See What You Can Create</button>
      </section>

      {/* Minimal Professional Footer */}
      <footer className="bg-white border-t mt-24 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Printiva. All rights reserved.
      </footer>
    </div>
  )
}

export default HomeSections