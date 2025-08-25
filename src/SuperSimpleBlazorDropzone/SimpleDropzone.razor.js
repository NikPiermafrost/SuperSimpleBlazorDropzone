export const setDragActive = (elementId, active, cssClass) => {
    const dropper = document.getElementById(elementId);
    if (dropper) {
        if (active) dropper.classList.add(cssClass);
        else dropper.classList.remove(cssClass);
    }
}
export const handleDrop = async (dotNetRef, event, allowMultiple) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length < 1) {
        window.alert('No files were dropped.');
        return;
    }
    const result = [];
    let actualFiles = allowMultiple ? files : [files[0]];
    for (const file of actualFiles) {
        const blob = new Uint8Array(await file.arrayBuffer());
        const data = {
            name: file.name,
            extension: file.name.split('.').pop(),
            type: file.type,
            size: file.size,
            content: blob
        };
        result.push(data);
    }
    dotNetRef.invokeMethodAsync('ReceiveBinaryData', result);
}
export const registerDropHandler = (dotNetRef, elementId, allowMultiple) => {
    document.getElementById(elementId)?.addEventListener('drop', dropEventListener(dotNetRef, allowMultiple));
}
export const removeEventListeners = (dotNetRef, elementId, allowMultiple) => {
    document.getElementById(elementId)?.removeEventListener('drop', dropEventListener(dotNetRef, allowMultiple));
}
export const clickHiddenFileInput = (fileInputId) => {
    const input = document.getElementById(fileInputId);
    // this doesn't trigger blazor event dispatching, causing a loop
    if (input) {
        const evt = new MouseEvent('click', { bubbles: false, cancelable: true, view: window });
        input.dispatchEvent(evt);
    }
}
export const dropEventListener = (dotNetRef, allowMultiple) =>
    (e) => handleDrop(dotNetRef, e, allowMultiple);