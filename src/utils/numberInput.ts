export function parseNumberList(input: string, fallback: number[]): number[] {
  const parsed = input
    .split(/[\s,;]+/)
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));

  return parsed.length > 0 ? parsed : fallback;
}

export function parseSortedNumberList(input: string, fallback: number[]): number[] {
  return [...parseNumberList(input, fallback)].sort((a, b) => a - b);
}

