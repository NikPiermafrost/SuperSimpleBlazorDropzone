export const setDragActive = (elementId, active, cssClass) => {
    const dropper = document.getElementById(elementId);
    if (dropper) {
        if (active) dropper.classList.add(cssClass);
        else dropper.classList.remove(cssClass);
    }
}
export const handleDrop = async (dotNetRef, event) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const blob = new Uint8Array(await file.arrayBuffer());
        const data = {
            name: file.name,
            extension: file.name.split('.').pop(),
            type: file.type,
            size: file.size,
            content: blob
        };
        dotNetRef.invokeMethodAsync('ReceiveBinaryData', data);
    }
}
export const registerDropHandler = (dotNetRef, elementId) => {
    document.getElementById(elementId)?.addEventListener('drop', dropEventListener(dotNetRef));
}
export const removeEventListeners = (dotNetRef, elementId) => {
    document.getElementById(elementId)?.removeEventListener('drop', dropEventListener(dotNetRef));
}
export const clickHiddenFileInput = (fileInputId) => {
    const input = document.getElementById(fileInputId);
    // this doesn't trigger blazor event dispatching, causing a loop
    if (input) {
        const evt = new MouseEvent('click', { bubbles: false, cancelable: true, view: window });
        input.dispatchEvent(evt);
    }
}
export const dropEventListener = (dotNetRef) => 
    (e) => handleDrop(dotNetRef, e);