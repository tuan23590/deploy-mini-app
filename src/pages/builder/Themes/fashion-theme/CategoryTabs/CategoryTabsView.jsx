import Tabs from "@/pages/builder/Themes/fashion-theme/components/Tabs";
import { getTabsTemplate } from "@/pages/builder/Themes/fashion-theme/utils/api";
import { useEffect, useState } from "react";

function CategoryTabsView({ store: { useStore } }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs, setTabs] = useState([]);
  
  useEffect(() => {
    const fetchCategoriesAndTabs = async () => {
      const tabsData = await getTabsTemplate();
      setTabs(tabsData);
    };
    fetchCategoriesAndTabs();
  }, []);

  if (!tabs) return <div>Loading...</div>;

  return (
    <div className="bg-background mt-2">
      <Tabs
        items={tabs}
        value={tabs[selectedIndex]}
        onChange={(tab) => setSelectedIndex(tabs.indexOf(tab))}
        renderLabel={(item) => item}
      />
    </div>
  );
}

export default CategoryTabsView;
