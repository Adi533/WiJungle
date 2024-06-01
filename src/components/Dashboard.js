import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import data from '../data.json';
import "./Dashboard.css";

const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
    }
    return colors;
};

const Dashboard = () => {
    const [chartData, setChartData] = useState({
        categories: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
            }]
        },
        severity: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
            }]
        },
        protocols: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                borderColor: '',
                backgroundColor: 'rgba(255, 255, 255, 0)',
            }]
        },
        rev: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
            }]
        }
    });

    useEffect(() => {
        const alertData = data.map(item => item.alert);

        const categories = alertData.reduce((acc, alert) => {
            acc[alert.category] = (acc[alert.category] || 0) + 1;
            return acc;
        }, {});

        const severity = alertData.reduce((acc, alert) => {
            acc[alert.severity] = (acc[alert.severity] || 0) + 1;
            return acc;
        }, {});

        const protocols = data.reduce((acc, item) => {
            acc[item.proto] = (acc[item.proto] || 0) + 1;
            return acc;
        }, {});
        
        const rev = alertData.reduce((acc, alert) => {
            acc[alert.rev] = (acc[alert.rev] || 0) + 1;
            return acc;
        }, {});

        setChartData({
            categories: {
                labels: Object.keys(categories),
                datasets: [{
                    label: 'Alert Categories',
                    data: Object.values(categories),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
            },
            severity: {
                labels: Object.keys(severity),
                datasets: [{
                    label: 'Alert Severity',
                    data: Object.values(severity),
                    backgroundColor: generateColors(Object.keys(severity).length),
                }]
            },
            protocols: {
                labels: Object.keys(protocols),
                datasets: [{
                    label: 'Protocols',
                    data: Object.values(protocols),
                    borderColor: 'rgba(255, 255, 255, 1)', 
                    backgroundColor: 'rgba(255, 255, 255, 0)', 
                }]
            },
            rev: {
                labels: Object.keys(rev),
                datasets: [{
                    label: 'Alert rev',
                    data: Object.values(rev),
                    backgroundColor: generateColors(Object.keys(rev).length),
                }]
            },
        });
    }, []);
    useEffect(() => {
        const handleResize = () => {
            window.location.reload();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='main'>
            <h2 className='head'>Network Alert Dashboard</h2>
            <div className='bar'>
                <p className='bar-para'>Below is the Bar Graph to shocwase the Categories of Alerts</p>
                <Bar
                    data={chartData.categories}
                    options={{ plugins: { title: { display: true, text: 'Alert Categories' } } }}
                />
            </div>
            <hr />
            <div className='pieone'>
                <p className='pieone-para'>Below is the Pie Chart to showcase the Severity of Alerts</p>
                <Pie
                    data={chartData.severity}
                    options={{ plugins: { title: { display: true, text: 'Alert Severity' } } }}
                />
            </div>
            <hr />
            <div className='line'>
                <p className='line-para'>Below is the Line Graph to showcase the Alert Protocols</p>
                <Line
                    data={chartData.protocols}
                    options={{ plugins: { title: { display: true, text: 'Alert Protocols' } } }}
                />
            </div>
            <hr />
            <div className='pietwo'>
                <p className='pietwo-para'>Below is the Pie Graph to showcase the Alert Rev</p>
                <Pie
                    data={chartData.rev}
                    options={{ plugins: { title: { display: true, text: 'Alert Rev' } } }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
