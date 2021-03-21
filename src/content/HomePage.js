import { Button, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import participants from '../data/participants.json';
import './theme.css';
import MatchTable from './MatchTable';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            compList: participants.participants,
            week: 0
        };
    }

    weekForward() {
        if (this.state.week <= 13) {
            this.setState({ week: this.state.week + 1 })
        }
        else (
            this.setState({ week: 0 })
        )
    }

    rotate(participant, rotations) {
        let numRotations = rotations;
        let rotatedParticipant = participant.id;
        while (numRotations !== 0) {
            if (rotatedParticipant === 0) {
                break;
            }
            else if (rotatedParticipant <= 6) {
                rotatedParticipant = rotatedParticipant + 1;
                numRotations = numRotations - 1;
            }
            else if (rotatedParticipant === 7) {
                rotatedParticipant = 15;
                numRotations = numRotations - 1;
            }
            else if (rotatedParticipant === 8) {
                rotatedParticipant = 1;
                numRotations = numRotations - 1;
            }
            else if (rotatedParticipant <= 15) {
                rotatedParticipant = rotatedParticipant - 1;
                numRotations = numRotations - 1;
            }
        }
        return rotatedParticipant;
    }

    matchSet(compList, weekRotation) {
        let rotations = weekRotation;
        let rotatedCompList = [];

        compList.map((participant) => {
            return rotatedCompList.push(this.rotate(participant, rotations));
        })
        return rotatedCompList;
    }

    render() {
        let weekList = [{
            id: 1,
            start: new Date(2021, 2, 26),
            end: new Date(2021, 3, 2)
        }, {
            id: 2,
            start: new Date(2021, 3, 3),
            end: new Date(2021, 3, 9)
        }, {
            id: 3,
            start: new Date(2021, 3, 10),
            end: new Date(2021, 3, 16)
        }, {
            id: 4,
            start: new Date(2021, 3, 17),
            end: new Date(2021, 3, 23)
        }, {
            id: 5,
            start: new Date(2021, 3, 24),
            end: new Date(2021, 3, 30)
        }, {
            id: 6,
            start: new Date(2021, 4, 1),
            end: new Date(2021, 4, 7)
        }, {
            id: 7,
            start: new Date(2021, 4, 8),
            end: new Date(2021, 4, 14)
        }, {
            id: 8,
            start: new Date(2021, 4, 15),
            end: new Date(2021, 4, 21)
        }, {
            id: 9,
            start: new Date(2021, 4, 22),
            end: new Date(2021, 4, 28)
        }, {
            id: 10,
            start: new Date(2021, 4, 29),
            end: new Date(2021, 5, 4)
        }, {
            id: 11,
            start: new Date(2021, 5, 5),
            end: new Date(2021, 5, 11)
        }, {
            id: 12,
            start: new Date(2021, 5, 12),
            end: new Date(2021, 5, 18)
        }, {
            id: 13,
            start: new Date(2021, 5, 19),
            end: new Date(2021, 5, 25)
        }, {
            id: 14,
            start: new Date(2021, 5, 26),
            end: new Date(2021, 6, 2)
        }, {
            id: 15,
            start: new Date(2021, 6, 3),
            end: new Date(2021, 6, 9)
        }
        ];
        let today = new Date();
        let rotatedCompList = this.matchSet(this.state.compList, this.state.week);
        let compList = this.state.compList;
        let orderedList = [];

        return (
            <div className="App-header">
                <div style={{ padding: '10px', textAlign: 'center' }}>

                    <Typography>Week Of: {format(weekList[this.state.week].start, 'MM.dd.yyyy')} - {format(weekList[this.state.week].end, 'MM.dd.yyyy')}</Typography>
                    <Button style={{ color: 'white' }} onClick={() => this.weekForward()}>WEEK FORWARD</Button>

                </div>
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <Typography>Matches</Typography>

                    {rotatedCompList.map((id) => {
                        orderedList = orderedList.concat(compList.filter(data => data.id === id));
                    })}

                    <MatchTable orderedList={orderedList} />

                </div>
            </div >
        )
    }
}

export default HomePage;