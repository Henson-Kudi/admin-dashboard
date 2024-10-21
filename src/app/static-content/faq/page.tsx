import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs as Faqs } from '@/lib/constants'
import React from 'react'

export default function FaqPage() {
const faqs = Faqs

  return (
    <Accordion type='single' collapsible>
      {
        faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
