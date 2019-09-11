import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Table, Tag, Popover } from 'antd';

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

function buildStatus(status,date){

    switch (status) {
        case TASK_STATUS_ACTIVE:
            const dateNow = new Date();
            const dateComplete = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            return (dateNow > dateComplete)?
                (
                    getListStatuses().get(TASK_STATUS_ACTIVE).tag
                ):(
                    getListStatuses().get(TASK_STATUS_EXPIRED).tag
                );
        default:
            return getListStatuses().get(status).tag
    }

}


function buildControls(task){

}




function AppToDo(props) {

    const {Tasks} = props;
    let arrFilters = [];

    for( const item of getListStatuses().values()){
        arrFilters.push({text:item.tag,value:item.value})
    }
    const columns = [
        {
            title:'Статус',
            dataIndex:'status',
            filters:arrFilters,
            width: '10%',
            render: (status, object)=>{
                return buildStatus(status,object.completion_date);
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
            title: '',
            key: 'action',
            width: '10%',
            render: (item) => buildControls(item),
        },
    ];

    return (
        <Layout>
            <Header style={{ position:"fixed", zIndex:1, width:'100%'}}>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Table dataSource={Tasks} columns={columns}/>
            </Content>
        </Layout>
    )
}

export default AppToDo;