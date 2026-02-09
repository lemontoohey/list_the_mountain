# My Cursor Skills Library (prompts.md)

## Skill: Create New Page Component
**Purpose:** Generates a new page component with pre-filled content, images, and standard animations.

**Prompt:**
Act as an expert Next.js developer. Create the code for the page file at `app/[page-slug]/page.tsx`.

**Specifications:**
1.  **Framework/Styling:** Use Next.js with TypeScript and style everything with Tailwind CSS.
2.  **Animations:** Use Framer Motion for scroll-triggered animations. All content sections should fade in and slide up as they enter the viewport.
3.  **Layout:** Create a minimalist, asymmetrical layout with significant white space. Follow the design principles we've established.
4.  **Content:** Use the following text and image URLs exactly.

*   **Page Slug:** `[Paste the URL slug here, e.g., 'tourist-destinations']`
*   **Main Heading:** `[Paste Main Heading Text]`
*   **Body Paragraphs:**
    *   `[Paste Paragraph 1]`
    *   `[Paste Paragraph 2]`
    *   ...
*   **Image URLs:**
    *   Header Image: `[Paste URL]`
    *   Content Image: `[Paste URL]`

Please generate the complete, production-ready code for the page component.

---

## Skill: Document a Component
**Purpose:** Adds professional TSDoc comments to a component file.

**Prompt:**
Analyze the following React component and add comprehensive TSDoc comments. Explain the component's purpose, detail each prop in the `Props` interface (including its type and what it does), and describe what the component returns.

`@path/to/component.tsx`

---

## Skill: Refactor for Accessibility (a11y)
**Purpose:** Reviews a component and improves its accessibility.

**Prompt:**
Act as a web accessibility expert. Review the following component and identify and fix any accessibility issues. Pay close attention to semantic HTML (e.g., `nav`, `main`, `section`), ARIA attributes, image alt text, and keyboard navigability for interactive elements. Explain the changes you made and why they are important.

`@path/to/component.tsx`

---
