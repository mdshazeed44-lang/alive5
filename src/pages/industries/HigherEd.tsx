import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  Bell,
  Users,
  Calendar,
} from 'lucide-react';
import { IndustryPage } from '@/pages/IndustryPage';

export default function HigherEd() {
  return (
    <IndustryPage
      slug="sms-for-admissions-and-recruiting"
      eyebrow="INDUSTRIES • HIGHER EDUCATION"
      titleStart="SMS for admissions"
      titleHighlight="& student success"
      intro="Reach Gen-Z applicants where they actually respond. Boost yield, reduce melt, and keep students enrolled with the same business number your office already uses."
      heroImage="/business-sms/edu.png"
      seoTitle="SMS for Higher Education, Admissions & Recruiting | Alive5"
      seoDescription="Boost admissions yield and retain students with personalized 2-way SMS. Trusted by colleges and universities. Compatible with Ellucian CRM Recruit."
      useCases={[
        {
          Icon: GraduationCap,
          title: 'Admissions outreach',
          body: 'Counselors text accepted students with deadline reminders and FAQ replies — auto-translated.',
        },
        {
          Icon: BookOpen,
          title: 'Enrollment & registration',
          body: 'Nudge students through every step: deposits, FAFSA, orientation, course selection.',
        },
        {
          Icon: Bell,
          title: 'Campus alerts',
          body: 'Weather closures, schedule changes, and urgent notices — straight to phones.',
        },
        {
          Icon: MessageCircle,
          title: 'Advisor office hours',
          body: 'Students text questions, get answered in seconds, no email backlog.',
        },
        {
          Icon: Users,
          title: 'Alumni engagement',
          body: 'Reunion RSVPs, giving days, mentorship matching — all by text.',
        },
        {
          Icon: Calendar,
          title: 'Event RSVPs',
          body: 'Open houses, info sessions, sports games — collect RSVPs and send day-of reminders.',
        },
      ]}
      stats={[
        { value: '90%+', label: 'of Gen-Z students prefer texting over phone calls' },
        { value: '33%', label: 'reduction in summer melt with SMS nudges' },
        { value: '< 1m', label: 'Average response time across the team inbox' },
      ]}
      benefits={[
        'FERPA-friendly, compliant workflows',
        'Native integration with Ellucian CRM Recruit',
        'Auto-translation in 70+ languages',
        'Counselor caseload routing & tagging',
        'Custom keyword flows (e.g. text "VISIT")',
        'Mobile + desktop app for advisors',
      ]}
      testimonial={{
        quote:
          'Our counselors went from chasing voicemails to answering 4× more student questions per day. Yield is up, students feel heard.',
        name: 'Director of Admissions',
        role: 'Top-tier US University',
      }}
    />
  );
}
