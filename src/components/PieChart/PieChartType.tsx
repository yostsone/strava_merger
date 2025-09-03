export type Measure = {
  distance: Activity[]
  amount: Activity[]
}

export type Activity = {
  label: ActivityType
  value: number
}

type ActivityType = 'run' | 'swim' | 'ride';