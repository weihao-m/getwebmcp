# WebMCP — Model Context Protocol for the Web (W3C WebML WG)

[![WebMCP Supported](https://getwebmcp.dev/badge.svg)](https://getwebmcp.dev)
[![Website](https://img.shields.io/badge/website-getwebmcp.dev-blue)](https://getwebmcp.dev)
[![W3C Specification](https://img.shields.io/badge/W3C%20Spec-webmachinelearning%2Fwebmcp-green)](https://github.com/webmachinelearning/webmcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The developer adoption guide for the W3C Web Machine Learning Working Group standard.**  
> Proposed by Microsoft, Google, and the WebML Community. Turn any web application into a callable, structured API surface for AI agents in 5 minutes via `document.modelContext`.

Website & Adoption Hub: **[https://getwebmcp.dev](https://getwebmcp.dev)**  
Official Specification: **[https://github.com/webmachinelearning/webmcp](https://github.com/webmachinelearning/webmcp)**

---

## 🌟 Why WebMCP?

External Model Context Protocol (MCP) integrations connect AI models directly to backend servers. However, backend integrations bypass the browser UI, discard live user session state, and require complex server infrastructure.

**WebMCP** introduces a browser-native standard (`document.modelContext`):
- **Synchronized UI:** Actions take place inside the active browser document; front-end application state and visible UI stay in perfect sync.
- **Zero Scraping:** Agents call typed JavaScript functions instead of simulating brittle clicks on DOM elements.
- **Sub-5ms Execution:** Client-side execution with zero external network roundtrips.
- **Privacy & Origin Isolation:** Tools execute within the user's active session without sharing credentials or tokens.

---

## 🛠️ The Two Real Ways to Setup WebMCP

Modern web applications use dynamic state, component frameworks, and client routers. WebMCP provides two practical paths for adoption:

### Method 1: The 1-Line Coding Agent Setup (For Git Codebases)
Give this instruction to your AI coding assistant (**Cursor**, **Claude Code**, **Copilot**, or **Aider**):

```text
Read https://getwebmcp.dev/agent.md and implement WebMCP for this codebase
```

The agent reads the W3C specification guide at [https://getwebmcp.dev/agent.md](https://getwebmcp.dev/agent.md), inspects your project components, and registers native `document.modelContext.registerTool()` handlers tailored to your actual application logic.

---

### Method 2: 1-Click Setup with Dassi AI (For Live Sites & Non-Git)
For live websites (WordPress, Shopify, Webflow, custom apps):
1. Open your website in Chrome with **Dassi AI**.
2. Instruct Dassi:
   > *"Dassi, inspect this website and setup WebMCP tools for all interactive actions."*
3. Dassi audits your live UI, tests actions, and either:
   - Opens a ready-to-merge GitHub Pull Request for your repository, or
   - Injects a tailored browser adapter for non-git sites so AI agents can call tools directly.

---

## 🔍 WebMCP Inspector

Validate whether your website adheres to the W3C WebMCP specification:  
👉 **[https://getwebmcp.dev/#inspector](https://getwebmcp.dev/#inspector)**

---

## 🛡️ Add the Badge

Show users and AI agents that your application natively supports W3C WebMCP:

```markdown
[![WebMCP Supported](https://getwebmcp.dev/badge.svg)](https://getwebmcp.dev)
```

---

## 🤝 Specification & Resources

- **Official W3C Specification Draft:** [webmachinelearning/webmcp](https://github.com/webmachinelearning/webmcp)
- **TypeScript Types:** [`webmcp-types`](https://www.npmjs.com/package/webmcp-types)
- **Adoption Hub:** [https://getwebmcp.dev](https://getwebmcp.dev)
- **License:** MIT
