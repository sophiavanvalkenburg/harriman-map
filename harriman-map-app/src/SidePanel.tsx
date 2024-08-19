import { useState } from 'react';
import collapseSvg from "./assets/icons/collapse.svg";
import mobileExpandCollapseSvg from "./assets/icons/mobile-expand-collapse.svg";
import './SidePanel.css'

function MapTitle() {
    return (
        <div className="map-title">
            <h1 className="desktop-view">Harriman &<br />Bear Mountain<br />State Parks</h1>
            <h1 className="mobile-view">Harriman & Bear Mountain<br />State Parks</h1>
        </div>
    );
}

function TrailTitle() {
    return (
        <div className="map-title">
            <h1>1777 Trail</h1>
            <p>(segment)</p>
        </div>
    );
}

function CompletedPct() {
    return (<div className="stat-complete"><h2>XX.XX% Complete</h2></div>);
}

function CompletedStatus() {
    return (<div className="stat-complete"><h2>Status: Incomplete</h2></div>); 
}

function SingleTrailorSegmentStats() {
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
}

function AllTrailsStats() {
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
}

type SidePanelButtonProps  = {
    handleClick: () => void
}

function MobileExpandBtn({handleClick}:SidePanelButtonProps) {
    return (
        <button className="side-panel-btn mobile-view" onClick={handleClick}>
            <img src={mobileExpandCollapseSvg}></img>
        </button>
    );
}

function ExpandOrCollapseBtn({handleClick}:SidePanelButtonProps) {
    return (
        <button className="side-panel-btn desktop-view" onClick={handleClick}>
            <img src={collapseSvg}></img>
        </button>
    );
}

function SidePanel() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function handleBtnClick() {
        setIsCollapsed(!isCollapsed);
    }

    let className = "side-panel";
    if (isCollapsed) className += " collapsed";

    return (
        <div className={className}>
            <MobileExpandBtn handleClick={handleBtnClick}/>
            <div className="side-panel-content">
                <MapTitle />
                <div className="dividing-line"></div>
                <CompletedPct />
                <AllTrailsStats />
            </div>
            <ExpandOrCollapseBtn handleClick={handleBtnClick} />
        </div>
    );
}

export default SidePanel;