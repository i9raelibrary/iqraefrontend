import React, { useEffect, useState } from 'react'
import { useGetCommandesQuery, useUpdateCommandMutation } from '../../../services/CommandeApi';
import PhotoshopAlert from '../Alert/alert'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'


const Notifications = () => {
  const { data: Orders, isFetching, refetch } = useGetCommandesQuery();
  const [updateCommand, { isLoading, isSuccess }] = useUpdateCommandMutation();
  const [LigneInfo, setLigneInfo] = useState([]);
  const [updatedLigneInfo, setUpdatedLigneInfo] = useState([]);
  const [setingFilter, setsetingFilter] = useState([]);
  const [filters, setFilters] = useState({
    Waiting: true
  });
  const [All, SetAll] = useState([]);
  const [Onecmd, SetOnecmd] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handelAccAll = () => {
    setShowAlert(true)
  };

  useEffect(() => {
    if (!isFetching && Orders)
      console.log("orders : !!!",Orders);
  }, [Orders]);

  useEffect(() => {
    if (!isFetching && Orders) {
      const newLigneInfo = Orders.data.map(order => {
        let total = 0;
        order.details.forEach(element => {
          total += (element.prixUnitaire * element.quantite);
        });

        return {
          NbPrd: order.details.length,
          totalPrd: order.prixTotal,
          clientName: `${order.client.nom} ${order.client.prenom}`,
          clientNumber: order.client.contact,
          Status: order.status,
          id: order.id,
          date: new Date(order.updatedAt).toISOString().split('T')[0]
        };
      });
      setUpdatedLigneInfo(newLigneInfo);
    }
  }, [Orders]);

  useEffect(() => {
    const myFilterSett = Object.keys(filters).filter(key => (filters[key] === true) && key !== 'the_most_recent' && key !== 'the_oldest');
    const filteredData = updatedLigneInfo.filter(order => {
      const status = order.Status;
      const isWaiting = filters.Waiting && status === 'En attente';
      return (isWaiting);
    });

    setsetingFilter(filteredData)
    console.log("filtered data : ", filteredData);
  }, [updatedLigneInfo, filters, Orders]);

  useEffect(() => {
    setLigneInfo(setingFilter);
  }, [setingFilter, LigneInfo, filters]);


  const handleAcceptCommand = async (id, newStatus) => {
    console.log("the id of commande is : ", id);
    try {
      const result = await updateCommand({ id, newStatus }).unwrap();
      if (result.success) {
        toast.success(result.message);

        refetch();
      } else {
        toast.error(result.message + newStatus);
        console.log("myerror" + result.error);
      }
    } catch (error) {
      console.log(error);
    }

  }

 console.log(LigneInfo)
  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <div className="row d-flex justify-content-center mt-2">
        {LigneInfo && LigneInfo.length > 0 ? (
          <div className="col-12">
            <div className="card mb-4">
              <div className="d-flex justify-content-between card-header pb-0">
                <h6>Notifications</h6>
                <Button
                  variant="outlined"
                  onClick={() => handelAccAll()}
                >
                  Accepted All
                </Button>
                {showAlert && (
                  <PhotoshopAlert
                    message="You want to accept All commandes !"
                    onClose={() => setShowAlert(false)}
                  />
                )}
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
                                {order.date}
                              </span>
                            </td>
                            <td className="align-middle" onClick={() => { handleAcceptCommand(order.id, "accepté") }}>
                              <Button variant="contained">Accept</Button>
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
    </main>
  )
}

export default Notifications
