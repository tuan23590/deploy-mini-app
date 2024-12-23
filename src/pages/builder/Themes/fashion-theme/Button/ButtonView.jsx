import styled from "styled-components";

function ButtonView({ store: { useStore } }) {
  const [storeLocal] = useStore();

  return (
    <ButtonViewRender>
      <span>{storeLocal.btn}</span>
    </ButtonViewRender>
  );
}

const ButtonViewRender = styled.div`
`;

export default ButtonView;
