import type { FinanceParsedLine } from "@/lib/admin-finance-types";

export const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export type MajorGroup = {
  major: string;
  lines: FinanceParsedLine[];
  subtotal: number;
};

/** 라인 배열을 (direction, major)별로 그룹화. 입력 순서를 보존. */
export function groupByMajor(lines: FinanceParsedLine[]): {
  incomeMajors: MajorGroup[];
  expenseMajors: MajorGroup[];
} {
  const groups = new Map<string, MajorGroup>();
  for (const line of lines) {
    const key = `${line.direction}::${line.major}`;
    let g = groups.get(key);
    if (!g) {
      g = { major: line.major, lines: [], subtotal: 0 };
      groups.set(key, g);
    }
    g.lines.push(line);
    g.subtotal += line.amount;
  }
  const incomeMajors: MajorGroup[] = [];
  const expenseMajors: MajorGroup[] = [];
  for (const [key, g] of groups) {
    if (key.startsWith("INCOME::")) incomeMajors.push(g);
    else expenseMajors.push(g);
  }
  return { incomeMajors, expenseMajors };
}
