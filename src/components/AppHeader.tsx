import { HomeOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Layout, notification } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { getProfileAPI, loginAPI } from '../services/authServices';
import { setAuthorizationHeader } from '../services/axiosClient';

export default function AppHeader() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await loginAPI(data);
      const userRes = await getProfileAPI(res.data.access_token);
      setAuthorizationHeader(res.data.access_token);
      localStorage.setItem('remitano_token', res.data.access_token);
      return userRes.data;
    },
    onSuccess: async (data) => {
      notification.success({
        message: 'Success!',
        description: 'Login successfully!',
      });
      form.resetFields();
      setUser(data);
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Failed to login.',
      });
      setUser(null);
    },
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    mutation.mutate(values);
  };

  const handleLogout = () => {
    localStorage.removeItem('remitano_token');
    setUser(null);
  };

  return (
    <Layout>
      <Header className="bg-white flex justify-between items-center p-4 border-b border-gray-200">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <HomeOutlined className="text-xl mr-2" />
          <span className="text-xl font-bold">Funny Movies</span>
        </div>
        {!user ? (
          <Form onFinish={handleSubmit} className="flex space-x-2 mt-3">
            <Form.Item
              name="username"
              className="w-48"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="email" className="w-48" />
            </Form.Item>
            <Form.Item
              name="password"
              className="w-48"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password className="w-48" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="transform hover:scale-105 transition duration-300"
            >
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
          </Form>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Welcome {user?.email}</span>
            <Button
              className="transform hover:scale-105 transition duration-300"
              onClick={() => navigate('/share')}
            >
              Share a movie
            </Button>
            <Button
              onClick={handleLogout}
              type="primary"
              className="transform hover:scale-105 transition duration-300"
            >
              Logout
            </Button>
          </div>
        )}
      </Header>
    </Layout>
  );
}
