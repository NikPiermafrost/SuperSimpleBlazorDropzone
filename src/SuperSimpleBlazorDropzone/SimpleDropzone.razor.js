export const setDragActive = (elementId, active, cssClass) => {
    const dropper = document.getElementById(elementId);
    if (dropper) {
        if (active) dropper.classList.add(cssClass);
        else dropper.classList.remove(cssClass);
    }
}
export const handleDrop = (dotNetRef, event, contentOutputType) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = {
                name: file.name,
                extension: file.name.split('.').pop(),
                type: file.type,
                size: file.size
            };
            if (contentOutputType === 'Base64') {
                data.content = e.target.result.split('base64,')[1];
                dotNetRef.invokeMethodAsync('ReceiveBase64Data', data);
            }
            if (contentOutputType === 'Binary' && file) {
                data.content = new Uint8Array(e.target.result);
                dotNetRef.invokeMethodAsync('ReceiveBinaryData', data);
            }
        };
        if (contentOutputType === 'Binary') {
            reader.readAsArrayBuffer(file);
        }
        if (contentOutputType === 'Base64') {
            reader.readAsDataURL(file);
        }
    }
}
export const registerDropHandler = (dotNetRef, elementId, contentOutputType) => {
    document.getElementById(elementId)?.addEventListener('drop', dropEventListener(dotNetRef, contentOutputType));
}
export const removeEventListeners = (dotNetRef, elementId, contentOutputType) => {
    document.getElementById(elementId)?.removeEventListener('drop', dropEventListener(dotNetRef, contentOutputType));
}
export const clickHiddenFileInput = (fileInputId) => {
    const input = document.getElementById(fileInputId);
    // this doesn't trigger blazor event dispatching, causing a loop
    if (input) {
        const evt = new MouseEvent('click', { bubbles: false, cancelable: true, view: window });
        input.dispatchEvent(evt);
    }
}
export const dropEventListener = (dotNetRef, contentOutputType) => 
    (e) => handleDrop(dotNetRef, e, contentOutputType);