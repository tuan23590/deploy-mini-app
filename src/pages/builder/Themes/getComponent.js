import fashionTheme from "@/pages/builder/Themes/fashion-theme/theme.json";
import { lazy } from "react";
import createStore from "teaful";
import { v4 as uuidv4 } from "uuid";

const lazyWithPreload = (importFunc) => {
  const Component = lazy(importFunc);
  Component.preload = importFunc; // Dùng cho preload nếu cần
  return Component;
};

export async function getComponent(initData) {
  try {
    // Tạo cấu trúc dữ liệu ban đầu từ `initData` có dạng [{name: {data},{name: {data}]
    const dataComponent = initData.reduce((acc, component) => {
      acc[component.name] = component.data;
      return acc;
    }, {});

    const postion = initData.map((component) => component.name);

    // Lọc và sắp xếp các component và theo vị trí của nó trong theme
    const listComponent = fashionTheme
      .filter((component) => postion.includes(component.name))
      .sort((a, b) => postion.indexOf(a.name) - postion.indexOf(b.name));
      
    //Lấy tất cả các module (view/edit) theo theme
    const modules = import.meta.glob("./fashion-theme/**/*.{jsx,js}");

    const componentsByTheme = {};
    listComponent.forEach((component) => {
      const view = component.view.replace("@/pages/builder/Themes/", "./");
        componentsByTheme[component.view] = lazyWithPreload(() => modules[view]());
    });

    // Import style của theme và chờ hoàn thành
    const themeStyle = import.meta.glob("./fashion-theme/*.scss");
    await Promise.all(Object.values(themeStyle).map((style) => style()));

    // Tạo danh sách đầy đủ với view, edit, id, và store
    const fullComponentList = await Promise.all(
      listComponent.map(async (component) => {
        const view = componentsByTheme[component.view];
        const edit = componentsByTheme[component.edit];
        const id = uuidv4();
        const initData = dataComponent[component.name];
        const store = createStore(initData, (store) => {
          component.dataStore = store.store;
        });

        return { ...component, view, edit, id, store };
      })
    );

    return fullComponentList; // Trả về danh sách đã xử lý
  } catch (error) {
    console.error("Error in getComponent:", error);
    throw error; // Quăng lỗi nếu có vấn đề
  }
}