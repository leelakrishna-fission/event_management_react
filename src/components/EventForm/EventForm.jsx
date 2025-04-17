import { useEffect, useMemo, useState } from 'react';
import { addEvent, updateEvent } from '../../store/eventsSlice';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './EventForm.css';

const EventForm = ({ events, addEvent, updateEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    location: '',
    category: '',
    imagePreview: null,
    imageFile: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map(e => e.category)));
    return ['All', ...unique];
  }, [events]);

  useEffect(() => {
    if (params?.id) {
      const event = events.find(e => e?.id === params?.id);
      if (event) {
        setIsEditMode(true);
        setFormData({
          title: event.title,
          description: event.description,
          datetime: event.datetime,
          location: event.location,
          category: event.category,
          imagePreview: event.imagePreview,
          imageFile: null,
        });
      }
    }
  }, [params?.id, events]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
        imageFile: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const imageExists = formData.imagePreview;

    if (!form.checkValidity() || !imageExists) {
      setValidated(true);
      e.stopPropagation();
      return;
    }

    const eventPayload = {
      ...formData,
      imagePreview: formData.imagePreview,
    };

    if (isEditMode) {
      updateEvent({ ...eventPayload, id: params?.id });
    } else {
      addEvent(eventPayload);
    }

    navigate('/');
  };

  return (
    <div className="event-container">
      <h2 className="mb-4 text-center">{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>
      <form
        className={`row g-4 needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-12 position-relative">
          <label htmlFor="title" className="form-label fw-bold">Event Title <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
          <div className="invalid-tooltip">Title is required.</div>
        </div>

        <div className="col-md-12 position-relative">
          <label htmlFor="description" className="form-label fw-bold">Description <span className="text-danger">*</span></label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
            required
          />
          <div className="invalid-tooltip">Description is required.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="datetime" className="form-label fw-bold">Date & Time <span className="text-danger">*</span></label>
          <input
            type="datetime-local"
            className="form-control"
            id="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
          />
          <div className="invalid-tooltip">Date and time are required.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="location" className="form-label fw-bold">Location <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            required
          />
          <div className="invalid-tooltip">Location is required.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="category" className="form-label fw-bold">Category <span className="text-danger">*</span></label>
          <select
            className="form-select"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="invalid-tooltip">Please select a category.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="image" className="form-label fw-bold">Event Image <span className="text-danger">*</span></label>
          <input
            type="file"
            className={`form-control ${!formData.imagePreview && validated ? 'is-invalid' : ''}`}
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {!formData.imagePreview && validated && (
            <div className="invalid-tooltip">Please upload an image.</div>
          )}
        </div>

        {formData.imagePreview && (
          <div className="col-md-12">
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="img-thumbnail mt-2"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}

        <div className="col-12">
          <button className="btn btn-primary w-100" type="submit">
            {isEditMode ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events,
});

const mapDispatchToProps = {
  addEvent,
  updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
