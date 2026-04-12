function fitToScreen() {
    const wrapper = document.querySelector('.guide-outer');
    if (!wrapper) return;

    const scale = Math.min(
        1,
        window.innerWidth / wrapper.scrollWidth
    );

    const newFontSize = 16 * scale;
    document.documentElement.style.fontSize = Math.max(newFontSize, 10) + 'px';
}

window.addEventListener('load', fitToScreen);
window.addEventListener('resize', fitToScreen);