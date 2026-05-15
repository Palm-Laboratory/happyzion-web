import { z } from "zod";

const menuStatusSchema = z.enum(["DRAFT", "PUBLISHED", "HIDDEN", "ARCHIVED"]);
const menuTypeSchema = z.enum([
  "FOLDER",
  "STATIC",
  "BOARD",
  "EXTERNAL_LINK",
  "YOUTUBE_PLAYLIST_GROUP",
  "YOUTUBE_PLAYLIST",
]);

const baseNodeSchema = z.object({
  id: z.number().nullable(),
  type: menuTypeSchema,
  status: menuStatusSchema,
  label: z.string().min(1, "메뉴 이름을 입력해 주세요."),
  slug: z.string(),
  slugCustomized: z.boolean(),
  staticPageKey: z.string().nullable(),
  boardKey: z.string().nullable(),
  boardType: z.string().nullable(),
  externalUrl: z.string().nullable(),
  openInNewTab: z.boolean(),
  isAuto: z.boolean(),
  playlistContentForm: z.string().nullable(),
});

type MenuTreeNodePayload = z.infer<typeof baseNodeSchema> & {
  children: MenuTreeNodePayload[];
};

export const menuTreeNodeSchema: z.ZodType<MenuTreeNodePayload> = baseNodeSchema
  .extend({
    children: z.lazy(() => menuTreeNodeSchema.array()),
  })
  .superRefine((node, ctx) => {
    if (node.type === "STATIC" && !node.staticPageKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `'${node.label}' 메뉴의 연결 페이지를 선택해 주세요.`,
      });
    }
    if (node.type === "BOARD" && !node.boardKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `'${node.label}' 게시판 메뉴의 게시판 키가 없습니다.`,
      });
    }
    if (node.type === "EXTERNAL_LINK" && !node.externalUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `'${node.label}' 메뉴의 외부 URL을 입력해 주세요.`,
      });
    }
  });

export const menuTreePayloadSchema = z.object({
  items: menuTreeNodeSchema.array(),
});
