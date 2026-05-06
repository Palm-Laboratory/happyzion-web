export function buildUploadPath(storedPath: string): string {
  const cleanPath = storedPath.replace(/^\/+/, "");
  return cleanPath ? `/upload/${cleanPath}` : "";
}
