# Rule: Modern Civic-Tech UI/UX & Mobile-First Standards

## Objective
Provide an ultra-reliable, high-trust, lightweight user experience for citizens accessing aid in disaster conditions.

## Mandatory Rules
1. **Design Theme & Color Tokens**:
   - Palette: Dark Navy/Slate base (`#0A1628`), Civic Sky (`#3B82F6`), Trust Cyan (`#0EA5E9`), Success Emerald (`#10B981`).
   - Glassmorphism: Semi-transparent backdrop-filtered cards (`glass-card`) with soft glowing borders.
   - Micro-interactions: Use `tap-scale` for tactile responsiveness on mobile touch screens.
2. **Mobile Disaster-Zone Ergonomics**:
   - The `/claim` portal must scale seamlessly down to 360px viewport widths.
   - Enforce single-card progressive wizards. Avoid nested modals or intrusive overlays on mobile viewports.
   - High-contrast typography and large interactive tap targets (minimum 48px height for primary buttons).
3. **Anti-Jargon Communication**:
   - Keep user-facing copy simple, empathetic, and clear.
   - Emphasize privacy and data protection (*"Your credentials never leave this phone"*).
   - Avoid exposing low-level blockchain mechanics or cryptographic jargon.
4. **Vite & Tailwind v4 Processing**:
   - Always retain `@tailwindcss/vite` in `vite.config.ts` so all Tailwind v4 `@import 'tailwindcss';` and design tokens compile properly without unknown at-rule errors.
