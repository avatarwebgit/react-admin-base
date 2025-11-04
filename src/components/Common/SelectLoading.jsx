import { Spinner } from "reactstrap";

const SelectLoading = () => {
  return (
    <div className="p-3 text-center">
      <Spinner size="sm" color="primary" />
      <div>در حال بارگذاری...</div>
    </div>
  );
};

export default SelectLoading;
