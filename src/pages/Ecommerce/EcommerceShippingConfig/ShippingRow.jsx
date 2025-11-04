import { useDispatch } from "react-redux";
import {
  CheckIcon,
  CrossIcon,
  EditIcon,
  GearIcon,
} from "../../../components/Common/icons";
import { updateDeliveryMethod } from "../../../store/e-commerce/actions";

const ShippingRow = ({ method, onEdit }) => {
  const dispatch = useDispatch();



  const handleChangeActiveStatus = () => {
    dispatch(
      updateDeliveryMethod({
        ...method,
        is_active: !method.is_active,
        payment_type: 0,
      })
    );
  };

  return (
    <tr key={method.id}>
      <td>{method.name}</td>
      <td onClick={handleChangeActiveStatus}>
        {method.is_active ? CheckIcon : CrossIcon}
      </td>
      <td>
        <button
          color="info"
          size="sm"
          className="me-2"
          onClick={() => onEdit(method)}
        >
          {EditIcon}
        </button>
        {
          <a
            href={`ecommerce-shipping-configuration/city-config/${method.id}`}
          >
            {GearIcon}
          </a>
        }
      </td>
    </tr>
  );
};

export default ShippingRow;
