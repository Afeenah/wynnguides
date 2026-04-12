function createIcon(tagName, fileName) {
    class Icon extends HTMLElement {
        connectedCallback() {
            let text = this.textContent;
            this.innerHTML = `<img src="${DIRECTORY}${fileName}" alt="Icon" title="${text}">`;
        }
    }
    customElements.define(tagName, Icon);
}

createIcon('n-red', 'nodeRed.png')
createIcon('n-pink', 'nodePink.png')
createIcon('n-blue', 'nodeBlue.png')
createIcon('n-yel', 'nodeYellow.png')
createIcon('ng-as', 'nodeGreenAssassin.png')
createIcon('ng-ar', 'nodeGreenArcher.png')
createIcon('ng-ma', 'nodeGreenMage.png')
createIcon('ng-sh', 'nodeGreenShaman.png')
createIcon('ng-wa', 'nodeGreenWarrior.png')

createIcon('ut-ac', 'ultimateAcrobat.png')
createIcon('ut-su', 'ultimateSummoner.png')
createIcon('ut-sh', 'ultimateShadestepper.png')

createIcon('as-as', 'aspectAssassin.png')
createIcon('as-sh', 'aspectShaman.png')

createIcon('i-eth', 'earth.png')
createIcon('i-thn', 'thunder.png')
createIcon('i-wtr', 'water.png')
createIcon('i-fir', 'fire.png')
createIcon('i-air', 'air.png')
createIcon('i-mana', 'mana.png')
createIcon('i-lmb', 'clickLeft.png')
createIcon('i-rmb', 'clickRight.png')


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