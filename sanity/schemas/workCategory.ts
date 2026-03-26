import { defineField, defineType } from "sanity";

export default defineType({
  name: "workCategory",
  title: "Work Category",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Category key",
      type: "string",
      options: {
        list: [
          { title: "AI", value: "ai" },
          { title: "Product Content", value: "productContent" },
          { title: "Systems Design", value: "systemsDesign" },
          { title: "People & Culture Leadership", value: "peopleLeadership" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Display title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Approach description",
      description: "How you approach this type of work (shown at top of category page)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroProject",
      title: "Hero project",
      description: "The featured project shown prominently on the category page",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
