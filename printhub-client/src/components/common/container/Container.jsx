const Container = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "80%",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
