# Map data

## rights-of-way.geojson

Public rights of way (footpaths, bridleways, restricted byways, byways) for the county.

| | |
|---|---|
| Source | Essex County Council, [Public Rights of Way GIS Data](https://data.essex.gov.uk/dataset/em40y/public-rights-of-way-gis-data) |
| Licence | [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) |
| Attribution | Contains public sector information licensed under the Open Government Licence v3.0. Rights of way data © Essex County Council. Contains Ordnance Survey data © Crown copyright and database right 2026 (unconfirmed: Essex's dataset page does not mention OS data). |
| Source data dated | 7 August 2026 |
| Downloaded | 1 November 2026 |
| Features | 10,671 (9,227 footpaths, 1,111 bridleways, 297 byways, 36 restricted byways) |

### Important

This data is an interpretation of the Definitive Map, **not the Definitive Map itself**. It must not be relied on to determine the legal position or alignment of a right of way. The council advises it may be inaccurate when viewed at more detail than 1:10,000.

### Processing

The council supplies MapInfo files in British National Grid. They were converted for web use:

1. Reprojected from British National Grid (EPSG:27700) to WGS 84 (EPSG:4326).
2. Lines simplified to a 2 metre tolerance.
3. Coordinates rounded to 5 decimal places (about 1 metre).
4. Fields kept and renamed:

| Field | Original | Example |
|---|---|---|
| `id` | `Central_Asset_ID` | `PROW 211_107` |
| `parish` | `Parish` | `Waltham Abbey` |
| `number` | `Path_Number` | `107` |
| `type` | `Classification` | `Footpath` |
| `district` | `District` | `Epping Forest` |

The council updates its data quarterly.
