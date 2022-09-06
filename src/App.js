import './App.css';
import data from './data/2022sep1-10.json';
import Table from 'rc-table';
import {useState} from "react";

function App() {
    const [filter, setFilter] = useState('');
    let grantTotal;
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'Rank',
            key: 'rank',
            //width: 50
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'name',
            width: 400,
            className: 'text-align-left padding-right-20p'
        },
        {
            title: 'Distance',
            dataIndex: 'Sum of Distance',
            key: 'Sum of Distance',
            // width: 150
        },
        {
            title: 'Time',
            dataIndex: 'Sum of Duration',
            key: 'Sum of Duration',
            //width: 150
        },
    ];
    let rank = 1;
    const row = data.filter(d => {
        if (!d.gender)
            d.gender = 'm'
        d['Sum of Distance'] = (+d['Sum of Distance']).toFixed(2);
        d.Name = d.Name || d[' Name'] || d.name || d[' name'] || d["﻿Name"]
        if (d.Name === 'Grand Total') {
            grantTotal = (+d['Sum of Distance']).toFixed(2)
            return false;
        } else {
            if (filter.length) {
                if (d.gender !== filter)
                    return false;
            }
            d.Rank = rank++;
            return true;
        }

    })
    return (
        <div className="App">
            <div className='background-blue'>
                <h1 className='title'>LogiFit - Challenge</h1>
            </div>
            <div>
                <h2 className='total-distance-text'> 🚴 - Sept 2022</h2>
            </div>
            <div className={'flex-div-column'}>
                <form className='float-center'>
                    <input defaultChecked={true} type="radio" name="fruit" value="all" onChange={() => {
                        setFilter('')
                    }}/> <h3>All</h3>
                    <input type="radio" name="fruit" value="men" onChange={() => {
                        setFilter('m')
                    }}/><h3>Men</h3>
                    <input type="radio" name="fruit" value="women" onChange={() => {
                        setFilter('f')
                    }}/><h3>Women</h3>
                </form>
                <div className='float-right padding-right-20'>
                    <h3 className='total-distance-text'>Total distance : {grantTotal} km</h3>
                </div>
                <div>
                    <Table useFixedHeader={true} columns={columns} data={row}></Table>
                </div>
            </div>
        </div>
    );
}

export default App;
