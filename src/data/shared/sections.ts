import type { Section } from "../../types/appState";

function section(chapterNum: number, index: number, num: string, title: string, estMinutes: number): Section {
  return { id: `ch-${chapterNum}-s${index}`, num, title, estMinutes };
}

// The PragProg edition's TOC lists section titles only, with no section numbers
// and no sub-subsections — num is our own 1.1, 1.2, ... sequencing for navigation.
const ch1: Section[] = [
  section(1, 1, "1.1", "Vibe Coding a Game", 15),
  section(1, 2, "1.2", "Improving Your Prompts", 15),
  section(1, 3, "1.3", "Writing a More Complex Game with AI", 20),
  section(1, 4, "1.4", "What Went Wrong", 15),
  section(1, 5, "1.5", "Using Specifications to Drive Assistants", 20),
  section(1, 6, "1.6", "What We Learned", 10),
];

const ch2: Section[] = [
  section(2, 1, "2.1", "Keep the Edge", 15),
  section(2, 2, "2.2", "One Prompt, One Commit", 15),
  section(2, 3, "2.3", "An AI with Good Habits", 15),
  section(2, 4, "2.4", "Building an Application Following Rules", 25),
  section(2, 5, "2.5", "Results and Reflections", 15),
  section(2, 6, "2.6", "What We Learned", 10),
];

const ch3: Section[] = [
  section(3, 1, "3.1", "The Inception", 10),
  section(3, 2, "3.2", "Shaping the Idea", 15),
  section(3, 3, "3.3", "Walking Skeleton", 15),
  section(3, 4, "3.4", "Modeling the Domain", 15),
  section(3, 5, "3.5", "Developing the Search UI", 20),
  section(3, 6, "3.6", "Show PDFs", 10),
  section(3, 7, "3.7", "What We Learned", 10),
];

const ch4: Section[] = [
  section(4, 1, "4.1", "Managing Technical Debt", 15),
  section(4, 2, "4.2", "Understanding Legacy Code", 15),
  section(4, 3, "4.3", "Enhancing Big Code Projects with AI", 20),
  section(4, 4, "4.4", "Is It All Worth It?", 10),
  section(4, 5, "4.5", "Cheat Sheet for the AI Powered Developer", 15),
  section(4, 6, "4.6", "What We Learned", 10),
];

const ch5: Section[] = [
  section(5, 1, "5.1", "Adopting AI", 15),
  section(5, 2, "5.2", "Team Organization", 15),
  section(5, 3, "5.3", "Security Risks", 15),
  section(5, 4, "5.4", "What We Learned", 10),
];

// Appendix A1, tracked as chapter 6 in this app's sequencing (see chapterMeta.ts).
const chA1: Section[] = [
  section(6, 1, "6.1", "Attention Is All You Need", 20),
  section(6, 2, "6.2", "What Are Large Language Models?", 15),
  section(6, 3, "6.3", "Vector Databases", 15),
  section(6, 4, "6.4", "Considerations", 10),
];

export const SECTIONS_BY_CHAPTER: Record<number, Section[]> = {
  1: ch1,
  2: ch2,
  3: ch3,
  4: ch4,
  5: ch5,
  6: chA1,
};
