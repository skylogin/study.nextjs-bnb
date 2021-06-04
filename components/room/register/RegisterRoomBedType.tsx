import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import palette from "../../../styles/palette";

import Button from "../../common/Button";
import Selector from "../../common/Selector";

import Counter from "../../common/Counter";

import { BedType } from "../../../types/room";
import { bedTypes } from "../../../lib/staticData";

import { registerRoomActions } from "../../../store/registerRoom";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child{
    border-bottom: 1px solid ${palette.gray_dd};
  }
  
  .register-room-bed-type-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom-texts{
    margin-bottom: 28px;
  }
  .register-room-bed-type-bedroom{
    font-size: 19px;
    color: ${palette.gray_48}
  }
  .register-room-bed-type-selector-wrapper{
    /* width: 320px; */
  }
  /* .register-room-bed-type-Counters{
    width: 320px;
    margin-top: 28px;
  }  */
  .register-room-bed-type-counter{
    /* width: 290px; */
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts{
    font-size: 19px;
    color: ${palette.gray_76};
    width: 80%;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  const [opened, setOpened] = useState(false);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions);

  const dispatch = useDispatch();
  
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [bedroom]);

  const toggleOpened = () => setOpened(!opened);

  const onChangeBedTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id, 
        type, 
        count: value,
      })
    );
  }


  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개<br />
            {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && "완료"}
          {!opened && (totalBedsCount === 0? "침대 추가하기": "침대 수정하기")}
        </Button>
      </div>
        {opened && (
          <div className="register-room-bed-type-selector-wrapper">
            {activedBedOptions.map((type) => (
              <div className="register-room-bed-type-counter" key={type}>
                <Counter
                  label={type}
                  value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                  key={type}
                  onChange={(value) => {
                    onChangeBedTypeCount(value, type);
                  }}
                />
              </div>
            ))}
            <Selector
              type="register"
              value="다른 침대 추가"
              // defaultValue="다른 침대 추가"
              disabledOptions={["다른 침대 추가"]}
              options={lastBedOptions}
              useValidation={false}
              onChange={(e) =>
                setActivedBedOptions([
                  ...activedBedOptions,
                  e.target.value as BedType,
                ])
              }
            />
          </div>
        )}
    </Container>
  );
};

export default RegisterRoomBedTypes;