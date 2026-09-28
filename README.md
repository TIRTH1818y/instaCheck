this is update
# 📸 Instagram Data Analyzer (by Instaddict)

> **Understand your Instagram activity, connections, content and account data.**  
> Instaddict has been upgraded into a complete **Instagram Data Analyzer & Personal Dashboard**. Process your official Instagram data package 100% privately on your local device — zero servers, zero scraping, zero login credentials required!

![Instagram Data Analyzer Banner](./assets/examples/example.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](https://opensource.org/licenses/MIT)
[![Svelte](https://img.shields.io/badge/Svelte-v3.0-orange.svg)](https://svelte.dev)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-green.svg)](#-privacy--security)

---

## ✨ Comprehensive Features & Modules

### 1. 📁 Universal Import System
- **Multi-Format Support**: Drop your raw `.ZIP` archive, extracted directory folder, or individual `.JSON` files.
- **Auto Scanner & Categorizer**: Scans files, builds a normalized data model, detects available Instagram categories, and highlights missing categories without generating fake data.

### 2. 📊 Executive Dashboard (`/dashboard`)
- **"Your Instagram in Numbers"**: Top cards for Followers, Following, Posts, Reels, Stories, Likes, Comments, Saved Items, Messages, and Searches.
- **Connection Math**: Mutuals ($followers \cap following$), Non-followers ($following - followers$), and You Don't Follow Back.
- **Frappe Charts**: Growth trends, peak activity by hour, monthly activity moments, and weekday distributions.

### 3. 👥 Connections & Relationship Analytics (`/connections`)
- **Category Tabs**: Followers, Following, Mutual Connections, Don't Follow Back, You Don't Follow Back, Close Friends, Blocked Accounts, Pending Requests, Received Requests, Muted, Restricted, and Recently Unfollowed.
- **Auto Multi-File Merging**: Automatically merges split follower exports (`followers_1.json`, `followers_2.json`, `followers_3.json`, etc.).
- **Interactive Tools**: Live search, column sorting, pagination, CSV export, and JSON export.

### 4. 👤 Profile & Sensitive Personal Info (`/profile`)
- Display Name, Username, Bio, Creation Date, Account Type, Professional Category, and Profile Picture.
- **Sensitive Data Protection**: Email, Phone Number, Date of Birth, and Coordinates are masked by default with a *"Show sensitive information"* confirmation button.

### 5. 📸 Content & Media Library (`/posts`, `/reels`, `/stories`, `/media`)
- **Posts & Reels**: Published posts grid, video player for Reels, captions, and location tags.
- **Stories & Interactions**: Story media viewer plus sticker analytics for Polls, Quizzes, Questions, and Emoji Sliders.
- **Media Library**: Photo and video gallery with filterable media types (Images, Videos, Audio), file metadata, and Lightbox modal previews.

### 6. 💬 Interactions & Activity Feed (`/comments`, `/likes`, `/messages`, `/activity`)
- **Comments & Likes**: Full comment log with post refs, liked posts, reels, and comment links.
- **Direct Messages**: Inbox conversations list, sent vs received breakdown, and chat history viewer with attachment previews.
- **Activity Center**: Unified chronological timeline across all account actions with type filters.

### 7. 🔒 Privacy, Security & Insights (`/security`, `/apps-websites`, `/locations`, `/ads`)
- **Apps & Websites**: Third-party off-Instagram app integrations audit.
- **Security Audit**: Active login sessions, IP addresses, logouts, and password change counters.
- **Location Logs**: Last known location history with coordinate protection.
- **Ads Targeting**: Advertisers who targeted your account and inferred interest topics.

### 8. 🗂️ Generic Data Explorer & Reports (`/data-explorer`, `/reports`)
- **JSON Data Explorer**: Interactive expandable file tree to browse raw `.JSON` files and future schema updates.
- **Report Generator**: Export printable formatted PDF reports, CSV summary spreadsheets, or full normalized JSON files.
- **Interactive Demo Mode**: Full realistic mock data mode to explore all 35 features without uploading personal data.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- `npm` or `yarn`

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TIRTH1818y/instaddict.git
   cd instaddict
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build or start dev server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to **[http://localhost:5000](http://localhost:5000)**.

---

## 🔒 Privacy & Security

- **Local Execution**: All analysis is performed entirely inside your browser using client-side JavaScript.
- **Zero Third-Party Uploads**: No data is sent to external servers.
- **No Credentials Required**: Does not request Instagram passwords or private API access.

---

## 🛠️ Built With

- **[Svelte](https://svelte.dev)** - Reactive UI Framework
- **[Rollup](https://rollupjs.org)** - Fast Module Bundler
- **[svelte-routing](https://github.com/EmilTholin/svelte-routing)** - Single Page Routing
- **[Frappe Charts](https://frappe.io/charts)** - Lightweight SVG Charts
- **[fflate](https://github.com/10142923/fflate)** - High Performance ZIP Extraction

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

Made with ❤️ by **[novabro](https://in.linkedin.com/in/sonigara-tirth-7153b830b)**.