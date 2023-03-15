import { appState } from "../AppState.js"
import { Spell } from "../Models/Spell.js"
import { dndSpellsService } from "../Services/DndSpellsService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawSpellList() {
  let spells = appState.dndSpells
  let template = ''
  spells.forEach(s => template += Spell.listTemplate(s))
  setHTML('dnd-spells', template)
}

function _drawActiveSpell() {
  let spell = appState.activeSpell
  setHTML('active-spell', spell.ActiveTemplate)
}

export class DnDSpellsController {
  constructor() {
    console.log('dnd loaded')
    this.getAllSpells()
    appState.on('dndSpells', _drawSpellList)
    appState.on('activeSpell', _drawActiveSpell)
  }


  async getAllSpells() {
    try {
      await dndSpellsService.getAllSpells()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async selectSpell(index) {
    try {
      console.log('selected', index)
      await dndSpellsService.getOneSpell(index)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}