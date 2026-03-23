import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Short bio shown in the homepage hero.",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "resumeFile",
      title: "Resume (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
  preview: { select: { title: "bio" } },
});
