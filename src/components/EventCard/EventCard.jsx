import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';

const EventCard = ({ event, isPast = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromDetails = location.state?.fromDetails ?? false;


  const formattedDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-event/${event.id}`);
  };

  return (
    <div
      className={`glass-card ${isPast ? 'past-event' : ''}`}
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="event-image-container">
        <img
          src={event.imagePreview || 'https://via.placeholder.com/600x300?text=Event'}
          alt={event.title}
          className="event-image"
        />
        <span className="event-category">{event.category}</span>
        {/* <span className="event-edit" title="Edit Event" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </span> */}
        {!fromDetails && (
          <span className="event-edit" title="Edit Event" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPencil} />
          </span>
        )}
        </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <p><i className="bi bi-calendar-event-fill" /> {formattedDate(event.datetime)}</p>
          {event.location && (
            <p><i className="bi bi-geo-alt-fill" /> {event.location}</p>
          )}
        </div>

        <button className="view-button">View Details →</button>
      </div>
    </div>
  );
};

export default EventCard;
