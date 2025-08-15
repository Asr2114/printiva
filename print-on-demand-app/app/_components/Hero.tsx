'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { UserDetailContext } from '@/context/UserDetailContext'

function Hero() {
  const { userDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse))
      // The login logic will be handled by the Header component
      // We just need to trigger the login here
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const handleGetStarted = () => {
    if (userDetail) {
      // User is logged in, scroll to popular products
      const popularProductsSection = document.querySelector('.animate__fadeInUp');
      if (popularProductsSection) {
        popularProductsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // User is not logged in, trigger Google sign in
      googleLogin();
    }
  };

  return (
    <div>
        <section className="bg-gray-900 dark:bg-gray-900 w-full">
  <div
    className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-16 lg:px-8"
  >
    <div className="max-w-prose text-left">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
        Create, 
        <strong className="text-primary"> Customize </strong>
        & Order. 
      </h1>

      <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed dark:text-gray-200">
        Design it. Print it. Wear it.
        </p>
        
        <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed dark:text-gray-200">
        T-shirts, mugs, posters & more — just one click away.
        </p>
        

      

      <div className="mt-4 flex gap-4 sm:mt-6">
        <button
          onClick={handleGetStarted}
          className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 cursor-pointer"
        >
          {userDetail ? 'Browse Products' : 'Get Started'}
        </button>

        <a
          className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          href="https://print-on-demand-web-app.vercel.app/about"
        >
          Learn More
        </a>
      </div>
    </div>

    <div className="flex justify-center md:justify-end mt-10 md:mt-0">
      <Image
        src="/hero.png"
        alt="hero"
        width={450}
        height={450}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
