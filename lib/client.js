window.__ModuleLoader__.load({
	id: "dsh-computer-use-en",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		//#region lib/types/settings.js
		/** The Loader entry id (settings namespace); see cordis.patch.yml. */
		const ENTRY_ID = "copylee-computer-use";
		const DEFAULTS = {
			accessMode: "per-app",
			overlay: true,
			overlayLabel: "DeepSeek Harness",
			hostWindow: "pet",
			cardOpacity: 80,
			autoScreenshot: true,
			settleMs: 400,
			maxLongEdge: 1366,
			maxPixels: 115e4,
			jpegQuality: 70,
			blockedApps: [],
			pauseOnUserInput: true,
			userIdleMs: 1500,
			typingMode: "stream",
			quickSteps: false,
			nativeHelper: true
		};
		/** Unwrap `.volatile()` refs (`{ get() }`) and fall back to defaults for bad values. */
		function resolveConfig(raw) {
			const out = {};
			if (raw !== null && typeof raw === "object") for (const [key, value] of Object.entries(raw)) out[key] = value !== null && typeof value === "object" && typeof value.get === "function" ? value.get() : value;
			const num = (key, min, max) => {
				const value = out[key];
				return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : DEFAULTS[key];
			};
			const bool = (key) => typeof out[key] === "boolean" ? out[key] : DEFAULTS[key];
			return {
				accessMode: out.accessMode === "allow-all" || out.accessMode === "per-app" ? out.accessMode : DEFAULTS.accessMode,
				overlay: bool("overlay"),
				overlayLabel: typeof out.overlayLabel === "string" && out.overlayLabel.trim() !== "" ? out.overlayLabel.trim().slice(0, 40) : DEFAULTS.overlayLabel,
				hostWindow: out.hostWindow === "pet" || out.hostWindow === "card" || out.hostWindow === "minimize" || out.hostWindow === "keep" ? out.hostWindow : out.minimizeHostWindow === true ? "minimize" : DEFAULTS.hostWindow,
				cardOpacity: num("cardOpacity", 30, 100),
				autoScreenshot: bool("autoScreenshot"),
				settleMs: num("settleMs", 0, 5e3),
				maxLongEdge: num("maxLongEdge", 640, 3840),
				maxPixels: num("maxPixels", 3e5, 8e6),
				jpegQuality: num("jpegQuality", 30, 100),
				pauseOnUserInput: bool("pauseOnUserInput"),
				userIdleMs: num("userIdleMs", 300, 1e4),
				quickSteps: bool("quickSteps"),
				nativeHelper: bool("nativeHelper"),
				typingMode: out.typingMode === "stream" || out.typingMode === "type" || out.typingMode === "paste" ? out.typingMode : DEFAULTS.typingMode,
				blockedApps: Array.isArray(out.blockedApps) ? out.blockedApps.filter((item) => typeof item === "string" && item.trim() !== "") : []
			};
		}
		//#endregion
		//#region lib/types/client/accent.js
		/**
		* The accent colour shared by the copylee DSH plugins (docs/ui-spec.md).
		*
		* One choice — terracotta orange by default, blue or black — is kept in the
		* browser under a key every plugin reads, and painted as two CSS variables on
		* `<body>`, where the Host keeps its own theme variables. A plugin's styles
		* only ever write `var(--cl-accent)` / `var(--cl-accent-ink)`, so changing the
		* colour in any plugin's settings recolours all of them at once.
		*
		* This file is identical in every plugin; change it in all of them together.
		*/
		const ACCENTS = {
			orange: {
				name: "Terracotta Orange",
				accent: "#D97757",
				ink: "#FFFFFF"
			},
			blue: {
				name: "Blue",
				accent: "#3D63E6",
				ink: "#FFFFFF"
			},
			black: {
				name: "Black",
				accent: "var(--dsw-alias-label-primary, #1F1E1D)",
				ink: "var(--dsw-alias-bg-base, #FFFFFF)"
			}
		};
		const ACCENT_IDS = Object.keys(ACCENTS);
		const DEFAULT_ACCENT = "orange";
		/** Use these in styles; the fallbacks cover the moment before the first paint. */
		const ACCENT = `var(--cl-accent, ${ACCENTS[DEFAULT_ACCENT].accent})`;
		const ACCENT_INK = `var(--cl-accent-ink, ${ACCENTS[DEFAULT_ACCENT].ink})`;
		const KEY = "copylee.dsh.accent";
		const EVENT = "copylee-dsh-accent";
		function isAccent(value) {
			return typeof value === "string" && Object.hasOwn(ACCENTS, value);
		}
		/** The choice made in this browser, or null while none has been made. */
		function storedAccent() {
			try {
				const stored = localStorage.getItem(KEY);
				return isAccent(stored) ? stored : null;
			} catch {
				return null;
			}
		}
		function readAccent() {
			return storedAccent() ?? "orange";
		}
		function paint() {
			const colors = ACCENTS[readAccent()];
			document.body?.style.setProperty("--cl-accent", colors.accent);
			document.body?.style.setProperty("--cl-accent-ink", colors.ink);
		}
		/** Choose the accent for every plugin. */
		function writeAccent(accent) {
			try {
				localStorage.setItem(KEY, accent);
			} catch {}
			paint();
			window.dispatchEvent(new Event(EVENT));
		}
		/** Paint the current accent and keep it current. Returns the undo for plugin disposal. */
		function installAccent() {
			if (typeof document === "undefined") return () => {};
			paint();
			if (document.body === null) document.addEventListener("DOMContentLoaded", paint, { once: true });
			window.addEventListener(EVENT, paint);
			window.addEventListener("storage", paint);
			return () => {
				window.removeEventListener(EVENT, paint);
				window.removeEventListener("storage", paint);
			};
		}
		function useAccent() {
			const [accent, setAccent] = react.useState(readAccent);
			react.useEffect(() => {
				const sync = () => setAccent(readAccent());
				window.addEventListener(EVENT, sync);
				window.addEventListener("storage", sync);
				return () => {
					window.removeEventListener(EVENT, sync);
					window.removeEventListener("storage", sync);
				};
			}, []);
			return [accent, writeAccent];
		}
		/** A row of round swatches: one of them is always chosen. */
		function AccentPicker({ label = "Accent color", hint = "", names }) {
			const [accent, choose] = useAccent();
			const h = react.createElement;
			const name = (id) => names?.[id] ?? ACCENTS[id].name;
			return h("div", { style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				fontSize: 13,
				flexWrap: "wrap"
			} }, h("span", { style: { fontWeight: 500 } }, label), h("span", {
				role: "radiogroup",
				"aria-label": label,
				style: {
					display: "inline-flex",
					gap: 8
				}
			}, ...ACCENT_IDS.map((id) => h("button", {
				key: id,
				type: "button",
				role: "radio",
				"aria-checked": accent === id,
				"aria-label": name(id),
				title: name(id),
				onClick: () => choose(id),
				style: {
					width: 18,
					height: 18,
					padding: 0,
					borderRadius: "50%",
					cursor: "pointer",
					background: ACCENTS[id].accent,
					border: "2px solid var(--dsw-alias-bg-base, #fff)",
					boxShadow: accent === id ? "0 0 0 2px var(--dsw-alias-label-primary, #1F1E1D)" : "0 0 0 1px var(--dsw-alias-border-l2, rgba(127,127,127,.35))"
				}
			}))), h("span", { style: {
				fontSize: 12,
				color: "var(--dsw-alias-label-tertiary, #888)"
			} }, hint ? `${name(accent)} · ${hint}` : name(accent)));
		}
		//#endregion
		//#region lib/types/client/nav-icon.js
		/**
		* Give the "电脑控制" row in the DSH settings navigation a mouse-pointer icon
		* instead of the shell's fallback gear.
		*
		* `settings.section` registrations only carry `id`, `order` and `label`; the
		* shell picks icons for built-in ids only. So, like dsh-better-sidebar, we mark
		* our own row by its label and let CSS swap the glyph (Lucide mouse-pointer-2,
		* drawn as a currentColor mask so hover / active colors still apply).
		*/
		const MARKER = "data-dsh-computer-use-settings-nav";
		const POINTER_SVG = "%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z'/%3E%3C/svg%3E";
		const navIconCss = `
[${MARKER}] > svg:first-child { display: none; }
[${MARKER}]::before {
  content: '';
  flex: none;
  width: 16px;
  height: 16px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,${POINTER_SVG}") center / contain no-repeat;
  mask: url("data:image/svg+xml,${POINTER_SVG}") center / contain no-repeat;
}
`;
		/** Keep the marker on the settings-nav button labelled `label`; returns a disposer. */
		function registerNavIcon(label) {
			const style = document.createElement("style");
			style.setAttribute("data-dsh-computer-use", "nav-icon");
			style.textContent = navIconCss;
			document.head.appendChild(style);
			let disposed = false;
			let frame = 0;
			const sync = () => {
				frame = 0;
				if (disposed) return;
				const dialogs = document.querySelectorAll("[role=\"dialog\"]");
				if (dialogs.length === 0) return;
				for (const dialog of dialogs) for (const button of dialog.querySelectorAll("nav button")) {
					const mine = button.textContent?.trim() === label;
					if (mine && !button.hasAttribute(MARKER)) button.setAttribute(MARKER, "");
					else if (!mine && button.hasAttribute(MARKER)) button.removeAttribute(MARKER);
				}
			};
			sync();
			const observer = new MutationObserver(() => {
				if (frame === 0) frame = requestAnimationFrame(sync);
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
			return () => {
				disposed = true;
				if (frame !== 0) cancelAnimationFrame(frame);
				observer.disconnect();
				style.remove();
				document.querySelectorAll(`[${MARKER}]`).forEach((element) => element.removeAttribute(MARKER));
			};
		}
		//#endregion
		//#region lib/types/client/select.js
		const h$2 = react.createElement;
		/** Menu appearance and fixed-position behavior follow dsh-free-search / dsh-proxy. */
		const selectCss = `
.dshcu-select{box-sizing:border-box;width:100%;min-width:0;max-width:100%;overflow:hidden;height:36px;padding:0 12px;display:flex;align-items:center;gap:8px;text-align:left;border:1px solid var(--dsw-alias-border-l4,rgba(127,127,127,.3));border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-3,transparent);color:inherit;font:inherit;font-size:13px;cursor:pointer}
.dshcu-select:hover{border-color:var(--dsw-alias-border-l3,#888)}
.dshcu-select:focus-visible,.dshcu-select[aria-expanded=true]{outline:2px solid var(--cl-accent,#D97757);outline-offset:2px}
.dshcu-select:disabled{opacity:.5;cursor:default}
.dshcu-menu{position:fixed;z-index:1100;box-sizing:border-box;padding:4px;overflow-y:auto;overscroll-behavior:contain;border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-menu-surface-fill,var(--dsw-alias-bg-layer-1,#fff));color:var(--dsw-alias-label-primary,#222);backdrop-filter:var(--dsw-menu-backdrop-filter,none);box-shadow:var(--dsw-elevation-prominent,0 10px 32px rgba(0,0,0,.16),0 0 0 .5px rgba(0,0,0,.1))}
.dshcu-option{display:flex;align-items:center;gap:8px;min-height:34px;padding:6px 8px;box-sizing:border-box;border-radius:var(--dsw-radius-md,8px);font-size:13px;line-height:20px;cursor:pointer;user-select:none}
.dshcu-option[data-active=true]{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12))}
`;
		function Select({ options, value, disabled, label, onChange }) {
			const id = react.useId();
			const trigger = react.useRef(null);
			const list = react.useRef(null);
			const [open, setOpen] = react.useState(false);
			const [active, setActive] = react.useState(0);
			const [pos, setPos] = react.useState({});
			const selected = options.findIndex((option) => option.value === value);
			const place = react.useCallback(() => {
				const r = trigger.current?.getBoundingClientRect();
				if (!r) return;
				const below = window.innerHeight - r.bottom - 12;
				const above = r.top - 12;
				const up = below < Math.min(options.length * 34 + 8, 220) && above > below;
				const width = Math.min(Math.max(r.width, 180), 440, window.innerWidth - 16);
				setPos({
					left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
					width,
					maxHeight: Math.max(0, Math.min(360, (up ? above : below) - 4)),
					...up ? { bottom: window.innerHeight - r.top + 4 } : { top: r.bottom + 4 }
				});
			}, [options.length]);
			const close = (refocus = false) => {
				setOpen(false);
				if (refocus) trigger.current?.focus();
			};
			const choose = (index) => {
				if (!disabled && options[index]) onChange(options[index].value);
				close(true);
			};
			const show = () => {
				if (!disabled) {
					place();
					setActive(Math.max(0, selected));
					setOpen(true);
				}
			};
			react.useEffect(() => {
				if (disabled) setOpen(false);
			}, [disabled]);
			react.useEffect(() => {
				if (!open) return;
				const pointer = (e) => {
					if (!list.current?.contains(e.target) && !trigger.current?.contains(e.target)) setOpen(false);
				};
				const scroll = (e) => {
					if (!list.current?.contains(e.target)) place();
				};
				document.addEventListener("pointerdown", pointer, true);
				window.addEventListener("scroll", scroll, true);
				window.addEventListener("resize", place);
				return () => {
					document.removeEventListener("pointerdown", pointer, true);
					window.removeEventListener("scroll", scroll, true);
					window.removeEventListener("resize", place);
				};
			}, [open, place]);
			react.useEffect(() => {
				list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
			}, [active, open]);
			return h$2("div", { style: { minWidth: 0 } }, h$2("button", {
				ref: trigger,
				type: "button",
				className: "dshcu-select",
				disabled,
				role: "combobox",
				"aria-label": label,
				"aria-haspopup": "listbox",
				"aria-expanded": open,
				"aria-controls": open ? `${id}-list` : void 0,
				"aria-activedescendant": open ? `${id}-${active}` : void 0,
				onBlur: () => close(),
				onClick: () => open ? close() : show(),
				onKeyDown: (e) => {
					if (disabled) return;
					if (!open) {
						if ([
							"ArrowDown",
							"ArrowUp",
							"Enter",
							" "
						].includes(e.key)) {
							e.preventDefault();
							show();
						}
					} else if (e.key === "Escape") {
						e.preventDefault();
						close(true);
					} else if (e.key === "Tab") close();
					else if ([
						"ArrowDown",
						"ArrowUp",
						"Home",
						"End"
					].includes(e.key)) {
						e.preventDefault();
						setActive((i) => e.key === "Home" ? 0 : e.key === "End" ? options.length - 1 : (i + (e.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
					} else if (["Enter", " "].includes(e.key)) {
						e.preventDefault();
						choose(active);
					}
				}
			}, h$2("span", { style: {
				flex: 1,
				minWidth: 0,
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			} }, options[selected]?.label), h$2("svg", {
				width: 14,
				height: 14,
				viewBox: "0 0 16 16",
				"aria-hidden": true,
				style: { transform: open ? "rotate(180deg)" : void 0 }
			}, h$2("path", {
				d: "M4 6l4 4 4-4",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.6
			}))), open ? h$2("div", {
				ref: list,
				id: `${id}-list`,
				role: "listbox",
				"aria-label": label,
				className: "dshcu-menu",
				style: pos
			}, ...options.map((option, i) => h$2("div", {
				key: option.value,
				id: `${id}-${i}`,
				role: "option",
				"aria-selected": i === selected,
				"data-index": i,
				"data-active": i === active,
				className: "dshcu-option",
				onPointerMove: () => setActive(i),
				onPointerDown: (e) => e.preventDefault(),
				onClick: () => choose(i)
			}, h$2("span", { style: { flex: 1 } }, option.label), h$2("span", { style: { width: 14 } }, i === selected ? h$2("svg", {
				width: 14,
				height: 14,
				viewBox: "0 0 16 16",
				"aria-hidden": true
			}, h$2("path", {
				d: "M3.5 8.5 6.5 11.5 12.5 4.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.7,
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})) : null)))) : null);
		}
		//#endregion
		//#region lib/types/client/skills-card.js
		/**
		* "应用技能" card: the per-app notes the agent keeps (see ../skills.ts). The
		* user can read, edit, add and delete them here; built-in skills can be
		* overridden and restored.
		*/
		const SKILLS_ROUTE = "/api/dsh-computer-use/skills";
		const MAX_CHARS = 4e3;
		const h$1 = react.createElement;
		function SkillsCard({ S }) {
			const [skills, setSkills] = react.useState(null);
			const [dir, setDir] = react.useState("");
			const [draft, setDraft] = react.useState(null);
			const [busy, setBusy] = react.useState(false);
			const [note, setNote] = react.useState(null);
			const call = react.useCallback(async (body) => {
				setBusy(true);
				try {
					const result = await (await fetch(SKILLS_ROUTE, body ? {
						method: "POST",
						credentials: "same-origin",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(body)
					} : { credentials: "same-origin" })).json();
					if (!result.ok) throw new Error(result.error ?? "Request failed");
					setSkills(result.skills ?? []);
					setDir(result.dir ?? "");
					return true;
				} catch (error) {
					setNote({
						kind: "error",
						text: error.message
					});
					return false;
				} finally {
					setBusy(false);
				}
			}, []);
			react.useEffect(() => {
				call();
			}, [call]);
			const edit = (skill) => {
				setNote(null);
				setDraft({
					id: skill.id,
					app: skill.app,
					match: skill.match.join(", "),
					summary: skill.summary,
					content: skill.content,
					isNew: false
				});
			};
			const save = async () => {
				if (!draft) return;
				setNote(null);
				if (await call({
					op: "save",
					id: draft.isNew ? "" : draft.id,
					app: draft.app,
					match: draft.match,
					summary: draft.summary,
					content: draft.content
				})) {
					setDraft(null);
					setNote({
						kind: "ok",
						text: "Saved"
					});
				}
			};
			const remove = async (skill) => {
				setNote(null);
				if (await call({
					op: "delete",
					id: skill.id
				})) {
					if (draft?.id === skill.id) setDraft(null);
					setNote({
						kind: "ok",
						text: `Deleted "${skill.app}"`
					});
				}
			};
			const reset = async (skill) => {
				setNote(null);
				if (await call({
					op: "reset",
					id: skill.id
				})) {
					if (draft?.id === skill.id) setDraft(null);
					setNote({
						kind: "ok",
						text: `Restored built-in version of "${skill.app}"`
					});
				}
			};
			const row = {
				display: "flex",
				gap: 10,
				alignItems: "center",
				padding: "8px 0",
				borderTop: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.18))"
			};
			const small = {
				...S.secondary,
				padding: "4px 10px",
				fontSize: 12
			};
			const tag = {
				fontSize: 11,
				padding: "1px 7px",
				borderRadius: 999,
				border: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.3))",
				color: "var(--dsw-alias-label-tertiary, #888)",
				whiteSpace: "nowrap"
			};
			const invalid = draft !== null && (draft.app.trim() === "" || draft.content.trim() === "" || draft.content.length > MAX_CHARS);
			return h$1("section", { style: S.card }, h$1("h3", { style: S.cardTitle }, "App Skills"), h$1("p", { style: S.hint }, "Per-application operating notes kept by the AI: one file per app. Once the AI works out how an unfamiliar app behaves, it records reusable tips here and loads them automatically whenever that app is opened, without bloating the system prompt. You can view, edit, delete, or add skills here."), skills === null ? h$1("p", { style: S.hint }, busy ? "Loading…" : "Could not load app skills.") : skills.length === 0 ? h$1("p", { style: S.hint }, "No app skills yet.") : h$1("div", null, ...skills.map((skill) => h$1("div", {
				key: skill.id,
				style: row
			}, h$1("div", { style: {
				flex: 1,
				minWidth: 0
			} }, h$1("div", { style: {
				fontSize: 13,
				fontWeight: 600,
				display: "flex",
				gap: 8,
				alignItems: "center"
			} }, skill.app, h$1("span", { style: tag }, skill.source === "builtin" ? "Built-in" : skill.overrides ? "Modified" : "AI / Custom")), h$1("div", { style: {
				...S.hint,
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			} }, `${skill.summary || "(No summary)"} · ${skill.content.length} chars`)), h$1("button", {
				type: "button",
				style: small,
				disabled: busy,
				onClick: () => edit(skill)
			}, "View / Edit"), skill.overrides ? h$1("button", {
				type: "button",
				style: small,
				disabled: busy,
				onClick: () => {
					reset(skill);
				}
			}, "Restore built-in") : null, h$1("button", {
				type: "button",
				style: small,
				disabled: busy,
				onClick: () => {
					remove(skill);
				}
			}, "Delete")))), draft === null ? null : h$1("div", { style: {
				display: "grid",
				gap: 10,
				paddingTop: 4
			} }, h$1("div", { style: S.grid2 }, h$1("label", { style: S.label }, "App name", h$1("input", {
				style: S.input,
				value: draft.app,
				disabled: !draft.isNew,
				maxLength: 60,
				placeholder: "e.g. Obsidian",
				onChange: (e) => setDraft({
					...draft,
					app: e.target.value
				})
			})), h$1("label", { style: S.label }, "Matched executables / names (comma-separated)", h$1("input", {
				style: S.input,
				value: draft.match,
				maxLength: 200,
				placeholder: "e.g. Obsidian, obsidian.exe",
				onChange: (e) => setDraft({
					...draft,
					match: e.target.value
				})
			}))), h$1("label", { style: S.label }, "Summary", h$1("input", {
				style: S.input,
				value: draft.summary,
				maxLength: 80,
				placeholder: "A few words describing what this skill covers",
				onChange: (e) => setDraft({
					...draft,
					summary: e.target.value
				})
			})), h$1("label", { style: S.label }, `Content (${draft.content.length} / ${MAX_CHARS} chars)`, h$1("textarea", {
				style: {
					...S.input,
					minHeight: 200,
					resize: "vertical",
					fontFamily: "inherit",
					lineHeight: 1.55
				},
				value: draft.content,
				placeholder: "- Bullet points with reusable operating tips: where controls are, keyboard shortcuts, and quirks",
				onChange: (e) => setDraft({
					...draft,
					content: e.target.value
				})
			})), h$1("div", { style: S.actions }, h$1("button", {
				type: "button",
				style: {
					...S.primary,
					opacity: busy || invalid ? .5 : 1
				},
				disabled: busy || invalid,
				onClick: () => {
					save();
				}
			}, "Save skill"), h$1("button", {
				type: "button",
				style: S.secondary,
				disabled: busy,
				onClick: () => setDraft(null)
			}, "Cancel"), draft.content.length > MAX_CHARS ? h$1("span", { style: S.error }, "Content is too long; please shorten it") : null)), h$1("div", { style: S.actions }, draft === null ? h$1("button", {
				type: "button",
				style: S.secondary,
				disabled: busy,
				onClick: () => {
					setNote(null);
					setDraft({
						id: "",
						app: "",
						match: "",
						summary: "",
						content: "",
						isNew: true
					});
				}
			}, "New skill") : null, h$1("button", {
				type: "button",
				style: S.secondary,
				disabled: busy,
				onClick: () => {
					call();
				}
			}, "Refresh"), note === null ? null : h$1("span", { style: note.kind === "ok" ? S.ok : S.error }, note.text)), dir ? h$1("p", { style: S.hint }, `Saved in: ${dir} (one .md file per app; you can also edit them directly). If you delete a built-in skill, creating a new skill with the same name re-enables it.`) : null);
		}
		//#endregion
		//#region lib/types/client/index.js
		/**
		* Browser half: the "电脑控制" (Computer use) section in Settings. It reads the
		* plugin's own Loader entry through `remote.settings.describe()` and writes
		* with `remote.settings.mutate()`; every field is volatile, so a save reaches
		* the next action without a restart. Live status and the overlay preview come
		* from the host routes in ../routes.ts.
		*/
		const STATUS_ROUTE = "/api/dsh-computer-use/status";
		const SCREENSHOTS_ROUTE = "/api/dsh-computer-use/screenshots";
		const SCREENSHOTS_CLEAN_ROUTE = "/api/dsh-computer-use/screenshots/clean";
		const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;
		const PREVIEW_ROUTE = "/api/dsh-computer-use/preview";
		const h = react.createElement;
		function draftFrom(value) {
			const s = resolveConfig(value);
			return {
				accessMode: s.accessMode,
				blockedApps: s.blockedApps.join("\n"),
				overlay: s.overlay,
				overlayLabel: s.overlayLabel,
				hostWindow: s.hostWindow,
				cardOpacity: s.cardOpacity,
				typingMode: s.typingMode,
				quickSteps: s.quickSteps,
				pauseOnUserInput: s.pauseOnUserInput,
				userIdleMs: String(s.userIdleMs),
				autoScreenshot: s.autoScreenshot,
				settleMs: String(s.settleMs),
				maxLongEdge: String(s.maxLongEdge),
				maxMegapixels: String(Math.round(s.maxPixels / 1e4) / 100),
				jpegQuality: String(s.jpegQuality)
			};
		}
		/** Range-checked numbers; returns field errors keyed by Draft field. */
		function validate(d) {
			const errors = {};
			const check = (key, min, max) => {
				const n = Number(d[key]);
				if (String(d[key]).trim() === "" || !Number.isFinite(n) || n < min || n > max) errors[key] = `${min} – ${max}`;
			};
			check("userIdleMs", 300, 1e4);
			check("settleMs", 0, 5e3);
			check("maxLongEdge", 640, 3840);
			check("maxMegapixels", .3, 8);
			check("jpegQuality", 30, 100);
			return errors;
		}
		function valuesFrom(d) {
			return {
				accessMode: d.accessMode,
				blockedApps: d.blockedApps.split(/[\n,，]/).map((item) => item.trim()).filter(Boolean),
				overlay: d.overlay,
				overlayLabel: d.overlayLabel.trim() || DEFAULTS.overlayLabel,
				hostWindow: d.hostWindow,
				cardOpacity: d.cardOpacity,
				typingMode: d.typingMode,
				quickSteps: d.quickSteps,
				pauseOnUserInput: d.pauseOnUserInput,
				userIdleMs: Math.round(Number(d.userIdleMs)),
				autoScreenshot: d.autoScreenshot,
				settleMs: Math.round(Number(d.settleMs)),
				maxLongEdge: Math.round(Number(d.maxLongEdge)),
				maxPixels: Math.round(Number(d.maxMegapixels) * 1e6),
				jpegQuality: Math.round(Number(d.jpegQuality))
			};
		}
		const S = {
			page: {
				display: "grid",
				gridTemplateColumns: "minmax(0, 1fr)",
				gap: 20,
				width: "100%",
				maxWidth: "100%",
				minWidth: 0,
				boxSizing: "border-box",
				paddingBottom: 32,
				color: "var(--dsw-alias-label-primary, inherit)"
			},
			title: {
				margin: 0,
				fontSize: 20,
				fontWeight: 600
			},
			subtitle: {
				margin: "6px 0 0",
				fontSize: 13,
				lineHeight: 1.6,
				color: "var(--dsw-alias-label-secondary, #666)"
			},
			card: {
				display: "grid",
				gridTemplateColumns: "minmax(0, 1fr)",
				gap: 14,
				padding: 16,
				minWidth: 0,
				boxSizing: "border-box",
				borderRadius: "var(--dsw-radius-lg, 12px)",
				border: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.25))"
			},
			cardTitle: {
				margin: 0,
				fontSize: 15,
				fontWeight: 600
			},
			hint: {
				margin: 0,
				fontSize: 12,
				lineHeight: 1.55,
				color: "var(--dsw-alias-label-tertiary, #888)"
			},
			label: {
				display: "grid",
				gridTemplateColumns: "minmax(0, 1fr)",
				alignContent: "space-between",
				gap: 6,
				minWidth: 0,
				fontSize: 13,
				fontWeight: 500
			},
			grid2: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				gap: 14,
				minWidth: 0
			},
			input: {
				boxSizing: "border-box",
				width: "100%",
				minWidth: 0,
				padding: "8px 10px",
				fontSize: 13,
				borderRadius: "var(--dsw-radius-md, 8px)",
				border: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.3))",
				background: "transparent",
				color: "inherit"
			},
			toggleRow: {
				display: "flex",
				gap: 12,
				minWidth: 0,
				alignItems: "flex-start",
				justifyContent: "space-between"
			},
			toggleText: {
				display: "grid",
				gridTemplateColumns: "minmax(0, 1fr)",
				gap: 4,
				minWidth: 0,
				flex: "1 1 0%",
				fontSize: 13,
				fontWeight: 500
			},
			error: {
				fontSize: 12,
				color: "var(--dsw-alias-state-error-primary, #d33)"
			},
			ok: {
				fontSize: 12,
				color: "var(--dsw-alias-state-success-primary, #2a2)"
			},
			actions: {
				display: "flex",
				gap: 10,
				alignItems: "center",
				flexWrap: "wrap"
			},
			primary: {
				padding: "7px 16px",
				fontSize: 13,
				borderRadius: "var(--dsw-radius-md, 8px)",
				border: `1px solid ${ACCENT}`,
				background: ACCENT,
				color: ACCENT_INK,
				cursor: "pointer"
			},
			secondary: {
				padding: "7px 14px",
				fontSize: 13,
				borderRadius: "var(--dsw-radius-md, 8px)",
				border: "1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.3))",
				background: "transparent",
				color: "inherit",
				cursor: "pointer"
			},
			statusLine: {
				display: "flex",
				gap: 8,
				alignItems: "center",
				fontSize: 13
			},
			dot: {
				width: 8,
				height: 8,
				borderRadius: 4,
				flex: "0 0 auto"
			}
		};
		function Switch({ checked, disabled, label, onChange }) {
			return h("button", {
				type: "button",
				role: "switch",
				"aria-checked": checked,
				"aria-label": label,
				disabled,
				onClick: () => onChange(!checked),
				style: {
					flex: "0 0 auto",
					width: 40,
					height: 22,
					borderRadius: 11,
					border: "none",
					padding: 2,
					cursor: disabled ? "default" : "pointer",
					background: checked ? ACCENT : "var(--dsw-alias-border-l3, rgba(127,127,127,.35))",
					opacity: disabled ? .5 : 1,
					transition: "background .15s"
				}
			}, h("span", { style: {
				display: "block",
				width: 18,
				height: 18,
				borderRadius: 9,
				background: checked ? ACCENT_INK : "#fff",
				transform: checked ? "translateX(18px)" : "none",
				transition: "transform .15s"
			} }));
		}
		function ToggleRow({ title, hint, checked, disabled, onChange }) {
			return h("div", { style: S.toggleRow }, h("div", { style: S.toggleText }, title, h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, hint)), h(Switch, {
				checked,
				disabled,
				label: title,
				onChange
			}));
		}
		function NumberField({ label, unit, value, error, disabled, onChange }) {
			return h("label", { style: S.label }, label, h("div", { style: {
				display: "flex",
				gap: 8,
				minWidth: 0,
				alignItems: "center"
			} }, h("input", {
				style: {
					...S.input,
					flex: "1 1 0%"
				},
				inputMode: "decimal",
				value,
				disabled,
				onChange: (e) => onChange(e.target.value)
			}), h("span", { style: {
				...S.hint,
				flex: "0 0 auto",
				whiteSpace: "nowrap"
			} }, unit)), error === void 0 ? null : h("span", { style: S.error }, `Range ${error}`));
		}
		function ComputerUseSection({ ctx }) {
			const [loaded, setLoaded] = react.useState(false);
			const [writable, setWritable] = react.useState(false);
			const [view, setView] = react.useState(void 0);
			const [draft, setDraft] = react.useState(() => draftFrom(void 0));
			const [dirty, setDirty] = react.useState(false);
			const dirtyRef = react.useRef(false);
			dirtyRef.current = dirty;
			const draftRef = react.useRef(draft);
			draftRef.current = draft;
			const [saving, setSaving] = react.useState(false);
			/** The draft whose save failed: not retried until it is edited again. */
			const [failed, setFailed] = react.useState(null);
			const [message, setMessage] = react.useState(null);
			const [status, setStatus] = react.useState(null);
			const [cache, setCache] = react.useState(null);
			const [cacheBusy, setCacheBusy] = react.useState(false);
			const [cacheNote, setCacheNote] = react.useState(null);
			const load = react.useCallback(async (reset) => {
				try {
					const result = await ctx.remote.settings.describe();
					if (!result.ok) throw new Error(result.error.message);
					const found = result.value.namespaces.find((item) => item.ns === ENTRY_ID);
					setWritable(result.value.writable);
					setView(found);
					if (reset || !dirtyRef.current) {
						const stored = draftFrom(found?.value);
						if (reset || JSON.stringify(valuesFrom(stored)) !== JSON.stringify(valuesFrom(draftRef.current))) setDraft(stored);
						setDirty(false);
					}
				} catch (error) {
					setMessage({
						kind: "error",
						text: `Failed to load settings: ${error.message}`
					});
				} finally {
					setLoaded(true);
				}
			}, [ctx]);
			const refreshStatus = react.useCallback(async () => {
				try {
					const response = await fetch(STATUS_ROUTE, { credentials: "same-origin" });
					setStatus(await response.json());
				} catch {
					setStatus(null);
				}
			}, []);
			const refreshCache = react.useCallback(async () => {
				setCacheBusy(true);
				try {
					const response = await fetch(SCREENSHOTS_ROUTE, { credentials: "same-origin" });
					setCache(await response.json());
				} catch {
					setCache(null);
				} finally {
					setCacheBusy(false);
				}
			}, []);
			const cleanCache = async () => {
				setCacheBusy(true);
				setCacheNote(null);
				try {
					const result = await (await fetch(SCREENSHOTS_CLEAN_ROUTE, {
						method: "POST",
						credentials: "same-origin"
					})).json();
					if (!result.ok) throw new Error(result.error ?? "Clean failed");
					setCacheNote({
						kind: "ok",
						text: result.removed ? `Cleaned ${result.removed} screenshot(s)` : "No orphaned screenshots to clean"
					});
					await refreshCache();
				} catch (error) {
					setCacheNote({
						kind: "error",
						text: `Clean failed: ${error.message}`
					});
				} finally {
					setCacheBusy(false);
				}
			};
			react.useEffect(() => {
				load(true);
				refreshStatus();
				refreshCache();
				return ctx.remote.$on?.("settings/document-updated", (ns) => {
					if (ns === "copylee-computer-use") {
						load(false);
						refreshStatus();
					}
				}) ?? void 0;
			}, [
				ctx,
				load,
				refreshStatus
			]);
			const edit = (key, value) => {
				setDraft((previous) => ({
					...previous,
					[key]: value
				}));
				setDirty(true);
				setMessage(null);
			};
			const errors = validate(draft);
			const invalid = Object.keys(errors).length > 0;
			const disabled = !writable || view === void 0;
			const save = async () => {
				if (view === void 0 || invalid) return;
				setSaving(true);
				const saved = draft;
				try {
					const values = valuesFrom(saved);
					const result = await ctx.remote.settings.mutate(ENTRY_ID, Object.entries(values).map(([key, value]) => ({
						op: "set",
						path: [key],
						value
					})), view.revision);
					if (!result.ok) throw new Error(result.error.message);
					setMessage({
						kind: "ok",
						text: "Auto-saved — takes effect on the next action"
					});
					if (draftRef.current === saved) {
						dirtyRef.current = false;
						setDirty(false);
					}
					await load(false);
					refreshStatus();
				} catch (error) {
					setFailed(saved);
					setMessage({
						kind: "error",
						text: `Save failed: ${error.message}`
					});
				} finally {
					setSaving(false);
				}
			};
			react.useEffect(() => {
				if (!dirty || invalid || disabled || saving || failed === draft) return;
				const timer = setTimeout(() => {
					save();
				}, 500);
				return () => clearTimeout(timer);
			}, [
				draft,
				dirty,
				invalid,
				disabled,
				saving,
				failed
			]);
			const preview = async () => {
				try {
					const response = await fetch(PREVIEW_ROUTE, {
						method: "POST",
						credentials: "same-origin"
					});
					if (response.status === 409) setMessage({
						kind: "error",
						text: "AI is currently controlling the computer; preview unavailable"
					});
					else if (!response.ok) setMessage({
						kind: "error",
						text: "Preview failed"
					});
				} catch {
					setMessage({
						kind: "error",
						text: "Preview failed"
					});
				}
			};
			if (!loaded) return h("div", { style: S.page }, "Loading…");
			const primary = status?.displays.find((d) => d.primary) ?? status?.displays[0];
			const helperOk = status?.helper === "ready";
			return h("div", { style: S.page }, h("style", null, selectCss), h("div", null, h("h2", { style: S.title }, "Computer Use"), h("p", { style: S.subtitle }, "Let the AI see the screen, click the mouse, and type on the keyboard to operate this Windows computer. An orange glow frames the screen while in control; press Esc to pause / resume, or click Stop on the pill to end the turn.")), view === void 0 ? h("div", { style: S.error }, "Settings entry not found for this plugin (it may be disabled).") : null, view !== void 0 && !writable ? h("div", { style: S.error }, "Settings are currently read-only.") : null, h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Status"), h("div", { style: S.statusLine }, h("span", { style: {
				...S.dot,
				background: status === null ? "#999" : helperOk ? "#2a2" : "#d33"
			} }), status === null ? "Unable to read status" : helperOk ? status.controlling ? "Controlling computer" : "Ready" : `Helper unavailable: ${status.error ?? ""}`), primary ? h("p", { style: S.hint }, `Primary display ${primary.width}×${primary.height} (${Math.round(primary.dpi / 96 * 100)}% scale), screenshot sent to model: ${primary.shot.width}×${primary.shot.height}.`) : null, status && status.displays.length > 1 ? h("p", { style: S.hint }, `${status.displays.length} displays detected; the model can switch between them with switch_display.`) : null, h("div", { style: S.actions }, h("button", {
				type: "button",
				style: S.secondary,
				onClick: () => {
					preview();
				}
			}, "Preview overlay"), h("button", {
				type: "button",
				style: S.secondary,
				onClick: () => {
					refreshStatus();
				}
			}, "Refresh status"), h("span", { style: S.hint }, "4-second preview: shows the screen glow and the mini progress card or status pill using your saved settings."))), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Access Control"), h("div", { style: S.label }, "Access mode", h(Select, {
				label: "Access mode",
				disabled,
				value: draft.accessMode,
				options: [{
					value: "per-app",
					label: "Per-app approval (approve apps to control in each session)"
				}, {
					value: "allow-all",
					label: "Allow all apps (no approval prompts)"
				}],
				onChange: (value) => edit("accessMode", value)
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, "When the session permission preset is \"danger-full-access\" or \"auto\", approval prompts are skipped and per-app requests are granted automatically. DeepSeek Harness's own window is never controlled.")), h("label", { style: S.label }, "Blocked applications", h("textarea", {
				style: {
					...S.input,
					minHeight: 72,
					resize: "vertical"
				},
				value: draft.blockedApps,
				disabled,
				spellCheck: false,
				placeholder: "One per line, app name or exe, e.g.:\nkeepass\n1password",
				onChange: (e) => edit("blockedApps", e.target.value)
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, "Common password managers (1Password, Bitwarden, KeePass, etc.) are always blocked."))), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Overlay & Window Behavior"), h(ToggleRow, {
				title: "Orange screen glow & status pill",
				hint: "Hidden from screenshots sent to the model.",
				checked: draft.overlay,
				disabled,
				onChange: (value) => edit("overlay", value)
			}), h("div", { style: S.grid2 }, h("label", { style: S.label }, "Status pill label", h("input", {
				style: S.input,
				value: draft.overlayLabel,
				disabled,
				maxLength: 40,
				onChange: (e) => edit("overlayLabel", e.target.value)
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, `Displayed as "${draft.overlayLabel.trim() || DEFAULTS.overlayLabel} is controlling your computer"`)), h("div", { style: S.label }, "DeepSeek Harness window", h(Select, {
				label: "DeepSeek Harness window",
				disabled,
				value: draft.hostWindow,
				options: [
					{
						value: "pet",
						label: "Mini progress card (Recommended)"
					},
					{
						value: "card",
						label: "Shrink to floating bottom-right card"
					},
					{
						value: "minimize",
						label: "Minimize"
					},
					{
						value: "keep",
						label: "Keep as is"
					}
				],
				onChange: (value) => edit("hostWindow", value)
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, draft.hostWindow === "pet" ? "Minimizes DSH and shows a draggable mini card in the bottom-right corner with streaming reply text, reasoning/tool steps, and pause/stop buttons. Restores automatically when finished." : "Restores the original window size and position when finished.")), h("div", { style: S.label }, "Floating card opacity", h(Select, {
				label: "Floating card opacity",
				disabled: disabled || draft.hostWindow !== "card" && draft.hostWindow !== "pet",
				value: String(draft.cardOpacity),
				options: [
					{
						value: "100",
						label: "100% (Opaque)"
					},
					{
						value: "90",
						label: "90%"
					},
					{
						value: "80",
						label: "80% (Default)"
					},
					{
						value: "70",
						label: "70%"
					},
					{
						value: "60",
						label: "60%"
					},
					{
						value: "50",
						label: "50% (Most transparent)"
					}
				],
				onChange: (value) => edit("cardOpacity", Number(value))
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, "Translucent cards let you see the desktop underneath; hovering the mouse over the card makes it opaque. AI screenshots never include the card.")), h("div", { style: S.label }, "Text input mode", h(Select, {
				label: "Text input mode",
				disabled,
				value: draft.typingMode,
				options: [
					{
						value: "stream",
						label: "Stream: paste long text paragraph by paragraph (Recommended)"
					},
					{
						value: "type",
						label: "Key-by-key: type like a human (Slowest)"
					},
					{
						value: "paste",
						label: "Paste all at once (Fastest)"
					}
				],
				onChange: (value) => edit("typingMode", value)
			}), h("span", { style: {
				...S.hint,
				fontWeight: 400
			} }, "Short strings are always typed key-by-key. Long text typed key-by-key in editors like Obsidian, Typora, or Word can be mangled by auto-closing brackets or auto-lists; streaming pastes paragraph by paragraph cleanly.")))), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Speed"), h(ToggleRow, {
				title: "Lower reasoning effort during computer steps (Beta)",
				hint: "Experimental. Uses the model's lowest reasoning effort for intermediate computer-control steps (~1s faster per step), while keeping your session's selected reasoning effort for initial planning and final replies.",
				checked: draft.quickSteps,
				disabled,
				onChange: (value) => edit("quickSteps", value)
			})), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "User Handoff"), h(ToggleRow, {
				title: "Pause when user input is detected",
				hint: "When you type on the physical keyboard, the AI waits until you stop; when you switch windows, the AI re-checks the screen first. Mouse movement alone does not trigger a pause.",
				checked: draft.pauseOnUserInput,
				disabled,
				onChange: (value) => edit("pauseOnUserInput", value)
			}), h("div", { style: S.grid2 }, h(NumberField, {
				label: "Resume after keyboard idle time",
				unit: "ms",
				value: draft.userIdleMs,
				error: errors.userIdleMs,
				disabled: disabled || !draft.pauseOnUserInput,
				onChange: (value) => edit("userIdleMs", value)
			}))), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Screenshots"), h(ToggleRow, {
				title: "Automatically return screenshot after each action",
				hint: "Saves an extra round-trip tool call; disable to save image tokens.",
				checked: draft.autoScreenshot,
				disabled,
				onChange: (value) => edit("autoScreenshot", value)
			}), h("div", { style: S.grid2 }, h(NumberField, {
				label: "Settle wait after action",
				unit: "ms",
				value: draft.settleMs,
				error: errors.settleMs,
				disabled,
				onChange: (value) => edit("settleMs", value)
			}), h(NumberField, {
				label: "Max long edge",
				unit: "px",
				value: draft.maxLongEdge,
				error: errors.maxLongEdge,
				disabled,
				onChange: (value) => edit("maxLongEdge", value)
			}), h(NumberField, {
				label: "Max total pixels",
				unit: "MP",
				value: draft.maxMegapixels,
				error: errors.maxMegapixels,
				disabled,
				onChange: (value) => edit("maxMegapixels", value)
			}), h(NumberField, {
				label: "JPEG quality",
				unit: "30–100",
				value: draft.jpegQuality,
				error: errors.jpegQuality,
				disabled,
				onChange: (value) => edit("jpegQuality", value)
			})), h("p", { style: S.hint }, "Higher resolution makes small text clearer and clicks more accurate, at the cost of more image tokens per screenshot. Defaults (1366 px long edge, 1.15 MP) work well for most models.")), h(SkillsCard, { S }), h("section", { style: S.card }, h("h3", { style: S.cardTitle }, "Screenshot Cache"), h("p", { style: S.hint }, cache === null ? cacheBusy ? "Calculating…" : "Unable to read screenshot cache." : !cache.ok ? `Calculation failed: ${cache.error ?? ""}` : `Total screenshots stored by this plugin: ${cache.count} (${mb(cache.bytes)}); ${cache.orphans} (${mb(cache.orphanBytes)}) belong to deleted sessions and can be safely cleaned.`), h("p", { style: S.hint }, "Screenshots are saved as attachments in session history. Screenshots belonging to active sessions are kept so resuming those sessions continues to work; orphaned screenshots from deleted sessions are cleaned automatically every 12 hours or on demand below."), h("div", { style: S.actions }, h("button", {
				type: "button",
				style: {
					...S.secondary,
					opacity: cacheBusy || !cache?.orphans ? .5 : 1
				},
				disabled: cacheBusy || !cache?.orphans,
				onClick: () => {
					cleanCache();
				}
			}, "Clean orphaned screenshots"), h("button", {
				type: "button",
				style: S.secondary,
				disabled: cacheBusy,
				onClick: () => {
					refreshCache();
				}
			}, cacheBusy ? "Calculating…" : "Recalculate"), cacheNote === null ? null : h("span", { style: cacheNote.kind === "ok" ? S.ok : S.error }, cacheNote.text))), h("div", { style: S.actions }, h("button", {
				type: "button",
				style: S.secondary,
				disabled,
				onClick: () => {
					setDraft(draftFrom({}));
					setDirty(true);
					setMessage(null);
				}
			}, "Reset to defaults"), saving ? h("span", { style: S.hint }, "Saving…") : dirty && invalid ? h("span", { style: S.error }, "Some values are out of range; fix them to auto-save") : failed === draft && dirty ? h("button", {
				type: "button",
				style: S.secondary,
				onClick: () => {
					setFailed(null);
				}
			}, "Retry save") : null, message === null || dirty && invalid ? null : h("span", { style: message.kind === "ok" ? S.ok : S.error }, message.text)), h(AccentPicker, null));
		}
		const inject = [
			"slots",
			"remote",
			"remote.settings"
		];
		function apply(ctx) {
			ctx.effect(() => installAccent(), "computer-use: accent colour");
			ctx.effect(() => registerNavIcon("Computer Use"), "computer-use: settings nav icon");
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: ENTRY_ID,
				order: 61,
				label: () => "Computer Use"
			}, () => h(ComputerUseSection, { ctx })));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
