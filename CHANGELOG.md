# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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