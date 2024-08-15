//import { useRef, useEffect, useState } from 'react';
import collapseSvg from "./assets/icons/collapse.svg";
import mobileExpandSvg from "./assets/icons/mobile-expand.svg";
import './SidePanel.css'

function MapTitle() {
    return (
        <div className="map-title">
            <h1 className="orientation-landscape">Harriman &<br />Bear Mountain<br />State Parks</h1>
            <h1 className="orientation-portrait">Harriman & Bear Mountain<br />State Parks</h1>
        </div>
    );
}

function StatCompleted() {
    /* segment */
    //return (<div className="stat-complete"><h2>Status: Incomplete</h2></div>);
    /* trail(s) */
    return (<div className="stat-complete"><h2>XX.XX% Complete</h2></div>);
}

function StatTrailsContainer() {
    /* trail / segment */
    
    return (
        <div className="stat-segment-container">
            <div className="stat-length-trail">
                <h3>Trail Length: XX miles</h3>
                <p>Completed: X miles<br />Incomplete: X miles</p>
            </div>
            <div className="stats-lnglat">
                <div className="stat-starts-at">
                    <h3>Starts at:</h3>
                    <p>(xxxxxx, xxxxxx)</p>
                </div>
                <div className="stat-ends-at">
                    <h3>Ends at:</h3>
                    <p>(xxxxxx, xxxxxx)</p>
                </div>
            </div>
        </div>
    );
    
    /* all trails */
    /*
    return (
        <div className="stat-trails-container">
            <div className="stat-num-all-trails">
                <h3>Total Number of Trails: XX</h3>
                <p>Completed: X<br />Incomplete: X</p>
            </div>
            <div className="stat-length-all-trails">
                <h3>Total Length of Trails: XX miles</h3>
                <p>Completed: X miles<br />Incomplete: X miles</p>
            </div>
        </div>
    );
    */
}

function SidePanel() {
    return (
        <div className="side-panel">
            <button className="side-panel-btn orientation-portrait">
                <img src={mobileExpandSvg}></img>
            </button>
            <div className="side-panel-content">
                <MapTitle />
                <div className="dividing-line"></div>
                <StatCompleted />
                <StatTrailsContainer />
            </div>
            <button className="side-panel-btn orientation-landscape">
                <img src={collapseSvg}></img>
            </button>
        </div>
    );
}

export default SidePanel;