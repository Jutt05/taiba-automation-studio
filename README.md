# TAIBA AI Automation – WordPress export

Original Lovable code ko chhue baghair, alag build se WordPress plugin banta hai.

## Is folder mein kya hai
- `vite.wp.config.ts`   – alag Vite build (TanStack Start/server ke baghair)
- `src/main.tsx`        – wahi 11 components, Shadow DOM mein (theme/Elementor CSS se bacha hua)
- `src/content-runtime.ts` – original text + WordPress ke edits merge karta hai
- `taiba-ai-automation/` – WordPress plugin (shortcode + dashboard editing)
- `scripts/export-content.mjs` – `ai-automation.ts` se `default-content.json` dobara banata hai

## Steps (apne computer par)
1. Ye poora `wordpress-export` folder project ke root mein copy karein (`src/` aur `package.json` ke barabar).
2. Terminal (project root):
   ```
   npm install
   npx vite build --config wordpress-export/vite.wp.config.ts
   ```
   Output: `wordpress-export/taiba-ai-automation/assets/` (`taiba-ai.js` + images).
3. `wordpress-export/taiba-ai-automation` folder ko ZIP karein.
4. WordPress: Plugins > Add New > Upload Plugin > ZIP > Activate.
5. Page kholein > Elementor > **Shortcode** widget > `[taiba_ai_automation]`.
   - Section/page **Full Width** ya Canvas template rakhein.
   - Us section mein Elementor ka `Overflow: Hidden` na ho (sticky scroll sections ke liye).
6. Text/links/images: Dashboard > **AI Automation Page**.

## Shortcode options
`[taiba_ai_automation header="no" smooth="yes" schema="yes"]`
- `header="yes"`: page ka apna floating header (default no, aap ka WordPress header use hota hai)
- `smooth="no"`: Lenis smooth scroll band
- `schema="no"`: FAQ structured data band (agar SEO plugin pehle se de raha ho)

## Content badalna (developer)
`src/content/ai-automation.ts` badlein, phir
`node --experimental-strip-types wordpress-export/scripts/export-content.mjs` (Node 22.6+) aur dobara build.

## Limitations
- FAQ/steps ki tadaad fixed hai (9 FAQs waghera): text edit hota hai, naya item add/remove nahi.
- Page title/meta WordPress page ki SEO settings se aate hain.
