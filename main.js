$(document).ready(function(){
    const table = $('#dt-table').DataTable();
    const tableData = getTableData(table);
    createHighcharts(tableData);
    setTableEvents(table);
    });

    function getTableData(table) {
        const data = [],
        category = [],
        year2018 = [],
        year2019 = [];
        table.rows({ search: "applied" }).every(function() {
        const data = this.data();
        category.push(data[0]);
        year2018.push(parseInt(data[1].replace(/\,/g, "")));
        year2019.push(parseInt(data[2].replace(/\,/g, "")));
        });
        data.push(category, year2018, year2019);
        return data;
        }
        
function createHighcharts(data){
    Highcharts.chart("chart", {
    chart: {
    zoomType: 'xy'
    },
    title: {
    text: "FBI Crime Statistics in the US"
    },
    subtitle: {
    text: "Types of Crime in Wchita, Kansas <br>Click and drag in the plot area to zoom in"
    },
    xAxis: [
    {
    categories: data[0],
    labels: {
    rotation: -45
    }
    }
    ],
    yAxis: [
    {
    title: {
    text: "Value"
    }
    }
    ],
    series: [
    {
    name: "2018",
    type: "lollipop",
    data: data[1],
    color: "blue"
    },
    {
    name: "2019",
    type: "lollipop",
    data: data[2],
    color: "green"
    }
    ],
    tooltip: {
    shared: true
    },
    legend: {
    backgroundColor: "white",
    shadow: true
    },
    credits: {
    enabled: false
    },
    noData: {
    style: {
    fontSize: "16px"
    }
    }
    });
    }
    let draw = false;
    function setTableEvents(table) {
    table.on("page", () => {
    draw = true;
    });
    table.on("draw", () => {
    if (draw) {
    draw = false;
    } else {
    const tableData = getTableData(table);
    createHighcharts(tableData);
    }
    });
    }    