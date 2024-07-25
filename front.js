import React, { useState, useEffect } from 'react';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carga
  const [error, setError] = useState(null); // Estado para almacenar errores

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Indica que la carga ha comenzado
      setError(null); // Limpia cualquier error previo

      try {
        const response = await fetch('/api/accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
        setError(error.message || 'Ocurrió un error al obtener las cuentas'); // Mensaje de error más informativo
      } finally {
        setIsLoading(false); // Indica que la carga ha finalizado
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Cargando cuentas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {accounts.length > 0 && (
        <ul>
          {accounts.map(account => (
            <li key={account._id}>
              {account.accountNumber} - ${account.balance}
            </li>
          ))}
        </ul>
      )}
      {accounts.length === 0 && !isLoading && <p>No se encontraron cuentas.</p>}
    </div>
  );
}

export default AccountList;
