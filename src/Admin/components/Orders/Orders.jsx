import React, { useEffect, useState } from 'react'
import Configurator from '../CMConfigurator/Configurator'
import Table from '../ComndTable/Table'
import { useGetCommandesQuery } from '../../../services/CommandeApi';

const Orders = () => {

  const [LigneInfo, setLigneInfo] = useState([]);
  const [updatedLigneInfo, setUpdatedLigneInfo] = useState([]);
  const [setingFilter, setsetingFilter] = useState([]);
  const [filters, setFilters] = useState({
    Confirmed: true,
    Refuse: true,
    Waiting: true,
    accepted: true,
    the_most_recent: true,
    the_oldest: false
  });

  const { data: Orders, isFetching ,refetch} = useGetCommandesQuery();

  useEffect(() => {
    if (!isFetching && Orders)
      console.log(Orders);
  }, [Orders]);

  useEffect(() => {
    if (!isFetching && Orders) {
      const newLigneInfo = Orders.data.map(order => {
        let total = 0;
        order.details.forEach(element => {
          total += (element.article.puv * element.quantite);
        });
        return {
          NbPrd: order.details.length,
          totalPrd: total,
          clientName: `${order.client.nom} ${order.client.prenom}`,
          clientNumber: order.client.contact,
          clientAdresse: order.client.adresse,
          clientEmail: order.client.email,
          Status: order.status,
          date: order.updatedAt,
          id: order.id,
          details: order.details,
        };
      });
      setUpdatedLigneInfo(newLigneInfo);
    }
  }, [Orders]);

  useEffect(() => {
    const myFilterSett = Object.keys(filters).filter(key => (filters[key] === true) && key !== 'the_most_recent' && key !== 'the_oldest');
    let filteredData = updatedLigneInfo.filter(order => {
      const status = order.Status; // Suppose que 'Status' est l'attribut à filtrer
      const isConfirmed = filters.Confirmed && status === 'validé';
      const isRefused = filters.Refuse && status === 'refusé';
      const isWaiting = filters.Waiting && status === 'En attente';
      const isaccepte = filters.accepted && status === 'accepté';

      // Filtrer en fonction de l'état des filtres
      return (isConfirmed || isRefused || isWaiting || isaccepte);
    });

    // Tri des données en fonction de la date
    if (filters.the_most_recent) {
      filteredData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
    } else if (filters.the_oldest) {
      filteredData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date)); // Tri par date croissante
    }

    setsetingFilter(filteredData);
  }, [updatedLigneInfo, filters]);

  console.log(updatedLigneInfo)

  useEffect(() => {
    setLigneInfo(setingFilter);
  }, [setingFilter, filters]);

  // [{ NbPrd: null, totalPrd: null, clientName: '', clientNumber: '', Status: '',date:''}]
  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <Configurator filters={filters} setFilters={setFilters} />
      <Table LigneInfo={LigneInfo} setLigneInfo={setLigneInfo} refetch={refetch}/>
    </main>
  )
}

export default Orders
