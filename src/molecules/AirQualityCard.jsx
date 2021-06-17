import React from 'react';
import { Card } from 'semantic-ui-react';

const AirQualityCard = ({ itemDetails }) => {
  const { stations } = itemDetails;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{ stations[0].name }</Card.Header>
        <Card.Description>
          <p>Scale: {stations[0].indexes[0].scale}</p>
          <p>Value: {stations[0].indexes[0].value}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default AirQualityCard;