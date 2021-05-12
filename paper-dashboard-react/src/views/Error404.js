
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

class Error404 extends React.Component {
  render() {
    return (
      <>
        <div className="content">
            <h3>Erro404: Página não encontrada</h3>          
        </div>
      </>
    );
  }
}

export default Error404;
