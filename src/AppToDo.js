import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Tag, Form } from 'antd';
import TaskTable from './Components/TaskTable';
import TaskForm from './Components/TaskForm';

const {Header, Content} = Layout;

const TASK_STATUS_ACTIVE = 'active';
const TASK_STATUS_COMPLETE = 'complete';
const TASK_STATUS_COMPLETE_LATE = 'complete_late';
const TASK_STATUS_CLOSE = 'close';
const TASK_STATUS_EXPIRED = 'expired';

let listTaskStatus = new Map();

function getListStatuses(){

    if (listTaskStatus.size === 0){
        listTaskStatus.set(
            TASK_STATUS_ACTIVE,
            {
                text:'Активна',
                value: TASK_STATUS_ACTIVE,
                tag: <Tag color={"lime"}>Активна</Tag>
            }
        );

        listTaskStatus.set(
            TASK_STATUS_COMPLETE,
            {
                text:'Выполнена',
                value: TASK_STATUS_COMPLETE,
                tag: <Tag color={"green"}>Выполнена</Tag>
            });

        listTaskStatus.set(
            TASK_STATUS_COMPLETE_LATE,
            {
                text:'Выполнена с опозданием',
                value: TASK_STATUS_COMPLETE_LATE,
                tag: <Tag color={"volcano"}>Выполнена с опозданием</Tag>
            }
        );

        listTaskStatus.set(
            TASK_STATUS_CLOSE,
            {
                text:'Отменена',
                value: TASK_STATUS_CLOSE,
                tag: <Tag color={"purple"}>Отменена</Tag>
            }
        );

        listTaskStatus.set(
            TASK_STATUS_EXPIRED,
            {
                text:'Просрочена',
                value: TASK_STATUS_EXPIRED,
                tag: <Tag color={"orange"}>Просрочена</Tag>
            }
        );
    }

    return listTaskStatus;
}

class AppToDo extends React.Component{

    constructor(props){
        super(props);
        this.state = {...props};
        this.saveTask = this.saveTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

    }

    buildStatus(status,date) {

        if (status === TASK_STATUS_ACTIVE) {

            const dateNow = new Date();
            const dateComplete = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            return (dateNow < dateComplete) ? TASK_STATUS_ACTIVE : TASK_STATUS_EXPIRED ;
        }else{
            return status
        }
    }

    saveTask(task, key){
        const {Tasks = []} = this.state;

        if (key !== undefined){
            const Result = Tasks.map( currentTask => (currentTask.key === key)? {...currentTask,...task} : currentTask );
            localStorage.setItem('Tasks', JSON.stringify(Result));

            this.setState( {
                Tasks:Result,
            });
        }else{
            if(Tasks.length){

            }
        }


    }

    completeTask(task){
        alert('Задача завершена');
        console.log(task);
    }

    deleteTask(task){
        alert('Задача удалена');
        console.log(task);
    }

    render(){
        const {Tasks} = this.state;
        const CreateForm = Form.create({name:'createForm'})(TaskForm);

        return (
            <Layout>
                <Header style={{ position:"fixed", zIndex:1, width:'100%'}}>
                </Header>

                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <TaskTable
                        Tasks={Tasks}
                        createForm={CreateForm}
                        saveTaskHandler={this.saveTask}
                        completeTaskHandler={this.completeTask}
                        deleteTaskHandler={this.deleteTask}
                        listTaskStatus={getListStatuses()}
                        handelBuildStatus={this.buildStatus}/>
                </Content>
            </Layout>
        )
    }
}

export default AppToDo;