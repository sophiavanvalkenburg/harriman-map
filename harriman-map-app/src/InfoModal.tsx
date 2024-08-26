import closeSvg from "./assets/icons/close_x.svg";
import './assets/css/InfoModal.css';

type InfoModalProps = {
    visible: boolean,
    closeBtnHandler: () => void
}
function InfoModal({visible, closeBtnHandler}: InfoModalProps) {
    let className = "map-info-modal" + (visible ? "" : " hide");
    return (
        <div className={className}>
            <div className="modal">
                <div className="header">
                    <button className="close-btn" onClick={closeBtnHandler}><img src={closeSvg} /></button>
                </div>
                <div className="content">
                    <h1>Welcome to Sophia's trail map!</h1>
                    <div className="description">
                        <p>My partner and I started visiting NY State's <a href="https://parks.ny.gov/parks/harriman">Harriman</a> & <a href="https://parks.ny.gov/parks/bearmountain/amenities.aspx">Bear Mountain</a> State Parks in 2015. What started as a fun pastime quickly became a passion. Each time we went out we’d try to visit an area of the park we’d never been before, and eventually, we figured we should start keeping track of which trails we’d hiked already.</p>
                        <p>This map is the visualization of a spreadsheet I’ve updated over the years that has tracked our progress completing blazed trails throughout the parks. You may click on an individual trail to see stats for that trail by itself, and also click on individual segments within an incomplete trail to view stats for those segments. I hope you enjoy playing around with the map!</p>
                    </div>
                    <p className="github-link"><a href="https://github.com/sophiavanvalkenburg/harriman-map" target="_blank">Click here to check out the code on GitHub!</a></p>
                </div> 
            </div>
            <div className="bg" onClick={closeBtnHandler}></div>
        </div>
    );
}

export default InfoModal;