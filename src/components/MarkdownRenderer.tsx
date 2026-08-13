import React from "react";

type MarkdownRendererProps = {
  content: string;
};

// Helper function to render inline styles (bold, inline code, citations)
function parseInlineStyles(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Combine patterns into a single regex with capturing groups
  // Group 1: Bold (**text**)
  // Group 2: Inline code (`code`)
  // Group 3: Citation ([number])
  const regex = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[(\d+)\])/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;

    // Add preceding normal text
    if (matchIndex > currentIndex) {
      parts.push(text.substring(currentIndex, matchIndex));
    }

    if (match[1]) {
      // Bold
      parts.push(<strong key={matchIndex}>{match[2]}</strong>);
    } else if (match[3]) {
      // Inline code
      parts.push(<code className="inline-code" key={matchIndex}>{match[4]}</code>);
    } else if (match[5]) {
      // Citation
      const num = match[6];
      parts.push(
        <sup key={matchIndex} className="citation-sup">
          [{num}]
        </sup>
      );
    }

    currentIndex = regex.lastIndex;
  }

  // Add remaining normal text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Normalize newlines and split into blocks by blank lines
  const normalized = content.replace(/\r\n/g, "\n");
  
  // First, parse code blocks separate from normal double newline splitting
  const blocks: React.ReactNode[] = [];
  let remaining = normalized;
  
  while (remaining.length > 0) {
    const codeBlockStartIndex = remaining.indexOf("```");
    if (codeBlockStartIndex !== -1) {
      // Add text before code block
      const beforeCode = remaining.substring(0, codeBlockStartIndex);
      if (beforeCode.trim()) {
        blocks.push(...parseNonCodeBlocks(beforeCode));
      }
      
      // Find end of code block
      const codeBlockEndIndex = remaining.indexOf("```", codeBlockStartIndex + 3);
      if (codeBlockEndIndex !== -1) {
        const codeContent = remaining.substring(codeBlockStartIndex + 3, codeBlockEndIndex);
        // Exclude the language tag if it exists (e.g. js, ts, sql, plaintext)
        const lines = codeContent.split("\n");
        let displayCode = codeContent;
        if (lines.length > 0 && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
          displayCode = lines.slice(1).join("\n");
        }
        
        blocks.push(
          <pre className="code-block" key={blocks.length + remaining}>
            <code>{displayCode.trim()}</code>
          </pre>
        );
        remaining = remaining.substring(codeBlockEndIndex + 3);
      } else {
        // Unclosed code block
        blocks.push(
          <pre className="code-block" key={blocks.length + remaining}>
            <code>{remaining.substring(codeBlockStartIndex + 3).trim()}</code>
          </pre>
        );
        remaining = "";
      }
    } else {
      // No more code blocks
      blocks.push(...parseNonCodeBlocks(remaining));
      remaining = "";
    }
  }

  return <div className="markdown-renderer">{blocks}</div>;
}

function parseNonCodeBlocks(text: string): React.ReactNode[] {
  const rawBlocks = text.split(/\n\n+/);
  const blocks: React.ReactNode[] = [];

  rawBlocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const blockKey = `${trimmed.substring(0, 10)}-${index}`;

    // 1. Headers
    if (trimmed.startsWith("## ")) {
      blocks.push(<h2 key={blockKey}>{parseInlineStyles(trimmed.substring(3))}</h2>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push(<h3 key={blockKey}>{parseInlineStyles(trimmed.substring(4))}</h3>);
      return;
    }
    if (trimmed.startsWith("#### ")) {
      blocks.push(<h4 key={blockKey}>{parseInlineStyles(trimmed.substring(5))}</h4>);
      return;
    }

    // 2. Horizontal Rule
    if (trimmed === "---" || trimmed === "------------------------------") {
      blocks.push(<hr key={blockKey} className="markdown-hr" />);
      return;
    }

    // 3. Lists (Bulleted or numbered)
    const lines = trimmed.split("\n");
    const isBulletList = lines.every(line => {
      const t = line.trim();
      return t.startsWith("* ") || t.startsWith("- ") || t.startsWith("• ");
    });

    if (isBulletList && lines.length > 0) {
      blocks.push(
        <ul key={blockKey} className="markdown-ul">
          {lines.map((line, lIdx) => {
            const cleanLine = line.trim().replace(/^[-*•]\s+/, "");
            return <li key={lIdx}>{parseInlineStyles(cleanLine)}</li>;
          })}
        </ul>
      );
      return;
    }

    const isNumberedList = lines.every(line => {
      const t = line.trim();
      return /^\d+\.\s+/.test(t);
    });

    if (isNumberedList && lines.length > 0) {
      blocks.push(
        <ol key={blockKey} className="markdown-ol">
          {lines.map((line, lIdx) => {
            const cleanLine = line.trim().replace(/^\d+\.\s+/, "");
            return <li key={lIdx}>{parseInlineStyles(cleanLine)}</li>;
          })}
        </ol>
      );
      return;
    }

    // 4. Tables
    if (trimmed.startsWith("|") && lines.length >= 2) {
      const headerRow = lines[0].split("|").map(s => s.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
      const separatorRow = lines[1].split("|").map(s => s.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
      
      const isTable = separatorRow.every(cell => /^:?-+:?$/.test(cell)) && headerRow.length > 0;
      
      if (isTable) {
        const bodyRows = lines.slice(2).map(row => {
          return row.split("|").map(s => s.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
        });

        blocks.push(
          <div key={blockKey} className="table-wrap markdown-table-wrap">
            <table className="markdown-table">
              <thead>
                <tr>
                  {headerRow.map((head, hIdx) => (
                    <th key={hIdx}>{parseInlineStyles(head)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{parseInlineStyles(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return;
      }
    }

    // 5. Default Paragraph
    if (lines.length > 1) {
      blocks.push(
        <p key={blockKey}>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {parseInlineStyles(line)}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    } else {
      blocks.push(<p key={blockKey}>{parseInlineStyles(trimmed)}</p>);
    }
  });

  return blocks;
}
