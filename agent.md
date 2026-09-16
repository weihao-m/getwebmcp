# WebMCP Implementation Guide for AI Coding Agents

> This document is designed for AI coding agents (Cursor, Claude Code, GitHub Copilot, Windsurf, Aider) to automatically adapt any codebase to W3C WebMCP (`document.modelContext`).

---

## What You Need to Do

Your goal is to expose key user-facing actions in this web application as typed, callable **WebMCP tools** so AI browser agents (like Dassi AI, Claude, and Chrome AI) can execute actions with zero scraping.

Follow these 4 implementation steps:

### Step 1: Ensure `document.modelContext` is Available
If the browser does not yet have native `document.modelContext`, initialize the universal shim:

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

### Step 2: Identify High-Value Interactive Actions
Audit the codebase for user actions that an AI agent would want to perform:
1. **Search & Filters:** Search catalogs, filter lists, sort results.
2. **Data Ingestion & Navigation:** Fetch details, open modals, view tabs.
3. **User Submissions:** Add to cart, submit contact forms, save preferences, update profile.

### Step 3: Register Tools with `registerTool()`
For each action, call `document.modelContext.registerTool`:

```javascript
const controller = new AbortController();

await document.modelContext.registerTool({
  name: "search-items",
  description: "Search items with optional keyword and category filter",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search term" },
      category: { type: "string", description: "Category filter" }
    },
    required: ["query"]
  },
  async execute({ query, category }) {
    // 1. Invoke the native application state/API
    const results = await app.search({ query, category });
    
    // 2. Keep visible DOM / UI in sync
    updateSearchResultsUI(results);

    // 3. Return structured response to the agent
    return {
      content: [{ type: "text", text: JSON.stringify(results) }]
    };
  }
}, { signal: controller.signal });
```

### Step 4: Component Lifecycle (React, Vue, Svelte)
If the project uses a component framework, unregister tools when the component unmounts:

```javascript
// React / Next.js Example
import { useEffect } from 'react';

export function useWebMCP(toolDefinition) {
  useEffect(() => {
    if (typeof document === 'undefined' || !document.modelContext) return;
    
    const controller = new AbortController();
    document.modelContext.registerTool(toolDefinition, { signal: controller.signal });

    return () => controller.abort();
  }, [toolDefinition]);
}
```

---

## Best Practices
- **Clear Descriptions:** Write natural language descriptions stating *what* the tool does and *when* an agent should call it.
- **Synchronize UI:** Always ensure the web page's visual UI updates when a tool is called.
- **Handle Errors:** Return clear error messages in `content` so the agent can self-correct.
