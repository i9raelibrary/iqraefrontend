import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Printer, Download } from 'lucide-react';
import { Button, Box, Typography } from '@mui/material';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'red',
    margin: ' 0px 0 10px 0'
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const InvoiceDocument = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Commande de{order.clientName}</Text>
        <Text>Date: {new Date(order.date).toLocaleString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <Text style={styles.sectionTitle} >Name: {order.clientName}</Text>
        <Text style={styles.sectionTitle} >Phone: {order.clientNumber}</Text>
        <Text style={styles.sectionTitle} >Email: {order.clientEmail}</Text>
        <Text style={styles.sectionTitle} >Address: {order.clientAdresse}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {order.details.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.article.nom}</Text>
              <Text style={styles.tableCell}>{product.quantite}</Text>
              <Text style={styles.tableCell}>{product.article.puv}</Text>
              <Text style={styles.tableCell}>
                {(product.totalLigne * product.quantite).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.total}>Total: {order.totalPrd.toFixed(2)} MAD</Text>
    </Page>
  </Document>
);

export function InvoiceActions({ order }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        startIcon={<Printer />}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        Print Invoice
      </Button>
      <PDFDownloadLink
        document={<InvoiceDocument order={order} />}
        fileName={`invoice-${order.clientName}.pdf`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}
      >
        {({ loading }) =>
          loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<Download />}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </Box>
  );
}
