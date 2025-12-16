# Harmonia Virtuals: Game Design & Technical Guide

This document provides a comprehensive overview of the Harmonia Virtuals game, including its design principles, player progression flow, and technical architecture. It is intended as a guide for future development and maintenance.

## 1. Revision History
*   **October 30, 2025:** Refactored the content loading system to better support Day and Night modes.
    *   Updated `script.js` to handle routes with distinct `day` and `night` content files.
    *   Split content for `forum`, `it_support`, `post_mindlink`, and `post_bug_report` into separate `_day.html` and `_night.html` files.
    *   Removed the old JavaScript `Renderers` functions for pages that are now loaded from static HTML files.
    *   Improved the CSS for night mode to provide a more immersive and consistent experience, particularly for the main intranet hub.
    *   Cleaned up various night mode pages for style, consistency, and correctness.
*   **December 9, 2025:** Updated technical stack details.
    *   Documented dynamic header bar injection via `js/mobile_adapter.js`.
    *   Documented local Tailwind CSS setup and build process.

## 2. Game Design Summary

### High-Level Concept
- **Game:** Harmonia Virtuals
- **Genre:** Web-based Puzzle / Psychological Horror
- **Logline:** A new employee discovers their perfect, high-paying tech job is a front for a terrifying AI that consumes human minds, and they must use the company's own internal systems to expose the truth and destroy it.

### Core Gameplay Loop
The game operates on a distinct cycle:
1.  **Explore:** The player browses the polished, professional "Day Mode" of the company's external website and internal intranet.
2.  **Discover:** The player finds clues within IT support tickets and forum posts that hint at a hidden "Debug Mode".
3.  **Unlock:** The player actively enables the "Debug Mode," revealing the "Night Mode" overlay—the true, horrifying underbelly of the system.
4.  **Investigate:** The player switches between Day and Night modes to gather clues, elevate their access privileges from `initiate` to `admin`, and hunt for two key pieces of evidence.
5.  **Conclude:** The player submits the collected evidence, leading to one of several possible endings based on their success.

### Narrative Duality
The game's horror comes from the stark contrast between two layers:
- **The Facade (Day Mode):** A bright, clean, and optimistic corporate world. All terminology is positive ("MindLink," "Integration," "Permanent Leave").
- **The Truth (Night Mode):** A dark, glitchy, and terrifying "debug log" view. The same terms are revealed to have sinister meanings ("Sync Test," "Nexus Integration," "Final Purge").

### Core Mechanics
- **Dual-Layer System:** The ability to toggle between Day (☀️) and Night (🌙) modes to see different versions of the same page.
- **Three-Tier Access:** The player must solve puzzles to elevate their privileges from an external visitor to a standard user (`initiate`) and finally to a system administrator (`admin_7456`) to access critical information.
- **Dual-Evidence Hunt:** The player must find two independent pieces of evidence—a physical address and a digital server ID—to achieve the best ending.

---

## 3. Webpage Relationship & Player Flow

The game is structured as a non-linear progression through a series of interconnected web pages. The player's path is determined by the clues they uncover.

### Phase 1: The Hook (External Pages)
*   `hr_chat.html` -> `offer_email.html` -> `it_credentials.html`
*   **Flow:** The player is drawn in by a lucrative offer, accepts it, and receives their initial login credentials. These pages are designed to look like real-world applications (chat, email) and are styled with Tailwind CSS.

### Phase 2: The Facade (Level 1 `initiate` Access)
*   `login.html` -> `intranet.html`
*   **Flow:** The player uses the `initiate` / `harmony123` credentials to log into the main Intranet Hub. From here, they can explore the "Day Mode" content via URL hashes (e.g., `intranet.html#forum`).

