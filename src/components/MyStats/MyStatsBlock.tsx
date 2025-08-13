import { Activities } from '../PieChart/PieChartType';
import PieChart from '../PieChart/PieChart';

export default function MyStatsBlock({
  title, activityData, description }: { title: string, activityData:Activities, description: string }
){
  return (
      <div className="p-10 border-dashed border-indigo-400 border-b-4">
        <div className="text-center font-bold">
          <h2>{ title }</h2>
        </div>
        <PieChart activityData={activityData} description={description}/>
      </div>
  )
}