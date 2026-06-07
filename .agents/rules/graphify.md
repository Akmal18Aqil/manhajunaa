---
trigger: always_on
description: Consult the graphify knowledge graph at graphify-out/ for codebase and architecture questions.
---

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- **CRITICAL / MANDATORY**: BEFORE you execute ANY command, perform ANY manual search (like grep or find), or write ANY code, you MUST FIRST check the graphify knowledge graph if it's relevant to codebase exploration. When `graphify-out/graph.json` exists, you MUST run `python -m graphify query "<question>"` (CLI) or `query_graph` (MCP) as your very first step to locate components.
- Use `python -m graphify path "<A>" "<B>"` / `shortest_path` for relationships and `python -m graphify explain "<concept>"` / `get_node` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context
- **CRITICAL / MANDATORY**: After modifying ANY code file in this session, your VERY LAST action before concluding the task MUST be to run `python -m graphify update .` to keep the graph current. You MUST add this as a checklist item to all your plans.
