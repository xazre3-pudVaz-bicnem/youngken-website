import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { faqJsonLd, jsonLdScript, type Faq } from '@/lib/jsonld';

export function FaqList({
  faqs,
  title = 'よくあるご質問',
  eyebrow = 'FAQ',
  tone = 'paper-2',
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  tone?: 'paper' | 'paper-2' | 'paper-3';
}) {
  return (
    <Section tone={tone}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))}
      />
      <Container>
        <Reveal>
          <SectionTitle eyebrow={eyebrow}>{title}</SectionTitle>
        </Reveal>

        <dl className="mt-12 border-t border-rule">
          {faqs.map((faq, i) => (
            <Reveal
              key={faq.q}
              delay={Math.min(i, 4) * 60}
              className="border-b border-rule py-8"
            >
              <dt className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-mincho text-[1rem] text-enji"
                >
                  Q
                </span>
                <span className="font-mincho text-[1.08rem] leading-[1.75] tracking-[0.05em] text-sumi sm:text-[1.15rem]">
                  {faq.q}
                </span>
              </dt>
              <dd className="mt-5 flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-mincho text-[1rem] text-sumi-3"
                >
                  A
                </span>
                <span className="text-[0.92rem] leading-[2.1] text-sumi-2">{faq.a}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
