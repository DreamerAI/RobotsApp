import './RobotsArea.css';
import circleSvg from './robot.svg';

function RobotsArea({ robotsQnt }) {
  const listItems = robotsQnt.map((image, i, item) => (
    <circle
      key={[i]}
      cx={item[i].cx}
      cy={item[i].cy}
      r={item[i].radius}
      fill="url(#image)"></circle>
  ));

  return (
    <svg className="robots-area-svg">
      <defs>
        <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
          <image x="0%" y="0%" width="512" height="512" href={circleSvg}></image>
        </pattern>
      </defs>
      {listItems}
    </svg>
  );
}

export default RobotsArea;
