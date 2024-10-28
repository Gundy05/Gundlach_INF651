document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.getElementById('submitButton');
    const outputDiv = document.getElementById('outputDiv');
    const mouseTracker = document.getElementById('mouseTracker');
    const coordinates = document.getElementById('coordinates');
  
    // Click Event
    submitButton.addEventListener('click', function() {
      const name = nameInput.value.trim();
      if (name) {
        outputDiv.textContent = `Welcome, ${name}!`;
        outputDiv.style.backgroundColor = 'green';
        outputDiv.style.color = 'white';
      } else {
        outputDiv.textContent = 'Error: Please enter a name.';
        outputDiv.style.backgroundColor = 'red';
        outputDiv.style.color = 'white';
      }
    });
  
    // Mouse Event
    mouseTracker.addEventListener('mousemove', function(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      coordinates.textContent = `Mouse Coordinates: X: ${x}, Y: ${y}`;
    });
  
    // Keyboard Event
    nameInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        submitButton.click();
      }
    });
  });
  