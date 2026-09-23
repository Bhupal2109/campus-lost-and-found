import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveItem, addNotification, CATEGORIES, LOCATIONS, getCurrentUser } from '../data/initialData';
import './ReportItem.css';

const STEPS = ['Type', 'Location & Date', 'Details', 'Image', 'Review'];

function TypeIcon({ type }) {
  if (type === 'lost') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 8.5h16v10H4z" />
        <path d="M8 8.5V6.75A1.75 1.75 0 0 1 9.75 5h4.5A1.75 1.75 0 0 1 16 6.75V8.5M8 13h8M12 11v4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 8.5h16v10H4z" />
      <path d="M8 8.5V6.75A1.75 1.75 0 0 1 9.75 5h4.5A1.75 1.75 0 0 1 16 6.75V8.5M7.5 13.5l2.25 2.25L16.5 9" />
    </svg>
  );
}

export default function ReportItem() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentUser = getCurrentUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: searchParams.get('type') === 'found' ? 'found' : 'lost',
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    color: '',
    brand: '',
    identifyingFeatures: '',
    tags: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newItem = {
      id: 'item_' + Date.now(),
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      reportedBy: currentUser.id,
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveItem(newItem);
    addNotification({
      message: `Item "${newItem.title}" reported successfully!`
    });

    navigate(`/items/${newItem.id}`);
  };

  return (
    <div className="report-item-page">
      <div className="report-container">
        <h1>Report an Item</h1>

        {/* Progress Bar */}
        <div className="progress-bar" style={{ '--progress': currentStep / (STEPS.length - 1) }}>
          {STEPS.map((step, index) => (
            <div key={step} className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              <div className="progress-number">{index + 1}</div>
              <div className="progress-label">{step}</div>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="form-container">
          {/* Step 1: Type */}
          {currentStep === 0 && (
            <div className="form-step">
              <h2>What type of item are you reporting?</h2>
              <div className="type-options">
                <label className="type-option">
                  <input
                    type="radio"
                    name="type"
                    value="lost"
                    checked={formData.type === 'lost'}
                    onChange={handleChange}
                  />
                  <div className="type-card">
                    <div className="type-icon type-icon-lost"><TypeIcon type="lost" /></div>
                    <div className="type-card-content">
                      <h3>Lost Item</h3>
                      <p>I lost something and want to report it</p>
                    </div>
                    <span className="type-indicator" aria-hidden="true" />
                  </div>
                </label>
                <label className="type-option">
                  <input
                    type="radio"
                    name="type"
                    value="found"
                    checked={formData.type === 'found'}
                    onChange={handleChange}
                  />
                  <div className="type-card">
                    <div className="type-icon type-icon-found"><TypeIcon type="found" /></div>
                    <div className="type-card-content">
                      <h3>Found Item</h3>
                      <p>I found something and want to help return it</p>
                    </div>
                    <span className="type-indicator" aria-hidden="true" />
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Location & Date */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>When and where?</h2>
              <div className="form-group">
                <label>Campus Location</label>
                <select name="location" value={formData.location} onChange={handleChange} required>
                  <option value="">Select Location</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Time (Approximate)</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Item Details</h2>
              <div className="form-group">
                <label>Item Name</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Black Wallet" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed description..." required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Black" />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., Samsung" />
                </div>
              </div>
              <div className="form-group">
                <label>Identifying Features</label>
                <textarea name="identifyingFeatures" value={formData.identifyingFeatures} onChange={handleChange} placeholder="Marks, scratches, or unique features..." />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., wallet, leather, red" />
              </div>
            </div>
          )}

          {/* Step 4: Image */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Upload Image</h2>
              <div className="image-upload">
                {formData.image ? (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                    <label className="change-image">
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
                      Change Image
                    </label>
                  </div>
                ) : (
                  <label className="upload-label">
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} required />
                    <div className="upload-content">
                      <div style={{fontSize: '2rem'}}>📸</div>
                      <p>Click to select an image</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Review Your Report</h2>
              <div className="review-card">
                <h3>{formData.title}</h3>
                <p><strong>Type:</strong> {formData.type}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                {formData.image && <img src={formData.image} alt="Review" style={{maxWidth: '200px', borderRadius: '8px'}} />}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="step-navigation">
            <button
              className="btn btn-secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            {currentStep === STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Report
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextStep}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
