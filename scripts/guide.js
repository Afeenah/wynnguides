function adjustFontSize(element) {
    const computedStyle = window.getComputedStyle(element);
    let fontSize = parseFloat(computedStyle.fontSize);

    while (element.scrollWidth > element.clientWidth && fontSize > 8) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}
function addListeners() {
    document.querySelectorAll('.weapon').forEach(weapon => {
        const icon = weapon.querySelector('.weapon-icon');
        if (!icon) return;

        const labelImg = icon.querySelector('.weapon-label');

        let description = 'Solid';

        if (labelImg) {
            const imgSrc = labelImg.src;
            const match = imgSrc.match(/([\w-]+)\.png$/);
            const labelName = match ? match[1] : 'unknown';

            switch (labelName) {
                case 'icon-recommended':
                    description = 'Recommended for Average Player';
                    break;
                case 'icon-expert':
                    description = 'High-Skill but High Damage';
                    break;
                case 'icon-comfy':
                    description = 'Comfortable to Play';
                    break;
                default:
                    description = 'Solid';
                    break;
            }
        }

        let tooltip = null;

        icon.addEventListener('mouseenter', (e) => {
            tooltip = document.createElement('div');
            tooltip.className = 'weapon-tooltip';
            tooltip.textContent = description;
            tooltip.style.position = 'fixed';
            tooltip.style.left = (e.clientX + 10) + 'px';
            tooltip.style.top = (e.clientY + 10) + 'px';
            tooltip.style.pointerEvents = 'none';
            document.body.appendChild(tooltip);
        });

        icon.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.style.top = (e.clientY + 10) + 'px';
            }
        });

        icon.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
}
