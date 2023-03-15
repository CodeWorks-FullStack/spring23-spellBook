import { DnDSpellsController } from "./Controllers/DnDSpellsController.js";
import { SandboxSpellsController } from "./Controllers/SandboxSpellsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  dndSpellsController = new DnDSpellsController()
  sandboxSpellsController = new SandboxSpellsController()
}

window["app"] = new App();
