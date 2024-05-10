import { Modal } from "antd";

const Confirmation = (props) => {
  const { open, setOpen, performAction, title, loading } = props;
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Confirmation"
      open={loading ? loading : open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
      confirmLoading={loading}
      destroyOnClose={false}
    >
      <p>{title}</p>
    </Modal>
  );
};
export default Confirmation;
