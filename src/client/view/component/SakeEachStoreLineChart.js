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
  const data = ssdsModel.sumSales(['STORE NUMBER', 'DATE']).spread('DATE', 'STORE NUMBER', 'SUM', 0).sort('DATE');

  return data.getValue().length === 0 ? null : (
    <ResponsiveContainer>
      <LineChart data={data.getValue()}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='DATE'/>
        <YAxis />
        <Tooltip wrapperStyle={{zIndex: 1500}}/>
        {
          ssdsModel.getStoreLines().map((value, index) =>
            <Line
              key={value['STORE NUMBER']}
              dataKey={value['STORE NUMBER']}
              name={value['STORE NAME']}
              stroke={ theme.graph.lineColors(index) }
            />
          )
        }
      </LineChart>
    </ResponsiveContainer>
  );
}
