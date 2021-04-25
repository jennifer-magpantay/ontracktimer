import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../components/challenge/challenges.json';

type ApplicationProviderProps = {
    children: ReactNode,
    level: number,
    rounds: number,
    pointsProgress: number,
    levelGoal: number,
    totalScore: number
}

type ChallengesList = {
    title: string,
    description: string
}

type ApplicationData = {
    level: number,
    totalScore: number,
    pointsProgress: number,
    levelGoal: number,
    rounds: number,
    challengeMessage: ChallengesList,
    updateCountersAndProgress: () => void,
    displayChallenge: () => void,
}

export const ApplicationContext = createContext({} as ApplicationData);

export function ApplicationProvider({ children, ...rest }: ApplicationProviderProps) {
    // add state for all info que want to update
    const [pointsProgress, setPointsProgress] = useState(rest.pointsProgress ?? 0);
    const [totalScore, setTotalScore] = useState(rest.totalScore ?? 0);
    const [rounds, setRounds] = useState(rest.rounds ?? 0);
    const [level, setLevel] = useState(rest.level ?? 1)
    const [levelGoal, setLevelGoal] = useState(rest.levelGoal ?? 20);
    const [challengeMessage, setChallengeMessage] = useState(null);

    // create functions to update/control these states 
    function updateCountersAndProgress() {
        // update points and total score
        // lets consider 5 points for each round completed
        const points = 5;
        setPointsProgress(pointsProgress + points);
        setTotalScore(totalScore + points);

        // update rounds
        setRounds(rounds + 1);

        // updating level & goal
        // because the points are updated just when the next cycle is run, the statement below does not work 'on time'
        // (pointsProgress == levelGoal) ? setLevel(level + 1) : "";
        // then, if the progress + points are == to the goal, then:
        if ((pointsProgress + points) == levelGoal) {
            // update the level
            setLevel(level + 1);
            // update the goal
            setLevelGoal(levelGoal + 10);
            // reset the progress to 0
            setPointsProgress(0);           
        }
    }

    // add a function that will choose randomly the challenges
    // this function has to be imported by the Countdown.tsx and set inside the setTimeOut() - once the timer == 0, then, activate this function
    // also, the result of this function has to be imported by Challenges.tsx, where the content has to be displayed
    function displayChallenge() {
        const randomChallenge = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallenge];
        // then, seu the message         
        setChallengeMessage(challenge);
    }

    // setting updates in cookies
    useEffect(() => {
        // because cookies just accept strings we need to convert each state to string => state.toString or String(state)
        Cookies.set('level', String(level));
        Cookies.set('rounds', String(rounds));
        Cookies.set('pointsProgress', String(pointsProgress));
        Cookies.set('levelGoal', String(levelGoal));
        Cookies.set('totalScore', String(totalScore));
    }, [level, rounds, pointsProgress, levelGoal, totalScore])

    return (
        <ApplicationContext.Provider value={{ level, totalScore, pointsProgress, rounds, levelGoal, challengeMessage, updateCountersAndProgress, displayChallenge }}>
            {children}            
        </ApplicationContext.Provider>
    );
}
