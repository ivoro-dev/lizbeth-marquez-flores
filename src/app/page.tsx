import {
  About,
  Approach,
  Contact,
  Cover,
  ListenWatch,
  Projects,
  RoundCarousel,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Cover />
      <RoundCarousel />
      <About />
      <Projects />
      <ListenWatch />
      <Approach />
      <Contact />
    </>
  );
}
