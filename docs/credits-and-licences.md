# Credits and licences

This page lists everything in, or used by, this website that comes from someone else, with the terms under which it is used. Keep it up to date when adding or replacing anything listed here.

## Summary

| What | Owner | Licence | Credit required | Where it is |
|---|---|---|---|---|
| Leaflet (map software) | Volodymyr Agafonkin and CloudMade | BSD 2-Clause | Keep copyright notice and licence text | `assets/vendor/leaflet/` |
| Base map tiles and data | OpenStreetMap contributors | Open Database Licence; tiles under the OSMF Tile Usage Policy | "© OpenStreetMap contributors", shown on the map | Loaded from `tile.openstreetmap.org` |
| Essex rights of way | Essex County Council | Open Government Licence v3.0 | Council credit and OGL statement, shown on the map; Ordnance Survey credit (unconfirmed) | `demo_content/_general/map/rights-of-way.geojson` |
| Jekyll, jekyll-sitemap | Jekyll contributors | MIT | None (not distributed with the site) | Run by GitHub Pages |
| Demo names | Jane Austen, *Pride and Prejudice* (1813) | Public domain | None | `demo_content/` |
| Demo photos, images and PDFs | Created for this project | See [This project's own licence](#this-projects-own-licence) | None | `demo_content/` |
| Site icon | Created for this project | See [This project's own licence](#this-projects-own-licence) | None | `assets/favicon.svg` |

## Leaflet

[Leaflet](https://leafletjs.com/) is the open-source JavaScript library that displays the interactive maps: panning, zooming, drawing lines and areas, popups, markers, and the layers button. The site's own map code (`assets/js/map.js`) is built on it. Leaflet contains no map data.

- **Version:** 1.9.4
- **Licence:** [BSD 2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE). It allows use, copying, modification and redistribution, including on public websites, free of charge. The software is provided "as is", without warranty.
- **Conditions:** keep the copyright notice and licence text with the files. The notice is at the top of `leaflet.js` and the full licence is in `assets/vendor/leaflet/LICENSE`. Do not remove either.
- **Map credit:** Leaflet adds a "Leaflet" link, with a small Ukrainian flag, to the corner of each map. The licence does not require it, but it is customary to keep it.

### Why a copy is kept in this repository

Many websites load Leaflet from a public file server (a CDN). This site keeps its own copy in `assets/vendor/leaflet/` so that:

- the map does not depend on another service staying available
- the version cannot change unexpectedly
- there is nothing to install or build

The cost is that updates are not automatic. To update Leaflet, download the new version's `leaflet.js`, `leaflet.css`, `images/` folder and `LICENSE` from [leafletjs.com](https://leafletjs.com/download.html), replace the files in `assets/vendor/leaflet/`, check the maps still work, and update the version number above.

## OpenStreetMap

The base map (roads, towns, rivers, woods, fields) shows [OpenStreetMap](https://www.openstreetmap.org/) data, drawn as image tiles served by the OpenStreetMap Foundation.

- **Data licence:** [Open Database Licence](https://www.openstreetmap.org/copyright). Requires the credit "© OpenStreetMap contributors" with a link, which appears in the corner of every map.
- **Tile service:** used under the [OSMF Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/). The service is free, run by volunteers and donations, and comes with no guarantee of availability. It is intended for light use; a Local Access Forum website is well within this.
- **If traffic grows**, or the forum needs guaranteed availability, switch to a commercial or self-hosted tile provider. The tile address is set in `createMap()` in `assets/js/map.js`.

## Rights of way data (Essex)

The footpaths, bridleways and byways on the demo's map come from Essex County Council's [Public Rights of Way GIS data](https://data.essex.gov.uk/dataset/em40y/public-rights-of-way-gis-data).

- **Licence:** [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). Allows copying, publishing and adapting the data, including converting it for web use, provided the source is credited.
- **Credit shown on the map:** "Rights of way © Essex County Council. Contains public sector information licensed under the Open Government Licence v3.0 (linked). Contains OS data © Crown copyright and database right 2026." OGL requires an attribution statement; the council's dataset page specifies none, so the licence's standard wording is used, with a link to the licence.
- **Ordnance Survey credit:** included as a precaution because council rights-of-way data is commonly derived from OS mapping. Essex's dataset page does not mention OS data, so this is **unconfirmed**. Check the "Important Information about GIS Data" document in the council's download, or ask Essex Highways (SIC@essexhighways.org), and remove the OS line if it does not apply. The wording is set in `rights_of_way_attribution` in the content folder's `_data/site.yml`; update the year when the data is refreshed.
- **Not the Definitive Map:** the data is an interpretation of the legal Definitive Map, not the Definitive Map itself. The council warns it may be inaccurate at scales more detailed than 1:10,000. The map's key says so, and this must not be removed.
- **Modified:** the lines were simplified for web display (see the processing notes below). The key says so.
- **Source, processing and dates:** see `demo_content/_general/map/README.md`.

A forum using data from another council must check that council's licence and change the credit to match.

## Jekyll and GitHub Pages

The site is built by [Jekyll](https://jekyllrb.com/) with the [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) plugin, both under the MIT licence. GitHub runs them when it builds the site; neither is included in the published site or in this repository, so no credit is required.

Hosting on GitHub Pages is subject to [GitHub's terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and the [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Demo content

- **Names** of members, places and projects come from Jane Austen's *Pride and Prejudice* (1813), which is in the public domain. They are used so that the demo is obviously fictional.
- **Member photos** are generated placeholders (initials on a coloured background, marked "DEMO"). They are not pictures of real people.
- **Project images and PDFs** (agendas, minutes, reports, survey form) were generated for this demo and are marked as fictional.

## Fonts

The site uses each visitor's own system fonts. No font files are included or downloaded.

## This project's own licence

This repository does not yet have a licence of its own. Until it has one, other people and forums have no formal permission to copy or reuse its code or text, even though it is public on GitHub.

Because the site is meant to be reused by other Local Access Forums, the forum should choose a licence and add it as a `LICENSE` file at the top level of the repository. Common choices are:

| Licence | Suits | Effect |
|---|---|---|
| [MIT](https://choosealicense.com/licenses/mit/) | The code (layouts, styles, scripts) | Anyone may reuse and adapt it, provided they keep the copyright notice |
| [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) | Written content and documentation | Anyone may reuse and adapt it, provided they credit the source |

[choosealicense.com](https://choosealicense.com/) explains the options. A forum's own content (member biographies and photos, minutes) does not need to be offered for reuse; the licence can cover the engine and documentation only, and say so.
