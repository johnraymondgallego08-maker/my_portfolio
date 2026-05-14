import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about John Raymond Gallego, a student from the University of Eastern Pangasinan completing OJT at Makerspace InnovHub."
};

export default function AboutPage() {
  return <AboutContent />;
}
