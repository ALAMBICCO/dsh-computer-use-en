---
app: Obsidian
match: Obsidian, obsidian.exe
summary: Creating notes, Markdown typing behavior, shortcuts
---
- Create or open a note: press `ctrl+o` to open Quick Switcher, type the note name, and press `Return` (a non-existent name creates a new note). `ctrl+n` creates an untitled note.
- Notes are plain `.md` files inside the vault directory; after typing you can read the file to verify its contents (do not write the file from a shell instead of typing in the app).
- Enter long text with `type` (streamed paragraph by paragraph): `$...$`, `$$...$$`, `**bold**`, and headings enter literally without being mangled by auto-pair completion.
- Lists auto-continue: pressing `Return` after `- item` inserts the next `- ` automatically. When typing line-by-line, only include `- ` on the first item; press `Return` twice to exit the list.
- Leave a blank line before headings (`## `) so they render cleanly.
- Shortcuts: `ctrl+o` Quick Switcher / new note; `ctrl+n` new note; `ctrl+p` Command Palette; `ctrl+e` toggle Edit / Reading view; `ctrl+f` find in note, `ctrl+shift+f` search vault; `ctrl+b` / `ctrl+i` bold / italic; `ctrl+k` insert link; `ctrl+w` close active tab; `ctrl+Home` / `ctrl+End` start / end of note; `ctrl+z` undo; `ctrl+,` Settings.
