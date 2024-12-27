import {Select} from '@shopify/polaris';
import {produce} from 'immer';
import HeaderEdit1 from '@/pages/builder/Themes/coffee-theme/Header/Header1/HeaderEdit.jsx';
import HeaderEdit2 from '@/pages/builder/Themes/coffee-theme/Header/Header2/HeaderEdit.jsx';

function HeaderEdit({store: {useStore}}) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <Select
        label="Chọn loại tiêu đề"
        options={[
          {label: 'Tiêu đề 1', value: 'header1'},
          {label: 'Tiêu đề 2', value: 'header2'},
        ]}
        value={storeLocal.type}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.type = val;
        }))}
      />
      {storeLocal.type === 'header1' && <HeaderEdit1 useStore={useStore}/>}
      {storeLocal.type === 'header2' && <HeaderEdit2 useStore={useStore}/>}
    </div>
  )
}

export default HeaderEdit;