import './assets/css/Legend.css';

function Legend() {
    return (
        <div className="map-legend">
            <ul>
                <li className='is-complete'>Completed</li>
                <li>Not Completed</li>
            </ul>
        </div>
    );
}

export default Legend;