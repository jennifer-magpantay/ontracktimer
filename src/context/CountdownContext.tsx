import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ApplicationContext } from './ApplicationContext';

// types
type CountdownData = {
    timer: number,
    breakTimer: number,
    isActive: boolean,
    isBreakActive: boolean,
    isDisabledStart: boolean,
    isDisabledPause: boolean,
    isDisabledReset: boolean,
    hasFinished: boolean,
    hasBreakFinished: boolean,
    isModalOpen: boolean,
    startCountdown: () => void,
    pauseTimer: () => void,
    resetTimer: () => void,
    finishedCycle: () => void,
    startBreakTime: () => void,
    finishedBreak: () => void,
    restart: () => void,
    closeModal: () => void
}

type CountdownProviderProps = {
    children: ReactNode;
}

// context
export const CountdownContext = createContext({} as CountdownData);

// add a node variable to deal with the clearTimeout from useEffect
let countdownTimeout: NodeJS.Timeout;

// provider
export function CountdownProvider({ children }: CountdownProviderProps) {
    // add data
    const { displayChallenge, updateCountersAndProgress, levelGoal } = useContext(ApplicationContext);

    // states
    // 1) set the states for timers
    // timer: add as initial value the min * sec
    const [timer, setTimer] = useState(25 * 60) //25*60
    const [breakTimer, setBreakTimer] = useState(5 * 60);//5*60

    // button: add as initial value false;
    const [isActive, setIsActive] = useState(false);
    const [isBreakActive, setIsBreakActive] = useState(false);

    // 2) setting state to the button if each one is disabled or not at the beginning of the app
    const [isDisabledStart, setIsDisabledStart] = useState(false);
    const [isDisabledPause, setIsDisabledPause] = useState(true);
    const [isDisabledReset, setIsDisabledReset] = useState(true);

    // 3) set a state to check if the cycle has finished
    const [hasFinished, setHasFinished] = useState(false);
    const [hasBreakFinished, setHasBreakFinished] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // functions
    // 4) add a function to the buttons: activate and disabled states 
    function startCountdown() {
        setIsActive(true);
        setIsDisabledStart(true);
        setIsDisabledPause(false);
    }

    function pauseTimer() {
        // calling the clearTimeout using the nove variable as parameter
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setIsDisabledStart(false);
        setIsDisabledReset(false)
    }

    function resetTimer() {
        setTimer(25 * 60); //25*60
        setIsDisabledStart(false);
        setIsDisabledPause(true);
        setIsDisabledReset(true);
    }

    // reset all states when the cycle is finished
    function finishedCycle() {
        setHasFinished(true);
        setIsActive(false);
        setIsDisabledStart(false);
        setIsDisabledPause(true);
        setIsDisabledReset(true);
    }

    // set a useEffect to execute a function everytime the active and timer state change
    useEffect(() => {
        // add a statement to reduce the timer if the timer is true and the remain time is > 0
        if (isActive && timer > 0) {
            // passing the node variable to the setTimeout()
            countdownTimeout = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000)
        }
        else if (isActive && timer == 0) {
            finishedCycle();
            console.log("Congratulations! You have finished one more cycle! Keep going!")
            updateCountersAndProgress();
            displayChallenge();
        }
    }, [isActive, timer])

    // break time
    function startBreakTime() {
        setIsBreakActive(true);
        setIsDisabledStart(true);
    }

    function finishedBreak() {
        setHasBreakFinished(true);
        setIsBreakActive(false);
    }

    // here is the 'loop' core
    function restart() {
        // to bring back the first screen
        setHasFinished(false);
        // reseting the timer
        setTimer(0.1 * 60);
        // setting the disable status of the start button
        setIsDisabledStart(false);
        // reseting the break timer       
        setBreakTimer(0.2 * 60);
        setHasBreakFinished(false);
    }

    // set a useEffect for breaktimer
    useEffect(() => {
        if (isBreakActive && breakTimer > 0) {
            countdownTimeout = setTimeout(() => {
                setBreakTimer(breakTimer - 1);
            }, 1000)
        }
        else if (isBreakActive && breakTimer == 0) {
            finishedBreak();
            console.log("Break time finished. It is time to focus and work again.")
        }
    }, [isBreakActive, breakTimer])

    // close modal
    function closeModal() {
        setIsModalOpen(false);
    }
// once the state of the level goal changes, open the modal
    useEffect(() => {
            setIsModalOpen(true);
    }, [levelGoal])

    return (
        <CountdownContext.Provider value={{
            timer, breakTimer, isActive, isBreakActive, isDisabledStart, isDisabledPause, isDisabledReset, hasFinished, hasBreakFinished, isModalOpen, startCountdown, pauseTimer, resetTimer, finishedCycle, startBreakTime, finishedBreak, restart, closeModal
        }}>
            {children}
        </CountdownContext.Provider>
    )
}