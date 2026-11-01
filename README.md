# Local Access Forum website

A website for a Local Access Forum, published with GitHub Pages.

> **This is a demo.** It is not the website of any real Local Access Forum. Members, meetings and projects are fictional, with names from Jane Austen's *Pride and Prejudice*. The rights-of-way data on the map is real (Essex County Council, Open Government Licence v3.0).

## How it is organised

| Folder | What it holds | Who edits it |
|---|---|---|
| `demo_content/` | The demo forum: pages, members, meetings, projects, map data, site settings. Currently published | Forum maintainers |
| `content/` | A blank starter for a real forum, with the same structure. Not published until switched on | Forum maintainers |
| `_layouts/`, `_includes/`, `assets/` | The engine: page templates, styles, map code | Rarely, someone with web skills |
| `_config.yml` | Engine settings, including **which content folder is published** | Rarely |
| `docs/` | Documentation for maintainers (not published) | Anyone |

Inside the content folder, each member, meeting and project is a folder containing its text and all of its photos and files. Current items are in `_current/`; past members and completed projects are moved to `_archive/`.

## Common tasks

| Task | What to do |
|---|---|
| Add a meeting | Copy a folder in `_current/meetings/`, rename it to the meeting date, edit `index.md`, replace the PDFs |
| Add a member | Copy a folder in `_current/members/`, edit `profile.md`, replace `photo.jpg` |
| A member leaves | Add `left:` to their `profile.md` and move their folder to `_archive/members/` |
| Post a project update | Add a new file to the project's `updates/` folder |
| Close a project | Add `ended:` to its `index.md` and move its folder to `_archive/projects/` |

## Using a different content folder

Change the folder name on both of these lines in `_config.yml`:

```yaml
collections_dir: demo_content
data_dir: demo_content/_data
```

Only the named folder is published.

## More detail

- [docs/getting-started.md](docs/getting-started.md): setting up a copy of this site for your own forum, step by step.
- [docs/site-design.md](docs/site-design.md): the full design.
- [docs/credits-and-licences.md](docs/credits-and-licences.md): third-party software and data used by the site, and their licences.
