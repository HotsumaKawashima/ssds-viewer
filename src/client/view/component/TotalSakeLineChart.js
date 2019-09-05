import React from 'react';
import useTheme from '@material-ui/styles/useTheme';
import { ResponsiveContainer } from 'recharts';
import { LineChart } from 'recharts';
import { BarChart } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { Line } from 'recharts';
import { Bar } from 'recharts';
import { Brush } from 'recharts';

export default ({ ssdsModel }) => {
  const theme = useTheme();
  const data = ssdsModel.sumSales(['DATE']).sort('DATE');

  return data.getValue().length === 0 ? null : (
    <ResponsiveContainer>
      <LineChart data={data.getValue()}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='DATE'/>
        <YAxis />
        <Tooltip />
        <Line
          name='売上合計'
          dataKey='SUM'
          stroke={ theme.graph.main }
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
