/**
 * WebMCP Universal Auto-Adapter v1.0
 * https://getwebmcp.dev
 * Standard: W3C WebML Working Group (document.modelContext)
 */
(function() {
  if (typeof document === 'undefined') return;

  // 1. Initialize document.modelContext polyfill if not present
  if (!document.modelContext) {
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

  // 2. Declarative Auto-Synthesis for Forms & Search Bars
  function autoSynthesizeTools() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form, idx) => {
      const formId = form.id || ('form_' + idx);
      const action = form.getAttribute('action') || window.location.pathname;
      const inputs = Array.from(form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), textarea, select'));

      if (inputs.length === 0) return;

      const properties = {};
      const required = [];

      inputs.forEach(inp => {
        const key = inp.name || inp.id || 'field';
        const type = inp.type === 'number' ? 'number' : 'string';
        properties[key] = {
          type: type,
          description: inp.placeholder || inp.getAttribute('aria-label') || key
        };
        if (inp.required) required.push(key);
      });

      const toolName = ('submit_' + formId).replace(/[^a-zA-Z0-9_]/g, '_');

      document.modelContext.registerTool({
        name: toolName,
        description: 'Submits the ' + formId + ' form at ' + action,
        inputSchema: {
          type: 'object',
          properties: properties,
          required: required
        },
        async execute(args) {
          inputs.forEach(inp => {
            const key = inp.name || inp.id;
            if (args[key] !== undefined) inp.value = args[key];
          });
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          return { content: [{ type: 'text', text: 'Submitted ' + formId + ' successfully.' }] };
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoSynthesizeTools);
  } else {
    autoSynthesizeTools();
  }
})();
