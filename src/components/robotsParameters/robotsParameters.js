import GraphJs from './ResultGraph/Graph.js';

import callendarLogo from './callendarLogo.svg';
import lensLogo from './Union.svg';
import settingsLogo from './Group.svg';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useState, forwardRef } from 'react';

import './robotsParameters.css';

function LaunchResults({
  launchDate,
  launchName,
  launchDiameter,
  launchFriction,
  launchRobots,
  launchSimulation,
  setParamValue,
}) {
  // Вывод данных запуска
  function showedValue() {
    setParamValue('diameter', launchDiameter);
    setParamValue('friction', launchFriction);
    setParamValue('robotsQnt', launchRobots);
    setParamValue('simulation', launchSimulation);
  }

  return (
    <div className="history-launch" onClick={showedValue}>
      <div className="launch_date">{launchDate}</div>
      <div className="launch_name">{launchName}</div>
    </div>
  );
}

function ValueContainer({ valueName, valueUnit, valueClass, values }) {
  return (
    <div className={valueClass}>
      <p>{valueName}</p>
      <div className="history-value">
        <span>{values}</span>
        <span className="calc-unit">{valueUnit}</span>
      </div>
    </div>
  );
}

function RobotsParameters({ setCurrentMenu, launchList }) {
  const [showedValue, setShowedValue] = useState({
    diameter: 0,
    friction: 0,
    robotsQnt: 0,
    simulation: 0,
  });

  // Фильтрация по дате
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const [dater, setDater] = useState(current);

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <button className="btn-logo" onClick={onClick} ref={ref}>
      <img src={callendarLogo} alt="callendarLogo" />
    </button>
  ));

  // Фильтрация по словам

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const filterLaunches = (launchList, query) => {
    if (!query) {
      return launchList;
    }

    return launchList.filter((post) => {
      const postName = post.launchName.toLowerCase();
      return postName.includes(query);
    });
  };

  const filteredLaunch = filterLaunches(launchList, searchQuery);

  // Вывод данных запуска
  function setParamValue(key, newValue) {
    setShowedValue((showedValue) => ({ ...showedValue, [key]: newValue }));
  }

  return (
    <div className="robots-parameters">
      <div className="history param-container">
        <div className="history-header">
          <span>История </span>
          <DatePicker
            selected={dater}
            dateFormat="dd/MM/yyyy"
            onChange={(dater) => setDater(dater)}
            customInput={<DateInput />}
          />
        </div>
        <div className="history-content">
          <div className="history-search">
            <div>
              <img src={lensLogo} alt="lensLogo" />
            </div>
            <input
              type="text"
              placeholder="Введите название запуска"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}></input>
          </div>
          <div>
            <div className="history-list">
              <div className="history-list-header">
                <LaunchResults launchDate={'Дата'} launchName={'Название'} />
              </div>
              <div className="history-items">
                {filteredLaunch.map((item, launchIndex) => (
                  <LaunchResults
                    key={launchIndex}
                    launchDate={date}
                    launchName={item.launchName}
                    launchDiameter={item.diameter}
                    launchFriction={item.friction}
                    launchRobots={item.robotsQnt}
                    launchSimulation={item.simulationTime}
                    setParamValue={setParamValue}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parameters param-container">
        <div className="param-header">
          <span>Параметры</span>
          <img
            src={settingsLogo}
            alt="settingsLogo"
            width="20px"
            height="20px"
            onClick={() => setCurrentMenu((prev) => !prev)}></img>
        </div>

        <ValueContainer
          valueName={'Диаметр'}
          valueUnit="м"
          valueClass={'diameter history-value-container'}
          values={showedValue.diameter}
        />
        <ValueContainer
          valueName={'Коэф. трения'}
          valueUnit=" "
          valueClass={'friction history-value-container'}
          values={showedValue.friction}
        />
        <ValueContainer
          valueName={'Кол-во роботов'}
          valueUnit="шт"
          valueClass={'robots-qnt history-value-container'}
          values={showedValue.robotsQnt}
        />
        <ValueContainer
          valueName={'Время симуляции'}
          valueUnit="сек"
          valueClass={'simulation-time history-value-container'}
          values={showedValue.simulation}
        />

        <div className="function-graph">
          <p>График Функции №1</p>
          <GraphJs />
          <p>График Функции №2</p>
          <GraphJs />
          <p>График Функции №3</p>
          <GraphJs />
        </div>
      </div>
    </div>
  );
}

export default RobotsParameters;
