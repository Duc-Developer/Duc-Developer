import React from 'react';
import Link from 'next/link';
import "./app.css";

const Custom404 = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className='relative w-full max-w-screen-sm'>
        <div className="bg-[#FF6A3D] px-2 text-sm whitespace-nowrap left-1/2 -top-[4rem] -translate-x-[4.2rem] rounded rotate-12 absolute">
          Page Not Found
        </div>
      </div>
      <div className='max-w-screen-sm text-lg px-4 py-2 text-white100 text-center'>
        This page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </div>
      <button className="mt-5">
        <Link href="/">
          <p className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </p>
        </Link>
      </button>
    </main>
  );
};

export default Custom404;