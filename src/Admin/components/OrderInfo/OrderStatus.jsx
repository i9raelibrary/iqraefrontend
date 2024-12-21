import React from 'react';
import { Check, Clock, X } from 'lucide-react';
import { Button, Box, Typography, Radio } from '@mui/material';
import { useUpdateCommandMutation } from '../../../services/CommandeApi';

export function OrderStatus({ status, onStatusChange, id, refetch }) {

  const [updateCommand, { isSuccess }] = useUpdateCommandMutation();
  const handleChangeStatus = async (newStatus) => {
    console.log(id, newStatus);
    const result = await updateCommand({ id, newStatus }).unwrap();
    if (result) {
      refetch();
    }
  }
  return (
    <Box sx={{ margin: '5px 0 15px 0', width: '100%', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      <Typography variant="body1" fontWeight="medium" sx={{ flex: 1 }}>
        Status:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        <Button
          onClick={() => {
            onStatusChange('accepté');
            handleChangeStatus("accepté");
          }
          }
          variant={status === 'accepté' ? 'contained' : 'outlined'}
          color="info"
          startIcon={<Check />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            minWidth: '120px', // Ensure buttons don't get too small on smaller screens
          }}
        >
          accepté
        </Button>
        <Button
          onClick={() => {
            onStatusChange('refusé');
            handleChangeStatus("refusé");
          }
          }
          variant={status === 'refusé' ? 'contained' : 'outlined'}
          color="error"
          startIcon={<X />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            minWidth: '120px',
          }}
        >
          refusé
        </Button>
        <Button
          onClick={() => {
            onStatusChange('En attente');
            handleChangeStatus("En attente");
          }
          }
          variant={status === 'En attente' ? 'contained' : 'outlined'}
          color="warning"
          startIcon={<Clock />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            minWidth: '120px',
          }}
        >
          En attente
        </Button>
        <Button
          onClick={() => {
            onStatusChange('validé');
            handleChangeStatus("validé");
          }
          }
          variant={status === 'validé' ? 'contained' : 'outlined'}
          color="success"
          startIcon={<Radio size='small' />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            minWidth: '120px',
          }}
        >
          Confirmé
        </Button>
      </Box>
    </Box>
  );
}
