import AppLayout from "components/layout/appLayout"
import CalendarBar from "components/misc/calendarBar"
import { useState } from "react"

export default function Home() {
  const [calDate, setCalDate] = useState<Date>(new Date())

  return (
    <AppLayout>
      <CalendarBar date={calDate} onChanged={setCalDate} />
    </AppLayout>
  )
}
