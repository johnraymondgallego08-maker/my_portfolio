import type { ReactNode } from "react";

type ListBlock = {
  type: "list";
  items: string[];
};

type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type ImageBlock = {
  type: "image";
  alt: string;
  src: string;
};

type MarkdownBlock = HeadingBlock | ParagraphBlock | ListBlock | ImageBlock;

export function MarkdownContent({ source }: { source: string }) {
  const blocks = parseMarkdownBlocks(source);

  return (
    <div className="min-w-0 space-y-6 break-words text-base leading-8 text-slate-700">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function renderBlock(block: MarkdownBlock, index: number): ReactNode {
  if (block.type === "heading") {
    const Heading = block.level === 2 ? "h2" : "h3";

    return (
      <Heading
        className="break-words border-l-4 border-moss pl-4 text-xl font-semibold tracking-normal text-navy transition duration-300 hover:translate-x-1 hover:text-clay sm:text-2xl"
        key={`${block.text}-${index}`}
      >
        {block.text}
      </Heading>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-3 pl-5 sm:pl-6" key={`list-${index}`}>
        {block.items.map((item) => (
          <li className="transition duration-300 hover:translate-x-1 hover:text-navy" key={item}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="overflow-hidden rounded-md border border-clay/15 bg-white/70 p-3 shadow-soft" key={`${block.src}-${index}`}>
        <img
          alt={block.alt}
          className="w-full rounded-sm border border-clay/10 object-cover"
          loading="lazy"
          src={block.src}
        />
        {block.alt ? (
          <figcaption className="mt-3 text-sm leading-6 text-slate-500">
            {block.alt}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <p className="transition duration-300 hover:text-navy" key={`${block.text}-${index}`}>
      {block.text}
    </p>
  );
}

function parseMarkdownBlocks(source: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = source.split(/\r?\n/);
  let paragraph: string[] = [];
  let listItems: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3) });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4) });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    const imageMatch = trimmed.match(/^!\[(.*)\]\((.+)\)$/);

    if (imageMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "image",
        alt: imageMatch[1].trim(),
        src: imageMatch[2].trim()
      });
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}
