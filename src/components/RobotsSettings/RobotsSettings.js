import SwapperLogo from './SwapperLogo.svg';

import './RobotsSettings.css';

function NumberInput({ id, label, value, setValue, scaleName, nameAttr }) {
  // label - Едининица измерения
  // scaleName - Название инпута
  return (
    <div className="input-area container">
      <div className="input__text">
        <p>{scaleName}</p>
      </div>
      <div className="input__block">
        <div className="input__value">
          <input
            type="number"
            id={id}
            pattern="^-?[0-9]\d*\.?\d*$"
            value={value}
            name={nameAttr}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <label htmlFor={id} className="static-value-unit">
            {label}
          </label>
        </div>
        <div className="btn-wrapper">
          <div className="btn-counter" onClick={() => setValue(parseInt(value) + 1)}>
            <button type="button">
              <span>+</span>
            </button>
          </div>
          <div className="btn-counter" onClick={() => setValue(parseInt(value) - 1)}>
            <button type="button">
              <span>-</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RobotsSettings({
  setCurrentMenu,
  values,
  setValue,
  setTimerIsActive,
  timerIsActive,
  setrobotsQnt,
  clearRobots,
}) {
  function getRandomInt(max) {
    alert(Math.floor(Math.random() * max));
  }
  return (
    <div className="setting-menu">
      <form action="#">
        {/*Main Container */}
        <div>
          {/* Beggining of header container */}
          <div className="header container">
            <div className="header-text">
              <span>Настройки </span>
              <img
                src={SwapperLogo}
                alt="swapperLogo"
                onClick={() => setCurrentMenu((prev) => !prev)}></img>
            </div>
            <div className="input-launchname">
              <p className="input__text">Название запуска </p>
              <input
                id="launchName"
                type="text"
                className="input-header"
                onChange={(event) => {
                  setValue('launchName', event.target.value); // Назначение названия запуска
                }}
                name="header-name"
              />
            </div>
          </div>

          {/* End of header container */}
          {/* Beggining of robots type container */}
          <div className="robots-type container">
            <p className="input__text">Тип роботов</p>
            <div className="robots-type-switch">
              <div className="robots_type_button">
                <input
                  id="radio-1"
                  type="radio"
                  name="radio"
                  onChange={() => setValue('robotsType', 1)} // Назначение типа робота - 1
                />
                <label htmlFor="radio-1">Rotators</label>
              </div>
              <div className="robots_type_button">
                <input
                  id="radio-2"
                  type="radio"
                  name="radio"
                  onChange={() => setValue('robotsType', 2)} // Назначение типа робота - 2
                />
                <label htmlFor="radio-2">Self-propelled</label>
              </div>
            </div>
          </div>

          <NumberInput
            id="InputDiameter"
            label="мм"
            value={values.diameter | 0}
            setValue={(v) => setValue('diameter', v)} // Назначение диаметра робота
            scaleName={'Диаметр'}
            nameAttr={'diameter-info'}
          />

          <NumberInput
            id="InputFriction"
            label=""
            value={values.friction | 0}
            setValue={(v) => setValue('friction', v)} // Назначение коэф.трении робота
            scaleName={'Коэф. трении'}
            nameAttr={'friction-info'}
          />

          <NumberInput
            id="InputRobotsQnt"
            label="шт"
            value={values.robotsQnt | 0}
            setValue={(v) => setValue('robotsQnt', v)} // Назначение кол-во роботов
            scaleName={'Кол-во роботов'}
            nameAttr={'robotsQnt-info'}
          />

          <NumberInput
            id="InputSimulationTime"
            label="сек"
            value={values.simulationTime | 0}
            setValue={(v) => setValue('simulationTime', v)} // Назначение времени симуляции роботов
            scaleName={'Время симуляции'}
            nameAttr={'simulationTime-info'}
          />

          <div className="footer">
            <div className="footer-btn btn-submit">
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  setrobotsQnt(); // Вывод роботов на экран
                  setTimerIsActive((prev) => !prev); // Запуск таймера
                }}>
                {timerIsActive ? <span>Остановить</span> : <span>Запуск</span>}
              </button>
            </div>
            <div className="footer-btn btn-reset">
              <button
                type="reset"
                onClick={(event) => {
                  event.preventDefault();
                  setTimerIsActive(() => false); // Выключение таймера
                  clearRobots(); // Очистка таймера
                  getRandomInt(360);
                }}>
                <span>Сбросить</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RobotsSettings;
