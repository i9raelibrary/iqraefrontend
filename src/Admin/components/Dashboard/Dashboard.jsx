import React, { useEffect, useState } from "react";
import Card from '../Card/Card'
import BarGraph from '../BarGraph/BarGraph'
import DashboardGraph from '../Graph/Graph'
import axios from "axios";
import CommentsST from '../CommentsStat/CommentsST'
import { useFetchStatisticsQuery, useFetchClientStatisticsQuery, useFetchProductStatisticsQuery } from "../../../services/AdminApi";
import './DashBoard.css'
import {LodingCircular} from '../../../components/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = () => {
  // const [data, setData] = useState([
  //   { id: '1', Cardname: "Today's Money", cardVall: "0 MAD", rank: 0 },
  //   { id: '2', Cardname: "Today's Clients", cardVall: "0", rank: 0 },
  //   { id: '3', Cardname: "Today's Products", cardVall: "0", rank: 0 },
  //   { id: '4', Cardname: "Today's Commandes", cardVall: "0", rank: 0 }
  // ]);
  const {data, isFetching} = useFetchStatisticsQuery();
  const {data: clientStats, isLoading} = useFetchClientStatisticsQuery();
  const {data: productStats, isJaying} = useFetchProductStatisticsQuery();
  const [Values, SetValues] = useState([]);
  const [Days, setDays] = useState([]);
  const [ValuesProds, SetValuesProds] = useState([]);
  const [DaysProds, setDaysProds] = useState([]);
  const CommntData = [
    {
      id: 1,
      porsent : 60,
      CmStatus : "positive"
    },
    {
      id: 1,
      porsent : 30,
      CmStatus : "Neutral"
    },
    {
      id: 1,
      porsent : 10,
      CmStatus : "Negative"
    }
  ]

  useEffect(()=>{
    if (clientStats && clientStats.success) {
      const data = clientStats.last7DaysCommands;
      const values = data.map((item) => item.count);
      const days = data.map((item)=> item.day.slice(0,3).toUpperCase());
      SetValues(values);
      setDays(days);
    }
    if (productStats && productStats.success) {
      const dataProds = productStats.last7DaysCommands;
      const valuesProds = dataProds.map((item) => item.count);
      const daysProds = dataProds.map((item)=> item.day.slice(0,3).toUpperCase());
      SetValuesProds(valuesProds);
      setDaysProds(daysProds);
    }
  },[productStats]);

  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <div className="container-fluid py-2">
        <div className="row">
          <div className="ms-3">
            <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
            <p className="mb-4">
            Check sales, value and stay up to date with bounce rate per week.
            </p>
          </div>
          {data ? data?.map(cardInfo => (
            <Card
              key={cardInfo.id}
              Cardname={cardInfo.Cardname}
              cardVall={cardInfo.cardVall}
              rank={cardInfo.rank}
            />
          )) : <LodingCircular/>}
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mt-4 mb-4">
            <BarGraph />
          </div>
          <div className="col-lg-4 col-md-6 mt-4 mb-4">
            <DashboardGraph graphName="Clients's statistics" Desc="Last Campaign Performance" arr={Days} arr2={Values} />
          </div>
          <div className="col-lg-4 mt-4 mb-3">
            <DashboardGraph graphName="Product's statistics" Desc="Last Campaign Performance" arr={DaysProds} arr2={ValuesProds} />
          </div>
        </div>
        <div className="row">
        <div className="col-lg-6 col-md-6 mt-2 mb-4">
          <CommentsST CommntData = {CommntData} />
        </div>
          <div className="col-lg-6 col-md-6 mt-2 mb-4">
          <div className="card h-100 p-3">
            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100"
                            style={{
                              backgroundImage: `url('https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                          }}>
              <span className="mask bg-gradient-dark"></span>
              <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <h5 className="text-white font-weight-bolder mb-4 pt-2">Work with hard</h5>
                <p className="text-white">Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.</p>
                <a class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                  Read More
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard