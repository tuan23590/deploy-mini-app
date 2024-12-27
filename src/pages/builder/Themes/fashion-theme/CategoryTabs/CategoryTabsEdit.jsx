
function CategoryTabsEdit({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <input
        label="Sửa nút"
        value={storeLocal.btn}
        onChange={(val) => setStoreLocal((s) => ({ ...s, btn: val }))}
        autoComplete="off"
      />
    </div>
  )
}

export default CategoryTabsEdit;