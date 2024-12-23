import React, { Suspense, useEffect, useState } from "react";
import data from "@/data.json";
import getComponent from "@/pages/builder/Themes/getComponent";

export default function ProductDetail() {
  const pageSelected = "product-tab";
  const [themeJSON, setThemeJSON] = useState(null);
  const [componentPageManager, setComponentPageManager] = useState([]);
  const homeData = data[pageSelected];
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const themeData = await getComponent(homeData);
        setThemeJSON(themeData); // Chỉ setState sau khi có dữ liệu
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    if (themeJSON && pageSelected) {
      setComponentPageManager(themeJSON.pages[pageSelected]);
    }
  }, [themeJSON, pageSelected]);

  if (!themeJSON) return <>Loading...</>;

  return (
    <div>
      <div className={`containerMainArea fashion-theme ${pageSelected}`}>
        {componentPageManager
          .filter((componentPage) => componentPage.name === "header")
          .map((componentPage) => {
            const ComponentView = componentPage.view;
            const showBack = pageSelected === "home-tab" ? false : true;
            const pageTitle = themeJSON.description[pageSelected];
            return (
              <Suspense
                fallback={<>Loading...</>}
                key={`component-view-${componentPage.id}`}
              >
                <ComponentView
                  showBack={showBack}
                  pageTitle={pageTitle}
                  store={componentPage.store}
                />
              </Suspense>
            );
          })}
        <div className="content">
          {componentPageManager.map((componentPage) => {
            const ComponentView = componentPage.view;
            if (
              componentPage.name === "header" ||
              componentPage.name === "footer"
            )
              return null;
            else
              return (
                <Suspense
                  fallback={<>Loading...</>}
                  key={`component-view-${componentPage.id}`}
                >
                  <ComponentView
                    store={componentPage.store}
                    pageSelected={pageSelected}
                  />
                </Suspense>
              );
          })}
        </div>
        {componentPageManager
          .filter((componentPage) => componentPage.name === "footer")
          .map((componentPage) => {
            const ComponentView = componentPage.view;
            return (
              <Suspense
                fallback={<>Loading...</>}
                key={`component-view-${componentPage.id}`}
              >
                <ComponentView
                  store={componentPage.store}
                  pageSelected={pageSelected}
                />
              </Suspense>
            );
          })}
      </div>
    </div>
  );
}
