import { Link } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
    return (
        <Link to={`/activity/${activity.id}`} className="activity-card">
            <img
                src={activity.image_url}
                alt={activity.title}
                className="activity-card-image"
            />
            <div className="activity-card-content">
                <h3>{activity.title}</h3>
                <p className="activity-schedule">
                    📅 {activity.day} - 🕐 {activity.schedule}
                </p>
                <p className="activity-instructor">
                    👤 {activity.instructor}
                </p>
            </div>
        </Link>
    );
};

export default ActivityCard;