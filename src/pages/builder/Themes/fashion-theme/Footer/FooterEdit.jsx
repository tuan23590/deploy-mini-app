

function FooterEdit({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      <input
        label="Sửa chữ trang chủ"
        value={storeLocal.home}
        onChange={(val) => setStoreLocal((s) => ({ ...s, home: val }))}
        autoComplete="off"
      />
      <input
        label="Sửa chữ danh mục"
        value={storeLocal.category}
        onChange={(val) => setStoreLocal((s) => ({ ...s, category: val }))}
        autoComplete="off"
      />
      <input
        label="Sửa chữ giỏ hàng"
        value={storeLocal.cart}
        onChange={(val) => setStoreLocal((s) => ({ ...s, cart: val }))}
        autoComplete="off"
      />
      <input
        label="Sửa chữ thành viên"
        value={storeLocal.member}
        onChange={(val) => setStoreLocal((s) => ({ ...s, member: val }))}
        autoComplete="off"
      />
    </div>
  )
}

export default FooterEdit;