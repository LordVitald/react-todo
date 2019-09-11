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
        this.saveTask = this.saveTask.bind(this);
    }

    buildStatus(status,date) {

        switch (status) {
            case TASK_STATUS_ACTIVE:
                const dateNow = new Date();
                const dateComplete = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                return (dateNow > dateComplete) ?
                    (
                        TASK_STATUS_ACTIVE
                    ) : (
                        TASK_STATUS_EXPIRED
                    );
            default:
                return status
        }
    }

    saveTask(values){
        console.log(values);
    }

    render(){
        const {Tasks} = this.props;
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
                        listTaskStatus={getListStatuses()}
                        handelBuildStatus={this.buildStatus}/>
                </Content>
            </Layout>
        )
    }
}

export default AppToDo;