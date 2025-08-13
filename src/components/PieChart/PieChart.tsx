import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Activities } from './PieChartType';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ activityData, description }: { activityData: Activities, description:string }) {
  const data = {
    labels: Object.keys(activityData),
    datasets: [{
      label: description,
      data: Object.values(activityData),
      borderWidth: 2,
      borderColor: 'rgb(6 78 59)',
      backgroundColor: [
        'rgb(255,116,108)',
        'rgb(99,149,238)',
        'rgb(128,239,128)'
      ]
    }]
  };

  return (
      <div className="pt-10">
        <Doughnut data={data} />
      </div>
  )
}
