import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, ArrowRight, Shield, UserPlus, MessageCircle,
  ThumbsUp, ThumbsDown, Users
} from 'lucide-react';

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-900">
      {/* Navigation */}
      <nav className="bg-base-300 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">Connectly</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-base-900 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition">Contact</a>
              <Link
                to="/signup"
                className="w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to the Future of
            <span className="text-blue-500"> Connections</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Verify, connect, and chat — show <span className="font-semibold">Interest</span> or
            <span className="font-semibold"> Ignore</span> profiles on your feed, accept or reject
            connection requests, and chat only with your connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              Create Free Account <ArrowRight size={20} />
            </Link>
            <a href="#features" className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-base-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Exactly what you can do
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Secure Auth */}
            <div className="bg-base-300 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Auth</h3>
              <p className="text-gray-300">
                Sign up & log in securely. Verified accounts keep the community safe.
              </p>
            </div>

            {/* Send Connection Requests */}
            <div className="bg-base-300 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <UserPlus className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Send Connections</h3>
              <p className="text-gray-300">
                Discover people and send requests. Build your network intentionally.
              </p>
            </div>

            {/* Feed: Interest / Ignore */}
            <div className="bg-base-300 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="text-white" size={18} />
                  <ThumbsDown className="text-white" size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Interest / Ignore</h3>
              <p className="text-gray-300">
                On your feed, mark profiles as <span className="font-semibold">Interest</span> or{" "}
                <span className="font-semibold">Ignore</span> to tune what you see.
              </p>
            </div>

            {/* Accept / Reject + Chat */}
            <div className="bg-base-300 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Accept, Reject & Chat</h3>
              <p className="text-gray-300">
                Accept or reject requests. Once connected, chat in real-time with your matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Pricing</h2>
          <p className="text-slate-400 text-lg">Start free. Upgrade only if you love it.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="border border-gray-700 rounded-lg p-6 hover:border-slate-600 transition">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Silver</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-white">₹100</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <ul className="space-y-3 mb-6 text-gray-300">
              <li>• 30 connection requests / day</li>
              <li>• Interest / Ignore on feed</li>
              <li>• Accept / Reject requests</li>
              <li>• Chat with your connections</li>
            </ul>
            <Link
              to="/signup"
              className="w-full inline-block text-center border border-slate-600 hover:bg-slate-700 text-gray-300 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>

          {/* Gold Plan */}
          <div className="border-2 border-blue-600 rounded-lg p-6 relative">
            <div className="absolute -top-3 right-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">POPULAR</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Gold</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-white">₹300</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <ul className="space-y-3 mb-6 text-gray-300">
              <li>• All Starter features</li>
              <li>• Unlimited connection requests / day</li>
              <li>• See who showed Interest</li>
              <li>• Priority feed refresh</li>
            </ul>
            <Link
              to="/premium"
              className="w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Choose Gold
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-base-300 rounded-2xl p-12 text-center border border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Create your profile and start connecting in minutes.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2025 Connectly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
