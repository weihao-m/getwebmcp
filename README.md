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

## 🚀 5-Minute Quickstart

### 1. Register a Tool (`document.modelContext.registerTool`)

```javascript
const controller = new AbortController();

await document.modelContext.registerTool({
  name: "search-products",
  description: "Search in-stock products by query and price filters",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search keyword" },
      maxPrice: { type: "number", description: "Maximum price in USD" }
    },
    required: ["query"]
  },
  async execute({ query, maxPrice }) {
    const results = await app.catalog.search({ query, maxPrice });
    return {
      content: [{ type: "text", text: JSON.stringify(results) }]
    };
  }
}, { signal: controller.signal });

// To unregister dynamically when page state changes:
// controller.abort();
```

### 2. React / Next.js Hook

```javascript
import { useEffect } from 'react';

export function useWebMCPTool(toolDefinition) {
  useEffect(() => {
    if (typeof document === 'undefined' || !document.modelContext) return;
    
    const controller = new AbortController();
    document.modelContext.registerTool(toolDefinition, { signal: controller.signal });

    return () => controller.abort();
  }, [toolDefinition]);
}
```

### 3. Universal Polyfill

For browsers that do not yet have `document.modelContext` natively built-in:

```javascript
if (typeof document !== 'undefined' && !document.modelContext) {
  document.modelContext = {
    _tools: new Map(),
    async registerTool(tool, options = {}) {
      this._tools.set(tool.name, tool);
      if (options.signal) {
        options.signal.addEventListener('abort', () => this._tools.delete(tool.name));
      }
      document.dispatchEvent(new CustomEvent('toolchange'));
    },
    async getTools() {
      return Array.from(this._tools.values());
    },
    async executeTool(tool, args) {
      return await tool.execute(args);
    }
  };
}
```

---

## 🤖 Supported by Leading AI Browser Agents

WebMCP is supported out-of-the-box by modern browser agent runtimes:

- **Dassi AI:** Built-in `tool.webmcp` engine that discovers and invokes `document.modelContext` tools in under 5ms with zero DOM scraping.
- **Claude Desktop:** MCP client integration for local agent-driven web actuation.
- **W3C WebML Working Group:** Standard proposal led by Google and Microsoft engineers.

### ⚡ Adopt with Dassi in Seconds
You can ask Dassi directly:
> *"Dassi, analyze my website at https://mysite.com and generate the W3C WebMCP tool declarations for it."*

Dassi will audit your page elements, forms, and state, and output production-ready `document.modelContext.registerTool()` code.

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
