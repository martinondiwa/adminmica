import React from 'react'
import { Col, Row } from 'antd'


export const Home = () => {
  return (
    <div >
      <Row>
        <col
        xs={24}
        sm={24}
        xl={8}
        style={{
            height: '460px'
        }}
        >
            CalenderUpcomingEvents
        </col>
          <col
        xs={24}
        sm={24}
        xl={8}
        style={{
            height: '460px'
        }}
        >
         DashboardDealsChart
        </col>
      </Row>
    </div>
  )
}


