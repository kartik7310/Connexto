import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-10">
      {/* grid-cols-2: Two columns on mobile 
          sm:grid-cols-3: Three columns on larger screens
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-50 font-bold uppercase text-xs">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
        </nav>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-50 font-bold uppercase text-xs">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-50 font-bold uppercase text-xs">Legal</h6>
          <a className="link link-hover">Terms</a>
          <a className="link link-hover">Privacy</a>
        </nav>

      </div>
    </footer>
  )
}

export default Footer