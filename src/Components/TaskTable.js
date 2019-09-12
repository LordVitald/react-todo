import React from 'react'
import {Table, Popover, Form, Button, Icon, Popconfirm} from 'antd'
import TaskForm from "./TaskForm";

class TaskTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
        this.columns = this.columns.bind(this);
        this.buildTag4Status = this.buildTag4Status.bind(this);
        this.buildControls4Task = this.buildControls4Task.bind(this);
    }

    buildTag4Status(status, completion_date){
        const {listTaskStatus, handelBuildStatus} = this.props;

        const taskStatus = handelBuildStatus(status,completion_date);

        if (listTaskStatus.has(taskStatus)){
            return listTaskStatus.get(taskStatus).tag;
        }
    }

    buildControls4Task(task){
        const {editKey} = this.state;
        if (task.status === 'active'){
            const {saveTaskHandler, completeTaskHandler, deleteTaskHandler} = this.props;
            const TaskFormTask = Form.create({})(TaskForm);
            // const FormNode = <TaskFormTask Task={task} handleSave={saveTaskHandler}/>;
            return (
                <div>
                    <Popover
                        title={task.title}
                        content={<TaskFormTask Task={task} handleSave={ (fieldsValue, key = task.key) => {saveTaskHandler(fieldsValue, key); this.setState({editKey:undefined})}} />}
                        placement={"leftTop"}
                        visible={task.key===editKey}
                    >
                        <Icon type={"edit"} theme={"twoTone"} onClick={() => this.setState({editKey:task.key})} style={{fontSize:'24px', marginRight:'10px'}}/>
                    </Popover>
                    <Popconfirm
                        title={"Задача выполнена?" }
                        icon={<Icon type="check-circle" style={{color:'green', fontSize:'1.2em'}}/>}
                        trigger={"click"}
                        placement={"leftTop"}
                        okText={'Да'}
                        cancelText={'Нет'}
                        onConfirm={ e => completeTaskHandler(task)}
                    >
                        <Icon type="check-circle" theme="twoTone"  twoToneColor={"#19eb12"} style={{fontSize:'24px', marginRight:'10px'}}/>
                    </Popconfirm>
                    <Popconfirm
                        title={"Удалить задачу?" }
                        icon={<Icon type="warning" style={{color:'red', fontSize:'1.2em'}}/>}
                        trigger={"click"}
                        placement={"leftTop"}
                        okText={'Да'}
                        cancelText={'Нет'}
                        onConfirm={e => deleteTaskHandler(task)}
                    >
                        <Icon type="delete" theme="twoTone"  twoToneColor={"#eb0617"} style={{fontSize:'24px', marginRight:'10px'}}/>
                    </Popconfirm>
                </div>
            )
        } else{
            return '';
        }
    }

    columns(){
        const {listTaskStatus, createForm, FormCreate = createForm, saveTaskHandler} = this.props;
        let arrFilters = [];

        for( const item of listTaskStatus.values()){
            arrFilters.push({text:item.tag,value:item.value})
        }

        return [
            {
                title:'Статус',
                dataIndex:'status',
                filters:arrFilters,
                width: '10%',
                render: (status, object)=>{
                    return this.buildTag4Status(status,object.completion_date);
                }
            },
            {
                title:'Название задачи',
                dataIndex:'title',
                render: (title, object)=>{
                    return(
                        <Popover
                            title={title}
                            content={object.description}
                            placement={"topLeft"}
                        >
                            <p>{title}</p>
                        </Popover>
                    );
                }
            },
            {
                title:'Дата',
                dataIndex:'completion_date',
                width: '10%'
            },
            {
                title: () => {
                    return (
                        <Popover trigger={"click"} placement={"leftTop"} content={<FormCreate handleSave={saveTaskHandler}/>}>
                            <Button icon={'plus'}>
                                Добавить задачу
                            </Button>
                        </Popover>
                    )
                },
                key: 'action',
                width: '10%',
                render: (item) => this.buildControls4Task(item),
            },
        ];
    }

    render(){

        const {Tasks} = this.props;
        return <Table dataSource={Tasks} columns={this.columns()}/>
    }
}

export default TaskTable;