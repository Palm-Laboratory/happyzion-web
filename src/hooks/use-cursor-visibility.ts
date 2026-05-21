"use client"

import type { Editor } from "@tiptap/react"
import { useWindowSize } from "@/hooks/use-window-size"
import { useBodyRect } from "@/hooks/use-element-rect"
import { useEffect } from "react"

export interface CursorVisibilityOptions {
  /**
   * The Tiptap editor instance
   */
  editor?: Editor | null
  /**
   * Reference to the toolbar element that may obscure the cursor
   */
  overlayHeight?: number
  /**
   * Whether to enable cursor visibility tracking.
   * Should only be enabled on mobile where the toolbar floats at the bottom.
   */
  enabled?: boolean
}

/**
 * Custom hook that ensures the cursor remains visible when typing in a Tiptap editor.
 * Automatically scrolls the window when the cursor would be hidden by the toolbar.
 *
 * @param options.editor The Tiptap editor instance
 * @param options.overlayHeight Toolbar height to account for
 * @returns The bounding rect of the body
 */
export function useCursorVisibility({
  editor,
  overlayHeight = 0,
  enabled = false,
}: CursorVisibilityOptions) {
  const { height: windowHeight } = useWindowSize()
  const rect = useBodyRect({
    enabled,
    throttleMs: 100,
    useResizeObserver: enabled,
  })

  useEffect(() => {
    if (!enabled) return

    const ensureCursorVisibility = () => {
      if (!editor) return

      const { state, view } = editor
      if (!view.hasFocus()) return

      // Get current cursor position coordinates
      const { from } = state.selection
      const cursorCoords = view.coordsAtPos(from)

      if (windowHeight < rect.height && cursorCoords) {
        const availableSpace = windowHeight - cursorCoords.top

        // If the cursor is hidden behind the overlay or offscreen, scroll it into view
        if (availableSpace < overlayHeight) {
          const targetCursorY = Math.max(windowHeight / 2, overlayHeight)
          const currentScrollY = window.scrollY
          const cursorAbsoluteY = cursorCoords.top + currentScrollY
          const newScrollY = cursorAbsoluteY - targetCursorY

          window.scrollTo({
            top: Math.max(0, newScrollY),
            behavior: "smooth",
          })
        }
      }
    }

    ensureCursorVisibility()
  }, [enabled, editor, overlayHeight, windowHeight, rect.height])

  return rect
}
