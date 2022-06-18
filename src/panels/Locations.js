import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack, List } from '@vkontakte/vkui';
import { LOCATIONS } from '../static';

const Locations = ({ id, go }) => (
    <Panel id={id}>
        <PanelHeader  left={<PanelHeaderBack onClick={go} data-to="home" />}>
             Локации
        </PanelHeader>
        <Group>
            <List>
                {LOCATIONS && Object.keys(LOCATIONS).map(loc => {
                    return (
                        <Cell expandable key={loc}>
                            {LOCATIONS[loc]}
                        </Cell>
                    )
                })}
            </List>
        </Group>
    </Panel>
);

Locations.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Locations;
