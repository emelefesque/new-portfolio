import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "goal",
      title: "Goal",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "process",
      title: "Process steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "stepNumber", title: "Step number", type: "number" },
            { name: "title", title: "Step title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt text", type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "whatShipped",
      title: "What shipped",
      type: "object",
      fields: [
        { name: "description", title: "Description", type: "text", rows: 2 },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "impact",
      title: "Impact / outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "learnings",
      title: "Learnings",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "text",
      rows: 4,
      description: "Background explanation shown before the overview grid. E.g., explains the 3-layer ad system.",
    }),
    defineField({
      name: "criticalMoment",
      title: "Critical moment",
      type: "text",
      rows: 2,
      description: "A short callout displayed in a highlighted box. E.g., 'I was asked to write 60+ error messages — but this revealed a deeper issue.'",
    }),
    defineField({
      name: "explorationTable",
      title: "Exploration table",
      type: "array",
      description: "Comparison table of approaches tried. Each row: approach, outcome, and whether it worked.",
      of: [
        {
          type: "object",
          fields: [
            { name: "approach", title: "Approach", type: "string" },
            { name: "outcome", title: "Outcome", type: "string" },
            { name: "worked", title: "Worked?", type: "boolean", initialValue: false },
          ],
          preview: {
            select: { title: "approach", subtitle: "outcome" },
          },
        },
      ],
    }),
    defineField({
      name: "positioning",
      title: "Positioning",
      type: "text",
      rows: 4,
      description: "A 'Why this matters' paragraph about design approach philosophy.",
    }),
    defineField({
      name: "reflection",
      title: "Reflection",
      type: "text",
      rows: 5,
      description: "Paragraph-form reflection, richer than the learnings bullet list.",
    }),
    defineField({
      name: "category",
      title: "Category",
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
    }),
    defineField({
      name: "hidden",
      title: "Hide this project",
      type: "boolean",
      description: "When enabled, this project won't appear on the site and its page will return a 404.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "heroImage" },
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
