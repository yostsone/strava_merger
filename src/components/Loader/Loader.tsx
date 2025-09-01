export default function Loader({ isLoading = true, info = 'Loading...' }) {
  if (isLoading) {
    return (
     <div className="fixed inset-y-0 inset-x-0 h-full w-full bg-amber-300 bg-opacity-40 grid place-content-center">
       <div className="flex flex-col items-center h-20">
         <div className="relative flex h-20 w-20 items-center justify-center">
           <div className="h-10 w-10 bg-amber-500 rounded-full animate-ping absolute"/>
           <div className="h-10 w-10 bg-amber-500 rounded-full relative"/>
         </div>
         <p className="mt-4">{ info }</p>
       </div>
     </div>
    )
  }

  return (<></>);
}