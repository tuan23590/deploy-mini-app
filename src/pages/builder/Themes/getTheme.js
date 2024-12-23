import fashionTheme from "@/pages/builder/Themes/fashion-theme/theme.json";
import { lazy } from "react";
import createStore from "teaful";
import { v4 as uuidv4 } from "uuid";

function isValidJson(json) {
  try {
    // Kiểm tra các key chính
    const requiredMainKeys = ["name", "style", "pages", "description"];
    for (const key of requiredMainKeys) {
      if (!json.hasOwnProperty(key)) return false;
    }

    // Kiểm tra kiểu dữ liệu của từng key chính
    if (typeof json.name !== "string") return false;
    if (typeof json.style !== "string") return false;
    if (
      typeof json.pages !== "object" ||
      json.pages === null ||
      Array.isArray(json.pages)
    )
      return false;
    if (
      typeof json.description !== "object" ||
      json.description === null ||
      Array.isArray(json.description)
    )
      return false;

    // Kiểm tra từng trang trong "pages"
    for (const [page, components] of Object.entries(json.pages)) {
      if (!Array.isArray(components)) return false;
      for (const component of components) {
        // Kiểm tra từng component bên trong page
        const requiredComponentKeys = ["name", "view", "edit", "store"];
        for (const key of requiredComponentKeys) {
          if (
            !component.hasOwnProperty(key) ||
            typeof component[key] !== "string"
          )
            return false;
        }
      }
    }

    // Kiểm tra "description" có đầy đủ key tương ứng với "pages"
    for (const page of Object.keys(json.pages)) {
      if (
        !json.description.hasOwnProperty(page) ||
        typeof json.description[page] !== "string"
      )
        return false;
    }

    // Kiểm tra "description" có đầy đủ key tương ứng với các component
    const componentNames = new Set();
    for (const components of Object.values(json.pages)) {
      for (const component of components) {
        componentNames.add(component.name);
      }
    }

    for (const componentName of componentNames) {
      if (
        !json.description.hasOwnProperty(componentName) ||
        typeof json.description[componentName] !== "string"
      ) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}

function saveJSONTheme(theme, page, component, data) {
  // const jsonDataTheme = JSON.parse(localStorage.getItem(theme) || "{}");
  // const item = jsonDataTheme[page].find((item) => item.name === component);
  // item.data = data;
  // localStorage.setItem(theme, JSON.stringify(jsonDataTheme));
}

function saveComponentTheme(name, data) {
  const jsonDataTheme = JSON.parse(localStorage.getItem(name) || "{}");
  for (const key in data) {
    const newData = data[key].map((item) => {
      return { ...item, data: {} };
    });
    jsonDataTheme[key] = newData;
  }
  localStorage.setItem(name, JSON.stringify(jsonDataTheme));
}

async function getTheme(theme) {
  switch (theme) {
    case "fashion-theme":
      try {
        const isValidJsonCoffee = isValidJson(fashionTheme);
        if (!isValidJsonCoffee) {
          console.error("fashion-theme is not valid");
          return null;
        }

        const modules = import.meta.glob("./fashion-theme/**/*.{jsx,js}");
        
        const componentsByTheme = {};
        for (const path in modules) {
          componentsByTheme[path.replace("./", "@/pages/builder/Themes/")] =
            await lazy(() => modules[path]());
        }

        console.log("componentsByTheme", componentsByTheme);

        // Load store
        const storeModules = import.meta.glob("./fashion-theme/**/store.json");

        // Load theme
        const themeStyle = import.meta.glob("./fashion-theme/**/style.scss");
        await Object.values(themeStyle)[0]();

        const pages = fashionTheme.pages;
        for (const page in pages) {
          const components = pages[page];
          //   saveComponentTheme('fashion-theme', { [page]: components });
          for (const component of components) {
            component.view = componentsByTheme[component.view];
            component.edit = componentsByTheme[component.edit];

            const stateStore = await storeModules[
              component.store.replace("@/pages/builder/Themes", ".")
            ]();
            component.id = uuidv4();
            //     // Khởi tạo cùng theme
            component.store = createStore(stateStore.default, (store) => {
              component.dataStore = store.store;
              saveJSONTheme("fashion-theme", page, component.name, store.store);
            });
          }
        }

        const sections = fashionTheme.sections;
        for (const section in sections) {
          const component = sections[section];
          component.view = componentsByTheme[component.view];
          component.edit = componentsByTheme[component.edit];
          const stateStore = await storeModules[
            component.store.replace("@/pages/builder/Themes", ".")
          ]();
          component.id = () => uuidv4();
          // Store và ID cần được khởi tạo mỗi lần thêm section mới để tránh trùng lặp store và id
          component.store = (section, sectionID) =>
            createStore(stateStore.default, (store) => {
              section.dataStore = store.store;
              // saveJSONTheme('fashion-theme', sectionID, store.store);
            });
        }
        return fashionTheme;
      } catch (error) {
        console.error(error);
      }
    default:
      return null;
  }
}

export default getTheme;
