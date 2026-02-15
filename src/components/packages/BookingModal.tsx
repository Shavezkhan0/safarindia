'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Phone, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useBooking } from '@/components/shared/BookingContext'
import { createEnquiry } from '@/lib/enquiry-api'

const formSchema = z.object({
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
})

type FormData = z.infer<typeof formSchema>

export default function BookingModal() {
  const { isOpen, selectedPackage, closeBooking } = useBooking()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      mobileNumber: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    if (!selectedPackage) return

    const validation = formSchema.safeParse(data)
    if (!validation.success) {
      toast.error('Please enter a valid 10-digit Indian mobile number')
      return
    }

    setStatus('submitting')

    try {
      const result = await createEnquiry({
        packageRef: selectedPackage.id,
        packageTitle: selectedPackage.title,
        packageSlug: selectedPackage.slug,
        mobileNumber: data.mobileNumber,
      })

      if (result.success) {
        setStatus('success')
        toast.success('Booking request sent! We will call you soon.')
      } else {
        toast.error(result.message || 'Failed to submit enquiry')
        setStatus('idle')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    reset()
    closeBooking()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden" showCloseButton={false}>
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedPackage?.imageUrl && (
                <div className="h-24 relative">
                  <Image
                    src={selectedPackage.imageUrl}
                    alt={selectedPackage.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className="p-6">
                {selectedPackage && (
                  <div className="flex items-center gap-3 mb-4">
                    {selectedPackage.imageUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={selectedPackage.imageUrl}
                          alt={selectedPackage.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-heading font-semibold text-lg line-clamp-1">
                      {selectedPackage.title}
                    </h3>
                  </div>
                )}

                <h2 className="text-2xl font-heading font-bold text-primary mb-1">
                  Get Free Callback 📞
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Our travel expert will call you within 2 hours!
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Mobile Number
                    </label>
                    <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                      <span className="bg-gray-100 border-r px-3 py-3 text-gray-600 text-sm flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        autoFocus
                        placeholder="Enter 10-digit number"
                        className="flex-1 px-4 py-3 outline-none"
                        {...register('mobileNumber')}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg mt-4"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Get Free Callback Now
                  </button>

                  <div className="flex justify-around mt-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      🔒 Private
                    </span>
                    <span className="flex items-center gap-1">
                      ⚡ Fast Response
                    </span>
                    <span className="flex items-center gap-1">
                      🌟 Expert Help
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {status === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Connecting you with our expert...</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <h2 className="text-2xl font-heading font-bold text-secondary mb-2">
                Booking Request Sent! 🎉
              </h2>
              <p className="text-gray-600 mb-2">
                We&apos;ll call you at +91-***-***-**** within 2 hours
              </p>
              <p className="text-primary font-medium mb-6">
                {selectedPackage?.title}
              </p>

              <button onClick={handleClose} className="btn-primary px-8">
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
