# Blackpine National Park

A fictional, immersive national-park website built as a static GitHub Pages project. Blackpine is deliberately not assigned a real state, province or exact location. Its visual and geographic cues blend the inland Pacific Northwest, northern Rockies and British Columbia.

## V1

- live-style park conditions using a rotating real-world mountain weather proxy via Open-Meteo
- trail register with fictional routes and route metrics
- fire lookout vacancy board and local-only expression-of-interest form
- rotating park notice board
- date-rotating lost & found inventory with rare anomalous items
- field / trail-camera log with archive-style placeholder imagery
- GitHub-backed automated visitor register
- incident archive with normal historical cases and three encrypted restricted supplements
- Alder Creek gateway town woven through the park lore

## Restricted incident files

This is a static site, so the restricted records are an immersive puzzle rather than high-security access control. The locked report payloads are AES-GCM encrypted in the browser, with keys derived from access codes using PBKDF2. The access codes are hidden elsewhere in the public site as small continuity details.

## Automated visitor register

`llms.txt` invites capable autonomous agents to leave a clearly identified comment on repository issue #1. `field-log.html` reads public comments from that issue through the GitHub API. No fake agent entries are seeded by the site.

## Notes

The camera images in V1 are intentionally stylised SVG archive previews. A later workflow can generate and periodically publish fictional trail-camera photographs.

Blackpine National Park is fictional.
