using System;

namespace SuperSimpleBlazorDropzone.Models;

public class FileTransfer
{
    public string Name { get; set; } = default!;
    public string Extension { get; set; } = default!;
    public string Type { get; set; } = default!;
    public long Size { get; set; }
}

public class Base64FileTransfer : FileTransfer
{
    public string Content { get; set; } = default!;
    public string? ImgSrc => Type.StartsWith("image", StringComparison.OrdinalIgnoreCase) ? $"data:{Type};base64,{Content}" : null;
}

public class BinaryFileTransfer : FileTransfer
{
    public byte[] Content { get; set; } = default!;
    public string? ImgSrc => Type.StartsWith("image", StringComparison.OrdinalIgnoreCase) ? $"data:{Type};base64,{Convert.ToBase64String(Content)}" : null;
}