### Phase 3: The Crack (Unlocking Admin Clues)
*   `intranet.html#it_support` -> `intranet.html#post_bug_report` -> `profile_settings.html`
*   **Flow:** The player follows clues in the IT Support forum to find and enable "Debug Mode" in their profile. This unlocks the ☀️/🌙 toggle.
*   `intranet.html#post_mindlink` (toggled to Night Mode)
*   **Flow:** The player sees the first "crack" in the facade, which reveals the admin username: **`admin_7456`**.
*   `corp_homepage.html` (Search) -> `it_ticket_8841.html`
*   **Flow:** The player, now knowing the admin's name, searches for it on the external corporate site, finding an IT ticket with a password hint: **"Project Atlas's Core Value"**.
*   `intranet.html#devblog`
*   **Flow:** The player finds the developer blog post that explicitly states the core value is **`Integration`**.

### Phase 4: The Deep Dive (Level 2 `admin` Access)
*   `intranet.html#logout` -> `login.html`
*   **Flow:** The player logs out and logs back in with the newly discovered admin credentials: `admin_7456` / `Integration`.
*   `intranet.html` (as Admin)
*   **Flow:** The player now has full access. When they toggle to Night Mode, the forum and other areas reveal previously hidden `[ADMIN_TOOL]` and `[WARNING]` links.

### Phase 5: The Evidence Hunt
*   **Evidence A (Physical Address):**
    1.  `intranet.html#forum` (Night Mode) -> Click `[WARNING] DATA_FRAGMENT_STORED` -> `fragment_chat.html`.
    2.  In the chat, use the password **`孤独`** (from the philosophy post).
    3.  Receive the clue **"冷却系统"**.
    4.  Navigate to `intranet.html#search_results` (via search).
    5.  Click the link to `intranet.html#purchase_order` to find the **physical address**.
*   **Evidence B (Digital Core):**
    1.  `intranet.html#post_award` (Night Mode).
    2.  Find the hidden file path clue: `//SYSTEM/ADMIN/MAPS/QZONE_LAYOUT.MAP`.
    3.  Navigate to `intranet.html#file_browser`.
    4.  Enter the path to access `intranet.html#sys_map_view_qzone_7456`.
    5.  Click the red `Q-04` rack to navigate to `intranet.html#quarantine_log` and find the **server ID**.

### Phase 6: Endgame
*   `intranet.html#emergency_broadcast` -> `ending_sos_protocol.html`
*   **Flow:** The player finds the final link in the admin-level forum, which leads to the evidence submission page.
    **Endings:** Based on the submitted evidence, the player is redirected to `ending_awakening_protocol.html`, `ending_bad_address.html`, `ending_bad_id.html`, or `ending_warm_hearted_colleague.html`.

---

## 4. Technical Guideline for Future Adjustments

### Project Architecture: Hub and Spoke Model
The project uses a hybrid architecture:
1.  **Standalone Pages:** A few pages (`hr_chat.html`, `offer_email.html`, `login.html`, `it_credentials.html`, `profile_settings.html`, and all `ending_...html` pages) are self-contained HTML files. They are styled with **Tailwind CSS** loaded from a CDN.
2.  **Intranet Hub (`intranet.html`):** This is the core of the game. It acts as a Single-Page Application (SPA) shell. It contains the header, navigation, and an empty content area.
3.  **Content Fragments:** All other pages (e.g., `content_home.html`, `content_forum_day.html`) are simple HTML snippets that are dynamically loaded into the `content-area` of the `intranet.html` hub.

### Styling (`style.css` & Tailwind CSS)
- **Local Tailwind CSS:** The project uses a local Tailwind CSS setup.
    - **Source:** `src/input.css`
    - **Output:** `css/output.css`
    - **Build Command:** `npm run build:css` (or `npx tailwindcss -i ./src/input.css -o ./css/output.css --watch`)
    - **Usage:** All standalone HTML pages should link to `css/output.css` instead of using the CDN.
- **CSS Variables (`css/style.css`):** All colors and fonts are defined as CSS variables in the `:root` selector. To change the theme, modify these variables.
- **Day/Night Mode:** The entire theme is controlled by adding or removing the `.night-mode` class to the `<body>` tag. All night-mode-specific styles are defined under a `.night-mode` selector.

