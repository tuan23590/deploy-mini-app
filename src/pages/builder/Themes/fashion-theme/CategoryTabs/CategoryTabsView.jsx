import Tabs from "@/pages/builder/Themes/fashion-theme/components/Tabs";
import { produce } from "immer";
import { useEffect } from "react";

function CategoryTabsView({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();
  const [selectedIndex, setSelectedIndex] = useStore.selectedIndex();
  const { tabs } = storeLocal;

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
