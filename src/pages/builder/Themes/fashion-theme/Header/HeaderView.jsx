import HeaderView1 from '@/pages/builder/Themes/fashion-theme/Header/Header1/HeaderView.jsx';
import HeaderView2 from '@/pages/builder/Themes/fashion-theme/Header/Header2/HeaderView.jsx';

function HeaderView({showBack, pageTitle, store: {useStore}}) {
  const [storeLocal] = useStore();

  return (
    <div className="header">
      { storeLocal.type === 'header1' && <HeaderView1 useStore={useStore} showBack={showBack} pageTitle={pageTitle}/> }
      { storeLocal.type === 'header2' && <HeaderView2 useStore={useStore} showBack={showBack} pageTitle={pageTitle}/> }
    </div>
  )
}

export default HeaderView;