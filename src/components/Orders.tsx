import React, { useState } from 'react';
import './Orders.css';

interface Order {
  id: number;
  status: string;
  dateOrdered: string;
  dateDelivery: string;
  orderNumber: string;
  document: string;
  datePayment: string;
  valueNet: string;
  valueGross: string;
  isExpanded?: boolean;
  items?: OrderItem[];
}

interface OrderItem {
  id: number;
  name: string;
  code: string;
  quantity: number;
  valueNet: string;
  valueGross: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      status: 'Potwierdzone',
      dateOrdered: '21-03-2022',
      dateDelivery: '23-03-2022',
      orderNumber: '1596',
      document: 'PROFORMA/7/03/2022',
      datePayment: '21-03-2022',
      valueNet: '305.99',
      valueGross: '376.37PLN',
      isExpanded: false,
      items: [
        { id: 1, name: 'MShybridGLASS8acterio', code: 'TRANSPORT', quantity: 2, valueNet: '305.99 PLN', valueGross: '376.37 PLN' },
        { id: 2, name: 'Transport', code: 'TRANSPORT', quantity: 1, valueNet: '305.99 PLN', valueGross: '376.37 PLN' },
      ]
    },
    {
      id: 2,
      status: 'Potwierdzone',
      dateOrdered: '21-03-2022',
      dateDelivery: '22-03-2022',
      orderNumber: '1595',
      document: 'PROFORMA/7/03/2022',
      datePayment: '21-03-2022',
      valueNet: '305.99',
      valueGross: '376.37PLN',
      isExpanded: false
    },
    {
      id: 3,
      status: 'Potwierdzone',
      dateOrdered: '21-03-2022',
      dateDelivery: '22-03-2022',
      orderNumber: '1594',
      document: 'PROFORMA/7/03/2022',
      datePayment: '21-03-2022',
      valueNet: '305.99',
      valueGross: '376.37PLN',
      isExpanded: true,
      items: [
        { id: 1, name: 'MShybridGLASS8acterio', code: 'TRANSPORT', quantity: 2, valueNet: '305.99 PLN', valueGross: '376.37 PLN' },
        { id: 2, name: 'Transport', code: 'TRANSPORT', quantity: 1, valueNet: '305.99 PLN', valueGross: '376.37 PLN' },
      ]
    },
    {
      id: 4,
      status: 'Wysłane',
      dateOrdered: '08-03-2022',
      dateDelivery: '09-03-2022',
      orderNumber: '1593',
      document: 'PROFORMA/7/03/2022',
      datePayment: '21-03-2022',
      valueNet: '305.99',
      valueGross: '376.37PLN',
      isExpanded: false
    },
    {
      id: 5,
      status: 'Wysłane',
      dateOrdered: '08-03-2022',
      dateDelivery: '10-03-2022',
      orderNumber: '1592',
      document: 'PROFORMA/7/03/2022',
      datePayment: '21-03-2022',
      valueNet: '305.99',
      valueGross: '376.37PLN',
      isExpanded: false
    },
  ]);

  const toggleExpand = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, isExpanded: !order.isExpanded } : order
    ));
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Zamówienia</h1>
      
      <div className="filters-row">
        <div className="filter-item">
          <select className="filter-select">
            <option>Status</option>
            <option>Potwierdzone</option>
            <option>Wysłane</option>
          </select>
        </div>
        
        <div className="filter-item">
          <div className="date-filter">
            <label>Data zamówienia</label>
            <input type="date" className="date-input" />
          </div>
        </div>
        
        <div className="filter-item">
          <div className="date-filter">
            <label>Data realizacji</label>
            <input type="date" className="date-input" />
          </div>
        </div>
        
        <div className="filter-item">
          <input type="text" placeholder="Nr zamówienia" className="search-input" />
        </div>
        
        <div className="filter-button-container">
          <button className="filter-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="filter-icon" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
            Filtruj
          </button>
        </div>
      </div>
      
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Data zamówienia <span className="sort-icon">▼</span></th>
              <th>Data realizacji <span className="sort-icon">▼</span></th>
              <th>Nr</th>
              <th>Dokument</th>
              <th>Data płatności <span className="sort-icon">▼</span></th>
              <th>Wartość netto/brutto</th>
              <th>Ściągnij</th>
              <th>Edytuj</th>
              <th>Usuń</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.id}>
                <tr className={order.isExpanded ? 'expanded-row' : ''}>
                  <td>
                    <div className={`status-indicator ${order.status.toLowerCase()}`}>
                      <div className="file-icon"></div>
                      {order.status}
                    </div>
                  </td>
                  <td>{order.dateOrdered}</td>
                  <td>{order.dateDelivery}</td>
                  <td>{order.orderNumber}</td>
                  <td>{order.document}</td>
                  <td>{order.datePayment}</td>
                  <td>{order.valueNet}/{order.valueGross}</td>
                  <td>
                    <button className="download-button">Ściągnij</button>
                  </td>
                  <td>
                    <button className="edit-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button className="delete-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button className="details-button" onClick={() => toggleExpand(order.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                {order.isExpanded && (
                  <tr className="details-row">
                    <td colSpan={11}>
                      <div className="order-details">
                        <table className="details-table">
                          <thead>
                            <tr>
                              <th>Lp.</th>
                              <th>Nazwa</th>
                              <th>Kod</th>
                              <th>Ilość</th>
                              <th>Wartość netto</th>
                              <th>Wartość brutto</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.quantity}</td>
                                <td>{item.valueNet}</td>
                                <td>{item.valueGross}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="invoice-action">
                          <button className="invoice-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            Wyświetl proformę
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <span>Page</span>
        <button className="pagination-prev">«</button>
        <button className="pagination-page active">1</button>
        <button className="pagination-next">»</button>
        <span>30</span>
      </div>
    </div>
  );
};

export default Orders;
