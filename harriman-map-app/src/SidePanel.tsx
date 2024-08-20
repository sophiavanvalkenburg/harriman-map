import { useState } from 'react';
import collapseSvg from "./assets/icons/collapse.svg";
import mobileExpandCollapseSvg from "./assets/icons/mobile-expand-collapse.svg";
import { MapMode, TrailSegmentStatsType, SingleTrailStatsType, AllTrailsStatsType } from "./Map.tsx";
import './SidePanel.css'

function formatNum(num: number) {
    return num.toFixed(2);
}

function MapTitle() {
    return (
        <div className="map-title">
            <h1 className="desktop-view">Harriman &<br />Bear Mountain<br />State Parks</h1>
            <h1 className="mobile-view">Harriman & Bear Mountain<br />State Parks</h1>
        </div>
    );
}

type TrailTitleProps = {
    isSegment: boolean,
    trailStats: TrailSegmentStatsType | SingleTrailStatsType
};
function TrailTitle({isSegment, trailStats}: TrailTitleProps) {
    const subtitle = isSegment ? <p>(segment)</p> : '';
    return (
        <div className="map-title">
            <h1>{ trailStats.trailName }</h1>
            {subtitle}
        </div>
    );
}

type CompletePctProps = {
    trailStats: AllTrailsStatsType | SingleTrailStatsType
};
function CompletedPct({trailStats}: CompletePctProps) {
    const className = "stat-complete" + (trailStats.completePct === 100 ? " is-complete" : "");
    return (<div className={ className }><h2>{ formatNum(trailStats.completePct) }% Complete</h2></div>);
}

type CompletedStatusProps = {
    trailStats: TrailSegmentStatsType
}
function CompletedStatus({trailStats}: CompletedStatusProps) {
    let className = "stat-complete";
    let statusText = "Incomplete";
    if (trailStats.completedStatus === 'complete') {
        className += " is-complete";
        statusText = "Complete";
    }
    return (<div className={ className }><h2>Status: { statusText }</h2></div>); 
}

type LongLatStatsProps = {
    trailStats: SingleTrailStatsType | TrailSegmentStatsType
}
function LongLatStats({trailStats}: LongLatStatsProps) {
    return (
        <div className="stats-lnglat">
                <div className="stat-starts-at">
                    <h3>Starts at:</h3>
                    <p>({trailStats.startsAt[0].toFixed(7)}, {trailStats.startsAt[1].toFixed(7)})</p>
                </div>
                <div className="stat-ends-at">
                    <h3>Ends at:</h3>
                    <p>({trailStats.endsAt[0].toFixed(7)}, {trailStats.endsAt[1].toFixed(7)})</p>
                </div>
            </div>
    );
}

type TrailSegmentStatsProps = {
    trailStats: TrailSegmentStatsType
};
function TrailSegmentStats({trailStats}: TrailSegmentStatsProps) {
    return (
        <div className="stat-segment-container">
            <div className="stat-length-trail">
                <h3>Length: { formatNum(trailStats.length )} miles</h3>
            </div>
            <LongLatStats trailStats={ trailStats }/>
        </div>
    );
}

type SingleTrailStatsProps = {
    trailStats: SingleTrailStatsType
};
function SingleTrailStats({trailStats}: SingleTrailStatsProps) {
    const totalTrailLength = trailStats.completedLength + trailStats.incompleteLength;
    return (
        <div className="stat-segment-container">
            <div className="stat-length-trail">
                <h3>Trail Length: { formatNum(totalTrailLength) } miles</h3>
                <p>Completed: { formatNum(trailStats.completedLength) } miles<br />Incomplete: { formatNum(trailStats.incompleteLength) } miles</p>
            </div>
            <LongLatStats trailStats={ trailStats }/>
        </div>
    );
}

type AllTrailsStatsProps = {
    trailStats: AllTrailsStatsType
};
function AllTrailsStats({trailStats}: AllTrailsStatsProps) {
    const totalNumTrails = trailStats.numCompletedTrails + trailStats.numIncompleteTrails;
    const totalTrailLength = trailStats.completedLength + trailStats.incompleteLength;
    return (
        <div className="stat-trails-container">
            <div className="stat-num-all-trails">
                <h3>Total Number of Trails: { totalNumTrails }</h3>
                <p>Completed: {trailStats.numCompletedTrails }<br />Incomplete: { trailStats.numIncompleteTrails }</p>
            </div>
            <div className="stat-length-all-trails">
                <h3>Total Length of Trails: { formatNum(totalTrailLength) } miles</h3>
                <p>Completed: { formatNum(trailStats.completedLength) } miles<br />Incomplete: { formatNum(trailStats.incompleteLength) } miles</p>
            </div>
        </div>
    );
}

type SidePanelButtonProps  = {
    handleClick: () => void
}

function MobileExpandOrCollapseBtn({handleClick}:SidePanelButtonProps) {
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

type SidePanelProps = {
    mapMode: string,
    trailStats: AllTrailsStatsType | SingleTrailStatsType | TrailSegmentStatsType
};
function SidePanel({mapMode, trailStats}: SidePanelProps) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function handleBtnClick() {
        setIsCollapsed(!isCollapsed);
    }

    let className = "side-panel";
    if (isCollapsed) className += " collapsed";

    let title, completedStatus, trailStatsComp;
    switch(mapMode) {
        case MapMode.BASE:
            trailStats = trailStats as AllTrailsStatsType
            title = <MapTitle />;
            completedStatus = <CompletedPct trailStats={ trailStats } />;
            trailStatsComp = <AllTrailsStats trailStats={ trailStats } />;
            break;
        case MapMode.TRAIL:
            trailStats = trailStats as SingleTrailStatsType;
            title = <TrailTitle isSegment={false} trailStats={ trailStats } />;
            completedStatus = <CompletedPct trailStats={ trailStats }/>;
            trailStatsComp = <SingleTrailStats trailStats={ trailStats} />;
            break;
        case MapMode.SEGMENT:
            trailStats = trailStats as TrailSegmentStatsType;
            title = <TrailTitle isSegment={true} trailStats={ trailStats } />;
            completedStatus = <CompletedStatus trailStats={ trailStats } />;
            trailStatsComp = <TrailSegmentStats trailStats={ trailStats } />;
            break;
    }
    
    return (
        <div className={ className }>
            <MobileExpandOrCollapseBtn handleClick={ handleBtnClick }/>
            <div className="side-panel-content">
                { title }
                <div className="dividing-line"></div>
                { completedStatus }
                { trailStatsComp }
            </div>
            <ExpandOrCollapseBtn handleClick={ handleBtnClick } />
        </div>
    );
}

export default SidePanel;