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
        { name: "description", title: "Description", type: "array", of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }] },
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
      name: "imageCarousel",
      title: "Image carousel",
      type: "array",
      description: "A walkthrough of design iterations — each slide has an image, title, and description.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt text", type: "string" }],
            },
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
            },
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "edgeCases",
      title: "Edge cases & tradeoffs",
      type: "array",
      description: "Decision points, edge cases, and stakeholder tradeoffs worth highlighting.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Edge case", value: "Edge case" },
                  { title: "Stakeholder tradeoff", value: "Stakeholder tradeoff" },
                  { title: "Decision", value: "Decision" },
                ],
                layout: "radio",
              },
            },
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt text", type: "string" }],
            },
          ],
          preview: {
            select: { title: "title", subtitle: "type" },
          },
        },
      ],
    }),
    defineField({
      name: "figmaEmbedUrl",
      title: "Figma prototype URL",
      type: "url",
      description: "Paste the embed URL from Figma (the src value from the iframe embed code, starting with https://embed.figma.com/...).",
    }),
    defineField({
      name: "solutionComponents",
      title: "Solution components",
      description: "2–3 column breakdown of solution components shown below What shipped.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "bullets", title: "Bullet points", type: "array", of: [{ type: "string" }] },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
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
      type: "array",
      description: "Background explanation shown before the overview grid. Supports bold and bullet points.",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
    }),
    defineField({
      name: "criticalMoment",
      title: "Critical moment",
      type: "array",
      description: "A short callout displayed in a highlighted box. Supports bold and bullet points.",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
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
      type: "array",
      description: "A 'Why this matters' section. Supports bold and bullet points.",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
    }),
    defineField({
      name: "reflection",
      title: "Reflection",
      type: "array",
      description: "Paragraph-form reflection. Supports bold and bullet points.",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [{ title: "Bullet", value: "bullet" }], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } }],
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
