

function HeaderEdit({useStore}) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      {/* <input
        label="Sửa tiêu đề"
        value={storeLocal.header2.title}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header2.title = val;
        }))}
        autoComplete="off"
      />
      <input
        label="Sửa mô tả"
        value={storeLocal.header2.description}
        onChange={(val) => setStoreLocal(produce((draft) => {
          draft.header2.description = val;
        }))}
        autoComplete="off"
      /> */}
      edit header
    </div>
  )
}

export default HeaderEdit;