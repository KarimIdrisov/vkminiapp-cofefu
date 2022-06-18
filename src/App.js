import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ModalRoot, ModalCard } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './static/global.css'

import Home from './panels/Home';
import Locations from './panels/Locations';
import Game from './panels/Game';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [activeModal, setActiveModal] = useState('');
	const [location, setLocation] = useState('');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const openLocationModal = (location) => {
		setActiveModal('location');
		setLocation(location);
	}

	const modal = (
		<ModalRoot activeModal={activeModal}>
		  <ModalCard onClose={() => setActiveModal('')} id="location">{location}</ModalCard>
		</ModalRoot>)

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout modal={modal}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Locations id='locations' go={go} />
								<Home id='home'  go={go} />
								<Game id='game' go={go} openLocationModal={openLocationModal}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
