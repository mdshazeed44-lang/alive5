import { Ticket, Megaphone, Users, Bell, Star, Trophy } from 'lucide-react';
import { IndustryPage } from '@/pages/IndustryPage';

export default function Sports() {
  return (
    <IndustryPage
      slug="sports"
      eyebrow="INDUSTRIES • PRO & COLLEGE SPORTS"
      titleStart="The texting platform"
      titleHighlight="pro & college sports trust"
      intro="Sell more season tickets, fill more seats, and engage your fan base with personalized SMS — at scale. Renew accounts in hours, not weeks."
      heroImage="/business-sms/sports.png"
      seoTitle="SMS for Pro & College Sports | Alive5"
      seoDescription="Drive season ticket renewals, fan engagement, and last-minute sales with SMS. Trusted by pro teams and university athletic departments."
      useCases={[
        {
          Icon: Ticket,
          title: 'Season ticket renewals',
          body: 'Personalized SMS reminders boost renewal rates by up to 40% versus email-only campaigns.',
        },
        {
          Icon: Megaphone,
          title: 'Last-minute promotions',
          body: 'Move unsold inventory the morning of game day with targeted broadcasts.',
        },
        {
          Icon: Bell,
          title: 'Game-day alerts',
          body: 'Weather updates, gate changes, parking info — instantly to thousands of fans.',
        },
        {
          Icon: Users,
          title: 'VIP fan club',
          body: 'Create a text-only loyalty tier with early access, exclusive merch drops, and presale codes.',
        },
        {
          Icon: Star,
          title: 'Donor cultivation',
          body: 'Concierge-level texts from your development team — boosting major gift conversion.',
        },
        {
          Icon: Trophy,
          title: 'Recruiting outreach',
          body: 'Coaching staff can text recruits and parents from a shared, NCAA-compliant inbox.',
        },
      ]}
      stats={[
        { value: '186', label: 'Season tickets renewed in one campaign at UTSA' },
        { value: '$37K', label: 'Added revenue from a single SMS push' },
        { value: '98%', label: 'Open rate within the first hour' },
      ]}
      benefits={[
        'Bring your own VoIP phone number',
        'NCAA-compliant texting workflows',
        'Bulk broadcasts with per-fan personalization',
        'Salesforce / Microsoft Dynamics CRM sync',
        'API + Zapier for custom integrations',
        'Done-for-you 10DLC registration',
      ]}
      testimonial={{
        quote:
          "TONS of responses and lots of inbound phone calls from that reminder text. Our text campaign helped us renew an additional 62 accounts — 186 season tickets for $37K!",
        name: 'Justin Rogers',
        role: 'Director of Ticket Sales, University of Texas at San Antonio',
      }}
    />
  );
}
