'use client';

import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from '@/components';

type ChartDataProps = {
  categories: string[];
  series: Highcharts.SeriesOptionsType[];
};

export function GraficoVendasAfiliado({ categories, series }: ChartDataProps) {
  const options: Options = {
    chart: {
      zooming: {
        type: 'xy',
      },
      backgroundColor: 'transparent',
      height: 400,
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    xAxis: [
      {
        categories,
        crosshair: true,
        labels: {
          style: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
        },
      },
    ],
    yAxis: [
      {
        visible: false,
      },
      {
        visible: false,
        linkedTo: 0,
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            color: '#ffffff',
          },
        },
        borderRadius: 4,
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    series,
  };

  return (
    <Card.Root className="bg-gradient-to-br from-cyan-300 to-blue-500 dark:from-cyan-700 dark:to-blue-900">
      <Card.Header>
        <Card.HeaderSection>
          <Card.Label title="Suas vendas nos últimos 6 meses" />
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card.Body>
    </Card.Root>
  );
}
