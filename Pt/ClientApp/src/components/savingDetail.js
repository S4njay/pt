import React, { Component } from 'react';
import { Line } from 'react-chartjs';
//import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";


export class SavingDetail extends Component {
    displayName = SavingDetail.name

  constructor(props) {
    super(props);
    this.state = {
        saving: {}, loading: true
    };

    if (props.match.params.id !== undefined) {
        fetch('api/Portfolio/' + props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ saving: data, loading: false });
            });
       
    }  
    
  }

  static renderSavingDetail(saving) {
      console.log(saving);
      console.log(saving.amountRecordedDateHistory);
      console.log(saving.amountHistory);
      var data = {
          labels: saving.amountRecordedDateHistory,
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: saving.amountHistory
              }
          ]
      }; 
      return (
          <div>
              <h1>{saving.name}</h1>
              <Line data={data} width="600" height="250" />
          </div>  
      );
  }

  render() {
      console.log(this.props.id);
      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : SavingDetail.renderSavingDetail(this.state.saving);
      return (
          <div>
              {contents}
          </div>
      )
  }
}
