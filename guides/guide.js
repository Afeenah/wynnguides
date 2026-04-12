function scaleToFit() {
    const body = document.body;
    const content = document.querySelector('.guide-outer');
    if (!content) return;

    const contentWidth = content.scrollWidth;
    const windowWidth = window.innerWidth;

    if (contentWidth > windowWidth) {
        const scale = windowWidth / contentWidth;
        body.style.transformOrigin = 'top center';
        body.style.transform = `scale(${scale})`;
        body.style.width = `${contentWidth}px`;
        body.style.margin = '0 auto';
    }
}

window.addEventListener('load', scaleToFit);
window.addEventListener('resize', scaleToFit);