I'll scan the codebase to find how portfolio data is structured and added (components, data sources, APIs), then drill into the `NeobrutalistProjects.tsx` since it seems central to portfolio projects. I'll run a few searches in parallel to map data flow and sources.
Search files...
Ran tool
Ran tool
Ran tool
Ran tool

I'll scan the builder, registry, renderer, and API routes to map the data flow end-to-end (editing, serialization, saving, loading), then look into how `projects` data is defined and passed.
Ran tool
Ran tool
Ran tool
Ran tool
Ran tool

Ran tool

I located the portfolio data model, the builder flow, and how content (like projects) is defined, edited, rendered, and saved. I’ll outline the HLD and LLD, with short code citations for clarity.

### High-level design (HLD)
- **Component registry as source of truth**: Each portfolio section (hero, about, skills, projects, etc.) declares:
  - `defaultProps` (initial content),
  - `propsSchema` (what fields exist and how the editor should render them),
  - `defaultStyles`.
- **Builder UI (client)**: The editor lets you add section “variants” from the registry, edit content via a schema-driven property panel, and preview the composition with a live renderer.
- **Render pipeline**: A `ComponentRenderer` loads a variant by type+variant, merges `defaultProps` with user `props`, and renders the actual React component with merged styles.
- **Persistence**: Saving the portfolio serializes an ordered `layout` array of components with `type`, `variant`, `props`, `styles`, `order`, `isActive`. It’s validated with Zod and stored via Prisma in:
  - a `portfolio` row with JSON `layout` and `theme`,
  - and normalized `portfolioComponent` rows for querying.
- **Loading/Viewing**: Viewer pages load the portfolio by id or slug, read/restore `layout`, and render sections via `ComponentRenderer`.

### Low-level design (LLD)

- 1) Components and data shape are defined in the registry
  - For Projects, `defaultProps.projects` contains the initial items. The editor uses `propsSchema`/`customization.projectsData` to build form fields.

```1513:1986:src/lib/portfolio/registry.ts
projects: {
  id: "projects",
  name: "Projects Section",
  ...
  variants: [
    {
      id: "projects-typography",
      ...
      defaultProps: {
        title: "PROJECTS",
        ...
        projects: [
          { id: "01", title: "Portflection – Full-Stack Portfolio Builder", ... },
          { id: "02", title: "B2B E-commerce Platform", ... },
          // ...
        ],
        showFilters: true,
        showImages: false,
        ...
      },
      ...
    },
    {
      id: "projects-brutalist",
      name: "Brutalist Projects",
      component: ProjectsComponents.NeobrutalistProjects,
      ...
      defaultProps: {
        title: "MY PROJECTS",
        ...
        projects: [
          { id: "1", title: "E-COMMERCE BEAST", category: "WEB APP", ... },
          { id: "2", title: "AI CHAT INTERFACE", category: "AI/ML", ... },
          // ...
        ],
        showTechnologies: true,
        ...
      },
      propsSchema: {
        title: { type: "text", ... },
        ...
        sortBy: { type: "select", options: [ ... ] },
        ...
      },
      customization: {
        projectsData: {
          type: "array",
          itemSchema: {
            title: { type: "text", required: true },
            description: { type: "textarea", required: true },
            category: { type: "text", required: true },
            status: { type: "select", options: [ ... ] },
            year: { type: "text", required: true },
            technologies: { type: "array", itemType: "text" },
            image: { type: "text" },
            liveUrl: { type: "text" },
            githubUrl: { type: "text" },
            caseStudyUrl: { type: "text" },
            color: { type: "color", required: true },
            priority: { type: "select", options: [ ... ] },
          },
        },
      },
    },
  ],
},
```

- 2) Builder creates and edits components using schema
  - When you add a variant, it instantiates a component with `defaultProps` and `defaultStyles` from the registry.
  - Editing uses the `propsSchema` metadata to drive form controls.

```146:167:src/components/portfolio/builder/PortfolioEditor.tsx
const createComponent = useCallback(
  (variant: ComponentVariant): PortfolioComponent => {
    // infer sectionType by locating the variant in the registry
    return {
      id: uuidv4(),
      type: sectionType,
      variant: variant.id,
      props: variant.defaultProps || {},
      styles: variant.defaultStyles || {},
      order: components.length,
      isActive: true,
    };
  },
  [components.length]
);
```

