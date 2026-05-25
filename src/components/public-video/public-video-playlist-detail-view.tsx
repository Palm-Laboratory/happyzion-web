import IframeScrollGuard from "@/components/public-video/iframe-scroll-guard";
import PublicShortformVideoDetailExperience from "@/components/public-video/public-shortform-video-detail-experience";
import PublicVideoDetailActions from "@/components/public-video/public-video-detail-actions";
import { formatLongDate } from "@/lib/format-date";
import type { PublicPlaylistDetail, PublicVideoDetail } from "@/lib/videos-api";

function buildMetaLine(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(" · ");
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DetailAccordion({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <details className="group rounded-[16px] bg-[#F2F2F2] px-[30px] open:pb-7">
      <summary className="flex h-[60px] cursor-pointer list-none items-center justify-between text-[#33103f]">
        <span className="font-semibold">{title}</span>
        <ChevronIcon className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="whitespace-pre-line pb-1 text-[15px] leading-8 text-[#33103f]/75">{content}</div>
    </details>
  );
}

export default function PublicVideoPlaylistDetailView({
  playlist,
  video,
}: {
  playlist: PublicPlaylistDetail;
  video: PublicVideoDetail;
}) {
  if (playlist.contentForm === "SHORTFORM" || video.contentForm === "SHORTFORM") {
    return <PublicShortformVideoDetailExperience playlist={playlist} initialVideo={video} />;
  }

  const publishedAt = formatLongDate(video.publishedAt);
  const metaLine = [video.scriptureReference, video.preacherName].filter(Boolean).join(" | ");
  const taxonomyLine = buildMetaLine([playlist.groupLabel ?? "영상", playlist.title, publishedAt]);
  const descriptionContent = video.summary || video.description;
  const scriptureContent = buildMetaLine([video.scriptureReference, video.scriptureBody])
    ? [video.scriptureReference, video.scriptureBody].filter(Boolean).join("\n\n")
    : null;

  return (
    <main className="bg-white pb-16">
      <section className="section-shell py-10">
        <div className="min-w-0 space-y-4">
            <div className="w-full overflow-hidden rounded-[16px] bg-[#33103f] shadow-[0_18px_40px_rgba(20,6,26,0.12)]">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#33103f]">
                <IframeScrollGuard
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                  title={video.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 block h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="space-y-6 px-1">
              <div className="space-y-4 text-[#33103f]">
                <h1 className="line-clamp-2 text-[30px] font-bold leading-[1.15] tracking-[-0.04em] lg:line-clamp-1 md:text-[24px]">
                  {video.title}
                  {metaLine ? ` | ${metaLine}` : ""}
                </h1>
                {taxonomyLine ? <p className="text-[16px] font-normal leading-none text-[#33103f]/80">{taxonomyLine}</p> : null}
              </div>

              <div className="space-y-[15px]">
                {descriptionContent ? <DetailAccordion title="영상 설명" content={descriptionContent} /> : null}
                {scriptureContent ? <DetailAccordion title="본문 말씀" content={scriptureContent} /> : null}
              </div>

              <hr className="mt-24 border-t border-[#33103f]/10" />

              <PublicVideoDetailActions
                listPath={playlist.fullPath}
                previousVideo={video.previousVideo ?? null}
                nextVideo={video.nextVideo ?? null}
              />
            </div>
        </div>
      </section>
    </main>
  );
}
