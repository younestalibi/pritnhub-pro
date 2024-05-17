import { useState } from 'react';
import { Menu,Input } from "antd";
import AvatarProfile from '../../Avatar/AvatarProfile';
import "./header.css";
import {ShoppingCartOutlined,CaretDownOutlined} from '@ant-design/icons';
const { Search } = Input;
import { useNavigate } from "react-router-dom";

const onSearch = (value, _e, info) => console.log(info?.source, value);
const items = [
  {
    label: (
      <span >
        Business Cards <CaretDownOutlined />
      </span>
    ),
    key: 'BusinessCards',
    children: [
      {
        type: 'group',
        label: 'Standard Cards',
        children: [
          {
            label: 'Standard Matte',
            key: 'product:1',
          },
          {
            label: 'Standard Glossy',
            key: 'product:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Premium Cards',
        children: [
          {
            label: 'Premium Matte',
            key: 'product:3',
          },
          {
            label: 'Premium Glossy',
            key: 'product:4',
          },
        ],
      },
    ],
  },
  {
    label:  (
      <span>
        Flyers <CaretDownOutlined />
      </span>
    ),
    key: 'Flyers',
    children: [
      {
        type: 'group',
        label: 'Standard Flyers',
        children: [
          {
            label: 'A5 Flyers',
            key: 'product:5',
          },
          {
            label: 'A4 Flyers',
            key: 'product:6',
          },
        ],
      },
      {
        type: 'group',
        label: 'Folded Flyers',
        children: [
          {
            label: 'Tri-Fold Flyers',
            key: 'product:7',
          },
          {
            label: 'Z-Fold Flyers',
            key: 'product:8',
          },
        ],
      },
    ],
  },
  {
    label: (
      <span>
        Posters <CaretDownOutlined />
      </span>
    ),
    key: 'Posters',
    children: [
      {
        type: 'group',
        label: 'Standard Posters',
        children: [
          {
            label: 'A2 Posters',
            key: 'product:9',
          },
          {
            label: 'A1 Posters',
            key: 'product:10',
          },
        ],
      },
      {
        type: 'group',
        label: 'Large Format Posters',
        children: [
          {
            label: 'B1 Posters',
            key: 'product:11',
          },
          {
            label: 'B0 Posters',
            key: 'product:12',
          },
        ],
      },
    ],
  },
  {
    label:  (
      <span>
        Brochures <CaretDownOutlined />
      </span>
    ),
    key: 'Brochures',
    children: [
      {
        type: 'group',
        label: 'Bi-Fold Brochures',
        children: [
          {
            label: 'A4 Bi-Fold',
            key: 'product:13',
          },
          {
            label: 'A3 Bi-Fold',
            key: 'product:14',
          },
        ],
      },
      {
        type: 'group',
        label: 'Tri-Fold Brochures',
        children: [
          {
            label: 'A4 Tri-Fold',
            key: 'product:15',
          },
          {
            label: 'A3 Tri-Fold',
            key: 'product:16',
          },
        ],
      },
    ],
  },
];

export default function AppHeader() {

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
    
        <div className="header">
          <div className="container-fluid">
              <div className="headerMain">
                <div className="logo">
                  <strong>
                    <span>PrintHub</span>-Pro
                  </strong>
                </div>
                <div className="SearchInput">
                  <Search
                    size='large'
                    placeholder="search product"
                    onSearch={onSearch}
                    enterButton
                    style={{ flex: 2, minWidth: 0}}
                  />
                </div>
                <div className="header-user-actions">
                    <i className="fa-solid fa-headset headset-icon"></i>
                    <AvatarProfile/>
                    <ShoppingCartOutlined style={{fontSize:'32px'}} />
                </div>
              </div>
          </div>
          <div className="navBar">
   
            <Menu 
              onClick={onClick} 
              selectedKeys={[current]} 
              mode="horizontal" 
              style={{width: '100%'}}
              items={items} />
              </div>
        
        </div>

    </>
  );
}
