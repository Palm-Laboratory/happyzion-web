export type AdminUploadAssetKind = "INLINE_IMAGE" | "FILE_ATTACHMENT" | "MAIN_VIDEO";

export interface AdminUploadDirectRequest {
  file: File;
  kind: AdminUploadAssetKind;
  rawToken: string;
}

export interface AdminUploadAssetMetadata {
  assetId: string;
  kind: AdminUploadAssetKind;
  storedPath: string;
  publicUrl?: string;
  byteSize: number;
  width?: number;
  height?: number;
  originalFilename: string;
}

interface UploadAssetResponse {
  assetId?: string | number;
  id?: string | number;
  storedPath?: string;
  publicUrl?: string;
  byteSize?: number;
  width?: number | null;
  height?: number | null;
  originalFilename?: string;
}

interface MainVideoUploadResponse {
  videoUrl?: string;
}

function normalizeConfiguredApiBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return normalizeConfiguredApiBaseUrl(configuredBaseUrl);
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8080";
  }

  throw new Error("Public API base URL is required for direct uploads.");
}

function joinApiUrl(baseUrl: string, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizeConfiguredApiBaseUrl(baseUrl)}${normalizedPath}`;
}

function buildPublicUrl(baseUrl: string, storedPath: string) {
  const cleanStoredPath = storedPath.replace(/^\/+/, "");
  return joinApiUrl(baseUrl, `/upload/${cleanStoredPath}`);
}

function requiredUploadMetadataValue(value: string | number | undefined) {
  const normalizedValue = value === undefined ? "" : String(value).trim();

  if (!normalizedValue) {
    throw new Error("업로드 응답에 필수 파일 정보가 없습니다. 잠시 후 다시 시도해 주세요.");
  }

  return normalizedValue;
}

async function readErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: string };
    return data.message?.trim();
  } catch {
    return undefined;
  }
}

async function postDirectUploadForm(
  baseUrl: string,
  path: string,
  rawToken: string,
  formData: FormData,
  fallbackMessage: string,
) {
  const response = await fetch(joinApiUrl(baseUrl, path), {
    method: "POST",
    headers: {
      "X-Upload-Token": rawToken,
    },
    body: formData,
  });

  if (!response.ok) {
    const upstreamMessage = await readErrorMessage(response);
    throw new Error(upstreamMessage || `${fallbackMessage} (${response.status})`);
  }

  return response;
}

export async function uploadAdminAssetDirect(
  request: AdminUploadDirectRequest,
): Promise<AdminUploadAssetMetadata> {
  const baseUrl = getApiBaseUrl();
  const formData = new FormData();
  formData.append("file", request.file);
  formData.append("kind", request.kind);

  const response = await postDirectUploadForm(
    baseUrl,
    "/api/v1/admin/uploads",
    request.rawToken,
    formData,
    "파일 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const data = (await response.json()) as UploadAssetResponse;
  const assetId = requiredUploadMetadataValue(data.assetId ?? data.id);
  const storedPath = requiredUploadMetadataValue(data.storedPath);

  return {
    assetId,
    kind: request.kind,
    storedPath,
    publicUrl: data.publicUrl || buildPublicUrl(baseUrl, storedPath),
    byteSize: data.byteSize ?? request.file.size,
    width: data.width ?? undefined,
    height: data.height ?? undefined,
    originalFilename: data.originalFilename || request.file.name,
  };
}

export async function uploadAdminMainVideoDirect(file: File, rawToken: string): Promise<{ videoUrl: string }> {
  const baseUrl = getApiBaseUrl();
  const formData = new FormData();
  formData.append("file", file);

  const response = await postDirectUploadForm(
    baseUrl,
    "/api/v1/admin/site/main-video",
    rawToken,
    formData,
    "메인 영상 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const data = (await response.json()) as MainVideoUploadResponse;
  const videoUrl = data.videoUrl?.trim();

  if (!videoUrl) {
    throw new Error("메인 영상 업로드 응답에 영상 주소가 없습니다. 잠시 후 다시 시도해 주세요.");
  }

  return { videoUrl };
}
