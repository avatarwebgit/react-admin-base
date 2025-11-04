import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

// A representative list of Font Awesome icons.
const fontAwesomeIcons = [
  "fab fa-instagram",
  "fab fa-telegram",
  "fab fa-twitter",
  "fab fa-facebook",
  "fab fa-linkedin",
  "fab fa-youtube",
  "fab fa-whatsapp",
  "fab fa-pinterest",
  "fab fa-snapchat",
  "fab fa-skype",
  "fab fa-github",
  "fas fa-home",
  "fas fa-user",
  "fas fa-envelope",
  "fas fa-phone",
  "fas fa-globe",
  "fas fa-star",
  "fas fa-heart",
  "fas fa-cog",
  "fas fa-map-marker-alt",
  "fas fa-link",
  "fas fa-info-circle",
  "fas fa-question-circle",
  "fas fa-rss",
  "fab fa-tiktok",
  "fab fa-discord",
];

const IconPickerModal = ({ isOpen, toggle, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = fontAwesomeIcons.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = (iconClass) => {
    onSelect(iconClass);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered scrollable>
      <ModalHeader toggle={toggle}>انتخاب آیکون</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          placeholder="جستجوی آیکون..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredIcons.map((icon) => (
            <div
              key={icon}
              onClick={() => handleIconClick(icon)}
              style={{
                cursor: "pointer",
                padding: "1rem",
                border: "1px solid #dee2e6",
                borderRadius: "0.25rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              className="icon-picker-item"
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <i className={`${icon} fa-2x mb-2`}></i>
              <span style={{ fontSize: "12px", wordBreak: "break-all" }}>
                {icon}
              </span>
            </div>
          ))}
          {filteredIcons.length === 0 && (
            <p className="text-muted">هیچ آیکونی یافت نشد.</p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default IconPickerModal;
