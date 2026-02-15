'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

interface ItineraryItem {
  day?: number
  title: string
  description?: string
  activities?: Array<{ activity?: string }>
}

interface ItineraryAccordionProps {
  itinerary: ItineraryItem[]
}

function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Itinerary details coming soon
      </div>
    )
  }

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue="item-0"
      className="space-y-3"
    >
      {itinerary.map((item, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={`item-${index}`}
          className="rounded-xl border border-gray-200 overflow-hidden"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="flex items-center gap-3 w-full px-5 py-4 text-left bg-white hover:bg-orange-50/50 transition-colors group data-[state=open]:bg-orange-50/50"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {item.day || index + 1}
              </span>
              <span className="font-medium text-secondary flex-1">
                Day {item.day || index + 1} — {item.title}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-5 pb-5 pt-0">
              {item.description && (
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              )}
              {item.activities && item.activities.length > 0 && (
                <ul className="space-y-2">
                  {item.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-gray-600">{activity.activity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

export default ItineraryAccordion
