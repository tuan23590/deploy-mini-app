import React, { Suspense, useEffect, useState } from "react";
import data from "@/data.json";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { getComponent } from "@/pages/builder/Themes/getComponent";

export default function ({
  pageSelected = "home-tab",
  pageTitle = "Trang chủ",
}) {
  const [componentPageManager, setComponentPageManager] = useState([]);
  const [headerComponent, setHeaderComponent] = useState(null);
  const [footerComponent, setFooterComponent] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        // Lấy dữ liệu theme
        const headerAndFooterComponent = !headerComponent && !footerComponent ? Object.values(data["layout"]): []
        const themeData = await getComponent([
          ...data["pages"].find((page) => page.name === pageSelected).data,
          ...headerAndFooterComponent,
        ]);

        // Cập nhật danh sách component nếu dữ liệu hợp lệ
        if (themeData) {
          setComponentPageManager(themeData);

          // Lưu Header và Footer nếu chưa có
          if (!headerComponent) {
            const header = themeData.find(
              (componentPage) => componentPage.name === "header"
            );
            if (header) setHeaderComponent(header);
          }

          if (!footerComponent) {
            const footer = themeData.find(
              (componentPage) => componentPage.name === "footer"
            );
            if (footer) setFooterComponent(footer);
          }
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
        {/* Header */}
        {headerComponent && (
          <Suspense
            fallback={<>Loading...</>}
            key={`component-view-${headerComponent.id}`}
          >
            <headerComponent.view
              showBack={pageSelected === "home-tab" ? false : true}
              pageTitle={pageTitle}
              store={headerComponent.store}
            />
          </Suspense>
        )}

        {/* Content */}
        <div className="content">
          {componentPageManager
            .filter(
              (componentPage) =>
                componentPage.name !== "header" &&
                componentPage.name !== "footer"
            )
            .map((componentPage) => {
              const ComponentView = componentPage.view;
              return (
                <Suspense
                  fallback={<>Loading...</>}
                  key={`component-view-${componentPage.id}`}
                >
                  <ComponentView
                    store={componentPage.store}
                  />
                </Suspense>
              );
            })}
        </div>

        {/* Footer */}
        {footerComponent && (
          <Suspense
            fallback={<>Loading...</>}
            key={`component-view-${footerComponent.id}`}
          >
            <footerComponent.view
              store={footerComponent.store}
            />
          </Suspense>
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
}
