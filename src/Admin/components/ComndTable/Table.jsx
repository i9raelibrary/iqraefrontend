import React, { useState } from 'react';
import { OrderDetails } from '../OrderInfo/OrderDetailes'
import { Box } from '@mui/material';

const Table = ({ LigneInfo, setLigneInfo, refetch }) => {

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [details, SetDetails] = useState({});
  // console.log(LigneInfo);

  return (
    <>
      <div className="row d-flex justify-content-center mt-2">
        {LigneInfo && LigneInfo.length > 0 ? (
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Order table</h6>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Product
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Client
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Command at
                        </th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {LigneInfo.map((order, item) => {
                        return (
                          <tr key={item}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Number of Products : {order.NbPrd}</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    Total : {order.totalPrd}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">{order.clientName}</p>
                              <p className="text-xs text-secondary mb-0">
                                {order.clientNumber}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              {order.Status == "accepté" ? <span className="badge badge-sm bg-gradient-info">{order.Status}</span>
                                : (order.Status == "En attente" ? <span className="badge badge-sm bg-gradient-secondary">{order.Status}</span>
                                  : (order.Status == "refusé" ? <span className="badge badge-sm bg-gradient-danger">{order.Status}</span>
                                    : (order.Status == "validé" ? <span className="badge badge-sm bg-gradient-success">{order.Status}</span>
                                      : null
                                    )
                                  )
                                )
                              }
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {new Date(order.date).toLocaleString()}
                              </span>
                            </td>
                            <td className="align-middle">
                              <button
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                                onClick={(e) => {
                                  setShowOrderDetails(true);

                                  SetDetails(order);
                                  
                                }}
                              >
                                Info
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className='border-radius-lg bg-white shadow height-100 d-flex justify-content-center align-items-center mt-7 h2 w-90'>No orders</p>
        )}
      </div>
      {showOrderDetails &&
        <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1500 }}>
          <OrderDetails setShowOrderDetails={setShowOrderDetails} details={details} refetch={refetch} />
        </Box>
      }
    </>
  );
};

export default Table;
