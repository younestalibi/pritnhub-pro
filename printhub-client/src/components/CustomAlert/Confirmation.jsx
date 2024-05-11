import { Modal } from "antd";

const Confirmation = (props) => {
  const { open, setOpen, performAction, title,description, loading ,okType,okText} = props;
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <Modal
      okType={okType}
      title={title}
      open={loading ? loading : open}
      onOk={performAction}
      onCancel={hideModal}
      okText={okText}
      
      cancelText="Cancel"
      confirmLoading={loading}
      destroyOnClose={false}
    >
      <p>{description}</p>
    </Modal>
  );
};
export default Confirmation;
