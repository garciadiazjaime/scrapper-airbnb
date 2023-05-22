import { useEffect, useState } from "react";
import { Table, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';



import { getPlaces } from "../modules/support/place";

const parser = (data) => {
  return data.map(item => {
    const place = JSON.parse(item.content)

    return {
      ...place,
    }
  })
}

const snakeCaseToTitle = (value) => value.replace(/_/g, " ")

const priceCleaner = (value) => value.split(" per night")[0]

const getPriceAverage = (places) => {
  const summary = places.reduce((accu, item, index) => {
    const price = priceCleaner(item.pricingQuote.structuredStayDisplayPrice.primaryLine.accessibilityLabel).replace(/\D/g, '')
      if (accu.max < price) {
        accu.max = price
      }

      if (accu.min > price) {
        accu.min = price
      }

    accu.avg += parseInt(price)

    if (index === places.length - 1) {
      accu.avg /= places.length
    }

    return accu
  }, {
    avg: 0,
    max: 0,
    min: Infinity
  })

  return [summary]
}

const priceLocale = Intl.NumberFormat('en-US');

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaces().then((places) => {
      setPlaces(parser(places.Items));
    }).finally(() => {
      setLoading(false)
    });
  }, []);

  const columns = [
    {
      title: '#',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Rating',
      render: (_text, record) => record.listing.avgRatingLocalized,
    },
    {
      title: 'Price (per night)',
      render: (_text, record) => priceCleaner(record.pricingQuote.structuredStayDisplayPrice.primaryLine.accessibilityLabel)
    },
    {
      title: 'Name',
      render: (_text, record) => record.listing.name,
    },
    {
      title: 'Category',
      render: (_text, record) => record.listing.title,
    },
    {
      title: 'Badge',
      render: (_text, record) => record.listing.formattedBadges.map(item => item.text),
    },
    {
      title: 'Space',
      render: (_text, record) => record.listing.structuredContent.primaryLine?.map(item => item.body),
    },
    {
      title: 'Type',
      render: (_text, record) => snakeCaseToTitle(record.listing.roomTypeCategory),
    },
    {
      title: 'City',
      render: (_text, record) => record.listing.city,
    },
    {
      title: 'Ver',
      render: (_text, record) => <Button href={`https://www.airbnb.com/rooms/${record.listing.id}`}  icon={<LinkOutlined />} target="_blank" />,
    },
  ]

  const pagination = {
    defaultPageSize: 100
  }

  const summary = getPriceAverage(places)

  const columnsSummary = [
    {
      title: 'Avg',
      render: (_text, record) => `$${priceLocale.format(record.avg)} MXN`,
    },
    {
      title: 'Min',
      render: (_text, record) => `$${priceLocale.format(record.min)} MXN`,
    },
    {
      title: 'Max',
      render: (_text, record) => `$${priceLocale.format(record.max)} MXN`,
    },
  ]


  return <div>
    <Table columns={columnsSummary} dataSource={summary} loading={loading} pagination={false} />
    <br />
    <br />
    <Table columns={columns} dataSource={places} loading={loading} pagination={pagination} />
  </div> 
};

export default Places;
