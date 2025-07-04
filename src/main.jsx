import { useEffect, useState, useRef, useCallback } from 'react';
import { Event } from './components/Event/Event';

const TABS = {
    all: {
        title: 'Все',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    },
    kitchen: {
        title: 'Кухня',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }]
    },
    hall: {
        title: 'Зал',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Выключено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Выключено'
        }]
    },
    lights: {
        title: 'Лампочки',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }]
    },
    cameras: {
        title: 'Камеры',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    }
};

const baseItems = [...TABS.all.items];
TABS.all.items = Array.from({ length: 64 }, () => baseItems).flat();
const TABS_KEYS = Object.keys(TABS);

export function Main() {
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState(() => new URLSearchParams(location.search).get('tab') || 'all');
    const [hasRightScroll, setHasRightScroll] = useState(false);

    const updateScrollState = useCallback(() => {
        const wrapper = containerRef.current;
        if (!wrapper) return;

        const visiblePanel = wrapper.querySelector('.section__panel:not(.section__panel_hidden)');
        if (visiblePanel) {
            const hasScroll = visiblePanel.scrollWidth > visiblePanel.clientWidth;
            setHasRightScroll(hasScroll);
        }
    }, []);

    useEffect(() => {
        updateScrollState();
        const resizeObserver = new ResizeObserver(updateScrollState);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [updateScrollState]);

    const handleArrowClick = () => {
        const scroller = containerRef.current?.querySelector('.section__panel:not(.section__panel_hidden)');
        if (scroller) {
            scroller.scrollTo({
                left: scroller.scrollLeft + 400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="main">
            <section className="section main__general">
                <h2 className="section__title section__title-header section__main-title">Главное</h2>
                <div className="hero-dashboard" style={{ backgroundImage: 'url(./bg@2x.png)' }}>
                    <div className="hero-dashboard__primary">
                        <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
                        <p className="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
                        <ul className="hero-dashboard__info">
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">Дома</div>
                                <div className="hero-dashboard__item-details">
                                    +23<span className="a11y-hidden">°</span>
                                </div>
                            </li>
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">За окном</div>
                                <div className="hero-dashboard__item-details">
                                    +19<span className="a11y-hidden">°</span>
                                    <div
                                        className="hero-dashboard__icon hero-dashboard__icon_rain"
                                        style={{ backgroundImage: 'url(./cloud-drizzle.svg)' }}
                                        role="img"
                                        aria-label="Дождь"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="hero-dashboard__schedule">
                        <Event icon="temp" iconLabel="Температура" title="Philips Cooler" subtitle="Начнет охлаждать в 16:30" />
                        <Event icon="light" iconLabel="Освещение" title="Xiaomi Yeelight LED Smart Bulb" subtitle="Включится в 17:00" />
                        <Event icon="light" iconLabel="Освещение" title="Xiaomi Yeelight LED Smart Bulb" subtitle="Включится в 17:00" />
                    </ul>
                </div>
            </section>

            <section className="section main__scripts">
                <h2 className="section__title section__title-header">Избранные сценарии</h2>
                <ul className="event-grid">
                    <Event slim icon="light2" iconLabel="Освещение" title="Выключить весь свет в доме и во дворе" />
                    <Event slim icon="schedule" iconLabel="Расписание" title="Я ухожу" />
                    <Event slim icon="light2" iconLabel="Освещение" title="Включить свет в коридоре" />
                    <Event slim icon="temp2" iconLabel="Температура" title="Набрать горячую ванну" subtitle="Начнётся в 18:00" />
                    <Event slim icon="temp2" iconLabel="Температура" title="Сделать пол тёплым во всей квартире" />
                </ul>
            </section>

            <section className="section main__devices">
                <div className="section__title">
                    <h2 className="section__title-header">Избранные устройства</h2>
                    <select
                        className="section__select"
                        style={{ backgroundImage: 'url(./arrow-down.svg)' }}
                        value={activeTab}
                        onChange={e => setActiveTab(e.target.value)}
                    >
                        {TABS_KEYS.map(key => (
                            <option key={key} value={key}>{TABS[key].title}</option>
                        ))}
                    </select>
                    <ul role="tablist" className="section__tabs">
                        {TABS_KEYS.map(key => (
                            <li
                                key={key}
                                role="tab"
                                aria-selected={key === activeTab}
                                tabIndex={key === activeTab ? 0 : -1}
                                className={`section__tab${key === activeTab ? ' section__tab_active' : ''}`}
                                id={`tab_${key}`}
                                aria-controls={`panel_${key}`}
                                onClick={() => setActiveTab(key)}
                            >
                                {TABS[key].title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section__panel-wrapper" ref={containerRef}>
                    {TABS_KEYS.map(key => (
                        <div
                            key={key}
                            role="tabpanel"
                            className={`section__panel${key === activeTab ? '' : ' section__panel_hidden'}`}
                            aria-hidden={key !== activeTab}
                            id={`panel_${key}`}
                            aria-labelledby={`tab_${key}`}
                        >
                            <ul className="section__panel-list">
                                {TABS[key].items.map((item, idx) => (
                                    <Event key={idx} {...item} />
                                ))}
                            </ul>
                        </div>
                    ))}
                    {hasRightScroll && (
                        <div
                            className="section__arrow"
                            style={{ backgroundImage: 'url(./arrow-left.png)' }}
                            onClick={handleArrowClick}
                        />
                    )}
                </div>
            </section>
        </main>
    );
}
