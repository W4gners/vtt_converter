interface SubtitleBlock {
  number: string;
  timestamp: string;
  text: string[];
}

function parseBlock(block: string): SubtitleBlock | null {
  const lines = block.trim().split('\n');
  
  // Find the timestamp line
  const timestampLineIndex = lines.findIndex(line => line.includes('-->'));
  if (timestampLineIndex === -1) return null;
  
  return {
    number: '',
    timestamp: lines[timestampLineIndex],
    text: lines.slice(timestampLineIndex + 1).filter(line => line.trim())
  };
}

function formatVttBlock(block: SubtitleBlock, index: number): string {
  return `${index}\n${block.timestamp}\n${block.text.join('\n')}`;
}

function cleanAndParseBlocks(content: string): SubtitleBlock[] {
  // Remove BOM and clean content
  const cleanContent = content.replace(/^\uFEFF/, '').trim();
  
  // Split into blocks and filter empty ones
  const blocks = cleanContent.split(/\n\s*\n/)
    .filter(block => block.trim())
    .map(block => block.trim());
  
  return blocks
    .map(block => parseBlock(block))
    .filter((block): block is SubtitleBlock => block !== null);
}

export function srtToVtt(srtContent: string): string {
  const blocks = cleanAndParseBlocks(srtContent);
  let vttContent = 'WEBVTT\n\n';
  
  blocks.forEach((block, index) => {
    vttContent += formatVttBlock(block, index + 1) + '\n\n';
  });
  
  return vttContent.trim() + '\n';
}

export function addVttNumbering(vttContent: string): string {
  // Remove any existing WEBVTT header and clean the content
  const cleanContent = vttContent.replace(/^WEBVTT\n+/, '').trim();
  const blocks = cleanAndParseBlocks(cleanContent);
  
  let numberedContent = 'WEBVTT\n\n';
  
  blocks.forEach((block, index) => {
    numberedContent += formatVttBlock(block, index + 1) + '\n\n';
  });
  
  return numberedContent.trim() + '\n';
}