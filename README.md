# Super Simple Blazor Dropzone

Super Simple Blazor Dropzone is a lightweight and easy-to-use file dropzone component for Blazor applications. It allows you to receive files via drag-and-drop or file picker, with minimal configuration and effort.

## Features

- Simple and intuitive API
- Lightweight and fast
- Customizable with CSS classes and content
- Supports .NET 8 and .NET 9
- Supports both base64 and binary file transfer
- JavaScript interop for drag-and-drop and file selection

## Installation

To install the package, run the following command:

```sh
dotnet add package SuperSimpleBlazorDropzone
```

## Usage

Use the `SimpleDropzone` component in your Blazor pages or components:

```razor
@using SuperSimpleBlazorDropzone
@rendermode InteractiveAuto

<SimpleDropzone OnBase64FileReceived="@OnBase64FileReceived" />

@code {
    private Base64FileTransfer? _base64File;

    private void OnBase64FileReceived(Base64FileTransfer file)
    {
        _base64File = file;
    }
}
```

### Customizing Content and Output

You can customize the dropzone's appearance and output type. For example, to receive binary data and use custom CSS/content:

```razor
<SimpleDropzone
    CssClass="custom"
    DragActiveCssClass="custom-drag-active"
    ContentOutputType="@FileContentOutput.Binary"
    OnBinaryFileReceived="@OnBinaryFileReceived">
    <pre>As you can see, this is some customized content for binary files. Please drop here to see it working</pre>
</SimpleDropzone>

@code {
    private BinaryFileTransfer? _binaryFile;

    private void OnBinaryFileReceived(BinaryFileTransfer file)
    {
        _binaryFile = file;
    }
}
```

### Example Output Rendering

```razor
@if (_binaryFile != null)
{
    <div>
        <h4>File Name: @_binaryFile.Name</h4>
        <h4>File Size: @_binaryFile.Size</h4>
        <h4>File Type: @_binaryFile.Type</h4>
        <h4>File Extension: @_binaryFile.Extension</h4>
        <h4>File Content:</h4>
        <pre class="w-100 text-truncate" style="max-width: 100%; max-height: 10rem; overflow: auto;">
            @(_binaryFile.Content != null 
                ? BitConverter.ToString(_binaryFile.Content).Replace("-", " ") 
                : string.Empty)
        </pre>
        @if (!string.IsNullOrWhiteSpace(_binaryFile.ImgSrc))
        {
            <img src="@_binaryFile.ImgSrc" alt="Uploaded Image" />
        }
    </div>
}
```

## Parameters

- `CssClass` (`string`): The CSS class applied to the dropzone container. Default is `"file-dropper"`.
- `DragActiveCssClass` (`string`): The CSS class applied when a file is being dragged over the dropzone. Default is `"drag-active"`.
- `ContentOutputType` (`FileContentOutput`): Determines the format of the file content received (`Base64` or `Binary`). Default is `Base64`.
- `DropperId` (`string`): The unique ID for the dropzone element. Defaults to a new GUID.
- `ChildContent` (`RenderFragment?`): Custom content to render inside the dropzone. If not provided, a default message is shown.
- `OnBase64FileReceived` (`EventCallback<Base64FileTransfer>`): Callback invoked when a file is received as base64 data.
- `OnBinaryFileReceived` (`EventCallback<BinaryFileTransfer>`): Callback invoked when a file is received as binary data.

## Styling

You can customize the dropzone with your own CSS classes. Example:

```css
.custom {
    border: 3px dashed #ff6f61;
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    background: linear-gradient(135deg, #f9d423 0%, #ff4e50 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
}
.custom-drag-active {
    border-color: #43cea2;
    background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
    color: #fff;
    animation: dragPulse 1s infinite alternate;
}
@keyframes dragPulse {
    from { box-shadow: 0 0 24px 4px #43cea2; }
    to   { box-shadow: 0 0 48px 8px #43cea2; }
}
```