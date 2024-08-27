import collapseSvg from "./assets/icons/collapse.svg";
import mobileExpandCollapseSvg from "./assets/icons/mobile-expand-collapse.svg";
import { MapMode } from "./Map.tsx";
import * as MapData from "./MapData.tsx";
import './assets/css/SidePanel.css'

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

type TrailTitleProps = { isSegment: boolean, trailName: string };
function TrailTitle({ isSegment, trailName }: TrailTitleProps) {
    const subtitle = isSegment ? <p>(segment)</p> : '';
    return (
        <div className="map-title">
            <h1>{trailName}</h1>
            {subtitle}
        </div>
    );
}

type CompletePctProps = { completePct: number };
function CompletedPct({ completePct }: CompletePctProps) {
    const completePctRounded = completePct.toFixed(0);
    const isComplete = completePctRounded === "100";
    const className = "stat-complete" + (isComplete ? " is-complete" : "");
    return (<div className={className}><h2>{isComplete ? completePctRounded : formatNum(completePct)}% Complete</h2></div>);
}

type CompletedStatusProps = { completedStatus: string };
function CompletedStatus({ completedStatus }: CompletedStatusProps) {
    let className = "stat-complete";
    let statusText = "Not Completed";
    if (completedStatus === 'complete') {
        className += " is-complete";
        statusText = "Completed";
    }
    return (<div className={className}><h2>Status: {statusText}</h2></div>);
}

type LongLatStatsProps = { startsAt: MapData.LngLat, endsAt: MapData.LngLat };
function LongLatStats({ startsAt, endsAt }: LongLatStatsProps) {
    return (
        <div className="stats-lnglat">
            <div className="stat-starts-at">
                <h3>Starts at</h3>
                <p>({startsAt[0].toFixed(4)}, {startsAt[1].toFixed(4)})</p>
            </div>
            <div className="stat-ends-at">
                <h3>Ends at</h3>
                <p>({endsAt[0].toFixed(4)}, {endsAt[1].toFixed(4)})</p>
            </div>
        </div>
    );
}

type StatsTableType = {
    totalNum: string | number,
    totalText: string,
    completedNum: string | number, 
    incompleteNum: string | number
};
function StatsTable({totalNum, totalText, completedNum, incompleteNum}: StatsTableType) {
    return (
        <table className="stats-table">
            <thead>
                <tr>
                    <th>{totalNum}</th>
                    <td>{totalText}</td>
                </tr>
            </thead>
            <tr>
                <th>{completedNum}</th>
                <td>Completed</td>
            </tr>
            <tr>
                <th>{incompleteNum}</th>
                <td>Not Completed</td>
            </tr>
        </table>
    );
}

type TrailSegmentStatsProps = { trailStats: MapData.TrailSegmentStatsType };
function TrailSegmentStats({ trailStats }: TrailSegmentStatsProps) {
    return (
        <div className="stat-segment-container">
            <div className="stat-length-trail">
                <h3>{formatNum(trailStats.length)} Miles</h3>
            </div>
            <LongLatStats startsAt={trailStats.startsAt} endsAt={trailStats.endsAt} />
        </div>
    );
}

type SingleTrailStatsProps = { trailStats: MapData.SingleTrailStatsType };
function SingleTrailStats({ trailStats }: SingleTrailStatsProps) {
    const totalTrailLength = trailStats.completedLength + trailStats.incompleteLength;
    return (
        <div className="stat-segment-container">
            <div className="stat-length-trail">
                <StatsTable 
                    totalNum={formatNum(totalTrailLength)}
                    totalText="Miles Total"
                    completedNum={formatNum(trailStats.completedLength)}
                    incompleteNum={formatNum(trailStats.incompleteLength)}
                />
            </div>
            <LongLatStats startsAt={trailStats.startsAt} endsAt={trailStats.endsAt} />
        </div>
    );
}

type AllTrailsStatsProps = { trailStats: MapData.AllTrailsStatsType };
function AllTrailsStats({ trailStats }: AllTrailsStatsProps) {
    const totalNumTrails = trailStats.numCompletedTrails + trailStats.numIncompleteTrails;
    const totalTrailLength = trailStats.completedLength + trailStats.incompleteLength;
    return (
        <div className="stat-trails-container">
            <div className="stat-num-all-trails">
                <StatsTable 
                    totalNum={totalNumTrails}
                    totalText="Trails Total"
                    completedNum={trailStats.numCompletedTrails}
                    incompleteNum={trailStats.numIncompleteTrails}
                />
            </div>
            <div className="stat-length-all-trails">
                <StatsTable 
                    totalNum={formatNum(totalTrailLength)}
                    totalText="Miles Total"
                    completedNum={formatNum(trailStats.completedLength)}
                    incompleteNum={formatNum(trailStats.incompleteLength)}
                />
            </div>
        </div>
    );
}

type SidePanelButtonProps = { handleClick: () => void }
function MobileExpandOrCollapseBtn({ handleClick }: SidePanelButtonProps) {
    return (
        <button className="side-panel-btn mobile-view" onClick={handleClick}>
            <img src={mobileExpandCollapseSvg}></img>
        </button>
    );
}
function ExpandOrCollapseBtn({ handleClick }: SidePanelButtonProps) {
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
    trailStats: MapData.TrailStatsType
};
function SidePanel({ mapMode, showStats, toggleShowStats, trailStats }: SidePanelProps) {

    let className = "side-panel";
    if (!showStats) className += " collapsed";

    let title, completedStatus, trailStatsComp;
    switch (mapMode) {
        case MapMode.BASE:
            trailStats = trailStats as MapData.AllTrailsStatsType;
            title = <MapTitle />;
            completedStatus = <CompletedPct completePct={trailStats.completePct} />;
            trailStatsComp = <AllTrailsStats trailStats={trailStats} />;
            break;
        case MapMode.TRAIL:
            trailStats = trailStats as MapData.SingleTrailStatsType;
            title = <TrailTitle isSegment={false} trailName={trailStats.trailName} />;
            completedStatus = <CompletedPct completePct={trailStats.completePct} />;
            trailStatsComp = <SingleTrailStats trailStats={trailStats} />;
            break;
        case MapMode.SEGMENT:
            trailStats = trailStats as MapData.TrailSegmentStatsType;
            title = <TrailTitle isSegment={true} trailName={trailStats.trailName} />;
            completedStatus = <CompletedStatus completedStatus={trailStats.completedStatus} />;
            trailStatsComp = <TrailSegmentStats trailStats={trailStats} />;
            break;
    }

    return (
        <div className={className}>
            <MobileExpandOrCollapseBtn handleClick={toggleShowStats} />
            <div className="side-panel-content">
                {title}
                <div className="dividing-line"></div>
                {completedStatus}
                {trailStatsComp}
            </div>
            <ExpandOrCollapseBtn handleClick={toggleShowStats} />
        </div>
    );
}

export default SidePanel;