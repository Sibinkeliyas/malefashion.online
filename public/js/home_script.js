

  function selected(){

   if(document.getElementById('selected').value == 'Last week'){

    document.getElementById('revenue').innerHTML = '<%=Wrevenue%>'
    document.getElementById('orderCount').innerHTML = '<%=weeks.length%>'
    document.getElementById('allusers').innerHTML = '<%=weeklyUsers.length%>'

   }else if(document.getElementById('selected').value == 'Last month'){

    document.getElementById('revenue').innerHTML = '<%= mrevenue%>'
    document.getElementById('orderCount').innerHTML = '<%=months.length%>'
    document.getElementById('allusers').innerHTML = '<%=monthly.length%>'

   }else if(document.getElementById('selected').value == 'Last year' || document.getElementById('selected').value == 'select report time'){

    document.getElementById('revenue').innerHTML = '<%=revenue%>'
    document.getElementById('orderCount').innerHTML = '<%=orders_count%>'
    document.getElementById('allusers').innerHTML = '<%=all_users.length%>'
   }
    
                //chart

            //     const ctx = document.getElementById('myChart').getContext('2d');
            //         const myChart = new Chart(ctx, {
            //         type: 'bar',
            //         data: {
            //             labels: ['COD', 'PAYPAL', 'RAZORPAY',],
            //             datasets: [{
            //                 label: '# of Votes',
            //                 data: ['<%=cod%>', '<%=paypal%>', '<%=razorpay%>'],
            //                 backgroundColor: [
            //                     'rgba(255, 99, 132, 0.2)',
            //                     'rgba(54, 162, 235, 0.2)',
            //                     'rgba(255, 206, 86, 0.2)',
            //                     'rgba(75, 192, 192, 0.2)',
            //                     'rgba(153, 102, 255, 0.2)',
            //                     'rgba(255, 159, 64, 0.2)'
            //                 ],
            //                 borderColor: [
            //                     'rgba(255, 99, 132, 1)',
            //                     'rgba(54, 162, 235, 1)',
            //                     'rgba(255, 206, 86, 1)',
            //                     'rgba(75, 192, 192, 1)',
            //                     'rgba(153, 102, 255, 1)',
            //                     'rgba(255, 159, 64, 1)'
            //                 ],
            //                 borderWidth: 1
            //             }]
            //         },
            //         options: {
            //             scales: {
            //                 y: {
            //                     beginAtZero: true
            //                 }
            //             }
            //         }
            //     });
            //   }
            // }
          // }
          
        // }
//         var data = {
//   labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
//   datasets: [{
//     label: '# of Votes',
//     data: [10, 19, 3, 5, 2, 3],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)'
//     ],
//     borderColor: [
//       'rgba(255,99,132,1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)'
//     ],
//     borderWidth: 1,
//     fill: false
//   }]
// };

// if ($("#myChart").length) {
//   var lineChartCanvas = $("#myChart").get(0).getContext("2d");
//   var lineChart = new Chart(lineChartCanvas, {
//     type: 'line',
//     data: data,
//     options: options
//   });
// }
 
  }
  
