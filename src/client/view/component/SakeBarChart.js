import React from 'react';
import useTheme from '@material-ui/styles/useTheme';
import { ResponsiveContainer } from 'recharts';
import { BarChart } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { Bar } from 'recharts';

export default ({ ssdsModel }) => {
  const theme = useTheme();
  const data = ssdsModel.sumSales(['SKU']).sort('BRAND NAME');

  return data.getValue().length === 0 ? null : (
    <ResponsiveContainer>
      <BarChart data={data.getValueWithSakeDisplayName()}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='SAKE DISPLAY NAME' />
        <YAxis />
        <Tooltip/>
        <Bar
          name='売上数'
          dataKey='SUM'
          fill={ theme.graph.main }
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
