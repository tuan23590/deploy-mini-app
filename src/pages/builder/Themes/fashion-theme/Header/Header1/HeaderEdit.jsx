import {produce} from 'immer';
import {TextField, Checkbox} from '@shopify/polaris';

function HeaderEdit({useStore}) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <Checkbox
        label="Hiện mô tả"
        checked={storeLocal.header1.isShowDescription}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header1.isShowDescription = val;
        }))}
      />
      <TextField
        label="Sửa tiêu đề"
        value={storeLocal.header1.title}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header1.title = val;
        }))}
        autoComplete="off"
      />
      <TextField
        label="Sửa mô tả"
        value={storeLocal.header1.description}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header1.description = val;
        }))}
        autoComplete="off"
      />
    </div>
  )
}

export default HeaderEdit;