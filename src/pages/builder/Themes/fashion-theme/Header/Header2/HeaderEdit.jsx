import {produce} from 'immer';
import {TextField} from '@shopify/polaris';

function HeaderEdit({useStore}) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <TextField
        label="Sửa tiêu đề"
        value={storeLocal.header2.title}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header2.title = val;
        }))}
        autoComplete="off"
      />
      <TextField
        label="Sửa mô tả"
        value={storeLocal.header2.description}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header2.description = val;
        }))}
        autoComplete="off"
      />
    </div>
  )
}

export default HeaderEdit;