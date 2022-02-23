import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Pomodoro from "./components/Pomodoro";
import Setting from "./components/Setting";
import alarm from "./audioclips/alarm-clock.mp3";
import { format } from "./utility/format.js";
import button from "./audioclips/button.mp3";
import "./App.css";

function App() {
  const [data, setData] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 30,
    countInterval: 1,
    seconds: 0,
    progressValue: 0,
  });
  const [settingData, setSettingData] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 30,
    longBreakInterval: 4,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [realTimer, setRealTimer] = useState("pomodoro");
  const [isSetting, setIsSetting] = useState(false);
  const intervalId = useRef(null);
  const audioAlarm = useRef();
  const audioButton = useRef();

  // when the page loads, we get the previous data from local storage and assign it to data setting state
  useEffect(() => {
    const getDatafromLocalStorage = JSON.parse(localStorage.getItem("data"));
    if (getDatafromLocalStorage !== null) {
      const { pomodoro, shortBreak, longBreak, longBreakInterval } =
        getDatafromLocalStorage;

      setSettingData((d) => ({
        ...d,
        pomodoro: pomodoro,
        shortBreak: shortBreak,
        longBreak: longBreak,
        longBreakInterval: longBreakInterval,
      }));
      setData((d) => ({
        ...d,
        pomodoro: pomodoro,
        shortBreak: shortBreak,
        longBreak: longBreak,
      }));
    } else {
      localStorage.setItem("data", JSON.stringify(settingData));
    }
  }, []);

  // I paste this code on setInterval for performance reasons I guess, and also I found it better
  // at that moment on setInterval then useEffect hook.
  /*
  useEffect(() => {
    if (data.longBreakInterval <= settingData.longBreakInterval) {
      if (
        realTimer === "pomodoro" &&
        data.pomodoro === 0 &&
        data.seconds === 0
      ) {
        setRealTimer("shortBreak");
        setData({
          ...data,
          pomodoro: settingData.pomodoro,
          longBreakInterval: data.longBreakInterval + 1,
        });
        setIsStarted(false);
        clearInterval(intervalId.current);
        audioAlarm.current.play();
        document.title = `${format(data["shortBreak"])}:${format(
          data.seconds
        )} / POMOTIMER`;
        notification();
      } else if (
        realTimer === "shortBreak" &&
        data.shortBreak === 0 &&
        data.seconds === 0
      ) {
        setRealTimer("pomodoro");
        setData({ ...data, shortBreak: settingData.shortBreak });
        setIsStarted(false);
        clearInterval(intervalId.current);
        audioAlarm.current.play();
        document.title = `${format(data["pomodoro"])}:${format(
          data.seconds
        )} / POMOTIMER`;
      } else {
        if (
          realTimer === "longBreak" &&
          data.longBreak === 0 &&
          data.seconds === 0
        ) {
          setRealTimer("pomodoro");
          setData({ ...data, longBreak: settingData.longBreak });
          setIsStarted(false);
          clearInterval(intervalId.current);
          audioAlarm.current.play();
          document.title = `${format(data["pomodoro"])}:${format(
            data.seconds
          )} / POMOTIMER`;
        }
      }
    } else {
      setData({ ...data, longBreakInterval: 1 });
      setRealTimer("longBreak");
      document.title = `${format(data["longBreak"])}:${format(
        data.seconds
      )} / POMOTIMER`;
    }
  }, [data.seconds, realTimer]);*/

  // to change the data input :)
  const handleChange = (e, name) => {
    const value = e.target.value;
    setSettingData({ ...settingData, [name]: value });
  };

  // to launch the pomodoro or to stop it.
  const LaunchPomodoro = () => {
    if (!isStarted) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      let seconds = data.seconds;
      let timer = data[realTimer];
      let count = data.countInterval;
      intervalId.current = setInterval(() => {
        if (seconds === 0) {
          timer--;
          seconds = 60;
          setData((data) => ({
            ...data,
            seconds: seconds,
            [realTimer]: timer,
            progressValue: data.progressValue + 1,
          }));
        }
        seconds--;
        setData((data) => ({
          ...data,
          seconds: seconds,
          progressValue: data.progressValue + 1,
        }));
        document.title = `${format(timer)}:${format(seconds)} / POMOTIMER`;

        // switch between pomodoro, short break and long break automatically
        // when some of them finished, and also to keep track of the long break interval
        // for ex: if you want to make pomodoro 4 times only etc... :) Test the app to see.
        if (count <= settingData.longBreakInterval) {
          if (realTimer === "pomodoro" && timer === 0 && seconds === 0) {
            count++;
            setRealTimer("shortBreak");
            setData((data) => ({
              ...data,
              pomodoro: settingData.pomodoro,
              countInterval: count,
              progressValue: 0,
            }));
            setIsStarted(false);
            clearInterval(intervalId.current);
            audioAlarm.current.play();
            document.title = `${format(data["shortBreak"])}:${format(
              seconds
            )} / POMOTIMER`;
          } else if (
            realTimer === "shortBreak" &&
            timer === 0 &&
            seconds === 0
          ) {
            setRealTimer("pomodoro");
            setData((data) => ({
              ...data,
              shortBreak: settingData.shortBreak,
              progressValue: 0,
            }));
            setIsStarted(false);
            clearInterval(intervalId.current);
            audioAlarm.current.play();
            document.title = `${format(data["pomodoro"])}:${format(
              seconds
            )} / POMOTIMER`;
          } else {
            if (realTimer === "longBreak" && timer === 0 && seconds === 0) {
              setRealTimer("pomodoro");
              setData((data) => ({
                ...data,
                longBreak: settingData.longBreak,
                progressValue: 0,
              }));
              setIsStarted(false);
              clearInterval(intervalId.current);
              audioAlarm.current.play();
              document.title = `${format(data["pomodoro"])}:${format(
                seconds
              )} / POMOTIMER`;
            }
          }
        }
        // means that the long break interval is finished and it restart again.
        if (count > settingData.longBreakInterval) {
          count = 1;
          setData((data) => ({
            ...data,
            countInterval: count,
            progressValue: 0,
          }));
          setRealTimer("longBreak");
          document.title = `${format(data["longBreak"])}:${format(
            seconds
          )} / POMOTIMER`;
        }
      }, 1000);
      setIsStarted(true);
      audioButton.current.pause();
      audioButton.current.currentTime = 0;
      audioButton.current.play();
      // if the timer is launched we want to directly pause and reset the alarm
      // so that it doesn't keep alarming to the end of the sound. I hope that makes sense :)
      audioAlarm.current.pause();
      audioAlarm.current.currentTime = 0;
    } else {
      clearInterval(intervalId.current);
      setIsStarted(false);
      audioButton.current.pause();
      audioButton.current.currentTime = 0;
      audioButton.current.play();
    }
  };

  // to switch between pomotimers (pomodoro, short break, long break) when you click on some of them.
  const handleClickChange = (name) => {
    if (isStarted) {
      alert("The timer still running stop it to switch");
    } else {
      setRealTimer(name);
      setData({
        ...data,
        pomodoro: settingData.pomodoro,
        shortBreak: settingData.shortBreak,
        longBreak: settingData.longBreak,
        progressValue: 0,
        seconds: 0,
      });
      document.title = `${format(data[name])}:${format(
        data.seconds
      )} / POMOTIMER`;
    }
  };

  // update the data when the user change something on setting
  const updateData = () => {
    const { pomodoro, shortBreak, longBreak } = settingData;
    setIsSetting(false);
    setData({
      ...data,
      pomodoro: pomodoro,
      shortBreak: shortBreak,
      longBreak: longBreak,
    });
    localStorage.setItem("data", JSON.stringify(settingData));
  };

  return (
    <div className="flex justify-center">
      <div className="md:w-1/2">
        <Navbar onShow={() => setIsSetting(true)} />
        <progress
          min="0"
          value={data.progressValue}
          max={settingData[realTimer] * 61}
          className="w-full h-1 bg-slate-100"
        ></progress>
        <Pomodoro
          timer={data[realTimer]}
          seconds={data.seconds}
          handleClickChange={handleClickChange}
          handleClick={LaunchPomodoro}
          isStarted={isStarted}
          realTimer={realTimer}
        />
        <h3 className="text-center text-gray-700">
          {`#${data.countInterval}`} Time To Focus
        </h3>
        <audio src={alarm} className="hidden" ref={audioAlarm}></audio>
        <audio src={button} className="hidden" ref={audioButton}></audio>
      </div>
      {isSetting && (
        <Setting
          onDisappear={updateData}
          data={settingData}
          onhandleChange={handleChange}
        />
      )}
    </div>
  );
}

export default App;
