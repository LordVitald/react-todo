import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Tag, Form, Row,Col } from 'antd';
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

function isEmptyObject(obj){
    for(let key in obj){
        return false;
    }
    return true;
}

class AppToDo extends React.Component{

    constructor(props){
        super(props);
        this.state = {...props};
        this.state.ViewTasks = this.state.Tasks;
        this.state.filters = {};
        this.state.sorter = {};

        this.saveTask = this.saveTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    buildStatus(status,date) {

        if (status === TASK_STATUS_ACTIVE) {

            const dateNow = new Date();
            dateNow.setHours(0,0,0,0);
            const dateComplete = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            return (dateNow <= dateComplete) ? TASK_STATUS_ACTIVE : TASK_STATUS_EXPIRED ;
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

            const dateNow = new Date();
            const dateComplete = new Date(task.completion_date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            dateNow.setHours(0,0,0,0);
            const status = (dateNow <= dateComplete) ? TASK_STATUS_ACTIVE : TASK_STATUS_EXPIRED ;

            const newTask = {
                ...task,
                key: this.state.keyGenerator.next().value,
                status: status
            };
            console.log(newTask);
            Tasks.push(newTask);
            localStorage.setItem('Tasks', JSON.stringify(Tasks));
            this.setState( {
                Tasks:Tasks,
            });
        }


    }

    completeTask(task){
        const {Tasks} = this.state;

        const dateNow = new Date();
        const dateComplete = new Date(task.completion_date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
        dateNow.setHours(0,0,0,0);
        const status = (dateNow <= dateComplete) ? TASK_STATUS_COMPLETE : TASK_STATUS_COMPLETE_LATE ;

        const Result = Tasks.map( currentTask => (currentTask.key !== task.key)? currentTask : {...currentTask,status:status});
        localStorage.setItem('Tasks', JSON.stringify(Result));
        this.setState({
            Tasks:Result
        })
    }

    deleteTask(task){
        const {Tasks} = this.state;
        const Result = Tasks.map( currentTask => (currentTask.key !== task.key)? currentTask : {...currentTask,status:TASK_STATUS_CLOSE});
        localStorage.setItem('Tasks', JSON.stringify(Result));
        this.setState({
            Tasks:Result
        })
    }

    fetchData(){
        let {Tasks,filters,sorter} = this.state;

        if(!isEmptyObject(filters) && filters.status.length){

            Tasks = Tasks.filter((task) => (filters.status.indexOf(this.buildStatus(task.status,task.completion_date))) >- 1);
        }

        if(!isEmptyObject(sorter)){
            const order = (sorter.order === 'ascend')? 1 : -1;
            Tasks.sort( (a,b) => order*a.title.localeCompare(b.title,'ru') )
        }

        return Tasks;
    }

    render(){
        const CreateForm = Form.create({name:'createForm'})(TaskForm);
        const ViewTasks = this.fetchData();
        return (
            <Layout>
                <Header style={{ position:"fixed", zIndex:1, width:'100%'}}>
                </Header>

                <Content style={{  margin: '24px 16px 0', position:'fixed' , width:'100%'  }}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={20}>
                            <div style={{ padding: 24, marginTop:24, background: '#fff'  }}>
                                <TaskTable
                                    Tasks={ViewTasks}
                                    createForm={CreateForm}
                                    saveTaskHandler={this.saveTask}
                                    completeTaskHandler={this.completeTask}
                                    deleteTaskHandler={this.deleteTask}
                                    listTaskStatus={getListStatuses()}
                                    handelBuildStatus={this.buildStatus}
                                    changeHandler={(filters,sorter) => this.setState({filters:filters,sorter:sorter})}
                                />
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

export default AppToDo;