
        // Sample data for the pie chart
        const data = {
            labels: ['Candidate A', 'Candidate B', 'Candidate C'],
            datasets: [{
                data: [450, 300, 250], // Example vote counts
                backgroundColor: ['#FF5733', '#3366FF', '#33FF33'], // Example colors
            }]
        };

        // Chart.js configuration for the pie chart
        const config = {
            type: 'pie',
            data: data,
        };

        // Create and render the pie chart
        const ctx = document.getElementById('resultsChart').getContext('2d');
        new Chart(ctx, config);


