"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { TiptapDocument } from "@/lib/admin-board-editor-content";
import type { AdminUploadAssetMetadata } from "@/lib/admin-upload-client";

interface BoardPostEditorProps {
  value: TiptapDocument | Record<string, unknown>;
  onChange: (value: TiptapDocument | Record<string, unknown>, html: string) => void;
  onImageUpload: (file: File) => Promise<AdminUploadAssetMetadata>;
  onImageUploadError?: (error: Error) => void;
  disabled?: boolean;
}

export default function BoardPostEditor({
  value,
  onChange,
  onImageUpload,
  onImageUploadError,
  disabled = false,
}: BoardPostEditorProps) {
  return (
    <SimpleEditor
      value={value}
      onChange={onChange}
      onImageUpload={onImageUpload}
      onImageUploadError={onImageUploadError}
      disabled={disabled}
      contained
    />
  );
}
