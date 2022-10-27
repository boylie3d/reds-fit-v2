import { Result } from "@/types"
import {
  BarElement,
  CategoryScale,
  Chart,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { DateTime, Interval } from "luxon"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { colors } from "theme"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
Chart.register(ChartDataLabels)
interface Props {
  results: Result[]
}

const ActivityGraph = ({ results }: Props) => {
  const [data, setData] = useState<ChartData<"bar"> | undefined>()

  const options = {
    responsive: true,
    animation: {},
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          precision: 0,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        color: "#FFFFFF",
        anchor: "end",
        clamp: true,
        align: "bottom",
        clip: true,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  useEffect(() => {
    const now = DateTime.now()
    const before = now.minus({ weeks: 10 })
    const interval = Interval.fromDateTimes(before, now)
    const labels = interval
      .splitBy({ week: 1 })
      .map(d => `${d.end.monthShort} ${d.end.day}`)

    const groups = interval.splitBy({ week: 1 }).map(g => {
      const filter = results.filter(r => {
        const date = DateTime.fromISO(r.created!.toString())
        if (g.contains(date)) {
          return r
        }
      })
      return filter.length
    })

    // const chart = new Chart("activity", {
    //   options: {
    //     responsive: true,
    //     scales: {
    //       x: {
    //         grid: {
    //           display: false,
    //         },
    //       },
    //       y: {
    //         ticks: {
    //           precision: 0,
    //         },
    //         grid: {
    //           display: false,
    //         },
    //       },
    //     },
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //   },
    //   data: {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: "Results for Week",
    //         data: groups,
    //         backgroundColor: `${colors.teamPrimary}BF`,
    //       },
    //     ],
    //   },
    // })
    const chartData: ChartData<"bar"> = {
      labels: labels,
      datasets: [
        {
          label: "Results for Week",
          data: groups,
          backgroundColor: `${colors.teamPrimary}BF`,
        },
      ],
    }

    setData(chartData)
  }, [])

  if (!data) return <div />

  return <Bar options={options} data={data} />
}

export default ActivityGraph
