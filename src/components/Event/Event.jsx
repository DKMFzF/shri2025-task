import { useRef, useEffect } from 'react';

export function Event(props) {
  const ref = useRef();
  const { onSize, icon } = props;

  useEffect(() => {
    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    if (onSize) {
      onSize({ width, height });
    }
  });

  const iconPaths = {
    temp: './icon_temperature.svg',
    temp2: './icon_temperature_2.svg',
    light: './icon_sun.svg',
    light2: './icon_sun_2.svg',
    schedule: './icon_scheduled.svg'
  };

  const iconPath = iconPaths[icon] || '';

  return (
    <li ref={ref} className={'event' + (props.slim ? ' event_slim' : '')}>
      <button className="event__button">
        <span
          className={`event__icon event__icon_${props.icon}`}
          style={{ backgroundImage: `url(${iconPath})` }}
          role="img"
          aria-label={props.iconLabel}
        ></span>
        <h4 className="event__title">{props.title}</h4>
        {props.subtitle && <span className="event__subtitle">{props.subtitle}</span>}
      </button>
    </li>
  );
}
