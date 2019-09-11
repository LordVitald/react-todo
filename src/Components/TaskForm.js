import React from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker
} from 'antd';

import locale from 'antd/es/date-picker/locale/ru_RU'
import moment from "moment";

class TaskForm extends React.Component{

    handleSubmit( handleSave){
        return e => {
            e.preventDefault();

            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }else{
                    handleSave(fieldsValue);
                }
            });
        }
    }
    componentDidMount() {

        const { Task = {
                title:'',
                description:'',
                completion_date:(new Date()).toLocaleDateString('ru-RU')
            }
        } = this.props;

        this.props.form.setFieldsValue(
            {
                ...Task,
                completion_date:moment( Task.completion_date ,'DD.MM.YYYY')
            }
        );
    }

    render() {
        const { handleSave } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit(handleSave)}>

                <Form.Item label="Название задачи">
                    {getFieldDecorator(
                        'title', {
                            rules: [{ required: true, message: 'Введите название Задачи' }],
                        })(<Input   maxLength={255}/>)}
                </Form.Item>

                <Form.Item label={"Дата планируемого завершения"}>
                    {getFieldDecorator(
                        'completion_date', {
                            rules: [{ required: true, message: 'Укажите дату планируемого завершения задачи' }],
                        })(<DatePicker style={{width:'100%'}} locale={locale} format={"DD.MM.YYYY"} />)}
                </Form.Item>

                <Form.Item label="Описание задачи">
                    {getFieldDecorator(
                    'description', {
                    rules: [{ }],
                    })(<Input.TextArea maxLength={512} />)}
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        )
    }
}

export default TaskForm;