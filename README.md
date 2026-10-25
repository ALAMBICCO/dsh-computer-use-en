# dsh-computer-use-en

English port of [`@copylee/dsh-computer-use`](https://www.npmjs.com/package/@copylee/dsh-computer-use) with DSH `0.2.1` unpacked `koffi.node` auto-discovery.

Let DeepSeek Harness directly observe and operate your Windows desktop: view the screen, click the mouse, type on the keyboard, launch or focus apps, manage windows, read Windows UI Automation (`UIA`) trees, and read/write the clipboard. While in control, an **orange screen glow** and status pill (**"DeepSeek Harness is controlling your computer"**) appear on screen, and DeepSeek Harness minimizes into a draggable **mini progress card** in the bottom-right corner showing streaming replies and recent steps. Press **Esc** at any time to pause or resume, or click **Stop** to end the turn.

Windows 10 (2004+) / Windows 11 only.

## Features

| Feature | Description |
|---|---|
| **Screenshot coordinate space** | The model works directly in pixel coordinates of the latest screenshot; DPI scaling and multi-monitor offsets are converted automatically (accurate even at 150%–200% scaling). |
| **Auto-screenshot after actions** | Clicks, typing, keys, scrolling, and `wait` wait for the screen to settle (up to ~2.5s) and return a fresh screenshot automatically in a single round-trip. |
| **Batched actions (`computer_batch`)** | Execute multi-step sequences (e.g., focus field → type text → press Enter → wait for dialog → save) in a single tool call. |
| **Target controls by name (`target`)** | Pass `target` (e.g. `"Save"` or `"button:OK"`) instead of coordinates — works even for menu items or dialog buttons that appear mid-batch (waits up to 3s). |
| **Wait for conditions (`until`)** | `wait` with `until` (`"window:Save As"`, `"target:Save"`) proceeds as soon as the window or control appears (or disappears with `gone: true`). |
| **Read windows as text (`ui_elements`)** | Pass `text: true` to `ui_elements` (or `finish: "text"` to `computer_batch`) to read documents, web pages, chat replies, or logs directly via UI Automation without scrolling screenshots. |
| **Per-app access control** | Requests per-session permission via `request_access` (auto-approved when using the `danger-full-access` preset), or switch to **Allow all apps** in Settings. Never controls DeepSeek Harness itself or password managers. |
| **Mini progress card & overlay** | Floating bottom-right progress card streams the AI's reply and step timeline, is excluded from AI screenshots (`WDA_EXCLUDEFROMCAPTURE`), and lets clicks pass through. |
| **Instant human handoff (`Esc`)** | Press physical **Esc** to pause/resume; typing on the physical keyboard pauses the AI until you stop, and switching windows makes the AI re-check the screen before acting. |
| **Clean clipboard & streaming input** | Long text is streamed paragraph-by-paragraph without triggering editor auto-format glitches, stays out of Windows Clipboard History (`Win+V`), and restores your clipboard afterward. |
| **App Skills (`app_skill`)** | Per-application Markdown notes (`~/.dsh/computer-use-skills/`) automatically attached when `open_application` opens an app, with 10 built-in English skills (Chrome, Word, Excel, PowerPoint, File Explorer, Notepad, Obsidian, Typora, WeChat, QQ). |
| **Zero native build steps** | Uses DSH's signed in-box `koffi.node` for fast in-process screenshots/input and compiles `helper/CuHelper.cs` on first run via Windows' built-in .NET Framework `csc.exe`. |

## Installation

From GitHub Release or GitHub:

```bash
dsh plugin --profile web add "https://github.com/ALAMBICCO/dsh-computer-use-en/releases/download/v0.8.1/dsh-computer-use-en-0.8.1.tgz"
```

## Agent Tools

| Tool | Description |
|---|---|
| `computer` | Single desktop action: `screenshot`, `left_click`, `double_click`, `triple_click`, `right_click`, `middle_click`, `mouse_move`, `left_click_drag`, `left_mouse_down`, `left_mouse_up`, `scroll`, `type`, `key`, `hold_key`, `wait`, `zoom`, `cursor_position`. |
| `computer_batch` | Run an ordered array of actions in one round-trip, stopping on the first error and returning one settled screenshot (or window text). |
| `open_application` | Open an app by Start Menu name, desktop shortcut, `.exe` path, or URL; brings running windows to the front or restores tray apps from their notification-area icon. |
| `windows` | `list`, `focus`, `minimize`, `maximize`, `restore`, `close`, or `tidy` top-level windows. |
| `ui_elements` | Read clickable/editable UI Automation controls with screenshot-space coordinates, or pass `text: true` to read window text. |
| `clipboard` | Read or write plain text to the Windows clipboard (restored after the turn). |
| `switch_display` | List monitors or switch which display screenshots and coordinates target. |
| `app_skill` | `list`, `read`, `append`, or `write` per-application operating notes. |
| `request_access` / `list_granted_applications` | Request and inspect per-session app control grants. |

## Credits & License

MIT License. Based on [`@copylee/dsh-computer-use`](https://www.npmjs.com/package/@copylee/dsh-computer-use) by copylee, translated to English and adapted for DSH 0.2.1 unpacked `koffi.node` resolution.
