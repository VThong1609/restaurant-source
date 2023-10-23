/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
const CustomChart = ({ weddingPartyInformations = [] }) => {
  const [data, setData] = useState({ datasets: [] });
  const [options, setOptions] = useState(null);

  const [type, setType] = useState("nam");
  function formatCurrency(value) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Số lẻ sẽ không hiển thị
    });
    return formatter.format(value);
  }

  useEffect(() => {
    let dataInDatasetsObject = {};
    weddingPartyInformations.forEach((wpi) => {
      if (type === "nam") {
        const year = new Date(wpi.partyBookingDate).getFullYear();
        dataInDatasetsObject[year] =
          (dataInDatasetsObject[year] ? dataInDatasetsObject[year] : 0) +
          wpi.totalPrice;
      } else {
        const year = new Date(wpi.partyBookingDate).getFullYear();
        const month = new Date(wpi.partyBookingDate).getMonth();

        dataInDatasetsObject[`Quý ${month / 3 + 1}/${year}`] =
          (dataInDatasetsObject[`Quý ${month / 3 + 1}/${year}`]
            ? dataInDatasetsObject[`Quý ${month / 3 + 1}/${year}`]
            : 0) + wpi.totalPrice;
      }
    });
    let dataInDatasets = [];
    let labels = [];
    let start = new Date(
      weddingPartyInformations[0]?.partyBookingDate
    ).getFullYear();
    let end = new Date(
      weddingPartyInformations[
        weddingPartyInformations.length - 1
      ]?.partyBookingDate
    ).getFullYear();
    while (start <= end) {
      if (type === "nam") {
        if (dataInDatasetsObject[start]) {
          labels.push(`Năm ${start}`);
          dataInDatasets.push(dataInDatasetsObject[start]);
        }
      } else {
        for (let i = 1; i <= 4; i++) {
          if (dataInDatasetsObject[`Quý ${i}/${start}`]) {
            labels.push(`Quý ${i}/${start}`);
            dataInDatasets.push(dataInDatasetsObject[`Quý ${i}/${start}`]);
          }
        }
      }
      start += 1;
    }

    setData({
      labels: labels,
      datasets: [
        {
          label: "Doanh thu",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [5, 1],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 3,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataInDatasets,
          hidden: false,
        },
      ],
    });
    setOptions({
      // scales: {
      //   x: {
      //     type: "category",
      //     labels: labels,
      //     grid: {
      //       display: true,
      //     },
      //   },
      //   y: {
      //     grid: {
      //       display: true,
      //     },
      //   },
      // },
      scales: {
        x: {
          type: "category",
          labels: labels,
          grid: {
            display: true,
          },
        },
        y: {
          grid: {
            display: true,
          },
          ticks: {
            callback: function (value) {
              return formatCurrency(value); // Sử dụng hàm định dạng tiền tệ
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            generateLabels: (chart) => {
              const labels = [];
              const datasets = chart.data.datasets;
              for (let i = 0; i < datasets.length; i++) {
                labels.push({
                  text: datasets[i].label,
                  fillStyle: datasets[i].backgroundColor,
                  strokeStyle: datasets[i].borderColor,
                });
              }
              return labels;
            },
          },
        },
      },
    });
  }, [weddingPartyInformations, type]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>Lựa chọn thống kê</div>
        <select
          style={{ height: 30, width: 100, marginLeft: 20 }}
          defaultValue={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="nam">Năm</option> <option value="quy">Quý</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          margin: "10px 0px",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{ width: "60%", display: "flex", justifyContent: "center" }}
        >
          {data && options && <Bar data={data} options={options} />}
        </div>{" "}
      
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        Biểu đồ doanh thu của nhà hàng
      </div>
    </div>
  );
};

export default CustomChart;
