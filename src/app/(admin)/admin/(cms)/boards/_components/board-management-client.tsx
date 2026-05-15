"use client";

import { BoardManagementEditor } from "./board-management-editor";
import { BoardManagementList } from "./board-management-list";
import type { BoardManagementClientProps } from "./board-management-types";
import { useBoardManagementController } from "./use-board-management-controller";

export default function BoardManagementClient(props: BoardManagementClientProps) {
  const controller = useBoardManagementController(props);

  if (controller.screenMode === "list") {
    return <BoardManagementList controller={controller} />;
  }

  return <BoardManagementEditor controller={controller} />;
}
