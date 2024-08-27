const generateSVGFromJSON = (data) => {
    const rectWidth = 10;
    const rectHeight = 10;
    const padding = 2;
    const cols = 7;
    const xOffset = 10; 
    const yOffset = 20; 
    const dayWidth = rectWidth + padding;
    const dayHeight = rectHeight + padding;
  
    const dates = Object.keys(data).sort();
    const maxContributions = Math.max(...Object.values(data));
    
    const getColor = (level) => {
      if (level === 0) return "#e1e4e8"; // No contributions (light gray)
      if (level < 5) return "#c6e48b"; // Low contributions (light green)
      if (level < 10) return "#7bc96f"; // Medium contributions (medium green)
      return "#239a3b"; // High contributions (dark green)
    };
  
    let rects = '';
    dates.forEach((date, index) => {
      const x = xOffset + (index % cols) * dayWidth;
      const y = yOffset + Math.floor(index / cols) * dayHeight;
      const level = data[date];
      const color = getColor(level);
      
      rects += `
        <rect width="${rectWidth}" height="${rectHeight}" x="${x}" y="${y}" 
              class="ContributionCalendar-day" data-date="${date}" 
              data-level="${level}" rx="2" ry="2" fill="${color}">
          ${level} contributions on ${date}
        </rect>`;
    });
  
    return `
      <svg width="${cols * dayWidth + xOffset}" height="${Math.ceil(dates.length / cols) * dayHeight + yOffset}" 
           xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 0)">
          ${rects}
        </g>
      </svg>`;
  };
  
  fetch('calendar.json')
    .then(response => response.json())
    .then(data => {
      const svgContent = generateSVGFromJSON(data);
      document.getElementById('calendar-svg').innerHTML = svgContent;
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
    });