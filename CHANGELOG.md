# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-08-04
- Fixed click-to-select not opening the file picker on Safari for iOS/iPadOS (and any other WebKit-based browser on those platforms)
- The picker is now opened synchronously from a native JS `click` listener calling `input.click()` directly, instead of routing the click through an async .NET handler and JS interop round trip — WebKit had already discarded the transient user activation by the time the old call landed
- Replaced the synthetic `new MouseEvent('click')` dispatch with a real `input.click()` call — WebKit refuses to open a file picker from an untrusted event
- The hidden `InputFile` is no longer `display:none`; it is visually hidden but still rendered, since WebKit ignores clicks targeting non-rendered file inputs
- Click listener is registered in `registerDropHandler` and cleaned up in `removeEventListeners` alongside the drop listener, with a guard preventing recursive picker re-entry
- Note: the dropzone element requires `cursor: pointer` for taps to register on iOS. The default `.file-dropper` class sets this; a custom `CssClass` must set it too

## [1.4.0] - 2026-08-01
- Drag-and-drop now streams files from JS to .NET via JS interop streaming (`IJSStreamReference` + `OpenReadStreamAsync`) instead of sending the whole file in a single SignalR interop message
- Fixes the 32 KB `MaximumReceiveMessageSize` failure on Blazor Server when dropping files
- `MaxFileSize` is now also enforced server-side on the drop path (not only client-side)
- Drop path now raises one `OnBase64FilesReceived`/`OnBinaryFilesReceived` event per file (previously one event per drop batch)

## [1.3.0] - 2026-05-25
- Added `OnProcessingChanged` (`EventCallback<bool>`) — signals file processing start/end for spinner integration
- Fixed JS `removeEventListener` not matching (listener leak) — `_dropListeners` Map stores stable refs
- Fixed `DragActiveCssClass` not cleaned on drop — now passed to JS handler
- Removed hardcoded `window.alert` on empty drop
- Removed `GC.SuppressFinalize(this)` (no finalizer needed)
- Deduplicated `OnInputFileChange` — unified single/multi-file path
- Added `catch JSDisconnectedException` in `DisposeAsync` for Blazor Server safety
- Added `MaxFileSize` parameter (nullable, default 50MB)
- Added `AcceptedFileTypes` parameter (maps to `<input accept="...">`)
- Added `maxAllowedSize` in `OpenReadStream(maxSize)` — OOM prevention
- Added `await using` for stream disposal in extensions
- Added lazy cache for `ImgSrc` property — skips repeated base64 re-encode

## [1.2.0] - 2025-11-11
- Added support to net10.0

## [1.1.0] - 2025-08-25
- Added `AllowMultipleFiles` Flag
- **BREAKING** `OnBase64FileReceived` and `OnBaseBinaryFileReceived` renamed to `OnBase64FilesReceived` and `OnBaseBinaryFilesReceived`
- `OnBase64FileReceived` and `OnBaseBinaryFileReceived` now sends an `IEnumerable` of the desired file type

## [1.0.2] - 2025-08-24
- Cleaned up JS code

## [1.0.1] - 2025-08-23
- Cleaned up scoped js to not utilize window object

## [1.0.0] - 2025-08-23
Created the actual component with the following parameters:
- **CssClass** (`string`):  
  The CSS class applied to the dropzone container. Default is `"file-dropper"`.
- **DragActiveCssClass** (`string`):  
  The CSS class applied when a file is being dragged over the dropzone. Default is `"drag-active"`.
- **ContentOutputType** (`FileContentOutput`):  
  Determines the format of the file content received (`Base64` or `Binary`). Default is `Base64`.
- **DropperId** (`string`):  
  The unique ID for the dropzone element. Defaults to a new GUID.
- **ChildContent** (`RenderFragment?`):  
  Custom content to render inside the dropzone. If not provided, a default message is shown.
- **OnBase64FileReceived** (`EventCallback<Base64FileTransfer>`):  
  Callback invoked when a file is received as base64 data.
- **OnBinaryFileReceived** (`EventCallback<BinaryFileTransfer>`):  
  Callback invoked when a file is received as binary data.