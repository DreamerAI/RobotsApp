import './RobotsArea.css';
import circleSvg from './robot.svg';

function RobotsArea({ robotsQnt }) {
  const listItems = robotsQnt.map((image, i, item) => (
    <circle key={[i]} cx={item[i].cx} cy={item[i].cy} r={item[i].radius} fill="#0071FF">
      <img src={circleSvg} />
    </circle>
  ));

  return <svg className="robots-area-svg">{listItems}</svg>;
}

export default RobotsArea;
