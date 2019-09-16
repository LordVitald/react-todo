import React from 'react';
import ReactDOM from 'react-dom';

import AppToDo from './AppToDo'
import generateKey4Task from './Helpers/KeyGenerator'

const repositoryTasks = localStorage.getItem('Tasks')? JSON.parse(localStorage.getItem('Tasks')) : [];

const lastTask = repositoryTasks.slice(-1);
const initKey = (lastTask.length)? lastTask.pop().key : 0;

let gen = generateKey4Task(initKey);

ReactDOM.render(<AppToDo Tasks={repositoryTasks} keyGenerator={gen}/>, document.getElementById('root'));