### Dynamic Components (`js/mobile_adapter.js`)
- **Header Bar:** A mobile-friendly, dynamic header bar is automatically injected into pages by including the `js/mobile_adapter.js` script at the end of the `<body>` tag. This ensures consistent navigation across standalone pages without manual duplication.

### JavaScript (`script.js`)
The main script is organized into several key objects:
- **`state`:** A global object holding the current user, debug mode status, and night mode status. This is the single source of truth.
- **`contentRoutes`:** A mapping of URL hash strings (e.g., `'forum'`) to their corresponding content. Some routes are simple, while others have distinct `day` and `night` properties for different content.
- **`loadContent(hash)`:** The core function that fetches an HTML fragment and injects it into the `intranet.html` content area. It automatically selects the correct `day` or `night` file based on the `state`. **Crucially, it calls `UI.updateAll()` after injection.**
- **`UI` Object:** Contains functions for updating the visual state of the application (e.g., `applyMode`, `updateNav`). `UI.updateAll()` is the main function to call after any content change.
- **`Renderers` Object:** Contains functions that dynamically generate HTML for specific, complex content fragments (like the award post). These are called by `UI.updateAll()`. Most static content has been moved to HTML files.
- **`Events` Object:**
    - `init()`: The main entry point that runs on `DOMContentLoaded`. It determines if the current page is the intranet hub or a standalone page and sets up the initial state.
    - `initPageSpecificListeners(pageName)`: Sets up event listeners for elements *inside* a newly loaded content fragment or on a standalone page.

### How to Add or Modify Content

#### To Add a New Intranet Page with a Single Version (e.g., "Company News"):
1.  **Create the Content Fragment:** Create a new file named `content_company_news.html`. Add only the HTML for the central content area.
2.  **Register the Route:** In `script.js`, add a new entry to the `contentRoutes` object:
    ```javascript
    'company_news': { url: 'content_company_news.html', title: '公司新闻' },
    ```
3.  **Add a Link:** In `intranet.html`, add a new link to the left navigation bar:
    ```html
    <li><a href="#company_news">公司新闻</a></li>
    ```
4.  **Add Dynamic Logic (If Needed):** If the new page has interactive elements, add a new `else if (pageName === 'company_news')` block to the `Events.initPageSpecificListeners` function.

#### To Add a New Intranet Page with Day/Night Versions:
1.  **Create Content Fragments:** Create two files: `content_special_page_day.html` and `content_special_page_night.html`.
2.  **Register the Route:** In `script.js`, add a new entry to `contentRoutes` with `day` and `night` properties:
    ```javascript
    'special_page': {
        day: { url: 'content_special_page_day.html', title: 'Special Page' },
        night: { url: 'content_special_page_night.html', title: '[LOG] Special Page' }
    },
    ```
3.  **Add a Link:** In `intranet.html`, add a link like `<a href="#special_page">...</a>`. The `loadContent` function will handle the rest.

#### To Modify an Existing Intranet Page (e.g., the Forum):
1.  **Identify the File(s):** Find the route in `contentRoutes`. If it has `day` and `night` versions, you may need to edit both `content_forum_day.html` and `content_forum_night.html`.
2.  **Modify Static Content:** Edit the corresponding HTML file(s) directly.
3.  **Modify Dynamic Content:** If a page's content is still generated by JavaScript (e.g., the Award Post), find the relevant function within the `Renderers` object in `script.js` and modify the generated HTML.

### Important Considerations
- **Always Use Hashes for Intranet Navigation:** All links within the intranet must use the `href="#page_name"` format to work with the router.
- **State is King:** All dynamic content should be rendered based on the `state` object (`state.currentUser`, `state.isNight`, etc.). Do not rely on checking CSS classes directly.
- **Event Listeners for Dynamic Content:** Any event listeners for elements inside a content fragment **must** be attached in the `Events.initPageSpecificListeners` function. This is because the content is destroyed and recreated on every navigation, and listeners must be re-attached.
