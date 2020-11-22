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
                    proposedBudget: 'Loading...'
                }
            }
        };
    }

    async componentDidMount() {
        let result = await this.props.getAdsAsync;
        this.setState({ ads: result });
    }

    render() {
        console.log(this.state.ads);
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Weighted Profit Margin</th>
                        <th>Current Budget</th>
                        <th>Proposed Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(this.state.ads).map((entry, index) => (
                        <tr key={index}>
                            <td>{entry[0]}</td>
                            <td>{entry[1]['weightedProfitMargin']}</td>
                            <td>{entry[1]['currentBudget']}</td>
                            <td>{entry[1]['proposedBudget']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default AdTable;