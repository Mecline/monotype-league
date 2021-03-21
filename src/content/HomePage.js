import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { participants } from '../data/participants.js';
import './theme.css';
import MatchTable from './MatchTable';
import dayjs from 'dayjs';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            compList: participants,
            week: 0
        };
    }

    weekSet(weekId) {
        this.setState({ week: weekId });
    }

    weekForward() {
        if (this.state.week <= 13) {
            this.setState({ week: this.state.week + 1 })
        }
        else (
            this.setState({ week: 0 })
        )
    }

    weekBack() {
        if (this.state.week >= 1) {
            this.setState({ week: this.state.week - 1 })
        }
        else (
            this.setState({ week: 14 })
        )
    }

    generateWeekList(numWeeks, startDate, rotationPeriod) {
        let weekList = [];
        for (let i = 0; i < numWeeks; i++) {
            weekList.push({
                id: i,
                start: i === 0 ? startDate : dayjs(startDate).add(rotationPeriod * i, 'day'),
                end: dayjs(startDate).add((rotationPeriod * (i + 1)) - 1, 'day')
            })
        }
        return weekList;
    }

    getCurrentWeekId(weekList) {
        let currentWeekId = 1;
        let today = new Date();
        weekList.map((week) => {
            if (dayjs(today).isBetween(week.start, week.end)) {
                currentWeekId = week.id;
                this.weekSet(currentWeekId);
            }
            return currentWeekId;
        })
        return currentWeekId;
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
        var isBetween = require('dayjs/plugin/isBetween')
        dayjs.extend(isBetween)
        let weekList = this.generateWeekList(15, new Date(2021, 2, 27), 7);
        let compList = this.state.compList;
        let rotatedCompList = this.matchSet(compList, this.state.week);
        let orderedList = [];

        return (
            <div className="homePage">
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <Typography>TODAY: {dayjs(new Date()).format('MMMM D YYYY')}</Typography>
                    <Typography>Week Of: {dayjs(weekList[this.state.week].start).format('MMMM D YYYY')} - {dayjs(weekList[this.state.week].end).format('MMMM D YYYY')} </Typography>
                    <Button style={{ marginRight: '15px', backgroundColor: 'rgb(108, 122, 245)', color: 'white' }} variant="contained" onClick={() => this.weekForward()}>WEEK FORWARD</Button>
                    <Button style={{ marginRight: '15px', backgroundColor: 'rgb(108, 122, 245)', color: 'white' }} variant="contained" onClick={() => this.weekBack()}>WEEK BACK</Button>
                    <Button style={{ marginRight: '15px', backgroundColor: 'rgb(108, 122, 245)', color: 'white' }} variant="contained" onClick={() => this.getCurrentWeekId(weekList)}>SKIP TO CURRENT</Button>
                </div>
                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '24px' }}>Matches</Typography>

                    {rotatedCompList.map((id) => {
                        orderedList = orderedList.concat(compList.filter(data => data.id === id));
                        return null;
                    })}

                    <MatchTable orderedList={orderedList} />

                    <Typography style={{ paddingTop: '15px' }}>To find your match for the week, find your name and then your opponent will be directly below you.
                         "Skip to Current" can be used to take you to the current week of your match.</Typography>

                </div>
            </div >
        )
    }
}

export default HomePage;