'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react'
import { createEnquiry } from '@/lib/enquiry-api'

interface FormData {
  name?: string
  mobileNumber: string
  message?: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (!/^[6-9]\d{9}$/.test(data.mobileNumber)) {
      toast.error('Please enter a valid 10-digit Indian mobile number')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createEnquiry({
        packageRef: '',
        packageTitle: 'Contact Form',
        packageSlug: '',
        mobileNumber: data.mobileNumber,
      })

      if (result.success) {
        toast.success('We will contact you soon!')
        reset()
      } else {
        toast.error(result.message || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-white/80 text-sm mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get In Touch
          </h1>
          <p className="text-white/80 mt-3 text-lg">
            We&apos;d love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-secondary mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  {...register('name')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-4 py-3 text-gray-600 text-sm flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:border-primary"
                    {...register('mobileNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter valid 10-digit Indian mobile number',
                      },
                    })}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your travel plans..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none"
                  {...register('message')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-semibold text-secondary mb-6">Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <a href="tel:+919999999999" className="text-lg font-semibold text-secondary hover:text-primary">
                      +91-999-999-9999
                    </a>
                    <p className="text-sm text-gray-400">Mon-Sat, 9AM - 7PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <a href="mailto:info@safariindia.com" className="text-lg font-semibold text-secondary hover:text-primary">
                      info@safariindia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="text-lg font-semibold text-secondary">Mon - Sat: 9AM - 7PM</p>
                    <p className="text-sm text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <h4 className="font-semibold text-secondary mb-2">Need Instant Help?</h4>
              <p className="text-gray-600 text-sm">
                For urgent inquiries during your trip, call our 24/7 emergency hotline.
              </p>
              <p className="text-primary font-semibold mt-2">+91-999-999-9999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
