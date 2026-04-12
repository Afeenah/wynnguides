const DIRECTORY = "../assets/images/"

function createIcon(tagName, fileName) {
    class Icon extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `<img src="${DIRECTORY}${fileName}" alt="Icon">`;
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

createIcon('as-as', 'aspectAssassin.png')

createIcon('i-mana', 'mana.png')
createIcon('i-lmb', 'clickLeft.png')
createIcon('i-rmb', 'clickRight.png')