// TO BE CREATED
export default function Loader({ isLoading = true}) {
  if (isLoading) {
    return (
     <div className="fixed inset-y-0 inset-x-0 h-full w-full bg-amber-300 bg-opacity-40 grid place-content-center">
       <span className="z-10">🌀 Loading...🌀</span>
     </div>
    )
  }

  return (<></>);
}