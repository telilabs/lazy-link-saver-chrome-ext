# Lazy Link Saver

A Chrome extension that saves direct links to highlighted text fragments on any webpage so you can pick up reading exactly where you left off.

## How it works

Lazy Link Saver uses the browser's [Text Fragment](https://web.dev/text-fragments/) spec (`#:~:text=…`) to build a URL that scrolls straight to the highlighted passage when opened.

## Usage

1. Highlight text on any page.
2. Click the Lazy Link Saver icon in the toolbar.
3. Optionally add a note, then click **Save Entry**.
4. Click **Manage Saved Data** to browse, search, export, or delete your saved links.

## Features

- Save any highlighted text as a deep link back to that exact passage
- Add an optional note to each saved entry
- Search, export (JSON), import, and delete entries from the manager
- Data syncs across Chrome devices via `chrome.storage.sync`

## Installation

1. Clone or download this repository.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the repository folder.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/trk-tech/LazyLinkSaver).

## License

GPL-3.0 — see [LICENSE](LICENSE).
