import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as itemsActions from '../actions/itemsActions';
import { Grid, Card } from 'semantic-ui-react';
import AirQualityCard from '../molecules/AirQualityCard';
import InfiniteScroll from 'react-infinite-scroller';


//deberia ir en un .env
const API_URL = 'https://api.datos.gob.mx/v1/calidadAire';

const AirQualityList = (props) => {

  const [currentPage, currentPageSet] = useState(1);
  const [totalPages, totalPagesSet] = useState(1);

  const getItems = async (page) => {
    const { data } = await axios.get(
      `${API_URL}?page=${page}`
    ).catch(error => { })

    // addItems
    props.addItems(data.results);
    currentPageSet(data.pagination.page);

    const totalPagesCalc = Math.ceil(data.pagination.total / data.pagination.pageSize);
    console.log('totalPagesCalc', totalPagesCalc);
    totalPagesSet(data.pagination.totalPages);
  }

  useEffect(() => {
    if (!props?.items || !props?.items.length) {
      getItems(1);
    }
  })

  return (
    <InfiniteScroll
      pageStart={currentPage}
      loadMore={() => { getItems(currentPage + 1) }}
      hasMore={true || false}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <Grid>
        <Grid.Row columns={5}>
          {props.items !== null ? props.items.map((item, index) => (
            <Grid.Column key={index} style={{ margin: 5 }}>
              <Card.Group>
                <AirQualityCard itemDetails={item} />
              </Card.Group>
            </Grid.Column>
          )) : []}
        </Grid.Row>
      </Grid>
    </InfiniteScroll>
  )
}


const mapStateToProps = ({ itemsReducer }) => {
  return { items: itemsReducer.items };
};

const mapDispatchToProps = {
  ...itemsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(AirQualityList);