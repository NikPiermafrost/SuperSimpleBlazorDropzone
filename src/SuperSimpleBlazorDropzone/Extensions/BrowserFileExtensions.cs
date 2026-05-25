using Microsoft.AspNetCore.Components.Forms;
using SuperSimpleBlazorDropzone.Models;

namespace SuperSimpleBlazorDropzone.Extensions;

public static class BrowserFileExtensions
{
    private const long DefaultMaxFileSize = 50 * 1024 * 1024;

    public static async Task<Base64FileTransfer> RequestBase64FileTransferAsync(this IBrowserFile file, long? maxFileSize = null)
    {
        var maxSize = maxFileSize ?? DefaultMaxFileSize;
        var buffer = new byte[file.Size];
        await using var stream = file.OpenReadStream(maxSize);
        await stream.ReadExactlyAsync(buffer);
        return new Base64FileTransfer
        {
            Name = file.Name,
            Type = file.ContentType,
            Content = Convert.ToBase64String(buffer),
            Extension = Path.GetExtension(file.Name),
            Size = file.Size
        };
    }

    public static async Task<BinaryFileTransfer> RequestBinaryFileTransferAsync(this IBrowserFile file, long? maxFileSize = null)
    {
        var maxSize = maxFileSize ?? DefaultMaxFileSize;
        var buffer = new byte[file.Size];
        await using var stream = file.OpenReadStream(maxSize);
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
