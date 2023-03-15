import { appState } from "../AppState.js"
import { Spell } from "../Models/Spell.js";

// @ts-ignore
const sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/thortyn',
  timeout: 5000
})

class SandboxSpellsService {
  async prepareSpell(id) {
    const spell = appState.mySpells.find(s => s.id == id)
    // if (spell.prepared) {
    //   spell.prepared = false
    // } else {
    //   spell.prepared = true
    // }
    spell.prepared = !spell.prepared
    const res = await sandbox.put(`spells/${id}`, spell)
    console.log('[SPELL PREPARED]', res.data)
    appState.emit('mySpells')
  }
  setActiveSpell(id) {
    const spell = appState.mySpells.find(s => s.id == id)
    appState.activeSpell = spell
  }

  async getMySpells() {
    const res = await sandbox.get('spells')
    console.log('[SANDBOX SPELLS]', res.data);
    appState.mySpells = res.data.map(s => new Spell(s))
    console.log(appState.mySpells)
  }
  async addSpell() {
    const spell = appState.activeSpell
    const res = await sandbox.post('spells', spell)
    console.log('[Added Spell to Sandbox]', res.data)
    // TODO add to my spells
    appState.mySpells.push(new Spell(res.data))
    appState.emit('mySpells')
  }

}

export const sandboxSpellsService = new SandboxSpellsService()