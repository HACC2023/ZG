import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

Meteor.startup(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root'),
  );
  root.render(<App />);
});
