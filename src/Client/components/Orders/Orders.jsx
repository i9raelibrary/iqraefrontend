import React, { useEffect, useState } from 'react'
import Configurator from './Configurator/Configurator'
import Table from './Table/Table'
import { useGetCommandesQuery } from '../../../services/CommandeApi';
import { useFindCurrentClientMutation } from '../../../services/ClientApi';

const Orders = () => {
  const [LigneInfo, setLigneInfo] = useState([]);
  const [updatedLigneInfo, setUpdatedLigneInfo] = useState([]);
  const [setingFilter, setsetingFilter] = useState([]);
  const [filters, setFilters] = useState({
    Confirmed: true,
    Refuse: true,
    Waiting: true,
    accepted: true,
    the_most_recent: false,
    the_oldest: false
  });
  const [All, SetAll] = useState([]);
  const [Onecmd, SetOnecmd] = useState({});
  const [clientOrders, setClientOrders] = useState([]);
  const { data: Orders, isFetching, refetch } = useGetCommandesQuery();
  const [findCurrentClient, { isLoading }] = useFindCurrentClientMutation();
  const id = localStorage.getItem("ClientToken");

  useEffect(() => {
    if (!isFetching && Orders)
      console.log(Orders);
    refetch();
  }, [Orders]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!id) throw new Error("ClientToken is missing");

        // Récupérer le client courant
        const user = await findCurrentClient({ id }).unwrap();
        if (!user) {
          console.log("Aucun utilisateur trouvé !");
          return;
        }

        // Filtrer les commandes du client courant
        const filteredOrders = Orders?.data.filter((order) => order.clientId === user.id);
        console.log("filteredOrders :", filteredOrders);

        // Mettre à jour l'état `clientOrders`
        setClientOrders(filteredOrders);

        // Générer les informations pour chaque commande
        if (filteredOrders?.length > 0) {
          const newLigneInfo = filteredOrders.map((order) => {
            let total = 0;
            order.details.forEach((element) => {
              total += (element.article.puv * element.quantite);
            });

            return {
              NbPrd: order.details.length,
              totalPrd: total,
              clientName: `${order.client.nom} ${order.client.prenom}`,
              clientNumber: order.client.contact,
              Status: order.status,
              details: order.details,
              date: new Date(order.updatedAt).toISOString().split("T")[0],
            };
          });
          setUpdatedLigneInfo(newLigneInfo);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    if (!isFetching && Orders) {
      fetchUserData();
    }
  }, [Orders, id, isFetching, findCurrentClient]);


  useEffect(() => {
    const myFilterSett = Object.keys(filters).filter(key => (filters[key] === true) && key !== 'the_most_recent' && key !== 'the_oldest');
    const filteredData = updatedLigneInfo.filter(order => {
      // Filtrage basé sur les valeurs dans filters
      const status = order.Status; // Suppose que 'Status' est l'attribut à filtrer
      const isConfirmed = filters.Confirmed && status === 'validé';
      const isRefused = filters.Refuse && status === 'refusé';
      const isWaiting = filters.Waiting && status === 'En attente';
      const isaccepte = filters.accepted && status === 'accepté';

      // Filtrer en fonction de l'état des filtres
      return (isConfirmed || isRefused || isWaiting || isaccepte);
    });

    setsetingFilter(filteredData)
  }, [updatedLigneInfo, filters]);

  useEffect(() => {
    setLigneInfo(setingFilter);
  }, [setingFilter, filters]);

  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <Configurator filters={filters} setFilters={setFilters} />
      <Table LigneInfo={LigneInfo} setLigneInfo={setLigneInfo} />
    </main>
  )
}

export default Orders
