import React from 'react'
import {Table, Popover, Form, Button} from 'antd'


class TaskTable extends React.Component{

    constructor(props){
        super(props)
        this.columns = this.columns.bind(this);
        this.buildTag4Status = this.buildTag4Status.bind(this);
    }

    buildTag4Status(status, completion_date){
        const {listTaskStatus, handelBuildStatus} = this.props;

        const taskStatus = handelBuildStatus(status,completion_date);

        if (listTaskStatus.has(taskStatus)){
            return listTaskStatus.get(taskStatus).tag;
        }
    }

    buildControls4Status(status){
        switch (status) {

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
                        <Popover trigger={"click"} content={<FormCreate handleSave={saveTaskHandler}/>}>
                            <Button icon={'plus'}>
                                Добавить задачу
                            </Button>
                        </Popover>
                    )
                },
                key: 'action',
                width: '10%',
                render: (item) => this.buildControls4Status(item),
            },
        ];
    }

    render(){

        const {Tasks} = this.props;
        return <Table dataSource={Tasks} columns={this.columns()}/>
    }
}

export default TaskTable;