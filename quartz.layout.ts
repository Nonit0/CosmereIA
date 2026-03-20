import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.SpoilerModal()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true, zoom: true, depth: 2, scale: 1.1, repelForce: 0.8,
        centerForce: 0.3, linkDistance: 40, fontSize: 0.6, opacityScale: 1,
        colors: {
          "corredores-del-viento": "#3B82F6", "tejedores-de-luz": "#BE123C", "vigilantes-de-la-verdad": "#10B981",
          "scadrial": "#B91C1C", "roshar": "#475569", "nalthis": "#A855F7",
          "odium": "#F59E0B", "honor": "#60A5FA"
        }
      },
      globalGraph: {
        drag: true, zoom: true, depth: -1, scale: 0.9, repelForce: 0.8,
        centerForce: 0.3, linkDistance: 40, fontSize: 0.6, opacityScale: 1,
      }
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  // 👇 INYECCIÓN DE GISCUS AL FINAL DE CADA NOTA 👇
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'nonit0/CosmereIA',
        repoId: 'R_kgDORmH95Q',
        category: 'Announcements',
        categoryId: 'DIC_kwDORmH95c4C4vXy',
        mapping: 'pathname',
        strict: false,
        reactionsEnabled: true,
        inputPosition: 'top',
// 👇 MAGIA AQUÍ: Usamos una ruta absoluta hacia tu GitHub Pages 👇
        theme: 'https://nonit0.github.io/CosmereIA/static/giscus-cosmere.css',
      }
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
