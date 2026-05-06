# Public Menu Dispatcher

This feature owns public routing for CMS-managed menu URLs.

## Entry Point

Next.js route:

```txt
src/app/(site)/[...menuPath]/page.tsx
```

This file should stay thin. It delegates to:

```txt
src/features/public-menu/menu-dispatcher.tsx
```

The dispatcher resolves the current URL through the public menu API and renders
the correct feature based on menu type.

## Current Flow

```txt
User URL
  -> /[...menuPath]
  -> resolvePublicMenuPath(path)
  -> render by resolved menu type
```

Supported behavior:

- `STATIC`
  - Uses `staticPageKey`.
  - Renders a component from `src/features/static-pages/static-page-registry.tsx`.
  - The admin menu slug decides the public URL.
  - The static page key decides which component is rendered.
- `BOARD`
  - Renders board list at the menu URL.
  - Renders post detail at `{boardPath}/{postId}`.
- `FOLDER`
  - Backend returns `redirectTo`; dispatcher redirects to it.
- `EXTERNAL_LINK`
  - Dispatcher redirects to the external URL.

Not fully implemented yet:

- `YOUTUBE_PLAYLIST_GROUP`
- `YOUTUBE_PLAYLIST`

The backend already has menu types and video lookup support, but the frontend
dispatcher does not yet render public video pages.

## Static Pages

Static page source lives in:

```txt
src/features/static-pages/
```

To add a static page:

1. Add a page component under `src/features/static-pages/pages`.
2. Add its key to `StaticPageKey` in `src/features/static-pages/types.ts`.
3. Register the key and component in `src/features/static-pages/static-page-registry.tsx`.
4. Register the same key, label, and default path in backend `StaticPageCatalog.kt`.
5. Create or update an admin menu item as type `STATIC`.

Do not add public static pages under:

```txt
src/app/(site)/about/.../page.tsx
```

Those direct route files bypass the menu dispatcher and can create confusing
behavior when admin-managed menu URLs change.

## SEO Notes

The dispatcher exports metadata through `generateMenuDispatcherMetadata`.

Current SEO behavior:

- Canonical URL uses the resolved public menu URL.
- Static pages and board lists use menu labels for titles.
- Board detail pages use post title plus board label.
- Sitemap is generated from the public menu API in `src/app/sitemap.ts`.

Backend currently prevents connecting the same `staticPageKey` to multiple menu
items. This avoids duplicate public URLs for the same static content.

If URL change history becomes important, add a redirect table later so old menu
paths can 301 redirect to new paths.

## Future Video Menu Work

When public video menu rendering is needed, add a feature module such as:

```txt
src/features/public-video/
```

Then extend `menu-dispatcher.tsx` with branches for:

```ts
resolved.type === "YOUTUBE_PLAYLIST_GROUP"
resolved.type === "YOUTUBE_PLAYLIST"
```

Expected flow:

```txt
YOUTUBE_PLAYLIST_GROUP -> redirect to default child playlist or render group page
YOUTUBE_PLAYLIST       -> fetch video detail by path and render playlist page
```

Prefer keeping video rendering outside `menu-dispatcher.tsx`; the dispatcher
should coordinate routing and delegate heavy UI/data logic to feature modules.
