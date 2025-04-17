import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useMemo } from 'react';
import './EventDetails.css';

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const event = useMemo(() => events.find((event) => event.id === id), [events, id]);

  const [hasAttended, setHasAttended] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event?.attendees || 0);

  const formattedDate = useMemo(() => {
    return event?.datetime
      ? new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(event.datetime))
      : '';
  }, [event]);

  const handleAttend = () => {
    if (!hasAttended) {
      setAttendeeCount((prev) => prev + 1);
      setHasAttended(true);
    }
  };

  if (!event) {
    return <p className="text-center mt-5">Event not found.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{event.title}</h2>
      <p className="text-muted">{formattedDate}</p>

      {event.imagePreview && (
        <img
          src={event.imagePreview}
          alt={event.title}
          className="img-fluid mb-3"
        />
      )}

      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>

      {event.location && (
        <p>
          <strong>Location:</strong>{' '}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.location}
          </a>
        </p>
      )}

      <div className="attendee-count">
        <p><strong>Attendees:</strong> <span>{attendeeCount}</span></p>
      </div>

      <button
        className="btn btn-success"
        onClick={handleAttend}
        disabled={hasAttended}
      >
        {hasAttended ? 'Attending' : 'Attend'}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state?.events?.events || [],
});

export default connect(mapStateToProps)(EventDetails);
