import React, { createRef } from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormItem,
  Input,
  Button,
  Div,
  ButtonGroup,
  SimpleCell,
  IconButton,
} from "@vkontakte/vkui";

import {
    Icon28RemoveCircleOutline,
  } from "@vkontakte/icons";

import { useSelector, useDispatch } from "react-redux";
import { addLocation, removeLocation } from "../store/reducers/locationsReducer";

const CreateLocations = ({ id, go }) => {
  const newLocation = createRef();
  const dispatch = useDispatch();
  const locationsList = useSelector((state) => state.locations);

  const createLocation = () => {
    dispatch(addLocation(newLocation.current.value));
    newLocation.current.value = "";
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Добавить локацию
      </PanelHeader>
      <Group>
        <Div>
          <FormItem top="Введите название локации">
            <Input type="text" getRef={newLocation} />
          </FormItem>
          <ButtonGroup style={{ display: 'flex', justifyContent: 'center'}}>
            <Button style={{width:'300px'}} mode="outline" onClick={createLocation}>
              Добавить
            </Button>
          </ButtonGroup>
        </Div>
        <Div>
          {Object.keys(locationsList)?.map((locationId) => (
            <SimpleCell
            key={locationId}
              after={
                <IconButton
                  onClick={() => dispatch(removeLocation(locationId))}
                >
                  <Icon28RemoveCircleOutline />
                </IconButton>
              }
            >
              {locationsList[locationId]}
            </SimpleCell>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};

export default CreateLocations;