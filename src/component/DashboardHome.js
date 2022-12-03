import '../component/DashboardHomeStyle.css';
import {Line,Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import {useSelector} from 'react-redux'
//import { SMTPClient } from 'emailjs';



const DashboardRightSection=()=>{
    const reduxDataset=useSelector( state=>state );
    const dateToday=new Date();
    const today=`${dateToday.getMonth()}-${dateToday.getDate()}-${dateToday.getFullYear()}`;
    //states
    const [arrLineLabel,setarrLineLabel]=useState([]);
    const [arrLineValue,setarrLineValue]=useState([]);
    const [yearToday,setYearToday]=useState(dateToday.getFullYear());
    const [arrYear,setArrYear]=useState([]);

    Chart.register(CategoryScale);

    //sales today
    const CurrencyFormat = require('react-currency-format');
    const salesToday=(reduxDataset.sales.filter(soldItem=>{
            const date =new Date(soldItem.date);
            const soldDate=`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
            return (soldItem.status==='sold' && soldDate===today)}
        ).reduce((total,sold)=>{return total+Number(sold.price)},0)).toFixed(2);

    //sold today
    const sold=(reduxDataset.sales.filter(soldItem=>{
            const date =new Date(soldItem.date);
            const soldDate=`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
            return (soldItem.status==='sold' && soldDate===today)}
        ).reduce((total,sold)=>{return total+Number(sold.quantity)},0));

    //total of all product sold quantity
    const allProductSold=reduxDataset.sales.reduce((total,qty)=>{return total+Number(qty.quantity)},0);

    //total of all current product quantity
    const allProductQty=reduxDataset.products.reduce((total,qty)=>{return total+Number(qty.quantity)},0);

    //resets the line values
    useEffect (()=>{
        setarrLineLabel([]);
        setarrLineValue([]);
        setArrYear([]);
        
    },[ yearToday ])

    //sets the value of line graph
    reduxDataset.sales.map((soldItem)=>{
        const date = new Date(soldItem.date);
        if(Number(yearToday)===Number(date.getFullYear())){
            const strDate=date.toLocaleString('default',{month:'long'});

            if(!arrLineLabel.find(month=>strDate===month)){
                arrLineLabel.push(strDate);
                
                const itemTotal=reduxDataset.sales.filter(saleValue=>{
                    const filterdate = new Date(saleValue.date);
                    const filterDate=filterdate.toLocaleString('default',{month:'long'});
                    return filterDate===strDate;
                }).reduce((itemTot,itemValue)=>{
                    return itemTot+Number(itemValue.price);
                },0)
                arrLineValue.push(itemTotal);
            }
        }
        const distictYear=Number(date.getFullYear());
        if(!arrYear.find(year=>year===distictYear)){
            arrYear.push(distictYear);
        }

    })

    //line graph value
    const initalLineValue={ 
        labels:arrLineLabel,
        datasets:[{
            label:'Sales',
            fill:false,
            linteTension:0.5,
            backgroundColor:'#f7c532',
            borderColor:'rgba(0,0,0,1)',
            borderWidth:2,
            data:arrLineValue
        }]
    }

    //pie graph value
    const initalPieValue={ 
        labels:['stock','sold'],
        datasets:[{
            label:'Stocks',
            backgroundColor:['#28a745','#C9DE00'],
            hoverBackgroundColor:['#07651d','#4B5000'],
            data:[allProductQty, allProductSold]
        }]
    }

    return(
        <div className='dashboard-right w-100 h-100 grid'>
            <div className='bread-crumb flex home-bread-crumb'>
                <h3>HOME SECTION</h3>
            </div>
            <div className='flex home-box-wrapper'>
                <div className='home-box-users'>
                    <h2>{reduxDataset.user.length}</h2>
                    <div className='home-box-footer'>
                        <h3>Users</h3>
                    </div>
                </div>

                <div className='home-box-users home-sales'>
                    <h2>{ <CurrencyFormat value={salesToday} displayType={'text'} thousandSeparator={true} prefix={''} /> }</h2>
                    <div className='home-box-footer home-sales-footer'>
                        <h3>Sales Today</h3>
                    </div>
                </div>

                <div className='home-box-users home-quantity'>
                    <h2>{sold}</h2>
                    <div className='home-box-footer home-quantity-footer'>
                        <h3>Items Sold Today</h3>
                    </div>
                </div>

                <div className='home-box-users home-clock'>
                    <h2>{ dateToday.toLocaleString('default',{month:'long'})}</h2>
                    <div className='home-box-footer home-clock-footer'>
                        <h3>Date: {dateToday.toLocaleString()+''} </h3>
                    </div>
                    
                </div>
            </div>

            <div className='home-chart-wrapper grid'>
                <div>
                    <div>
                        <h3>Sales this year { yearToday } </h3><br/>
                        <div className='flex center-justify'>
                            <label htmlFor='year' className='home-year'>Select Year: </label>

                            <select className='home-year-selection' name='year'value={yearToday} onChange={(event)=>{setYearToday(event.target.value)}}>
                                {
                                    arrYear.map((year)=>{
                                        return <option key ={year} value={year}>{year}</option>
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <br/>
                    <div>
                        <Line 
                            data={initalLineValue}
                            options={{
                                title:{
                                    display:true,
                                    text:'Sales',
                                    fontSize:12
                                },
                                legend:{
                                    display:true,
                                    position:'right'
                                }
                            }}
                        />
                    </div>
                    
                </div>
                <div>
                    <h2>Stock</h2>
                    <Pie
                        data={initalPieValue}
                        options={{
                            title:{
                                display:true,
                                text:'Stock',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            
            </div>
        </div>
    )

}
export default DashboardRightSection;