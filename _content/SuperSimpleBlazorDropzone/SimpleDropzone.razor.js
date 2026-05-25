const _dropListeners = new Map();

export const setDragActive = (elementId, active, cssClass) => {
    const dropper = document.getElementById(elementId);
    if (dropper) {
        if (active) dropper.classList.add(cssClass);
        else dropper.classList.remove(cssClass);
    }
}

export const handleDrop = async (dotNetRef, event, allowMultiple, maxFileSize, dragActiveCssClass) => {
    event.preventDefault();
    const elementId = event.currentTarget.id;
    setDragActive(elementId, false, dragActiveCssClass);
    const files = event.dataTransfer.files;
    if (files.length < 1) return;

    const actualFiles = allowMultiple ? files : [files[0]];
    const result = [];

    for (const file of actualFiles) {
        if (maxFileSize && file.size > maxFileSize) continue;
        const buffer = new Uint8Array(await file.arrayBuffer());
        result.push({
            name: file.name,
            extension: file.name.includes('.') ? file.name.split('.').pop() : '',
            type: file.type,
            size: file.size,
            content: buffer
        });
    }

    if (result.length === 0) return;
    dotNetRef.invokeMethodAsync('ReceiveBinaryData', result);
}

export const registerDropHandler = (dotNetRef, elementId, allowMultiple, maxFileSize, dragActiveCssClass) => {
    const dropper = document.getElementById(elementId);
    if (!dropper) return;

    const listener = (e) => handleDrop(dotNetRef, e, allowMultiple, maxFileSize, dragActiveCssClass);
    _dropListeners.set(elementId, listener);
    dropper.addEventListener('drop', listener);
}

export const removeEventListeners = (dotNetRef, elementId, allowMultiple) => {
    const dropper = document.getElementById(elementId);
    if (!dropper) return;

    const listener = _dropListeners.get(elementId);
    if (listener) {
        dropper.removeEventListener('drop', listener);
        _dropListeners.delete(elementId);
    }
}

export const clickHiddenFileInput = (fileInputId) => {
    const input = document.getElementById(fileInputId);
    if (input) {
        const evt = new MouseEvent('click', { bubbles: false, cancelable: true, view: window });
        input.dispatchEvent(evt);
    }
}
