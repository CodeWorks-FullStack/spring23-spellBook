import { appState } from "../AppState.js"
import { sandboxSpellsService } from "../Services/SandboxSpellsService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawMySpells() {
  let spells = appState.mySpells
  let template = ''
  spells.forEach(s => template += s.myListTemplate)
  setHTML('my-spells', template)
  let preparedCount = appState.mySpells.filter(s => s.prepared).length
  setText('spell-count', `${preparedCount}/8`)
}



export class SandboxSpellsController {
  constructor() {
    console.log('sandbox loaded')
    this.getMySpells()
    appState.on('mySpells', _drawMySpells)
  }


  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async addSpell() {
    try {
      await sandboxSpellsService.addSpell()
      Pop.toast('added spell to spell book', 'success')
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  setActiveSpell(id) {
    sandboxSpellsService.setActiveSpell(id)
  }

  async prepareSpell(id) {
    try {
      event.stopPropagation()
      sandboxSpellsService.prepareSpell(id)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}