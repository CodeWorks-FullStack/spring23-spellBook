import { appState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";

// @ts-ignore
const dnd = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/',
  timeout: 5000
})


class DnDSpellsService {
  async getAllSpells() {
    const res = await dnd.get('spells')
    console.log('[DND SPELLS]', res.data); // res.data is always good cause res.data comes from axios
    appState.dndSpells = res.data.results // no map here cause I am not turning the tiny spell references into the full spell class
    console.log(appState.dndSpells)
  }
  async getOneSpell(index) {
    const res = await dnd.get(`spells/${index}`)
    console.log('[ONE DND SPELL]', res.data)
    appState.activeSpell = new Spell(res.data)
  }

}

export const dndSpellsService = new DnDSpellsService()