import styled from 'styled-components';
import { Icon } from 'zmp-ui';

function HeaderView({ useStore }) {
  const [storeLocal] = useStore();

  return (
    <HeaderViewStyled>
      <div className="name">
        <img src='/fashion-theme/logo.jpg' />

        <div className='description'>
          <div className='description-title'>{ storeLocal.header2.title }</div>
          <div className='description-sub'>{ storeLocal.header2.description }</div>
        </div>
      </div>

      <div className="operator">
        <Icon icon='zi-more-horiz-solid' />
        <span>|</span>
        <Icon icon='zi-close' />
      </div>
    </HeaderViewStyled>
  )
}

const HeaderViewStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;

    .operator {
        display: flex;
        gap: 10px;
        border: 1px solid #F3F3F3;
        border-radius: 20px;
        padding: 2px 4px;
        box-sizing: border-box;
        height: 30px;

        .zaui-icon {
            cursor: pointer;
        }
    }

    .name {
        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }

        display: flex;
        align-items: center;
        gap: 10px;

        .description {
            display: flex;
            flex-direction: column;

            .description-title {
                font-weight: 600;
            }

            .description-sub {
                color: #BDBDBD;
            }
        }
    }

`;

export default HeaderView;