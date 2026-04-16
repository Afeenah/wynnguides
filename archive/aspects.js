class AspectItem extends HTMLElement {
    connectedCallback() {
        let icon = this.getAttribute('class');
        let name = this.getAttribute('name');
        let rarity = getRarity(this.getAttribute('rarity'));

        setTimeout(() => {
            let children = Array.from(this.childNodes);
            this.innerHTML = '';

            let wrapper = document.createElement('div');
            wrapper.className = 'aspect';

            let iconImg = document.createElement('img');
            iconImg.className = 'aspect-icon';
            iconImg.src = `${DIRECTORY}aspect-${icon}.png`;

            let outerDiv = document.createElement('div');
            outerDiv.className = 'aspect-outer';

            let nameBold = document.createElement('b');
            nameBold.style.color = rarity;
            nameBold.textContent = name;
            nameBold.style.display = 'block';
            nameBold.style.whiteSpace = 'nowrap';
            nameBold.style.overflow = 'hidden';
            nameBold.style.textOverflow = 'ellipsis';

            // Auto-adjust font size
            let adjustFontSize = () => {
                let container = nameBold.parentElement;
                let maxWidth = container.clientWidth - 20; // Account for padding
                let currentSize = 16; // Start size in px

                nameBold.style.fontSize = currentSize + 'px';

                while (nameBold.scrollWidth > maxWidth && currentSize > 8) {
                    currentSize--;
                    nameBold.style.fontSize = currentSize + 'px';
                }
            };

            setTimeout(adjustFontSize, 10);
            window.addEventListener('resize', adjustFontSize);

            let descDiv = document.createElement('div');
            descDiv.className = 'aspect-description';

            children.forEach(child => {
                descDiv.appendChild(child);
            });

            outerDiv.appendChild(nameBold);
            outerDiv.appendChild(descDiv);
            wrapper.appendChild(iconImg);
            wrapper.appendChild(outerDiv);

            this.appendChild(wrapper);
        }, 100);
    }
}
customElements.define('aspect-display', AspectItem);