import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Alive5?',
    a: 'Alive5 unifies SMS, live chat, and social messaging with A.I. trained exclusively on your business content. The A.I. answers routine questions with around 90% accuracy, then escalates complex issues to your team through intelligent routing rules — so your people focus on high-value interactions while A.I. handles the rest.',
  },
  {
    q: 'How does the 60-day pilot work?',
    a: 'A flat $500 covers your complete 60-day trial regardless of volume. We set up your channels, upload and organize your content, configure A.I. training and routing rules, and train your team. The real usage data lets us accurately predict your ongoing costs before you go live.',
  },
  {
    q: 'How accurate is the A.I., and what if it gives a wrong answer?',
    a: 'The A.I. typically answers 70–90% of questions correctly. Because it is trained only on your content, hallucinations are minimized. When it is not confident, customers can escalate to your team instantly, and feedback reports show which questions to improve.',
  },
  {
    q: 'How long does it take to set up and train the A.I.?',
    a: 'Initial training takes under 30 seconds — upload your content and click train. Our team handles the full configuration during your pilot, and most businesses are answering customer questions within a few days.',
  },
  {
    q: 'What content can I use to train the A.I.?',
    a: 'Website pages, PDFs, Word documents, product manuals, pricing guides, FAQ sections, support articles, and custom text answers. It works best with well-organized, factual content — start with your most-used support material and expand.',
  },
  {
    q: 'How does the A.I. decide when to escalate to a human?',
    a: 'It escalates when it cannot find a relevant answer, when a customer explicitly asks for a person, when a conversation gets complex, or based on triggers you configure. You have full control over the escalation rules.',
  },
  {
    q: 'Is my business data secure? Where is it stored?',
    a: 'Your data is encrypted in transit and at rest on secure AWS infrastructure. We never use your content to train other models or share it with other customers. Alive5 is SOC 2 Type 2 and GDPR compliant.',
  },
  {
    q: "How do I measure ROI and track the A.I.'s performance?",
    a: 'Dashboards track A.I. success rates, response times, customer satisfaction, and support-workload reduction. Most customers see a large drop in routine tickets and faster responses, with clear visibility into interactions resolved without a human.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="bg-surface-soft">
      <SectionHeading eyebrow="FAQs" title="Questions, answered" subtitle="Everything you need to know about Alive5 and the pilot." />
      <Container className="mt-12 max-w-3xl !px-0">
        <div className="divide-y divide-grey-100 overflow-hidden rounded-2xl border border-grey-100 bg-white">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-body font-semibold text-grey-900">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-orange-100 text-alive5-orange"
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-body text-grey-700">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
