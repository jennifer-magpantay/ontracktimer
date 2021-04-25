import React, { useState, useEffect, useContext } from "react";
import styles from "./Countdown.module.css";
import Frame from "../frame/Frame";
import { Profile } from "../profile/Profile";
import { Counters } from "../counters/Counters";
import { Button, ButtonCompleted } from "../button/Button";
import { Challenge } from "../challenge/Challenge";
import { CountdownContext } from "../../context/CountdownContext";
import { LevelModal } from "../modal/LevelModal";

export function Countdown() {
    const {
        timer,
        breakTimer,
        isActive,
        isBreakActive,
        isDisabledStart,
        isDisabledPause,
        isDisabledReset,
        hasFinished,
        hasBreakFinished,
        isModalOpen,
        startCountdown,
        pauseTimer,
        resetTimer,
        finishedCycle,
        startBreakTime,
        finishedBreak,
        restart,
        closeModal,
    } = useContext(CountdownContext);

    // setting timer display
    // 1) declare a varibale that will hold calculation to return the 'whole'
    const minutes = Math.floor(timer / 60);
    // and add a varibale that will hold calculation to return the left secons
    const seconds = timer % 60;

    // 2) settins this variables on your code:
    // convert then to strings
    const minutesStr = String(minutes);
    const secondStr = String(seconds);

    // 3) split then into an array of 2 indexes/parts by using split()
    // if they have just one 'part', add a zero to the left by using padStart()
    const [minLeft, minRight] = minutesStr.padStart(2, "0").split("");
    const [secLeft, secRight] = secondStr.padStart(2, "0").split("");
    // onde is done, add the variables to your code

    // setting break timer display
    const break_minutes = Math.floor(breakTimer / 60);
    const break_seconds = breakTimer % 60;
    const break_minStr = String(break_minutes);
    const break_secStr = String(break_seconds);
    const [break_minLeft, break_minRight] = break_minStr
        .padStart(2, "0")
        .split("");
    const [break_secLeft, break_secRight] = break_secStr
        .padStart(2, "0")
        .split("");

    return (
        <Frame>
            {/* if the cycle has finished, display this */}
            {hasFinished ? (
                <Challenge>
                    {/* add break timer */}
                    <div className={styles.timer__container}>
                        <div>
                            <span>{break_minLeft}</span>
                            <span>{break_minRight}</span>
                        </div>
                        <span>:</span>
                        <div>
                            <span>{break_secLeft}</span>
                            <span>{break_secRight}</span>
                        </div>
                    </div>
                    {/* buttons */}
                    {hasBreakFinished ? (
                        <>
                            <ButtonCompleted
                                onClickBtn={restart}
                                buttonStyle={styles.buttonCompleted}
                            >
                                BREAK TIME FINISHED. GET BACK TO WORK
                </ButtonCompleted>
                            {/* if breaktime has finished and the level has up, display modal
       */}
                            {isModalOpen ? <LevelModal /> : ""}
                        </>
                    ) : (
                        <>
                            <Button
                                onClickBtn={startBreakTime}
                                disableStatus={isDisabledStart}
                                buttonStyle={styles.buttonChallenge}
                            >
                                START SHORT BREAK
                </Button>
                        </>
                    )}
                </Challenge>
            ) : (
                // otherwise, if the cycle has being started yet, display that:
                <>
                    <Profile />
                    <Counters />
                    {/* timer */}
                    <div className={styles.timer__container}>
                        <div>
                            <span>{minLeft}</span>
                            <span>{minRight}</span>
                        </div>
                        <span>:</span>
                        <div>
                            <span>{secLeft}</span>
                            <span>{secRight}</span>
                        </div>
                    </div>
                    {/* button start */}
                    <Button
                        onClickBtn={startCountdown}
                        disableStatus={isDisabledStart}
                        buttonStyle={styles.buttonStart}
                    >
                        START TIMER
            </Button>
            <div className={styles.button__container}>

                    {/* button pause */}
                    <Button
                        onClickBtn={pauseTimer}
                        disableStatus={isDisabledPause}
                        buttonStyle={styles.buttonPause}
                    >
                        PAUSE
            </Button>

                    {/* button reset */}
                    <Button
                        onClickBtn={resetTimer}
                        disableStatus={isDisabledReset}
                        buttonStyle={styles.buttonReset}
                    >
                        RESET
            </Button>
            </div>

                </>
            )}
        </Frame>
    );
}
