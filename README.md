# NanoOrCloud — Agentic Routing Assistant

Open agentic website for the [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/) (Devpost, Cognizant + MIT NANDA + Mozilla + AWS).

The site publishes one agent network, `nanoorcloud`, that answers routing questions about [NanoOrCloud](https://offrecord-4161f.web.app) — the app that stops developers guessing when to use on-device AI. Four agents (routing coordinator + routing, savings, and product specialists) run entirely in the visitor's browser. Every number the agents report comes from deterministic site actions computed over the recorded 21 Nov 2026 sample run bundled in `actions.js` — no invented scores, latencies, or savings.

- Public network definition: `nanoorcloud.network.json` (resolved from `nanoorcloud.hocon`, Neuro SAN HOCON data model, MVP Profile 0.3)
- Site manifest: `agent-manifest.json` (CORS-enabled for peer callers)
- Peer link: `links.json` maps `challenge_guide` to the challenge's own agentic website, loaded into the visitor's browser after consent
- Runtime: `runtime/` (nsdeploy reference browser runtime, self-contained static bundle)
- Default inference: Mozilla Otari (`https://api.otari.ai/api/v1`, model `alibaba/qwen3.8-flash`); visitors can bring their own key and router (BYOK panel)

Live site: https://BaraGitDoodle-bit.github.io/nanoorcloud-agent/

Source of the network definition and actions: built with `nsdeploy` 0.1.0 from the `.hocon` + `actions.js` in the builder's workspace (see `BUILD_NOTES.md` in the challenge notes). The NanoOrCloud app itself lives at https://github.com/BaraGitDoodle-bit/nanoorcloud (MIT).
