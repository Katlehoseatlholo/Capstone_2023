// Sample data for the horizontal bar chart
const data = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [{
        label: 'Values', // Example label
        data: [30, 45, 60,22,23,56,77], // Example data values (modify as needed)
        backgroundColor: ['#FF5733', '#3366FF', '#33FF33','#FF5793', '#3366BF', '#33CF33','#AA4733'], // Example colors
    }]
};

// Chart.js configuration for the horizontal bar chart
const config = {
    type: 'bar',
    data: data,
};

// Create and render the horizontal bar chart
const ctx = document.getElementById('chart2').getContext('2d');
new Chart(ctx, config);