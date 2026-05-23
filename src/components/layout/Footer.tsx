import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';

const LOGO_WHITE = 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_WHT_2023-1920w.png';

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'A.I. chatbot', to: '/' },
      { label: 'Live chat', to: '/live-chat' },
      { label: 'Business SMS', to: '/business-sms' },
      { label: 'Chatbots', to: '/chatbots' },
      { label: 'Facebook Messenger', to: '/facebook-messenger' },
      { label: 'QR codes', to: '/qr-codes' },
      { label: 'CRM', to: '/crm' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Sports', to: '/sports' },
      { label: 'Government', to: '/gov' },
      { label: 'Higher education', to: '/sms-for-admissions-and-recruiting' },
      { label: 'Health & wellness', to: '/sms-for-health-and-wellness' },
      { label: 'Retail', to: '/retail' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Playbooks', to: '/playbooks' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'How pricing works', to: '/how-pricing-works' },
      { label: 'Service status', to: '/service-status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about-us' },
      { label: 'Contact us', to: '/contact-us' },
      { label: 'Careers', to: '/employment-opportunities' },
      { label: 'Security overview', to: '/security-overview' },
    ],
  },
];

const LEGAL: { label: string; to: string }[] = [
  { label: 'Privacy', to: '/privacy-policy' },
  { label: 'Terms of service', to: '/terms-of-service' },
  { label: 'GDPR', to: '/gdpr-policy' },
  { label: 'Cookie policy', to: '/cookie-policy' },
  { label: 'Disclosure', to: '/disclosure' },
];

export function Footer() {
  return (
    <footer className="bg-grey-900 text-grey-300">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <img src={LOGO_WHITE} alt="Alive5" className="h-9 w-auto" />
            <p className="mt-5 max-w-xs text-small text-grey-400">
              Personalized answers powered by your knowledge, 24/7 — across live chat, SMS, and social.
            </p>
            <div className="mt-6 flex items-center gap-3 text-small text-grey-400">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-accent-green animate-status-pulse" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-green" />
              </span>
              All systems operational
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-small font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-small text-grey-400 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-legal text-grey-500">
            © {new Date().getFullYear()} Alive Technologies Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <Link key={l.to} to={l.to} className="text-legal text-grey-500 transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com/wearealive5"
              aria-label="Alive5 on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-500 transition-colors hover:text-white"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="https://twitter.com/wearealive5"
              aria-label="Alive5 on Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-500 transition-colors hover:text-white"
            >
              <Twitter className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/alive5/"
              aria-label="Alive5 on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-500 transition-colors hover:text-white"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
