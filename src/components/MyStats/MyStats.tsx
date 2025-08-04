import { AxiosResponse } from 'axios';
import { getMyStats } from './MyStatsApi';

export default function MyStats() {
  getMyStats()
    .then((response: AxiosResponse) => {
        console.log(response);
    }).catch((error) => {
      console.log(error);
    });

  return (
      <div className="flex flex-col p-20">
        <div className="flex justify-center">
          <h1>These are THE stats</h1>
        </div>
      </div>
  );
}
