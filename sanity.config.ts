import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "megan-portfolio",
  title: "Megan Feltes — Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.listItem()
              .title("Blog posts")
              .child(S.documentTypeList("post").title("Blog posts")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
