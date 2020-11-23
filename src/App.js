import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdTable from './AdTable.js';
import nextBudgets from './budgetCalc.js';

function App() {
    return (
        <div className="App">
            <h1>Ad Scaler</h1>
            <AdTable adsPromise={nextBudgets()}/>
        </div>
    );
}

export default App;
