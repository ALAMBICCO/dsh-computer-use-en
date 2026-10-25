---
app: QQ
match: QQ, QQ.exe
summary: Restore from system tray, batch-save group files
---
- When closed, QQ minimizes to the system tray; use `open_application` to restore it. Never launch a second QQ instance (which opens a second login window) or force hidden windows visible from a shell (which freezes the UI).
- QQ's window exposes no UI Automation controls (`ui_elements` is empty); rely on screenshots.
- Search for a chat or group using the top-left search box.
- Confirm with the user before sending messages; press `Escape` to dismiss popups or menus.
