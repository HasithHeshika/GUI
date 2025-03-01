const servicesList = [
    { name: 'Prescription Medicines', description: 'Get your prescribed medicines easily.' },
    { name: 'Over-the-Counter Medicines', description: 'Buy painkillers, vitamins, and more.' },
    { name: 'Home Delivery', description: 'Have your medicines delivered to your doorstep.' }
  ];
  
  const servicesSection = document.getElementById('servicesList');
  
  servicesList.forEach((service) => {
    const div = document.createElement('div');
    div.classList.add('service');
  
    div.innerHTML = `
      <h3>${service.name}</h3>
      <p>${service.description}</p>
    `;
  
    servicesSection.appendChild(div);
  });
  