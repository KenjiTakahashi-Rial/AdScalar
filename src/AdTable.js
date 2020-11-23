import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class AdTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: {
                'Loading...': {
                    weightedProfitMargin: 'Loading...',
                    currentBudget: 'Loading...',
                    proposedBudget: 'Loading...',
                    averageSpending: 'Loading...',
                    averageRevenue: 'Loading...',
                    averageImpressions: 'Loading...',
                    averageClicks: 'Loading...'
                }
            }
        };
    }

    async componentDidMount() {
        let result = await this.props.getAdsAsync;
        this.setState({ ads: result });
    }

    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Weighted Profit Margin</th>
                        <th>Current Budget</th>
                        <th>Proposed Budget</th>
                        <th>Average Spending</th>
                        <th>Average Revenue</th>
                        <th>Average Impressions</th>
                        <th>Average Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(this.state.ads).map(([id, ad]) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{ad['weightedProfitMargin']}</td>
                            <td>{ad['currentBudget']}</td>
                            <td>{ad['proposedBudget']}</td>
                            <td>{ad['averageSpending']}</td>
                            <td>{ad['averageRevenue']}</td>
                            <td>{ad['averageImpressions']}</td>
                            <td>{ad['averageClicks']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default AdTable;