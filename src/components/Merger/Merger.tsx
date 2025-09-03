import MergerForm from '../MergerForm/MergerForm';

export default function Merger() {
  return (
    <div className="h-full flex flex-col p-10 sm:bg-gradient-to-r from-amber-100 to-lime-100">
      <div className="flex justify-center">
        <h1>Merge Activities</h1>
      </div>
      <MergerForm />
    </div>
  )
}
