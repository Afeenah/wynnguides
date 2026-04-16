async function parseGuide(json) {
    let guideJson;
    await fetch(json)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            guideJson = data;
        });

    console.log(guideJson)

    let clazz, name, icon, authors, spellCycles, abilities, weapons,  aspects;
    clazz = guideJson.clazz;
    name = guideJson.name;
    icon = guideJson.icon;
    authors = guideJson.authors;
    spellCycles = parseSpellCycles(guideJson);
    abilities = parseAbilities(guideJson);
    weapons = parseWeapons(guideJson);
    aspects = parseAspects(guideJson);

    return new Guide(clazz, name, icon, authors, spellCycles, abilities, weapons, aspects);
}

function parseSpellCycles(json) {
    const SPELL_CYCLES = []
    for (let object of json.spellCycles) {
        const SPELL_CYCLE = []
        for (let node of object.cycle) {
            if (node.spell) {
                const [name, icon] = node.spell.split(": ");
                SPELL_CYCLE.push(new SpellCycleNode(icon, name));
            }

            if (node.space) {
                SPELL_CYCLE.push(node.space)
            }
        }
        SPELL_CYCLES.push(new SpellCycle(object.name, SPELL_CYCLE));
    }
    return SPELL_CYCLES;
}

function parseAbilities(json) {
    const ABILITIES = []
    for (let object of json.abilities) {
        if (Array.isArray(object)) {
            const DOUBLED_ABILITIES = [];
            for (let doubledAbility of object) {
                let icon, name, description;
                icon = doubledAbility.icon;
                name = doubledAbility.name;
                description = doubledAbility.description;
                DOUBLED_ABILITIES.push(new Ability(icon, name, description));
            }
            ABILITIES.push(DOUBLED_ABILITIES);
        } else if (typeof object === 'object') {
            let icon, name, description;
            icon = object.icon;
            name = object.name;
            description = object.description;
            ABILITIES.push(new Ability(icon, name, description));
        }
    }
    return ABILITIES;
}

function parseWeapons(json) {
    const RECOMMENDED = [];
    const BUDGET = [];

    for (let object of json.weapons.recommended) {
        RECOMMENDED.push(new Weapon(object.name, object.rarity, object.type));
    }
    for (let object of json.weapons.budget) {
        BUDGET.push(new Weapon(object.name, object.rarity, object.type));
    }

    const FINAL = [new WeaponSection("recommended", RECOMMENDED)];
    if (BUDGET.length > 0) {
        FINAL.push(new WeaponSection("budget", BUDGET))
    }

    return FINAL;
}

function parseAspects(json) {
    const ASPECTS = [];
    for (let object of json.aspects) {
        ASPECTS.push(new Aspect(object.name, object.description, object.rarity));
    }
    return ASPECTS;
}