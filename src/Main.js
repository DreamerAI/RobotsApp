import RobotsSettings from './components/RobotsSettings/RobotsSettings.js';
import RobotsArea from './components/RobotsArea/RobotsArea.js';
import RobotsParameters from './components/robotsParameters/robotsParameters.js';

import './Main.css';
import { useState, useEffect, useRef } from 'react';

// Вслывающий таймер
function Timer({ seconds, setTimerIsActive, addLaunchList }) {
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
      addLaunchList(); // Отправка результата в Историю запусков
      setTimerIsActive((prev) => !prev); // Переключатель Таймера
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
  addLaunchList,
  setrobotsQnt,
  robotsQnt,
  clearRobots,
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
          addLaunchList={addLaunchList}
          setrobotsQnt={setrobotsQnt}
          clearRobots={clearRobots}
        />
      </div>
    </div>
  );
}

function SecondMenu({ setCurrentMenu, values, launchList }) {
  return (
    <div className="second-menu">
      <RobotsParameters setCurrentMenu={setCurrentMenu} values={values} launchList={launchList} />
    </div>
  );
}

function Main() {
  const [timerIsActive, setTimerIsActive] = useState(false); // Текущее состояние Таймера
  const [currentMenu, setCurrentMenu] = useState(true); // Текущее открытое меню
  const [values, setValues] = useState({
    // Начальные параметры роботов
    launchName: null,
    robotsType: null,
    diameter: 1,
    friction: 1,
    robotsQnt: 1,
    simulationTime: 1,
  });

  const [robotsQnt, setRobotsQnt] = useState([]); // Массив из количество роботов с их параметрами
  const [launchList, setLaunchList] = useState([]); // Количество запусков

  // Добавление запуска в Историю всех запусков
  const addLaunchList = () => {
    setLaunchList([values, ...launchList]);
  };

  // Очистка роботов на экране
  const clearRobots = () => {
    setRobotsQnt([]);
  };

  function randomCircle(diameter, maxRadius, circleCenter) {
    // Радиус робота
    let radius = diameter / 2;

    // Рандомная дистанция с центра круга
    let distFromCenter = radius + Math.random() * (maxRadius - radius * 2);

    // Определить рандомный угол
    let angle = Math.random() * Math.PI * 2;

    // Рассчитать x,y определенного круга
    let x = circleCenter + distFromCenter * Math.cos(angle);
    let y = circleCenter + distFromCenter * Math.sin(angle);

    // Проверка эотого круга против других рандомных кругов на колизию
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

    // Если не обнаружено колизии, то добавляем новый круг в существующий круг в массив
    if (!hit) {
      robotsQnt.push({ cx: x, cy: y, radius: radius });
    }
  }
  // Создание выбранного количество роботов
  function setrobotsQnt() {
    for (let i = 0; i < values.robotsQnt; i++) {
      let maxRadius = 325; // Радиус за который роботы не должны выходить
      let circleCenter = 325; // Точка центра с которой роботы появляются
      randomCircle(values.diameter, maxRadius, circleCenter);
    }
  }
  // Управления параметрами роботов и обновление данных
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
        {/* Появление и удаление компнента таймера */}

        {timerIsActive ? (
          <Timer
            seconds={values.simulationTime}
            setTimerIsActive={setTimerIsActive}
            addLaunchList={addLaunchList}
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
          launchList={launchList}
          setrobotsQnt={setrobotsQnt}
          robotsQnt={robotsQnt}
          clearRobots={clearRobots}
        />
      </div>

      <div style={{ display: currentMenu ? 'none' : 'block' }}>
        <SecondMenu setCurrentMenu={setCurrentMenu} values={values} launchList={launchList} />
      </div>
    </div>
  );
}

export default Main;
