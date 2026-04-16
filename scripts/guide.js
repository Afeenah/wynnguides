function adjustFontSize(element) {
    const computedStyle = window.getComputedStyle(element);
    let fontSize = parseFloat(computedStyle.fontSize);

    while (element.scrollWidth > element.clientWidth && fontSize > 8) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}