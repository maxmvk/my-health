import {Component, Input} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input() chartData: ChartDataSets[] = [];
  @Input() chartLabels: Label[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    showLines: true,
    plugins: {
      plugin: [ChartDataLabels],
      datalabels: {
        color: 'white',
        font: {
          size: 18
        },
        formatter: Math.round
      }
    },
    layout: {
      padding: {
          left: 40,
          right: 40,
          top: 30,
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 30,
          fontSize: 12,
          fontColor: '#fff'
        }
      }],
      yAxes: [{
        display: false
      }],
    },
    tooltips: {
      enabled: false
    },
    elements: {
      point: {
        radius: 18,
        hoverRadius: 18,
      },
      line: {
        tension: 0,
        fill: false
      }
    }
  };

  lineChartColors: ChartDataSets[] = [
    {
      backgroundColor: '#1399ff',
      hoverBackgroundColor: '#1399ff',
      borderColor: '#1399ff',
      hoverBorderColor: '#1399ff'
    },
  ];
}
