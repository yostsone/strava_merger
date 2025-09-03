import { Activity } from '../PieChart/PieChartType';
import PieChart from '../PieChart/PieChart';

type Props = {
  title: string,
  activityData:Activity[],
  type: 'distance' | 'amount'
}

export default function MyStatsBlock({ title, activityData, type }: Props){
  return (
      <div className="pt-10 md:p-10 border-solid border-lime-900 border-b-4 last:border-none">
        <div className="text-center font-bold">
          <h2>{ title }</h2>
        </div>
        <PieChart data={activityData} type={type}/>
      </div>
  )
}