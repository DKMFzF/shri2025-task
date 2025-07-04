import ReactDOM from 'react-dom/client';
import { Header } from './components/Header/Header';
import { Main } from './main';
import './styles/reset.css';
import './styles/styles.css';

export function App() {
    return (
        <>
            <Header />
            <Main />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
