import { useEffect, useState} from 'react';
import { AxiosResponse } from 'axios';
import { Activities, Measure} from '../PieChart/PieChartType';
import { getMyStats } from './MyStatsApi';
import MyStatsBlock from './MyStatsBlock';

const initActivity:Activities = { run: 0, ride: 0, swim: 0 };

export default function MyStats() {
  const [activityTotal, setActivityTotal] = useState<Measure>({ distance: initActivity, amount: initActivity });
  const [activityYtd, setActivityYtd] = useState<Measure>({ distance: initActivity, amount: initActivity });
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
          distance: {
            run: Math.round(distanceRunAll/1000),
            swim: Math.round(distanceSwimAll/1000),
            ride: Math.round(distanceRideAll/1000)
          },
          amount: {
            run: countRunAll,
            swim: countSwimAll,
            ride: countRideAll
          }
        });

        setActivityYtd({
          distance: {
            run: Math.round(distanceRunYtd/1000),
            swim: Math.round(distanceSwimYtd/1000),
            ride: Math.round(distanceRideYtd/1000)
          },
          amount: {
            run: countRunYtd,
            swim: countSwimYtd,
            ride: countRideYtd
          }
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
      <div className="flex flex-col p-10">
        <div className="flex justify-center">
          <h1>My Stats</h1>
        </div>
        <MyStatsBlock
          title='activity amount that is done this year so far'
          activityData={activityYtd.amount}
          description='Activity amount:'
         />
        <MyStatsBlock
            title='kilometers this year'
            activityData={activityYtd.distance}
            description='km amount:'
        />
        <MyStatsBlock
            title='activity amount done over the years'
            activityData={activityTotal.amount}
            description='Activity amount:'
        />
        <MyStatsBlock
            title='kilometers done over the years'
            activityData={activityTotal.distance}
            description='km amount:'
        />
      </div>
  );
}
