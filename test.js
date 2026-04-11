function scaleFontSize() {
    let elements = document.querySelectorAll('.spell-name, .ability-display-text');

    elements.forEach(el => {
        let parent = el.parentElement;
        if (!parent) return;

        let parentWidth = parent.clientWidth;
        let textWidth = el.scrollWidth;
        let currentFontSize = parseFloat(window.getComputedStyle(el).fontSize);

        // Force scale to fit within 90% of parent width
        let targetWidth = parentWidth * 0.99;
        let newSize = currentFontSize * (targetWidth / textWidth);

        // Only apply if smaller than current
        if (newSize < currentFontSize) {
            el.style.fontSize = newSize + 'px';
            console.log('Scaled:', el.innerText, 'from', currentFontSize, 'to', newSize);
        }
    });
}

function scaleTextToFit() {
    let elements = document.querySelectorAll();

    elements.forEach(el => {
        let parent = el.parentElement;
        if (!parent) return;

        let maxHeight = parent.clientHeight * 0.85;
        let fontSize = 16;

        el.style.fontSize = fontSize + 'px';

        while (el.scrollHeight > maxHeight && fontSize > 8) {
            fontSize--;
            el.style.fontSize = fontSize + 'px';
        }
    });
}



// Run after everything loads
window.addEventListener('load', scaleFontSize);
window.addEventListener('resize', scaleFontSize);
window.addEventListener('load', scaleTextToFit);
window.addEventListener('resize', scaleTextToFit);
setTimeout(scaleFontSize, 100); // Fallback