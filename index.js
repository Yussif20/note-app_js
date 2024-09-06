import { initListeners, initTaskListeners } from "./scripts/eventListeners";
import { initDataOnStartup } from "./scripts/utils";

initDataOnStartup();
initListeners();
initTaskListeners();

