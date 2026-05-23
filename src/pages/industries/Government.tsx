import { Building2, ShieldCheck, FileText, Megaphone, Bell, Users } from 'lucide-react';
import { IndustryPage } from '@/pages/IndustryPage';

export default function Government() {
  return (
    <IndustryPage
      slug="gov"
      eyebrow="INDUSTRIES • GOVERNMENT"
      titleStart="Government-grade"
      titleHighlight="texting & notifications"
      intro="From courthouse appointments to citizen services and emergency alerts — reach residents on the channel they read first. SOC 2 + GDPR + private-VPC compliant."
      heroImage="/business-sms/sports.png"
      seoTitle="Government SMS Solutions | Alive5"
      seoDescription="Government-grade 2-way SMS for citizen services, court reminders, and emergency alerts. SOC 2 Type 2, GDPR, and PCI-DSS compliant. Trusted by US District Courts."
      useCases={[
        {
          Icon: Building2,
          title: 'Citizen services',
          body: 'Residents text questions about permits, taxes, trash schedules, and get answered 24/7.',
        },
        {
          Icon: Bell,
          title: 'Emergency alerts',
          body: 'Boil-water notices, evacuation orders, road closures — broadcast in seconds.',
        },
        {
          Icon: FileText,
          title: 'Court reminders',
          body: 'Reduce failure-to-appear rates with automated hearing reminders and rescheduling.',
        },
        {
          Icon: Users,
          title: 'Constituent outreach',
          body: 'Mayor and council can run text-based town halls, polls, and feedback campaigns.',
        },
        {
          Icon: Megaphone,
          title: 'Public-health messaging',
          body: 'Vaccine clinics, mental-health resources, food assistance — meet people where they are.',
        },
        {
          Icon: ShieldCheck,
          title: 'Election information',
          body: 'Polling place lookups, hours, sample ballots — non-partisan voter info on demand.',
        },
      ]}
      stats={[
        { value: 'SOC 2', label: 'Type 2 audited security controls' },
        { value: '$67K', label: 'Annual revenue gained by reducing FTAs' },
        { value: '99.9%', label: 'Platform uptime over the last 12 months' },
      ]}
      benefits={[
        'SOC 2 Type 2 & GDPR compliant',
        'Private VPC deployment available',
        'BAA available for HIPAA workflows',
        'Single Sign-On (SSO) for staff',
        'Zero data retention by external LLMs',
        'Trusted by US District Courts',
      ]}
      testimonial={{
        quote:
          'Alive5 lets us notify residents within minutes of an incident — replacing a fragmented mess of email and robocalls with a single, dependable text channel.',
        name: 'County IT Director',
        role: 'Government Agency, USA',
      }}
    />
  );
}
