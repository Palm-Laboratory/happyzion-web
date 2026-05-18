import Image from "next/image";
import Link from "next/link";
import { formatLongDate } from "@/lib/format-date";
import type { PublicPlaylistDetail, PublicVideoDetail, PublicVideoSummary } from "@/lib/videos-api";

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

function RelatedVideoCard({ video }: { video: PublicVideoSummary }) {
  const publishedAt = formatLongDate(video.publishedAt);
  const metaLine = buildMetaLine([video.scriptureReference, video.preacherName]);

  return (
    <Link href={video.href} className="group flex items-center gap-3 rounded-[8px] px-2 py-1 transition hover:bg-white/70">
      <div className="relative h-[78px] w-[120px] shrink-0 overflow-hidden rounded-[8px] bg-[#33103f]">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover opacity-72 transition duration-300 group-hover:scale-[1.03]"
            sizes="120px"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#33103f]/62" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[14px] font-semibold leading-[1.55] text-[#33103f] md:line-clamp-1">
          {video.title}
        </p>
        {metaLine ? <p className="mt-1 line-clamp-2 text-[12px] leading-[1.35] text-[#33103f]/70">{metaLine}</p> : null}
        {publishedAt ? <p className="mt-1 text-[12px] leading-[1.3] text-[#33103f]/80">{publishedAt} 업로드</p> : null}
      </div>
    </Link>
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
    <details className="group rounded-[16px] bg-[#f8fafd] px-[30px] open:pb-7">
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
  const publishedAt = formatLongDate(video.publishedAt);
  const metaLine = buildMetaLine([video.scriptureReference, video.preacherName]);
  const taxonomyLine = buildMetaLine([playlist.groupLabel ?? "영상", playlist.title, publishedAt]);
  const descriptionContent = video.summary || video.description;
  const scriptureContent = buildMetaLine([video.scriptureReference, video.scriptureBody])
    ? [video.scriptureReference, video.scriptureBody].filter(Boolean).join("\n\n")
    : null;
  const isShortform = video.contentForm === "SHORTFORM";

  return (
    <main className="bg-white pb-16">
      <section className="section-shell py-10">
        <div className={isShortform ? "grid gap-6 xl:grid-cols-[minmax(320px,440px)_1fr]" : "grid gap-6 xl:grid-cols-[minmax(0,935px)_367px] xl:items-start"}>
          <div className="min-w-0 space-y-4">
            <div className="w-full overflow-hidden rounded-[16px] bg-[#33103f] shadow-[0_18px_40px_rgba(20,6,26,0.12)]">
              <div className={`relative w-full overflow-hidden bg-[#33103f] ${isShortform ? "aspect-[9/16]" : "aspect-[16/9]"}`}>
                <iframe
                  title={video.title}
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
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
            </div>
          </div>

          <aside className="rounded-[16px] border border-[#33103f]/10 bg-[#f8fafd] p-[18px]">
            <div className="flex items-center justify-between">
              <div className="space-y-[10px] text-[#33103f]">
                <p className="text-[12px] font-normal uppercase tracking-[0.18em]">Related Videos</p>
                <h2 className="text-[14px] font-bold leading-none">관련 영상</h2>
              </div>
              <Link href={playlist.fullPath} className="text-[12px] font-semibold leading-none text-[#8b6db5] transition hover:text-[#33103f]">
                전체 보기
              </Link>
            </div>

            <div className="mt-6 space-y-[18px]">
              {video.related.length > 0 ? (
                video.related.map((related) => <RelatedVideoCard key={related.videoId} video={related} />)
              ) : (
                <p className="rounded-[8px] border border-dashed border-[#33103f]/20 px-4 py-8 text-center text-[13px] text-[#33103f]/55">
                  관련 영상이 없습니다.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
