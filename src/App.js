import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdTable from './AdTable.js';
import nextBudgets from './budgetCalc.js';

function App() {
    let ads = nextBudgets();

    return (
        <div className="App">
            <AdTable getAdsAsync={ads}/>
        </div>
    );
}

export default App;
