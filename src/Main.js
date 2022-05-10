import RobotsSettings from './components/RobotsSettings/RobotsSettings.js';
import RobotsArea from './components/RobotsArea/RobotsArea.js';
import RobotsParameters from './components/robotsParameters/robotsParameters.js';

import './Main.css';
import { useState, useEffect, useRef } from 'react';

// Timer of Robots
function Timer({ seconds, setTimerIsActive, addValueList, clearCircles }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef(); // Add a ref to store the interval id

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  // Add a listener to `timeLeft`
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      addValueList();
      setTimerIsActive((prev) => !prev);
      // clearCircles();
    }
  }, [timeLeft]);

  return (
    <div className="timer">
      <span>{timeLeft}s</span>
    </div>
  );
}

function FirstMenu({
  setCurrentMenu,
  values,
  setValue,
  setTimerIsActive,
  timerIsActive,
  addValueList,
  setrobotsQnt,
  robotsQnt,
  clearCircles,
}) {
  return (
    <div className="first-menu">
      <div className="robots-area">
        <RobotsArea values={values} robotsQnt={robotsQnt} />
      </div>
      <div className="robots-setting">
        <RobotsSettings
          setCurrentMenu={setCurrentMenu}
          values={values}
          setValue={setValue}
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          addValueList={addValueList}
          setrobotsQnt={setrobotsQnt}
          clearCircles={clearCircles}
        />
      </div>
    </div>
  );
}

function SecondMenu({ setCurrentMenu, values, valueList }) {
  return (
    <div className="second-menu">
      <RobotsParameters setCurrentMenu={setCurrentMenu} values={values} valueList={valueList} />
    </div>
  );
}

function Main() {
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(true);
  const [values, setValues] = useState({
    launchName: null,
    robotsType: null,
    diameter: 1,
    friction: 1,
    robotsQnt: 1,
    simulationTime: 1,
  });

  const [robotsQnt, setRobotsQnt] = useState([]);
  const [valueList, setValueList] = useState([]);

  const addValueList = () => {
    setValueList([values, ...valueList]);
  };

  const clearCircles = () => {
    setRobotsQnt([]);
  };

  function randomCircle(diameter, maxRadius, circleCenter) {
    // define random radius or add diameter

    // let radius = minCircle + Math.random() * (maxCircle - minCircle);
    let radius = diameter / 2;

    // let distFromCenter = radius + Math.random() * (outerRadius - innerRadius - radius * 2);
    let distFromCenter = radius + Math.random() * (maxRadius - radius * 2);

    // define random angle

    let angle = Math.random() * Math.PI * 2;
    // calculate the x,y of the defined circle
    let x = circleCenter + distFromCenter * Math.cos(angle);
    let y = circleCenter + distFromCenter * Math.sin(angle);

    // check this new circle versus all previous random circles for a collision

    let hit = false;
    for (let i = 0; i < robotsQnt.length; i++) {
      let circle = robotsQnt[i];
      let dx = circle.cx - x;
      let dy = circle.cy - y;
      let r = circle.radius + radius;
      if (dx * dx + dy * dy <= r * r) {
        hit = true;
      }
    }

    // if no collision occurred, add this new circle to the existing circles array

    if (!hit) {
      // let color = randomColor();
      robotsQnt.push({ cx: x, cy: y, radius: radius, color: 'black' });
    }
  }

  function setrobotsQnt() {
    for (let i = 0; i < values.robotsQnt; i++) {
      let maxRadius = 325;
      let circleCenter = 325;
      randomCircle(values.diameter, maxRadius, circleCenter);
    }
  }

  function setValue(key, newValue) {
    /* long version
    const copy = { ... values }; // create copy of state
    copy[key] = newValue; // update the "key" value
    setValues(copy); // set copy as new state
    */
    // short version:

    setValues((values) => ({ ...values, [key]: newValue }));
  }

  return (
    <div className="App">
      <div style={{ display: currentMenu ? 'block' : 'none' }}>
        {timerIsActive ? (
          <Timer
            seconds={values.simulationTime}
            setTimerIsActive={setTimerIsActive}
            addValueList={addValueList}
            clearCircles={clearCircles}
          />
        ) : (
          ''
        )}
        <FirstMenu
          setCurrentMenu={setCurrentMenu}
          values={values}
          setValue={setValue}
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          valueList={valueList}
          setrobotsQnt={setrobotsQnt}
          robotsQnt={robotsQnt}
          clearCircles={clearCircles}
        />
      </div>
      <div style={{ display: currentMenu ? 'none' : 'block' }}>
        <SecondMenu setCurrentMenu={setCurrentMenu} values={values} valueList={valueList} />
      </div>
    </div>
  );
}

export default Main;
