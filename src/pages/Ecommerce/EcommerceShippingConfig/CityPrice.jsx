import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Input, UncontrolledTooltip } from "reactstrap";
import { CheckIcon, CrossIcon } from "../../../components/Common/icons";
import {
  formatPersianCurrency,
  parseCurrencyInput,
} from "../../../utils/helperFunctions";

const CityPrice = ({ province, index, onAddToDelete, onUpdate }) => {
  const [currentPrice, setCurrentPrice] = useState(
    parseCurrencyInput(province.price) || 0
  );
  const [updatedPrice, setUpdatedPrice] = useState(province.price || 0);
  const [updatable, setUpdatable] = useState(false);

  const dispatch = useDispatch();

  const handleUpdatePrice = () => {};

  const handleResetPrice = () => {
    setUpdatedPrice(currentPrice);
  };

  useEffect(() => {
    if (updatedPrice && currentPrice) {
      setUpdatable(updatedPrice !== currentPrice);
    }
  }, [updatedPrice, currentPrice]);

  return (
    <tr>
      <th>{index + 1}</th>
      <th className="align-middle">
        <Input
          className="m-auto"
          type="checkbox"
          onChange={() => onAddToDelete(province.id)}
        />
      </th>
      <td>{province.name}</td>
      <td>
        <center>
          <Col sm="6">
            <Input
              className="text-center"
              name="price"
              value={formatPersianCurrency(updatedPrice)}
              onChange={(e) => {
                const rawValue = parseCurrencyInput(e.target.value);
                setUpdatedPrice(rawValue);
              }}
            />
          </Col>
        </center>
      </td>
      <td>
        <button
          onClick={handleResetPrice}
          id={`resetButton-${index}`}
          className={`pt-2 show-button ${updatable ? "show" : ""}`}
        >
          {CrossIcon}
        </button>
        <UncontrolledTooltip placement="top" target={`resetButton-${index}`}>
          حذف تغییرات
        </UncontrolledTooltip>

        <button
          onClick={() => onUpdate(province.id, updatedPrice)}
          id={`updateButton-${index}`}
          className={`pt-2 show-button ${updatable ? "show" : ""}`}
          color="success"
          size="sm"
        >
          {CheckIcon}
        </button>
        <UncontrolledTooltip placement="top" target={`updateButton-${index}`}>
          بروزرسانی قیمت
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default CityPrice;
