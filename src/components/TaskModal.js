import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TaskModal.css';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [dimension, setDimension] = useState('1x1');
  const [flow, setFlow] = useState('other_models_mix');
  const [manualPrompts, setManualPrompts] = useState('');
  const [genPerRef, setGenPerRef] = useState(1);
  const [style, setStyle] = useState('An ultra-realistic photography');
  const [selectedImage, setSelectedImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (task) {
      setDimension(task.dimension || '1x1');
      setFlow(task.flow || 'other_models_mix');
      setManualPrompts(task.manualPrompts || '');
      setGenPerRef(task.genPerRef || 1);
      setStyle(task.style || 'An ultra-realistic photography');
      setSelectedImage('');
      setImagePreview(null);
    }
  }, [task]);



const handleGenerate = async () => {
  try {
    const requestData = {
      images: selectedImage ? [selectedImage] : [],
      dimension,
      style,
      manual_prompts: manualPrompts,
      gen_per_ref: genPerRef,
      flow,
      text
    };

    // POST запит до API
    const response = await axios.post('https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_images', requestData, {
      auth: {
        username: 'renesandro',
        password: 'qwerty1234',
      },
    });

    console.log('Generated images:', response.data);

    const updatedTask = {
      ...task,
      dimension,
      flow,
      style,
      manual_prompts: manualPrompts,
      genPerRef,
      images: selectedImage ? [...(task.images || []), selectedImage] : task.images,
    };

    onSave(updatedTask); 
  } catch (error) {
    console.error('Error generating images:', error);

    // оновлення завдання і у випадку помилки(для фото) 
    const updatedTask = {
      ...task,
      dimension,
      flow,
      style,
      manual_prompts: manualPrompts,
      genPerRef,
      images: selectedImage ? [...(task.images || []), selectedImage] : task.images,
      text
    };

    onSave(updatedTask); 
  } finally {
    onClose(); 
  }
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      const fileName = file.name;
      setSelectedImage(fileName);
      setImagePreview(URL.createObjectURL(file)); 

      if (selectedImage && task.images.includes(selectedImage)) {
        const updatedImages = task.images.map(img => img === selectedImage ? fileName : img);
        onSave({
          ...task,
          images: updatedImages
        });
      }
    }
  };

  const handleImageRemove = () => {
    if (selectedImage) {
      const updatedImages = (task.images || []).filter(img => img !== selectedImage);
      setSelectedImage('');
      setImagePreview(null);
      onSave({
        ...task,
        images: updatedImages
      });
    }
  };

  const handleImageSelectionChange = (e) => {
    const imageName = e.target.value;
    setSelectedImage(imageName);
    if (imageName && task.images.includes(imageName)) {
      setImagePreview(null); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" id='close-modal-button' onClick={onClose}>
          <AiOutlineClose />
        </button>
        <h2>{task ? task.task_name : 'Add New Task'}</h2>
        <div>
            <label>Text:</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        <div>
          <label>
            Dimension:
            <select value={dimension} onChange={(e) => setDimension(e.target.value)}>
              <option value="1x1">1x1</option>
              <option value="9x16">9x16</option>
              <option value="16x9">16x9</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Flow:
            <select value={flow} onChange={(e) => setFlow(e.target.value)}>
              <option value="other_models_mix">Other Models Mix</option>
              <option value="mj_model">MJ Model</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select Image Layer:
            <select
              value={selectedImage || ''}
              onChange={handleImageSelectionChange}
            >
              <option value="">New image</option>
              {(task.images || []).map((image, index) => (
                <option key={index} value={image}>{image}</option>
              ))}
            </select>
          </label>
          <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageUpload} />
          {selectedImage && (
            <div className="image-preview">
              {imagePreview && <img src={imagePreview} alt="Selected" className="preview-box" />}
              <button onClick={handleImageRemove}>Remove Image</button>
            </div>
          )}
        </div>
        <div>
          <label>
            Manual Prompts:<br />
            <textarea value={manualPrompts} onChange={(e) => setManualPrompts(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Generatios per ref:
            <input type="number" value={genPerRef} onChange={(e) => setGenPerRef(Number(e.target.value))} />
          </label>
        </div>
        <div>
          <label>
            Style:
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="An ultra-realistic photography">An ultra-realistic photography</option>
              <option value="Anime style">Anime style</option>
            </select>
          </label>
        </div>
        
        <button onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default TaskModal;
