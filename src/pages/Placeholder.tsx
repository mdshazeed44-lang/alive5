import { Link, useLocation } from 'react-router-dom';
import { ROUTES, cleanTitle } from '@/data/routes';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Placeholder() {
  const { pathname } = useLocation();
  const meta = ROUTES.find((r) => r.route === pathname);
  const title = meta ? cleanTitle(meta.title) || meta.slug : 'Page';

  return (
    <>
      <SEOHead
        title={`${title} | Alive5`}
        description={`${title} — Alive5 is the unified A.I. chatbot inbox for SMS, web chat, and social messaging. Trusted by pro sports, government, and higher education.`}
        canonical={`https://www.alive5.com${pathname}`}
      />

      <section className="bg-gradient-to-b from-orange-50 to-surface-page pt-40 pb-28 dark:from-[#2a1b14] dark:to-grey-900">
        <Container className="max-w-3xl text-center">
          <FadeUp>
            <p className="mb-4 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              Coming soon
            </p>
            <h1 className="text-h2 text-grey-900 md:text-h1">{title}</h1>
            <p className="mt-6 text-body-lg text-grey-700">
              This page is part of the redesign and is being rebuilt with the new design system.
              The content is ready — the layout lands in a later build phase.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/" className="btn-orange !px-7 !py-4 text-body">
                Back to home
              </Link>
              <a
                href="https://calendly.com/rohit-consult"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-7 !py-4 text-body"
              >
                Schedule a demo
              </a>
            </div>
            {meta && (
              <p className="mt-10 text-legal text-grey-400">
                Route <code className="rounded bg-grey-100 px-1.5 py-0.5 dark:bg-grey-800">{meta.route}</code> · content{' '}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 dark:bg-grey-800">{meta.content_file}</code>
              </p>
            )}
          </FadeUp>
        </Container>
      </section>
    </>
  );
}
