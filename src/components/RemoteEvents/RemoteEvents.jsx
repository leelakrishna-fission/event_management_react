import { connect } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faCalendarAlt,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import EventCard from '../EventCard/EventCard';
import './RemoteEvents.css';
import EventService from '../../services/services';
import { setEvents } from '../../store/eventsSlice';

const eventService = new EventService();

const RemoteEventsList = ({ events, setEvents }) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const navigate = useNavigate();

  const now = new Date();

  useEffect(() => {
    
      getEvents();
    
  }, []);

  const getEvents = async () => {
    try {
      const { data } = await eventService.getEvents();
      setEvents([...data]);
    } catch (error) {
      console.error(error);
    }
  }

  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((e) => e.category)));
    return ['All', ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        filterCategory === 'All' || event.category === filterCategory;
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, filterCategory, search]);

  const upcoming = useMemo(() => {
    return filteredEvents
      .filter((e) => new Date(e.datetime) >= now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [filteredEvents]);

  const past = useMemo(() => {
    return filteredEvents
      .filter((e) => new Date(e.datetime) < now)
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  }, [filteredEvents]);

  return (
    <div className="event-list-wrapper">
      <div className="event-header">
        <h2 className='event-listing-heading'>RemoteEvents</h2>
      </div>

      <div className="event-filters">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="input-icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search by event title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="category-box">
          <FontAwesomeIcon icon={faFilter} className="input-icon" />
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>      
      </div>

      <div className="event-section">
        <h4>
          <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
          Upcoming Events
        </h4>
        <div className="row">
          {upcoming.length ? (
            upcoming.map((event) => (
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-4" key={event.id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <p className="text-muted mt-2">No upcoming events.</p>
          )}
        </div>
      </div>

      <div className="event-section">
        <h4 className="mt-4">
          <FontAwesomeIcon icon={faHistory} className="me-2" />
          Past Events
        </h4>
        <div className="row">
          {past.length ? (
            past.map((event) => (
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-4" key={event.id}>
                <EventCard event={event} isPast={true} />
              </div>
            ))
          ) : (
            <p className="text-muted mt-2">No past events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state?.events?.events || [],
});

const mapDispatchToProps = {
setEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteEventsList);
