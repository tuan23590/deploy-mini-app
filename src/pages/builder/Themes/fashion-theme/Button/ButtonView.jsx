import { useEffect } from "react";
import styled from "styled-components";

function ButtonView({ store: { useStore } }) {
  const [storeLocal,setStoreLocal] = useStore();

  useEffect(() => {
    setStoreLocal({
      btn: "Button has edited",
    });
  }, []);

  return (
    <ButtonViewRender>
      <span>{storeLocal.btn}</span>
    </ButtonViewRender>
  );
}

const ButtonViewRender = styled.div`
`;

export default ButtonView;
