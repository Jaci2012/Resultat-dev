// 1-npm install -g create-react-app
// npx create-react-app project
// cd project
// npm start

//2
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Adresse e-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Numéro de téléphone 
          <input type="tel" name="phoneNumber" pattern="[0-9]{10}" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact


//3
import React from 'react';

const Field= ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label>
        {label}:
        <input type={type} name={name} value={value} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field;



import React from 'react';

const Field2 = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label>
        {label}:
        <textarea name={name} value={value} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field2


// ContactForm.js
import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ajoutez ici la logique pour traiter le formulaire.
  };

  return (
    <div>
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit}>
        <Field label="Nom" type="text" name="name" value={formData.name} onChange={handleChange} />
        <Field label="Adresse e-mail" type="email" name="email" value={formData.email} onChange={handleChange} />
        <Field label="Numéro de téléphone français" type="tel" name="phoneNumber" pattern="[0-9]{10}" value={formData.phoneNumber} onChange={handleChange} />
        <Field2 label="Message" name="message" value={formData.message} onChange={handleChange} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;



// 4-fichier1.js
export const updateFormData = (formData) => {
  return {
    type: 'UPDATE_FORM_DATA',
    payload: formData,
  };
};


Partie reducer: fichier2.js
const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default formReducer;


Fichier store: fichier3.js
import { createStore } from 'redux';
import formReducer from './reducers';

const store = createStore(formReducer);

export default store;



// ContactForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from './fichier1'

const ContactForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ajoutez ici la logique pour traiter le formulaire.
  };

  return (
    <div>
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit}>
        {/* Utilisez les champs connectés à Redux */}
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {/* ... Autres champs ... */}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ContactForm;


// App.js
import React from 'react';
import { Provider } from 'react-redux';
import ContactForm from './ContactForm';
import store from './fichier3';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Mon Site Web</h1>
        <ContactForm />
      </div>
    </Provider>
  );
};

export default App;


// 5- Oui bien sur car Les valeurs des champs du formulaire sont stockées dans le state global de Redux via le réducteur formReducer. Les composants sont connectés au store Redux, et les changements dans les champs déclenchent l'action qui met à jour le state global.


// 6-// ContactForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from './fichier3';

const ContactForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const isEmailValid = (email) => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
  
    return phoneNumber.length === 10 && !isNaN(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!isEmailValid(formData.email)) {
      alert(" votre email n'est pas valide.");
      return;
    }

    if (!isPhoneNumberValid(formData.phoneNumber)) {
      alert("Veuillez saisir un numéro valide.");
      return;
    }
    console.log("Formulaire soumis avec succès :", formData);
    
  };

  return (
    <div>
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit}>
        
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Adresse e-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Numéro de téléphone français:
          <input type="tel" name="phoneNumber" pattern="[0-9]{10}" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ContactForm;



// 7-
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
   

    setSubmitted(true);
  };

  return (
    <div>
      <h2>Ny formulaire </h2>
      {isSubmitted ? (
        <div>
          <p>Formulaire soumis avec succès ! Voici les informations :</p>
          <p><strong>Nom:</strong> {formData.name}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Form;


{/* 12-
git add.
git commit -m "handefa"
git pull
git push */}


Mankasitraka fa zay tompoko no tratrako amin'ny lay test











