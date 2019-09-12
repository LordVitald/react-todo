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
                    handleSave(
                        {
                            ...fieldsValue,
                            completion_date:fieldsValue['completion_date'].format('DD.MM.YYYY')
                        }
                    );
                }
            });
        }
    }

    render() {
        const {
            handleSave,
            Task = {
                title:'',
                description:'',
                completion_date:(new Date()).toLocaleDateString('ru-RU')
            }
        } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit(handleSave)}>

                <Form.Item label="Название задачи">
                    {getFieldDecorator(
                        'title', {
                            initialValue:Task.title,
                            rules: [{ required: true, message: 'Введите название Задачи' }],
                        })(<Input  maxLength={255}/>)}
                </Form.Item>

                <Form.Item label={"Дата планируемого завершения"}>
                    {getFieldDecorator(
                        'completion_date', {
                            initialValue:moment( Task.completion_date ,'DD.MM.YYYY'),
                            rules: [{ required: true, message: 'Укажите дату планируемого завершения задачи' }],
                        })(<DatePicker style={{width:'100%'}} locale={locale} format={"DD.MM.YYYY"} />)}
                </Form.Item>

                <Form.Item label="Описание задачи">
                    {getFieldDecorator(
                    'description', {
                        initialValue:Task.description,
                        rules: [{ }],
                    })(<Input.TextArea maxLength={512} />)}
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    {Task? 'Сохранить' : 'Создать' }
                </Button>
            </Form>
        )
    }
}

export default TaskForm;