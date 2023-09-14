
        // Sample data for the bar chart
        const data1 = {
            labels: ['Project A', 'Project B', 'Project C'],
            datasets: [{
                data: [122,222, 99], // Example vote counts
                backgroundColor: ['#FFGFJ3', '#4566GF', '#33JJ43'], // Example colors
            }]
        };

        // Chart.js configuration for the bar chart
        const config1 = {
            type: 'bar',
            data: data1,
        };

        // Create and render the bar chart
        const ctx1 = document.getElementById('chart1').getContext('2d');
        new Chart(ctx1, config1);