// src/Admin/AdminDashboard.jsx

import React, { useEffect } from 'react'; // <--- 이 부분의 오타를 수정했습니다.
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaChartBar, FaCommentDots } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { Breadcrumb, Layout, Menu, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

// 메뉴 아이템 정의
const menuItems = [
  { key: '/admin', icon: <FaTachometerAlt />, label: '대시보드 홈' },
  { key: '/admin/training-data', icon: <FaDatabase />, label: '훈련데이터 관리' },
  { key: '/admin/statistics', icon: <FaChartBar />, label: '통계 관리' },
  { key: '/admin/feedback', icon: <FaCommentDots />, label: '피드백 관리' },
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 토큰 확인 로직
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // react-spring을 사용한 헤더 애니메이션
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 60 },
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 사이드바 메뉴 */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="bg-white shadow-md"
      >
        <div className="flex items-center justify-center h-16 text-2xl font-bold text-blue-600">
          Admin
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      <Layout className="site-layout">
        {/* 헤더 */}
        <animated.div style={headerAnimation}>
          <Header className="bg-white p-0 shadow-sm flex items-center px-6">
            <div className="flex justify-between items-center w-full">
              <span className="text-lg font-semibold">관리자 대시보드</span>
              <Space>
                <Avatar src="https://bit.ly/dan-abramov" icon={<UserOutlined />} />
                <span>Admin User</span>
              </Space>
            </div>
          </Header>
        </animated.div>

        {/* 메인 컨텐츠 */}
        <Content className="m-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              {menuItems.find(item => item.key === location.pathname)?.label || 'Page'}
            </Breadcrumb.Item>
          </Breadcrumb>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-white rounded-lg shadow-lg" style={{ minHeight: 360 }}>
              <Outlet />
            </div>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;