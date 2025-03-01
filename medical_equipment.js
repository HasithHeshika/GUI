const equipmentList = [
    { name: 'Stethoscope', description: 'Used for listening to the heart and lungs.' },
    { name: 'Syringe', description: 'Used for administering injections or drawing fluids.' },
    { name: 'Thermometer', description: 'Used to measure body temperature.' }
  ];
  
  const equipmentSection = document.getElementById('equipmentList');
  
  equipmentList.forEach((equipment) => {
    const div = document.createElement('div');
    div.classList.add('equipment');
  
    div.innerHTML = `
      <h3>${equipment.name}</h3>
      <p>${equipment.description}</p>
    `;
  
    equipmentSection.appendChild(div);
  });
  