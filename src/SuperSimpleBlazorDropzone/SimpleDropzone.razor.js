const _dropListeners = new Map();
const _clickListeners = new Map();

export const setDragActive = (elementId, active, cssClass) => {
    const dropper = document.getElementById(elementId);
    if (dropper) {
        if (active) {
            dropper.classList.add(cssClass);
        }
        else {
            dropper.classList.remove(cssClass);
        }
    }
}

export const handleDrop = async (dotNetRef, event, allowMultiple, maxFileSize, dragActiveCssClass) => {
    event.preventDefault();
    const elementId = event.currentTarget.id;
    setDragActive(elementId, false, dragActiveCssClass);
    const files = event.dataTransfer.files;
    if (files.length < 1) {
        return;
    }
    const actualFiles = allowMultiple ? files : [files[0]];
    for (const file of actualFiles) {
        if (maxFileSize && file.size > maxFileSize) {
            continue;
        }
        await dotNetRef.invokeMethodAsync('ReceiveData', DotNet.createJSStreamReference(file), file.name, file.type, file.size);
    }
}

export const registerDropHandler = (dotNetRef, elementId, allowMultiple, maxFileSize, dragActiveCssClass, fileInputId) => {
    const dropper = document.getElementById(elementId);
    if (!dropper) {
        return;
    }
    const listener = (e) => handleDrop(dotNetRef, e, allowMultiple, maxFileSize, dragActiveCssClass);
    _dropListeners.set(elementId, listener);
    dropper.addEventListener('drop', listener);
    const clickListener = (e) => {
        const input = document.getElementById(fileInputId);
        if (!input) {
            return;
        }
        if (e.target === input || input.contains(e.target)) {
            return;
        }
        input.click();
    };
    _clickListeners.set(elementId, clickListener);
    dropper.addEventListener('click', clickListener);
}

export const removeEventListeners = (dotNetRef, elementId, allowMultiple) => {
    const dropper = document.getElementById(elementId);
    if (!dropper) {
        return;
    }
    const listener = _dropListeners.get(elementId);
    if (listener) {
        dropper.removeEventListener('drop', listener);
        _dropListeners.delete(elementId);
    }
    const clickListener = _clickListeners.get(elementId);
    if (clickListener) {
        dropper.removeEventListener('click', clickListener);
        _clickListeners.delete(elementId);
    }
}
