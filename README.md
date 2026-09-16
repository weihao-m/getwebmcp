# WebMCP — Model Context Protocol for the Web

[![WebMCP Supported](https://getwebmcp.dev/badge.svg)](https://getwebmcp.dev)
[![Website](https://img.shields.io/badge/website-getwebmcp.dev-blue)](https://getwebmcp.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The open adoption standard for AI browser agents and web applications.**  
> Turn any web application into a callable, structured API surface for AI agents in 5 minutes.

Website & Documentation: **[https://getwebmcp.dev](https://getwebmcp.dev)**

---

## 🌟 Why WebMCP?

AI browser agents (such as Claude Computer Use, Omnify Dassi, and browser copilots) browse the web today by simulating mouse clicks and parsing messy DOM trees.

**WebMCP** changes this by allowing web applications to declare native, callable tools directly inside the browser session:
- **Zero Scraping:** No fragile CSS selectors or coordinate clicks. Agents call typed JavaScript functions.
- **Sub-5ms Execution:** Runs client-side inside the active browser document with zero round-trip latency.
- **Privacy by Design:** Operates inside the user's authenticated session without passing credentials or API keys to external servers.

---

## 🚀 5-Minute Quickstart

### 1. HTML / Script Tag
Include the WebMCP client library in your web application:
```html
<script src="https://unpkg.com/@jason.today/webmcp@latest/dist/webmcp.js"></script>

<script>
  const mcp = new WebMCP();

  // Register a tool callable by AI agents
  mcp.registerTool(
    "search_products",
    "Search catalog products with pricing filters",
    {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term" },
        maxPrice: { type: "number", description: "Max price in USD" }
      },
      required: ["query"]
    },
    async function(args) {
      const results = await window.app.search(args);
      return {
        content: [{ type: "text", text: JSON.stringify(results) }]
      };
    }
  );
</script>
```

### 2. React / Next.js
```javascript
import { useEffect } from 'react';

export function useWebMCPTool(toolDefinition) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.webMCP = window.webMCP || new window.WebMCP();
    window.webMCP.registerTool(
      toolDefinition.name,
      toolDefinition.description,
      toolDefinition.parameters,
      toolDefinition.handler
    );
  }, [toolDefinition]);
}
```

---

## 🔍 Live WebMCP Inspector

Test whether your website properly exports WebMCP tools:  
👉 **[https://getwebmcp.dev/#inspector](https://getwebmcp.dev/#inspector)**

---

## 🛡️ Add the Badge

Show users and AI agents that your application natively supports WebMCP:

```markdown
[![WebMCP Supported](https://getwebmcp.dev/badge.svg)](https://getwebmcp.dev)
```

---

## 🤝 Community & Ecosystem

- **Website:** [https://getwebmcp.dev](https://getwebmcp.dev)
- **Official Specification:** [jasonjmcghee/WebMCP](https://github.com/jasonjmcghee/WebMCP)
- **License:** MIT
