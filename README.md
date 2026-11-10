# Local Access Forum website

A website for a Local Access Forum, published with GitHub Pages.

> **This is a demo.** It is not the website of any real Local Access Forum. The forum and its projects are fictional, with names from Jane Austen's *Pride and Prejudice*. The rights-of-way data on the map is real (Essex County Council, Open Government Licence v3.0).

## How it is organised

| Folder | What it holds | Who edits it |
|---|---|---|
| `demo_content/` | The demo forum: pages, projects, how-to guides, glossary, resources, map data, site settings. Currently published | Forum maintainers |
| `content/` | A blank starter for a real forum, with the same structure. Not published until switched on | Forum maintainers |
| `_layouts/`, `_includes/`, `assets/` | The engine: page templates, styles, map code | Rarely, someone with web skills |
| `_config.yml` | Engine settings, including **which content folder is published** | Rarely |
| `docs/` | Documentation for maintainers (not published) | Anyone |

The site is about projects and resources. It does not hold member lists or meeting papers, which already have an online home elsewhere.

Inside the content folder, each project and each how-to guide is a folder containing its text and all of its images and files. Current items are in `_current/`; completed projects are moved to `_archive/`. The glossary and the resource links are single files in `_data/`.

## Common tasks

Members make changes on a branch and open a pull request for review; see the [editing guide](docs/editing-guide.md) for step-by-step instructions.

| Task | What to do |
|---|---|
| Add a how-to guide | Copy a folder in `_current/guides/`, rename it, edit `index.md` |
| Add a glossary term | Add a term and definition to `_data/glossary.yml` |
| Add a resource link | Add a name and address to `_data/resources.yml` |
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

- [docs/editing-guide.md](docs/editing-guide.md): how forum members update the site, using branches and pull requests reviewed before going live.
- [docs/getting-started.md](docs/getting-started.md): setting up a copy of this site for your own forum, step by step.
- [docs/site-design.md](docs/site-design.md): the full design.
- [docs/go-live-checklist.md](docs/go-live-checklist.md): steps to turn the demo into the forum's real website, if the forum adopts it.
- [docs/credits-and-licences.md](docs/credits-and-licences.md): third-party software and data used by the site, and their licences.
