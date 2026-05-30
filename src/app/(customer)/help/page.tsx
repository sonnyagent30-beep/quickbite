'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer: 'Once your order is confirmed, you can track it in real-time from the Orders section. Tap on your active order to see the delivery status, estimated arrival time, and live location of your driver.',
    category: 'Ordering'
  },
  {
    id: '2',
    question: 'How long does delivery take?',
    answer: 'Delivery times vary based on distance and restaurant preparation time. Typically, orders within Ikeja and Victoria Island take 25-45 minutes. You\'ll receive an estimated time when you place your order.',
    category: 'Delivery'
  },
  {
    id: '3',
    question: 'What areas do you deliver to?',
    answer: 'Currently, we deliver across Lagos including Ikeja, Victoria Island, Lekki, Surulere, Yaba, and Apapa. Enter your address at checkout to confirm we deliver to your location.',
    category: 'Delivery'
  },
  {
    id: '4',
    question: 'How do I change my delivery address?',
    answer: 'Go to Settings > Manage Addresses. You can add, edit, or delete saved addresses. Set a default address for faster checkout, or select a different address when placing your order.',
    category: 'Account'
  },
  {
    id: '5',
    question: 'What payment methods are accepted?',
    answer: 'We accept cards (Visa, Mastercard), USSD payments, bank transfers, and Cash on Delivery. All online payments are secure and encrypted.',
    category: 'Payment'
  },
  {
    id: '6',
    question: 'How do I apply a promo code?',
    answer: 'Enter your promo code at checkout in the "Apply Promo" field. Discounts are applied immediately if the code is valid. Contact support if your code isn\'t working.',
    category: 'Ordering'
  },
  {
    id: '7',
    question: 'Can I cancel my order?',
    answer: 'Orders can be cancelled within 5 minutes of placement, before the restaurant confirms. Go to Orders > Active Order > Cancel. If the restaurant has started preparing, cancellation may not be possible.',
    category: 'Ordering'
  },
  {
    id: '8',
    question: 'What if my food is wrong or damaged?',
    answer: 'Contact our support team immediately via the chat option or call. Provide photos if possible. We\'ll resolve issues promptly with refunds or replacements.',
    category: 'Issues'
  },
  {
    id: '9',
    question: 'How do I become a rider/driver?',
    answer: 'We\'re always looking for delivery partners! Visit our careers page or contact hr@quickbite.ng for information about rider opportunities in Lagos.',
    category: 'General'
  },
  {
    id: '10',
    question: 'Is my personal information secure?',
    answer: 'Yes. We use industry-standard encryption for all data. We do not share your personal information with third parties without consent. Read our Privacy Policy for details.',
    category: 'Account'
  },
]

export default function HelpPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const categories = ['All', 'Ordering', 'Delivery', 'Payment', 'Account', 'Issues', 'General']

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - store in localStorage
    try {
      const submissions = JSON.parse(localStorage.getItem('support_submissions') || '[]')
      submissions.push({ ...contactForm, timestamp: new Date().toISOString() })
      localStorage.setItem('support_submissions', JSON.stringify(submissions))
    } catch (err) {
      console.warn('Failed to save contact form submission:', err)
    }
    setFormSubmitted(true)
    setContactForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Help & Support
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4">
        {/* Search */}
        <div className="relative mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/orders" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-[#1A1A1A]">Track Order</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-[#1A1A1A]">My Cart</span>
          </Link>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Contact Us Directly
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+2348001234567" className="flex items-center gap-2 p-3 bg-[#F5F5F5] rounded-lg hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-sm font-medium text-[#1A1A1A]">Call Us</span>
            </a>
            <a href="mailto:support@quickbite.ng" className="flex items-center gap-2 p-3 bg-[#F5F5F5] rounded-lg hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-sm font-medium text-[#1A1A1A]">Email</span>
            </a>
          </div>
          <div className="mt-3 flex items-center gap-2 p-3 bg-[#F5F5F5] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span className="text-sm text-[#666666]">Average response time: 2-4 hours</span>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Frequently Asked Questions
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E85D04] text-white'
                    : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-6">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex-1 pr-4">
                  <span className="text-xs text-[#E85D04] font-medium">{faq.category}</span>
                  <p className="font-medium text-[#1A1A1A]">{faq.question}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {expandedId === faq.id && (
                <div className="px-4 pb-4 text-sm text-[#666666] leading-relaxed border-t border-[#F5F5F5] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Send Us a Message
          </h3>
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="m9 11 3 3L22 4"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">Message Sent!</h4>
              <p className="text-sm text-[#666666]">We'll get back to you within 2-4 hours.</p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 text-[#E85D04] text-sm font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <textarea
                  placeholder="How can we help you?"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#666666] mb-3">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}