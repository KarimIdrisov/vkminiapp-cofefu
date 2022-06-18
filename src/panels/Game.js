import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  FormLayout,
  FormItem,
  Input,
  Button,
  Div,
  Paragraph,
  ButtonGroup,
} from "@vkontakte/vkui";

import { LOCATIONS } from '../static';

const Game = ({ id, go, openLocationModal, startTimer, timer, stopTimer }) => {

  const [countOfPlayers, setCountOfPlayers] = useState(3);
  const changeCountOfPlayers = (evt) => {
    setCountOfPlayers(evt.currentTarget.value);
  }

  const [countOfSpyes, setCountOfSpyes] = useState(1);
  const changeCountOfSpyes = (evt) => {
    setCountOfSpyes(evt.currentTarget.value);
  }

  const [gameStatus, setGameStatus] = useState({
    gameStart: false,
    dealStart: false,
  })
  
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [location, setLocation] = useState("");
  const [spyUsers, setSpyUsers] = useState([]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const dealStart = () => {
    setGameStatus({
        ...gameStatus,
        dealStart: true,
    })
    for (let i = 1; i <= countOfSpyes; i += 1) {
        setSpyUsers(spyUsers.concat([getRandomInt(0, countOfPlayers)]));
    }
    setLocation(
        LOCATIONS[Object.keys(LOCATIONS)[getRandomInt(1, Object.keys(LOCATIONS).length)]]
    );
  }; 

  const startGame = () => {
    startTimer(countOfPlayers);
    setGameStatus({
        gameStart: true,
        dealStart: false,
    })
  };

  const endGame = () => {
    setCurrentPlayer(1);
    setSpyUsers([]);
    setLocation('');
    stopTimer();
    setGameStatus({
        gameStart: false,
        dealStart: false
    })
  }

  const nextPlayer = () => {
    setCurrentPlayer(currentPlayer + 1);
  };

  const getSpyesStatus = () => {
    if (countOfPlayers == 12) {
      return countOfSpyes == 2 ? "valid" : "error";
    } else {
      return countOfSpyes >= 1 && countOfSpyes <= 2 ? "valid" : "error";
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Игра
      </PanelHeader>

      {!gameStatus.dealStart && !gameStatus.gameStart && (
        <Group>
          <Header>Подготовка</Header>
          <FormLayout>
            <FormItem
              top="Количество игроков"
              status={
                countOfPlayers >= 3 && countOfPlayers <= 12 ? "valid" : "error"
              }
            >
              <Input
                type="number"
                name="countOfPlayers"
                value={countOfPlayers}
                onChange={changeCountOfPlayers}
              />
            </FormItem>
            <FormItem
              top="Количество шпионов"
              status={getSpyesStatus()}
            >
              <Input
                type="number"
                name="countOfSpyes"
                value={countOfSpyes}
                onChange={changeCountOfSpyes}
              />
            </FormItem>
            <FormItem>
              <Button size="l" stretched onClick={dealStart}>
                Начать раздачу
              </Button>
            </FormItem>
          </FormLayout>
        </Group>
      )}
      {gameStatus.dealStart && (
        <Div style={{ textAlign: 'center'}}>
          <Paragraph  style={{display: 'block', marginBottom: 10}}>
            Игрок {currentPlayer}, ознакомтесь с локацией.
          </Paragraph>
          <ButtonGroup stretched mode="vertical">
            <Button
              stretched
              mode="secondary"
              size="m"
              onClick={() => openLocationModal(spyUsers.includes(currentPlayer)
                ? "Вы шпион"
                : location)
              }
            >
              Показать локацию
            </Button>
            {currentPlayer < countOfPlayers && (
              <Button
                stretched
                mode="secondary"
                size="m"
                onClick={nextPlayer}
              >
                Следующий игрок
              </Button>
            )}
            {currentPlayer == countOfPlayers && (
              <Button stretched mode="secondary" size="m" onClick={startGame}>
                Начать игру
              </Button>
            )}  
          </ButtonGroup>
        </Div>
      )}
      {gameStatus.gameStart && (
        <Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
          <Paragraph>Игра началась!</Paragraph>
          <Paragraph style={{fontSize: '20px', margin: '10px'}}>{timer}</Paragraph>
          <Button stretched mode="secondary" size="m" onClick={endGame}>
                Закончить игру
          </Button>
        </Div>
      )}
    </Panel>
  );
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Game;