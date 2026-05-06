# Static Pages

Static pages are rendered through the public menu dispatcher, not through
`src/app/(site)/about/.../page.tsx` files.

To add a new static page:

1. Add the page component in `src/features/static-pages/pages`.
2. Add its key to `StaticPageKey` in `src/features/static-pages/types.ts`.
3. Register the key and component in `src/features/static-pages/static-page-registry.tsx`.
4. Register the same key, label, and default path in the backend `StaticPageCatalog.kt`.
5. Create or update the admin menu item as type `STATIC` and choose the registered page.

The admin menu slug decides the public URL. The static page key decides which
component is rendered.
