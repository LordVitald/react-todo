import React from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker
} from 'antd';

import locale from 'antd/es/date-picker/locale/ru_RU'

class TaskForm extends React.Component{

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            console.log(fieldsValue);
            if (err) {
                return;
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit}>

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
                        })(<DatePicker style={{width:'100%'}} locale={locale} />)}
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