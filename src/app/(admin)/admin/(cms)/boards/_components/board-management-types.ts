import type { TiptapDocument } from "@/lib/admin-board-editor-content";
import type {
  AdminBoardPostDetail,
  AdminBoardPostSummary,
  AdminBoardSummary,
} from "@/lib/admin-board-api";
import type { AdminMenuTreeNode } from "@/lib/admin-menu-api";

export interface BoardManagementClientProps {
  initialBoards: AdminBoardSummary[];
  initialBoardMenus: AdminMenuTreeNode[];
  initialPosts?: AdminBoardPostSummary[];
  initialPost?: AdminBoardPostDetail | null;
  currentUserId?: string;
  currentUserRole?: string;
}

export type Draft = {
  title: string;
  isPublic: boolean;
  isPinned: boolean;
  contentJson: TiptapDocument | Record<string, unknown>;
  contentHtml: string;
};

export type ScreenMode = "list" | "editor";

export type AttachmentAsset = {
  id: string;
  originalFilename: string;
  byteSize?: number;
};

export type PendingAttachmentItem = {
  tempId: string;
  filename: string;
  byteSize: number;
  progress: number;
};

export type BoardPostListItem = AdminBoardPostSummary & {
  boardSlug: string;
  boardMenuId: number;
  boardMenuLabel: string;
};

export const BOARD_POSTS_PAGE_SIZE = 20;
export const DISPLAY_PAGE_SIZE = 20;
