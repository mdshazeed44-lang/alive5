import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';

const CLIENTS = [
  { name: 'MyPlates', src: '/logos/logo-myplates-640w.png' },
  { name: 'US District Courts', src: '/logos/logo-uscourts-55d77c8a-640w.png' },
  { name: 'Orlando City SC', src: '/logos/logo-orlando-640w.png' },
  { name: 'Collegeboxes', src: '/logos/logo-collegeboxes-640w.png' },
];

export function TrustBand() {
  return (
    <Container className="py-14">
      <FadeUp>
        <p className="text-center text-small text-grey-500">
          Trusted by professional and college sports, government, higher education, and retail
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 md:gap-x-20">
          {CLIENTS.map((c) => (
            <img
              key={c.name}
              src={c.src}
              alt={c.name}
              loading="lazy"
              className="h-20 w-auto max-w-[260px] object-contain transition-transform duration-300 hover:scale-105 md:h-24"
            />
          ))}
        </div>
      </FadeUp>
    </Container>
  );
}
