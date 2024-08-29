<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gantt Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-gantt"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    canvas {
      max-width: 100%;
    }
  </style>
</head>
<body>
  <h1>Gantt Chart for Restaurant Management System</h1>
  <canvas id="ganttChart"></canvas>

  <script>
    const ctx = document.getElementById('ganttChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'gantt',
      data: {
        labels: [
          "Requirement Analysis and Planning",
          "UI/UX Design",
          "Database Design",
          "User Registration and Authentication",
          "Restaurant Profile Management",
          "Search and Booking Interfaces",
          "Review and Rating UI",
          "API Development",
          "Voucher Management System",
          "Search and Recommendation Algorithms",
          "Review and Rating System",
          "Unit Testing",
          "Integration Testing",
          "User Acceptance Testing",
          "Deployment Preparation",
          "Application Deployment",
          "Maintenance and Monitoring"
        ],
        datasets: [{
          label: 'Project Timeline',
          data: [
            { label: "Requirement Gathering", start: "2024-07-01", end: "2024-07-14" },
            { label: "Project Planning", start: "2024-07-08", end: "2024-07-21" },
            { label: "UI/UX Design", start: "2024-07-15", end: "2024-08-04" },
            { label: "Database Design", start: "2024-07-29", end: "2024-08-11" },
            { label: "User Registration and Authentication", start: "2024-08-05", end: "2024-08-25" },
            { label: "Restaurant Profile Management", start: "2024-08-12", end: "2024-09-01" },
            { label: "Search and Booking Interfaces", start: "2024-09-02", end: "2024-09-22" },
            { label: "Review and Rating UI", start: "2024-09-23", end: "2024-10-13" },
            { label: "API Development", start: "2024-09-02", end: "2024-09-22" },
            { label: "Voucher Management System", start: "2024-09-23", end: "2024-10-13" },
            { label: "Search and Recommendation Algorithms", start: "2024-10-14", end: "2024-11-03" },
            { label: "Review and Rating System", start: "2024-11-04", end: "2024-11-24" },
            { label: "Unit Testing", start: "2024-10-14", end: "2024-10-27" },
            { label: "Integration Testing", start: "2024-11-04", end: "2024-11-17" },
            { label: "User Acceptance Testing", start: "2024-11-18", end: "2024-12-01" },
            { label: "Deployment Preparation", start: "2024-11-25", end: "2024-12-08" },
            { label: "Application Deployment", start: "2024-12-02", end: "2024-12-15" },
            { label: "Maintenance and Monitoring", start: "2024-12-16", end: "2024-12-29" }
          ],
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'week',
              tooltipFormat: 'll'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tasks'
            }
          }
        }
      }
    });
  </script>
</body>
</html>
