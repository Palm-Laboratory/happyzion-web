import { z } from "zod";
import type { BoardPostSavePayload } from "@/lib/admin-board-api";

export const boardPostSavePayloadSchema = z.object({
  menuId: z.union([z.string(), z.number()]).nullable().optional(),
  title: z.string().trim().min(1, "게시글 제목을 입력해 주세요."),
  contentJson: z.record(z.string(), z.unknown()),
  contentHtml: z.string(),
  isPublic: z.boolean(),
  isPinned: z.boolean(),
  assetIds: z.array(z.union([z.string(), z.number()])),
});

export function validateBoardPostSavePayload(payload: BoardPostSavePayload) {
  const result = boardPostSavePayloadSchema.safeParse(payload);
  if (result.success) {
    return null;
  }

  return result.error.issues[0]?.message ?? "게시글 입력값이 올바르지 않습니다.";
}
