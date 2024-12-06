import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/app.css";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  faUser,
  faKey,
  faHouse,
  faSignOutAlt,
  faCog,
  faScissors,
  faBed,
  faStethoscope,
  faMagnifyingGlass,
  faCalendarDay

} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faKey,
  faHouse,
  faSignOutAlt,
  faCog,
  faScissors,
  faBed,
  faStethoscope,
  faMagnifyingGlass,
  faCalendarDay
);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
