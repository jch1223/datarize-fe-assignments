import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

interface BrushBarChartProps<T extends object> {
  data: T[]
  xAxisKey: keyof T
  yAxisKey?: keyof T
  barDataKeys: (keyof T)[]
  tooltipOptions?: TooltipProps<ValueType, NameType>
}

export const BarChart = <T extends object>({
  data,
  barDataKeys,
  xAxisKey,
  yAxisKey,
  tooltipOptions,
}: BrushBarChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey.toString()} />
        <YAxis dataKey={yAxisKey?.toString()} />
        <Tooltip {...tooltipOptions} />
        {barDataKeys.map((key) => (
          <Bar key={key.toString()} dataKey={key.toString()} fill="#8884d8" />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
