const ASSETS_DIR = "/wynnguides/assets/images/" // Relative to HTML

class Guide {
    constructor(clazz, name, icon, authors, spellCycles, abilities, weapons, aspects) {
        this.clazz = clazz;
        this.name = name;
        this.icon = icon;
        this.authors = authors;
        this.spellCycles = spellCycles;
        this.abilities = abilities;
        this.weapons = weapons;
        this.aspects = aspects;
    }

     archetypeCardHTML() {
        const cardImg = ASSETS_DIR + "portrait-" + this.clazz.toLowerCase() +".webp";
        const inlineIcon = ASSETS_DIR + "class-" + this.icon.toLowerCase() + ".png";
        const credits = "by " + this.authors.join(", ");


        document.querySelector('.archetype-card').innerHTML = `
            <img class="archetype-card-img" src="${cardImg}" alt="${this.clazz}">
                <span class="archetype-card-title">
                    <b>- <img src="${inlineIcon}" class="archetype-card-inline-icon" alt="Icon"> ${this.name} -</b>
                </span>
            <div style="text-align: center; color: #262626; padding: 1rem"><b>${credits}</b></div>
        `;
    }

    spellCyclesHTML() {
        let SPELL_CYCLES_HTML = ''
        for (const cycle of this.spellCycles) {
            SPELL_CYCLES_HTML += cycle.html();
        }
        document.getElementById('spell-cycles-div').outerHTML = SPELL_CYCLES_HTML;
    }

    abilitiesHTML() {
        let ABILITIES_HTML = '<div class="abilities-outer">'
        console.log(this.abilities);
        for (const ability of this.abilities) {
            if (ability instanceof Ability) {
                ABILITIES_HTML += ability.html()
            } else {
                ABILITIES_HTML += `<div class="ability-inner-double">`
                for (const doubledAbility of ability) {
                    ABILITIES_HTML += doubledAbility.html()
                }
                ABILITIES_HTML += `</div>`
            }
        }
        ABILITIES_HTML += `</div>`;
        document.getElementById('abilities-div').outerHTML = ABILITIES_HTML;
    }

    async weaponsHTML() {
        for (const weaponSection of this.weapons) {
            let WEAPONS_HTML = ''
            WEAPONS_HTML += `<div class="weapons">`;
            for (const weapon of weaponSection.weapons) {
                WEAPONS_HTML += await weapon.html(this.clazz)
            }
            WEAPONS_HTML += `</div>`;
            document.getElementById('weapons-' + weaponSection.tag).innerHTML = WEAPONS_HTML;
        }
    }

    aspectsHTML() {
        let ASPECTS_HTML = '<div class="aspects">'
        for (const aspect of this.aspects) {
            ASPECTS_HTML += aspect.html(this.clazz)
        }
        ASPECTS_HTML += `</div>`;
        document.getElementById('aspects-div').outerHTML = ASPECTS_HTML;
    }
}

class SpellCycle {
    constructor(name, nodes) {
        this.name = name;
        this.nodes = nodes;
    }

    html() {
        let SPELL_CYCLE_HTML = `<div class="guide-subheading">- ${this.name} -</div>`
        SPELL_CYCLE_HTML += `<div class="spell-cycle-outer">`
        for (const node of this.nodes) {
            if (typeof node === 'string') {
                SPELL_CYCLE_HTML += `<div class="spell-in-between">${node}</div>`
            } else if (typeof node === 'object' && node !== null) {
                SPELL_CYCLE_HTML += `
                    <div class="spell-display">
                        <img src="${ASSETS_DIR}${node.icon}.png" alt="${node.icon}">${node.name}
                    </div>
                `
            }
        }
        SPELL_CYCLE_HTML += `</div>`;
        return SPELL_CYCLE_HTML;
    }
}

class SpellCycleNode {
    constructor(icon, name) {
        this.icon = icon;
        this.name = name;
    }
}

class Ability {
    constructor(icon, name, description) {
        this.icon = icon;
        this.name = name;
        this.description = description;
    }

    html() {
        let ABILITY_HTML = '<div class="ability">';
        ABILITY_HTML += `<div class="ability-icon">`;
        ABILITY_HTML += `<img src="${ASSETS_DIR}${this.icon}.png" alt="${this.icon}">`;
        ABILITY_HTML += `<div class="ability-icon-text">${this.name}</div>`;
        ABILITY_HTML += `</div>`;
        ABILITY_HTML += `<div class="ability-description">${parseDescription(this.description)}</div>`;
        ABILITY_HTML += `</div>`;
        return ABILITY_HTML;
    }
}

class WeaponSection {
    constructor(tag, weapons) {
        this.tag = tag;
        this.weapons = weapons;
    }
}

class Weapon {
    constructor(name, rarity, type = null) {
        this.name = name;
        this.rarity = rarity;
        this.type = type;
    }

    async html(clazz) {
        const typeHTML = this.type ? `<img class="weapon-label" src="${ASSETS_DIR}icon-${this.type}.png" alt="Icon">` : '';
        const imageName = this.name.toLowerCase().replace(/\s/g, '');
        const className = clazz.toLowerCase();

        let backgroundImageUrl = '';
        await fetch(`${ASSETS_DIR}weapon-${imageName}.png`)
            .then(res => {
                if (res.ok) {
                    backgroundImageUrl = res.url;
                } else {
                    backgroundImageUrl = ASSETS_DIR + "weapon-" + className + ".png";
                }
            })
            .catch(err => {
                backgroundImageUrl = ASSETS_DIR + "weapon-" + className + ".png";
            })

        return `
            <div class="weapon">
                <div class="weapon-icon" style="background-image: url(${backgroundImageUrl})">
                    ${typeHTML}
                </div>
                <div class="weapon-name" style="color: ${getRarity(this.rarity)}">${this.name}</div>
            </div>
        `;
    }
}

class Aspect {
    constructor(name, description, rarity) {
        this.name = name;
        this.description = description;
        this.rarity = rarity;
    }

    html(clazz) {
        let className = clazz.toLowerCase();

        return `
        <div class="aspect">
            <img class="aspect-icon" src="${ASSETS_DIR}aspect-${className}.png" alt="${clazz}">
                <div class="aspect-outer">
                    <b style="color: ${getRarity(this.rarity)}; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${this.name}</b>
                    <div class="aspect-description">${parseDescription(this.description)}</div>
                </div>
        </div>`

    }
}

function parseDescription(description) {
    const matches = description.match(/@([\w-]+)/g);
    if (matches) {
        matches.forEach(match => {
            const image = match.slice(1);
            const replacement = `<img src="${ASSETS_DIR}/${image}.png" alt="${image}">`
            description = description.replace(match, replacement);
        });
    }

    description = description.replace(/#([^#]+)#/g, '<b>$1</b>');
    return description;
}
