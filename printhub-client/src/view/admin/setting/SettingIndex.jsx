import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { Button, Table, notification } from "antd";
import { Image } from "antd";
import {
  getSettings,
  resetCatalog,
  resetStateSetting,
} from "../../../provider/features/setting/SettingSlice";
import SettingEdit from "./SettingEdit";

const SettingIndex = () => {
  const [editSettingModal, setEditSettingModal] = useState(false);
  const { settings, getSettingsState, resetSettingState } = useSelector(
    (state) => state.setting
  );
  const data = [];
  const dispatch = useDispatch();
  useEffect(() => {
    if (settings == null) {
      dispatch(getSettings());
    } else {
      dispatch(resetStateSetting());
    }
  }, []);

  useEffect(() => {
    if (resetSettingState.isSuccess) {
      notification.open({
        description: resetSettingState.message,
        duration: 3,
        type: "success",
      });
    }
    if (resetSettingState.isError) {
      notification.open({
        description: resetSettingState.message,
        duration: 3,
        type: "error",
      });
    }
  }, [resetSettingState.isSuccess, resetSettingState.isError]);

  if (settings) {
    data.push({
      key: 1,
      phone_number: settings.phone_number,
      address: settings.address,
      contact_email: settings.contact_email,
      website_name: settings.website_name,
      social_media_links: settings.social_media_links,
      whatsapp_chat_url: settings.whatsapp_chat_url,
      logo: (
        <Image
          alt={settings.logo}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          crossOrigin={import.meta.env.VITE_CLIENT_URL}
          loading="lazy"
          src={`${import.meta.env.VITE_SERVER_URL}/${settings.logo}`}
        />
      ),
      action: (
        <>
          <span
            onClick={() => {
              setEditSettingModal(true);
            }}
            className="btn-edit"
          >
            <BiEdit />
          </span>
        </>
      ),
    });
  }
  // }
  const start = () => {
    dispatch(getSettings());
  };

  return (
    <div>
      <BreadCrumb titles={["Home", "Settings"]} />
      <h1>Settings</h1>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="dashed"
          onClick={start}
          loading={getSettingsState.isLoading}
        >
          Refresh Catalogs
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            dispatch(resetCatalog());
          }}
          color="red"
          type="primary"
          icon={<IoReload size={20} />}
        >
          Default site settings
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={getSettingsState.isLoading}
        scroll={{ x: 1000 }}
      />

      <SettingEdit setOpen={setEditSettingModal} open={editSettingModal} />
    </div>
  );
};

export default SettingIndex;

const columns = [
  {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Contact Email",
    dataIndex: "contact_email",
  },
  {
    title: "Logo",
    dataIndex: "logo",
  },
  {
    title: "Website Name",
    dataIndex: "website_name",
  },
  {
    title: "Social Media",
    dataIndex: "social_media_links",
  },
  {
    title: "Whatsapp Chat",
    dataIndex: "whatsapp_chat_url",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];
