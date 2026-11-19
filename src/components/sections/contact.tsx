import { site } from "@/content";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Rule } from "@/components/ui/rule";
import { TextLink } from "@/components/ui/text-link";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const rows = [
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\D/g, "")}`,
  },
  { label: "LinkedIn", value: bare(site.linkedin), href: site.linkedin },
  { label: "Website", value: bare(site.website), href: site.website },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-teal text-ink pt-20 pb-12 md:pt-32 md:pb-16"
    >
      <Container>
        <Label tone="current">Contact</Label>
        <h2 className="font-display text-display mt-8 leading-[0.95] tracking-[-0.02em]">
          {site.name}
        </h2>

        <p className="font-display text-h1 mt-12 leading-[1.05] [overflow-wrap:anywhere] md:mt-16">
          <TextLink href={`mailto:${site.email}`} cursor="Open" noIcon>
            {site.email}
          </TextLink>
        </p>

        <Rule className="mt-14 md:mt-20" />
        <ul>
          {rows.map((r) => (
            <li key={r.label}>
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[12rem_1fr] md:py-6">
                <Label tone="current" className="opacity-75">
                  {r.label}
                </Label>
                <TextLink
                  href={r.href}
                  cursor="Open"
                  className="text-lead [overflow-wrap:anywhere]"
                >
                  {r.value}
                </TextLink>
              </div>
              <Rule />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
