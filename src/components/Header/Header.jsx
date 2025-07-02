import React from 'react';

export function Header() {
    const [expanded, setExpanded] = React.useState(false);
    const [hasBeenToggled, setHasBeenToggled] = React.useState(false);

    const handleClick = () => {
        if (!hasBeenToggled) setHasBeenToggled(true);
        setExpanded(prev => !prev);
    };

    const menuAriaLabel = expanded ? 'Закрыть меню' : 'Открыть меню';
    const linksClass = [
        'header__links',
        expanded && 'header__links_opened',
        hasBeenToggled && 'header__links-toggled'
    ].filter(Boolean).join(' ');

    return (
        <header className="header">
            <a href="/" className="header__logo" style={{ backgroundImage: 'url(./logo.svg)' }} aria-label="Яндекс.Дом" />
            <button className="header__menu" style={{ backgroundImage: 'url(./icon_list_m@1x.svg)' }} aria-expanded={expanded} onClick={handleClick}>
                <span className="header__menu-text a11y-hidden">{menuAriaLabel}</span>
            </button>
            <ul className={linksClass}>
                <li className="header__item">
                    <a className="header__link header__link_current" href="/" aria-current="page">Сводка</a>
                </li>
                <li className="header__item">
                    <a className="header__link" href="/devices">Устройства</a>
                </li>
                <li className="header__item">
                    <a className="header__link" href="/scripts">Сценарии</a>
                </li>
            </ul>
        </header>
    );
}
