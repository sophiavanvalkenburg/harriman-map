//import { useRef, useEffect, useState } from 'react';
import collapseSvg from "./assets/icons/collapse.svg";
import './SidePanel.css'

function MapTitle() {
    return (
        <div className="map-title">
            <h1>Harriman &<br />Bear Mountain<br />State Parks</h1>
        </div>
    );
}

function StatPctCompleted() {
    return (<div className="stat-complete"><h2>XX.XX% Complete</h2></div>);
}

function StatTrailsContainer() {
    return (
        <div className="stat-trails-container">
            <div className="stat-total-num-trails-container">
                <h3>Total Number of Trails: XX</h3>
                <p>Completed: X<br />Incomplete: X</p>
            </div>
            <div className="stat-total-length-trails-container">
                <h3>Total Length of Trails: XX miles</h3>
                <p>Completed: X miles<br />Incomplete: X miles</p>
            </div>
        </div>
    );
}

function SidePanel() {
    return (
 <div className="side-panel">
    <div className="side-panel-content">
            <MapTitle />
            <div className="dividing-line"></div>
            <StatPctCompleted />
            <StatTrailsContainer />
    </div>
            
            <button className="side-panel-btn">
                <img src={collapseSvg}></img>
            </button>
        </div>

       
    );
}

export default SidePanel;