import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ModalRoot, ModalCard, FormItem, Input, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './static/global.css'

import Home from './panels/Home';
import Locations from './panels/Locations';
import Game from './panels/Game';
import CreateLocations from './panels/createLocations';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [activeModal, setActiveModal] = useState('');
	const [location, setLocation] = useState('');
	const [timer, setTimer] = useState('');
	const [timerId, setTimerId] = useState('');
	const [flashLightIsAvailable, setFlasLightIsAvailable] = useState(false);
	const [name, setName] = useState('');
	const [activeUser, setActiveUser] = useState(1);
	const [spyIds, setSpyIds] = useState([]);
	const [spyNames, setSpyNames] = useState([]);
	function addMinutes(date, minutes) {
		return new Date(date.getTime() + minutes * 60000);
	}

	function countdownTimer(deadline) {
		const diff = deadline - new Date();
		if (diff <= 0) {
			stopTimer();
			if (flashLightIsAvailable) {
				bridge.send("VKWebAppFlashSetLevel", { level: 1 });
				setTimeout(() => {
					bridge.send("VKWebAppFlashSetLevel", { level: 0 });
				}, 500);
			}
		}
		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
		setTimer(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
	}

	const startTimer = (count) => {
		const deadline = addMinutes(new Date(), 1);

		countdownTimer(deadline);

		setTimerId(setInterval(() => countdownTimer(deadline), 1000));
	}

	const stopTimer = () => {
		setTimer('');
		setName('');
		clearInterval(timerId);
		setActiveModal('spy');
	}

	const closeSpyModal = () => {
		setSpyNames([]);
		setSpyIds([]);
		setActiveModal('');
	}


	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
			if (type === "VKWebAppFlashGetInfoResult") {
				setFlasLightIsAvailable(data.is_available);
				if (data.is_available) {
					bridge.send("VKWebAppFlashSetLevel", { level: 0 });
				}
			}
		});

	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const openLocationModal = (location, user) => {
		setActiveModal('location');
		setLocation(location);
	}

	const saveNameAndClose = (name) => {
		if (name === '') {
			return;
		}

		if (spyIds.includes(activeUser)) {
			spyNames.push(name);
		}

		setActiveModal('');
		setName('');
	}

	const modal = (
		<ModalRoot activeModal={activeModal}>
			<ModalCard
				style={{
					height: '200px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '18px'
				}}
				onClose={() => saveNameAndClose(name)}
				id="location">
				{location}

				<FormItem top="Имя" status={name && name.length > 0 ? "valid" : "error"}>
					<Input type="text" onChange={(e) => setName(e.target.value)} />
				</FormItem>

				<Button stretched mode="secondary" size="m" onClick={() => saveNameAndClose(name)}>
					Сохранить
				</Button>
			</ModalCard>
			<ModalCard
				style={{
					height: '200px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '18px'
				}}
				onClose={() => closeSpyModal()}
				id="spy">
				Шпион - {spyNames.join(',')}
			</ModalCard>
		</ModalRoot>)

	return (
		<Provider store={store}>
			<ConfigProvider scheme={scheme}>
				<AdaptivityProvider>
					<AppRoot>
						<SplitLayout modal={modal}>
							<SplitCol>
								<View activePanel={activePanel}>
									<Locations id='locations' go={go} />
									<Home id='home' go={go} />
									<Game
										id='game'
										go={go}
										openLocationModal={openLocationModal}
										timer={timer}
										startTimer={startTimer}
										stopTimer={stopTimer}
										setActiveUser={setActiveUser}
										setSpyIds={setSpyIds} />
									<CreateLocations id="createLocations" go={go} />
								</View>
							</SplitCol>
						</SplitLayout>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		</Provider>
	);
}

export default App;
