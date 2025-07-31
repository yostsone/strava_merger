import { Profile } from '../MyAccount/MyAccountType';

export default function MyAccountInfo( { props }: { props: Profile }) {
  const { firstname, lastname, photo, bio, city, createdAt, weight } = props;

  return (
     <>
       <div className="flex justify-center">
         <h1>Hello { firstname }!</h1>
       </div>
       <div className="flex justify-center pt-10">
         <img className="size-24 rounded-full border-4 border-indigo-500" src={ photo } alt="Profile"/>
       </div>
       <div className="grid grid-cols-2 gap-4 pt-10">
         <div className="border-b-2 border-emerald-900 text-right">Full name</div>
         <div className="border-b-2 border-emerald-900">{ firstname } { lastname }</div>
         <div className="border-b-2 border-emerald-900 text-right">Bio</div>
         <div className="border-b-2 border-emerald-900">{ bio }</div>
         <div className="border-b-2 border-emerald-900 text-right">Current City</div>
         <div className="border-b-2 border-emerald-900">{ city }</div>
         <div className="border-b-2 border-emerald-900 text-right">Weight</div>
         <div className="border-b-2 border-emerald-900">{ weight }</div>
         <div className="border-b-2 border-emerald-900 text-right">Enjoys strava since</div>
         <div className="border-b-2 border-emerald-900">{ readableDate(createdAt) }</div>
       </div>
     </>
  );
}

const readableDate = (createdAt: string):string => {
  if (createdAt === '') {
    return '-';
  }

  return new Date(createdAt).toLocaleString('en-us',{ month:'short', day: 'numeric', year:'numeric'});
}
