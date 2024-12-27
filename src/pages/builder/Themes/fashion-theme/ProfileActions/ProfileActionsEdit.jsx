import { TextField } from '@shopify/polaris';

function ProfileActionsEdit({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <TextField
        label="Sửa nút"
        value={storeLocal.btn}
        onChange={(val) => setStoreLocal((s) => ({ ...s, btn: val }))}
        autoComplete="off"
      />
    </div>
  )
}

export default ProfileActionsEdit;