- 3) Rendering merges default and user data
  - The live preview and the final view both use a renderer that:
    - finds the variant via type+variant,
    - merges `defaultProps` with the user’s `component.props`,
    - passes merged styles as props, plus sets a style object on a wrapper.

```42:61:src/components/portfolio/renderer/ComponentRenderer.tsx
const Component = componentConfig.component;
const styles = { ...componentConfig.defaultStyles, ...component.styles };
const props = {
  ...componentConfig.defaultProps,
  ...component.props,
  backgroundColor: styles.backgroundColor,
  textColor: styles.textColor,
  ...
};
```

- 4) Saving serializes the layout
  - The editor converts the in-memory composition to a `layout` array and saves it via an action (server function) that validates and persists to Prisma with a transactional write across `portfolio` + `portfolioComponent`.

```279:307:src/components/portfolio/builder/PortfolioEditor.tsx
const portfolioData = {
  name,
  slug: slug || name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"),
  description: "Portfolio created with Portflection",
  layout: components.map((comp, index) => ({ ...comp, order: index })),
  isPublic,
  portfolioType: "developer" as const,
};
if (portfolioId) {
  await updatePortfolio({ id: portfolioId, ...portfolioData });
} else {
  const result = await savePortfolio(portfolioData);
  router.push(`/dashboard/portfolios/edit/${result.data.id}`);
}
```

```214:291:src/actions/portfolio-actions.ts
const portfolio = await prisma.$transaction(async (tx) => {
  const portfolio = await tx.portfolio.create({
    data: {
      userId: user.id,
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      layout: validatedData.layout as any,
      theme: validatedData.theme as any,
      isPublished: validatedData.isPublic,
      ...
    },
  });

  const componentPromises = validatedData.layout.map((component, index) =>
    tx.portfolioComponent.create({
      data: {
        portfolioId: portfolio.id,
        type: component.type,
        variant: component.variant,
        props: component.props as any,
        styles: component.styles as any,
        order: component.order,
        isActive: component.isActive,
      },
    })
  );
  await Promise.all(componentPromises);
  return portfolio;
});
```

- 5) Validation and REST API equivalents
  - Both server actions and API routes share similar Zod schemas to enforce `layout` and content validity.
  - If you use the REST endpoint directly, it validates the same shapes.

```39:89:src/app/api/portfolio/save/route.ts
const SavePortfolioSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  layout: z.array(PortfolioComponentSchema).min(1),
  theme: GlobalThemeSchema.optional(),
  isPublic: z.boolean().default(false),
  ...
});
```

### How to “add data” to a portfolio in practice
- In the builder:
  - Add a section variant from the palette (e.g., Projects → Brutalist).
  - In `Properties → Content`, fill in fields defined by `propsSchema` (e.g., add items to `projects`).
  - Optional: use section-specific “customization” arrays (like `projectsData`) if surfaced in your `PropertyPanel`.
  - Save the portfolio; it persists `layout` with your content.
- In code:
  - If you seed or programmatically modify, update the `props` for a component in `layout` to match the schema and call `savePortfolio`/`updatePortfolio`. The renderer will use those props directly.

### Notes specific to `NeobrutalistProjects`
- The component expects `projects: Array<{ id, title, description, category, status, year, technologies, image?, liveUrl?, githubUrl?, caseStudyUrl?, color, priority }>` and uses flags like `showTechnologies`, `showImages`, `filterByStatus`, and `sortBy`.
- Sorting/filtering happens client-side using these props; so supplying correct `status`, `year`, and `priority` is key for desired behavior.

Short status update:
- I reviewed the registry, builder, renderer, actions, and API to map how portfolio content is defined, edited, rendered, and persisted. I cited the key code that shows where default data lives and how it’s saved/loaded.

- Defined how content is modeled in `componentRegistry` with `defaultProps`/`propsSchema`.
- Explained the end-to-end flow: add/edit in the builder, render via `ComponentRenderer`, validate and save to Prisma with `layout` + component rows, and how to programmatically update content.