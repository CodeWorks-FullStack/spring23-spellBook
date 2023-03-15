


export class Spell {
  constructor(data) {
    this.id = data.id // NOTE what about the spell index?
    this.name = data.name
    this.level = data.level
    this.description = data.description || data.desc.join('\n')
    this.damage = this.getDamageDangIt(data.damage)
    this.range = data.range
    this.material = data.material || 'NA'
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.castingTime || data.casting_time
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared
  }

  getDamageDangIt(damage) {
    if (!damage) return 'no Damage ✨'
    if (damage.damage_at_slot_level) return `${damage.damage_at_slot_level[this.level]} - ${damage.damage_type.name}`
    if (damage.damage_at_character_level) return `${damage.damage_at_character_level[1]} - ${damage.damage_type.name}`
    return damage
  }

  static listTemplate(spell) {
    return `
  <div class="row align-items-center py-1">
    <div class="col-12 fw-bold selectable py-1" onclick="app.dndSpellsController.selectSpell('${spell.index}')">${spell.name}</div>
  </div>
    `
  }

  get myListTemplate() {
    return `
  <div class="row align-items-center selectable my-1 py-1" onclick="app.sandboxSpellsController.setActiveSpell('${this.id}')">
    <div class="col-2">${this.prepared ? '🧠' : ''}</div>
    <div class="col-8 fw-bold">${this.name}</div>
    <div class="col-2"><input type="checkbox" ${this.prepared ? 'checked' : ''} onclick="app.sandboxSpellsController.prepareSpell('${this.id}')"></div>
  </div>
    `
  }

  get ActiveTemplate() {
    return `
  <div class="row bg-white p-2 text-center sticky-top mt-2">
    <h3 class="text-primary fw-bold border-bottom border-primary border-2">${this.name}</h3>
    <div class="text-start my-2">${this.description}</div>
    <h4>${this.damage} | ${this.level} | ${this.range}</h4>
    <h4>${this.material} | ${this.components} | ${this.castingTime}</h4>
    <h3>${this.ritual ? '🌟' : ''} | ${this.concentration ? '🤯' : ''} | ${this.duration}</h3>
    <button class="btn btn-primary" onclick="app.sandboxSpellsController.addSpell()"><i class="mdi mdi-plus"></i> 📖</button>
  </div>
    `
  }
}