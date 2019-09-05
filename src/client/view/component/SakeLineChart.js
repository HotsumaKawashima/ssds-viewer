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
import { Brush } from 'recharts';

export default ({ ssdsModel }) => {
  const theme = useTheme();
  const data = ssdsModel.sumSales(['SKU', 'DATE']).spread('DATE', 'SKU', 'SUM', 0).sort('DATE');

  return data.getValue().length === 0 ? null : (
    <ResponsiveContainer>
      <LineChart data={data.getValue()}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='DATE'/>
        <YAxis />
        <Tooltip wrapperStyle={{zIndex: 1500}}/>
        {
          ssdsModel.getSakeLines().map((value, index) =>
            <Line
              key={value['SKU']}
              dataKey={value['SKU']}
              name={value['SAKE DISPLAY NAME']}
              stroke={ theme.graph.lineColors(index) }
            />
          )
        }
      </LineChart>
    </ResponsiveContainer>
  );
}
