import { useEffect, useState} from 'react';
import { AxiosResponse } from 'axios';
import { Measure } from '../PieChart/PieChartType';
import { getMyStats } from './MyStatsApi';
import MyStatsBlock from './MyStatsBlock';

export default function MyStats() {
  const [activityTotal, setActivityTotal] = useState<Measure>({ distance: [], amount: [] });
  const [activityYtd, setActivityYtd] = useState<Measure>({distance:[], amount:[]});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getMyStats()
      .then((response: AxiosResponse) => {
        const {
          data: {
            all_ride_totals: { count: countRideAll, distance: distanceRideAll },
            all_run_totals: { count: countRunAll, distance: distanceRunAll },
            all_swim_totals: { count: countSwimAll, distance: distanceSwimAll },
            ytd_ride_totals: { count: countRideYtd, distance: distanceRideYtd },
            ytd_run_totals: { count: countRunYtd, distance: distanceRunYtd },
            ytd_swim_totals: { count: countSwimYtd, distance: distanceSwimYtd },
          }
        } = response;
        setActivityTotal({
          distance: [
            { label: 'run', value: Math.round(distanceRunAll/1000) },
            { label: 'swim', value: Math.round(distanceSwimAll/1000) },
            { label: 'ride', value: Math.round(distanceRideAll/1000) }
          ],
          amount: [
            { label: 'run', value: countRunAll },
            { label: 'swim', value: countSwimAll },
            { label: 'ride', value: countRideAll }
          ]
        });
        setActivityYtd({
          distance: [
            { label: 'run', value: Math.round(distanceRunYtd/1000) },
            { label: 'swim', value: Math.round(distanceSwimYtd/1000) },
            { label: 'ride', value: Math.round(distanceRideYtd/1000) }
          ], amount: [
            { label: 'run', value: countRunYtd },
            { label: 'swim', value: countSwimYtd },
            { label: 'ride', value: countRideYtd }
          ]
        });
      }).catch((error) => {
      setIsError(true);
    });
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col p-10">
        <div className="flex justify-center">
          <h2>My Stats are not available at the moment. Log out and try again!</h2>
        </div>
      </div>
    )
  }

  return (
      <div className="flex flex-col pt-10 md:p-10">
        <div className="flex justify-center">
          <h1>My Stats</h1>
        </div>
        <MyStatsBlock
          title='activity amount this year'
          activityData={activityYtd.amount}
          type='amount'
         />
        <MyStatsBlock
          title='kilometers this year'
          activityData={activityYtd.distance}
          type='distance'
        />
        <MyStatsBlock
          title='activities done over the years'
          activityData={activityTotal.amount}
          type='amount'
        />
        <MyStatsBlock
          title='kilometers done over the years'
          activityData={activityTotal.distance}
          type='distance'
        />
      </div>
  );
}
