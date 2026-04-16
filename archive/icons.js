function createIcon(tagName, fileName) {
    class Icon extends HTMLElement {
        connectedCallback() {
            let text = this.textContent;
            this.innerHTML = `<img src="${DIRECTORY}${fileName}" alt="${tagName}" title="${text}">`;
        }
    }
    customElements.define(tagName, Icon);
}

createIcon('n-red', 'node-red.png')
createIcon('n-pink', 'node-pink.png')
createIcon('n-blue', 'node-blue.png')
createIcon('n-yel', 'node-yellow.png')
createIcon('ng-as', 'node-assassin.png')
createIcon('ng-ar', 'node-archer.png')
createIcon('ng-ma', 'node-mage.png')
createIcon('ng-sh', 'node-shaman.png')
createIcon('ng-wa', 'node-warrior.png')

createIcon('ut-ac', 'ultimate-acrobat.png')
createIcon('ut-su', 'ultimate-summoner.png')
createIcon('ut-sh', 'ultimate-shadestepper.png')

createIcon('i-eth', 'element-earth.png')
createIcon('i-thn', 'element-thunder.png')
createIcon('i-wtr', 'element-water.png')
createIcon('i-fir', 'element-fire.png')
createIcon('i-air', 'element-air.png')
createIcon('i-mana', 'icon-mana.png')
createIcon('i-lmb', 'click-left.png')
createIcon('i-rmb', 'click-right.png')


class WeaponItem extends HTMLElement {
    connectedCallback() {
        let name = this.getAttribute('name');
        let rarity = getRarity(this.getAttribute('rarity'));
        let image = this.getAttribute('img') || name;
        let label = this.getAttribute('label') || '';

        let labelHTML = label ? `<img class="weapon-label" src="${DIRECTORY}${label}" alt="Icon">` : '';

        this.innerHTML = `
            <div class="weapon">
                <div class="weapon-icon" style="background-image: url('${DIRECTORY}weapon${image}.png')">
                    ${labelHTML}
                </div>
                <div class="weapon-name" style="color: ${rarity}">${name}</div>
            </div>
        `;
    }
}
customElements.define('weapon-display', WeaponItem);