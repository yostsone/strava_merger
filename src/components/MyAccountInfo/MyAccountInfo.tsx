import { Profile } from '../MyAccount/MyAccountType';
import { NA, RAND_NUMBER } from '../../constants';
import ImageLoader from '../ImageLoader/ImageLoader';

/**
 * Converts provided date in a readable way
 * @param createdAt: string
 */
const readableDate = (createdAt: string):string => {
  if (createdAt === '') {
    return '-';
  }

  return new Date(createdAt).toLocaleString('en-us',{ month:'short', day: 'numeric', year:'numeric'});
}

/**
 * Displays logged in user data
 * @param props
 * @constructor
 */
export default function MyAccountInfo( { props }: { props: Profile }) {
  const { firstname, lastname, photo, bio, city, createdAt, weight } = props;

  return (
     <>
       <div className="flex justify-center">
         <h1>Hello { firstname }!</h1>
       </div>
       <div className="flex justify-center pt-10">
         <ImageLoader src={ photo } alt="Profile" styles="size-24 rounded-full border-4 border-amber-500"/>
       </div>
       <div className="grid grid-cols-2 gap-4 pt-10">
         <div className="border-b-2 border-lime-900 text-right">Full name</div>
         <div className="border-b-2 border-lime-900">{ firstname } { lastname }</div>
         <div className="border-b-2 border-lime-900 text-right">Bio</div>
         <div className="border-b-2 border-lime-900">{ (bio === '') ? NA: bio }</div>
         <div className="border-b-2 border-lime-900 text-right">Current City</div>
         <div className="border-b-2 border-lime-900">{ (city === '') ? NA: city }</div>
         <div className="border-b-2 border-lime-900 text-right">Weight</div>
         <div className="border-b-2 border-lime-900">{ (!weight) ? RAND_NUMBER: weight } muffins</div>
         <div className="border-b-2 border-lime-900 text-right">Enjoys strava since</div>
         <div className="border-b-2 border-lime-900">{ readableDate(createdAt) }</div>
       </div>
     </>
  );
}
