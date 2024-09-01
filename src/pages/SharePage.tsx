// src/components/ShareForm.jsx
import React, { useContext } from 'react';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { shareVideoAPI } from '../services/videoServices';
import { UserContext } from '../App';

const { Title } = Typography;

const SharePage = () => {
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: { url: string }) => {
      const res = await shareVideoAPI(data.url);
      return res.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Success!',
        description: 'YouTube movie shared successfully!',
      });
      form.resetFields();
      navigate('/');
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Failed to share the YouTube movie.',
      });
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-8 border rounded-lg">
        <Title className="text-center" level={4}>
          Please login to share a YouTube movie
        </Title>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-8 border rounded-lg">
      <Title className="text-center" level={4}>
        Share a YouTube movie
      </Title>
      <Form
        form={form}
        name="share_movie"
        layout="vertical"
        onFinish={onFinish}
        className="mt-6 flex flex-col space-y-4"
      >
        <Form.Item
          name="url"
          label="YouTube URL:"
          rules={[
            {
              required: true,
              message: 'Please input the YouTube URL!',
            },
            {
              type: 'url',
              message: 'Please enter a valid URL!',
            },
          ]}
        >
          <Input placeholder="Enter YouTube URL" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={mutation.isPending}
          >
            Share
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SharePage;
