import React from 'react';
import ReactDOM from 'react-dom';

import AppToDo from './AppToDo'



// const MyForm = Form.create({name:'create'})(TaskForm);
// ReactDOM.render(<MyForm handleSave={e=>{console.log(e)}}/>, document.getElementById('root'));



const repositoryTasks = [
    {
        key:0,
        title:'Задача №1',
        description: 'Описание задачи №1',
        completion_date: '01.12.2019',
        status: 'active'
    },
    {
        key:1,
        title:'Задача №2',
        description: 'Описание задачи №2',
        completion_date: '01.12.2019',
        status: 'active'
    },
    {
        key:2,
        title:'Задача №3',
        description: 'Описание задачи №3',
        completion_date: '01.09.2019',
        date_final:'30.08.2019',
        status: 'complete'
    },
    {
        key:3,
        title:'Задача №4',
        description: 'Описание задачи №4',
        completion_date: '01.09.2019',
        date_final:'30.08.2019',
        status: 'close'
    },
    {
        key:4,
        title:'Задача №5',
        description: 'Описание задачи №5',
        completion_date: '01.09.2019',
        date_final:'05.09.2019',
        status: 'complete_late'
    },
    {
        key:5,
        title:'Задача №6',
        description: 'Описание задачи №6',
        completion_date: '01.09.2019',
        status: 'active'
    },
    {
        key:6,
        title:'Задача №7',
        description: 'Описание задачи №7',
        completion_date: '01.09.2019',
        status: 'active'
    },
    {
        key:7,
        title:'Задача №8',
        description: 'Описание задачи №8',
        completion_date: '01.10.2019',
        status: 'active'
    },

];
ReactDOM.render(<AppToDo Tasks={repositoryTasks}/>, document.getElementById('root'));

