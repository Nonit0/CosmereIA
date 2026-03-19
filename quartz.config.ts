import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Enciclopedia Cosmere",
    pageTitleSuffix: " | Archivo de Luzdeplata",
    enableSPA: true,
    enablePopovers: true,
    analytics: null, // Desactivado para mayor privacidad
    locale: "es-ES", // Traducido al español
    baseUrl: "nonit0.github.io/CosmereIA", // Tu URL correcta
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#E2E8F0",
          lightgray: "#e0e0e0",
          gray: "#b0b0b0",
          darkgray: "#4e4e4e",
          dark: "#1E293B",
          secondary: "#B91C1C",
          tertiary: "#D97706",
          highlight: "rgba(185, 28, 28, 0.05)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1E293B",
          lightgray: "#475569",
          gray: "#64748B",
          darkgray: "#E2E8F0",
          dark: "#f0f0f0",
          secondary: "#60A5FA",
          tertiary: "#8B5CF6",
          highlight: "rgba(96, 165, 250, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({ theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
