import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { Inline } from '@/lib/markdown';

export function InlineText({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.t === 'bold') return <strong key={i} className="font-semibold text-grey-900">{n.v}</strong>;
        if (n.t === 'link') {
          if (n.external) {
            return (
              <a
                key={i}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-alive5-orange underline-offset-2 hover:underline"
              >
                {n.v}
              </a>
            );
          }
          return (
            <Link key={i} to={n.href} className="font-medium text-alive5-orange underline-offset-2 hover:underline">
              {n.v}
            </Link>
          );
        }
        return <Fragment key={i}>{n.v}</Fragment>;
      })}
    </>
  );
}
