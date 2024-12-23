import { BackIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import headerLogo from "@/pages/builder/Themes/fashion-theme/Header/header-logo.svg";
function HeaderView({ useStore,showBack,pageTitle }) {
  const [storeLocal] = useStore();

  if (!showBack)
    return (
      <div className="h-14 w-full flex items-center px-4 py-2 bg-background">
        <img
          src={headerLogo}
          alt="logo"
          className="max-h-full flex-none"
        />
      </div>
    );

  return (
    <div className="h-12 w-full flex items-center pl-2 pr-[106px] py-2 bg-background">
      <div className="p-2 cursor-pointer">
        <BackIcon />
      </div>
      <div className="text-xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap">
        {pageTitle}
      </div>
    </div>
  );
}

export default HeaderView;
