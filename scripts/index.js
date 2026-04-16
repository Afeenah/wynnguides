class ClassDisplay {
    constructor(clazz, title, archetype, json = null) {
        this.clazz = clazz;
        this.title = title;
        this.archetype = archetype;
        this.guideName = json;
    }

    create() {
        const reference = this.guideName ? `${this.guideName}` : './comingsoon.html';
        const classIcon = './assets/images/' + 'portrait-' + this.clazz + '.webp';
        const archetypeIcon = './assets/images/' + 'class-' + this.archetype + '.png';

        return `
            <a href="#" data-guide=${reference} class="select-card">
                <img src="${classIcon}" alt="Button">
                <span class="card-title">
                    <img src="${archetypeIcon}" class="inline-icon">
                    <span class="title-text">${this.title}</span>
                </span>
            </a>
        `;
    }

    static renderAll(cards, containerId) {
        document.getElementById(containerId).innerHTML = cards.map(card => card.create()).join('');
    }
}

async function loadFiles() {
    const finished = [
        new ClassDisplay("assassin", "Acrobat", "acrobat", "acrobat"),
        new ClassDisplay("assassin", "H-Melee Shade", "shadestepper", "hmeleeshade"),
        new ClassDisplay("assassin", "Shadestepper", "shadestepper", "shadestepper"),
        new ClassDisplay("assassin", "Mirror-Shade", "mirrorshade", "mirrorshade"),
        new ClassDisplay("shaman", "Puppet Bomber", "puppetbomber", "puppetbomber"),
        new ClassDisplay("shaman", "Summoner", "summoner", "summoner"),
        new ClassDisplay("archer", "Boltslinger", "boltslinger", "boltslinger")
    ]
    const review = [
        new ClassDisplay("warrior", "Bash-Uppercut", "fallen", "wip/bashuppercut"),
        new ClassDisplay("warrior", "Upper-Scream", "fallen", "wip/upperscream"),
        new ClassDisplay("warrior", "Fallen-Generalist", "fallengeneralist", "wip/generalistfallen"),
        new ClassDisplay("warrior", "Battlemonk", "battlemonk", "wip/battlemonk"),
        new ClassDisplay("warrior", "Big-Mac", "bigmac", "wip/bigmac"),
        new ClassDisplay("archer", "Sharpshooter", "sharpshooter", "wip/sharpshooter"),
        new ClassDisplay("mage", "Riftwalker", "riftwalker", "wip/riftwalker")
    ]

    ClassDisplay.renderAll(finished, 'finished');
    ClassDisplay.renderAll(review, 'review');
}

