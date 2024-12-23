import fashionTheme from "@/pages/builder/Themes/fashion-theme/theme.json";
import { lazy } from "react";
import createStore from "teaful";
import { v4 as uuidv4 } from "uuid";

async function getComponent(homeData) {
  try {

    const dataComponent = homeData.reduce((acc, component) => {
      acc[component.name] = component.data;
      return acc;
    }, {});

    const modules = import.meta.glob("./fashion-theme/**/*.{jsx,js}");

    const componentsByTheme = {};
    for (const path in modules) {
        componentsByTheme[path.replace("./", "@/pages/builder/Themes/")] =
          await lazy(() => modules[path]());
    }

    // Load theme
    const themeStyle = import.meta.glob("./fashion-theme/**/style.scss");
    await Object.values(themeStyle)[0]();

    const pages = fashionTheme.pages;
    for (const page in pages) {
      const components = pages[page];
      for (const component of components) {
        component.view = componentsByTheme[component.view];
        component.edit = componentsByTheme[component.edit];
        component.id = uuidv4();
        const initData = dataComponent[component.name];
        component.store = createStore(initData, (store) => {
          component.dataStore = store.store;
        });
      }
    }

    return fashionTheme;
  } catch (error) {
    console.error(error);
  }
}

export default getComponent;
