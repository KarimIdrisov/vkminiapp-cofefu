import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>Spy</PanelHeader>
		<Group>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="game">
					Начать игру
				</Button>
			</Div>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="locations">
					Посмотреть локации
				</Button>
			</Div>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go}
					data-to="createLocations">
					Добавить локацию
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
