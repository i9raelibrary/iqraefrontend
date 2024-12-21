import React, { useState, useEffect } from 'react';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Clients.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useFetchAllClientsQuery } from '../../../services/ClientApi.js';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteClientMutation } from '../../../services/AdminApi.js';

const Clients = () => {
  const { data: clientsData, isLoading, error } = useFetchAllClientsQuery();
  const [searchValue, setSearchValue] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [DeleteClient, { isLoading: deleteLoading, isError }] = useDeleteClientMutation();

  useEffect(() => {
    if (!isLoading && clientsData) {
      setClients(clientsData);
      setFilteredClients(clientsData);
      console.log("houssine - clientsData", clientsData);
    }
    if (error) {
      console.log("houssine - error", error.message);
    }
  }, [clientsData, isLoading, error]);

  useEffect(() => {
    setFilteredClients(
      clients.filter(
        (client) =>
          client.nom?.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.prenom?.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.contact?.includes(searchValue)
      )
    );
  }, [searchValue, clients]);

  const deleteClient = async (id) => {
    const result = await DeleteClient({ id }).unwrap();
    if (result.data.success) {
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
      console.log(result.data.error);
    }
  }

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg w-100">
      <nav className="mt-2 navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
          <div className="dearchInpo ms-md-auto pe-md-3 d-flex align-items-center w-100">
            <div className="input-group input-group-outline ">
              <input type="text"
                placeholder='Search'
                className="form-control"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-slate-700 shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Our Clients</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Information</th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="ml-2 d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{client.nom ?? 'Pas de '} {client.prenom ?? 'nom'}</h6>
                                <p className="text-xs text-secondary mb-0">{client.email}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );


};

export default Clients;
