import { projects } from "@/content";
import type { Project } from "@/types/content";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { CaseFile } from "./case-file";
import { ListenLink, PressRow, StatCount } from "./case-extras";
import { WHOLENESS_EVIDENCE } from "@/lib/wholeness";
import { WholenessEvidence } from "./wholeness-evidence";

/** Per-project pieces (task 6). Returns the project to render + its extras. */
function specifics(p: Project) {
  switch (p.slug) {
    case "locks-of-liz":
      return { project: p, extra: <PressRow /> };
    case "wholeness-acupuncture":
      return {
        project: {
          ...p,
          images: p.images.filter(
            (i) =>
              !WHOLENESS_EVIDENCE.some((n) => i.src.endsWith(`/${n}.webp`)),
          ),
        },
        extra: <WholenessEvidence images={p.images} />,
      };
    case "boss-babes-brunch":
      return {
        project: p,
        extra: p.stat ? <StatCount stat={p.stat} /> : null,
      };
    case "work-drama": {
      const listen = p.links?.find((l) => /^listen/i.test(l.label));
      return {
        project: { ...p, links: p.links?.filter((l) => l !== listen) },
        extra: listen ? <ListenLink link={listen} /> : null,
      };
    }
    default:
      return { project: p, extra: null };
  }
}

export function Projects() {
  const first = projects[0]?.number ?? "01";
  const last = projects[projects.length - 1]?.number ?? "04";

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="pt-20 md:pt-32"
    >
      <Container className="flex items-end justify-between gap-6">
        <Label as="h2" id="projects-title">
          Selected Work
        </Label>
        <p
          aria-hidden="true"
          className="font-display text-mega leading-[0.85] tracking-[-0.03em] tabular-nums"
        >
          {first}–{last}
        </p>
      </Container>

      {projects.map((p) => {
        const s = specifics(p);
        return (
          <CaseFile
            key={p.slug}
            project={s.project}
            total={projects.length}
          >
            {s.extra}
          </CaseFile>
        );
      })}
    </section>
  );
}
