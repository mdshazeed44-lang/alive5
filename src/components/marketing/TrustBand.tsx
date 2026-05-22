import { Marquee } from '@/components/motion/Marquee';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';

const SECTORS = [
  'Professional sports',
  'College athletics',
  'Government',
  'Higher education',
  'Healthcare',
  'Retail & eCommerce',
  'Tourism',
];

export function TrustBand() {
  return (
    <Container className="py-14">
      <FadeUp>
        <p className="text-center text-small text-grey-500">
          Trusted by professional and college sports, government, higher education, and retail
        </p>
      </FadeUp>
      <div className="mt-8">
        <Marquee>
          {SECTORS.map((s) => (
            <span
              key={s}
              className="whitespace-nowrap text-h4 font-semibold text-grey-300 transition-colors hover:text-grey-500"
            >
              {s}
            </span>
          ))}
        </Marquee>
      </div>
    </Container>
  );
}
