function HeaderEdit({store: {useStore}}) {
  const [storeLocal, setStoreLocal] = useStore();

  return (
    <div>
      {/* <Select
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
      {storeLocal.type === 'header2' && <HeaderEdit2 useStore={useStore}/>} */}
      edit header
    </div>
  )
}

export default HeaderEdit;