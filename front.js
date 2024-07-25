import React, { useState, useEffect } from 'react';

function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('/api/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data));
  }, []);

  return (
    <div>
      {/* Lista de cuentas */}
      {accounts.map(account => (
        <div key={account._id}>
          {account.accountNumber} - ${account.balance}
        </div>
      ))}
    </div>
  );
}
