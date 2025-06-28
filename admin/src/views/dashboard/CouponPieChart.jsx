import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CouponPieChart = ({ data }) => {
    const chartData = {
        labels: ['Assigned', 'Redeemed', 'Expired', 'Unassigned'],
        datasets: [
            {
                label: 'Coupons',
                data: [
                    data.assignedCoupons,
                    data.redeemedCoupons,
                    data.expiredCoupons,
                    data.totalCoupons - data.assignedCoupons,
                ],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffca28'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // <--- Important for custom height
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ height: 250 }}> {/* Set desired height here */}
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default CouponPieChart;
