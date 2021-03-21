import { Typography } from '@material-ui/core';
import React from 'react';
import './theme.css';
import { participants } from '../data/participants.js';
import defaultBadge from '../data/YEET.png';

class TeamPage extends React.Component {
    constructor() {
        super();
        this.state = {
            compList: participants,
        };
    }

    getPlayerBadge(player) {
        let gymBadge = player.badge.default ? player.badge.default : defaultBadge;
        return <img src={gymBadge} alt={player.type} height={50} width={50} />
    }

    makePlayerProfile(player) {
        return (
            <div style={{ display: 'inline-block' }}>
                {this.getPlayerBadge(player)}
                <Typography style={{ paddingLeft: '15px', display: 'inline-block' }}>{player.name} - <Typography style={{ display: 'inline-block', color: player.color }}>{player.type}</Typography></Typography>
            </div>
        )
    }

    render() {
        let compList = this.state.compList;

        return (
            <div className="teamPage">
                <Typography style={{ fontWeight: 'bold', fontSize: '40px' }}>TEAMS COMING SOON</Typography>

                {compList.map((player) => {
                    return (
                        <div key={player.id} style={{ paddingTop: '30px' }}>
                            {this.makePlayerProfile(player)}
                        </div>
                    );
                })}
            </div >
        )
    }
}

export default TeamPage;