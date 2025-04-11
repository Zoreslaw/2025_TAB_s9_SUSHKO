import React from 'react';

const Test3: React.FC = () => {

  // Klient wysyła zapytanie GET o listę elementów
  fetch('https://api.example.com/items')
    .then(response => response.json())
    .then(data => {
    console.log("Otrzymane dane:", data);
    // Przykładowy wynik: [{ "id": 1, "name": "Item1" }, ...]
  });


  return (
    <div>
    </div>
  );
};

export default Test3;
