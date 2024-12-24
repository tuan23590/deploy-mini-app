import React, { Suspense, useEffect, useState } from "react";
import data from "@/data.json";
import getComponent from "@/pages/builder/Themes/getComponent";

export default function ({
  pageSelected = "home-tab",
  pageTitle = "Trang chủ",
}) {
  if (!data[pageSelected]) {
    return <div>Không tìm thấy trang</div>;
  }
  const [componentPageManager, setComponentPageManager] = useState([]);
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        // Lấy dữ liệu theme
        const themeData = await getComponent(data[pageSelected]);

        // Cập nhật danh sách component nếu dữ liệu hợp lệ
        if (themeData) {
          setComponentPageManager(themeData);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    fetchTheme();
  }, [pageSelected]);

  return (
    <div>
      <div className={`containerMainArea fashion-theme ${pageSelected}`}>
        {componentPageManager
          .filter((componentPage) => componentPage.name === "header")
          .map((componentPage) => {
            const ComponentView = componentPage.view;
            const showBack = pageSelected === "home-tab" ? false : true;
            return (
              <ComponentView
                key={`component-view-${componentPage.id}`}
                showBack={showBack}
                pageTitle={pageTitle}
                store={componentPage.store}
              />
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
              <ComponentView
                key={`component-view-${componentPage.id}`}
                store={componentPage.store}
                pageSelected={pageSelected}
              />
            );
          })}
      </div>
    </div>
  );
}
