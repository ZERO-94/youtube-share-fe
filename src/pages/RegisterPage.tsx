import React, { useContext, useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerAPI } from '../services/authServices';

type FieldType = {
  email?: string;
  password?: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: (values: Required<FieldType>) => {
      return registerAPI(values);
    },
    onSuccess: () => {
      notification.success({
        message: 'Register successfully',
      });
      form.resetFields();
    },
    onError: (error: Error) => {
      notification.error({
        message:
          error.response.data.message ??
          error.message ??
          'Something went wrong',
      });
    },
  });

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          mutation.mutate(values);
        }}
        className="mx-auto"
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
