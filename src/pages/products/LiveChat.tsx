import { useEffect } from 'react';
import { ProductHero } from '@/components/sections/ProductHero';
import { FeatureSplit } from '@/components/sections/FeatureSplit';
import { CardGrid } from '@/components/sections/CardGrid';
import { StepProcess } from '@/components/sections/StepProcess';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Stagger, staggerItem } from '@/components/motion/FadeUp';
import { motion } from 'framer-motion';

const IMG = 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt';

const CHANNELS = [
  { image: `${IMG}/widgets-1920w.png`, title: 'Website widgets', body: 'Easily embed Alive5 into your website and apps.' },
  { image: `${IMG}/shortlinks-0e9bd9a9-1920w.png`, title: 'Short links', body: 'Start a chat anywhere with short URLs — online or offline.' },
  { image: `${IMG}/landingpages-1920w.png`, title: 'Popups & landing pages', body: 'Increase engagement within popups and landing pages.' },
];

const DISTRIBUTION = [
  { image: `${IMG}/ringall-a1d77a53-1920w.png`, title: 'Ring all agents', body: 'Notify all team members of an incoming chat.' },
  { image: `${IMG}/workflow-b0abbcfc-1920w.png`, title: 'Load balanced workflow', body: 'Assign chats using a distribution algorithm.' },
  { image: `${IMG}/offline-48da5d80-1920w.png`, title: 'Offline message flows', body: 'Never leave a customer waiting and always capture the lead.' },
  { image: `${IMG}/teamchannel-d2715702-1920w.png`, title: 'Team channels', body: 'Create segments or teams to respond to incoming chats.' },
];

const CONTACT_FEATURES = [
  { title: 'On-brand canned replies', body: 'Curate pre-approved templates and scripts for agents — greetings, FAQ responses, and more.' },
  { title: 'Mobile & desktop apps', body: 'Start a conversation on desktop and finish on mobile, so no chat is ever missed.' },
  { title: 'Reporting & analytics', body: 'Measure ROI, monitor performance, and review transcripts with real-time analytics.' },
  { title: 'Admin monitoring & QA', body: 'Review and respond to chats in real-time and capture feedback with post-chat surveys.' },
];

const WHY = [
  'Simple and easy to use for non-tech teams',
  'Instantly support more customers at scale',
  'Improve the quality of customer service',
  'Increase team productivity with a collaborative platform',
  'Build more trust and deeper relationships with customers',
];

const STEPS = [
  { image: `${IMG}/a5-home-1-b19e9542-1920w.png`, title: 'Book a demo', body: 'Our chat strategy team helps you identify a fit.' },
  { image: `${IMG}/a5-home-2-427a0f7a-1920w.png`, title: 'Tailor your solution', body: 'Define your KPIs, scripts, journeys, and calls to action.' },
  { image: `${IMG}/a5-home-3-1920w.png`, title: 'Team training', body: 'We get your team trained to get the most out of Alive5.' },
  { image: `${IMG}/a5-home-4-e81bef4b-1920w.png`, title: 'Activate your brand', body: 'Deploy your QR codes, chat links, and SMS outreach.' },
];

export default function LiveChat() {
  useEffect(() => {
    document.title = 'Live Chat Solution | Alive5';
  }, []);

  return (
    <>
      <ProductHero
        eyebrow="Live chat"
        title="Live chat reimagined"
        subtitle="Capture leads or create an automated support assistant that escalates to a team of human agents — combining automation, AI, and your people to help visitors get what they need, when they need it."
        primaryLabel="Schedule a live chat demo"
        primaryTo="/thank-you"
        secondaryLabel="Explore the platform"
        secondaryTo="/business-sms"
        image={`${IMG}/widgets-1920w.png`}
        imageAlt="Alive5 live chat widget embedded on a website"
      />

      <CardGrid
        eyebrow="Start conversations anywhere"
        title="Reach anyone, online or offline"
        subtitle="Embed a website widget, share a chat link, or scan a QR code. The webchat interface works for web and mobile, and integrates inside authenticated portals and apps."
        cards={CHANNELS}
        columns={3}
        className="bg-surface-page"
      />

      <FeatureSplit
        eyebrow="Skill based routing"
        title="Simple customer routing"
        body={[
          'Through a pre-chat questionnaire, chatters are routed to specific departments, then evenly distributed to agents.',
          'Chats can also be transferred across departments or sent directly to other reps — never worry about assigning a chat to the right person again.',
        ]}
        image={`${IMG}/routing-1920w.png`}
        imageAlt="Skill based chat routing diagram"
        className="bg-surface-soft"
      />

      <CardGrid
        title="Advanced features for distribution, routing, and offline engagement"
        cards={DISTRIBUTION}
        columns={4}
      />

      <FeatureSplit
        eyebrow="Contact manager"
        title="Keep track of every customer"
        body="Each time a conversation starts in Alive5, a new contact is created. When a customer comes back, you'll see their entire history and easily pick up where you left off."
        bullets={CONTACT_FEATURES.map((f) => f.title)}
        image={`${IMG}/crm-1920w.jpg`}
        imageAlt="Alive5 contact manager dashboard"
        reverse
        className="bg-surface-soft"
      />

      <Section>
        <SectionHeading
          eyebrow="Why live chat works"
          title="Built for teams, loved by customers"
          subtitle="Alive5 makes it easy to create customized, personal, engaging chat experiences — with PDFs, images, GIFs, emojis, and video."
        />
        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {WHY.map((w) => (
            <motion.div
              key={w}
              variants={staggerItem}
              className="flex items-center gap-4 rounded-2xl border border-grey-100 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex size-10 flex-none items-center justify-center rounded-full bg-orange-100 text-body font-bold text-alive5-orange">
                ✓
              </span>
              <span className="text-body font-medium text-grey-900">{w}</span>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      <StepProcess
        eyebrow="Take the leap forward"
        title="Up and running in four steps"
        steps={STEPS}
        className="bg-surface-soft"
      />

      <CTASection
        title="Ready to elevate your audience experience?"
        subtitle="Join a hands-on demo and see how Alive5 unifies live chat, SMS, and social into one A.I.-powered inbox."
        primaryLabel="Schedule a live chat demo"
        secondaryLabel="Back to home"
      />
    </>
  );
}
