import collapseSvg from "./assets/icons/collapse.svg";
import mobileExpandCollapseSvg from "./assets/icons/mobile-expand-collapse.svg";
import { MapMode } from "./Map.tsx";
import { TrailSegmentStatsType, SingleTrailStatsType, AllTrailsStatsType } from "./MapData.tsx";
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
    const completePctRounded = trailStats.completePct.toFixed(0);
    const isComplete = completePctRounded === "100";
    const className = "stat-complete" + ( isComplete ? " is-complete" : "");
    return (<div className={ className }><h2>{ isComplete ? completePctRounded : formatNum(trailStats.completePct) }% Complete</h2></div>);
}

type CompletedStatusProps = {
    trailStats: TrailSegmentStatsType
}
function CompletedStatus({trailStats}: CompletedStatusProps) {
    let className = "stat-complete";
    let statusText = "Not Completed";
    if (trailStats.completedStatus === 'complete') {
        className += " is-complete";
        statusText = "Completed";
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
                <h3>{formatNum(trailStats.length )} miles long</h3>
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
                <h3>{ formatNum(totalTrailLength) } miles total</h3>
                <p>{ formatNum(trailStats.completedLength) } Completed<br />{ formatNum(trailStats.incompleteLength) } Not Completed</p>
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
                <h3>{ totalNumTrails } trails total</h3>
                <p>{trailStats.numCompletedTrails } Completed<br />{ trailStats.numIncompleteTrails } Not Completed</p>
            </div>
            <div className="stat-length-all-trails">
                <h3>{ formatNum(totalTrailLength) } miles total</h3>
                <p>{ formatNum(trailStats.completedLength) } Completed<br />{ formatNum(trailStats.incompleteLength) } Not Completed</p>
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
    showStats: boolean,
    toggleShowStats: () => void,
    trailStats: AllTrailsStatsType | SingleTrailStatsType | TrailSegmentStatsType
};
function SidePanel({mapMode, showStats, toggleShowStats, trailStats}: SidePanelProps) {

    let className = "side-panel";
    if (!showStats) className += " collapsed";

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
            <MobileExpandOrCollapseBtn handleClick={ toggleShowStats }/>
            <div className="side-panel-content">
                { title }
                <div className="dividing-line"></div>
                { completedStatus }
                { trailStatsComp }
            </div>
            <ExpandOrCollapseBtn handleClick={ toggleShowStats } />
        </div>
    );
}

export default SidePanel;