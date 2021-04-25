import styles from '../styles/index.module.css';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { Header } from '../components/header/Header';
import { Countdown } from "../components/countdown/Countdown";
import { ApplicationProvider } from '../context/ApplicationContext'
import { CountdownProvider } from '../context/CountdownContext'

type HomeProps = {
  level: number,
  rounds: number,
  pointsProgress: number,
  levelGoal: number,
  totalScore: number
}

export default function Home(props: HomeProps) {
  return (
    <ApplicationProvider
      level={props.level}
      rounds={props.rounds}
      pointsProgress={props.pointsProgress}
      levelGoal={props.levelGoal}
      totalScore={props.totalScore}>
      <div className={styles.home__container}>
        <CountdownProvider>
          <Head>
            {/* meta tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            {/* page title */}
            <title>OnTrack Timer</title>
          </Head>
          <Header />
         <div className={styles.main__container}>
            {/* profile and timer */}
            <Countdown />
            {/* challenges */}
          </div>
        </CountdownProvider>
      </div>
    </ApplicationProvider>
  );
}

// add getServerSideProps
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // inform the variables we want to request from cookies context
  const { level, rounds, pointsProgress, levelGoal, totalScore } = ctx.req.cookies;
  // them, return them into a object called props
  return {
    props: {
      // convert them into number again
      level: Number(level),
      rounds: Number(rounds),
      pointsProgress: Number(pointsProgress),
      levelGoal: Number(levelGoal),
      totalScore: Number(totalScore),
    }
  }
}