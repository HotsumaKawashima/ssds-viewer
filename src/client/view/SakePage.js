import React, { useEffect } from 'react'
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import useRadioSelect from './component/useRadioSelect';
import useTableSortLabel from './component/useTableSortLabel';
import useMultiPulldownMenu from './component/useMultiPulldownMenu';
import usePulldownMenu from './component/usePulldownMenu';
import TotalSakeLineChart from './component/TotalSakeLineChart';
import SakeLineChart from './component/SakeLineChart';
import SakeEachCityLineChart from './component/SakeEachCityLineChart';
import SakeEachStoreLineChart from './component/SakeEachStoreLineChart';
import SakeBarChart from './component/SakeBarChart';
import SakeEachCityBarChart from './component/SakeEachCityBarChart';
import SakeEachStoreBarChart from './component/SakeEachStoreBarChart';
import DateTable from './component/DateTable';
import SakeTable from './component/SakeTable';
import StoreTable from './component/StoreTable';
import CityTable from './component/CityTable';

export const SakePage = ({ ssdsStore, historyModel, history }) => {

  useEffect(() => {
    ssdsStore.update();
  }, []);

  historyModel.setHistory(history);

  const [ TableSortLabel, sortState ] = useTableSortLabel('BRAND NAME');
  const [ ChartRadioSelect, chartRadioState ] = useRadioSelect(historyModel, 'chart-type', '総売上LineChart');
  const [ TableRadioSelect, tableRadioState ] = useRadioSelect(historyModel, 'table-type', '日付');
  const [ TopDatePulldownMenu, topDateState ] = usePulldownMenu();
  const [ BottomDatePulldownMenu, buttomDateState ] = usePulldownMenu();
  const [ NewStoreDatePulldownMenu, NewStoreDateState ] = usePulldownMenu();
  const [ SakePulldownMenu, sakeState ] = useMultiPulldownMenu(historyModel, 'sake-filter');
  const [ StorePulldownMenu, storeState ] = useMultiPulldownMenu(historyModel, 'store-filter');
  const [ CityPulldownMenu, cityState ] = useMultiPulldownMenu(historyModel, 'city-filter');
  const [ DatePulldownMenu, dateState ] = useMultiPulldownMenu(historyModel, 'date-filter');

  const ssdsModel = ssdsStore.getModel();
  const filtered = ssdsModel
    .filterWithNewStores(NewStoreDateState)
    .filterOr('SKU', sakeState)
    .filterOr('STORE NUMBER', storeState)
    .filterOr('CITY', cityState)
    .filterWithDates(topDateState, buttomDateState);

  return (
    <Grid container spacing={1}>

      <Grid item xs={12} container>
        <Grid item container direction='column' alignItems='center'>
          <Grid item>
            <ChartRadioSelect label='総売上LineChart' />
            <ChartRadioSelect label='酒名LineChart' />
            <ChartRadioSelect label='店名LineChart' />
            <ChartRadioSelect label='地域名LineChart' />
            <ChartRadioSelect label='酒名BarChart' />
            <ChartRadioSelect label='店名BarChart' />
            <ChartRadioSelect label='地域名BarChart' />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Box height={300} pr={6}>
        { chartRadioState === '総売上LineChart' && <TotalSakeLineChart ssdsModel={filtered} />     }
        { chartRadioState === '酒名LineChart'   && <SakeLineChart ssdsModel={filtered} />          }
        { chartRadioState === '店名LineChart'   && <SakeEachStoreLineChart ssdsModel={filtered} /> }
        { chartRadioState === '地域名LineChart' && <SakeEachCityLineChart ssdsModel={filtered} />  }
        { chartRadioState === '酒名BarChart'    && <SakeBarChart ssdsModel={filtered} />           }
        { chartRadioState === '店名BarChart'    && <SakeEachStoreBarChart ssdsModel={filtered} />  }
        { chartRadioState === '地域名BarChart'  && <SakeEachCityBarChart ssdsModel={filtered} />   }
        </Box>
      </Grid>

      <Grid item xs={11} container>
        <Grid item container alignItems='center' spacing={1}>
            <Grid item xs={2}>
              <Box textAlign='center'>
                日付
              </Box>
            </Grid>

            <Grid item xs={10}>
              <Box display='flex'>
                <Box width={90}>
                  <TopDatePulldownMenu width={300} options={ ssdsModel.getDateOptions() } />
                </Box>
                <Box width={90} textAlign='center'>
                  から
                </Box>
                <Box width={90}>
                  <BottomDatePulldownMenu options={ ssdsModel.getDateOptions() } />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={2}>
              <Box textAlign='center'>
                新規顧客
              </Box>
            </Grid>

            <Grid item xs={10}>
              <Box width={90}>
                <NewStoreDatePulldownMenu width={300} options={ ssdsModel.getDateOptions() } />
              </Box>
            </Grid>

            <Grid item xs={2}>
              <Box textAlign='center'>
                酒名
              </Box>
            </Grid>

            <Grid item xs={10}>
               <SakePulldownMenu options={ ssdsModel.getSakeOptions() } />
            </Grid>

            <Grid item xs={2}>
              <Box textAlign='center'>
                店名
              </Box>
            </Grid>

            <Grid item xs={10}>
              <StorePulldownMenu options={ ssdsModel.getStoreOptions() } />
            </Grid>

            <Grid item xs={2}>
              <Box textAlign='center'>
                地域名
              </Box>
            </Grid>

            <Grid item xs={10}>
              <CityPulldownMenu options={ ssdsModel.getCityOptions() } />
            </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>

        <Box pl={9}>
          <TableRadioSelect label='日付' />
          <TableRadioSelect label='酒名' />
          <TableRadioSelect label='店名' />
          <TableRadioSelect label='地域名' />
        </Box>

        <Box px={6}>
          { tableRadioState === '日付'   && <DateTable ssdsModel={filtered} /> }
          { tableRadioState === '酒名'   && <SakeTable ssdsModel={filtered} /> }
          { tableRadioState === '店名'   && <StoreTable ssdsModel={filtered} /> }
          { tableRadioState === '地域名' && <CityTable ssdsModel={filtered} /> }
        </Box>
      </Grid>

    </Grid>
  )
}

export default inject('ssdsStore', 'historyModel')(observer(SakePage));
