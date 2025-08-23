using System;
using Microsoft.AspNetCore.Components.Forms;
using SuperSimpleBlazorDropzone.Models;

namespace SuperSimpleBlazorDropzone.Extensions;

public static class BrowserFileExtensions
{
    public static async Task<Base64FileTransfer> RequestBase64FileTransferAsync(this IBrowserFile file)
    {
        var buffer = new byte[file.Size];
        using var stream = file.OpenReadStream();
        await stream.ReadExactlyAsync(buffer);
        var base64String = Convert.ToBase64String(buffer);
        return new Base64FileTransfer
        {
            Name = file.Name,
            Type = file.ContentType,
            Content = base64String,
            Extension = Path.GetExtension(file.Name),
            Size = file.Size
        };
    }

    public static async Task<BinaryFileTransfer> RequestBinaryFileTransferAsync(this IBrowserFile file)
    {
        var buffer = new byte[file.Size];
        using var stream = file.OpenReadStream();
        await stream.ReadExactlyAsync(buffer);
        return new BinaryFileTransfer
        {
            Name = file.Name,
            Type = file.ContentType,
            Content = buffer,
            Extension = Path.GetExtension(file.Name),
            Size = file.Size
        };
    }
}
